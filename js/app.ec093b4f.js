(function(e){function t(t){for(var r,a,s=t[0],c=t[1],l=t[2],u=0,h=[];u<s.length;u++)a=s[u],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&h.push(i[a][0]),i[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);d&&d(t);while(h.length)h.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,s=1;s<n.length;s++){var c=n[s];0!==i[c]&&(r=!1)}r&&(o.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},i={app:0},o=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var d=c;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),i=n.n(r);i.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("ThreejsWorld",{attrs:{msg:"Test"}})],1)},o=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("h1",[e._v(e._s(e.msg))]),n("div",{attrs:{id:"canvas-element"}})])},s=[],c=(n("7f7f"),n("ac6a"),n("bd2e")),l=n.n(c),d=n("3191"),u=n.n(d),h=(n("7985")(THREE),{name:"ThreejsWorld",props:{msg:String},data:function(){return{scene:"",renderer:"",light:"",camera:"",controls:"",publicPath:"",threeAssets:[],onRenderFcts:[],allMixers:[]}},mounted:function(){this.init(),this.loading(),this.showStats()},methods:{showStats:function(){var e=new u.a;function t(){e.begin(),e.end(),requestAnimationFrame(t)}e.showPanel(0),document.body.appendChild(e.domElement),requestAnimationFrame(t)},initAR:function(){var e=this,t=new THREEx.ArToolkitSource({sourceType:"webcam"});function n(){t.onResizeElement(),t.copyElementSizeTo(e.renderer.domElement),null!==r.arController&&t.copyElementSizeTo(r.arController.canvas)}t.init(function(){n()}),window.addEventListener("resize",function(){n()});var r=new THREEx.ArToolkitContext({cameraParametersUrl:THREEx.ArToolkitContext.baseURL+"../data/data/camera_para.dat",detectionMode:"mono"});r.init(function(){e.camera.projectionMatrix.copy(r.getProjectionMatrix())}),this.onRenderFcts.push(function(n){!1!==t.ready&&(r.update(t.domElement),e.scene.visible=e.camera.visible)});new THREEx.ArMarkerControls(r,e.camera,{type:"pattern",patternUrl:"".concat(this.publicPath,"pattern/pattern-3.patt"),changeMatrixMode:"cameraTransformMatrix"});e.scene.visible=!1},init:function(){var e=window.innerWidth,t=window.innerHeight;this.clock=new THREE.Clock,this.scene=new THREE.Scene,this.scene.add(new THREE.GridHelper(1e3,100)),this.scene.add(new THREE.AxesHelper(20));var n=new THREE.PointLight(16777215,1,100);n.position.set(0,4,0),n.castShadow=!0,this.scene.add(n);var r=1,i=new THREE.PointLightHelper(n,r);this.scene.add(i);var o=new THREE.DirectionalLight(16777215,5);o.position.set(0,5,0);var a=new THREE.DirectionalLightHelper(o,1);this.scene.add(a),this.scene.add(o),this.renderer=new THREE.WebGLRenderer({antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(e,t),document.getElementById("canvas-element").appendChild(this.renderer.domElement),this.camera=new THREE.Camera,this.scene.add(this.camera),this.onRenderFcts.push(function(){c.renderer.render(c.scene,c.camera)});var s=null,c=this;requestAnimationFrame(function e(t){requestAnimationFrame(e),s=s||t-1e3/60;var n=Math.min(200,t-s);s=t,c.onRenderFcts.forEach(function(e){e(n/1e3,t/1e3)})})},onWindowResize:function(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)},render:function(){var e=this,t=null;this.onRenderFcts.push(function(){e.renderer.render(e.scene,e.camera)}),requestAnimationFrame(function n(r){requestAnimationFrame(n),t=t||r-1e3/60;var i=Math.min(200,r-t);t=r,e.onRenderFcts.forEach(function(e){e(i/1e3,r/1e3)})})},addGlb:function(e){var t=this.threeAssets[e],n=this.threeAssets[e].scene;this.scene.add(n),n.traverse(function(e){e.isMesh&&(e.castShadow=!0)}),n.position.z=1,n.rotateX(-Math.PI/2),n.rotateY(Math.PI);for(var r=t.animations,i=new THREE.AnimationMixer(n),o=0;o<r.length;o++){var a=i.clipAction(r[o]);a.play()}return i},addObj:function(){var e=this,t=new THREE.PlaneGeometry(20,20),n=new THREE.ShadowMaterial,r=new THREE.Mesh(t,n);r.rotation.x=-Math.PI/2,r.receiveShadow=!0,this.scene.add(r);var i=this.threeAssets["color"],o=this.threeAssets["boat"],a=new THREE.MeshStandardMaterial({color:6579300,roughness:.83,metalness:.5,emissive:13158600,map:i,emissiveMap:i,side:THREE.DoubleSide}),s=new THREE.Mesh(o,a);s.position.set(30,0,0),this.scene.add(s);var c=this.threeAssets["Soldier"],l=this.threeAssets["Soldier"].scene;this.scene.add(l),l.position.z=1,l.rotateX(-Math.PI/2),l.rotateY(Math.PI);for(var d=c.animations,u=new THREE.AnimationMixer(l),h=0;h<d.length;h++){var p=u.clipAction(d[h]);p.play()}this.allMixers.push(u),e.initAR(),this.onRenderFcts.push(function(t){if(e.scene.visible)for(var n=0;n<e.allMixers.length;n++)(function(n){e.allMixers[n].update(t)})(n)})},loading:function(){var e=this,t=new THREE.LoadingManager;t.onStart=function(e,t,n){},t.onLoad=function(){console.log("Loading complete!"),e.addObj()},t.onProgress=function(e,t,n){var r=parseInt(t/n*100);console.log(r)},t.onError=function(e){console.log("There was an error loading "+e)};var n=new THREE.LegacyJSONLoader(t);n.load("".concat(this.publicPath,"model/boat.json"),function(t){e.threeAssets["boat"]=t});var r=new THREE.TextureLoader(t);r.load("".concat(this.publicPath,"model/color.jpg"),function(t){e.threeAssets["color"]=t});var i=new l.a(t);i.load("".concat(this.publicPath,"model/Soldier.glb"),function(t){e.threeAssets["Soldier"]=t}),i.load("".concat(this.publicPath,"model/test1.gltf"),function(t){e.threeAssets["test1"]=t})}}}),p=h,f=(n("64e4"),n("2877")),m=Object(f["a"])(p,a,s,!1,null,"a63cfb8c",null),E=m.exports,v={name:"app",components:{ThreejsWorld:E}},w=v,b=(n("034f"),Object(f["a"])(w,i,o,!1,null,null,null)),g=b.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(g)}}).$mount("#app")},"64a9":function(e,t,n){},"64e4":function(e,t,n){"use strict";var r=n("f0bf"),i=n.n(r);i.a},f0bf:function(e,t,n){}});
//# sourceMappingURL=app.ec093b4f.js.map