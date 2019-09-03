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