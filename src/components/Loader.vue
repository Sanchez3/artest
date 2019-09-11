<template>
    <div class="loader-wrapper">
        <h1>Loading<br>{{`${per}%`}}</h1>
    </div>
</template>
<script>
export default {
    name: 'Loader',
    props: {
        per: { type: Number, default: 0 }
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loader-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: #fff;
    text-align: center;
}

.loader-wrapper:after {
    content: "";
    display: inline-block;
    height:100%;
    vertical-align: middle;
    margin-left:-0.25em;
}

h1 {
    display: inline-block;
    vertical-align: center;
}
</style>