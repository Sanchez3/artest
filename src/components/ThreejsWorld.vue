<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2>{{`${per}%`}}</h2>
        <!-- <video id="video" autoplay></video> -->
        <div id="canvas-element"></div>
    </div>
</template>
<script>
import * as THREE from 'three'
import { ARjs, THREEx } from 'ar.js'
// require('ar.js') ;
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import Stats from 'stats.js'
// THREEx.ArToolkitContext.baseURL = '../'
// require('../assets/js/ar.min.js')

export default {
    name: 'ThreejsWorld',
    props: {
        msg: String
    },
    created() {
        // console.log(ARjs.isEmpty() ? 'Lodash is available here!' : 'Uh oh..');
    },
    data() {
        return {
            per: 0,
            scene: '',
            renderer: '',
            light: '',
            camera: '',
            controls: '',
            publicPath: process.env.BASE_URL,
            threeAssets: [],
            onRenderFcts: [],
            allMixers: [],
            mixer: '',
        }
    },
    mounted() {
        var that = this;
        this.$nextTick(function() {
            that.init()
            that.initAR();
        })
    },
    methods: {
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
            var firstT = true;
            this.onRenderFcts.push(function(delta) {
                // console.log(arToolkitSource.ready)
                if (arToolkitSource.ready === false) return
                arToolkitContext.update(arToolkitSource.domElement)
                // update scene.visible if the marker is seen
                // console.log(that.camera.visible)
                that.scene.visible = that.camera.visible
                // firstT=false;
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
            // that.scene.visible = false
        },
        init() {
            function animate(nowMsec) {
                requestAnimationFrame(this._animate);
                this.render(nowMsec);
            }
            var wWidth = window.innerWidth
            var wHeight = window.innerHeight
            this.clock = new THREE.Clock();

            this.scene = new THREE.Scene()
            this.scene.add(new THREE.GridHelper(1000, 100));
            this.scene.add(new THREE.AxesHelper(20));
            this.scene.visible = false


            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
            this.renderer.physicallyCorrectLights = true;
            this.renderer.setPixelRatio(window.devicePixelRatio)
            this.renderer.setSize(wWidth, wHeight)
            document.getElementById('canvas-element').appendChild(this.renderer.domElement)

            this.stats = new Stats();
            document.getElementById('canvas-element').appendChild(this.stats.dom);
            // ar camera
            this.camera = new THREE.Camera();
            this.scene.add(this.camera);

            // this.camera = new THREE.PerspectiveCamera(45, wWidth / wHeight, 1, 1000)
            // this.camera.position.set(0, 10, 0)
            // // this.camera.lookAt(0, 0, 0)
            // var orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
            // orbitControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
            // orbitControls.dampingFactor = 0.05;
            // orbitControls.screenSpacePanning = false;
            // orbitControls.minDistance = 10;
            // orbitControls.maxDistance = 500;
            // orbitControls.maxPolarAngle = Math.PI / 2;
            // this.scene.add(this.camera)
            // this.onRenderFcts.push(function() {
            //     orbitControls.update();
            // })

            var hemiLight = new THREE.HemisphereLight();
            this.scene.add(hemiLight);
            const light1 = new THREE.AmbientLight(0xffffff, 0.5);
            this.camera.add(light1);

            var light2 = new THREE.DirectionalLight(0xffffff, 1.5 * Math.PI);
            light2.position.set(0.5, 0, 0.866); // ~60º
            this.camera.add(light2);

            this.loading();
            this._animate = animate.bind(this);

        },
        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(window.innerWidth, window.innerHeight)
        },
        render(nowMsec) {
            // var delta = this.clock.getDelta();
            var lastTimeMsec = null;
            // requestAnimationFrame(animate);
            lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60
            var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
            lastTimeMsec = nowMsec
            // call each update function

            // for (var i = 0; i < that.allMixers.length; i++) {
            //     (function(j) {
            //         var m = that.allMixers[j]
            //         if (m) m.update(deltaMsec)
            //     })(i)
            // }
            // this.mixer && this.mixer.update(delta)
            this.onRenderFcts.forEach(function(onRenderFct) {
                onRenderFct(deltaMsec / 1000)
            })
            this.renderer.render(this.scene, this.camera)
            this.stats.update();

        },
        addGlb(name) {
            var that = this;
            var gltf = this.threeAssets[name];
            console.log(gltf)
            var model = this.threeAssets[name].scene;
            this.scene.add(model)
            var encoding = THREE.sRGBEncoding;
            model.traverse(function(object) {
                if (object.isMesh) {
                    object.castShadow = true;
                    var material = object.material;
                    if (material.map) material.map.encoding = encoding;
                    if (material.emissiveMap) material.emissiveMap.encoding = encoding;
                    if (material.map || material.emissiveMap) material.needsUpdate = true;
                }

            });
            // var skeleton = new THREE.SkeletonHelper(model);
            // skeleton.visible = true;
            // this.scene.add(skeleton);

            model.position.z = 2;
            model.position.y = -2;

            model.scale.copy(new THREE.Vector3(0.005, 0.005, 0.005))
            model.rotateX(-Math.PI / 2);
            // model.rotateY(Math.PI)

            var animations = gltf.animations;
            var mixer = new THREE.AnimationMixer(model)

            for (var i = 0; i < animations.length; i++) {
                var action = mixer.clipAction(animations[i]);
                action.play();
            }
            // var action = mixer.clipAction(animations[3]);
            // action.play();
            // return mixer;

            this.allMixers.push(mixer)


        },
        addObj() {
            var that = this;
            // var floorGeometry = new THREE.PlaneGeometry(20, 20);
            // var floorMaterial = new THREE.ShadowMaterial();
            // // floorMaterial.opacity = 0.3;
            // var floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
            // floorMesh.rotation.x = -Math.PI / 2;
            // floorMesh.receiveShadow = true;
            // this.scene.add(floorMesh);
            this.addGlb('test1')

            // var testGltf = that.threeAssets['Soldier'];
            // var testModel = testGltf.scene;
            // this.scene.add(testModel);
            // testModel.position.y = 1;

            // // testModel.scale.copy(new THREE.Vector3(0.003, 0.003, 0.003))
            // // testModel.rotateX(-Math.PI / 2);
            // // testModel.rotateY(Math.PI);

            // var testSkeleton = new THREE.SkeletonHelper(testModel);
            // testSkeleton.visible = true;
            // this.scene.add(testSkeleton);
            // var animations = testGltf.animations;
            // var mixer = new THREE.AnimationMixer(testModel)

            // for (var i = 0; i < animations.length; i++) {
            //     var action = mixer.clipAction(animations[i]);
            //     action.play();
            // }
            // var action = that.mixer.clipAction(animations[0]);
            // action.play();
            // var mixer = this.addGlb('test1');
            // this.allMixers.push(mixer);
            this.onRenderFcts.push(function(delta) {
                if (!that.scene.visible) return
                for (var i = 0; i < that.allMixers.length; i++) {
                    var m = that.allMixers[i]
                    m.update(delta)
                }
            })
            this._animate()

        },
        loading() {
            var that = this

            var manager = new THREE.LoadingManager()
            manager.onStart = function(url, itemsLoaded, itemsTotal) {
                // console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
            }

            manager.onLoad = function() {
                console.log('Loading complete!')
                that.addObj();
                // that.addObj && that.addObj()

            }

            manager.onProgress = function(url, itemsLoaded, itemsTotal) {
                // console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
                var per = parseInt(itemsLoaded / itemsTotal * 100)
                console.log(per)
                that.per = per;
                // $("#percentage").html(per + ' %')
            }

            manager.onError = function(url) {
                console.log('There was an error loading ' + url)
            }

            var gltfLoader = new GLTFLoader(manager);
            var dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath(`${this.publicPath}libs/draco`);
            dracoLoader.setDecoderConfig({ type: 'js' });
            gltfLoader.setDRACOLoader(dracoLoader);

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
                // that.addObj(rs);
                // that.scene.add(rs.scene)
                // that.mrender();
            })
            gltfLoader.load(`${this.publicPath}model/test1.glb`, function(rs) {
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