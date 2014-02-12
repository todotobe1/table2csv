jQuery.fn.table2CSV = function(options) {
    var options = jQuery.extend({
        separator: ',',
        header: [],
        delivery: 'popup', // popup, value
        template: 'simple' // simple,complex
    },
    options);

    var csvData = [];
    var headerArr = [];
    var el = this;

    //header
    var numCols = options.header.length;
    var tmpRow = []; // construct header avalible array

    if (numCols > 0) {
        for (var i = 0; i < numCols; i++) {
            tmpRow[tmpRow.length] = formatData(options.header[i]);
        }
    } else {
        $(el).filter(':visible').find('th').each(function() {
            if ($(this).css('display') != 'none') tmpRow[tmpRow.length] = formatData($(this).html());
        });
    }

    row2CSV(tmpRow);

    // actual data
    if(options.template == 'simple') {
    	var tmpRow = [];
    	$(el).find('tr').each(function() {
	    	$(this).filter(':visible').find('input').each(function() {
	            if ($(this).css('display') != 'none') tmpRow[tmpRow.length] = formatData($(this).val());
	        });
	    });
    	row2CSV(tmpRow);
    } else if(options.template == 'complex') {
    	var tmpRow = [];
    	$(el).find('tr[id=normal]').each(function() {
    		$(this).filter(':visible').find('input').each(function() {
	            if ($(this).css('display') != 'none') tmpRow[tmpRow.length] = formatData($(this).val());
	        });
	    });
    	var trs = $(el).find('tr[id=extend]');
    	var extendRrSize = trs.size();
    	trs.each(function(eIndex) {
			var inputs = $(this).filter(':visible').find("input[value!='']");
			
			if(inputs.size() == 0 && eIndex != extendRrSize-1){
				return true;
			}else if(inputs.size() == 0 && eIndex == extendRrSize-1){
				tmpRow[tmpRow.length-1] = tmpRow[tmpRow.length-1] + '}"';
				return false;
			}
			
			inputs.each(function(index) {
				if ($(this).css('display') != 'none') {
					if(inputs.size() == 1 && extendRrSize == 1){
						tmpRow[tmpRow.length] = '"{' + formatDataForComplex($(this)) + '}"';
					}else {
						if(index == 0 && eIndex == 0){
							tmpRow[tmpRow.length] = '"{' + formatDataForComplex($(this));
						}else if(index == inputs.size()-1 && eIndex == extendRrSize-1){
							tmpRow[tmpRow.length] = formatDataForComplex($(this)) + '}"';
						}else{
							tmpRow[tmpRow.length] = formatDataForComplex($(this));
						}
					}
				}
	        });
			
	    });
    	row2CSV(tmpRow);
    }
   
    if (options.delivery == 'popup') {
        var mydata = csvData.join('\n');
        return popup(mydata);
    } else {
        var mydata = csvData.join('\n');
        return mydata;
    }

    function row2CSV(tmpRow) {
    	var tmp = tmpRow.join('') // to remove any blank rows
        // alert(tmp);
        if (tmpRow.length > 0 && tmp != '') {
            var mystr = tmpRow.join(options.separator);
            csvData[csvData.length] = mystr;
        }
    }
    function formatData(input) {
        // replace " with “
        var regexp = new RegExp(/["]/g);
        var output = input.replace(regexp, "“");
        //HTML
        var regexp = new RegExp(/\<[^\<]+\>/g);
    	var output = output.replace(regexp, "");
        if (output == "") return '""';	
        return output;
    }
    function formatDataForComplex(input) {
        // replace " with “
        var regexp = new RegExp(/["]/g);
        var value = input.val().replace(regexp, "“");
        //HTML
        var regexp = new RegExp(/\<[^\<]+\>/g);
    	var value = value.replace(regexp, "");
        if (value == "") 
        	return '""';	
        var output = '""' + input.attr("name") + '"":""' + value + '""';
        return output;
    }
    function popup(data) {
        var generator = window.open('', 'csv', 'height=400,width=600');
        generator.document.write('<html><head><title>CSV</title>');
        generator.document.write('</head><body >');
        generator.document.write('<textArea cols=70 rows=15 wrap="off" >');
        generator.document.write(data);
        generator.document.write('</textArea>');
        generator.document.write('</body></html>');
        generator.document.close();
        return true;
    }
};
