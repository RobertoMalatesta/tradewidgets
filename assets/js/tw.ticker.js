function setupTable(){
   
	$('#tw-table').dataTable(
		{
		 "aaSorting" : [],   
		"sScrollY" : "300px",
		"sAjaxSource": tw_baseUrl,
		"bServerSide" : true,
		"bDeferRender" : true,
		"bProcessing" : false, 
		"sDom": "frtiS",
		"oScroller": {"loadingIndicator": true},
		"fnPreDrawCallback" : function(){ $('.DTS_Loading').show().css('z-index',1000);}, 
		"fnDrawCallback" : function(){ $('.DTS_Loading').hide().css('z-index',0);},
		"fnServerParams" : setServerParameters,
		"aoColumns" : [ 
			{ "mData": "exec_date_short", "iDataSort" : 10},
			{ "mData": "inst_type" },
			{ "mData": "inst_subtype" },
			{ "mData": "term"},  
			{ "mData": "eff_date_short", "iDataSort" : 11},
			{ "mData": "end_date_short", "iDataSort" : 12},
			{ "mData": "price"},   
			{ "mData": "not_curr_1"},
			{  "mData": "not_amount_1"},
			{  "mData" : "trade_id", "mRender" : function( data, type, row){ return "<a class='trade-info' onclick='tradeDetails(" + data + ")'>info</a>"}, "bSortable" : false },
			{ "mData" : "execution_date", "bVisible" : false},
			{ "mData" : "eff_date" , "bVisible" : false},
			{ "mData" : "end_date" , "bVisible" : false}
			]
		} );
    }

 
