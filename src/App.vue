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
        var that = this;
        this.$nextTick(function() {
            // that.cssInit().eventInit();
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

/**
 * view-port list:
320x480
320x568
320x570
360x592
360x598
360x604
360x640
360x720
375x667
375x812
393x699
412x732
414x736
480x854
540x960
640x360
720x1184
720x1280
800x600
1024x768
1080x1812
1080x1920
 */
html {
    font-size: -webkit-calc(13.33333333vw);
    font-size: calc(13.33333333vw);
}

@media screen and (max-width: 320px) {
    html {
        font-size: 42.667px;
        font-size: -webkit-calc(13.33333333vw);
        font-size: calc(13.33333333vw);
    }
}

@media screen and (min-width: 321px) and (max-width: 360px) {
    html {
        font-size: 48px;
        font-size: -webkit-calc(13.33333333vw);
        font-size: calc(13.33333333vw);
    }
}

@media screen and (min-width: 361px) and (max-width: 375px) {
    html {
        font-size: 50px;
        font-size: -webkit-calc(13.33333333vw);
        font-size: calc(13.33333333vw);
    }
}

@media screen and (min-width: 376px) and (max-width: 393px) {
    html {
        font-size: 52.4px;
        font-size: -webkit-calc(13.33333333vw);
        font-size: calc(13.33333333vw);
    }
}

@media screen and (min-width: 394px) and (max-width: 412px) {
    html {
        font-size: 54.93px;
        font-size: -webkit-calc(13.33333333vw);
        font-size: calc(13.33333333vw);
    }
}

@media screen and (min-width: 413px) and (max-width: 414px) {
    html {
        font-size: 55.2px;
        font-size: -webkit-calc(13.33333333vw);
        font-size: calc(13.33333333vw);
    }
}

@media screen and (min-width: 415px) and (max-width: 480px) {
    html {
        font-size: 64px;
        font-size: -webkit-calc(13.33333333vw);
        font-size: calc(13.33333333vw);
    }
}

@media screen and (min-width: 481px) and (max-width: 540px) {
    html {
        font-size: 72px;
        font-size: -webkit-calc(13.33333333vw);
        font-size: calc(13.33333333vw);
    }
}

@media screen and (min-width: 541px) and (max-width: 640px) {
    html {
        font-size: 85.33px;
        font-size: -webkit-calc(13.33333333vw);
        font-size: calc(13.33333333vw);
    }
}

@media screen and (min-width: 641px) and (max-width: 720px) {
    html {
        font-size: 96px;
        font-size: -webkit-calc(13.33333333vw);
        font-size: calc(13.33333333vw);
    }
}

@media screen and (min-width: 721px) and (max-width: 768px) {
    html {
        font-size: 102.4px;
        font-size: -webkit-calc(13.33333333vw);
        font-size: calc(13.33333333vw);
    }
}

@media screen and (min-width: 769px) {
    html {
        font-size: 102.4px;
        font-size: -webkit-calc(13.33333333vw);
        font-size: calc(13.33333333vw);
    }
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
    font-size: 0.32rem;
}

@-webkit-keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.fadeIn {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
}
</style>