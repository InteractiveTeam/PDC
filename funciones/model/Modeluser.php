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
//        date_default_timezone_set('America/bogota');
//        $query = "SELECT * FROM users WHERE email = ?";
//        $data = array($data['email']);
//        $result = $this->queries($query,$data);
        
        //if(!$result){
            $query = "INSERT INTO users (name, last_name, email,password,ip,date_create) VALUES (?,?,?,?,?,?)";

            $stmt = $this->conn->prepare($query);

            $test = $stmt->execute(array($data['name'],$data['lastName'],$data['email'],$pass,$ip,date('Y-m-d h:s:i')));
            
            return array('data'=>$test);
            $lastId = $this->conn->lastInsertId();

            $query = "SELECT * FROM users WHERE id = ?";
            $data = array($lastId);
            $result = $this->queries($query,$data);
        //}
        return array('data'=>$result);
    }
    
    public function login($data){        
        $query = "SELECT * FROM users WHERE email = ?";
        $data = array($data['user']);
        $result = $this->queries($query,$data);
        if($result){
            if (password_verify($data['pwd'],$result['password']))
                return array('status'=>true,'data'=>$result);
            else
                return array('status'=>false,'msg'=>'Pass incorrecto');            
        }else{
            return array('status'=>false);
        }
    }
    public function queries($query,$data){
        $stmt = $this->conn->prepare($query);
        $stmt->execute($data);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}