<?php
require_once('lib/includeLibsBd.php');
require_once('class/registroPG.class.php');

$class = new registroPG;

	//echo $class->guardarDatos();	
/*if (!empty($_GET['action'])) { 
	
	switch($_GET['action']){
		
		case "guardarBiblio" :
			echo $class->guardarBiblio();
		break;
		case "guardarPG" :
			echo $class->guardarPG();
		break;

	}

	echo $class->Display();

   }*/

   if(!empty($_POST['guardarPG'])){
   		echo $class->guardarPG();
   }

	echo $class->Display();
?>