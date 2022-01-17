# HtmlTableSort.js
Dynamic sort an HTML table with ASC and DESC order and arrows.

- Author  : @r1d
- Version : 1.0 
- Date    : 2022-01-12
- Example : [https://r1d.github.io/htmlTableSort/](https://r1d.github.io/htmlTableSort/).

Usage : 

```
<script src="src/htmltablesort.js"></script>
window.onload = function(){
    HtmlTableSort.init(document.getElementById("sortable"),0,'asc','&nbsp;&middot','&nbsp;&uarr;','&nbsp;&darr;');
    };
```