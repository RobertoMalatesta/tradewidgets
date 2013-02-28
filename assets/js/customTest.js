
function setupWineTable(){
	$('#wineTable').dataTable(
		{
		 "oLanguage" : {"sSearch" : "filtre: "},
		"aoColumns" : [ null, null, null],   
		 "bPaginate": false,
        "bLengthChange": true,
        "bFilter": true,
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": false,
		"bProcessing" : true,
		"sAjaxSource" : 'http://orson/DTCC/public/REST/temp',
    } );
}


$(document).ready(function() {
	$('#wineTable').dataTable( { 
		"aoColumns" : [null, {true}]
		"bProcessing": true,
		"bServerSide": true,
		"sAjaxSource": "http://orson/dev/dataTables/serverSide.php"
	} );
} ); 
