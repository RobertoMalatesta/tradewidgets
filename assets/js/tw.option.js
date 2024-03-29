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
			{ "mData": "exec_date_short", "iDataSort" : 15},
			{ "mData": "opt_type", "mRender" : function(data, type, row) {if (data) return tw_option_codes[data][0]; else return ""} },
			{ "mData": "opt_tenor", "mRender" : function(data, type, row) { return niceTime(data)}, "iDataSort" : 16},
			{ "mData": "term"},
			{ "mData": "opt_expiry_short", "iDataSort" : 17},
			{ "mData": "end_date_short", "iDataSort" : 18 },
			{ "mData": "not_curr_1"},
			{  "mData": "not_amount_1"},
			{  "mData": "opt_strike"},
			{  "mData": "opt_prem_val", "bSortable" : false },
			{  "mData": "opt_prem_bps", "bSortable" : false},
			{  "mData": "opt_add_price_1", "bSortable" : false},
			{  "mData": "opt_add_price_type_1", "bSortable" : false},
			{  "mData" : "trade_id", "mRender" : function( data, type, row){ return "<a class='trade-info' onclick='tradeDetails(" + data + ")'>info</a>"}, "bSortable" : false },
			{  "mData" : "trade_id", "mRender" : function( data, type, row){ return "<a class ='table-tweet' onclick='tweetDetails(" + data + ")'><img src='../assets/images/bird_gray_16.png'></img></a>"}, "bSortable" : false },
			{ "mData" : "execution_date", "bVisible" : false},
			{ "mData" : "opt_tenor", "bVisible" : false},
			{ "mData" : "opt_expiry" , "bVisible" : false},
			{ "mData" : "end_date" , "bVisible" : false}
			]
		} );
    }

 
