//Declaración de variables

var ventana=document.getElementById("ambienteCosta"),
ancho=ventana.width, alto=ventana.height,
escena, camara, lienzo,
reloj=new THREE.Clock(),    
luzAmbiental, luzDireccional,luz,altura=5,
grilla, geometria, plano, material, 
controles,lado=200;

//función principal
main=function(){
    //creación de variables
    escena=new THREE.Scene();
    camara=new THREE.PerspectiveCamera(45,ancho/alto,0.1,1000);
    camara.position.set(5,5,5);
    lienzo=new THREE.WebGLRenderer({antialias:true,canvas:ventana});
    lienzo.setSize(ancho,alto);
    luzAmbiental=new THREE.AmbientLight(new THREE.Color('white'));
    //luzDireccional=new THREE.DirectionalLight(new THREE.Color('blue'),3);
    //luzDireccional.position.set(0,0,3).normalize();
    
    //Añadir a la escena variables necesarias
    escena.add(camara);
    escena.add(luzAmbiental);
    //escena.add(luzDireccional);
    
    //Creación de grilla para el plano base del ambiente
    grilla=new THREE.GridHelper(20,1);
    grilla.setColors(new THREE.Color('grey'),new THREE.Color('grey'));
    escena.add(grilla);
    
    //creación de noise
    /************************************************************
		Generación del mapa de ruido. Generamos una imagen de 200x200px utilizando la clase
		simplexNoise de ToxicLibs. Almacenamos el valor de color de cada pixel dentro de una
		matriz, para utilizarlo después para levantar los puntos del plano. 
		************************************************************/

		/*function generarNoise()
		{
			var puntos_noise = new Array();
			var simplexNoise =  toxi.math.noise.simplexNoise;
			var imageData = ventana.getContext('2d').createImageData(lado,lado);
			var NS = Math.random()/5;
			var noiseOffset = Math.random()/5;

			function setPixel(x, y, r, g, b, a) {
			    var index = (x + y * imageData.width) * 4;
			    imageData.data[index+0] = r;
			    imageData.data[index+1] = g;
			    imageData.data[index+2] = b;
			    imageData.data[index+3] = a;
			}
			
			function draw(){
				var i = 0,
				j = 0,
				noiseVal = 0;
				for (i = 0; i < lado; i++) {
				    for (j = 0; j < lado; j++) {
					   	noiseVal = simplexNoise.noise(i * NS + noiseOffset, j * NS + noiseOffset); 
					    var c = Math.floor(noiseVal * 100);
					    setPixel(i, j, c, c, c, 255);
					    puntos_noise.push(c);
					}
				}
				ventana.getContext('2d').putImageData(imageData,0,0);
				noiseOffset+=NS;
			}
			draw();
		}

		/************************************************************
		Creación del suelo. Podemos como tercer y cuarto parámetro 199 (200-1) ya que necesitamos el
		mismo número de vértices de ancho y alto que pixels tiene la imagen con el ruido que hemos creado
		************************************************************/
		/*function crearSuelo()
		{
			
			var material_suelo = new THREE.MeshLambertMaterial( { 
				lights:[luz],
				shading: THREE.SmoothShading,
				color:0x9d6b01
			} );

			var plano_suelo_general = new THREE.PlaneGeometry(100,100,lado-1,lado-1);

			var mesh_suelo_general = new THREE.Mesh(plano_suelo_general,material_suelo);
			escena.add(mesh_suelo_general);
		}

		/************************************************************
		Colocamos cada vértice en una altura proporcional al color de su pixel equivalente dentro de la imagen
		************************************************************/

		/*function colocarVertices()
		{
			for(var i = 0; i < puntos_noise.length; i++) {
				plano_suelo_general.vertices[i].z = Math.max(0,altura * puntos_noise[i]/20);
			}
			plano_suelo_general.computeFaceNormals();
			plano_suelo_general.computeVertexNormals();
			plano_suelo_general.verticesNeedUpdate = true;
			plano_suelo_general.normalsNeedUpdate = true;
		}*/
    
    //Creación del plano
    geometria=new THREE.PlaneGeometry(20,20);
    
    //Creación del material 
    material=new THREE.MeshBasicMaterial({color: 0xffaacc,side:THREE.DoubleSide});
    //material=new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('planoCosta.png')});
    plano=new THREE.Mesh(geometria,material);
    escena.add(plano);
    
    //Activación de controles de la camara asociados al mouse, mediante la librería OrbitControls.js
    controles=new THREE.OrbitControls(camara);    
}

//función del renderizado-lienzo
renderer=function render(){
    requestAnimationFrame(render);
    var elapsed=reloj.getElapsedTime();
    lienzo.render(escena,camara);
    controles.update();
}

main();
renderer();

/*Dentro de la funcion render o sustituyente de la funcion render arriba
var theta=0;
anim/render();
function anim/render(){
var radian=theta*Math.PI/180;
plano.rotation.set(radian,radian,radian);
theta++;
lienzo.render(escena,camara);
requestAnimationFrame(anim/render);
};

//rotar un cubo 
function anim(){
    camera.position.x = 500 * Math.sin( theta * Math.PI / 360 );
    camera.position.y = 500 * Math.cos( theta * Math.PI / 360 );
    camera.position.z = 500 * Math.sin( theta * Math.PI / 360 );
    camera.lookAt( new THREE.Vector3( 0, 0, 0) );
    theta++;
    renderer.render( scene, camera );
    requestAnimationFrame( anim );
  }
*/