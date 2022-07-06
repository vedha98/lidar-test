var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

document.body.appendChild( renderer.domElement );

// var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
// keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.castShadow = true;
fillLight.position.set(100, 0, 100);

// var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
// backLight.position.set(100, 0, -100).normalize();

var manager = new THREE.LoadingManager();
manager.onLoad = init;

var loader = new THREE.TextureLoader( manager );

loader.load( 'output.png', function( texture ) {
	var geometry = new THREE.PlaneGeometry(10,10,100,100);
	var material = new THREE.MeshStandardMaterial({color:0xaaddff,displacementMap:texture,displacementScale:30,displacementBias:-10,wireframe:true});
	material.metalness = 0
material.roughness = 0
	// material.displacementMap = texture;
	earthMesh = new THREE.Mesh(geometry, material);
	earthMesh.castShadow = true; //default is false
earthMesh.receiveShadow = true;
	scene.add( earthMesh );
});



scene.add(fillLight)
// scene.add(keyLight)
// scene.add(backLight)
camera.position.z = 5;

var animate = function () {
	requestAnimationFrame( animate );
	renderer.render(scene, camera);
};

function init() {
	animate();
};