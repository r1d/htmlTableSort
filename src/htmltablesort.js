/*
    HtmlTableSort.js : Dynamic sort a HTML table with ASC and DESC order and arrows
    Author           : @r1d
    Version          : 1.0
    Date             : 2022-01-12

    Usage:     
        window.onload = function(){
            HtmlTableSort.init('id-table');
            };

     Options:
        - no arrows : HtmlTableSort.init('id-table','','','');
        - my arrows : HtmlTableSort.init('id-table','<i class="fas fa-sort"></i>','<i class="fas fa-sort-down"></i>','<i class="fas fa-sort-up"></i>');
        - column sorted at start : <th data-sort="asc"> or <th data-sort="desc">
        - udisallow sorting : <th data-sort="0">
        - special sorting : <td data-sort-value="value"> (for dates, ...)
 */

        var HtmlTableSort = {
            init: function( id,              // id of the table to make sortable
                            NotSorted,       // text to display when not sorted
                            AscSortedArrow,  // text to display when sorted asc
                            DescSortedArrow  // text to display when sorted desc
                            )
                {
                
                var _this  = this; // store context of this in the object
                var table  = document.getElementById(id);
                var th     = table.tHead, i;
                var lastTh =false;
                
                if (NotSorted === undefined)        NotSorted = '&nbsp;&middot';
                if (AscSortedArrow === undefined)   AscSortedArrow = '&nbsp;&uarr;';
                if (DescSortedArrow === undefined)  DescSortedArrow = '&nbsp;&darr;';

                th && (th = th.rows[0]) && (th = th.cells);
        
                if(th)  i = th.length;
                else    return; // no <thead then do nothing        
        
                // loop on <th>
                while (--i >= 0) (function (i) {
                    var dir = 1;
        
        
                    // set & save column titles
                    th[i].setAttribute('data-caption',th[i].innerHTML);
                    var sort=th[i].getAttribute('data-sort');
        
                    // set cursor style
                    if(sort!='0') th[i].style.cursor = 'pointer';
        
                    if(sort=='asc' || sort=='desc') // is it the default sorted column
                        {                
                        if(sort=='asc')
                            {
                            dir = 1 - dir;
                            th[i].innerHTML += AscSortedArrow;
                            }
                        else th[i].innerHTML += DescSortedArrow;
                        lastTh=th[i];
                        }
                    else if(sort!='0') th[i].innerHTML += NotSorted; // column not sorted
        
                    // click listener on col header
                    if(sort!='0')
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
        