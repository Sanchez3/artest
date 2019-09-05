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
var OrbitControls = require('three-orbit-controls')(THREE)
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
        this.initAR()
        this.loading()
        this.render()
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
                that.camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
            })
            // update artoolkit on every frame
            this.onRenderFcts.push(function(delta) {
                if (arToolkitSource.ready === false) return
                arToolkitContext.update(arToolkitSource.domElement)
                // update scene.visible if the marker is seen
                that.scene.visible = that.camera.visible
                for (var i = 0; i < that.allMixers.length; i++) {
                    that.allMixers[i].update(delta)
                }

            })
            ////////////////////////////////////////////////////////////////////////////////
            //          Create a ArMarkerControls
            ////////////////////////////////////////////////////////////////////////////////
            // init controls for camera
            var markerControls = new THREEx.ArMarkerControls(arToolkitContext, that.camera, {
                type: 'pattern',
                patternUrl: THREEx.ArToolkitContext.baseURL + '../data/data/patt.hiro',
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
            this.scene.add(new THREE.AmbientLight(0x999999)) //环境光
            this.scene.add(new THREE.GridHelper(1000, 100))
            this.scene.add(new THREE.AxesHelper(120))
            this.scene.add(new THREE.AmbientLight(0xFFFFFF)) //环境光



            this.camera = new THREE.PerspectiveCamera(30, wWidth / wHeight, 1, 10000)
            this.camera.position.set(10, 90, 65)
            this.camera.lookAt(this.scene.position)
            // this.scene.add(this.camera)

            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
            this.renderer.setPixelRatio(window.devicePixelRatio)
            this.renderer.setSize(wWidth, wHeight)
            document.getElementById('canvas-element').appendChild(this.renderer.domElement)

            var orbitControls = new OrbitControls(this.camera, document.getElementById('canvas-element'))
            orbitControls.target.set(0, 0, 0)
            orbitControls.update()


            window.addEventListener('resize', this.onWindowResize, false)
        },
        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(window.innerWidth, window.innerHeight)
        },
        render() {
            var that = this;
            this.onRenderFcts.push(function() {
                that.renderer.render(that.scene, that.camera)
            })
            var lastTimeMsec = null
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
        addObj() {
            var that = this;
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
            this.threeAssets['DamagedHelmet'].scene.position.x = 10;
            this.scene.add(this.threeAssets['DamagedHelmet'].scene)

            this.threeAssets['Monster'].scene.position.x = 20;
            this.threeAssets['Monster'].scene.scale.copy(new THREE.Vector3(0.5, 0.5, 0.5))
            this.scene.add(this.threeAssets['Monster'].scene)
            var monster = this.threeAssets['Monster'];

            var mixer1 = new THREE.AnimationMixer(monster.scene);
            // console.log(monster)
            for (var i = 0; i < monster.animations.length; i++) {
                var animation = monster.animations[i];
                animation.duration = 3;
                var action = mixer1.clipAction(animation);
                action.play();
            }



            this.threeAssets['Soldier'].scene.position.x = 0;
            this.threeAssets['Soldier'].scene.scale.copy(new THREE.Vector3(2, 2, 2))
            this.scene.add(this.threeAssets['Soldier'].scene)
            var skeleton = new THREE.SkeletonHelper(this.threeAssets['Soldier'].scene);
            skeleton.visible = true;
            this.scene.add(skeleton);

            var soilderanims = this.threeAssets['Soldier'].animations;
            // console.log(soilderanims)
            var mixer2 = new THREE.AnimationMixer(this.threeAssets['Soldier'].scene)
            var walkAc = mixer2.clipAction(soilderanims[3]);
            walkAc.play();

            var cesiuman = this.threeAssets['CesiumMan']
            this.threeAssets['CesiumMan'].scene.position.x = -10;
            this.threeAssets['CesiumMan'].scene.scale.copy(new THREE.Vector3(2, 2, 2))
            this.scene.add(this.threeAssets['CesiumMan'].scene)
            var cesiumanims = this.threeAssets['CesiumMan'].animations;
            console.log(cesiumanims)
            var mixer3 = new THREE.AnimationMixer(this.threeAssets['CesiumMan'].scene)
            // var walkAc = mixer2.clipAction(cesiumanims[0]);

            for (var j = 0; j < cesiuman.animations.length; j++) {
                var animation = cesiuman.animations[j];
                animation.duration = 3;
                var action = mixer3.clipAction(animation);
                action.play();
            }

            this.allMixers.push(mixer1, mixer2, mixer3);


            // var b1_basecolor = this.threeAssets['b1_basecolor']
            // var b1_normal = this.threeAssets['b1_normal']
            // var geo1=this.threeAssets['b1_man'];

            // var b1geo = new THREE.BufferGeometry().fromGeometry(geo1);
            // b1geo.addAttribute('bones',geo1.bones)
            // b1geo.addAttribute('animations',geo1.animations)
            // // b1geo.bones=geo1.bones;
            // // b1geo.animations=geo1.animations
            // console.log(this.threeAssets['b1_man'])
            // var b1mat = new THREE.MeshStandardMaterial({
            //     color: 13290186,
            //     metalness: 0,
            //     emissive: 6579300,
            //     emissiveMap: b1_normal,
            //     map: b1_normal,
            //     normalMap: b1_basecolor,
            //     roughness: .5,
            //     skinning: true,
            //     side: THREE.DoubleSide
            // })
            // // b1_mat.skinning = true;
            // // var b1_Mesh = new THREE.MeshStandardMaterial();

            // var b1_Mesh = new THREE.SkinnedMesh(geo1, b1mat);
            // var mixer=new THREE.AnimationMixer(b1_Mesh); 
            // console.log(b1geo.animations)
            // var action =mixer.clipAction(b1geo.animations[0]);
            // action.play();

            // this.scene.add(b1_Mesh)

            // this.onRenderFcts.push(function(delta) {
            //     // boatMesh.rotation.x += Math.PI * delta
            // })


        },
        loading() {
            var that = this

            var manager = new THREE.LoadingManager()
            manager.onStart = function(url, itemsLoaded, itemsTotal) {
                // console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
            }

            manager.onLoad = function() {
                console.log('Loading complete!')
                that.addObj && that.addObj()
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
            gltfLoader.load(`${this.publicPath}model/Monster/Monster.gltf`, function(rs) {
                that.threeAssets['Monster'] = rs
            })
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
                that.threeAssets['BotSkinned'] = rs
            })
            gltfLoader.load(`${this.publicPath}model/Soldier.glb`, function(rs) {
                that.threeAssets['Soldier'] = rs
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