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
			{ "mData": "exec_date_short", "iDataSort" : 13},
			{ "mData": "opt_type", "mRender" : function(data, type, row) {return tw_option_codes[data][0]} },
			{ "mData": "term"},
			{ "mData": "eff_date_short", "iDataSort" : 14},
			{ "mData": "end_date_short", "iDataSort" : 15 },
			{ "mData": "und_asset_1" },
			{ "mData": "not_curr_1"},
			{  "mData": "not_amount_1"},
			{  "mData": "price"},
			{  "mData": "opt_prem_val", "bSortable" : false},
			{  "mData": "opt_prem_bps", "bSortable" : false},
			{  "mData" : "trade_id", "mRender" : function( data, type, row){ return "<a class='trade-info' onclick='tradeDetails(" + data + ")'>info</a>"}, "bSortable" : false },
			{  "mData" : "trade_id", "mRender" : function( data, type, row){ return "<a class ='table-tweet' onclick='tweetDetails(" + data + ")'><img src='../assets/images/bird_gray_16.png'></img></a>"}, "bSortable" : false },
			{ "mData" : "execution_date", "bVisible" : false},
			{ "mData" : "eff_date" , "bVisible" : false},
			{ "mData" : "end_date" , "bVisible" : false}
			]
		} );
    }

 
