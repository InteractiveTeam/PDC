<?php 

class Clsconnection{
    private $user = 'root';
    private $pass = '';
    private $host = 'localhost';
    private $db = 'ptos_epm';
    private static $con;

    public static function conect(){
        try {
            if (!self::$con){                     
                self::$con = new PDO('mysql:host='.$this->$db_host.'; dbname='.$this->db_name, $this->$db_user, $this->$user_pw);  
                self::$con->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
            }
            return self::$con;
        } catch (Exception $e) {
        	echo "the connection fail";
            $err->getMessage() . "<br/>";
            die();
        }
    }
}