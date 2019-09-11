<template>
    <div class="award-wrapper">
        <h1>！！！Award！！！</h1>
    </div>
</template>
<script>
export default {
    name: 'Award',
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.award-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1001;
    background-color: #000;
    /*text-align: left;*/
    color: #fff;
}

ul {
    list-style-type: square;
}

li {
    overflow: visible;
}
</style>