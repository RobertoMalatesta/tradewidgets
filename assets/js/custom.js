
function setupWineTable(){
	$('#wineTable').dataTable(
		{
		 "oLanguage" : {"sSearch" : "filtre: "},
		"aoColumns" : [{"bSortable":false}, null, null, null, {"bSortable":false}, null, null, {"bSortable":false},{"bSortable":false}, {"bSortable":false}],   
		 "bPaginate": false,
        "bLengthChange": true,
        "bFilter": true,
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": false
    } );
}


$(document).ready(function(){
	setupWineTable();
}
); 
