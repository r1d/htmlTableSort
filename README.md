# HtmlTableSort.js
Dynamic sort an HTML table on header click in pure javascript.

- Author: @r1d
- Version: 1.1 
- Date: 2022-01-12
- Example: [https://r1d.github.io/htmlTableSort.js/](https://r1d.github.io/htmlTableSort.js/)

Usage: 

```
<script src="src/htmltablesort.js"></script>

window.onload = function(){
    HtmlTableSort.init('id-table');
    };
```

Options:

- no arrows : `HtmlTableSort.init('id-table','','','');`
- my arrows : `HtmlTableSort.init('id-table','<i class="fas fa-sort"></i>','<i class="fas fa-sort-down"></i>','<i class="fas fa-sort-up"></i>');`

- column sorted at start : `<th data-sort="asc">` or `<th data-sort="desc">`
- disallow sorting : `<th data-sort="0">`
- special sorting : `<td data-sort-value="value">` (for dates, ...)