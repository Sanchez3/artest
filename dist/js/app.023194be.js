(function(e){function t(t){for(var i,o,s=t[0],l=t[1],c=t[2],d=0,h=[];d<s.length;d++)o=s[d],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&h.push(r[o][0]),r[o]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);u&&u(t);while(h.length)h.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],i=!0,s=1;s<n.length;s++){var l=n[s];0!==r[l]&&(i=!1)}i&&(a.splice(t--,1),e=o(o.s=n[0]))}return e}var i={},r={app:0},a=[];function o(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=i,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(n,i,function(t){return e[t]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=l;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var i=n("64a9"),r=n.n(i);r.a},"073e":function(e,t,n){"use strict";n.r(t),t["default"]="varying vec2 vUv;\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}"},1:function(e,t){},2:function(e,t){},3:function(e,t){},"336a":function(e,t,n){"use strict";var i=n("6846"),r=n.n(i);r.a},4:function(e,t){},4359:function(e,t,n){},4601:function(e,t,n){"use strict";n.r(t),t["default"]="uniform sampler2D baseTexture;\nuniform sampler2D bloomTexture;\nvarying vec2 vUv;\nvec4 getTexture(sampler2D texelToLinearTexture) {\n    return mapTexelToLinear(texture2D(texelToLinearTexture, vUv));\n}\nvoid main() {\n    gl_FragColor = (getTexture(baseTexture) + vec4(1.0) * getTexture(bloomTexture));\n}"},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var i=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("ThreejsWorld",{attrs:{msg:"Test"}})],1)},a=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[100!==e.per?n("Loader",{attrs:{per:e.per}}):e._e(),n("div",{attrs:{id:"canvas-element"}}),!1===e.webcamAllowed?n("ErrorMessage"):e._e(),!0===e.touchFlag?n("Award"):e._e()],1)},s=[],l=(n("7f7f"),n("14b9"),n("ac6a"),n("5a89")),c=n("dcdc"),u=(n("4721"),n("34ad")),d=n("0ca5"),h=(n("23ee"),n("3191")),m=n.n(h),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"loader-wrapper fadeIn"},[n("h1",[e._v("Loading"),n("br"),e._v(e._s(e.per+"%"))])])},p=[],v=(n("c5f6"),{name:"Loader",props:{per:{type:Number,default:0}}}),w=v,g=(n("ae46"),n("2877")),b=Object(g["a"])(w,f,p,!1,null,"48417f36",null),x=b.exports,T=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},M=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"error-wrapper"},[n("h1",[e._v("WebRTC issue!")]),n("h3",[e._v("Open camera page on your phone with one of the browsers listed below.")]),n("h5",[e._v("Camera Page:")]),n("ul",[n("li",[e._v("iOS Safari 11+")]),n("li",[e._v("Android Browser 56+")]),n("li",[e._v("Chrome for Android 61+")])])])}],y={name:"ErrorMessage"},_=y,P=(n("83c1"),Object(g["a"])(_,T,M,!1,null,"16902140",null)),A=P.exports,C=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},k=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"award-wrapper fadeIn"},[n("h1",[e._v("！！！Award！！！")])])}],S={name:"Award"},E=S,D=(n("6ffd"),Object(g["a"])(E,C,k,!1,null,"aafd4986",null)),R=D.exports,L={name:"ThreejsWorld",props:{msg:String},components:{Loader:x,ErrorMessage:A,Award:R},created:function(){},data:function(){return{per:0,webcamAllowed:!0,scene:"",renderer:"",light:"",camera:"",controls:"",publicPath:"",threeAssets:[],movieAssets:[],onRenderFcts:[],allMixers:[],mixer:"",raycaster:"",touchFlag:!1}},mounted:function(){var e=this;this.$nextTick(function(){e.checkAPI(),e.init(),e.initAR()})},methods:{checkAPI:function(){if(void 0===navigator.mediaDevices||void 0===navigator.mediaDevices.enumerateDevices||void 0===navigator.mediaDevices.getUserMedia){if(void 0===navigator.mediaDevices);else if(void 0===navigator.mediaDevices.enumerateDevices);else if(void 0===navigator.mediaDevices.getUserMedia);this.webcamAllowed=!0}},initAR:function(){var e=this,t=new c["THREEx"].ArToolkitSource({sourceType:"webcam"});function n(){this.webcamAllowed=!1}function i(){t.onResizeElement(),t.copyElementSizeTo(e.renderer.domElement),null!==r.arController&&t.copyElementSizeTo(r.arController.canvas)}t.init(function(){i()},n.bind(this)),window.addEventListener("resize",function(){i()});var r=new c["THREEx"].ArToolkitContext({debug:!0,cameraParametersUrl:c["THREEx"].ArToolkitContext.baseURL+"../data/data/camera_para.dat",detectionMode:"mono",maxDetectionRate:30});this.arToolkitContext=r,r.init(function(){e.camera.projectionMatrix.copy(r.getProjectionMatrix())}),this.onRenderFcts.push(function(e){!1!==t.ready&&r.update(t.domElement)})},init:function(){function e(e){window.requestAnimationFrame(this._animate),this.render(e)}var t=window.innerWidth,n=window.innerHeight;this.bloomLayer=new l["Layers"],this.bloomLayer.set(1),this.darkMaterial=new l["MeshBasicMaterial"]({color:"black"}),this.materials={},this.clock=new l["Clock"],this.scene=new l["Scene"];new l["GridHelper"](1e3,100),new l["AxesHelper"](20);this.renderer=new l["WebGLRenderer"]({antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),this.renderer.physicallyCorrectLights=!0,this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(t,n),document.getElementById("canvas-element").appendChild(this.renderer.domElement),this.stats=new m.a,document.getElementById("canvas-element").appendChild(this.stats.dom),this.camera=new l["PerspectiveCamera"],this.scene.add(this.camera);var i=new l["HemisphereLight"];this.scene.add(i);var r=new l["AmbientLight"](16777215,.5);this.camera.add(r);var a=new l["DirectionalLight"](16777215,1.5*Math.PI);a.position.set(.5,0,.866),this.camera.add(a),this.loading(),this._animate=e.bind(this)},onWindowResize:function(){var e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.bloomComposer.setSize(e,t),this.finalComposer.setSize(e,t),this.render()},render:function(e){var t=this.clock.getDelta(),n=0;n=n||e-1e3/60;Math.min(200,e-n);n=e,this.onRenderFcts.forEach(function(e){e(t)}),this.renderer.render(this.scene,this.camera),this.stats.update()},initGlsl:function(){var e=new RenderPass(this.scene,this.camera),t=new UnrealBloomPass(new l["Vector2"](window.innerWidth,window.innerHeight),1.5,.4,.85),i={exposure:1,bloomStrength:5,bloomThreshold:0,bloomRadius:0,scene:"Scene with Glow"};t.threshold=i.bloomThreshold,t.strength=i.bloomStrength,t.radius=i.bloomRadius,this.bloomComposer=new EffectComposer(this.renderer),this.bloomComposer.renderToScreen=!1,this.bloomComposer.addPass(e),this.bloomComposer.addPass(t);var r=new ShaderPass(new l["ShaderMaterial"]({uniforms:{baseTexture:{value:null},bloomTexture:{value:this.bloomComposer.renderTarget2.texture}},vertexShader:n("073e").default,fragmentShader:n("4601").default,defines:{}}),"baseTexture");console.log(r),r.needsSwap=!0,this.finalComposer=new EffectComposer(this.renderer),this.finalComposer.addPass(e),this.finalComposer.addPass(r),this.render()},darkenNonBloomed:function(e){e.isMesh&&!1===this.bloomLayer.test(e.layers)&&(this.materials[e.uuid]=e.material,e.material=this.darkMaterial)},restoreMaterial:function(e){this.materials[e.uuid]&&(e.material=this.materials[e.uuid],delete this.materials[e.uuid])},renderBloom:function(){this.scene.traverse(this.darkenNonBloomed),this.bloomComposer.render(),this.scene.traverse(this.restoreMaterial)},addMovieClip:function(e){var t=this.movieAssets,n=new l["MeshBasicMaterial"]({side:l["DoubleSide"]}),i=new o(t["lxu1_texture0"],4,4,16,1200),r=new l["PlaneGeometry"](50,50),a=(n=new l["MeshBasicMaterial"]({map:t["lxu1_texture0"],side:l["DoubleSide"]}),new l["Mesh"](r,n));return this.scene.add(a),this.onRenderFcts.push(function(e){i.update(1e3*e)}),a;function o(e,t,n,i,r){this.tilesHorizontal=t,this.tilesVertical=n,this.numberOfTiles=i,e.wrapS=e.wrapT=l["RepeatWrapping"],e.repeat.set(1/this.tilesHorizontal,1/this.tilesVertical),this.tileDisplayDuration=r,this.currentDisplayTime=0,this.currentTile=0,this.update=function(t){this.currentDisplayTime+=t;while(this.currentDisplayTime>this.tileDisplayDuration){this.currentDisplayTime-=this.tileDisplayDuration,this.currentTile++,this.currentTile==this.numberOfTiles&&(this.currentTile=0);var n=this.currentTile%this.tilesHorizontal;e.offset.x=n/this.tilesHorizontal;var i=Math.floor(this.currentTile/this.tilesHorizontal);e.offset.y=i/this.tilesVertical}}}},addGlb:function(e){var t=this.threeAssets[e],n=this.threeAssets[e].scene;n.position.z=2,n.position.y=2,n.rotateX(-Math.PI/2);for(var i=t.animations,r=new l["AnimationMixer"](n),a=0;a<i.length;a++){var o=r.clipAction(i[a]);o.play()}return this.allMixers.push(r),n},addMarker:function(e,t){var n=new l["Group"];this.scene.add(n);new c["THREEx"].ArMarkerControls(this.arToolkitContext,n,{type:"pattern",patternUrl:"".concat(this.publicPath,"pattern/").concat(e,".patt")});var i=this.addGlb(t);n.add(i)},addObj:function(){var e=this;this.addMarker("pattern-logo3","CesiumMan"),this.addMarker("pattern-marker1","DamagedHelmet"),this.addMarker("pattern-logo4","Bot_Skinned"),this.addMarker("pattern-marker2","CesiumMilkTruck"),this.addMarker("pattern-marker3","Soldier"),this.onRenderFcts.push(function(t){for(var n=0;n<e.allMixers.length;n++){var i=e.allMixers[n];i.update(t)}}),this._animate()},loading:function(){var e=this,t=new l["LoadingManager"];t.onStart=function(e,t,n){},t.onLoad=function(){console.log("Loading complete!"),e.addObj()},t.onProgress=function(t,n,i){var r=parseInt(n/i*100);console.log(r),e.per=r},t.onError=function(e){console.log("There was an error loading "+e)};var n=new l["TextureLoader"](t);n.load("".concat(this.publicPath,"img/explosion.jpg"),function(t){e.movieAssets["explosion"]=t}),n.load("".concat(this.publicPath,"img/run.png"),function(t){e.movieAssets["run"]=t}),n.load("".concat(this.publicPath,"img/lxu_texture0.png"),function(t){e.movieAssets["lxu_texture0"]=t}),n.load("".concat(this.publicPath,"img/lxu1_texture0.png"),function(t){e.movieAssets["lxu1_texture0"]=t}),n.load("".concat(this.publicPath,"img/lxu_texture1.png"),function(t){e.movieAssets["lxu_texture1"]=t});var i=new u["a"](t),r=new d["a"];r.setDecoderPath("".concat(this.publicPath,"libs/draco")),r.setDecoderConfig({type:"js"}),i.setDRACOLoader(r),i.load("".concat(this.publicPath,"model/CesiumMan/CesiumMan.gltf"),function(t){e.threeAssets["CesiumMan"]=t}),i.load("".concat(this.publicPath,"model/DamagedHelmet/DamagedHelmet.gltf"),function(t){e.threeAssets["DamagedHelmet"]=t}),i.load("".concat(this.publicPath,"model/CesiumMilkTruck/CesiumMilkTruck.gltf"),function(t){e.threeAssets["CesiumMilkTruck"]=t}),i.load("".concat(this.publicPath,"model/BotSkinned/Bot_Skinned.gltf"),function(t){e.threeAssets["Bot_Skinned"]=t}),i.load("".concat(this.publicPath,"model/Soldier.glb"),function(t){e.threeAssets["Soldier"]=t}),i.load("".concat(this.publicPath,"model/scene0.gltf"),function(t){e.threeAssets["scene0"]=t}),i.load("".concat(this.publicPath,"model/light.gltf"),function(t){e.threeAssets["light"]=t})}}},j=L,O=(n("336a"),Object(g["a"])(j,o,s,!1,null,"61a3599b",null)),H=O.exports,z={name:"app",components:{ThreejsWorld:H},mounted:function(){this.$nextTick(function(){})},methods:{isPc:function(){for(var e=navigator.userAgent,t=new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"),n=!0,i=0;i<t.length;i++)if(e.indexOf(t[i])>0){n=!1;break}return n},rootResize:function(){var e,t=document.documentElement.clientWidth||window.innerWidth,n=document.documentElement.clientHeight||window.innerHeight;e=t>n?n/750*100:t/750*100,document.getElementsByTagName("html")[0].style.fontSize=e+"px"},eventInit:function(){var e=this;return document.addEventListener("touchstart",function(e){},{passive:!1}),document.addEventListener("touchmove",function(e){e.preventDefault()},{passive:!1}),e},cssInit:function(){var e=this,t=100,n=1e3;return e.rootResize(),window.addEventListener("onorientationchange"in window?"orientationchange":"resize",function(){var i,r,a,o,s,l;a=function(){clearInterval(i),clearTimeout(r),i=null,r=null,e.rootResize()},i=setInterval(function(){window.innerWidth===o&&window.innerHeight===s?(l++,l===t&&a()):(o=window.innerWidth,s=window.innerHeight,l=0)}),r=setTimeout(function(){a()},n)}),e}}},B=z,W=(n("034f"),Object(g["a"])(B,r,a,!1,null,null,null)),I=W.exports;i["a"].config.productionTip=!1,new i["a"]({render:function(e){return e(I)}}).$mount("#app")},"64a9":function(e,t,n){},6846:function(e,t,n){},"6ffd":function(e,t,n){"use strict";var i=n("afa0"),r=n.n(i);r.a},"83c1":function(e,t,n){"use strict";var i=n("4359"),r=n.n(i);r.a},"98bb":function(e,t,n){},ae46:function(e,t,n){"use strict";var i=n("98bb"),r=n.n(i);r.a},afa0:function(e,t,n){}});
//# sourceMappingURL=app.023194be.js.map