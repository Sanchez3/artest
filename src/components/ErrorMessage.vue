<template>
    <div class="error-wrapper">
        <h1>WebRTC issue!</h1>
        <h3>Open camera page on your phone with one of the browsers listed below.</h3>
        <h5>Camera Page:</h5>
        <ul>
            <li>iOS Safari 11+</li>
            <li>Android Browser 56+</li>
            <li>Chrome for Android 61+</li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'ErrorMessage',
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1000;
    background-color: #fff;
    text-align: left;

}
ul{
    list-style-type: square;
}
li{
    overflow:visible;
}
</style>