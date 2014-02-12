table2csv
=========

This is small JQuery utility which allows you to export any HTML table as CSV file.

Sample Code
=========
JS Code
---------
$("#table").table2CSV({delivery:'value',template:'complex'})
$("#table").table2CSV({delivery:'value',template:'simple'})

HTML Code
---------
<table>
  <tr id="normal">
    <input type="text" id="field1" name="field1" value=""/>
  </tr>
  
  <tr id="extend">
    <input type="text" id="field3" name="field3" value=""/>
  </tr>
</table>

Refer to
=========
http://www.kunalbabre.com/projects/table2CSV.php
