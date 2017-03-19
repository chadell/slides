<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">

<title>$title$</title>

<meta name="description" content="$title$">    

$for(author)$
<meta name="author" content="$author$" />
$endfor$

<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

<link rel="stylesheet" href="css/reveal.min.css">
$if(theme)$
<link rel="stylesheet" href="css/theme/$theme$.css" id="theme">
$else$
<link rel="stylesheet" href="css/theme/default.css" id="theme">
$endif$


<!-- For syntax highlighting -->
$if(highlight-style)$
<link rel="stylesheet" href="lib/css/$highlight-style$.css">
$else$
<link rel="stylesheet" href="lib/css/zenburn.css">
$endif$


<!-- If the query includes 'print-pdf', use the PDF print sheet -->
<script>
var link = document.createElement( 'link' );
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = window.location.search.match( /print-pdf/gi ) ? 'css/print/pdf.css' : 'css/print/paper.css';
document.getElementsByTagName( 'head' )[0].appendChild( link );
</script>

<!--[if lt IE 9]>
<script src="lib/js/html5shiv.js"></script>
<![endif]-->
$for(header-includes)$
$header-includes$
$endfor$
</head>

<body>
$for(include-before)$
$include-before$
$endfor$

<div class="reveal">

<!-- Any section element inside of this container is displayed as a slide -->
<div class="slides">

<section>
<h1>$title$</h1>
$for(author)$<h3>$author$</h3>$endfor$
<p>
<h4>$date$</h4>
</p>
</section>  

$if(toc)$
<section>
<h2>Outline</h2>
<nav id="$idprefix$TOC">
$toc$
</nav>
</section>
$endif$

$body$
</div>

<script src="lib/js/head.min.js"></script>
<script src="js/reveal.min.js"></script>

<script>
// Full list of configuration options available here:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
	controls: true,
progress: true,
history: true,
center: false,
// available themes are in /css/theme
$if(theme)$
	theme: Reveal.getQueryHash().theme || '$theme$', 
$else$
	theme: Reveal.getQueryHash().theme || 'default', 
$endif$
	// default/cube/page/concave/zoom/linear/fade/none
	$if(transition)$
	transition: Reveal.getQueryHash().transition || '$transition$',
$else$
	transition: Reveal.getQueryHash().transition || 'default',
$endif$
	// Optional libraries used to extend on reveal.js
	dependencies: [
{ src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
{ src: 'plugin/markdown/showdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
{ src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
{ src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
{ src: 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
{ src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
// { src: 'plugin/remotes/remotes.js', async: true, condition: function() { return !!document.body.classList; } }
]
});
</script>

</body>
</html>
