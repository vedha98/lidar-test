var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.setClearColor(0x7e807f)
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

document.body.appendChild( renderer.domElement );

var keyLight = new THREE.DirectionalLight(new THREE.Color('white'), 1.0);
keyLight.position.set(-100, 0, 100);

// var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
// fillLight.castShadow = true;
// fillLight.position.set(100, 0, 100);

// var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
// backLight.position.set(100, 0, -100).normalize();

var manager = new THREE.LoadingManager();
manager.onLoad = init;

var loader = new THREE.TextureLoader( manager );
var con = loader.load('contour.png')
loader.load( 'output.png', function( texture ) {
	var geometry = new THREE.PlaneGeometry(10,10,100,100);
	var material = new THREE.MeshStandardMaterial({color:0xffff,map:con,displacementMap:texture,displacementScale:2,displacementBias:0.01,opacity:0.1,transparent:true});
	var material2 = new THREE.MeshStandardMaterial({color:0x00afce,map:texture,displacementMap:texture,displacementScale:2,displacementBias:0});
	var material3 = new THREE.MeshStandardMaterial({color:0xffff,map:texture,displacementMap:texture,displacementScale:2,displacementBias:0.01,wireframe:true});
	material.metalness = 0
material.roughness = 0
	// material.displacementMap = texture;
	earthMesh = new THREE.Mesh(geometry, material);
	earthMesh2 = new THREE.Mesh(geometry, material2);
	earthMesh3 = new THREE.Mesh(geometry, material3);
	scene.add( earthMesh );
	scene.add( earthMesh2 );
	scene.add( earthMesh3 );
});



// scene.add(fillLight)
scene.add(keyLight)
// scene.add(backLight)
camera.position.z = 5;

var animate = function () {
	requestAnimationFrame( animate );
	renderer.render(scene, camera);
};

function init() {
	animate();
};