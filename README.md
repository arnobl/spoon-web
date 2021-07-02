
## DevOps class at INSA Rennes, CS dep

A team is composed of three students.
Each team has to:
 - select a research paper to read and present;
 - build a DevOps toolchain for the app Spoon-web

# Project

The given app Spoon-web is currently not built in a DevOps toolchain.

You have to select quality tools, improve the app, test its back and front, package, release, deploy, and monitor the app as automatically as possible.

Several points are mandatory.

Following the DevOps steps:

**code**

Mandatory: 
 - put the project on the INSA gitlab instance
 - Add new features:
    - front-end: TODO


**test**

*backend*

Mandatory:
- unit test
- code convention (eg checkstyle)
- linters (eg spotbugs, errorprone)
- code coverage (fail if < x %)
- mutation analysis (eg [Descartes](https://github.com/STAMP-project/pitest-descartes/) tool for extreme mutation)

To do so, complete the Maven configuration file.

Optional:
- security analysis
- performance testing
- write new linters (eg using [Spoon](https://github.com/INRIA/spoon)
- or any relevant idea


*frontend*

Mandatory:
- front-end unit test (need to mock the back-end and its REST API, HTTP interceptor)
- system test (E2E testing) using [Protractor](https://www.protractortest.org).
- code convention and linters (`tslint`, already installed but can be customised)
- code coverage (fail if < x %)


Optional:
- security analysis
- or any relevant idea


**build**


Mandatory:
- A gitlab-ci file to specify how the back and the front are built
- Launch a build on each commit thanks to gitlab-ci


**package**


Mandatory:
- Write two dockerfiles to launch the back and the front as micro-services



**deploy**

Mandatory:
- Continuous delivery: on each build success, the docker images are put on the gitlab INSA Docker instance registry
- Continuous delivery: on each build success, the docker images are deployed on servers

We will try to have a Kubernetes instance at INSA on which you can plug your gitlab-ci.
In case of problems, you can deploy locally using https://microk8s.io/ or Minikube


Challenges:
- continuous service: how not to lose context? This may require to modify the back.
- shadow deployment: https://stackoverflow.com/questions/14599016/shadow-deployment-for-test-in-production

Some tools: watchtower, https://github.com/pyouroboros/ouroboros, https://docs.docker.com/engine/swarm/, https://www.portainer.io/, https://docs.docker.com/compose/

**operate**

Mandatory:
- A/B testing: have several backend instances that use different Spoon versions

Optional: 
- Chaos engineering: how to be resilient to failures?



**monitor**

Optional: 
- log useful data
- use data mining techniques to extract information from logs
- monitor crashes and provide feedback to developers

Some tools: logstash, eliasticsearch, kibana



