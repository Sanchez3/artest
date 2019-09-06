<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <!-- <video id="video" autoplay></video> -->
        <div id="canvas-element"></div>
    </div>
</template>
<script>
// import * as THREE from 'three'
// window.THREE = THREE || {}
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// var OrbitControls = require('three-orbit-controls')(THREE)
// var LegacyJSONLoader = require('../assets/js/LegacyJSONLoader.js')(THREE)
var LegacyJSONLoader = require('three-legacyjsonloader')(THREE);
import GLTFLoader from 'three-gltf-loader';
import Stats from 'stats.js'
// THREEx.ArToolkitContext.baseURL = '../'
// require('../assets/js/ar.min.js')
// require('ar.js/three.js/build/ar.min.js')
// LegacyJSONLoader(THREE);
export default {
    name: 'ThreejsWorld',
    props: {
        msg: String
    },
    data() {
        return {
            scene: '',
            renderer: '',
            light: '',
            camera: '',
            controls: '',
            publicPath: process.env.BASE_URL,
            threeAssets: [],
            onRenderFcts: [],
            allMixers: []
        }
    },
    mounted() {
        this.init()
        // this.initAR()
        this.loading()
        // this.render()
        this.showStats()

    },
    methods: {
        showStats() {
            var stats = new Stats()
            stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
            // var fs = document.createElement('div')
            // fs.style.position = 'absolute'
            // fs.style.left = 0
            // fs.style.top = 0
            // fs.style.zIndex = 999
            // fs.appendChild(stats.domElement)
            document.body.appendChild(stats.domElement)

            function animate() {
                stats.begin()
                // monitored code goes here
                stats.end()
                requestAnimationFrame(animate)
            }
            requestAnimationFrame(animate)

        },
        initAR() {
            var that = this;
            var arToolkitSource = new THREEx.ArToolkitSource({
                // to read from the webcam
                sourceType: 'webcam',
                // // to read from an image
                // sourceType : 'image',
                // sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/images/img.jpg',
                // to read from a video
                // sourceType : 'video',
                // sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/videos/headtracking.mp4',
            })

            arToolkitSource.init(function onReady() {
                onResize()
            })
            window.addEventListener('resize', function() {
                onResize()
            })

            function onResize() {
                arToolkitSource.onResizeElement()
                arToolkitSource.copyElementSizeTo(that.renderer.domElement)
                if (arToolkitContext.arController !== null) {
                    arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
                }
            }

            // create atToolkitContext
            var arToolkitContext = new THREEx.ArToolkitContext({
                cameraParametersUrl: THREEx.ArToolkitContext.baseURL + '../data/data/camera_para.dat',
                detectionMode: 'mono',
            })
            // initialize it
            arToolkitContext.init(function onCompleted() {
                // copy projection matrix to camera
                // if(that.scene.visible) return
                that.camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
            })
            // update artoolkit on every frame
            this.onRenderFcts.push(function(delta) {
                if (arToolkitSource.ready === false) return
                arToolkitContext.update(arToolkitSource.domElement)
                // update scene.visible if the marker is seen
                that.scene.visible = that.camera.visible
            })

            ////////////////////////////////////////////////////////////////////////////////
            //          Create a ArMarkerControls
            ////////////////////////////////////////////////////////////////////////////////
            // init controls for camera
            var markerControls = new THREEx.ArMarkerControls(arToolkitContext, that.camera, {
                type: 'pattern',
                patternUrl: `${this.publicPath}pattern/pattern-3.patt`,
                // patternUrl: THREEx.ArToolkitContext.baseURL + '../data/data/patt.hiro',
                // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji',
                // as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
                changeMatrixMode: 'cameraTransformMatrix'
            })
            // as we do changeMatrixMode: 'cameraTransformMatrix', start with invisible scene
            that.scene.visible = false

        },
        init() {
            var wWidth = window.innerWidth
            var wHeight = window.innerHeight
            this.clock = new THREE.Clock();

            this.scene = new THREE.Scene()

            this.scene.add(new THREE.GridHelper(1000, 100));
            this.scene.add(new THREE.AxesHelper(20));

            var pointLight = new THREE.PointLight(0xffffff, 1, 100);
            pointLight.position.set(0, 4, 0); // default; light shining from top
            pointLight.castShadow = true;
            this.scene.add(pointLight);
            var sphereSize = 1;
            var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
            this.scene.add(pointLightHelper);

            var dirLight = new THREE.DirectionalLight(0xffffff, 5);
            // dirLight.position.set(10, 0, 0);
            dirLight.position.set(0, 5, 0)

            var lightHelper = new THREE.DirectionalLightHelper(dirLight, 5);

            this.scene.add(lightHelper);
            this.scene.add(dirLight);




            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
            this.renderer.setPixelRatio(window.devicePixelRatio)
            this.renderer.setSize(wWidth, wHeight)
            document.getElementById('canvas-element').appendChild(this.renderer.domElement)

            // ar camera
            this.camera = new THREE.Camera();
            this.scene.add(this.camera);

            // this.camera = new THREE.PerspectiveCamera(45, wWidth / wHeight, 1, 1000)
            // this.camera.position.set(10, 10, 1)
            // this.camera.lookAt(0,0,0)

            // var orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
            // orbitControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
            // orbitControls.dampingFactor = 0.05;
            // orbitControls.screenSpacePanning = false;
            // orbitControls.minDistance = 10;
            // orbitControls.maxDistance = 500;
            // orbitControls.maxPolarAngle = Math.PI / 2;
            // this.onRenderFcts.push(function() {
            //     orbitControls.update();
            // })

            // this.scene.add(this.camera)


            // window.addEventListener('resize', this.onWindowResize, false)

            var lastTimeMsec = null;
            var that = this;
            requestAnimationFrame(function animate(nowMsec) {
                requestAnimationFrame(animate);
                lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60
                var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
                lastTimeMsec = nowMsec
                // call each update function
                that.renderer&&that.renderer.render(that.scene, that.camera)

                that.onRenderFcts.forEach(function(onRenderFct) {
                    onRenderFct(deltaMsec / 1000, nowMsec / 1000)
                })
            })

        },
        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(window.innerWidth, window.innerHeight)
        },
        render() {
            var that = this;
            var lastTimeMsec = null;
            this.onRenderFcts.push(function() {
                that.renderer.render(that.scene, that.camera)
            })
            requestAnimationFrame(function animate(nowMsec) {
                requestAnimationFrame(animate);
                lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60
                var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
                lastTimeMsec = nowMsec
                // call each update function

                that.onRenderFcts.forEach(function(onRenderFct) {
                    onRenderFct(deltaMsec / 1000, nowMsec / 1000)
                })
            })
        },
        addGlb(name) {
            var that = this;
            var gltf = this.threeAssets[name];
            var model = this.threeAssets[name].scene;
            this.scene.add(model)

            model.traverse(function(object) {
                if (object.isMesh) object.castShadow = true;
            });
            // var skeleton = new THREE.SkeletonHelper(model);
            // skeleton.visible = true;
            // this.scene.add(skeleton);

            model.position.z = 1;

            // model.scale.copy(new THREE.Vector3(0.003, 0.003, 0.003))
            model.rotateX(-Math.PI / 2);
            model.rotateY(Math.PI)

            var animations = gltf.animations;
            var mixer = new THREE.AnimationMixer(model)

            for (var i = 0; i < animations.length; i++) {
                var action = mixer.clipAction(animations[i]);
                action.play();
            }
            // var action = mixer.clipAction(animations[3]);
            // action.play();
            return mixer;

            // this.allMixers.push(mixer)


        },
        addObj() {
            var that = this;

            var floorGeometry = new THREE.PlaneGeometry(20, 20);
            var floorMaterial = new THREE.ShadowMaterial();
            // floorMaterial.opacity = 0.3;
            var floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
            floorMesh.rotation.x = -Math.PI / 2;
            floorMesh.receiveShadow = true;
            this.scene.add(floorMesh);

            var texture = this.threeAssets['color']
            var boatGeo = this.threeAssets['boat']
            var boatMat = new THREE.MeshStandardMaterial({
                color: 0x646464,
                roughness: .83,
                metalness: .5,
                emissive: 0xc8c8c8,
                map: texture,
                emissiveMap: texture,
                side: THREE.DoubleSide
            })
            var boatMesh = new THREE.Mesh(boatGeo, boatMat)
            boatMesh.position.set(30, 0, 0)
            this.scene.add(boatMesh)
            // console.log(this.threeAssets['DamagedHelmet'])
            // this.threeAssets['DamagedHelmet'].scene.position.x = 10;
            // this.scene.add(this.threeAssets['DamagedHelmet'].scene)

            // var cesiuman = this.threeAssets['CesiumMan']
            // this.threeAssets['CesiumMan'].scene.position.x = -10;
            // this.threeAssets['CesiumMan'].scene.scale.copy(new THREE.Vector3(2, 2, 2))
            // this.scene.add(this.threeAssets['CesiumMan'].scene)
            // var cesiumanims = this.threeAssets['CesiumMan'].animations;
            // // console.log(cesiumanims)
            // var mixer3 = new THREE.AnimationMixer(this.threeAssets['CesiumMan'].scene)
            // // var walkAc = mixer2.clipAction(cesiumanims[0]);

            // for (var j = 0; j < cesiuman.animations.length; j++) {
            //     var animation = cesiuman.animations[j];
            //     animation.duration = 3;
            //     var action = mixer3.clipAction(animation);
            //     action.play();
            // }

            // this.allMixers.push(mixer3);


            // var boxgeometry = new THREE.CubeGeometry(1, 1, 1);
            // var boxmaterial = new THREE.MeshNormalMaterial({
            //     transparent: true,
            //     opacity: 0.5,
            //     side: THREE.DoubleSide
            // });
            // var boxmesh = new THREE.Mesh(boxgeometry, boxmaterial);
            // boxmesh.position.y = boxgeometry.parameters.height / 2
            // this.scene.add(boxmesh);
            // var torusgeometry = new THREE.TorusKnotGeometry(0.3, 0.1, 64, 16);
            // var torusmaterial = new THREE.MeshNormalMaterial();
            // var torusmesh = new THREE.Mesh(torusgeometry, torusmaterial);
            // torusmesh.position.y = 0.5
            // this.scene.add(torusmesh);
            // console.log('a')

            // var mixer = this.addGlb('test1');
            var testGltf = this.threeAssets['Soldier'];
            var testModel = this.threeAssets['Soldier'].scene;
            this.scene.add(testModel);
            testModel.position.z = 1;

            testModel.scale.copy(new THREE.Vector3(0.003, 0.003, 0.003))
            testModel.rotateX(-Math.PI / 2);

            var testSkeleton = new THREE.SkeletonHelper(testModel);
            testSkeleton.visible = true;
            this.scene.add(testSkeleton);
            var animations = testGltf.animations;
            var mixer = new THREE.AnimationMixer(testModel)

            for (var i = 0; i < animations.length; i++) {
                var action = mixer.clipAction(animations[i]);
                action.play();
            }
            this.allMixers.push(mixer)

            // var gltf = this.threeAssets['BotSkinned'];
            // var model = this.threeAssets['BotSkinned'].scene;
            // this.scene.add(model)
            // console.log('b')

            // model.traverse(function(object) {
            //     if (object.isMesh) object.castShadow = true;
            // });

            // var skeleton = new THREE.SkeletonHelper(model);
            // skeleton.visible = true;
            // this.scene.add(skeleton);

            // model.position.x = 0;
            // model.scale.copy(new THREE.Vector3(1, 1, 1))
            // model.rotateX(-Math.PI / 2)
            // model.rotateY(Math.PI)

            // var animations = gltf.animations;
            // var mixer = new THREE.AnimationMixer(model)

            // for (var i = 0; i < animations.length; i++) {
            //     var action = mixer.clipAction(animations[i]);
            //     action.play();
            // }

            // this.allMixers.push(mixer)

            // this.allMixers.push(mixer2)
            this.onRenderFcts.push(function(delta) {
                // console.log(that.allMixers)
                // if(that.allMixers.length<1) return;
                // if (!that.scene.visible) return
                for (var i = 0; i < that.allMixers.length; i++) {
                    (function(k) {
                        that.allMixers[k].update(delta)
                    })(i)
                }
            })

        },
        loading() {
            var that = this

            var manager = new THREE.LoadingManager()
            manager.onStart = function(url, itemsLoaded, itemsTotal) {
                // console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
            }

            manager.onLoad = function() {
                console.log('Loading complete!')
                that.initAR();
                that.addObj();
                // that.addObj && that.addObj()
            }

            manager.onProgress = function(url, itemsLoaded, itemsTotal) {
                // console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
                var per = parseInt(itemsLoaded / itemsTotal * 100)
                console.log(per)
                // $("#percentage").html(per + ' %')
            }

            manager.onError = function(url) {
                console.log('There was an error loading ' + url)
            }
            var objectLoader = new THREE.LegacyJSONLoader(manager)
            // objectLoader.load(`${this.publicPath}model/airplane.json`, function(rs) {
            //     that.threeAssets['airplane'] = rs
            // })
            objectLoader.load(`${this.publicPath}model/boat.json`, function(rs) {
                that.threeAssets['boat'] = rs
            })

            var textureLoader = new THREE.TextureLoader(manager)
            textureLoader.load(`${this.publicPath}model/color.jpg`, function(rs) {
                that.threeAssets['color'] = rs
            })
            var gltfLoader = new GLTFLoader(manager);
            // gltfLoader.load(`${this.publicPath}model/Monster/Monster.gltf`, function(rs) {
            //     that.threeAssets['Monster'] = rs
            // })
            // gltfLoader.load(`${this.publicPath}model/CesiumMan/CesiumMan.gltf`, function(rs) {
            //     that.threeAssets['CesiumMan'] = rs
            // })
            // gltfLoader.load(`${this.publicPath}model/DamagedHelmet/DamagedHelmet.gltf`, function(rs) {
            //     that.threeAssets['DamagedHelmet'] = rs
            // })
            // gltfLoader.load(`${this.publicPath}model/CesiumMilkTruck/CesiumMilkTruck.gltf`, function(rs) {
            //     that.threeAssets['CesiumMilkTruck'] = rs
            // })
            // gltfLoader.load(`${this.publicPath}model/BotSkinned/Bot_Skinned.gltf`, function(rs) {
            //     that.threeAssets['BotSkinned'] = rs
            // })
            gltfLoader.load(`${this.publicPath}model/Soldier.glb`, function(rs) {
                that.threeAssets['Soldier'] = rs
            })
            gltfLoader.load(`${this.publicPath}model/test1.gltf`, function(rs) {
                that.threeAssets['test1'] = rs
            })
        }

    }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

#canvas-element {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 998
}
</style>