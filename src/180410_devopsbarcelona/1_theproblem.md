#

## <span style="color:yellow">problem</span> statement

<!-- 
Let's start first understanding what we were trying to solve.
 -->

## <span style="color:yellow">hybrid</span> ecosystem

<!-- 
Probably you are running workload in Public Cloud, but for business running for a while, usually hybrid approaches, part on-premises and part in the Cloud are the natural transition.

Dynamic infrastructure, or Cloud, has several benefits, and at some point several platforms will be used simultaneously to leverage on each one benefit

Poll:
* How many of you are running an hybrid ecosystem?
-->

##

![](https://docs.google.com/drawings/d/e/2PACX-1vSCKXAWWwSYY5CAZ1yzDfe8tR7XDdFXbU27kabGkDrAvrEVi18Cmu_flfSeEYatzrjSsUsyuDSKSZ1v/pub?w=1262&h=642)

<!-- 
Schibsted is also part of this group, distributed in 20 countries, and we still have a big diversity of IT platforms, on-premises and several public Clouds.
So we end up with services distributed across many environments ...
-->

## let's <span style="color:yellow">connect</span> them...

<!-- 
and all this services need to communicate...
 -->

##

![](https://docs.google.com/drawings/d/e/2PACX-1vRUX-foYcEbVO4d3slCY8Jwzk4OWYGnib6j0KbZzM7MtpPaFmrBUeZFevD4g70w0It_WwQw2Ww6afIL/pub?w=1262&h=642)

<!-- 
and you may end up with a caos like this... where several network technologies can be used for each use-cases and involving several team with several skills setting up this partial mesh network
 -->


## 

![](http://cdn.shopify.com/s/files/1/1061/1924/products/Flushed_Emoji_Icon_5e6ce936-4add-472b-96ba-9082998adcf7_grande.png?v=1513251036){ width=30% }

<!-- 
this could me my face when we thought about how to improve it :)
 -->

## 

![](media/internet.png){ width=40% }

<footer>
Internet isn't (always) the <span style="color:yellow">best</span> option
</footer>

<!-- 
By default, inter/intra platform communications use which is not (always) the most performant and cheapest communication channel.
Using internal network solutions usually offer best characteristics but specific setups are needed
-->

##

![](https://upload.wikimedia.org/wikipedia/commons/2/2f/Wikimania_2009_-_The_Rack.jpg){ width=70% }

<footer>
<span style="color:yellow">Manual</span> provisioning doesn't scale
</footer>

<!-- 
Manual network provisioning doesn’t work in terms of speed and reliability
Prone to errors and lack of consistency 
-->

##

![](https://upload.wikimedia.org/wikipedia/commons/d/da/Internet2.jpg){ width=60% }

<footer>
Not all traffic is <span style="color:yellow">encrypted</span> (yet)
</footer>

<!-- 
Some communications still need network layer security (no TLS) 
-->
