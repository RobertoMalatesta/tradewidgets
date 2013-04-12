function setupTable(){
   
	$('#tw-table').dataTable(
		{
		 "aaSorting" : [],   
		"sScrollY" : "300px",
		"sAjaxSource": 'http://orson/tradewidgets/public/jsonRequest.php',
		"bServerSide" : false,
		"bDeferRender" : false,
		"bProcessing" : false, 
		"sDom": "frtiS",
		"oScroller": {"loadingIndicator": true},
		"fnPreDrawCallback" : function(){ $('.DTS_Loading').show().css('z-index',1000);}, 
		"fnDrawCallback" : function(){ $('.DTS_Loading').hide().css('z-index',0);},
		"fnServerParams" : setServerParameters,
		"aoColumns" : [ 
			{ "mData": "trade_id" }
			]
		} );
    }

 
