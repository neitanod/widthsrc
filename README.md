widthsrc
========

Change img src according to browser width (jQuery plugin)

Demo:
=====
[Demo online](https://dl.dropboxusercontent.com/u/186012/demos/widthsrc/index.html)

Demo source:
============

    <html>
    <head>
      <script src="jquery-1.10.1.min.js"></script>
      <script src="enquire-2.0.2.min.js"></script>
      <script src="jquery.widthsrc.js"></script>
      <script>
        jQuery(function($){
            $('.demo').widthSrc({ thresholds: [720, 1024] });
        });
      </script>
    </head>
    <body>
    <img class="demo" 
    src="720.jpg" 
    data-src-0="720.jpg" 
    data-src-720="1024.jpg" 
    data-src-1024="2000.jpg" 
    width="100%">
    </body>
    </html>
