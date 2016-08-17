<?php

/**
* 
*/
class Modeluser {
	private $conn;
	
	public function __construct(){
		$this->conn = Clsconnection::conect();
	}
    
    public function recordUser($data,$ip,$pass){
        date_default_timezone_set('America/bogota');
        $query = "INSERT INTO users (name, last_name, email,password,ip,date_create) VALUES (?,?,?,?,?,?)";
        
        $stmt = $this->conn->prepare($query);
        return $stmt->execute(array($data['name'],$data['lastName'],$data['email'],$pass,$ip,date('Y-m-d h:s:i')));
    }
}