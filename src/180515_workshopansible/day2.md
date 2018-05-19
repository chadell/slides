#

## Day 2

## Agenda

| Time | Topic |
| --- | --- |
| <span style="color:SlateBlue">**Day 1**</span> |  |
| 15:30 - 16:00 | Network Programmability & Automation |
| 16:00 - 16:30 | Ansible 101 |
| 16:30 - 17:00 | <span style="color:SlateBlue">**Exercise 1**</span> |
| <span style="color:SlateBlue">**Day 2**</span> |  |
| 15:30 - 16:00 | Ansible 102 |
| 16:00 - 16:45 | <span style="color:SlateBlue">**Exercise 2**</span> |
| 16:45 - 17:00 | StackStorm 101 |

#

## Ansible 102

## Core modules

* <span style="color:SlateBlue">**command**</span>: used to send exec-level commands
    * ios_command, vyos_command, junos_command, and so on
* <span style="color:SlateBlue">**config**</span>: used to send configuration commands
    * ios_config, vyos_config, junos_config, and so on
* <span style="color:SlateBlue">**facts</span>: used to gather information from network devices
    * ios_facts, vyos_facts, junos_facts, and so on

Note: to find out the parameters of each module (plus some examples), you can use the <span style="color:SlateBlue">**ansible-doc**</span> utility: *ansible-doc ios_config*

#

## Creating and using configuration templates

1. Creating variable files
2. Creating Jinja templates
3. Generating network configuration files

## Creating variable files (1)

**group_vars**/barcelona-dc.yml

```yaml
---
snmp:
    contact: Ausias March
    location: Barcelona Data Center, Passeig Colon
    communities:
        - community: public
          type: ro
        - community: privat
          type: rw
```

## Creating variable files (2)

**group_vars**/madrid-dc.yml

```yaml
---
snmp:
    contact: Francisco de Quevedo
    location: Madrid Data Center, Paseo de la Castellana
    communities:
        - community: publico
          type: ro
        - community: privado
          type: rw
```

## Creating variable files (3)

**group_vars**/all.yml

```yaml
---
base_provider:
    username: vagrant
    password: vagrant
    host: "{{ inventory_hostname}}"
```

## Creating Jinja templates (1)

**templates**/snmp/ios.j2

```
snmp-server location {{ snmp.location }}
snmp-server contact {{ snmp.contact }}
{% for community in snmp.communities %}
snmp-server community {{ community.community }} {{ community.type | upper }}
{% endfor %}
```

## Creating Jinja templates (2)

**templates**/snmp/junos.j2

```
set snmp location {{ snmp.location }}
set snmp contact {{ snmp.contact }}
{% for community in snmp.communities %}
{% if community.type | lower == "rw" %}
set snmp community {{ community.community }} authorization read-write
{% elif community.type | lower == "ro" %}
set snmp community {{ community.community }} authorization read-only
{% endif %}
{% endfor %}
```

## Generating network configuration files (1)

We will use the **template** module. It use the **src** parameter as the proper template to use and the **dest** parameter to point to the location where to store the rendered configuration (it assumes the folders already exist)

```yaml
# play definition omitted
tasks:
  - name: GENERATE CONFIGS FOR EACH OS
    template:
      src: "./snmp/{{ os }}.j2"
      dest: "./configs/snmp/{{ inventory_hostname }}.cfg
```

and run it!

```bash
$ ansible-playbook -i inventory.cfg snmp.yml
```

## Generating network configuration files (2)

What is os? and inventory_hostname?

* os is a **variable**, so for each inventory element the task looks for the value of the os variable. It could be defined in specific files (as pointed out before), or in the inventory file with:

```
[eos]
eos-spine1
eos-spine2

[eos:vars]
os=eos
```

* inventory_hostname is just the **name** of the network device from the **inventory** file

#

## Ensuring a configuration exists

1. **Idempotency**: make the change only when it's needed, so if you run the playbook twice without changes, it will have effect the first time
2. Using the **config** module
3. Understanding **check** mode, **verbosity** and **limit**

## Using the config module (1)

Let's use the eos_config module to deploy the SNMP configuration from previous example

```yaml
  - name: PLAY 2 - ENSURE EOS SNMP CONFIGS ARE DEPLOYED
    hosts: eos
    connection: local
    gather_facts: no

    tasks:
      - name: DEPLOY CONFIGS FOR EOS
        eos_config:
          src: "./configs/snmp/{{ inventory_hostname }}.cfg"
          provider: "{{ base_provider }}"
```

## Using the config module (2)

Notes:

1. This could be the second task of the previous example (we are using the output file as src)
2. We are running agains a subset of hosts (eos), and using their specific module (eos_config)
3. We are using as provider (access credentials) an object defined as a variable for all the devices, such as:

```yaml
base_provider:
  username: vagrant
  password: vagrant
  host: "{{ inventory_hostname }}
```

## Other options/parameters for config module

* **commands**, instead of using src (a file), we could embed a list of commands to be executed in the network device
* **parents**, needed when we are working with nested configuration, for instance an interface mode, we reference these dependencies
* other specific parameters, check them using **ansible-doc**

## Understanding check mode, verbosity and limit

* **Check mode**, is the ability to run playbooks in "dry run" mode, the ability of knowing if changes will occur. Use it by enabling the --check when executing the playbook
* **Verbosity**, every module returns JSON data with metadata of the comanand and the respone from the device. Use it by enabling the -v flag when running the playbook.
* **Limit**, usually you define the hosts to run the playbook against is the hosts paramters, but you can be more concrete by using the --limit option and a list of the groups from the inventory

#

## Gathering and viewing network data

Even Ansible is used often to deploy configurations it also makes possible to automate the collection of data from network devices.

In this part we will analyse two key methods for gathering data:

* core facts modules
* arbitrary show commands with the command module

## Using the core facts modules

The **core facts** module return the following data as JSON (so it could be used in the playbook!):

| Core facts modules | Result |
| --- | --- |
| ansible_net_version | The operation system version running on the remote device |
| ansible_net_hostname | The configured hostname of the device |
| ansible_net_config | The current active config from the device |
| ansible_net_interfaces | A hash of all interfaces running on the system |


## Get fact from network devices

Even by default the **gather_facts** provides all this information, in network devices that don't let remote python code execution (non Linux based NOS), we have to use specific **facts** modules (i.e. ios_facts):

```yaml
---
  - name: PLAY 1 - COLLECT FACTS FOR IOS
    hosts: iosxe
    connection: local
    gather_facts: no

    tasks:
      - name: COLLECT FACTS FOR IOS
        ios_facts:
          provider: "{{ base_provider }}
```

## Using the debug module

In order to **view** the facts that are being returned from the module you can run the playbook in **verbose mode** or simply yse the **debug** module with the var parameter while referencing a valid facts key:

```yaml
# play definition omitted
  tasks:
    - name: COLLECT FACTS FROM IOS
      ios_facts:
        provider: "{{ base_provider }}"
    
    - name: DEBUG OS VERSION
      debug:
        var: ansible_net version
    
    - name: DEBUG HOSTNAME
      debug:
        var: ansible_net_hostname
```

#

## Using data from responses

To get the return data (JSON) from a module you can use the verbose mode, but there is also another way, using the **register** task attribute, which allows you to save the JSON response data as a variable

```yaml
  - name: ISSUE SHOW COMMAND
    ios_command:
      command:
        - show run | include snmp-server community
      provider: "{{ base_provider }}"
    register: snmp_data
```

The register's associated value is the variable you want to save the data in

##  Access returned data

Since the snmp_data variable is now created (or registered), the debug module can be used to view the data. After viewing it, you need to understand the data structure to use it, even you could get it from the ansible-doc help.

```yaml
  - name: DEBUG COMMAND STRING RESPONSE WITH JINJA SHORTHAND SYNTAX
    debug:
      var: snmp_data.stdout.0

  - name: DEBUG COMMAND STRING RESPONSE WITH STANDARD PYTHON SYNTAX
    debug:
      var: snmp_data['stdout'][0]
```

or just use it with templates as {{ snmp_data['stdout'][0] }}

#

## Compliance checks

* **set_fact**: it's a module that creates a variable out of some other complex set of data. 
* **assert**: it's a module to ensure that a condition is True of False

```yaml
  tasks:
    - name: RETRIEVE VLANS JSON RESPONSE
      eos_command:
        commands:
          - show vlan brief | json
        provider: "{{ base_provider}}"
      register: vlan_data

    - name: CREATE EXISTING_VLANS FACT TO SIMPLIFY ACCESSING VLANS
      set_fact:
        existing_vlans_ids: "{{ vlan_data.stdout.0.vlans.keys() }}"

    - name: PERFORM COMPLIANCE CHECKS
      assert:
        that:
          - "'20' in existing_vlans_ids"
```

#

## Generating reports

* **assemble**: it's a module that assembles all the individual reports into a single master report
  * **delimiter**: useful to split partial outputs

```yaml
- name: PLAY CREATE REPORTS
  hosts: "iosxe,eos,nxos"
  connection: local
  gather_facts: no

  tasks:
    - name: GENERATE DEVICE SPECIFIC REPORTS
      template:
        src: ./reports/facts.j2
        dest: ./reports/facts/{{ inventory_hostname }}.md

    - name: CREATE MASTER REPORT
      assemble:
        src: ./reports/facts/
        dest: ./reports/master-report.md
        delimiter: "---"
      run_once: true
```

## Roles

**Roles** are ways of automatically loading **certain** vars_files, tasks, and handlers based on a known file structure. Grouping content by roles also allows easy sharing of roles with other users.

```
roles/
   common/
     tasks/
     templates/
     vars/
     defaults/
     meta/
   webservers/
     tasks/
     defaults/
```

```
---
- hosts: webservers
  roles:
     - common
     - webservers
```

#

## Using 3rd-party Ansible modules

All of the examples we've reviewd in this chapter have used Ansible core modules (included in Ansible installation)
However, there is an active community for 3rd-party modules.

## NAPALM 

Network Automation and Programmability Abstraction Layer with Multi-vendor support is an open source community developing mutli-vendor network automation integrations

![](https://raw.githubusercontent.com/napalm-automation/napalm/develop/static/logo.png)

## NAPALM modules

* **Declarative configuration management** (napalm_install_config): NAPALM focuses on the desired state configuration. You deploy the new configuration (no commands) and NAPALM abstracts away how this operates per vendor and makes it so you don't have to micromanage device configurations.

* **Obtaining configuration and operational state from devices**: The module napalm_get_facts is used to obtain a base set of facts and other information (usch as route entries, MAC table, etc.). The big benefit is that it the data is preparsed and normalised for all vendors supported.

## Bring your own module

Installing 3rd party modules is quite straightforward:

1. Choose a path on your Linux system where you want to store all your 3rd party modules
2. Navigate to that path and perform a git clone on each repository that you want to use
3. Open your Ansbile config file (/etc/ansible/ansible.cfg) and update your module path with the chosen directory
  * You can locate this file running ansible --version
4. Install any dependencies the modules have (this are usually documented on the project's GitHub)

#

## Exercise 2

## Goal

> Extend Ansible feautures to provision a network

All you need is here: 
[https://github.com/chadell/ansible-cumulus-vyos](https://github.com/chadell/ansible-cumulus-vyos)

## Scenario

![](https://docs.google.com/drawings/d/e/2PACX-1vRNcesOQIfJg6iZIsgh9W8aGbpnn9Ka1ei_JrCZu6A1rVsrFkQCzx7VClrStUZYHcrjyQPdcIl0WKDP/pub?w=660&h=415)

## TODO

1. Create a network design:
  * A vlan between router01 and router02 and configure iBGP (create all the necessary config)
  * A vlan to communicate router01, router02 and the server
  * Everything using templating
  * A validation that the design is deployed
  * A report with all the configs applied to router01, router02 and switch
2. Contribute to improve this workshop by fixing errors, typos or promoting improvements by PRs

#

## StackStorm: Event-Driven Automation

## Use-cases

## Facilitated Troubleshooting

* Triggering on system failures captured by Nagios, Sensu, New Relic and other monitoring systems
* Running a series of diagnostic checks on physical nodes, OpenStack or Amazon instances
* Application components, and posting results to a shared communication context, like HipChat or JIRA.

## Automated remediation

* Identifying and verifying hardware failure on OpenStack compute node
* Properly evacuating instances
* Emailing admins about potential downtime, but if anything goes wrong
* Freezing the workflow and calling PagerDuty to wake up a human.

## Continuous deployment

* Build and test with Jenkins, provision a new AWS cluster
* Turn on some traffic with the load balancer
* Roll-forward or roll-back, based on NewRelic app performance data.

## ![](https://docs.stackstorm.com/_images/architecture_diagram.jpg)

## Concepts (I)

* **Sensors** are Python plugins for either inbound or outbound integration that receives or watches for events respectively. When an event from external systems occurs and is processed by a sensor, a StackStorm trigger will be emitted into the system.
* **Triggers** are StackStorm representations of external events. There are generic triggers (e.g. timers, webhooks) and integration triggers (e.g. Sensu alert, JIRA issue updated). A new trigger type can be defined by writing a sensor plugin.

## Concepts (II)
* **Actions** are StackStorm outbound integrations. There are generic actions (ssh, REST call), integrations (OpenStack, Docker, Puppet), or custom actions. Actions are either Python plugins, or any scripts, consumed into StackStorm by adding a few lines of metadata. Actions can be invoked directly by user via CLI or API, or used and called as part of rules and workflows.

## Concepts (III)

* **Rules** map triggers to actions (or to workflows), applying matching criteria and mapping trigger payload to action inputs.
Workflows stitch actions together into “uber-actions”, defining the order, transition conditions, and passing the data. Most automations are more than one-step and thus need more than one action. Workflows, just like “atomic” actions, are available in the Action library, and can be invoked manually or triggered by rules.

## Concepts (IV)

* **Packs** are the units of content deployment. They simplify the management and sharing of StackStorm pluggable content by grouping integrations (triggers and actions) and automations (rules and workflows). A growing number of packs are available on StackStorm Exchange. Users can create their own packs, share them on Github, or submit to the StackStorm Exchange.
* **Audit** trail of action executions, manual or automated, is recorded and stored with full details of triggering context and execution results. It is also captured in audit logs for integrating with external logging and analytical tools: LogStash, Splunk, statsd, syslog.

# Wrap-up

![](http://www.whatnextculture.co.uk/wp-content/uploads/2015/09/WhatNext.jpg){ width=60% }
