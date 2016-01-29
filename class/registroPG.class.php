<?php
class registroPG
{

	var $numero = 1;

	function guardarPG(){
		$query = new query;

		$planGlobal['justif_razon'] = $_POST['justif_razon'];
		$planGlobal['justif_porque'] = $_POST['justif_porque'];
		$planGlobal['justif_enque'] = $_POST['justif_enque'];
		$planGlobal['proposito_gral'] = $_POST['proposito_gral'];
		$planGlobal['objetivo_gral'] = $_POST['objetivo_gral'];
		//$planGlobal['evaluacion'] = $_POST['evaluacion'];


		//1ro insertar en tabla "plan_global"

		if($query->dbInsert($planGlobal, 'plan_global')){
				$this->guardarLibros(); //2do insertar en tabla 'libro'
		}else{
			echo "<script>alert('Error al guardar datos en PG!');</script>";
		}


	}

	function guardarLibros(){
		$query = new query;

		for($i=0; $i < count($_POST['codigo_libro']); $i++){

			if(!empty($_POST['codigo_libro'][$i])){
				//Implementar un verificador de codigo para evitar duplicidad
				
				$codLibro = $this->listarCodigos($_POST['codigo_libro'][$i]);
				$idLibro = $codLibro[0];

				//$libro['id_libro'] = $_POST['codigo_libro'][$i];

				if($this->verificarIdLibro($idLibro) == false){
					$libro['id_libro'] = $idLibro;
					$libro['autor'] = $_POST['autor'][$i];
					$libro['titulo'] = $_POST['titulo_libro'][$i];
					$libro['editorial'] = $_POST['editorial'][$i];
					$libro['anio_publicacion'] = $_POST['anio_publicacion'][$i];
		
		    		if($query->dbInsert($libro, 'libro')){
			   			//echo "<script>alert('Datos de libro guardados con exito');</script>";
		 			}else{
						echo "<script>alert('Error al guardar datos de Libro!');</script>";
					}	
				}
			}
		}

		$this->guardarMetUniLib();
	}

	function verificarIdLibro($codLibro){
		$res = false;
		$query = new query();

		$idLibro = $query->getRow('id_libro', 'libro', 'where id_libro= "'.$codLibro.'"');
		$id = $idLibro['id_libro'];

		if($id == $codLibro){
			$res = true;
		}

		return $res;
	}

	function guardarMetUniLib(){
		$query = new query();

		$pg = $query->getRow('max(cod_pg)', 'plan_global', ' ');
		$idPG = $pg['max(cod_pg)'];

		for($i=0; $i < count($_POST['tecnica_met']); $i++){

			if(!empty($_POST['tecnica_met'][$i])){
				//para duplicidad, hacer una comparacion en este punto
				$metodologia['tecnica_met'] = $_POST['tecnica_met'][$i];
				$metodologia['evaluacion_met'] = $_POST['evaluacion_met'][$i];
			
				$query->dbInsert($metodologia, 'metodologia');
			}


			//para evitar duplicidad, tendria q coger id del metodologia que se parezca
			$met = $query->getRow('max(id_met)', 'metodologia', ' ');
			$idMet = $met['max(id_met)'];

			
			if(!empty($_POST['nombre_uni'][$i])){
				$unidadDidactica['id_met'] = $idMet;
				$unidadDidactica['cod_pg'] = $idPG;
				$unidadDidactica['nombre_uni'] = $_POST['nombre_uni'][$i];
				$unidadDidactica['duracion_uni'] = $_POST['duracion_uni'][$i];
				$unidadDidactica['objetivo_uni'] = $_POST['objetivo_uni'][$i];
				$unidadDidactica['contenido_uni'] = $_POST['contenido_uni'][$i];
			
				$query->dbInsert($unidadDidactica, 'unidad_didactica');
			}

			//Probar matriz para los libros en metod

			if(!empty($_POST['codigo_libro_met'][$i])){
				$libroMetod['id_met'] = $idMet;
				
				$librosDeMetod = $this->listarCodigos($_POST['codigo_libro_met'][$i]);
				
				for($j=0; $j < count($librosDeMetod); $j++){
					$libroMetod['id_libro'] = $librosDeMetod[$j];

					$query->dbInsert($libroMetod, 'libro_metod');

				}
			}
		}

		$this->guardarTipoEva($idPG);

	}


	function listarCodigos($codigos){
		$res = array();
		
		$cadena = '';

		$codigosApertura = explode('[', $codigos);
		
		//echo "cantidad: ".count($codigosApertura)." ";

		for ($i=1; $i < count($codigosApertura) ; $i++) { 
			$cadena = $cadena.$codigosApertura[$i];
			//echo $i.": ".$codigosApertura[$i];
		}

		$codigosCierre = explode(']', $cadena);
		//echo "cierre: ".count($codigosCierre);

		for($i=0; $i<count($codigosCierre)-1; $i++){
			//echo "cierre ".$i .": ".$codigosCierre[$i];
			$res[$i] = $codigosCierre[$i];
		}

		//echo "numero res: ".count($res);
		return $res;

	}

	function guardarTipoEva($idPG){
		$query = new query();

		for($i = 1; $i < count($_POST['tipo_evaluacion']); $i++){
			$nombre_tipo = $_POST['tipo_evaluacion'][$i];


			if($this->verificarTipoLibro($nombre_tipo) == false){
				$tipo_evaluacion['nombre_tipo'] = $nombre_tipo;
				$query->dbInsert($tipo_evaluacion, 'tipo_evaluacion');
			}	
		}

		$this->guardarEvaluacion($idPG);

	}

	function verificarTipoLibro($nombreTipo){
		$query = new query();
		$res = false;
		
		$nombreT = $query->getRow('nombre_tipo', 'tipo_evaluacion', 'where nombre_tipo = "'.$nombreTipo.'"');
		$nombre = $nombreT['nombre_tipo'];

		if($nombre == $nombreTipo){
			$res = true;
		}

		return $res;

	}

	function guardarEvaluacion($idPG){
		$query = new query();
		$limit = count($_POST['descripcion_eva']);

		for($i = 1; $i < $limit; $i++){
			$evaluacion['id_tipo_eva'] = $this->obtenerIdTipo($_POST['tipo_evaluacion'][$i]);
			$evaluacion['cod_pg'] = $idPG;
			$evaluacion['descripcion_eva'] = $_POST['descripcion_eva'][$i];
			$evaluacion['puntaje1'] = $_POST['puntaje1'][$i-1];
			$evaluacion['puntaje2'] = $_POST['puntaje2'][$i-1];

			if($query->dbInsert($evaluacion, 'evaluacion') && $i==$limit-1){
				echo "<script>alert('¡¡Datos guardados con éxito!!');</script>";
			}
		}
	}

	function obtenerIdTipo($nombreTipo){
		$query = new query();
		$res = "";

		$idTipo = $query->getRow('id_tipo_eva', 'tipo_evaluacion', 'where nombre_tipo="'.$nombreTipo.'"');
		$res = $idTipo['id_tipo_eva'];
		
		return $res;
	}

	function Display()
	{
		$template = new template;

		if($this->numero == 1){
			$template->SetTemplate('tpl/index.html');
		}
		return $template->Display();
	}

}


?>