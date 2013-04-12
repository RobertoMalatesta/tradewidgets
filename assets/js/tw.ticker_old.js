function setupTable(){
   
	$('#tw-table').dataTable(
		{
		"aaSorting" : [],
		"oLanguage" : { "sSearch" : "filter"},
		"bPaginate": false,
		"bInfo" : false, 
		"bProcessing" : true,
		"bAutoWidth" : false,
		"bDeferRender" : true,
		"sScrollY" : "200px",
		"sAjaxSource": tw_baseUrl + "table/format/json/",
		"fnServerParams" : setServerParameters,
		"aoColumns" : [
			{ "mData": "exec_date_short", "iDataSort" : 10},
			{ "mData": "not_curr_1"},
			{ "mData": "inst_type"},
			{ "mData": "inst_subtype"},
			{ "mData": "eff_date_short", "iDataSort" : 11},
			{ "mData": "end_date_short", "iDataSort" : 12},
			{ "mData": "term"},
			{ "mData": "price"},
			{ "mData": "not_amount_1"},
			{   "mData" : "trade_id",
				"mRender" : function ( data, type, row) {
				return '<a class="trade-detail btn btn-small btn-warning" role="button" onclick ="tradeDetails(' + data +')"><i class="icon-plus icon-white"></i></a>';
			}},
			{ "mData" : "execution_date", "bVisible" : false},
			{ "mData" : "eff_date" , "bVisible" : false},
			{ "mData" : "end_date" , "bVisible" : false}
			]
		} );
    }

 
