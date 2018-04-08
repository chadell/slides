% One <span style="color:yellow">Network</span> to rule them all
% <span style="color:yellow">DevOps</span>.Barcelona, March 18
% Christian Adell @chadell0 ![](media/twitter-logo.png){ width=5% }

<!-- 
Hello everyone! Glad to see you at the very last presentation of today conference.

I'm Christian Adell and I'm currently working at Schibsted, a multinational Norwegian company running business in Media and online Marketplaces. In Spain, Schibsted owns quite popular marketplaces as Vibbo, Habitaclia, Fotocasa, Infojobs and Milanuncios. Technology is a key pilar of Schibsted with around 2000 software engineers working in several countries.
Being a proud sponsor of this event, you will find out more about it in the booth outside, where you also will be able to reach me during these days.

About me, I developed most of my career as a network engineer, one of those who love CLI and PCAP traces, but at some point, 3 years ago, I made the decision to focus more on software developing and dynamic infrastructure, so here I am, going to share with you some of the things I've learned through this journey.

I have to confess to you that when I submitted this talks to the CFP I was a bit undecided about how to approach it, because, as you may have experienced, networking is not the disciple where devops culture has had more impact on so far.
So, to help me better understand your background, let me start this talk, with a simple poll:
* How many of you have Wireshark on your applications dock???
mmm, not bad, I hope you, at least some of you, will enjoy this story...
-->

#

## is this about <span style="color:yellow">networking</span>? 😱🤯🤮🤢

<!-- 
... but also for the rest, who probably felt like these emojis when they saw this presentation abstract.
So, what is this gonna be about?
-->

##

![Source: draft-ietf-6man-segment-routing-header-11](media/rfc_sr.png){ width=60% }

<!-- 
... we could learn about some cool stuff about using Segment Routing with IPv6 to define network functions service chain...
but don't worry!!! this talk is not about a specific network protocol and its headers...
... even who could not like this lovely RFC style documents :)
-->

##

![Source: Transforming the network with open SDN by BigSwitch](https://2eof2j3oc7is20vt9q3g7tlo5xe-wpengine.netdna-ssl.com/wp-content/uploads/2014/07/big-switch-networks-telnet-ssh.jpg){ width=120% }

<!-- 
we could also talk about the "dramatic" improvement in network operations over the last 20 years (ironic)...
-->

## SDN, NFV, Network Programmability, Intent-based, Open Networking, Linux/Container networking, OpenConfig, SD-WAN? 🤔

<!-- 
... not joking, the networking area finally started moving to a devops approach and a lot of examples of automation is appearing these days. 
So probably you could expect this presentation being about some of these cool topics... but not it is exactly...
However, here in Barcelona you can always participate in the "SDN and Network Programmability Meetup" where a bunch of people share experiences on these fields.

So, what is this presentation about?
-->

##

![💛](media/hug.jpg){ width=75% }

<!-- 
...this presentation is about a LOVE story between network and software engineers and how we worked together to achieve common goals, improving how developers interact with networking.

Forget about the famous sentences, "it works for me", "it works in my laptop". Today, we work side-by-side so  we understand better each point of view.

In this presentation I will show you the process/decisions we took at Schibsted to build a service to abstract networking and the result we got (expect a demo!)
-->


<!-- Timings
Welcome: 5, 4
The Problem: 7, 5
First try: 6, 5
Service: 10, 13
Demo: 8, 7
Wrap-up: 4, 2
Total: 40, 37
-->