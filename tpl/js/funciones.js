
function click8(){ 
    document.getElementById("pagina8").style.display = "inline";
    
	document.getElementById("pagina1").style.display = "none";
	document.getElementById("pagina2").style.display = "none";
	document.getElementById("pagina3").style.display = "none";
	document.getElementById("pagina4").style.display = "none";
	document.getElementById("pagina5").style.display = "none";
	document.getElementById("pagina6").style.display = "none";
	document.getElementById("pagina7").style.display = "none";    
}


function agregarLibro(){
    if(estaLibroLleno()){
    	libro = '<fieldset><h3 class="titulo_libros">Codigo Libro:</h3><input type="text"  name="codigo_libro[]" readonly style="background: #D8D8D8" pattern="{2}"><h3 class="titulo_libros">Nombre Autor(s):</h3><input type="text" name="autor[]" id="nombreAutor" onblur="generarCodigoLibro(this)" rows="7" cols="75" required pattern="[a-zA-ZáéíóúñÁÉÍÓÚÑ ]{1,48}" title="El campo no debe contener números ni caracteres especiales {!@#$%^*:;,()+/~}"><h3 class="titulo_libros">Titulo Libro:</h3><input type="text"  name="titulo_libro[]" rows="7" cols="75" required pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð0-9 ,.-]{2,48}" ><h3 class="titulo_libros">Editorial:</h3><input type="text" name="editorial[]"  id="editorial" rows="7" cols="75" required pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð0-9 ,.-]{2,48}"><h3 class="titulo_libros">Año Edicion:</h3><input type="text" name="anio_publicacion[]" id="anioEdicion" onblur="generarCodigoLibro(this)" pattern="[0-9]{4}"><a class="aLibroEliminado" onclick="eliminarLibro(this)">Eliminar</a></fieldset>';
    	$("#libronuevo").append(libro);
    }
    
}

function estaLibroLleno(){
	var res = false;

	var autores = document.getElementsByName('autor[]');
	var titulos = document.getElementsByName('titulo_libro[]');
	var editoriales = document.getElementsByName('editorial[]');
	var anios = document.getElementsByName('anio_publicacion[]');

	for(var i=0; i<autores.length; i++){
		if(autores[i].value == ""){
			alert('Debe llenar el nombre de autor!!!');
			res = false;
			i = autores.length;
		}else if(titulos[i].value == ""){
			alert('Debe llenar el titulo de libro!!!');
			res = false;
			i = autores.length;
		}else if(editoriales[i].value == ""){
			alert('Debe llenar el campo editorial!!!');
			res = false;
			i = autores.length;
		}else if(anios[i].value == ""){
			alert('Debe llenar el año de edición!!!');
			res = false;
			i = autores.length;
		}else{
			res = true;
		}
	}

	return res;
}


function generarCodigoLibro(input){
    
    var padre = input.parentNode;

    var codigo = padre.getElementsByTagName("input")[0]; 
    var nombre = padre.getElementsByTagName("input")[1].value.toUpperCase().replace(",","").replace(".","").split(" ",2)[0];
    var anio = padre.getElementsByTagName("input")[4].value.substring(2,4);
    codigo.value = "["+nombre+anio+"]";
}


function eliminarLibro(eliminar){
	var parent = eliminar.parentNode;
	$(parent).remove();
}


function agregarUnidad(){
    
	if(estanLlenos()){
		unidad = '<li id="listaL">   <fieldset><label id="unidad" for="nombreunidad">NOMBRE DE LA UNIDAD:</label><input  type="text" id="nombreunidad" name="nombre_uni[]" required pattern="[a-zA-ZáéíóúñÁÉÍÓÚÑ0-9 ]{1,48}" title="El campo no debe contener caracteres especiales {!@#$%^*:;[]()+/~}"/> <label id="periodo" for="periodoacademico">DURACION DE LA UNIDAD EN PERIODOS ACADEMICOS:</label> <input  type="text"  name="duracion_uni[]" id="periodoacademico" onkeyup="controlarNumPeriodo(this)" value="0" required pattern="[0-9]{1,48}"/><fieldset><legend>OBJETIVO DE LA UNIDAD</legend><textarea name="objetivo_uni[]" rows="7" cols="75" required pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð0-9 ,.-]{2,48}"></textarea> </fieldset><fieldset><legend>CONTENIDO</legend><textarea name="contenido_uni[]" rows="7" cols="75" required pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð0-9 ,.-]{2,48}"></textarea> </fieldset><fieldset><table border> <tr> <td align="center" rowspan="6" colspan="2">METODOLOGIA <br>DE<br> ENSEÑANZA</td> <td>TECNICAS PREDOMINANTES PROPUESTAS PARA LA UNIDAD</td>  </tr> <tr> <td><textarea name="tecnica_met[]" rows="7" cols="59" required pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð0-9 ,.-]{2,48}"></textarea></td></tr><tr><td>EVALUACION DE LA UNIDAD</td></tr><tr><td><textarea name="evaluacion_met[]" rows="7" cols="59" required pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð0-9 ,.-]{2,48}"></textarea></td></tr> <tr><td>BIBLIOGRAFIA ESPECIFICA DE LA UNIDAD</td></tr><tr><td><input name="codigo_libro_met[]"><select id="libros" onclick="aumentarCodigos(this)" onchange="javascript:ShowSelected(this)">  <option value="">----Elija un libro----</option> <option value="1"></option> </select> </td> </tr> <td> <a class="unidadEliminada" onclick="eliminarUnidad()">Eliminar</a></td> </table></fieldset> </fieldset> <br></li>';
		$("#unidadNueva").append(unidad);
	}
    
}

function estanLlenos(){
	var res = false;
	//console.log("padre:"+ btnAgregarUni.parentNode);
	var unidades = document.getElementsByName('nombre_uni[]');
	//console.log("unidades:"+ unidades.length);
	var tiempos = document.getElementsByName('duracion_uni[]');
	var objetivos = document.getElementsByName('objetivo_uni[]');
	var contenidos = document.getElementsByName('contenido_uni[]');
	var tecnicas = document.getElementsByName('tecnica_met[]');
	var evaluaciones = document.getElementsByName('evaluacion_met[]');
	var libros = document.getElementsByName('codigo_libro_met[]');


	for(var i = 0; i < unidades.length; i++){

		if(unidades[i].value == ""){
			alert("Debe llenar el nombre de unidad!!!");
			res = false;
			i=unidades.length;
		}else if(tiempos[i].value == ""){
			alert("Debe llenar duracion de unidad!!!");
			res = false;
			i=unidades.length;
		}else if(objetivos[i].value == ""){
			alert("Debe llenar objetivo de unidad!!!");
			res = false;
			i=unidades.length;
		}else if(contenidos[i].value == ""){
			alert("Debe llenar contenido de unidad!!!");
			res = false;
			i=unidades.length;
		}else if(tecnicas[i].value == ""){
			alert("Debe llenar tecnicas predominantes!!!");
			res = false;
			i=unidades.length;
		}else if(evaluaciones[i].value == ""){
			alert("Debe llenar evaluacion de unidad!!!");
			res = false;
			i=unidades.length;
		}else if(libros[i].value == ""){
			alert("Debe llenar libro en bibliografía!!!");
			res = false;
			i=unidades.length;
		}else if(!esCodigosLibro(libros[i].value)){
			alert("Los libros se ingresaron de forma incorrecta!!!\n Seleccione nuevamente los libros");
			libros[i].value= "";
			i=unidades.length;
			res = false;
		}else{ // si no falta nada
			res = true;	
		}

	}

	return res;
}


function esCodigosLibro(cadena){
	var res = false;
	var longitud = cadena.length;

	if(longitud > 0){
		if(cadena[0] == '[' && cadena[longitud-1] == ']'){
			res = true;
		}
	}
	
	return res;
}

function controlarNumPeriodo(elemento){
	var dato = elemento.value;
            
        if(isNaN(dato)){
            alert('Debe poner valores numérico en duración!!');
            //console.log(size);
            elemento.value = 0;
        
        }else{
            	var tiempos = document.getElementsByName('duracion_uni[]');
                var total = 0;
                var max = 16;	
                for(var i=0; i < tiempos.length; i++){
                	total = total + parseFloat(tiempos[i].value);
                	//console.log("total= "+total);
        		}

                var sobrante = max - total;

                if(sobrante < 0){
                	alert("La cantidad de periodos ha sido sobrepasada!!!\nIngrese un número menor");
                	elemento.value = 0;
                }

            }

}

function aumentarCodigos(select){         
    var option = '';

	var codigos = document.getElementsByName('codigo_libro[]');
	var titulos = document.getElementsByName('titulo_libro[]');
    
	for(var i=0; i<codigos.length; i++){
		var codigo = codigos[i].value;
		var titulo = titulos[i].value;

		var valor = codigo +"  "+ titulo;
                      
		option = option + '<option value="'+i+'">'+valor+'</option>';
	}

    select.innerHTML = '<option value="">----Elija un libro----</option>' + option;
}


function ShowSelected(select) 
{
    var selected = select.options[select.selectedIndex].text.replace(",","").replace(".","").split(" ",2)[0]; 
    var input = select.parentNode.getElementsByTagName("input")[0];
    input.value = input.value + selected;
}


function eliminarUnidad(){
	$(document).on("click",".unidadEliminada",function(){
		var parent = $(this).parents().get(5);
			$(parent).remove();
				});
}


function generarCronograma(){
		click8();

		var filas = '';
		var esp_cronograma = document.getElementById('cronograma');
		
		var unidades = document.getElementsByName('nombre_uni[]');
		for(var i=0; i<unidades.length; i++){
			var valor = unidades[i].value;
			filas = filas + '<tr class="fila-cronograma"><td width="250"><input type="text" class="nombre" size="40" readonly value="'+valor+'"/></td><td class="nombre"> </td> <td class="nombre"> </td> <td class="nombre"> </td> <td class="nombre"> </td>   <td class="nombre"> </td> <td class="nombre"> </td> <td class="nombre"> </td> <td class="nombre"> </td><td class="nombre"> </td> <td class="nombre"> </td> <td class="nombre"> </td> <td class="nombre"> </td><td class="nombre"> </td> <td class="nombre"> </td> <td class="nombre"> </td> <td class="nombre"> </td>    <!--<td class="eliminar" align="center">Eliminar</td>-->   </tr>';
		}

		esp_cronograma.innerHTML = '<table id="tabla-cronograma" border="1"><tbody> <tr><tr><td width="250" rowspan="2" align="center">Actividad</td><td colspan="4" align="center">MES 1</td> <td colspan="4" align="center">MES 2</td> <td colspan="4" align="center">MES 3</td> <td colspan="4" align="center">MES 4</td> <!--<td rowspan="2">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td>-->  </tr><tr><td>1</td> <td>2</td> <td>3</td> <td>4</td>   <td>1</td> <td>2</td> <td>3</td> <td>4</td><td>1</td> <td>2</td> <td>3</td> <td>4</td>   <td>1</td> <td>2</td> <td>3</td> <td>4</td></tr></tr>'+filas+'</tbody></table>';

		pintarCeldas();

}

function pintarCeldas(){
	//Este bucle recorre cada uno de los input's que contienen la duracion de unidad
	var tabla = document.getElementById('tabla-cronograma');
	var filas = tabla.getElementsByTagName('tr');
	var duracionTotal = 0;

	if(filas.length>3){
		for(var i=3; i<filas.length; i++){

			var tiempo = parseFloat(document.getElementsByName('duracion_uni[]')[i-3].value);
			var celdas = filas[i].getElementsByTagName('td');
			//console.log("numero celdas fila "+[i-3]+": "+celdas.length);
			if(tiempo>=0){
				duracionTotal = duracionTotal + tiempo;
			//console.log("duracion total: "+duracionTotal);
				var ini = (duracionTotal - tiempo) + 1;
			//console.log("valor ini: "+ini);
				for(var j=ini; j<=duracionTotal; j++){
					celdas[j].style.backgroundColor = '#336666'
				}
			}
		}

	}

}



function agregarEvaluacion(){
	
    if(verificarLlenadoEvaluacion()){
    	$("#tabla0 tbody tr:eq(0)").clone().removeClass('fila-base0').appendTo("#tabla0 tbody");
    } 
 
}

function verificarLlenadoEvaluacion(){
	var res = false;

	var opciones = document.getElementsByName('tipo_evaluacion[]');
	var descripciones = document.getElementsByName('descripcion_eva[]');

	for(var i = 1; i < opciones.length; i++){
		if(opciones[i].options[opciones[i].selectedIndex].value == "0"){
			alert("Debe escoger una opcion!!!");
			res = false;
			i = opciones.length;
		}else if(descripciones[i].value == ""){
			alert("Debe llenar la descripción de evaluacion!!!");
			res = false;
			i = opciones.length;
		}else{
			res = true;
		}
	}

	return res;
}


function insertarEvaluacion(){
	//VErificar si la opcion es duplicada o no se ha elegido una opcion, o si eligio otros
	var opciones = document.getElementsByName('tipo_evaluacion[]');
	var primerP = document.getElementById('tabla1');
	var segundoP = document.getElementById('tabla2');
	var evaluaciones1 = "";
	var evaluaciones2 = "";


	for(var i=1; i<opciones.length; i++){
		var opcion = opciones[i].options[opciones[i].selectedIndex].value;
		
		if(opcion != '0'){
			evaluaciones1 = evaluaciones1 + '<label class="labelParcial"><strong>'+opcion+'</strong></label><input type="text" name="puntaje1[]" class="inputPuntaje" value="0" onkeyup="verificarPuntajePP(this)" required pattern="[0-9]{1,48}"><br>';
			evaluaciones2 = evaluaciones2 + '<label class="labelParcial"><strong>'+opcion+'</strong></label><input type="text" name="puntaje2[]" class="inputPuntaje" value="0" onkeyup="verificarPuntajeSP(this)" required pattern="[0-9]{1,48}"><br>';
		
		}
	}

	primerP.innerHTML = evaluaciones1;
	segundoP.innerHTML = evaluaciones2;
}

function verificarDiferente(select){
	var opciones = document.getElementsByName('tipo_evaluacion[]');
	var opcionElegida = select.options[select.selectedIndex].value;
	var cont = 0;
	
	if(opcionElegida != "0"){

		if(opcionElegida == select.options[select.options.length-1].value){
			var nombre = prompt("Escriba el nuevo tipo de evaluacion:");
			//Agregar a todos los selects
			if(nombre != "" && nombre != null){//Falta controlar espacios y nombres repetidos
				
				insertarNewOption(nombre);
			}

			
		}else{
			for(var i = 1; i < opciones.length; i++){
				if(opciones[i].options[opciones[i].selectedIndex].value == opcionElegida){
					cont++;
				}
			}

			if(cont>1){
				alert("La opcion ya ha sido seleccionada!!!\nElija una opcion diferente");
				select.selectedIndex = select.options[0];
			}else{
				insertarEvaluacion();
			}
		}

	}else{
		alert("Debes elegir una opción diferente!!!");
		insertarEvaluacion();
	}
	
}

function insertarNewOption(nombre){
	var selects = document.getElementsByName('tipo_evaluacion[]');
	var newOption = new Option(nombre, nombre, "defaultSelected", false);
    var newOtros = new Option("Otros", "Otros", "defaultSelected", false);
	
	for(var i=0; i<selects.length; i++){
		var newOption = new Option(nombre, nombre, "defaultSelected", false);
    	var newOtros = new Option("Otros", "Otros", "defaultSelected", false);
	
		selects[i].options[selects[i].options.length-1] =  newOption;
		selects[i].options[selects[i].options.length] = newOtros;
	}

}

function eliminarEvaluacion(){
	$(document).on("click",".eliminar0",function(){
                    var parent = $(this).parents().get(0);
                    $(parent).remove();
                
                    insertarEvaluacion();
                });
}

function verificarPuntajePP(elemento){
	var dato = elemento.value;
            
        if(isNaN(dato)){
            alert('Debe poner valores numéricos!!');
            elemento.value = 0;      
        }else{
            	var puntajes = document.getElementsByName('puntaje1[]');
                var total = 0;
                var max = 100;
            	
                for(var i=0; i < puntajes.length; i++){
                	if(puntajes[i].value != ""){
                		total = total + parseFloat(puntajes[i].value);
                		console.log("total= "+total);
                	}
                }

                var sobrante = max - total;

                if(sobrante < 0){
                	//alert("La puntuacion total no debe sobrepasar a 100!!!\n");
                	var actual = total - parseFloat(dato);
                	var valorAsignar = max - actual;
                	alert("La puntuacion total no debe sobrepasar a 100!!!\nLe quedan "+valorAsignar+" puntos");
                	elemento.value = valorAsignar;
                }

            }

}

function verificarPuntajeSP(elemento){
	var dato = elemento.value;
            
        if(isNaN(dato)){
            alert('Debe poner valores numéricos!!');
            elemento.value = 0;      
        }else{
            	var puntajes = document.getElementsByName('puntaje2[]');
                var total = 0;
                var max = 100;
            	
                for(var i=0; i < puntajes.length; i++){
                	if(puntajes[i].value != ""){
                		total = total + parseFloat(puntajes[i].value);
                		console.log("total= "+total);
                	}
                	
        		}

                var sobrante = max - total;

                if(sobrante < 0){
                	//alert("La puntuacion total no debe sobrepasar a 100!!!\n");
                	var actual = total - parseFloat(dato);
                	var valorAsignar = max - actual;
                	alert("La puntuacion total no debe sobrepasar a 100!!!\nLe quedan "+valorAsignar+" puntos");
                	elemento.value = valorAsignar;
                }

            }
}

function agregarHorario () {
	if(estaHorarioLleno()){
		$("#tablaHorario tbody tr:eq(0)").clone().removeClass('fila-baseH').appendTo("#tablaHorario tbody");

	}   
}

function estaHorarioLleno () {
	var res = false;

	var opciones = document.getElementsByName('selectDia[]');
	var horarios = document.getElementsByName('horario[]');
	var aulas = document.getElementsByName('aula[]');

	for(var i = 1; i < opciones.length; i++){
		if(opciones[i].options[opciones[i].selectedIndex].value == ""){
			alert("Debe seleccionar un día!!!");
			res = false;
			i = opciones.length;
		}else if(horarios[i].value == ""){
			alert("Debe llenar la hora!!!");
			res = false;
			i = opciones.length;
		}else if(aulas[i].value == ""){
			alert("Debe llenar el aula!!!");
			res = false;
			i = opciones.length;
		}else{
			res = true;
		}
	}

	return res;

}

function eliminarHorario () {
	$(document).on("click",".eliminar",function(){
                    var parent = $(this).parents().get(0);
                    $(parent).remove();
                });
}








