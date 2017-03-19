
#

## we tried to solve <span style="color:yellow">all in one</span>

<!-- 
so a small team of people with network background seated together to propose a better approach...
 -->

##

![](https://docs.google.com/drawings/d/e/2PACX-1vQc-NEus2L7gFkKqEugb6pWPY4xoFt7WVK-2Q2yiC9ngIYSCkB5rqGcWSZEyIQ7ZqD-VkL9NJpJ_FBr/pub?w=1257&h=630)

<!-- And we came up with a super cool network design where each service runs a VPN service (in some platforms even as a SaaS) which connects it to a central routing engine using BGP to propagate routing information so we can get:
Only one set of connections to connect to everywhere
Dynamic control of reachability with route propagation
We tested with several virtual solutions on IaaS: VyOS, Arista EOS, Cisco 1000v, but the same could be achieve on-premises
We tested several architectures, such as DMVPN to optimize service to service direct connections 
We designed automated network operation running Ansible/Napalm and using a feedback loop using opensource such as PMACCT

so we went to the meeting with upper management...
-->

##  and we <span style="color:yellow">failed</span> 😞

<!-- 
the approach was not what they expected because we were not solving their most urgent issues
 -->

## but we <span style="color:yellow">learned</span> a lot

##

![](https://cdn.pixabay.com/photo/2017/05/15/06/08/feedback-2313803_1280.jpg){ width=70% }

<footer>
<span style="color:yellow">User</span> first
</footer>

<!-- 
please, listen carefully to your users! they are the ones who will give value to your services and do it often! a short feedback loop will avoid wasting time 
 -->

##

![](https://cdn.pixabay.com/photo/2014/08/01/00/04/focus-407244_960_720.jpg){ width=70% }

<footer>
<span style="color:yellow">Focus</span> on urgent needs
</footer>

<!-- 
From all the user's requirements, understand the ones that are more important and easy to achieve to start deliverying value as soon as possible.
 -->

##

![](https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Wiki_puzzle_piece_blank.svg/2000px-Wiki_puzzle_piece_blank.svg.png){ width=50% }

<footer>
<span style="color:yellow">Modular</span> design
</footer>

<!-- 
Be ready to accommodate user changes, there will be, so don't fear them, leverage on them to build better services
-->
