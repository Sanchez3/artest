<template>
    <div class="hello">
        <h2>Intersect - {{intersectObj}}</h2>
        <!-- <video id="video" autoplay></video> -->
        <Loader v-bind:per="per" v-if="per!==100" />
        <div id="canvas-element"></div>
        <ErrorMessage v-if="webcamAllowed===false" />
        <Award v-if="touchFlag===true" />
    </div>
</template>
<script>
import * as THREE from 'three'
import { ARjs, THREEx } from 'ar.js'
// import * as PhyTouch from 'phy-touch'
// require('ar.js') ;
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

// import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.js';

// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
// import lightShaderVert from '/lightshader.vert'
// import lightShaderFrag from '/lightshader.frag'

import Stats from 'stats.js'
// THREEx.ArToolkitContext.baseURL = '../'
// require('../assets/js/ar.min.js')
import Loader from './Loader.vue'
import ErrorMessage from './ErrorMessage.vue'
import Award from './Award.vue'
// import  LightFrag from '@/shaders/LightFrag.glsl'
// import  LightVert from '@/shaders/LightVert.glsl'

// var glslify = require('glslify')

export default {
    name: 'ThreejsWorld',
    props: {
        msg: String
    },
    components: {
        Loader,
        ErrorMessage,
        Award
    },
    created() {
        // console.log(ARjs.isEmpty() ? 'Lodash is available here!' : 'Uh oh..');
    },
    data() {
        return {
            intersectObj: 'null',
            per: 0,
            webcamAllowed: true,
            scene: '',
            renderer: '',
            light: '',
            camera: '',
            controls: '',
            publicPath: process.env.BASE_URL,
            threeAssets: [],
            movieAssets: [],
            onRenderFcts: [],
            allMixers: [],
            mixer: '',
            raycaster: '',
            touchFlag: false
        }
    },
    mounted() {
        var that = this;
        this.$nextTick(function() {
            that.checkAPI()
            that.init()
            that.initAR();
        })
    },
    methods: {
        checkAPI() {
            if (navigator.mediaDevices === undefined ||
                navigator.mediaDevices.enumerateDevices === undefined ||
                navigator.mediaDevices.getUserMedia === undefined) {
                if (navigator.mediaDevices === undefined) var fctName = 'navigator.mediaDevices'
                else if (navigator.mediaDevices.enumerateDevices === undefined) var fctName = 'navigator.mediaDevices.enumerateDevices'
                else if (navigator.mediaDevices.getUserMedia === undefined) var fctName = 'navigator.mediaDevices.getUserMedia'
                this.webcamAllowed = true
            }
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


            function onError() {
                this.webcamAllowed = false
            }
            arToolkitSource.init(function onReady() {
                onResize()
            }, onError.bind(this))

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
                debug: true,
                cameraParametersUrl: THREEx.ArToolkitContext.baseURL + '../data/data/camera_para.dat',
                detectionMode: 'mono',
                maxDetectionRate: 30,
            })
            this.arToolkitContext = arToolkitContext;
            // initialize it
            arToolkitContext.init(function onCompleted() {
                // copy projection matrix to camera
                // if (that.scene.visible) return
                that.camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
            })
            // update artoolkit on every frame
            this.onRenderFcts.push(function(delta) {
                // console.log(arToolkitSource.ready)
                if (arToolkitSource.ready === false) return
                arToolkitContext.update(arToolkitSource.domElement)
                // update scene.visible if the marker is seen
                // console.log(that.camera.visible)
                // if(!firstT&&that.scene.visible)return;
                // that.scene.visible = that.camera.visible;
                // that.orientControls.connect();
            })
            ////////////////////////////////////////////////////////////////////////////////
            //          Create a ArMarkerControls
            ////////////////////////////////////////////////////////////////////////////////
            // init controls for camera
            // var markerControls = new THREEx.ArMarkerControls(arToolkitContext, that.camera, {
            //     type: 'pattern',
            //     patternUrl: `${this.publicPath}pattern/pattern-logo3.patt`,
            //     // patternUrl: THREEx.ArToolkitContext.baseURL + '../data/data/patt.hiro',
            //     // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji',
            //     // as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
            //     changeMatrixMode: 'cameraTransformMatrix'
            // })
            // as we do changeMatrixMode: 'cameraTransformMatrix', start with invisible scene
            // that.scene.visible = false
        },
        init() {
            function animate(nowMsec) {
                window.requestAnimationFrame(this._animate);
                this.render(nowMsec);
            }
            var wWidth = window.innerWidth
            var wHeight = window.innerHeight

            this.bloomLayer = new THREE.Layers();
            this.bloomLayer.set(1);
            this.darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });
            this.materials = {};

            this.clock = new THREE.Clock();

            this.scene = new THREE.Scene()
            var girdHelper = new THREE.GridHelper(1000, 100);
            var axesHelper = new THREE.AxesHelper(20);

            // axesHelper.layers.enable(0);
            // girdHelper.layers.enable(0);

            // this.scene.add(girdHelper);
            // this.scene.add(axesHelper);
            // console.log(axesHelper)


            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
            this.renderer.physicallyCorrectLights = true;
            this.renderer.setPixelRatio(window.devicePixelRatio)
            this.renderer.setSize(wWidth, wHeight)
            document.getElementById('canvas-element').appendChild(this.renderer.domElement)

            this.stats = new Stats();
            document.getElementById('canvas-element').appendChild(this.stats.dom);
            // ar camera
            this.camera = new THREE.PerspectiveCamera();
            this.scene.add(this.camera);
            // this.scene.visible = false;


            // this.camera = new THREE.PerspectiveCamera(75, wWidth / wHeight, 1, 1000)
            // this.camera.position.set(0, 0, 10)
            // this.camera.lookAt(0, 0, 0)
            // this.scene.add(this.camera);


            // var orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
            // orbitControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
            // orbitControls.dampingFactor = 0.05;
            // orbitControls.screenSpacePanning = false;
            // orbitControls.minDistance = 100;
            // orbitControls.maxDistance = 500;
            // orbitControls.maxPolarAngle = Math.PI / 2;
            // this.scene.add(this.camera)
            // this.onRenderFcts.push(function() {
            //     orbitControls.update();
            // })

            // var hemiLight = new THREE.HemisphereLight();
            // this.scene.add(hemiLight);
            // const light1 = new THREE.AmbientLight(0xffffff, 0.5);
            // this.camera.add(light1);

            // var light2 = new THREE.DirectionalLight(0xffffff, 1.5 * Math.PI);
            // light2.position.set(0.5, 0, 0.866); // ~60º
            // this.camera.add(light2);



            this.loading();

            this._animate = animate.bind(this);

        },
        onWindowResize() {
            var width = window.innerWidth;
            var height = window.innerHeight;
            this.camera.aspect = width / height
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(width, height)
            this.bloomComposer.setSize(width, height);
            this.finalComposer.setSize(width, height);
            this.render();
        },
        render(nowMsec) {
            var delta = this.clock.getDelta();
            var lastTimeMsec = 0;
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
                // onRenderFct(deltaMsec / 1000)
                onRenderFct(delta)
            })
            this.renderer.render(this.scene, this.camera)
            // this.renderBloom();
            // this.finalComposer.render();

            this.stats.update();

        },
        initGlsl() {
            var renderScene = new RenderPass(this.scene, this.camera);
            var bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
            var params = {
                exposure: 1,
                bloomStrength: 5,
                bloomThreshold: 0,
                bloomRadius: 0,
                scene: "Scene with Glow"
            }
            bloomPass.threshold = params.bloomThreshold;
            bloomPass.strength = params.bloomStrength;
            bloomPass.radius = params.bloomRadius;
            this.bloomComposer = new EffectComposer(this.renderer);
            this.bloomComposer.renderToScreen = false;
            this.bloomComposer.addPass(renderScene);
            this.bloomComposer.addPass(bloomPass);
            // var vertSrc = glslify(`${this.publicPath}shaders/LightVert.glsl`)
            // console.log(glslify)
            var finalPass = new ShaderPass(
                new THREE.ShaderMaterial({
                    uniforms: {
                        baseTexture: { value: null },
                        bloomTexture: { value: this.bloomComposer.renderTarget2.texture }
                    },
                    vertexShader: require('@/shaders/LightVert.glsl').default,
                    fragmentShader: require('@/shaders/LightFrag.glsl').default,
                    defines: {}
                }), "baseTexture"
            );
            console.log(finalPass)
            finalPass.needsSwap = true;
            this.finalComposer = new EffectComposer(this.renderer);
            this.finalComposer.addPass(renderScene);
            this.finalComposer.addPass(finalPass);

            this.render();
        },
        darkenNonBloomed(obj) {
            // console.log(obj)
            if (obj.isMesh && this.bloomLayer.test(obj.layers) === false) {
                this.materials[obj.uuid] = obj.material;
                obj.material = this.darkMaterial;
            }
        },
        restoreMaterial(obj) {
            if (this.materials[obj.uuid]) {
                obj.material = this.materials[obj.uuid];
                delete this.materials[obj.uuid];
            }
        },
        renderBloom() {
            // this.darkenNonBloomed()
            this.scene.traverse(this.darkenNonBloomed);
            this.bloomComposer.render();
            this.scene.traverse(this.restoreMaterial);
        },
        addMovieClip(_texture) {
            var movieTextures = this.movieAssets;

            // texture, #horiz, #vert, #total, duration.
            var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
            // var movie = new TextureAnimator(movieTextures, 'lxu1_texture', 6, 6, 36, 36, 120, material);
            var movie = new TextureAnimator1(movieTextures['lxu1_texture0'], 4, 4, 16, 1200);
            var geometry = new THREE.PlaneGeometry(50, 50);
            var material = new THREE.MeshBasicMaterial({ map: movieTextures['lxu1_texture0'], side: THREE.DoubleSide });
            var plane = new THREE.Mesh(geometry, material);
            this.scene.add(plane);
            this.onRenderFcts.push(function(delta) {
                // console.log(delta)
                movie.update(delta * 1000)
            })

            return plane;

            function TextureAnimator1(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) {
                // note: texture passed by reference, will be updated by the update function.

                this.tilesHorizontal = tilesHoriz;
                this.tilesVertical = tilesVert;
                // how many images does this spritesheet contain?
                //  usually equals tilesHoriz * tilesVert, but not necessarily,
                //  if there at blank tiles at the bottom of the spritesheet. 
                this.numberOfTiles = numTiles;
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);

                // how long should each image be displayed?
                this.tileDisplayDuration = tileDispDuration;

                // how long has the current image been displayed?
                this.currentDisplayTime = 0;

                // which image is currently being displayed?
                this.currentTile = 0;

                this.update = function(milliSec) {
                    this.currentDisplayTime += milliSec;
                    while (this.currentDisplayTime > this.tileDisplayDuration) {
                        this.currentDisplayTime -= this.tileDisplayDuration;
                        this.currentTile++;
                        if (this.currentTile == this.numberOfTiles) {
                            this.currentTile = 0;
                        }
                        var currentColumn = this.currentTile % this.tilesHorizontal;
                        texture.offset.x = currentColumn / this.tilesHorizontal;
                        var currentRow = Math.floor(this.currentTile / this.tilesHorizontal);
                        texture.offset.y = currentRow / this.tilesVertical;
                    }
                };
            }

            function TextureAnimator(textures, prefix, tilesHoriz, tilesVert, numTiles, totalTiles, tileDispDuration, material) {
                // note: texture passed by reference, will be updated by the update function.
                this.prefix = prefix;
                this.currentTile = 0;
                this.currentIndex = 0;
                this.totalTiles = totalTiles;
                this.texture = textures[prefix + this.currentIndex];
                this.material = material;
                this.material.map = this.texture


                this.tilesHorizontal = tilesHoriz;
                this.tilesVertical = tilesVert;
                // how many images does this spritesheet contain?
                //  usually equals tilesHoriz * tilesVert, but not necessarily,
                //  if there at blank tiles at the bottom of the spritesheet. 
                this.numberOfTiles = numTiles;
                this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
                this.texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);

                // how long should each image be displayed?
                this.tileDisplayDuration = tileDispDuration;

                // how long has the current image been displayed?
                this.currentDisplayTime = 0;

                // which image is currently being displayed?
                var sTile = 0;

                this.update = function(milliSec) {
                    this.currentDisplayTime += milliSec;
                    while (this.currentDisplayTime > this.tileDisplayDuration) {
                        this.currentDisplayTime -= this.tileDisplayDuration;
                        this.currentTile++;
                        sTile = this.currentTile % this.numberOfTiles;
                        // console.log(sTile,this.numberOfTiles)
                        if (sTile == 0) {
                            this.currentIndex++;
                            console.log(this.currentIndex)
                            if (this.currentTile == this.totalTiles) {
                                this.currentIndex = 0;
                                this.currentTile = 0;
                                this.texture = textures[this.prefix + this.currentIndex];
                                this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
                                this.texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);
                                this.material.map = this.texture;
                            }
                        }
                        var currentColumn = sTile % this.tilesHorizontal;
                        this.texture.offset.x = currentColumn / this.tilesHorizontal;
                        var currentRow = Math.floor(sTile / this.tilesHorizontal);
                        this.texture.offset.y = currentRow / this.tilesVertical;
                    }
                }
            }

        },
        addGlb(name, _type) {
            var that = this;
            var container = new THREE.Object3D();
            var gltf = this.threeAssets[name];
            console.log(gltf)
            var model = this.threeAssets[name].scene;
            // console.log()

            var _type = _type || 1


            // this.scene.add(model)
            // var encoding = THREE.sRGBEncoding;
            model.traverse(function(object) {
                if (object.isMesh) {
                    // object.depthTest = false;
                    object.renderOrder = 0;
                    // object.castShadow = true;
                    // var material = object.material;
                    // if (material.map) material.map.encoding = encoding;
                    // if (material.emissiveMap) material.emissiveMap.encoding = encoding;
                    // if (material.map || material.emissiveMap) material.needsUpdate = true;
                }
            });
            // var skeleton = new THREE.SkeletonHelper(model);
            // skeleton.visible = true;
            // this.scene.add(skeleton);

            // model.position.z = 2;
            // model.position.y = 1;
            if (name == 'CesiumMilkTruck')
                model.scale.copy(new THREE.Vector3(0.5, 0.5, 0.5))
            else model.scale.copy(new THREE.Vector3(1, 1, 1))
            model.rotateX(-Math.PI / 2);
            // model.rotateZ(Math.PI)

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

            if (_type == 3) {
                let geometry1 = new THREE.CylinderGeometry(1.6, 1.6, 5, 32, 1);
                var tiles = this.threeAssets['tiles']
                tiles.wrapS = THREE.RepeatWrapping;
                tiles.wrapT = THREE.RepeatWrapping;
                tiles.repeat.set(4, 2);
                let material1 = new THREE.MeshBasicMaterial({
                    transparent: true,
                    map: tiles,
                    side: THREE.BackSide
                });
                var mesh1 = new THREE.Mesh(geometry1, material1);
                mesh1.position.y = -2;
                // material1.depthTest = false;
                mesh1.renderOrder = 1;

                let geometry0 = new THREE.RingGeometry(1.6, 9, 32);
                let material0 = new THREE.MeshBasicMaterial({
                    // map: loader.load( 'images/color-grid.png' ), // for testing placement
                    colorWrite: false
                });
                let mesh0 = new THREE.Mesh(geometry0, material0);
                mesh0.rotation.x = -Math.PI / 2;
                model.position.y = -2;
                // material0.depthTest = false;
                mesh0.renderOrder = 2;

                // mesh0.layers.set(1);
                // mesh1.layers.set(1);
                // model.layers.set(0);
                // mesh0.renderOrder = 1;
                // mesh1.renderOrder = -1;
                // model.renderOrder = -2;
                // console.log(mesh0.layers,mesh1.layers,model.renderOrder)
                // mesh1.add(model)

                container.add(model)
            }
            if (_type == 2) {
                var geometry = new THREE.PlaneGeometry(2, 2);
                var material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, side: THREE.DoubleSide });
                var plane = new THREE.Mesh(geometry, material);
                plane.rotateX(Math.PI / 2)
                plane.position.y=-1;
                plane.name = name;

                model.position.y = 0;
                model.scale.copy(new THREE.Vector3(1.5, 1.5, 1.5))
                container.add(plane, model);

            }
            if(_type==1){
                model.position.y=-2;
                model.scale.copy(new THREE.Vector3(0.1, 0.1, 0.1))
                container.add( model);
            }





            return container;
        },
        addMarker(_pattern, _texture, _type) {
            var markerRoot = new THREE.Group();
            this.scene.add(markerRoot)
            var markerControls = new THREEx.ArMarkerControls(this.arToolkitContext, markerRoot, {
                type: 'pattern',
                patternUrl: `${this.publicPath}pattern/${_pattern}.patt`,
            });

            var model = this.addGlb(_texture, _type);

            markerRoot.add(model)
        },
        addObj() {
            var that = this;

            // this.addMarker('pattern-logo3', 'CesiumMan');
            // this.addMarker('pattern-marker1', 'DamagedHelmet');
            this.addMarker('pattern-marker1', 'scene0', 1);
            this.addMarker('pattern-marker2', 'Soldier', 2);
            this.addMarker('pattern-marker3', 'CesiumMan', 3);

            // var movie1 = this.addMovieClip('explosion');



            // var model = this.addGlb('scene0');
            // var light = this.addGlb('light');
            // console.log(light)
            // light.children[0].layers.enable(1);
            // model.children.forEach(function(obj) {
            //     // body...
            //     obj.layers.enable(0);
            // })


            // model.children[0].layers.enable(1);
            var INTERSECTED;
            var mouse = new THREE.Vector2();
            this.raycaster = new THREE.Raycaster();
            document.addEventListener('touchend', function(event) {
                event.preventDefault();
                // console.log( event.changedTouches[0].pageX)
                mouse.x = (event.changedTouches[0].pageX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.changedTouches[0].pageY / window.innerHeight) * 2 + 1;
                that.raycaster.setFromCamera(mouse, that.camera);
                var intersects = that.raycaster.intersectObjects(that.scene.children, true);
                // console.log(intersects)
                if (intersects.length > 0) {
                    INTERSECTED = intersects[0].object;
                    console.log(INTERSECTED)
                    that.intersectObj = `${INTERSECTED.constructor.name} ${INTERSECTED.name}`
                } else {
                    that.intersectObj = 'null';
                }
            }, false);

            // var dragControls = new DragControls(model.children[0].children, this.camera, document.getElementById('app'));
            // dragControls.addEventListener('dragstart', function() {
            //     // controls.enabled = false;
            //     console.log(1)
            // });
            // dragControls.addEventListener('dragend', function() {
            //     // controls.enabled = true;
            // });




            this.onRenderFcts.push(function(delta) {
                // if (!that.scene.visible) return
                for (var i = 0; i < that.allMixers.length; i++) {
                    var m = that.allMixers[i]
                    m.update(delta)
                }
            })
            // this.initGlsl()

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
            var textureLoader = new THREE.TextureLoader(manager);
            textureLoader.load(`${this.publicPath}img/explosion.jpg`, function(rs) {
                that.movieAssets['explosion'] = rs
            })
            textureLoader.load(`${this.publicPath}img/run.png`, function(rs) {
                that.movieAssets['run'] = rs
            })

            textureLoader.load(`${this.publicPath}img/lxu_texture0.png`, function(rs) {
                that.movieAssets['lxu_texture0'] = rs
            })
            textureLoader.load(`${this.publicPath}img/lxu1_texture0.png`, function(rs) {
                that.movieAssets['lxu1_texture0'] = rs
            })
            textureLoader.load(`${this.publicPath}img/lxu_texture1.png`, function(rs) {
                that.movieAssets['lxu_texture1'] = rs
            })

            textureLoader.load(`${this.publicPath}img/tiles.jpg`, function(rs) {
                that.threeAssets['tiles'] = rs
            })

            var gltfLoader = new GLTFLoader(manager);
            var dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath(`${this.publicPath}libs/draco`);
            dracoLoader.setDecoderConfig({ type: 'js' });
            gltfLoader.setDRACOLoader(dracoLoader);

            // gltfLoader.load(`${this.publicPath}model/Monster/Monster.gltf`, function(rs) {
            //     that.threeAssets['Monster'] = rs
            // })
            gltfLoader.load(`${this.publicPath}model/CesiumMan/CesiumMan.gltf`, function(rs) {
                that.threeAssets['CesiumMan'] = rs
            })
            gltfLoader.load(`${this.publicPath}model/DamagedHelmet/DamagedHelmet.gltf`, function(rs) {
                that.threeAssets['DamagedHelmet'] = rs
            })
            gltfLoader.load(`${this.publicPath}model/CesiumMilkTruck/CesiumMilkTruck.gltf`, function(rs) {
                that.threeAssets['CesiumMilkTruck'] = rs
            })
            gltfLoader.load(`${this.publicPath}model/BotSkinned/Bot_Skinned.gltf`, function(rs) {
                that.threeAssets['Bot_Skinned'] = rs
            })
            gltfLoader.load(`${this.publicPath}model/Soldier.glb`, function(rs) {
                that.threeAssets['Soldier'] = rs
                // that.addObj(rs);
                // that.scene.add(rs.scene)
                // that.mrender();
            })
            gltfLoader.load(`${this.publicPath}model/scene0.gltf`, function(rs) {
                that.threeAssets['scene0'] = rs
            })
            gltfLoader.load(`${this.publicPath}model/light.gltf`, function(rs) {
                that.threeAssets['light'] = rs
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

h2 {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
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