<?php

/**
* 
*/
class Modeluser {
	private $con;
	
	public function __construct()	{
		$this->con = Clsconnection::conect();
	}
}