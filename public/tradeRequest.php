<?php

/// url of download action
//define ('BASE_URL', 'http://orson/trade-capture/public/rest/retrieve/format/json?');

//define ('BASE_URL', 'https://stage.totalderivatives.com/trades/rest/retrieve/format/json?');
define ('BASE_URL', 'http://johndalton.net/sdr2/public/rest/retrieve/format/json?'); 
$query_url = BASE_URL . $_SERVER['QUERY_STRING'];

$curl_handle = curl_init();
curl_setopt($curl_handle, CURLOPT_URL, $query_url);   
curl_setopt($curl_handle, CURLOPT_HTTPAUTH, CURLAUTH_BASIC ); 
curl_setopt($curl_handle, CURLOPT_USERPWD, "totalderiv:tr@dec&pture"); 
curl_setopt($curl_handle, CURLOPT_HEADER, false); 
curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 10);
curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);

$buffer = trim(curl_exec($curl_handle)); 
curl_close($curl_handle);
echo $buffer; 






