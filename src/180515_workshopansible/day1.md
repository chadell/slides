% Network <span style="color:SlateBlue">Automation </span>101
% Enginyeria La Salle, May 18
% Christian Adell @chadell0 ![](media/twitter-logo.png){ width=5% }

#

## Agenda

| Time | Topic |
| --- | --- |
| <span style="color:SlateBlue">**Day 1**</span> |  |
| 15:30 - 16:00 | Network Programmability & Automation |
| 16:00 - 16:30 | Ansible 101 |
| 16:30 - 17:00 | <span style="color:SlateBlue">**Exercise 1**</span> |
| <span style="color:SlateBlue">**Day 2**</span> |  |
| 15:30 - 16:00 | Ansible 102 |
| 16:00 - 17:00 | <span style="color:SlateBlue">**Exercise 2**</span> |

#

## Day 1

# 

## Network Programmability and Automation

## What is Software Defined Networking?

![](https://media.giphy.com/media/12NUbkX6p4xOO4/giphy.gif)

## Openflow

![](https://www.sdxcentral.com/wp-content/uploads/2015/03/sdn-architecture.png){ width=70% }

##

* It was the PhD work of <span style="color:SlateBlue">**Martin Casado**</span> at Stanford University, supervised by Nick McKeown
* OpenFlow could be considered as the trigger of SDN, when he was trying to <span style="color:SlateBlue">**program**</span> the network as he was doing with computers
    * for almost 20 years, network opertations had not evolved like other IT silos
* but, in the end, it's just a <span style="color:SlateBlue">**protocol**</span> that allows for the decoupling of a network device's control plane from the data plane
    * and it was not the first trying to accomplish this, i.e. ForCes, RCP, PCE. 
    * For more information look for the paper "The Road to SDN: An Intellectual History of Programmable Networks"

## Network Functions Virtualization

![](http://www.techplayon.com/wp-content/uploads/2017/08/NFV-Comp.png){ width=75% }

##

* It consists on taking functions that have been deployed as hardward, and instead deploying them as software
* It enables breaking down a monolithic piece of HW into *N* pieces of software
* It offers a better way to <span style="color:SlateBlue">**scale out**</span> and minimize failure domains using a pay-as-yo-grow model
* But...
    * it needs a rethink on how the network is architected (traffic doesn't need to go through a specific device) and give up the current single pane of management (CLI or GUI)
    * Also, some vendors, are not actively selling their virtual appliances...
* <span style="color:SlateBlue">**Agility**</span> is one of the major values, decreasing time to provision of new services and adopting DevOps culture

## Virtual switching

![](http://network-insight.net/wp-content/uploads/2015/11/OVS-COMP.jpg){ width=75% }

##

* These are just software-based switches in the <span style="color:SlateBlue">**hypervisor**</span> level providing local conectivity between VMs and Containers
* They are the new <span style="color:SlateBlue">**edge layer**</span> of the network, instead of the Top of the Rack switches (TOR) 
* Examples:
    * VMware standard switch (VSS)
    * VMware distributed switch (VDS)
    * Cisco Nexus 1000v
    * Cisco Application Virtual Switch (AVS)
    * Open vSwitch (OVS)  

## Network virtualization

![](https://www.sdxcentral.com/wp-content/uploads/2014/09/vmware-nsx-api-manager.jpg)

##

* It's just providing an <span style="color:SlateBlue">**overlay**</span> network (Layer 2) using protocols such as VxLAN or EVPN
* So, the result is a virtual network <span style="color:SlateBlue">**decoupled**</span> from the physical network
* Usually, these solutions offers extra services controlled from a a single point of management
* Examples:
    * VMware NSX
    * Nuage Virtual Service Platform (VSP)
    * Juniper Contrail

## Device APIs

![](https://eos.arista.com/wp-content/uploads/2014/12/Screen-Shot-2014-12-18-at-11.56.26-am.png)

##

* CLI, repeat with me, CLI, CLI...
* CLI, or GUI, are not well suited for automation because they don't offer structured data
* API (Application Programmable Interface) offers a clean <span style="color:SlateBlue">**interface**</span> to operate with network devices
* Examples:
    * RESTful APIs
    * NETCONF


## Network Automation

![](https://www.agileintegratedsolutions.com/wp-content/uploads/2018/01/napalm_junos_ping-1024x839.jpg){ width=70% }

##

* APIs facilitates Network Automation
* It's extremely easy to retrieve network information (structured) and deploy configuration <span style="color:SlateBlue">**at scale**</span>
* It allows a more predictable and uniform network
* Some examples:
    * Custom Python scripts
    * Ansible
    * Salt
    * Stackstorm

## Bare-metal switching

![](http://www.opencompute.org/assets/Uploads/_resampled/resizedimage600357-Screen-Shot-2014-03-28-at-9.22.09-PM.png)

## 

* Network devices were always bought as hardware appliance, operating system, applications from the same vendor
* Now, the bare-metal switching is about <span style="color:SlateBlue">**disaggregation**</span> and being able to purchase every piece from different vendors
* Examples of hardware boxes:
    * HP
    * Dell
    * Edgecore
* Examples of network operating systems:
    * Cumulus Networks
    * Big Switch
    * FBOSS


## Data center network fabrics

![](https://tr1.cbsistatic.com/hub/i/2014/11/25/c1eadd15-ada3-4549-be32-f086291cb9a8/facebookfabricherocourtesyoffacebook.jpg){ width=70% }

##

* Network architecture have evolved to <span style="color:SlateBlue">**standarized blocks**</span>
* We changed from managing individual boxes to managing a system, offering a single interface
* This solutions offer distributed gateways, multi-path and some form of "logic"
* Examples:
    * Cisco Appliance Centric Infrastructure (ACI)
    * Big Switch Big Cloud Fabrice (BCF)

## SD-WAN

![](https://www.wearepriority.com/wp-content/uploads/2017/05/SD-WAN.png)

##

* It democratises WAN connections, being able to create private WAN services over <span style="color:SlateBlue">**multiple technologies and providers**</span>
* It's conceptually similar to overlay networks, making provision quicker and also more agile
* Examples:
    * Viptela, now Cisco
    * CloudGenix
    * VeloCloud

## Controller networking

![](https://www.sdxcentral.com/wp-content/uploads/2014/09/ODL-graphic-copy.jpg){ width=65% }

##

* In some of the previous solutions, they rely on a central point of control that <span style="color:SlateBlue">**orchestrates**</span> everything
* These platforms offer:
    * Network Virtualization
    * Monitoring 
    * ... or any other any function that could be related to application running on top
* Example:
    * OpenDaylight

#

## Network <span style="color:SlateBlue">**Automation**</span>

## Why

* Simplified Architectures
* Deterministic Outcomes
* Business Agility

## Some examples

* Device Provisioning
* Data Collection
* Migrations
* Configuration Management
* Compliance
* Reporting
* Troubleshooting


## Data Formats, Data Models and Config Templates

## XML

```xml
<rpc-reply xmlns:junos="http://xml.juniper.net/junos/13.3R5/junos">
    <software-information>
        <host-name>M320-TEST-re0</host-name>
        <product-model>m320</product-model>
        <product-name>m320</product-name>
        <junos-version>13.3R5.9</junos-version>
    </software-information>
    <cli>
        <banner>{master}</banner>
    </cli>
</rpc-reply>
```

## YAML

```yaml
---
parameter_defaults: 
  ControlPlaneDefaultRoute: "192.0.2.1"
  ControlPlaneSubnetCidr: 24
  DnsServers:
    - "192.168.23.1"
  EC2MetadataIp: "192.0.2.1" 
  ExternalAllocationPools:
    - end: "10.0.0.250"
      start: "10.0.0.4"
  ExternalNetCidr: "10.0.0.1/24"
  NeutronExternalNetworkBridge: ""
```


## JSON

```json
{
  "parameter_defaults": {
    "ControlPlaneDefaultRoute": "192.0.2.1", 
    "ControlPlaneSubnetCidr": "24", 
    "DnsServers": [
        "192.168.23.1"
    ], 
    "EC2MetadataIp": "192.0.2.1", 
    "ExternalAllocationPools": [
        {
            "end": "10.0.0.250", 
            "start": "10.0.0.4"
        }
    ], 
    "ExternalNetCidr": "10.0.0.1/24", 
    "NeutronExternalNetworkBridge": ""
  }
}
```

## YANG

```
 module configuration {
  namespace "http://xml.juniper.net/xnm/1.1/xnm";
  prefix junos;
  organization
    "Juniper Networks, Inc.";
  revision "2015-09-11" {
    description "Initial revision";
  }
  typedef ipv4addr {
    type string;
  }
  grouping juniper-config {
    container backup-router {
      description "IPv4 router to use while booting";
      leaf address {
        description "Address of router to use while booting";
        type ipv4addr;
        mandatory true;
      }
    ...
```
[https://raw.githubusercontent.com/Juniper/yang/master/14.2/configuration.yang](https://raw.githubusercontent.com/Juniper/yang/master/14.2/configuration.yang)

## JINJA
```
{% for key, value in vlanDict.iteritems() -%}
vlan {{ key }}
    name {{ value }}
{% endfor %}
```

```python
>>> vlanDict = { 
>>>     123: 'TEST-VLAN-123', 
>>>     234: 'TEST-VLAN-234', 
>>>     345: 'TEST-VLAN-345'}
>>> from jinja2 import Environment
>>> env = Environment(loader=FileSystemLoader('./Templates/'))
>>> template = env.get_template('ourtemplate')
>>> print template.render(vlanDict)

vlan 123
    name TEST-VLAN-123
vlan 234
    name TEST-VLAN-234
vlan 345
    name TEST-VLAN-345
```

# 

## <span style="color:SlateBlue">**Ansible**</span> 101

## Review of automation tools

* Ansible
* Chef
* Puppet
* Salt
* StackStorm

## Understanding how Ansible works

* Automating servers
    * Distributed execution
    * <span style="color:SlateBlue">**Copy**</span> via SSH python code and <span style="color:SlateBlue">**runs**</span> in every device

* Automating network devices
    * Centralised execution
    * <span style="color:SlateBlue">**Runs**</span> python code locally and reach network devices by SNMP, SSH or APIs

## Basic files and defaults

* <span style="color:SlateBlue">**Inventory**</span> file: Contains the devices (ip or fqdn) that will be automated (and associated variables)
    * **/etc/ansible/hosts**
    * ANSIBLE_INVENTORY
    * -i, --inventory-file

* <span style="color:SlateBlue">**Variable**</span> files:
    * Group variables
        * **group_vars**/{name of group}.yml or
        * **group_vars**/{name of group}/{variables}.yml
    * Host variables
        * **host_vars**/{name of group}.yml or
        * **host_vars**/{name of group}/{variables}.yml

## Inventory file

```
[barcelona-dc]
switch01
switch02

[madrid-dc]
172.31.200.1
switch03

[barcelona-cpe]
vmx1

[madrid-cpe]
172.22.3.1

[barcelona:children]
barcelona-dc
barcelona-cpe
```

## Assigning variables

```
[all:vars]
ntp_server=10.20.30.4

[barcelona:vars]
ntp_server=192.168.0.1

[madrid:vars]
ntp_server=10.0.0.1

[barcelona-dc]
switch01 ntp_server=192.168.0.3
switch02
```
## Variables' file

File: group_vars/**barcelona-dc**.yml

```yaml
---
snmp:
    contact: Ausias March
    location: Barcelona Data Center, Passeig Colon
    communities:
        - community: public
          type: ro
        - community: private
          type: rw
```

How will we access this data?: *snmp.communitites[0].type*

## Executing an Ansible Playbook

It's the file that contain your automation instructions

```yaml
---
    - name: PLAY 1 - Configure Interface Speed
      hosts: barcelona-dc
      connection: local
      gather_facts: no

      tasks:

        - name: TASK1 - Get interface information
          ios_command:
            commands:
                - show run | include interfaces
            provider:
                username: myusername
                password: mypassword
                host: "{{ inventory_hostname }}"

```

#

## Exercise 1


## Goal

> Experiment with basic Ansible automation, *learning by doing*

All you need is here: 
[https://github.com/chadell/ansible-cumulus-vyos](https://github.com/chadell/ansible-cumulus-vyos)

## Scenario

![](https://docs.google.com/drawings/d/e/2PACX-1vRNcesOQIfJg6iZIsgh9W8aGbpnn9Ka1ei_JrCZu6A1rVsrFkQCzx7VClrStUZYHcrjyQPdcIl0WKDP/pub?w=660&h=415)


## TODO

From the <span style="color:SlateBlue">**mgmt**</span> server:

1. Run the example playbook (exercise1.yml) against the targeted hosts (inventory.cfg)
    * <span style="color:SlateBlue">**Analyse**</span> output and what the playbook is doing
2. <span style="color:SlateBlue">**Update**</span> the hostname of all the devices to match the fqdn: router01, router02, switch, server, oob-switch
    * Make a PR to the Github repository with your playbook (be aware of identifying yourself)
3. <span style="color:SlateBlue">**Contribute**</span> to improve this workshop by fixing errors, typos or promoting improvements by PRs

