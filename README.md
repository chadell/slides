
# Where are the actual the slides?

docs/onenetwork

# How to regenerate the html version of the slides?

* pandoc is required
* execute bin/build.sh 
	* You can pass as an optional parameter the folder to process

OR

* docker is required
* execute bin/build-docker.sh 

```
 % ./bin/build.sh 
INFO: Building src/
DEBUG: cmdline: pandoc -t html5 --template=reveal.js/reveal-template.html --self-contained --section-divs --slide-level 2 -V theme=solarized --include-in-header=reveal.js/css/text.css -s /home/caba/Code/devops-training/slides/src/*.md -o /home/caba/Code/devops-training/slides/html/index.html
```

# How does it work??

* uses pandoc to convert from markup to html5 slides
* reveal.js is used and included in the repo
* but the default reveal template in pandoc is too simple...
	* [https://gist.github.com/aaronwolen/5017084] included and improved with the comments

