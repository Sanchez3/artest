module.exports = {
    publicPath: './',
    chainWebpack: config => {
        config
            .module
            .rule("glsl")
            .test(/\.(glsl|frag|vert)$/)
            .use("raw-loader")
            .loader("raw-loader")
            .end();
    }
}