// some global settings - sorry
baseUrl = "http://orson/trade-capture/public/rest/";
timerInterval = 120000;


function setServerParameters(aoData){ 
	
	var type = $('#selectInstrument :selected').val();
	var curr = $('#selectCurrency :selected').val(); 
    var since =$('#selectSince :selected').val();
	var minimum = $('#selectMinimum :selected').val();
	
	if (type != "All" ){
		aoData.push({"name" : "type", "value" : type});
		}
	if (curr != "All" ){
		aoData.push({"name" : "currency", "value" : curr});
		}
	if (since){
		aoData.push({"name" : "since", "value" : since});
		}
	if (minimum){
		aoData.push({"name" : "minimum", "value" : minimum});
		} 
}


function setupTable(){
   
	$('#table-std').dataTable(
		{
		"aaSorting" : [],
		"oLanguage" : { "sSearch" : "filter by"},
		"bPaginate": false,
		"bInfo" : false, 
		"bProcessing" : true,
		"bAutoWidth" : false,
		"bDeferRender" : true,
		"sScrollY" : "300px",
		"sAjaxSource": baseUrl + "table/format/json/",
		"fnServerParams" : setServerParameters,
		"aoColumns" : [
			{ "mData": "exec_date_short", "iDataSort" : 10},
			{ "mData": "eff_date_short", "iDataSort" : 11},
			{ "mData": "end_date_short", "iDataSort" : 12},
			{ "mData": "term"},
			{ "mData": "not_curr_1"},
			{ "mData": "inst_subtype"},
			{ "mData": "price"},
			{ "mData": "not_amount_1"},
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

function refreshTable(){
	var oTable = $('#table-std').dataTable({"bRetrieve" : true});
	oTable.fnReloadAjax();
}            

function setAutorefresh(){
	var auto = $('#autorefreshOn')[0].checked;
	if (auto){
	   autoRefreshTimer = setInterval (refreshTable, 12000);
	} 
	else{
		clearTimeout(autoRefreshTimer);
	}
}

function constructTradeBox( trade){
	msg = '<table class="table">';
	msg +=  '<tr><td>ID: ' + trade.trade_id + '<td>' + trade.execution_date + '</td><td>&nbsp;</tr>';
	msg += '<tr><td>Term: '+ trade.term + ' Years</td><td>Start: ' + trade.eff_date + '</td><td>Maturity: ' + trade.end_date + '</td></tr>';
	msg += '<tr><td>Size: '+ trade.not_amount_1 + ' mn ' + trade.currency + '</td><td>Price: ' + trade.price + ' ' + trade.price_type + '</td><td>&nbsp;</td></tr>';
	msg += '<tr><td>From: '+ trade.und_asset_1 + '</td><td>To: ' + trade.und_asset_2 + '</td><td>&nbsp;</td></tr>';
	msg += '<tr><td>From: '+ trade.not_amount_1 + ' mn ' + trade.not_curr_1 + '</td><td>To: ' + trade.not_amount_2 + ' mn ' + trade.not_curr_2 + '</td><td>&nbsp;</td></tr>';
	
	if (trade.inst_subtype) subtype=trade.inst_subtype; else subtype="";
	msg += '<tr><td>Type: ' + trade.inst_type + '</td><td>' + subtype + '</td><td>&nbsp;</td></tr>'; 
	if (trade.inst_type == 'Option'){
		if (trade.opt_start != "0000-00-00") opt_start = trade.opt_start; else opt_start = ""; 
		msg += '<tr><td>Strike: '+ trade.opt_strike +'</td><td>Type: ' + trade.opt_type + '</td><td>Expiry: ' + trade.opt_expiry +'</td></tr>';
	    msg += '<tr><td>Premium: '+ trade.opt_premium +' mn ' + trade.opt_curr + '</td><td>Term: '+ trade.opt_term +' yrs</td><td>Start: '+ opt_start + '</td></tr>';
	}
	msg +=  '</table>';
	return msg;
}


function constructTweet ( trade){
	/*	var term = trade.term;
		tweetMsg = Number(trade.term).toFixed(0) + ' year ' + trade.currency + ' ' + trade.inst_subtype + ' trades at ' + trade.price +' in ' + (trade.not_amount_1/1e6).toFixed(0) + 'mn';  
		tweetButton = '<a class="btn btn-small btn-info" href="https://twitter.com/intent/tweet?hashtags=DTCC&url=http://totalderivatives.com&text=' + tweetMsg + '"><img src="images/bird_gray_16.png" /></a>'  
		return  tweetButton;   */   
		return "The Rain in Spain";
}

function tweetIntent(tweet){ 
	var width = 550;
	var height = 340;
	var left = Math.round(screen.width/2)-width/2;
	var top = Math.max(0, Math.round(screen.height/2)-height/2); 
	var windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=no,width=' + width +',height=' + height + ',left=' + left + ',top=' + top ;
	var twitterRef = "https://twitter.com/intent/tweet?hashtags=DTCC&text="+tweet;
	window.open(twitterRef,'',windowOptions);

}
  

function tradeDetails (tradeId){  
	$.getJSON(baseUrl + "retrieve/format/json/id/" + tradeId, 
		function(data){  $('#detailModal').children('.modal-body').html(constructTradeBox(data['entries'][0]));
		$('#detailModal').modal();
		}
	);
}
 
function tweetDetails (tradeId){
	$.getJSON(baseUrl + "retrieve/format/json/id/" + tradeId, 
		function(data){  var message = constructTweet(data['entries'][0]);
		tweetIntent(message);
		}
	);  
}

$(document).ready(function(){
	setupTable();            
	autoRefreshTimer = setInterval ( refreshTable, timerInterval);
	}
); 
