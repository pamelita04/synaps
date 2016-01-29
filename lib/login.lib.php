<?php
class login
{
  function validate($login,$password) //recives the strings with username & password, returns the user id if the user is registered & false if there were not coincidences in the database
  {
    $query = new query;
    $pass = md5(md5($password));
    $row = $query->getRows("login, password, idusuario","usuario");
    foreach($row as $key)
    {
      if ($key['login'] == $login)
      	if ($key['password'] == $pass)
      		return $key['idusuario'];
    }
    return false;
  }
  
	function loginUser($user_id)
	{
		$query = new query;
		$row = $query->getRow("idusuario, nombreusuario, tipousuario","usuario","WHERE idusuario = $user_id");
		$_SESSION['logged'] = 1;
		$_SESSION['nombreusuario'] = $row['nombreusuario'];
		$_SESSION['idusuario'] = $row['idusuario'];
		$_SESSION['tipousuario'] = $row['tipousuario'];
	}

}
?>