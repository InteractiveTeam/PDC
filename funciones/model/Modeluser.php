<?php

/**
* 
*/
class Modeluser {
	private $conn;
	
	public function __construct(){
		$this->conn = Clsconnection::conect();
	}
    
    private function consultUser($email){
        $query = "SELECT * FROM users WHERE email = ?";        
        $result = $this->queries($query,array($email));
        return $result;
    }
    
    public function recordUser($data,$ip,$pass){
        date_default_timezone_set('America/bogota');
        $result = $this->consultUser($data['email']);
        if(!$result){
            $query = "INSERT INTO users (name, last_name, email,password,ip,date_create) VALUES (?,?,?,?,?,?)";
            $stmt = $this->conn->prepare($query);
            $stmt->execute(array($data['name'],$data['lastName'],$data['email'],$pass,$ip,date('Y-m-d h:s:i')));
        
            $lastId = $this->conn->lastInsertId();
            
            $query = "SELECT * FROM users WHERE id = ?";
            $data = array($lastId);
            $result = $this->queries($query,$data);
            return array('data'=>$result);
        }else{
            return array('data'=>false,'msg'=>'User exist');
        }        
    }
    
    public function login($data){
        $result = $this->consultUser($data['user']);
        if($result){
            if (password_verify($data['pwd'],$result['password']))
                return array('status'=>true,'data'=>$result);
            else
                return array('status'=>false,'msg'=>'Pass incorrecto');            
        }else{
            return array('status'=>false);
        }
    }
    public function forgotPass($data){
        $result = $this->consultUser($data['emailPass']);
        if($result){
            $newPass = password_hash($this->generatePassword(),PASSWORD_DEFAULT);
            $query = "UPDATE users SET password =? WHERE email=?";
            $stmt = $this->conn->prepare($query);
            $result = $stmt->execute(array($newPass,$data['emailPass']));
            return array('data'=>$result,'newPass'=>$newPass);
        }else{
            return array('data'=>false,'msg'=>'User no exist');
        }
    }
    
    public function saveData($user,$data){
        $query = "SELECT * FROM data_fields WHERE id_user = ?";
        $result = $this->queries($query,array($user['id']));
        if(!$result){
           $query = "INSERT INTO data_fields (id_user,pensemos_marca1,pensemos_marca2,pensemos_marca3,pensemos_marca4,pensemos_marca5,describe_personaje1,describe_personaje2)    VALUES(?,?,?,?,?)";
            $stmt = $this->conn->prepare($query);
            $result = $stmt->execute(array(
                $user['id'],
                $data['pensemos_marca1'],
                $data['pensemos_marca2'],
                $data['describe_personaje1'],
                $data['describe_personaje2']
            ));
            return array('data'=>$result);
        }else{
            $query = "UPDATE data_fields SET ".key($data)." =? WHERE id_user=?";            
            $stmt = $this->conn->prepare($query);
            $result = $stmt->execute(array($data[key($data)],$user['id']));
            
            return array('data'=>$result);
        }
    }
    //consultamos la información que ha ingresado el usuario en cada página
    public function getData($user){
        $query = "SELECT * FROM data_fields WHERE id_user = ?";
        $result = $this->queries($query,array($user['id']));
        return array('data'=>$result);
    }
        
    public function generatePassword($length = 9){
	    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	    $count = mb_strlen($chars);

	    for ($i = 0, $result = ''; $i < $length; $i++) {
	        $index = rand(0, $count - 1);
	        $result .= mb_substr($chars, $index, 1);
	    }

	    return $result;
	}
    public function queries($query,$data){
        $stmt = $this->conn->prepare($query);
        $stmt->execute($data);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}