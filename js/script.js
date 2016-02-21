
// Declaración de variables	

var ventana = document.getElementById("mapa"),
ancho = ventana.width, // Ancho del canvas
alto = ventana.height, // Alto del canvas
reloj = new THREE.Clock(),
escena,camara,lienzo,loader,luz_ambiental,plano,
luz_direccional,grilla,controles,

//función principal
main= function(){
    
    //creación de la escena
    escena = new THREE.Scene();
    
    //creación de la cámara
    camara = new THREE.PerspectiveCamera(90, ancho/ alto, 1, 1000);
    camara.position.set(0, 0,15);

    //Definicion del contexto de renderizado
    lienzo = new THREE.WebGLRenderer({antialias: true,canvas:ventana,alpha:true});
    lienzo.setClearColor(0x000000,0.5);
    lienzo.setSize(ancho, alto);
    //document.body.appendChild( renderer.domElement );

    //luz ambiental
    luz_ambiental= new THREE.AmbientLight(new THREE.Color('white'))
    escena.add(luz_ambiental);

    //luz direcional
    luz_direccional= new THREE.DirectionalLight(new THREE.Color('red'));
    luz_direccional.position.set(1, 0, 1).normalize();
    escena.add(luz_direccional);

    //Grilla de fondo
    grilla= new THREE.GridHelper(10, 1);
    grilla.setColors( new THREE.Color('grey'), new THREE.Color('grey') );
    grilla.position.set(0,-5,0);
    escena.add(grilla);
    
    //Creamos el plano para el mapa
    var geometria = new THREE.PlaneGeometry(12,10);
    
    //Cargamos la imagen del mapa para la textura del plano
    var material=new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('imagenes/mapa1.png'),side:THREE.DoubleSide});
    plano = new THREE.Mesh(geometria, material)
    plano.castShadow = true;

    // Definimos la posición del plano
    plano.position.set(0,0,0);
    
    // Añadimos el plano a la escena
    escena.add(plano);

    //activamos los controles de la cámara asociados al mouse
    controles= new THREE.OrbitControls(camara);    
}

//funcion de renderizado
renderer=function render() {
      requestAnimationFrame(render);
      var elapsed = reloj.getElapsedTime();
      //plano.rotation.y = Math.PI*0.01;
      lienzo.render(escena, camara);
      controles.update();
}

main();
renderer();








