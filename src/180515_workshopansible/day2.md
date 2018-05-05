#

## Agenda

| Time | Topic |
| --- | --- |
| <span style="color:lime">Day 1</span> |  |
| 15:30 - 16:00 | Network Programmability & Automation |
| 16:00 - 16:30 | Ansible 101 |
| 16:30 - 17:00 | <span style="color:lime">Exercise 1</span> |
| <span style="color:lime">Day 2</span> |  |
| 15:30 - 16:00 | Ansible 102 |
| 16:00 - 17:00 | <span style="color:lime">Exercise 2</span> |

# 

## Day 2

#

## Writing Ansible Playbooks

## Core modules

* command: used to send exec-level commands
    * ios_command, vyos_command, junos_command, and so on
* config: used to send configuration commands
    * ios_config, vyos_config, junos_config, and so on
* facts: used to gather information from network devices
    * ios_facts, vyos_facts, junos_facts, and so on

Note: to find out the parameters of each module (plus some examples), you can use the <span style="color:lime">ansible-doc</span> utility: $ ansible-doc ios_config

## Creating and using configuration templates

1. Creating variable files
2. Creating Jinja templates
3. Generating network configuration files

## Creating variable files (1)

group_vars/barcelona-dc.yml

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

group_vars/madrid-dc.yml

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

group_vars/all.yml

```yaml
---
base_provider:
    username: vagrant
    password: vagrant
    host: "{{ inventory_hostname}}"
```

## Creating Jinja templates (1)

templates/snmp/ios.j2

```
snmp-server location {{ snmp.location }}
snmp-server contact {{ snmp.contact }}
{% for community in snmp.communities %}
snmp-server community {{ community.community }} {{ community.type | upper }}
{% endfor %}
```

## Creating Jinja templates (2)

templates/snmp/junos.j2

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


## Generating network configuration files

## Ensuring a configuration exists

1. Idempotency
2. Using the config module
3. Understanding check mode, verbosity and limit

## Gathering and viewing network data

1. Using the core facts modules
2. Using the debug module

## Issuing show commands and writing data to a file

1. Using the register task attribute

## Performing compliance checks

## Generating reports

## Using 3rd-party Ansible modules

## NAPALM modules

## Bring your own module

* Installing 3rd party modules


#

## Exercise 2

## Goal

> Extend Ansible feautures to provision a network

All you need is here: 
[https://github.com/chadell/ansible-cumulus-vyos](https://github.com/chadell/ansible-cumulus-vyos)

## Scenario

![](https://docs.google.com/drawings/d/e/2PACX-1vRNcesOQIfJg6iZIsgh9W8aGbpnn9Ka1ei_JrCZu6A1rVsrFkQCzx7VClrStUZYHcrjyQPdcIl0WKDP/pub?w=660&h=415)

## TODO

* list of things
* list of things

