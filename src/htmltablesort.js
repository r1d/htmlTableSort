/*
    HtmlTableSort.js : Dynamic sort a HTML table with ASC and DESC order and arrows
    Author           : @r1d
    Version          : 1.0
    Date             : 2022-01-12
    Usage            : 
    
    window.onload = function(){
        HtmlTableSort.init(document.getElementById("sortable"),0,'asc','&nbsp;&middot','&nbsp;&uarr;','&nbsp;&darr;');
        };
 */

var HtmlTableSort = {
    init: function( table,           // table to make sortable
                    colSorted,       // default column sorted
                    colOrder,        // default column order 'asc' or 'desc'
                    NotSorted,       // text to display when not sorted
                    AscSortedArrow,  // text to display when sorted asc
                    DescSortedArrow  // text to display when sorted desc
                    )
        {
        
        var _this = this; // store context of this in the object
        var th = table.tHead, i;
        var lastTh=false;

        th && (th = th.rows[0]) && (th = th.cells);

        if(th)  i = th.length;
        else    return; // no <thead then do nothing        

        // loop on <th>
        while (--i >= 0) (function (i) {
            var dir = 1;

            // set cursor style
            th[i].style.cursor = 'pointer';

            // set & save column titles
            th[i].setAttribute('data-caption',th[i].innerHTML);
            if(i==colSorted) // is it the default sorted column
                {                
                if(colOrder=='asc')
                    {
                    dir = 1 - dir;
                    th[i].innerHTML += AscSortedArrow;
                    }
                else th[i].innerHTML += DescSortedArrow;
                lastTh=th[i];
                }
            else th[i].innerHTML += NotSorted; // column not sorted

            // click listener on col header
            th[i].addEventListener('click', function (event) {
                _this._sort(table, i, (dir = 1 - dir));

                // add arrow to the sorted column
                event.target.innerHTML = event.target.getAttribute('data-caption')
                event.target.innerHTML += dir==1 ? DescSortedArrow : AscSortedArrow;
                
                // remove arrow from the other columns
                if(lastTh && lastTh != event.target)
                    {
                    lastTh.innerHTML = lastTh.getAttribute('data-caption');
                    lastTh.innerHTML += NotSorted; // column not sorted
                    }
                lastTh=event.target;
            });
        }(i));
    },
    _sort: function (table, col, reverse)
        {   
        var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
            tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
            i;

        reverse = -((+reverse) || -1);

        // sort rows
        tr = tr.sort(function (a, b) {
            // use attribute `data_sort_value` of exists for sorting (dates, numbers, ...)
            va = a.cells[col].getAttribute('data-sort-value')==null ? a.cells[col].textContent.trim() : a.cells[col].getAttribute('data-sort-value');
            vb = b.cells[col].getAttribute('data-sort-value')==null ? b.cells[col].textContent.trim() : b.cells[col].getAttribute('data-sort-value');

            return reverse * ( va.localeCompare(vb,undefined, {numeric: true}) );
            });

        // append rows in new order
        for(i = 0; i < tr.length; ++i)
            tb.appendChild(tr[i]);
    }
};        
