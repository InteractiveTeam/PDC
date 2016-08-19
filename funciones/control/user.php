<?php 
	include '../generic/Clsconnection.php';
    include '../model/Modeluser.php';

	if($_POST['action']){
        $dataUser = $_POST['data'];
        $objUser = new Modeluser();
        
		switch ($_POST['action']) {
            case 'login':
                $result = $objUser->login($dataUser);
				
                print_r(json_encode($result));
				
                break;
			case 'recordUser':
                $pass = password_hash($dataUser['pwd'],PASSWORD_DEFAULT);
                $miIp = getRealIP();
                $result = $objUser->recordUser($dataUser,$miIp,$pass);                
                print_r(json_encode($result));
				break;
		}
	}

    function generatePassword($length = 9) {
	    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	    $count = mb_strlen($chars);

	    for ($i = 0, $result = ''; $i < $length; $i++) {
	        $index = rand(0, $count - 1);
	        $result .= mb_substr($chars, $index, 1);
	    }

	    return $result;
	}

	function sendEmail($email,$name,$subject,$body,$emailFrom = ''){
		require_once('phpmailer/PHPMailerAutoload.php');
		//include("class.smtp.php"); // optional, gets called from within class.phpmailer.php if not already loaded

		$mail = new PHPMailer;
		//$mail->SMTPDebug = 3;                               // Enable verbose debug output
		$mail->isSMTP();                                      // Set mailer to use SMTP
		$mail->Host = '';  // Specify main and backup SMTP servers
		$mail->SMTPAuth = true;                               // Enable SMTP authentication
		$mail->Username = '';                 // SMTP username
		$mail->Password = '';                           // SMTP password
		//$mail->Port = 26;                                    // TCP port to connect to 

		$mail->setFrom($emailFrom, 'Información Alkomprar');
		$mail->addAddress($email, $name);     // Add a recipient
		
		$mail->isHTML(true);                                  // Set email format to HTML
		$mail->CharSet = 'UTF-8';
		$mail->Subject = $subject;
		$mail->Body    = $body;
		//$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

		if(!$mail->send()) {
			return array('Error'=> $mail->ErrorInfo,'status'=>0);		    
		} else {
		    return array('status'=>1);
		}
	}

	function getRealIP() {
		if (!empty($_SERVER['HTTP_CLIENT_IP']))
			return $_SERVER['HTTP_CLIENT_IP'];
		if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
			return $_SERVER['HTTP_X_FORWARDED_FOR'];
		return $_SERVER['REMOTE_ADDR'];
	}
?>