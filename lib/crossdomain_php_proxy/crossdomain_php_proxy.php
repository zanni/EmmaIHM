<?php     
if($_SERVER['REQUEST_METHOD']=='GET'){
	$url = $_GET["proxy"]["url"];
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	   
    
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($tuCurl, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$response = curl_exec($ch);
	echo $response;
}
else if($_SERVER['REQUEST_METHOD']=='PUT'){
    
    parse_str(file_get_contents("php://input"),$json);
    $output = exec("./script/put.sh ".$json["proxy"]["url"]." ".$json["proxy"]["data"]);
    echo $output;
    
}
?>