<template>
    <div id="app">
        <ThreejsWorld msg="Test" />
    </div>
</template>
<script>
import ThreejsWorld from './components/ThreejsWorld.vue'

export default {
    name: 'app',
    components: {
        ThreejsWorld
    },
    mounted() {
        var that=this;
        this.$nextTick(function() {
            that.cssInit().eventInit();
        })
    },
    methods: {
        isPc() {
            var userAgentInfo = navigator.userAgent;
            var Agents = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod');
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
            }
            return flag;
        },
        rootResize() {
            var wFsize;
            //iphone6/6s/7/8 orientation=portrait screen.width=750px screen.height=1334px / WeChat window.innerWidth=750px window.innerHeight=1206px 
            var wWidth = document.documentElement.clientWidth || window.innerWidth;
            var wHeight = document.documentElement.clientHeight || window.innerHeight;
            if (wWidth > wHeight) {
                wFsize = wHeight / 750 * 100;
            } else {
                wFsize = wWidth / 750 * 100;
            }
            document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
        },
        eventInit() {
            var that = this;
            document.addEventListener('touchstart', function(e) {}, { passive: false });
            document.addEventListener('touchmove', function(e) {
                e.preventDefault();
            }, { passive: false });
            return that;
        },
        cssInit() {
            var that = this;
            var noChangeCountToEnd = 100,
                noEndTimeout = 1000;
            that.rootResize();
            window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', function() {
                var interval,
                    timeout,
                    end,
                    lastInnerWidth,
                    lastInnerHeight,
                    noChangeCount;
                end = function() {
                    //"orientationchangeend"
                    clearInterval(interval);
                    clearTimeout(timeout);
                    interval = null;
                    timeout = null;
                    that.rootResize();
                };
                interval = setInterval(function() {
                    if (window.innerWidth === lastInnerWidth && window.innerHeight === lastInnerHeight) {
                        noChangeCount++;
                        if (noChangeCount === noChangeCountToEnd) {
                            //The interval resolved the issue first.
                            end();
                        }
                    } else {
                        lastInnerWidth = window.innerWidth;
                        lastInnerHeight = window.innerHeight;
                        noChangeCount = 0;
                    }
                });
                timeout = setTimeout(function() {
                    //The timeout happened first.
                    end();
                }, noEndTimeout);
            });

            return that;
        }
    }
}
</script>
<style>
* {
    margin: 0 auto;
    overflow: hidden;
}

#app {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>