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
    
    public function login($data){        
        $query = "SELECT * FROM users WHERE email = ?";
				
        $stmt = $this->conn->prepare($query);
        $stmt->execute(array($data['user']));
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if($result){
            if (password_verify($data['pwd'],$result['password']))
                return array('status'=>true,'data'=>$result);
            else
                return array('status'=>false,'msg'=>'Pass incorrecto');            
        }else{
            return array('status'=>false);
        }
    }
}