(function(e){function t(t){for(var i,o,s=t[0],c=t[1],l=t[2],u=0,h=[];u<s.length;u++)o=s[u],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&h.push(r[o][0]),r[o]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);d&&d(t);while(h.length)h.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],i=!0,s=1;s<n.length;s++){var c=n[s];0!==r[c]&&(i=!1)}i&&(a.splice(t--,1),e=o(o.s=n[0]))}return e}var i={},r={app:0},a=[];function o(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=i,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(n,i,function(t){return e[t]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var d=c;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var i=n("64a9"),r=n.n(i);r.a},"073e":function(e,t,n){"use strict";n.r(t),t["default"]="varying vec2 vUv;\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}"},1:function(e,t){},2:function(e,t){},3:function(e,t){},4:function(e,t){},4359:function(e,t,n){},4601:function(e,t,n){"use strict";n.r(t),t["default"]="uniform sampler2D baseTexture;\nuniform sampler2D bloomTexture;\nvarying vec2 vUv;\nvec4 getTexture(sampler2D texelToLinearTexture) {\n    return mapTexelToLinear(texture2D(texelToLinearTexture, vUv));\n}\nvoid main() {\n    gl_FragColor = (getTexture(baseTexture) + vec4(1.0) * getTexture(bloomTexture));\n}"},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var i=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("ThreejsWorld",{attrs:{msg:"Test"}})],1)},a=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("h2",[e._v("Intersect - "+e._s(e.intersectObj))]),100!==e.per?n("Loader",{attrs:{per:e.per}}):e._e(),n("div",{attrs:{id:"canvas-element"}}),!1===e.webcamAllowed?n("ErrorMessage"):e._e(),!0===e.touchFlag?n("Award"):e._e()],1)},s=[],c=(n("7f7f"),n("14b9"),n("ac6a"),n("5a89")),l=n("dcdc"),d=(n("4721"),n("34ad")),u=n("0ca5"),h=(n("23ee"),n("3191")),m=n.n(h),p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"loader-wrapper fadeIn"},[n("h1",[e._v("Loading"),n("br"),e._v(e._s(e.per+"%"))])])},f=[],v=(n("c5f6"),{name:"Loader",props:{per:{type:Number,default:0}}}),w=v,g=(n("ae46"),n("2877")),b=Object(g["a"])(w,p,f,!1,null,"48417f36",null),x=b.exports,y=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},T=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"error-wrapper"},[n("h1",[e._v("WebRTC issue!")]),n("h3",[e._v("Open camera page on your phone with one of the browsers listed below.")]),n("h5",[e._v("Camera Page:")]),n("ul",[n("li",[e._v("iOS Safari 11+")]),n("li",[e._v("Android Browser 56+")]),n("li",[e._v("Chrome for Android 61+")])])])}],M={name:"ErrorMessage"},P=M,_=(n("83c1"),Object(g["a"])(P,y,T,!1,null,"16902140",null)),A=_.exports,C=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},S=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"award-wrapper fadeIn"},[n("h1",[e._v("！！！Award！！！")])])}],k={name:"Award"},D=k,E=(n("6ffd"),Object(g["a"])(D,C,S,!1,null,"aafd4986",null)),O=E.exports,j={name:"ThreejsWorld",props:{msg:String},components:{Loader:x,ErrorMessage:A,Award:O},created:function(){},data:function(){return{intersectObj:"null",per:0,webcamAllowed:!0,scene:"",renderer:"",light:"",camera:"",controls:"",publicPath:"",threeAssets:[],movieAssets:[],onRenderFcts:[],allMixers:[],mixer:"",raycaster:"",touchFlag:!1}},mounted:function(){var e=this;this.$nextTick(function(){e.checkAPI(),e.init(),e.initAR()})},methods:{checkAPI:function(){if(void 0===navigator.mediaDevices||void 0===navigator.mediaDevices.enumerateDevices||void 0===navigator.mediaDevices.getUserMedia){if(void 0===navigator.mediaDevices);else if(void 0===navigator.mediaDevices.enumerateDevices);else if(void 0===navigator.mediaDevices.getUserMedia);this.webcamAllowed=!0}},initAR:function(){var e=this,t=new l["THREEx"].ArToolkitSource({sourceType:"webcam"});function n(){this.webcamAllowed=!1}function i(){t.onResizeElement(),t.copyElementSizeTo(e.renderer.domElement),null!==r.arController&&t.copyElementSizeTo(r.arController.canvas)}t.init(function(){i()},n.bind(this)),window.addEventListener("resize",function(){i()});var r=new l["THREEx"].ArToolkitContext({debug:!0,cameraParametersUrl:l["THREEx"].ArToolkitContext.baseURL+"../data/data/camera_para.dat",detectionMode:"mono",maxDetectionRate:30});this.arToolkitContext=r,r.init(function(){e.camera.projectionMatrix.copy(r.getProjectionMatrix())}),this.onRenderFcts.push(function(e){!1!==t.ready&&r.update(t.domElement)})},init:function(){function e(e){window.requestAnimationFrame(this._animate),this.render(e)}var t=window.innerWidth,n=window.innerHeight;this.bloomLayer=new c["Layers"],this.bloomLayer.set(1),this.darkMaterial=new c["MeshBasicMaterial"]({color:"black"}),this.materials={},this.clock=new c["Clock"],this.scene=new c["Scene"];new c["GridHelper"](1e3,100),new c["AxesHelper"](20);this.renderer=new c["WebGLRenderer"]({antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),this.renderer.physicallyCorrectLights=!0,this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(t,n),document.getElementById("canvas-element").appendChild(this.renderer.domElement),this.stats=new m.a,document.getElementById("canvas-element").appendChild(this.stats.dom),this.camera=new c["PerspectiveCamera"],this.scene.add(this.camera);var i=new c["HemisphereLight"];this.scene.add(i);var r=new c["AmbientLight"](16777215,.5);this.camera.add(r);var a=new c["DirectionalLight"](16777215,1.5*Math.PI);a.position.set(.5,0,.866),this.camera.add(a),this.loading(),this._animate=e.bind(this)},onWindowResize:function(){var e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.bloomComposer.setSize(e,t),this.finalComposer.setSize(e,t),this.render()},render:function(e){var t=this.clock.getDelta(),n=0;n=n||e-1e3/60;Math.min(200,e-n);n=e,this.onRenderFcts.forEach(function(e){e(t)}),this.renderer.render(this.scene,this.camera),this.stats.update()},initGlsl:function(){var e=new RenderPass(this.scene,this.camera),t=new UnrealBloomPass(new c["Vector2"](window.innerWidth,window.innerHeight),1.5,.4,.85),i={exposure:1,bloomStrength:5,bloomThreshold:0,bloomRadius:0,scene:"Scene with Glow"};t.threshold=i.bloomThreshold,t.strength=i.bloomStrength,t.radius=i.bloomRadius,this.bloomComposer=new EffectComposer(this.renderer),this.bloomComposer.renderToScreen=!1,this.bloomComposer.addPass(e),this.bloomComposer.addPass(t);var r=new ShaderPass(new c["ShaderMaterial"]({uniforms:{baseTexture:{value:null},bloomTexture:{value:this.bloomComposer.renderTarget2.texture}},vertexShader:n("073e").default,fragmentShader:n("4601").default,defines:{}}),"baseTexture");console.log(r),r.needsSwap=!0,this.finalComposer=new EffectComposer(this.renderer),this.finalComposer.addPass(e),this.finalComposer.addPass(r),this.render()},darkenNonBloomed:function(e){e.isMesh&&!1===this.bloomLayer.test(e.layers)&&(this.materials[e.uuid]=e.material,e.material=this.darkMaterial)},restoreMaterial:function(e){this.materials[e.uuid]&&(e.material=this.materials[e.uuid],delete this.materials[e.uuid])},renderBloom:function(){this.scene.traverse(this.darkenNonBloomed),this.bloomComposer.render(),this.scene.traverse(this.restoreMaterial)},addMovieClip:function(e){var t=this.movieAssets,n=new c["MeshBasicMaterial"]({side:c["DoubleSide"]}),i=new o(t["lxu1_texture0"],4,4,16,1200),r=new c["PlaneGeometry"](50,50),a=(n=new c["MeshBasicMaterial"]({map:t["lxu1_texture0"],side:c["DoubleSide"]}),new c["Mesh"](r,n));return this.scene.add(a),this.onRenderFcts.push(function(e){i.update(1e3*e)}),a;function o(e,t,n,i,r){this.tilesHorizontal=t,this.tilesVertical=n,this.numberOfTiles=i,e.wrapS=e.wrapT=c["RepeatWrapping"],e.repeat.set(1/this.tilesHorizontal,1/this.tilesVertical),this.tileDisplayDuration=r,this.currentDisplayTime=0,this.currentTile=0,this.update=function(t){this.currentDisplayTime+=t;while(this.currentDisplayTime>this.tileDisplayDuration){this.currentDisplayTime-=this.tileDisplayDuration,this.currentTile++,this.currentTile==this.numberOfTiles&&(this.currentTile=0);var n=this.currentTile%this.tilesHorizontal;e.offset.x=n/this.tilesHorizontal;var i=Math.floor(this.currentTile/this.tilesHorizontal);e.offset.y=i/this.tilesVertical}}}},addGlb:function(e,t){var n=new c["Object3D"],i=this.threeAssets[e];console.log(i);var r=this.threeAssets[e].scene;t=t||1;r.traverse(function(e){e.isMesh&&(e.renderOrder=0)}),"CesiumMilkTruck"==e?r.scale.copy(new c["Vector3"](.5,.5,.5)):r.scale.copy(new c["Vector3"](1,1,1)),r.rotateX(-Math.PI/2);for(var a=i.animations,o=new c["AnimationMixer"](r),s=0;s<a.length;s++){var l=o.clipAction(a[s]);l.play()}if(this.allMixers.push(o),3==t){var d=new c["CylinderGeometry"](1.6,1.6,5,32,1),u=this.threeAssets["tiles"];u.wrapS=c["RepeatWrapping"],u.wrapT=c["RepeatWrapping"],u.repeat.set(4,2);var h=new c["MeshBasicMaterial"]({transparent:!0,map:u,side:c["BackSide"]}),m=new c["Mesh"](d,h);m.position.y=-2,m.renderOrder=1;var p=new c["RingGeometry"](1.6,9,32),f=new c["MeshBasicMaterial"]({colorWrite:!1}),v=new c["Mesh"](p,f);v.rotation.x=-Math.PI/2,r.position.y=-2,v.renderOrder=2,v.name=e,n.add(m,v)}if(2==t){var w=new c["PlaneGeometry"](2,2),g=new c["MeshBasicMaterial"]({color:16777215*Math.random(),side:c["DoubleSide"]}),b=new c["Mesh"](w,g);b.rotateX(Math.PI/2),b.position.y=-1,b.name=e,r.position.y=0,r.scale.copy(new c["Vector3"](1.5,1.5,1.5)),n.add(b,r)}return 1==t&&(r.position.y=2,r.scale.copy(new c["Vector3"](1.2,1.2,1.2)),n.add(r)),n},addMarker:function(e,t,n){var i=new c["Group"];this.scene.add(i);new l["THREEx"].ArMarkerControls(this.arToolkitContext,i,{type:"pattern",patternUrl:"".concat(this.publicPath,"pattern/").concat(e,".patt")});var r=this.addGlb(t,n);i.add(r)},addObj:function(){var e,t=this;this.addMarker("pattern-logo3","CesiumMan",1),this.addMarker("pattern-marker3","Soldier",2),this.addMarker("pattern-marker4","DamagedHelmet",3);var n=new c["Vector2"];this.raycaster=new c["Raycaster"],document.addEventListener("touchend",function(i){i.preventDefault(),n.x=i.changedTouches[0].pageX/window.innerWidth*2-1,n.y=-i.changedTouches[0].pageY/window.innerHeight*2+1,t.raycaster.setFromCamera(n,t.camera);var r=t.raycaster.intersectObjects(t.scene.children,!0);r.length>0?(e=r[0].object,console.log(e),t.intersectObj="".concat(e.constructor.name," ").concat(e.name)):t.intersectObj="null"},!1),this.onRenderFcts.push(function(e){for(var n=0;n<t.allMixers.length;n++){var i=t.allMixers[n];i.update(e)}}),this._animate()},loading:function(){var e=this,t=new c["LoadingManager"];t.onStart=function(e,t,n){},t.onLoad=function(){console.log("Loading complete!"),e.addObj()},t.onProgress=function(t,n,i){var r=parseInt(n/i*100);console.log(r),e.per=r},t.onError=function(e){console.log("There was an error loading "+e)};var n=new c["TextureLoader"](t);n.load("".concat(this.publicPath,"img/explosion.jpg"),function(t){e.movieAssets["explosion"]=t}),n.load("".concat(this.publicPath,"img/run.png"),function(t){e.movieAssets["run"]=t}),n.load("".concat(this.publicPath,"img/lxu_texture0.png"),function(t){e.movieAssets["lxu_texture0"]=t}),n.load("".concat(this.publicPath,"img/lxu1_texture0.png"),function(t){e.movieAssets["lxu1_texture0"]=t}),n.load("".concat(this.publicPath,"img/lxu_texture1.png"),function(t){e.movieAssets["lxu_texture1"]=t}),n.load("".concat(this.publicPath,"img/tiles.jpg"),function(t){e.threeAssets["tiles"]=t});var i=new d["a"](t),r=new u["a"];r.setDecoderPath("".concat(this.publicPath,"libs/draco")),r.setDecoderConfig({type:"js"}),i.setDRACOLoader(r),i.load("".concat(this.publicPath,"model/CesiumMan/CesiumMan.gltf"),function(t){e.threeAssets["CesiumMan"]=t}),i.load("".concat(this.publicPath,"model/DamagedHelmet/DamagedHelmet.gltf"),function(t){e.threeAssets["DamagedHelmet"]=t}),i.load("".concat(this.publicPath,"model/CesiumMilkTruck/CesiumMilkTruck.gltf"),function(t){e.threeAssets["CesiumMilkTruck"]=t}),i.load("".concat(this.publicPath,"model/BotSkinned/Bot_Skinned.gltf"),function(t){e.threeAssets["Bot_Skinned"]=t}),i.load("".concat(this.publicPath,"model/Soldier.glb"),function(t){e.threeAssets["Soldier"]=t}),i.load("".concat(this.publicPath,"model/scene0.gltf"),function(t){e.threeAssets["scene0"]=t}),i.load("".concat(this.publicPath,"model/light.gltf"),function(t){e.threeAssets["light"]=t})}}},R=j,L=(n("ec8b"),Object(g["a"])(R,o,s,!1,null,"9ec03538",null)),H=L.exports,z={name:"app",components:{ThreejsWorld:H},mounted:function(){this.$nextTick(function(){})},methods:{isPc:function(){for(var e=navigator.userAgent,t=new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"),n=!0,i=0;i<t.length;i++)if(e.indexOf(t[i])>0){n=!1;break}return n},rootResize:function(){var e,t=document.documentElement.clientWidth||window.innerWidth,n=document.documentElement.clientHeight||window.innerHeight;e=t>n?n/750*100:t/750*100,document.getElementsByTagName("html")[0].style.fontSize=e+"px"},eventInit:function(){var e=this;return document.addEventListener("touchstart",function(e){},{passive:!1}),document.addEventListener("touchmove",function(e){e.preventDefault()},{passive:!1}),e},cssInit:function(){var e=this,t=100,n=1e3;return e.rootResize(),window.addEventListener("onorientationchange"in window?"orientationchange":"resize",function(){var i,r,a,o,s,c;a=function(){clearInterval(i),clearTimeout(r),i=null,r=null,e.rootResize()},i=setInterval(function(){window.innerWidth===o&&window.innerHeight===s?(c++,c===t&&a()):(o=window.innerWidth,s=window.innerHeight,c=0)}),r=setTimeout(function(){a()},n)}),e}}},B=z,W=(n("034f"),Object(g["a"])(B,r,a,!1,null,null,null)),I=W.exports;i["a"].config.productionTip=!1,new i["a"]({render:function(e){return e(I)}}).$mount("#app")},"64a9":function(e,t,n){},"6ffd":function(e,t,n){"use strict";var i=n("afa0"),r=n.n(i);r.a},"83c1":function(e,t,n){"use strict";var i=n("4359"),r=n.n(i);r.a},"98bb":function(e,t,n){},ae46:function(e,t,n){"use strict";var i=n("98bb"),r=n.n(i);r.a},afa0:function(e,t,n){},ec8b:function(e,t,n){"use strict";var i=n("ff47"),r=n.n(i);r.a},ff47:function(e,t,n){}});
//# sourceMappingURL=app.d089c150.js.map