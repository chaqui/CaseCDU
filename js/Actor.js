
///////////////////////////////////clases///////////////////////////////////////

///coordenadasSimples
function CoordenadasSimples(x,y) {
  this.x = x;
  this.y= y;
}


///CoordenadasComplejas
function CoordenadasComplejas(coordenada1,coordenada2)
{
    this.coordenada1=coordenada1;
    this.coordenada2=coordenada2;
}


///Atributos de Cada Actor
function Atributos(tipo, nombre){
    this.tipo=tipo;
    this.nombre=nombre;
}


///Clase para Actores
function Actor(nombre,x,y){
    this.cantidadDeAtributos=0;
    this.nombre=nombre;
    this.ubicacion= new CoordenadasSimples(x,y);
    this.atributos= [];
    
    //agregar atributos del actor
    this.agregarAtributo =  function(tipo,nombre){
        this.atributos[this.cantidadDeAtributos]= new Atributos(tipo,nombre);
        this.cantidadDeAtributos++;
    }
    
    //modificar nombre de los atributos del actor
    this.ModificarNombreAtributo = function(nombreAntiguo, nuevoNombre){
        for (var i = 0; i < this.cantidadDeAtributos; i++) {
            if (this.atributos[i].nombre==nombreAntiguo) {
                this.atributos[i].nombre=nuevoNombre;
            }
        }
    }
}


//Clase para caso de Uso
function CasoDeUso(nombre,x,y,ancho,alto){
    this.nombre=nombre;
    this.ubicacion= new CoordenadasSimples(x,y);
    this.ancho=ancho;
    this.alto=alto;
    
}


//Clase para Asociaciones
function Asociacion(estereotipo,ubicacion1,ubicacion2){
    this.estereotipo=estereotipo;
    this.ubicacion1= new CoordenadasComplejas(ubicacion1,ubicacion2);
    
}

///////////////////////////////////////////////fin de las clases////////////////
////////////////////////////////////////////////////////////////////////////////

//////Clase Principal////
function Principal(){
    //Actores
    this.actores=[];
    this.numeroDeActores=0;
    //Asociaciones
    this.Asociaciones=[];
    this.numeroDeAsociaciones=0;
    //casos de Uso
    this.casosDeUso=[];
    this.numeroDeCasosDeUso=0;
    this.actor=false, this.cursor=false, this.casoDeUso=false;
    this.asociacion=false; 
    ///////////////////////////////Funciones Principales 

    this.agregarActor=function (nombre,x,y){
        this.actores[this.numeroDeActores]= new Actor(nombre,x,y);
        this.numeroDeActores++;
    }

    this.agregarAsociacion= function (estereotipo,ubicacion1,ubicacion2){
        this.Asociaciones[this.numeroDeAsociaciones]= new Asociacion(estereotipo,
        ubicacion1,ubicacion2);
        this.numeroDeAsociaciones++;
    }

    this.agregarCasoDeUso=function (nombre,x,y,ancho,alto){
        this.casosDeUso[this.numeroDeCasosDeUso]= new CasoDeUso(nombre,x,y,ancho,alto);
        this.numeroDeCasosDeUso++;
    }
    this.crearTabladeAtributos =function (atributos){
        var tabla ="<table>";
        for (var i = 0; i < atributos.length; i++) {
            tabla=tabla+"<tr>";
            tabla=tabla+"<td>";
            tabla=tabla+atributos[i].nombre;
            tabla=tabla+"</td>";
            tabla=tabla+"<td>";
            tabla=tabla+atributos[i].tipo;
            tabla=tabla+"</td>";
            tabla=tabla+"</tr>";
        }
        tabla=tabla+"</table>";
        return tabla;
    }
    this.regresaarPie = function (nombre, tipo) {
        var html;
        if (tipo=="actor") {
            for (var i = 0; i < this.actores.length; i++) {
                if (this.actores[i].nombre==nombre) {
                    html="  <input type='text' id='tipo'  value='usuario'  onclick='this.value='';' onfocus='this.select()' onblur='this.value=!this.value?'tipo de dato':this.value;' /> <input type='text' id='nombre' value='usuario'  onclick=\"this.value='';\" onfocus'this.select()' onblur=\"this.value=!this.value?'usuario':this.value;\"/> <input type='button' onclick='ingresaAtributo()' value='ingresar'/>";
                    if (this.actores[i].atributos!==null) {
                        return "ACTOR <br /> atributos: <br />"+this.crearTabladeAtributos(this.actores[i].atributos)+html;    
                        }
                    else{
                        return "ACTOR:"+nombre+" <br /> atributos: <br /> no hay atributos"+html;
                        }
                }
            }
        }
        if (tipo=="caso") {
            for (var i = 0; i < this.casosDeUso.length; i++) {
                if (this.casosDeUso[i].nombre==nombre) {
                    html="  <input type='text' id='nombre'  value='nombre'  onclick='this.value='';' onfocus='this.select()' onblur='this.value=!this.value?'nuevo nombre del caso de Uso':this.value;' /> <input type='button' onclick='ingresaAtributo()' value='ingresar'/>";
                    return "CASO DE USO:"+nombre+" <br /> atributos: <br /> no hay atributos"+html;
                }
            }
        }
    }
    this.regresarCoordenadas= function(nombre,tipo){
        if (tipo=="actor") {
             for (var i = 0; i < this.actores.length; i++) {
                if (this.actores[i].nombre==nombre) {
                    return this.actores[i].ubicacion;
                }
             }
        }
        if (tipo=="caso") {
            for (var i = 0; i < this.casosDeUso.length; i++) {
                if (this.casosDeUso[i].nombre==nombre) {
                    var retorno = [];
                    retorno[1]=this.casosDeUso[i].ubicacion;
                    retorno[2]=this.casosDeUso[i].ancho;
                    retorno[3]=this.casosDeUso[i].alto;
                    return retorno;
                }
            }
        }
    }
}
//////variables necesarias//////
var principal = new Principal();
var coordenada1;
var coordenada2;
var banderaSeleccionadoParaAsociacion=false;

function cambiarClaseClick (id){
    $(id).removeClass("icono");
     $(id).addClass("iconoCLick");
}
function cambiarClaseNormal (id){
    $(id).removeClass("iconoCLick");
     $(id).addClass("icono");
}

function moverymostrar(nombre){
    if (principal.cursor) {
        $("footer").html(principal.regresaarPie(nombre,"actor"));
    }
    if (principal.asociacion) {
        if (banderaSeleccionadoParaAsociacion) {
            
        }
        else{
            coordenada1=principal.regresarCoordenadas(nombre,"actor");
            banderaSeleccionadoParaAsociacion=true;
        }
    }
}
function hallarTamano(x1,x2){
    if (x1>x2) {
        return x1-x2;
    }
    else if (x1==x2) {
        return 20;
    }
    else {
        return x2-x1;
    }
}
function mayor(x1,x2){
     if (x1>x2) {
        return x2;
    }
    else if(x2>x1){
        return x1;
    }
    else{
        return x1;
    }
}
function mayorbool(x1,x2){
    if (x1>x2) {
        return true;
    }
    else if(x2>x1){
        return false;
    }
    else{
        return true;
    }
}
function moverymostrarCasoDeUso(nombre){
    console.log("caso de uso");
    if (principal.cursor) {
         $("footer").html(principal.regresaarPie(nombre,"caso"));
    }
      if (principal.asociacion) {
        console.log("que onda");
        var contenido=$("#lienzo").html();
        if (banderaSeleccionadoParaAsociacion) {
            var linea;
            var recibido=principal.regresarCoordenadas(nombre,"caso");
            var coordenada2= recibido[1];
            var anchorec= recibido[2];
            var altorec= recibido[3];
            var ancho=hallarTamano(coordenada2.x,coordenada1.x)-anchorec/2;
            var alto=hallarTamano(coordenada2.y,coordenada1.y);
            var x= mayor(coordenada1.x,coordenada2.x)+50;
            var y= mayor(coordenada1.y,coordenada2.y)+altorec/2;
            var svg="<svg xmlns='http://www.w3.org/2000/svg' version='1.1'  width='"+ancho+"' height='"+alto+"' style='top:"+y+"px;left:"+x+"px;'  >";
            if (mayorbool(coordenada1.y,coordenada2.y)) {
                linea= "<LINE x1='"+ancho+"' y1='0' x2='0' y2='"+alto+"'  stroke-width='5' stroke='black'/>";
            }
            else{
                linea= "<LINE x1='0' y1='0' x2='"+ancho+"' y2='"+alto+"'  stroke-width='5' stroke='black'/>";
            }
            console.log(contenido+svg+linea+"</svg>");
            $("#lienzo").html(contenido+svg+linea+"</svg>");
            banderaSeleccionadoParaAsociacion=false;
        }
        else{
            coordenada1=principal.regresarCoordenadas(nombre,"caso");
            banderaSeleccionadoParaAsociacion=true;
        }
    }
}
    
       

///aqui empisa el juego
$("document").ready(function(){
     ///////seleccion de herramientaf
    //seleccion de cursor
  $("#cursor").click(function(){
    $("#marco" ).resizable();
    principal.cursor=true; 
    banderaSeleccionadoParaAsociacion=principal.actor=principal.casoDeUso=principal.asociacion=false;
    cambiarClaseClick("#cursor");
    cambiarClaseNormal("#casoDeUso");
    cambiarClaseNormal("#sistema");
    cambiarClaseNormal("#actor");
  });
  
  //seleccion de actor
  $("#actor").click(function(){
    principal.actor=true; 
    banderaSeleccionadoParaAsociacion=principal.cursor=principal.casoDeUso=principal.asociacion=false;
    cambiarClaseClick("#actor");
    cambiarClaseNormal("#casoDeUso");
    cambiarClaseNormal("#sistema");
    cambiarClaseNormal("#cursor");
  });
  
  //seleccion de caso de uso
  $("#casoDeUso").click(function(){
    principal.casoDeUso=true; 
    banderaSeleccionadoParaAsociacion=principal.cursor=principal.actor=principal.asociacion=false;
    cambiarClaseClick("#casoDeUso");
    cambiarClaseNormal("#cursor");
    cambiarClaseNormal("#sistema");
    cambiarClaseNormal("#actor");
  });
  
    //seleccion de sistema 
    $("#sistema").click(function(){
    principal.asociacion=true; 
    banderaSeleccionadoParaAsociacion=principal.cursor=principal.casoDeUso=principal.actor=false;
    cambiarClaseClick("#sistema");
    cambiarClaseNormal("#cursor");
    cambiarClaseNormal("#casoDeUso");
    cambiarClaseNormal("#actor");
  });
  
  function pasarNombreAID(nombre){
      return nombre.replace(/\s/g,'');
  }
 
////////////////////////////////////

  //////////////////////////////////////////////////
  
  ///eventos del lienzo
  
  $("#lienzo").click(function(e) {
    var nombre,ancho,alto;
    var id;
    var contenido= $("#lienzo").html() //se lee el contenido html con Jquery
    var y=e.pageY -48;                  //posicion del actor
    var x=+e.pageX-88;
    //si se a seleccionado un actor se realiza lo siguiente:
     if (principal.actor) {
         console.log(principal.actor);
        //se pide el nombre del actor 
        nombre=prompt("nombre del actor");
        //se crea el objeto del actor
        id=pasarNombreAID(nombre);
        principal.agregarActor(nombre,x,y);
        $("#lienzo").html(contenido+"<div class='actores' id='"+id+"' onclick='moverymostrar(\""+id+"\")' style='top:"+y+"px;left:"+x+"px '><img src='imgs/iconos/actor.png'/><p class='nombreActor'  onmousedown='dragStart(event)'>"+nombre+"</p> </div>");
        console.log(contenido+"<div class='actores' id='"+id+"' onclick='moverymostrar(\""+id+"\")' style='top:"+y+"px;left:"+x+"px '><img src='imgs/iconos/actor.png'/><p class='nombreActor'  onmousedown='dragStart(event)'>"+nombre+"</p> </div>");
         
     }
     
     //si se selecciona un caso de uso se realiza lo siguiente 
     if (principal.casoDeUso) {
         //se pide el nombre del actor
        nombre=prompt("nombre del caso de Uso");
        var tamano= nombre.length;
        ancho = tamano*20;
        alto = tamano*15;
        principal.agregarCasoDeUso(nombre,x,y,ancho,alto);
            id=pasarNombreAID(nombre);

            //$("#lienzo").html(contenido+"<canvas id='"+id+"' class='casoDeUso' style='top:"+y+"px;left:"+x+"px; width:"+ancho+"px; height:"+alto+"px'> </canvas>");
            var texto ="<text x='"+((ancho/2)-(ancho/4))+"' y='"+((alto/2))+"' font-family='Verdana' font-size='20' fill='balck'>"+nombre+"</text>";
            $("#lienzo").html(contenido+" <svg xmlns='http://www.w3.org/2000/svg' version='1.1'  width='"+ancho+"' height='"+alto+"' style='top:"+y+"px;left:"+x+"px;'  ><ELLIPSE  onclick=\"moverymostrarCasoDeUso('"+nombre+"')\" cx='"+ancho/2+"' cy='"+alto/2+"' rx='"+((ancho/2)-2)+"' ry='"+((alto/2)-2)+"' style='stroke: black; fill: white;'/>"+texto+"</svg>");
     }
     if (principal.sistema) {
         console.log("sistemaaa");
         nombre=prompt("nombre del Sistema");
         if (nombre!==null) {
            alto=50;
            ancho=50;
            console.log(contenido);
            $("#lienzo").html("<div id='marco' class='sistemas'style='top:"+y+"px;left:"+x+"px; width:"+ancho+"px; height:"+alto+"px'>"+nombre+"</div>"+contenido);
            }
        }
  })
});