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
		"sScrollY" : "300px",
		"sAjaxSource": tw_baseUrl + "table/format/json/",
		"fnServerParams" : setServerParameters,
		"aoColumns" : [
			{ "mData": "exec_date_short", "iDataSort" : 12},
			{ "mData": "eff_date_short", "iDataSort" : 13},
			{ "mData": "end_date_short", "iDataSort" : 14},
			{ "mData": "term"},
			{ "mData": "not_curr_1"},
			{ "mData": "inst_subtype"},
			{ "mData": "price"},
			{ "mData": "not_amount_1"},
			{ "mData": "und_asset_1"},
			{ "mData": "und_asset_2"},
			{   "mData" : "trade_id",
				"mRender" : function ( data, type, row) {
				return '<a class="trade-detail btn btn-small btn-warning" role="button" onclick ="tradeDetails(' + data +')"><i class="icon-plus icon-white"></i></a>';
			}},
			{   "mData" : "trade_id",
				"mRender" : function ( data, type, row) {
				return '<a class="tweet-btn btn btn-small btn-info" onclick = "tweetDetails(' + data + ')"><img src="../assets/images/bird_gray_16.png" /></a>';
			}}, 
			{ "mData" : "execution_date", "bVisible" : false},
			{ "mData" : "eff_date" , "bVisible" : false},
			{ "mData" : "end_date" , "bVisible" : false}
			]
		} );
    }

 
