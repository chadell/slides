#

## Agenda

| Time | Topic |
| --- | --------- |
| 15:30-16:00 | Network Programmability and Automation 101 |
| 16:00-16:30 | Ansible 101 |
| 16:30-17:00 | Exercise |
| --- | --------- |
| 15:30-16:00 | Container/Kubernetes |
| 16:00-17:00 | Exercise |

## Day 2

## Conceptos Básicos de Kubernetes

<!--
https://kubernetes.io/docs/tutorials/kubernetes-basics/explore-intro/
-->

## Kubernetes Cluster

<div id=left>
![](https://d33wubrfki0l68.cloudfront.net/99d9808dcbf2880a996ed50d308a186b5900cec9/40b94/docs/tutorials/kubernetes-basics/public/images/module_01_cluster.svg){ width=100% }
</div>
<div id=right>
* K8s coordina un conjunto de nodos para formar un cluster que trabaja como una unidad
* K8s automatiza la distribución y orquestración de contenedores de aplicación en todo el cluster
* Hay dos roles en el cluster:
    * Master, gestiona el cluster
    * Nodos, donde corren las aplicaciones.
</div>

## Verificamos nuestro cluster

```bash
$ kubectl version
Client Version: version.Info{Major:"1", Minor:"8", GitVersion:"v1.8.1", GitCommit:"f38e43b221d08850172a9a4ea785a86a3ffa3b3a", GitTreeState:"clean", BuildDate:"2017-10-12T00:45:05Z", GoVersion:"go1.9.1", Compiler:"gc", Platform:"darwin/amd64"}
Server Version: version.Info{Major:"1", Minor:"7", GitVersion:"v1.7.5", GitCommit:"17d7182a7ccbb167074be7a87f0a68bd00d58d97", GitTreeState:"clean", BuildDate:"2017-10-06T20:53:14Z", GoVersion:"go1.8.3", Compiler:"gc", Platform:"linux/amd64"}

$ kubectl get nodes
NAME       STATUS    ROLES     AGE       VERSION
minikube   Ready     <none>    30m       v1.7.5
``` 

## Kubernetes Deployments

![](https://d33wubrfki0l68.cloudfront.net/152c845f25df8e69dd24dd7b0836a289747e258a/4a1d2/docs/tutorials/kubernetes-basics/public/images/module_02_first_app.svg){ width=50% }

* Una configuración de **deployment** define a k8s qué "estado" queremos llegar
* El Master del cluster se encarga de gestionar el despliegue y verifica continuamente que la realidad se ajuste a la definición


## Desplegamos nuestra aplicación

Desplegamos nuestro contenedor desde DockerHub:

```bash
$ kubectl run devopstraining --image=<nuestro container en docker hub> --port=5000
deployment "devopstraining" created

$ kubectl get deployments
NAME             DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
devopstraining   1         1         1            0           8s
```

*Seguir ejecutando hasta validar que AVAILABLE es 1*

<!-- kubectl port-forward? -->

## Kubernetes Pods

![](https://d33wubrfki0l68.cloudfront.net/fe03f68d8ede9815184852ca2a4fd30325e5d15a/98064/docs/tutorials/kubernetes-basics/public/images/module_03_pods.svg){ width=70% }

* K8s crea Pods para cada deployment, donde cada Pod puede contener uno o varios contenedores. Estos comparten:
    * Almacenamiento compartido (Volumes)
    * Red, una dirección IP única en el Cluster
    * Información sobre cada contenedor (versión, puertos, etc.)
* Un Pod es una unidad atómica en k8s

## Accediendo a la aplicación mediante el proxy de k8s

* Con el nombre del Pod podremos acceder a él
```bash
$ kubectl get pods
NAME                              READY     STATUS    RESTARTS   AGE
devopstraining-2021863367-m6fmw   1/1       Running   0          2m
```
* Los Pods estan corriendo, por defecto, en una red privada, aislada del exterior, pero accesible por otros Pods dentro del Cluster (luego veremos como desplegar nuestra aplicación con comunicación exterior)
* Kubectl permite crear hacer un **port-forward** para derivar las comunicaciones hacia la red privada 

```bash
(en terminal secundario)
$ kubectl port-forward devopstraining-2021863367-m6fmw <puerto externo>:<puerto interno>
```

* Validamos el acceso al Servicio
```bash
$ curl http://localhost:<puerto externo>/hello
Hello World!%
```

## Explorando Pods
```bash
$ kubectl describe pods
Name:           devopstraining-2021863367-m6fmw
Namespace:      default
Node:           minikube/192.168.99.101
Start Time:     Sun, 24 Dec 2017 10:27:28 +0100
Labels:         pod-template-hash=2021863367
                run=devopstraining
Annotations:    kubernetes.io/created-by={"kind":"SerializedReference","apiVersion":"v1","reference":{"kind":"ReplicaSet","namespace":"default","name":"devopstraining-2021863367","uid":"a921ad9a-e88c-11e7-a85b-080027...
Status:         Running
IP:             172.17.0.4
Created By:     ReplicaSet/devopstraining-2021863367
Controlled By:  ReplicaSet/devopstraining-2021863367
Containers:
  devopstraining:
    Container ID:   docker://19e99ddf602cd029a4fd3f11911b2040b3b524b39cd3f57bae3a6d304687213c
    Image:          chadell/dev_test:2
    Image ID:       docker-pullable://chadell/dev_test@sha256:ddb5a299e2a8a35c9223d37c5f3dee6211460e255db29e00a4d4de88c84980ee
    Port:           5000/TCP
    State:          Running
      Started:      Sun, 24 Dec 2017 10:29:11 +0100
    Ready:          True
...
Events:
  Type    Reason                 Age   From               Message
  ----    ------                 ----  ----               -------
  Normal  Scheduled              17m   default-scheduler  Successfully assigned devopstraining-2021863367-m6fmw to minikube
  Normal  SuccessfulMountVolume  17m   kubelet, minikube  MountVolume.SetUp succeeded for volume "default-token-4scn0"
  Normal  Pulling                17m   kubelet, minikube  pulling image "chadell/dev_test:2"
  Normal  Pulled                 15m   kubelet, minikube  Successfully pulled image "chadell/dev_test:2"
  Normal  Created                15m   kubelet, minikube  Created container
  Normal  Started                15m   kubelet, minikube  Started container
```

## Accediendo al output de un pod

```bash 

$ kubectl get pods
NAME                              READY     STATUS    RESTARTS   AGE
devopstraining-2021863367-m6fmw   1/1       Running   0          17m

$ kubectl logs devopstraining-2021863367-m6fmw
 * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 115-543-710
172.17.0.1 - - [24/Dec/2017 09:31:05] "GET /members HTTP/1.1" 200 -
```

## Kubernetes Nodes

<div id=left>
![](https://d33wubrfki0l68.cloudfront.net/5cb72d407cbe2755e581b6de757e0d81760d5b86/a9df9/docs/tutorials/kubernetes-basics/public/images/module_03_nodes.svg){ width=100% }
</div>
<div id=right>
* Un Pod siempre corre en un Nodo, gestionado por el Master
* Un Nodo puede tener diferentes Pods
* En un Nodo corren, al menos:
    * Kubelet, el proceso que comunica con el Master de Cluster
    * Una plataforma de runtime de contenedores (Docker,rkt)
</div>

## Escalando deployments

![](https://d33wubrfki0l68.cloudfront.net/30f75140a581110443397192d70a4cdb37df7bfc/b5f56/docs/tutorials/kubernetes-basics/public/images/module_05_scaling2.svg){ width=60% }

##

```bash
$ kubectl scale deployments/devopstraining --replicas=2
deployment "devopstraining" scaled

$ kubectl describe deployments
Name:                   devopstraining
Namespace:              default
CreationTimestamp:      Sun, 24 Dec 2017 10:27:28 +0100
Labels:                 run=devopstraining
Annotations:            deployment.kubernetes.io/revision=1
Selector:               run=devopstraining
Replicas:               1 desired | 1 updated | 1 total | 1 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  1 max unavailable, 1 max surge
Pod Template:
  Labels:  run=devopstraining
  Containers:
   devopstraining:
    Image:        chadell/dev_test:2
    Port:         5000/TCP
...
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
OldReplicaSets:  <none>
NewReplicaSet:   devopstraining-2021863367 (1/1 replicas created)
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  4m    deployment-controller  Scaled up replica set devopstraining-2021863367 to 2

$ kubectl get pods -o wide
NAME                              READY     STATUS    RESTARTS   AGE       IP           NODE
devopstraining-2021863367-m6fmw   1/1       Running   0          8h        172.17.0.4   minikube
```

## Actualizando la app y rollback

![](https://d33wubrfki0l68.cloudfront.net/9b57c000ea41aca21842da9e1d596cf22f1b9561/91786/docs/tutorials/kubernetes-basics/public/images/module_06_rollingupdates3.svg){ width=50% }

##

```bash
$ kubectl set image deployments/devopstraining devopstraining=chadell/dev_test:1
deployment "devopstraining" image updated

$ kubectl rollout status deployments/devopstraining
deployment "devopstraining" successfully rolled out

Verificamos el deployment
$ kubectl describe deployments

$ kubectl rollout undo deployments/devopstraining
deployment "devopstraining" rolled back
``` 

## Kubernetes Service
![](https://d33wubrfki0l68.cloudfront.net/cc38b0f3c0fd94e66495e3a4198f2096cdecd3d5/ace10/docs/tutorials/kubernetes-basics/public/images/module_04_services.svg){ width=50% }

##
* Un Servicio en k8s es una abstracción que define un conjunto lógico de Pods y una política para acceder a ellos
* Los Pods son mortales, cuando un nodo worker muere, también mueren sus Pods, con un servicio se añade la función de **ReplicationController**
* Un Servicio se define mediante un YAML o JSON, como todos los objetos de k8s.
    * Mediante el **LabelSelector** se asocia un Service a un conjunto de Pods
* Aunque cada Pod tiene una IP única interna, estas Ips no se exponen externamente sin un Servicio. Hay diferentes formas de exponer un Servicio:
    * **ClusterIP** (default): Exponer el Servicio con una IP interna, sólo accesible desde dentro del Cluster
    * **NodePort**: Exponer el Servicio en el mismo puerto que el Nodo, accesible desde el exterior <NodeIP>:<NodePort>
    * **LoadBalancer**: Crea un LoabBalancer externo en un entorno Cloud y asigna una IP externa
    * **External Name**: Expone el servicio con un nombre (externalName) mediante un CNAME utilizando kube-dns

## Labels y Selectors

![](https://d33wubrfki0l68.cloudfront.net/b964c59cdc1979dd4e1904c25f43745564ef6bee/f3351/docs/tutorials/kubernetes-basics/public/images/module_04_labels.svg){ width=40% }

* Los Servicios en k8s se relacionan con los Pods mediante labels y selectors

## Describiendo un Service

```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: yourapp
  labels:
    app: yourapp
spec:
  type: NodePort
  selector:
    app: yourapp
  ports:
  - protocol: TCP
    port: 5000
    name: http
```

## Describiendo un ReplicationController
```yaml
apiVersion: v1
kind: ReplicationController
metadata:
  name: yourapp
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: yourapp
    spec:
      containers:
      - name: devopstraining
        image: chadell/dev_test:2
        ports:
        - containerPort: 5000
        livenessProbe:
          httpGet:
            path: /hello
            port: 5000
          initialDelaySeconds: 30
          timeoutSeconds: 1
```

## Desplegamos nuestra aplicación como Servicio

```bash
$ kubectl apply -f lab3/kubernetes/app-service.yaml

$ kubectl get svc
NAME           TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)          AGE
kubernetes     ClusterIP   10.0.0.1     <none>        443/TCP          70d
yourapp        NodePort    10.0.0.236   <none>        8010:32546/TCP   1m

$ kubectl get pods
NAME                    READY     STATUS    RESTARTS   AGE
yourapp-147w5           1/1       Running   0          2m

$ curl $(minikube service yourapp --url)/members
Members!

$ kubectl delete -f lab3/kubernetes/app-service.yaml
``` 

o bien, directamente:
 
```bash
$ minikube service yourapp
```

#

## Exercise 2

##

Requirements
*  2 routers VyOS and Arista + Kubernetes cluster with an app running


Goal
* Automate firewall config depending on the services running in the cluster

(they will need to create a script to retrieve kubernetes services and running port, bash, python)


## Vagrant

I have to provide a Vagrantfile with a network with both routers connected to the cluster
I may need a script skeleton to facilitate the deployment