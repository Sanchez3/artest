(function(e){function t(t){for(var i,o,a=t[0],c=t[1],l=t[2],h=0,u=[];h<a.length;h++)o=a[h],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&u.push(r[o][0]),r[o]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);d&&d(t);while(u.length)u.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],i=!0,a=1;a<n.length;a++){var c=n[a];0!==r[c]&&(i=!1)}i&&(s.splice(t--,1),e=o(o.s=n[0]))}return e}var i={},r={app:0},s=[];function o(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=i,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(n,i,function(t){return e[t]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var l=0;l<a.length;l++)t(a[l]);var d=c;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var i=n("64a9"),r=n.n(i);r.a},5166:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var i=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("ThreejsWorld",{attrs:{msg:"Test"}})],1)},s=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("h1",[e._v(e._s(e.msg))]),n("div",{attrs:{id:"canvas-element"}})])},a=[],c=(n("ac6a"),n("bd2e")),l=n.n(c),d=n("3191"),h=n.n(d),u=(n("7985")(THREE),{name:"ThreejsWorld",props:{msg:String},data:function(){return{scene:"",renderer:"",light:"",camera:"",controls:"",publicPath:"",threeAssets:[],onRenderFcts:[],allMixers:[]}},mounted:function(){this.init(),this.initAR(),this.loading(),this.render(),this.showStats()},methods:{showStats:function(){var e=new h.a;function t(){e.begin(),e.end(),requestAnimationFrame(t)}e.showPanel(0),document.body.appendChild(e.domElement),requestAnimationFrame(t)},initAR:function(){var e=this,t=new THREEx.ArToolkitSource({sourceType:"webcam"});function n(){t.onResizeElement(),t.copyElementSizeTo(e.renderer.domElement),null!==i.arController&&t.copyElementSizeTo(i.arController.canvas)}t.init(function(){n()});var i=new THREEx.ArToolkitContext({cameraParametersUrl:THREEx.ArToolkitContext.baseURL+"../data/data/camera_para.dat",detectionMode:"mono"});i.init(function(){e.camera.projectionMatrix.copy(i.getProjectionMatrix())}),this.onRenderFcts.push(function(n){if(!1!==t.ready){i.update(t.domElement),e.scene.visible=e.camera.visible;for(var r=0;r<e.allMixers.length;r++)e.allMixers[r].update(n)}});new THREEx.ArMarkerControls(i,e.camera,{type:"pattern",patternUrl:"".concat(this.publicPath,"pattern/pattern-3.patt"),changeMatrixMode:"cameraTransformMatrix"});e.scene.visible=!1},init:function(){var e=window.innerWidth,t=window.innerHeight;this.clock=new THREE.Clock,this.scene=new THREE.Scene,this.scene.add(new THREE.AmbientLight(10066329)),this.scene.add(new THREE.GridHelper(1e3,100)),this.scene.add(new THREE.AxesHelper(120)),this.scene.add(new THREE.AmbientLight(16777215)),this.camera=new THREE.Camera,this.scene.add(this.camera),this.renderer=new THREE.WebGLRenderer({antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(e,t),document.getElementById("canvas-element").appendChild(this.renderer.domElement),window.addEventListener("resize",this.onWindowResize,!1)},onWindowResize:function(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)},render:function(){var e=this;this.onRenderFcts.push(function(){e.renderer.render(e.scene,e.camera)});var t=null;requestAnimationFrame(function n(i){requestAnimationFrame(n),t=t||i-1e3/60;var r=Math.min(200,i-t);t=i,e.onRenderFcts.forEach(function(e){e(r/1e3,i/1e3)})})},addObj:function(){var e=this.threeAssets["color"],t=this.threeAssets["boat"],n=new THREE.MeshStandardMaterial({color:6579300,roughness:.83,metalness:.5,emissive:13158600,map:e,emissiveMap:e,side:THREE.DoubleSide}),i=new THREE.Mesh(t,n);i.position.set(30,0,0),this.scene.add(i),this.threeAssets["DamagedHelmet"].scene.position.x=10,this.scene.add(this.threeAssets["DamagedHelmet"].scene),this.threeAssets["Soldier"].scene.position.x=0,this.threeAssets["Soldier"].scene.scale.copy(new THREE.Vector3(1,1,1)),this.threeAssets["Soldier"].scene.rotateX(-Math.PI/2),this.scene.add(this.threeAssets["Soldier"].scene);var r=new THREE.SkeletonHelper(this.threeAssets["Soldier"].scene);r.visible=!0,this.scene.add(r);var s=this.threeAssets["Soldier"].animations,o=new THREE.AnimationMixer(this.threeAssets["Soldier"].scene),a=o.clipAction(s[3]);a.play();var c=this.threeAssets["CesiumMan"];this.threeAssets["CesiumMan"].scene.position.x=-10,this.threeAssets["CesiumMan"].scene.scale.copy(new THREE.Vector3(2,2,2)),this.scene.add(this.threeAssets["CesiumMan"].scene);this.threeAssets["CesiumMan"].animations;for(var l=new THREE.AnimationMixer(this.threeAssets["CesiumMan"].scene),d=0;d<c.animations.length;d++){var h=c.animations[d];h.duration=3;var u=l.clipAction(h);u.play()}this.allMixers.push(o,l);var p=new THREE.CubeGeometry(1,1,1),m=new THREE.MeshNormalMaterial({transparent:!0,opacity:.5,side:THREE.DoubleSide}),f=new THREE.Mesh(p,m);f.position.y=p.parameters.height/2,this.scene.add(f);var E=new THREE.TorusKnotGeometry(.3,.1,64,16),w=new THREE.MeshNormalMaterial,v=new THREE.Mesh(E,w);v.position.y=.5,this.scene.add(v)},loading:function(){var e=this,t=new THREE.LoadingManager;t.onStart=function(e,t,n){},t.onLoad=function(){console.log("Loading complete!"),e.addObj&&e.addObj()},t.onProgress=function(e,t,n){var i=parseInt(t/n*100);console.log(i)},t.onError=function(e){console.log("There was an error loading "+e)};var n=new THREE.LegacyJSONLoader(t);n.load("".concat(this.publicPath,"model/boat.json"),function(t){e.threeAssets["boat"]=t});var i=new THREE.TextureLoader(t);i.load("".concat(this.publicPath,"model/color.jpg"),function(t){e.threeAssets["color"]=t});var r=new l.a(t);r.load("".concat(this.publicPath,"model/Monster/Monster.gltf"),function(t){e.threeAssets["Monster"]=t}),r.load("".concat(this.publicPath,"model/CesiumMan/CesiumMan.gltf"),function(t){e.threeAssets["CesiumMan"]=t}),r.load("".concat(this.publicPath,"model/DamagedHelmet/DamagedHelmet.gltf"),function(t){e.threeAssets["DamagedHelmet"]=t}),r.load("".concat(this.publicPath,"model/CesiumMilkTruck/CesiumMilkTruck.gltf"),function(t){e.threeAssets["CesiumMilkTruck"]=t}),r.load("".concat(this.publicPath,"model/BotSkinned/Bot_Skinned.gltf"),function(t){e.threeAssets["BotSkinned"]=t}),r.load("".concat(this.publicPath,"model/Soldier.glb"),function(t){e.threeAssets["Soldier"]=t})}}}),p=u,m=(n("f775"),n("2877")),f=Object(m["a"])(p,o,a,!1,null,"70392dc6",null),E=f.exports,w={name:"app",components:{ThreejsWorld:E}},v=w,g=(n("034f"),Object(m["a"])(v,r,s,!1,null,null,null)),b=g.exports;i["a"].config.productionTip=!1,new i["a"]({render:function(e){return e(b)}}).$mount("#app")},"64a9":function(e,t,n){},f775:function(e,t,n){"use strict";var i=n("5166"),r=n.n(i);r.a}});
//# sourceMappingURL=app.bd5e00af.js.map