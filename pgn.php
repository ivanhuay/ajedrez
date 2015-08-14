<?
/*
*====================================
*A PHP EXAMPLE TO READ A PGN FILE ===
*====================================
*/

$fileName = "source/inline.pgn";
$default_values = array(
	"event"=>"default",
	"site"=>"default",
	"date"=>date("Y.m.d"),
	"round"=>0,
	"white"=>"default white",
	"black"=>"default black",
	"result"=>"0-0",
	"eco"=>"",
	"whiteelo"=>"",
	"blackelo"=>"",
	"setup"=>1,
	"fen"=>FALSE,
	"plycount"=>"0",
	"eventdate"=>date("Y.m.d"),
	"pgn"=>""
);
if(file_exists($fileName)){
	
	$myfile = fopen($fileName, "r") or die("unable to open file");
	
	$data = array();

	while(!feof($myfile)){
		
		$line = fgets($myfile);
		
		$cleanline = strtr($line,"[]","  ");
		
		if($cleanline != $line){
			
			$cleanline = trim($cleanline);
			
			$separators = explode(" ",$cleanline);
			
			$key = strtolower($separators[0]);
			
			$value = $separators[1];
			$value = trim($value,"\"");

			$data[$key] = $value;
		
		}else if(trim($line) != ""){
			
			$data["pgn"] = $line;
		
		}
	}
	$resp = array_merge($default_values,$data);

}else{
	$resp = array("error"=>"1","msg"=>"Error archivo no encontrado!");
}

/*
echo "<pre>";
print_r($resp);
echo "</pre>";
*/

header("Content-Type: application/json");
echo json_encode($resp);