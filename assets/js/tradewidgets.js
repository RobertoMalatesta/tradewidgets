function setServerParameters(aoData){ 
	
	var type = $('#selectInstrument :selected').val();
	var curr = $('#selectCurrency :selected').val(); 
	var subtype = $('#selectSubtype :selected').val();
    var since =$('#selectSince :selected').val();
	var minimum = $('#selectMinimum :selected').val();
	
	if (type != "All" ){
		aoData.push({"name" : "type", "value" : type});
		}
	if (curr != "All" ){
		aoData.push({"name" : "currency", "value" : curr});
		}
	if (subtype && (subtype != "All")){
		aoData.push({"name" : "subtype", "value" : subtype});
	}
	if (since){
		aoData.push({"name" : "since", "value" : since});
		}
	if (minimum){
		aoData.push({"name" : "minimum", "value" : minimum});
		} 
}


function refreshTable(){   
	var oTable = $('#tw-table').dataTable({"bRetrieve" : true});
	oTable.fnReloadAjax();
}            

function setAutorefresh(){
	var auto = $('#autorefreshOn')[0].checked;
	if (auto){
	   tw_autoRefreshTimer = setInterval (refreshTable, 12000);
	} 
	else{
		clearTimeout(tw_autoRefreshTimer);
	}
}

function niceTime( days){
	if (days < 1){
		return '' ;
	}
	years = Math.round(10*days/365)/10;
	if (years >= 1){
		return years + "y";
	}
	months = Math.round(days/30);
	if (days >= 27){
		return months + "m";
	}                      
	weeks = Math.round(days/7);
	if ( weeks >= 1){
		return weeks + "w";
	}
	return days + "d";
}

function constructTradeBox( trade){
	msg = '<table class="table">';
	msg +=  '<tr><td>Depository: '+trade.depository + '</td><td>ID: ' + trade.trade_id + '<td>' + trade.trans_type + '</td><td>Cleared: '+ trade.cleared + '</td></tr>';
	msg += '<tr><td>Time: ' + trade.execution_date + '</td><td>Term: '+ trade.term + ' Years</td><td>Start: ' + trade.eff_date + '</td><td>End: ' + trade.end_date + '</td></tr>';
	msg += '<tr><td>Size: '+ trade.not_amount_1 + 'm ' + trade.currency + '</td><td>Price: ' + trade.price + ' ' + trade.price_type + '</td><td>Fee: ' + trade.add_price + ' '+ trade.add_price_type + '</td><td>&nbsp;</td></tr>';
	msg += '<tr><td>From: '+ trade.und_asset_1 + '</td><td>To: ' + trade.und_asset_2 + '</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
	if (trade.not_amount_2 == "") not_amount_2 = ""; else not_amount_2 = trade.not_amount_2 + 'm ' + trade.not_curr_2;
	msg += '<tr><td>From: '+ trade.not_amount_1 + 'm ' + trade.not_curr_1 + '</td><td>To: ' + not_amount_2 + '</td><td>&nbsp;</td></td><td>&nbsp;</td></tr>';
	msg += '<tr><td>Pay Freq 1: '+ trade.pay_freq_1 + '</td><td>Reset Freq 1: ' + trade.reset_freq_1 + '</td><td>Pay Freq 2: '+ trade.pay_freq_2 + '</td><td>Reset Freq 2: ' + trade.reset_freq_2 + '</td></tr>';
	
	msg += '<tr><td>Type: ' + trade.inst_type + '</td><td>' + trade.inst_subtype + '</td><td>&nbsp;</td><td>&nbsp;</td></tr>'; 
	if (trade.inst_type == 'Option' || trade.inst_type == 'CapFloor'){
		if (trade.opt_start != "0000-00-00") opt_start = trade.opt_start; else opt_start = "";
		if (trade.opt_expiry != "0000-00-00") opt_expiry = trade.opt_expiry; else opt_expiry = ""; 
		msg += '<tr><td>Strike: '+ trade.opt_strike +'</td><td>&nbsp;</td><td>'+trade.opt_add_price_1 + ' ' + trade.opt_add_price_type_1 + '</td></tr>';
	    msg += '<tr><td>Premium: '+ trade.opt_premium + ' ' + trade.opt_curr + '</td><td>&nbsp;</td><td>Type: ' + trade.opt_type + ' ('+ tw_option_codes[trade.opt_type][1] + ')</td><td>Family: ' + trade.opt_family + '</td></tr>';
	 	msg += '<tr><td>Tenor: ' + niceTime(trade.opt_tenor) + '<td>Start: '+ opt_start + '</td><td></td><td>Expiry: '+ opt_expiry + '</td><td>&nbsp;</td></tr>';
	}
	msg +=  '</table>';
	return msg;
}

function constructPrintTable ( data){
	var text = '<tbody>';
                     
	for (i = 0; i < data.length; i++){
		text += '<tr><td>' + printDetails (data[i]) + '</td></tr>';
	}                                  
    text += '</tbody>';
	return text;
}
 
function printDetails (trade){
	text='';
	switch (trade.inst_type){
		case 'CapFloor': 
			text += tw_option_codes[trade.opt_type][1] + ' ' + trade.term + 'y ' + trade.not_curr_1 + trade.not_amount_1+'m struck at ' + trade.price +' percent with a premium of ' + trade.opt_prem_bps + 'bp ' + trade.und_asset_1;
			break;  
		case 'CrossCurrency':
			text += trade.term + 'y ' + trade.price + ' ' + trade.not_curr_1 + trade.not_amount_1+'m ' + trade.und_asset_1 + ' ' + trade.und_asset_2;
			break;
		case 'Option':
			text += tw_option_codes[trade.opt_type][1] + ' ' + trade.inst_subtype.toLowerCase() + ' ' + trade.not_curr_1 + trade.not_amount_1+'m ' + niceTime(trade.opt_tenor) + ' option ' + trade.term + 'y tail Strike: ' + trade.opt_strike + '%  Premium: ' + trade.opt_prem_bps + 'bp (' + trade.opt_premium + ')';
		    break;
		default:
			text += trade.term + 'y ' + trade.price + '% '+ trade.not_curr_1 + trade.not_amount_1 + ' ' + trade.und_asset_1 + ' ' + trade.und_asset_2;
	}          
	return text;
}  


function constructTweet (trade){
	text='';
	switch (trade.inst_type){
		case 'CapFloor': 
			text += tw_option_codes[trade.opt_type][1] + ' ' + trade.term + 'y ' + trade.not_curr_1 + trade.not_amount_1+'m struck at ' + trade.price +' percent with a premium of ' + trade.opt_prem_bps + 'bp ';
			break;  
		case 'CrossCurrency':
			text += trade.term + 'y ' + trade.price + ' ' + trade.not_curr_1 + trade.not_amount_1+'m ' + trade.und_asset_1 + ' ' + trade.und_asset_2;
			break;
		case 'Option':
			text += tw_option_codes[trade.opt_type][1] + ' ' + trade.inst_subtype.toLowerCase() + ' ' + trade.not_curr_1 + trade.not_amount_1+'m ' + niceTime(trade.opt_tenor) + ' option ' + trade.term + 'y tail Strike: ' + trade.opt_strike + 'pct  Premium: ' + trade.opt_premium;
		    break;
		default:
			text += trade.term + 'y ' + trade.price + 'pct '+ trade.not_curr_1 + trade.not_amount_1 + ' ' + trade.und_asset_1 + ' ' + trade.und_asset_2;
	}          
	return text;
}

function tweetIntent(tweet){ 
	var width = 550;
	var height = 340;
	var left = Math.round(screen.width/2)-width/2;
	var top = Math.max(0, Math.round(screen.height/2)-height/2); 
	var windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=no,width=' + width +',height=' + height + ',left=' + left + ',top=' + top ;
	var twitterRef = "https://twitter.com/intent/tweet?hashtags=SDR&text="+tweet;
	window.open(twitterRef,'',windowOptions);

}
  

function tradeDetails (tradeId){  
	$.getJSON("tradeRequest.php?id=" + tradeId, 
		function(data){  $('#detailModal').children('.modal-body').html(constructTradeBox(data['entry']));
		$('#detailModal').modal();
		}
	);
}  


 
function tweetDetails (tradeId){
	$.getJSON("tradeRequest.php?id=" + tradeId, 
		function(data){  var message = constructTweet (data['entry']);
		tweetIntent(message);
		}
	);  
}


function tableDetails (){  
	var oTable = $('#tw-table').dataTable( {"bRetrieve" : true});  
	var pTable = $('#printTable');   
	pTable.html(constructPrintTable( oTable.fnGetData()));
	$('#printModal').modal();
}

function setOptionTable(){
	tw_option_codes['D'] = new Array('STRD','Straddle');
	tw_option_codes['D-'] = new Array('STRD','Straddle');
	tw_option_codes['RF'] = new Array('RECR','Receiver');
	tw_option_codes['PF'] = new Array('PAYER', 'Payer');
	tw_option_codes['F'] = new Array('FLR', 'Floor');
	tw_option_codes['F-'] = new Array('FLR', 'Floor');
	tw_option_codes['PC'] = new Array('CAP', 'Cap');
	tw_option_codes['C'] = new Array('CALL', 'Call');
	tw_option_codes['C-'] = new Array('CALL', 'Call');
	tw_option_codes['P'] = new Array('PUT', 'Put');
	tw_option_codes['P-'] = new Array('PUT', 'Put');
	tw_option_codes['CF'] = new Array('CAPFLR', 'Cap/Floor');
	tw_option_codes['CF'] = new Array('CAPFLR', 'Cap/Floor');
	tw_option_codes['CF'] = new Array('CAPFLR', 'Cap/Floor');
	tw_option_codes['CF'] = new Array('CAPFLR', 'Cap/Floor');
	tw_option_codes['XX'] = new Array('EXOTIC', 'Other exotic');
	tw_option_codes['RC'] = new Array('RCCOLLR', 'Collar');
	tw_option_codes['L-'] = new Array('LCOLLR', 'Collar'); 
	tw_option_codes['A'] = new Array('AMORT', 'Amortizing');
	tw_option_codes['A'] = new Array('AMORT', 'Amortizing'); 
	tw_option_codes['BU'] = new Array('BFLY', 'Butterfly'); 
	tw_option_codes['DC'] = new Array('COMP', 'Compounding'); 
	tw_option_codes['DN'] = new Array('DNT', 'Double no-touch'); 
	tw_option_codes['DO'] = new Array('DOT', 'Double one-touch'); 
	tw_option_codes['G'] = new Array('STRNG', 'Strangle');
	tw_option_codes['G-'] = new Array('STRNG', 'Strangle'); 
	tw_option_codes['JC'] = new Array('JC', 'Callable inverse snowball'); 
	tw_option_codes['KI'] = new Array('KI', 'Knock-in'); 
	tw_option_codes['KO'] = new Array('KO', 'Knock-out'); 
	tw_option_codes['NC'] = new Array('NC', 'Cancellable');
	tw_option_codes['NT'] = new Array('NT', 'No-touch');
	tw_option_codes['OT'] = new Array('OT', 'One-touch');
	tw_option_codes['RI'] = new Array('KI', 'Reverse knock-in');
	tw_option_codes['RO'] = new Array('RO', 'Reverse knock-out'); 
}

// some global settings
var tw_baseUrl = "tableRequest.php";
var tw_timerInterval = 120000;
var tw_autoRefreshTimer;  
var tw_option_codes = new Object;

$(document).ready(function(){
	setupTable(); 
	setOptionTable();           
	tw_autoRefreshTimer = setInterval ( refreshTable, tw_timerInterval);
	}
); 
