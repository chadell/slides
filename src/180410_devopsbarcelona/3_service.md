
# 

## then, we built a network <span style="color:yellow">service</span> 👩🏻‍🔧
<!-- 
So, after the first try, we were ready to build something that could be useful for all the developers teams across Schibsted knowing some key things
 -->

## Developers 💛 being <span style="color:yellow">autonomous</span>
<!-- Dynamic infrastructure has given developers the capabilities to become autonomous, so let's give them the same approach providing a self-serve API authtenticated through a SSO
 -->

## Developers 💛 <span style="color:yellow">APIs</span>
<!-- but how many APIs? it makes sense for all of them to know about several APIs to create all the needed stuff? -->

## Developers <span style="color:yellow">don't care</span> about network details 😑
<!-- They don't care about the underlying details, it just works, and it should work as better as possible, so let's take these decissions from them and implement all the network related tasks.
 -->

## Developers 💛 <span style="color:yellow">performance</span>
<!-- so they will get the best performance at the lowest cost -->

## Support <span style="color:yellow">multiple</span> providers 🤯
<!-- while supporting all the providers they want to run on... we don't know which will be the techincal decissions on the future, but we will be able to integrate them -->

## Continuous <span style="color:yellow">monitoring</span> 👩‍🚒
<!-- and provide them an end-to-end continuous monitoring to help them to keep everything running -->

## <span style="color:yellow">Visibility</span> 🧐
<!-- 
 And, why not provide them with network information that could be used to debug application network dependecies?
-->

## New approach

![](https://docs.google.com/drawings/d/e/2PACX-1vTM4bJPIbaTki9mkubRy8lcK8tUnsu-01rxHC2v4T-ds8usdEOQ5yV9CPCzDu8bffLJEX42VDNL3RTv/pub?w=806&h=527)

## Underneath

![](https://docs.google.com/drawings/d/e/2PACX-1vSvNRJpmhIwaV2Uyubyq0MlOlw7ZfzpNvglQhu1txAtaAGgaVK1DSH6RKfUiIDpyz2mZ-V8OBZ6SGus/pub?w=1257&h=630)

<!-- so the new approach was focus on the abstraction and orchestraction layer that could create internal provider network services and eventually provide a global interplatform connectivy -->

## Architecture

## 

![](https://docs.google.com/drawings/d/e/2PACX-1vSefaisqNFTjHAS33TVa9Qt4eWLu4ENwoPer-uIWlm4Gvu0wpimBfI0ydN2l6lSOkL2vqgE8EXpd0Sz/pub?w=938&h=635)

<!-- Decoupled architecture, explain queues
Centralized monitoring
Libraries depending on third-party provider
Periodic watchdog, KPI metrics and discover resources
Running over dynamic infrastructure: autoescaling, SaaS (lb, dns, okta, email)
How transit vpc should interact with the overall network
Highlight connection approval process -->

<!-- ## Technology Stack

| IaaS | PaaS | SaaS | FaaS |
| :------: | :-------: | :-------: | :-------: |
| EC2, ASG | RDS, Route53, ALB, SQS, SES  | DataDog, Sumologic, Okta | Lambda |
___
<h4 style="text-align: center;" markdown="1">
Written in <span style="color:yellow">Python</span> 🐍 following 12-Factor APP
</h4>
___
| API | Worker | Scheduler |
| :------: | :-------: |  :-------: | 
| Swagger, NGINX, Gunicorn, Flask, SQLAlchemy | Providers' API wrapper | Lambda using Zappa | -->

## Written in <span style="color:yellow">Python</span> 🐍 following 12-Factor APP

<!-- 
I. Codebase
One codebase tracked in revision control, many deploys
II. Dependencies
Explicitly declare and isolate dependencies
III. Config
Store config in the environment
IV. Backing services
Treat backing services as attached resources
V. Build, release, run
Strictly separate build and run stages
VI. Processes
Execute the app as one or more stateless processes
VII. Port binding
Export services via port binding
VIII. Concurrency
Scale out via the process model
IX. Disposability
Maximize robustness with fast startup and graceful shutdown
X. Dev/prod parity
Keep development, staging, and production as similar as possible
XI. Logs
Treat logs as event streams
XII. Admin processes
Run admin/management tasks as one-off processes
 -->


## some <span style="color:yellow">code</span> snippets

##
```python
class Connection(object):
    @staticmethod
    def factory(connection):
        if not connection.get('ctype'):
            try:
                evaluator = ConnectionEvaluator.factory(connection)
                connection['ctype'] = evaluator.evaluate()
            except (VpcPeeringLimitReached, CIDROverlap):
                raise ProcessConnectionUnrecoverableError

        if connection['ctype'] == 'AWS_PEERING':
            return AWSPeeringConnection(connection)
        ...
        else:
            raise NotImplementedError("Unknown connection type: {}".format(connection['ctype']))

class AWSPeeringConnection(Connection):
    def __init__(self, connection):
        super(AWSPeeringConnection, self).__init__(connection)
        ...
```

##
```python
def create(self):
    try:
        if self.peering_id is not None:
            raise GSNVPCPeeringUnrecoverableError(
                'An peering id {} should not be provided when creating a VPCPeering'.format(self.peering_id))

        if self._already_present():
            raise GSNVPCPeeringUnrecoverableError('VPC Peering betwen {} and {} already present'.format(
                self.left_vpc.vpc_id, self.right_vpc.vpc_id))

        response = self.left_vpc.ec2_client.create_vpc_peering_connection(
            VpcId=self.left_vpc.vpc_id,
            PeerOwnerId=self.right_vpc.account_id,
            PeerVpcId=self.right_vpc.vpc_id,
            PeerRegion=self.right_vpc.region_name,
        )
        self._peering_id = response['VpcPeeringConnection']['VpcPeeringConnectionId']
        ...
```

## CI / CD

![](https://docs.google.com/drawings/d/e/2PACX-1vS9L84CCA2pvjaHRaKXP_AzVwk7yjXNCj2Fb7o9hFajis30Lo-kcQpNBT-VuToa8YNbFRKYyNhCbfuN/pub?w=1377&h=577)

<!-- This is how we created this service, probably nothing different from your Pipelines, but the cool thing is imagine how this service could transform your current pipelines that probably can't interact with the network itself... using this you could include your network requirements in your integration and end2end test because eventually you will deploy them in production following the same tooling -->

