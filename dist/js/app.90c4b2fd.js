(function(e){function n(n){for(var r,a,s=n[0],c=n[1],l=n[2],u=0,h=[];u<s.length;u++)a=s[u],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&h.push(i[a][0]),i[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);d&&d(n);while(h.length)h.shift()();return o.push.apply(o,l||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],r=!0,s=1;s<t.length;s++){var c=t[s];0!==i[c]&&(r=!1)}r&&(o.splice(n--,1),e=a(a.s=t[0]))}return e}var r={},i={app:0},o=[];function a(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.m=e,a.c=r,a.d=function(e,n,t){a.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,n){if(1&n&&(e=a(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(a.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)a.d(t,r,function(n){return e[n]}.bind(null,r));return t},a.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(n,"a",n),n},a.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},a.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=n,s=s.slice();for(var l=0;l<s.length;l++)n(s[l]);var d=c;o.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";var r=t("64a9"),i=t.n(r);i.a},"14c0":function(e,n,t){},"56d7":function(e,n,t){"use strict";t.r(n);t("cadf"),t("551c"),t("f751"),t("097d");var r=t("2b0e"),i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("ThreejsWorld",{attrs:{msg:"Test"}})],1)},o=[],a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"hello"},[t("h1",[e._v(e._s(e.msg))]),t("div",{attrs:{id:"canvas-element"}})])},s=[],c=(t("7f7f"),t("ac6a"),t("bd2e")),l=t.n(c),d=t("3191"),u=t.n(d),h=(t("7985")(THREE),{name:"ThreejsWorld",props:{msg:String},data:function(){return{scene:"",renderer:"",light:"",camera:"",controls:"",publicPath:"",threeAssets:[],onRenderFcts:[],allMixers:[]}},mounted:function(){this.init(),this.loading(),this.showStats()},methods:{showStats:function(){var e=new u.a;function n(){e.begin(),e.end(),requestAnimationFrame(n)}e.showPanel(0),document.body.appendChild(e.domElement),requestAnimationFrame(n)},initAR:function(){var e=this,n=new THREEx.ArToolkitSource({sourceType:"webcam"});function t(){n.onResizeElement(),n.copyElementSizeTo(e.renderer.domElement),null!==r.arController&&n.copyElementSizeTo(r.arController.canvas)}n.init(function(){t()}),window.addEventListener("resize",function(){t()});var r=new THREEx.ArToolkitContext({cameraParametersUrl:THREEx.ArToolkitContext.baseURL+"../data/data/camera_para.dat",detectionMode:"mono"});r.init(function(){e.camera.projectionMatrix.copy(r.getProjectionMatrix())}),this.onRenderFcts.push(function(t){!1!==n.ready&&(r.update(n.domElement),e.scene.visible=e.camera.visible)});new THREEx.ArMarkerControls(r,e.camera,{type:"pattern",patternUrl:"".concat(this.publicPath,"pattern/pattern-3.patt"),changeMatrixMode:"cameraTransformMatrix"});e.scene.visible=!1},init:function(){var e=window.innerWidth,n=window.innerHeight;this.clock=new THREE.Clock,this.scene=new THREE.Scene,this.scene.add(new THREE.GridHelper(1e3,100)),this.scene.add(new THREE.AxesHelper(20));var t=new THREE.PointLight(16777215,1,100);t.position.set(0,4,0),t.castShadow=!0,this.scene.add(t);var r=1,i=new THREE.PointLightHelper(t,r);this.scene.add(i);var o=new THREE.DirectionalLight(16777215,5);o.position.set(0,5,0);var a=new THREE.DirectionalLightHelper(o,5);this.scene.add(a),this.scene.add(o),this.renderer=new THREE.WebGLRenderer({antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(e,n),document.getElementById("canvas-element").appendChild(this.renderer.domElement),this.camera=new THREE.Camera,this.scene.add(this.camera);var s=null,c=this;requestAnimationFrame(function e(n){requestAnimationFrame(e),s=s||n-1e3/60;var t=Math.min(200,n-s);s=n,c.renderer.render(c.scene,c.camera),c.onRenderFcts.forEach(function(e){e(t/1e3,n/1e3)})})},onWindowResize:function(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)},render:function(){var e=this,n=null;this.onRenderFcts.push(function(){e.renderer.render(e.scene,e.camera)}),requestAnimationFrame(function t(r){requestAnimationFrame(t),n=n||r-1e3/60;var i=Math.min(200,r-n);n=r,e.onRenderFcts.forEach(function(e){e(i/1e3,r/1e3)})})},addGlb:function(e){var n=this.threeAssets[e],t=this.threeAssets[e].scene;this.scene.add(t),t.traverse(function(e){e.isMesh&&(e.castShadow=!0)}),t.position.z=1,t.scale.copy(new THREE.Vector3(.003,.003,.003)),t.rotateX(-Math.PI/2);for(var r=n.animations,i=new THREE.AnimationMixer(t),o=0;o<r.length;o++){var a=i.clipAction(r[o]);a.play()}return i},addObj:function(){var e=this,n=new THREE.PlaneGeometry(20,20),t=new THREE.ShadowMaterial,r=new THREE.Mesh(n,t);r.rotation.x=-Math.PI/2,r.receiveShadow=!0,this.scene.add(r);var i=this.threeAssets["color"],o=this.threeAssets["boat"],a=new THREE.MeshStandardMaterial({color:6579300,roughness:.83,metalness:.5,emissive:13158600,map:i,emissiveMap:i,side:THREE.DoubleSide}),s=new THREE.Mesh(o,a);s.position.set(30,0,0),this.scene.add(s);var c=this.threeAssets["Soldier"],l=this.threeAssets["Soldier"].scene;this.scene.add(l),l.position.z=1,l.scale.copy(new THREE.Vector3(.003,.003,.003)),l.rotateX(-Math.PI/2);var d=new THREE.SkeletonHelper(l);d.visible=!0,this.scene.add(d);for(var u=c.animations,h=new THREE.AnimationMixer(l),p=0;p<u.length;p++){var f=h.clipAction(u[p]);f.play()}this.allMixers.push(h),this.onRenderFcts.push(function(n){for(var t=0;t<e.allMixers.length;t++)(function(t){e.allMixers[t].update(n)})(t)})},loading:function(){var e=this,n=new THREE.LoadingManager;n.onStart=function(e,n,t){},n.onLoad=function(){console.log("Loading complete!"),e.initAR(),e.addObj()},n.onProgress=function(e,n,t){var r=parseInt(n/t*100);console.log(r)},n.onError=function(e){console.log("There was an error loading "+e)};var t=new THREE.LegacyJSONLoader(n);t.load("".concat(this.publicPath,"model/boat.json"),function(n){e.threeAssets["boat"]=n});var r=new THREE.TextureLoader(n);r.load("".concat(this.publicPath,"model/color.jpg"),function(n){e.threeAssets["color"]=n});var i=new l.a(n);i.load("".concat(this.publicPath,"model/Soldier.glb"),function(n){e.threeAssets["Soldier"]=n}),i.load("".concat(this.publicPath,"model/test1.gltf"),function(n){e.threeAssets["test1"]=n})}}}),p=h,f=(t("d421"),t("2877")),m=Object(f["a"])(p,a,s,!1,null,"f31b5ffe",null),E=m.exports,v={name:"app",components:{ThreejsWorld:E}},w=v,g=(t("034f"),Object(f["a"])(w,i,o,!1,null,null,null)),b=g.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(b)}}).$mount("#app")},"64a9":function(e,n,t){},d421:function(e,n,t){"use strict";var r=t("14c0"),i=t.n(r);i.a}});
//# sourceMappingURL=app.90c4b2fd.js.map