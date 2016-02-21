//Declaración de variables globales

var ventana = document.getElementById("ambienteSierra"),
ancho = window.innerWidth,
alto = window.innerHeight,
escena, camara, lienzo, 
tecla, loader, objetoMover,
controlOrbit, controlTrackball, controlPersona, 
reloj = new THREE.Clock(),    
hombreSierra= new THREE.Object3D(),
mujerSierra= new THREE.Object3D(),
eventos;

//Función para animar la escena
function animarEscena(){
    
    //Variables para el control con teclas
    var tiempo=0.3;
    var distancia=100;
    var recorrido=distancia*tiempo;
        
    //Objeto a moverse
    objetoMover=camara;
    
    //Condiciones para el movimiento en la escena
    if (tecla.pressed("up")){
        objetoMover.position.z-=recorrido;
        //objeto3D.visible=true;
    }
    
    if (tecla.pressed("down")){
        objetoMover.position.z+=recorrido;
    }
    
    if (tecla.pressed("left")){
        //objeto.position.x-=recorrido;
        //objeto.position.z+=recorrido;
        objetoMover.translateX(-recorrido);
    }
    
    if (tecla.pressed("right")){
        //objeto.position.x+=recorrido;
        //objeto.position.z-=recorrido;
        
        objetoMover.translateX(recorrido);
        
        /*controles.update();
        delta+=Math.PI/180;
        camara.rotation.y+=delta;
        camara.lookAt(camara.position);*/
    }
    
    if (tecla.pressed("x")){
        objetoMover.position.set(1500, 100, 2500);
    }
    
    requestAnimationFrame(animarEscena);
    renderEscena();
}

//Función para empezar la escena - asignar elementos a la escena
function empezarEscena(){
    
    //Escena
    escena = new THREE.Scene();
    
    //Camara
    camara = new THREE.PerspectiveCamera(75, ancho / alto, 0.1, 10000);
    camara.position.set(1500, 100, 2500);
    escena.add(camara);
    
    //Lienzo o renderer
    lienzo = new THREE.WebGLRenderer({antialias: true, canvas: ventana});
    lienzo.setSize(ancho, alto);   
    
    //Luces
    luzAmbiental = new THREE.AmbientLight(0xffffff);
    escena.add(luzAmbiental);
    
    //luzDireccional = new THREE.DirectionalLight(new THREE.Color('blue'),1);
    luzDireccional = new THREE.DirectionalLight(0xffffff);
    luzDireccional.position.set(0,1,0).normalize();
    escena.add(luzDireccional);
    
    //Variable para control con el teclado
    tecla = new THREEx.KeyboardState();
    
    //Variables para control con el mouse
    
    //controlOrbit = new THREE.OrbitControls(camara);
    
    //controlTrackball = new THREE.TrackballControls(camara);
    //controlTrackball.staticMoving = true;
    
    //Control primera persona
    /*controlPersona=new THREE.FirstPersonControls();
    controlPersona.lookSpeed=0.01;
    controlPersona.movementSpeed=1;
    controlPersona.lookVertical=false;
    controlPersona.activeLook=true;*/
    
    //Variable para cargar los modelos desde Blender
    loader = new THREE.JSONLoader();
    
    
    //////////////////////////////////////////////////////////////////////////
    /////////////////////ELEMENTOS DE LA ESCENA //////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    
    //////////////////////////////////////////////////////////////
    //EJE
    var geo = new THREE.SphereGeometry(200, 200, 100, 100);
    var ma = new THREE.MeshBasicMaterial({color:"rgb(250,0,0)"});
    var esfera=new THREE.Mesh(geo, ma);
    esfera.position.set(0, 0, 0);
    escena.add(esfera);
    
    /////////////////////////CREACIÓN DEL PLANO-TERRENO////////////////////////
    
    //Creación del plano con imagen - textura 
    /*
    var texturaPlano = new THREE.ImageUtils.loadTexture("imagenes/caminoCesped.png");
    var geoPlano = new THREE.PlaneGeometry(2500, 2800, 10, 10);
    texturaPlano.wrapS = texturaPlano.wrapT = THREE.RepeatWrapping;
    texturaPlano.repeat.set(10, 10);
    var matPlano = new THREE.MeshBasicMaterial({map:texturaPlano, side:THREE.DoubleSide});
    var planoTextura = new THREE.Mesh(geoPlano, matPlano);
    planoTextura.rotation.x = Math.PI/-2;
    planoTextura.position.set(1250, 0, 1250);
    escena.add(planoTextura);
    */
    
    //Creación del plano con material - color
    var geoPlano = new THREE.PlaneGeometry(2500, 2500, 10, 10);
    var matPlano = new THREE.MeshBasicMaterial({color:"rgb(68,102,0)", side:THREE.DoubleSide});
    var plano = new THREE.Mesh(geoPlano, matPlano);
    plano.rotation.x=Math.PI/-2;
    plano.position.set(1250, 0, 1250);
    escena.add(plano);
    
    /////////////////////////CREACIÓN DEL NEVADO///////////////////////////////
    
    var texNevado = new THREE.ImageUtils.loadTexture("imagenes/nevado.png");
    var geoNevado = new THREE.CylinderGeometry(50, 750, 1200, 80, 80, false);
    var matNevado = new THREE.MeshBasicMaterial({map:texNevado, side:THREE.DoubleSide});
    var nevado = new THREE.Mesh(geoNevado, matNevado);
    nevado.position.set(800, 600, 700);
    nevado.rotation.y=Math.PI/2
    escena.add(nevado);
        
    /////////////////////////CREACIÓN DE MONTAÑAS///////////////////////////////
    
    for (var i = 0; i<4; i++){
        var alturas = [360, 506, 780, 640];
        var distanciaz = [800, 250, 300, 550];
        var distanciax = [2000, 1700, 2150, 1700];
        var geoMontaña = new THREE.CylinderGeometry(30, 300, alturas[i], 50, 50, false);
        var matMontaña = new THREE.MeshBasicMaterial({color:"rgb(68,55,34)"});
        var montaña = new THREE.Mesh(geoMontaña, matMontaña);
        montaña.position.set(distanciax[i], alturas[i]/2, distanciaz[i]);
        escena.add(montaña);
    }
    
    /////////////////////////CREACIÓN DE NUBES///////////////////////////////
    
    var geoNube = new THREE.TorusKnotGeometry(50, 40, 64, 15, 7, 8, 10);
    var matNube = new THREE.MeshBasicMaterial({color:"rgb(126,185,240)"});
    var nube = new THREE.Mesh(geoNube, matNube);
    nube.position.set(2050, 1300, 1250);
    nube.rotation.y = Math.PI/2;
    escena.add(nube);
    
    var geoNube1 = new THREE.TorusKnotGeometry( 50, 40, 64, 20, 4, 3, 6);
    var nube1 = new THREE.Mesh(geoNube1, matNube);
    nube1.position.set(1250, 1300, 900);
    nube1.rotation.x = Math.PI;
    nube1.rotation.y = Math.PI/2;
    escena.add(nube1);
    
    for (var i = 0; i<2; i++){
        var posx = [300, 1000];
        var posz = [500, 1100];
        var geoNube3 = new THREE.TorusKnotGeometry( 50, 40, 64, 16, 14, 10, 2);
        var nube3 = new THREE.Mesh(geoNube3, matNube);
        nube3.position.set(posx[i], 1200, posz[i]);
        nube3.rotation.x = Math.PI/-2;
        nube3.rotation.y = Math.PI/-2;
        escena.add(nube3);
    }
    
    /////////////////////////CREACIÓN DE SEMBRIOS///////////////////////////////
    
    //Sembrio 1-papa    
    for (var j = 0; j<14; j++){
        var distanciaX = [2100, 2150, 2200, 2250, 2300, 2350, 2400, 2350, 2300, 2250, 2200, 2150, 2100];
        for(var i = 0; i<=j; i++){ 
            var distanciaZ = [2150, 2200, 2250, 2300, 2350, 2400, 2450];
            var texSembrio = new THREE.ImageUtils.loadTexture('imagenes/sembrio.png');
            var geoSembrio = new THREE.CylinderGeometry(5, 15, 30, 8, 1, true);
            var matSembrio = new THREE.MeshBasicMaterial({map:texSembrio, side:THREE.DoubleSide});
            matSembrio.minFilter = THREE.NearestFilter;
            matSembrio.magfilre = THREE.NearestFilter;
            var sembrio = new THREE.Mesh(geoSembrio, matSembrio);
            sembrio.position.set(distanciaX[j], 15, distanciaZ[i]);
            sembrio.rotation.x = Math.PI;
            escena.add(sembrio);   
        }
    }
    
    var distanciaX = [800, 850, 900, 950, 1000, 950, 900, 850, 800];
    var distanciaZ=[1050, 1100, 1150, 1200];
    
    //Sembrio 2-col
    for (var j = 0; j<9; j++){
        for(var i = 0; i<=j; i++){
            var geoSembrio1 = new THREE.SphereGeometry(20, 20);
            var matSembrio1 = new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('imagenes/col.png')});
            var sembrio1 = new THREE.Mesh(geoSembrio1, matSembrio1);
            sembrio1.position.set(distanciaX[j]-500, 20, distanciaZ[i]+1300);
            escena.add(sembrio1);
        }
    }
    
    //Sembrio 3-coliflor    
    for (var j = 0; j<9; j++){
        for(var i = 0; i<=j; i++){
            var geoSembrio2 = new THREE.SphereGeometry(20, 20);
            var matSembrio2 = new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('imagenes/coliflor.png')});
            var sembrio2 = new THREE.Mesh(geoSembrio2, matSembrio2);
            sembrio2.position.set(distanciaX[j]-500, 20, distanciaZ[i]+1000);
            sembrio2.rotation.y = -Math.PI;
            escena.add(sembrio2);
        }
    }
    
    //Sembrio 4-maiz
    for (var j = 0; j<9; j++){
        var distanciaX = [800, 850, 900, 950, 1000, 950, 900, 850, 800];
        for(var i = 0; i<=j; i++){
            var distanciaZ = [750, 700, 650, 600, 550, 500];
            var geoSembrio3 = new THREE.PlaneGeometry(50, 250);
            var matSembrio3 = new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('imagenes/maiz2.png'), side:THREE.DoubleSide, alpha:true, opacity:0.8});
            var sembrio3 = new THREE.Mesh(geoSembrio3, matSembrio3);
            sembrio3.rotation.y = Math.PI/2;
            sembrio3.position.set(distanciaX[j]-500, 125, distanciaZ[i]+1000);
            escena.add(sembrio3);
        }
    }
 
    /////////////////////////////////////   CASA     ////////////////////////////////////////////
    
    var matCasa = [new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('imagenes/casa4.jpg')}),
                    new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('imagenes/casa2.jpg')}),
                    new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('imagenes/teja.jpg')}),
                    new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('imagenes/suelo.jpg')}),
                    new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('imagenes/casa3.jpg')}),
                    new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('imagenes/casa1.jpg')})];
    var materialesCasa = new THREE.MeshFaceMaterial(matCasa);
    var geoCasa = new THREE.CubeGeometry(500, 500, 500);
    var cuboCasa = new THREE.Mesh(geoCasa, materialesCasa);
    cuboCasa.rotation.y = Math.PI/-4;
    cuboCasa.position.set(2100, 250, 1400);
    escena.add(cuboCasa);
    
    //TECHO    
    var materialTecho = new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('imagenes/teja.jpg')});
    var geoTecho = new THREE.CylinderGeometry(5, 350, 200, 250, 200);
    var techo=new THREE.Mesh(geoTecho, materialTecho);
    techo.position.set(2100, 600, 1400);
    escena.add(techo);
    
    /////////////////////////CARGA DE ELEMENTOS JSON (BLENDER)//////////////////////////////////////////////////////
    
    //Carga del modelo 3D - Vestimenta hombre sierra    
    loader.load('modelos/Vest_Sier.js', function( geometry, materials ) {
    hombreSierra = new THREE.Mesh(geometry,new THREE.MeshFaceMaterial(materials));
    hombreSierra.scale.set(30, 30, 30);
    hombreSierra.position.set(2000, 1, 1800);    
    hombreSierra.rotation.y = -Math.PI/4;
    escena.add(hombreSierra);
    } );
    
    //Carga del modelo 3D - Vestimenta mujer sierra
    loader.load('modelos/finalMujerSierra2.js', function( geometry, materials ) {
    mujerSierra = new THREE.Mesh(geometry,new THREE.MeshFaceMaterial(materials));
    mujerSierra.scale.set(30, 30, 30);
    mujerSierra.position.set(1900, 1, 1800);    
    mujerSierra.rotation.y = -Math.PI/4;
    escena.add(mujerSierra);        
    } );
}

function renderEscena(){
    lienzo.render(escena,camara); 
}

//Llamada a funciones para carga de la escena
function WebGLEmpezar(){
    empezarEscena();
    animarEscena();
    renderEscena();
}



//CREACIÓN DE TEXTO 
/*var loader = new THREE.FontLoader();
loader.load( 'fuentes/helvetiker_bold.typeface.js', function ( font ) {

    var textGeo = new THREE.TextGeometry( "Hola", {

        font: font,

        size: 200,
        height: 50,
        curveSegments: 12,

        bevelThickness: 2,
        bevelSize: 5,
        bevelEnabled: true

    });

     textGeo.computeBoundingBox();
    var centerOffset = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
    
var textoGeo=new THREE.TextGeometry("Hola",{fontSize:50, fontWeight:25, curveSegments:2, font:"helvetiker"});
var matTexto = new THREE.MeshBasicMaterial({color:0x11ff00});
var texto = new THREE.Mesh(textoGeo,matTexto);
mesh.position.x = centerOffset;
    mesh.position.y = FLOOR + 67;
escena.add(texto);



main();
renderer();

lienzo.domElement.addEventListener('click',function(event){
        console.log('buen clic')},false);*/
