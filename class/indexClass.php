<?php
class index
{
    
	function Display()
	{
		$template = new template;
		//$template->SetTemplate('tpl/index.html');  
		$template->SetTemplate('tpl/index.html');  //Direccionando directo al formulario

		return $template->Display();
	}
}
?>