<?php 
class Clsconnection{
    public static $user = 'epmusr';
    public static $pass = 'C0NT4C2016!';
    public static $host = '192.168.3.30';
    public static $db = 'epmpuntoscontacto';
    public static $con;

    public static function conect(){        
        try {
            if (!self::$con){
                self::$con = new PDO('mysql:host='.self::$host.'; dbname='.self::$db, self::$user, self::$pass,
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'",PDO::ATTR_PERSISTENT => true));  
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