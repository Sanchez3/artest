(function(e){function t(t){for(var s,o,a=t[0],c=t[1],l=t[2],h=0,u=[];h<a.length;h++)o=a[h],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&u.push(i[o][0]),i[o]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(e[s]=c[s]);d&&d(t);while(u.length)u.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],s=!0,a=1;a<n.length;a++){var c=n[a];0!==i[c]&&(s=!1)}s&&(r.splice(t--,1),e=o(o.s=n[0]))}return e}var s={},i={app:0},r=[];function o(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=s,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(n,s,function(t){return e[t]}.bind(null,s));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var l=0;l<a.length;l++)t(a[l]);var d=c;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var s=n("64a9"),i=n.n(s);i.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var s=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("ThreejsWorld",{attrs:{msg:"Test"}})],1)},r=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("h1",[e._v(e._s(e.msg))]),n("div",{attrs:{id:"canvas-element"}})])},a=[],c=(n("ac6a"),n("bd2e")),l=n.n(c),d=n("3191"),h=n.n(d),u=n("ae37")(THREE),m=(n("7985")(THREE),{name:"ThreejsWorld",props:{msg:String},data:function(){return{scene:"",renderer:"",light:"",camera:"",controls:"",publicPath:"",threeAssets:[],onRenderFcts:[],allMixers:[]}},mounted:function(){this.init(),this.initAR(),this.loading(),this.render(),this.showStats()},methods:{showStats:function(){var e=new h.a;function t(){e.begin(),e.end(),requestAnimationFrame(t)}e.showPanel(0),document.body.appendChild(e.domElement),requestAnimationFrame(t)},initAR:function(){var e=this,t=new THREEx.ArToolkitSource({sourceType:"webcam"});function n(){t.onResizeElement(),t.copyElementSizeTo(e.renderer.domElement),null!==s.arController&&t.copyElementSizeTo(s.arController.canvas)}t.init(function(){n()});var s=new THREEx.ArToolkitContext({cameraParametersUrl:THREEx.ArToolkitContext.baseURL+"../data/data/camera_para.dat",detectionMode:"mono"});s.init(function(){e.camera.projectionMatrix.copy(s.getProjectionMatrix())}),this.onRenderFcts.push(function(n){if(!1!==t.ready){s.update(t.domElement),e.scene.visible=e.camera.visible;for(var i=0;i<e.allMixers.length;i++)e.allMixers[i].update(n)}});new THREEx.ArMarkerControls(s,e.camera,{type:"pattern",patternUrl:THREEx.ArToolkitContext.baseURL+"../data/data/patt.hiro",changeMatrixMode:"cameraTransformMatrix"});e.scene.visible=!1},init:function(){var e=window.innerWidth,t=window.innerHeight;this.clock=new THREE.Clock,this.scene=new THREE.Scene,this.scene.add(new THREE.AmbientLight(10066329)),this.scene.add(new THREE.GridHelper(1e3,100)),this.scene.add(new THREE.AxesHelper(120)),this.scene.add(new THREE.AmbientLight(16777215)),this.camera=new THREE.PerspectiveCamera(30,e/t,1,1e4),this.camera.position.set(10,90,65),this.camera.lookAt(this.scene.position),this.renderer=new THREE.WebGLRenderer({antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(e,t),document.getElementById("canvas-element").appendChild(this.renderer.domElement);var n=new u(this.camera,document.getElementById("canvas-element"));n.target.set(0,0,0),n.update(),window.addEventListener("resize",this.onWindowResize,!1)},onWindowResize:function(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)},render:function(){var e=this;this.onRenderFcts.push(function(){e.renderer.render(e.scene,e.camera)});var t=null;requestAnimationFrame(function n(s){requestAnimationFrame(n),t=t||s-1e3/60;var i=Math.min(200,s-t);t=s,e.onRenderFcts.forEach(function(e){e(i/1e3,s/1e3)})})},addObj:function(){var e=this.threeAssets["color"],t=this.threeAssets["boat"],n=new THREE.MeshStandardMaterial({color:6579300,roughness:.83,metalness:.5,emissive:13158600,map:e,emissiveMap:e,side:THREE.DoubleSide}),s=new THREE.Mesh(t,n);s.position.set(30,0,0),this.scene.add(s),this.threeAssets["DamagedHelmet"].scene.position.x=10,this.scene.add(this.threeAssets["DamagedHelmet"].scene),this.threeAssets["Monster"].scene.position.x=20,this.threeAssets["Monster"].scene.scale.copy(new THREE.Vector3(.5,.5,.5)),this.scene.add(this.threeAssets["Monster"].scene);for(var i=this.threeAssets["Monster"],r=new THREE.AnimationMixer(i.scene),o=0;o<i.animations.length;o++){var a=i.animations[o];a.duration=3;var c=r.clipAction(a);c.play()}this.threeAssets["Soldier"].scene.position.x=0,this.threeAssets["Soldier"].scene.scale.copy(new THREE.Vector3(2,2,2)),this.scene.add(this.threeAssets["Soldier"].scene);var l=new THREE.SkeletonHelper(this.threeAssets["Soldier"].scene);l.visible=!0,this.scene.add(l);var d=this.threeAssets["Soldier"].animations,h=new THREE.AnimationMixer(this.threeAssets["Soldier"].scene),u=h.clipAction(d[3]);u.play();var m=this.threeAssets["CesiumMan"];this.threeAssets["CesiumMan"].scene.position.x=-10,this.threeAssets["CesiumMan"].scene.scale.copy(new THREE.Vector3(2,2,2)),this.scene.add(this.threeAssets["CesiumMan"].scene);var p=this.threeAssets["CesiumMan"].animations;console.log(p);for(var f=new THREE.AnimationMixer(this.threeAssets["CesiumMan"].scene),E=0;E<m.animations.length;E++){a=m.animations[E];a.duration=3;c=f.clipAction(a);c.play()}this.allMixers.push(r,h,f)},loading:function(){var e=this,t=new THREE.LoadingManager;t.onStart=function(e,t,n){},t.onLoad=function(){console.log("Loading complete!"),e.addObj&&e.addObj()},t.onProgress=function(e,t,n){var s=parseInt(t/n*100);console.log(s)},t.onError=function(e){console.log("There was an error loading "+e)};var n=new THREE.LegacyJSONLoader(t);n.load("".concat(this.publicPath,"model/boat.json"),function(t){e.threeAssets["boat"]=t});var s=new THREE.TextureLoader(t);s.load("".concat(this.publicPath,"model/color.jpg"),function(t){e.threeAssets["color"]=t});var i=new l.a(t);i.load("".concat(this.publicPath,"model/Monster/Monster.gltf"),function(t){e.threeAssets["Monster"]=t}),i.load("".concat(this.publicPath,"model/CesiumMan/CesiumMan.gltf"),function(t){e.threeAssets["CesiumMan"]=t}),i.load("".concat(this.publicPath,"model/DamagedHelmet/DamagedHelmet.gltf"),function(t){e.threeAssets["DamagedHelmet"]=t}),i.load("".concat(this.publicPath,"model/CesiumMilkTruck/CesiumMilkTruck.gltf"),function(t){e.threeAssets["CesiumMilkTruck"]=t}),i.load("".concat(this.publicPath,"model/BotSkinned/Bot_Skinned.gltf"),function(t){e.threeAssets["BotSkinned"]=t}),i.load("".concat(this.publicPath,"model/Soldier.glb"),function(t){e.threeAssets["Soldier"]=t})}}}),p=m,f=(n("f2fc"),n("2877")),E=Object(f["a"])(p,o,a,!1,null,"dd108a40",null),v=E.exports,w={name:"app",components:{ThreejsWorld:v}},g=w,b=(n("034f"),Object(f["a"])(g,i,r,!1,null,null,null)),A=b.exports;s["a"].config.productionTip=!1,new s["a"]({render:function(e){return e(A)}}).$mount("#app")},"64a9":function(e,t,n){},"64ec":function(e,t,n){},f2fc:function(e,t,n){"use strict";var s=n("64ec"),i=n.n(s);i.a}});
//# sourceMappingURL=app.8152a9cb.js.map