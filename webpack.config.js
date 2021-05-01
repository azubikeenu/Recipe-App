const path = require( 'path' );
const HTMLWebPackPlugin = require( "html-webpack-plugin" );

module.exports = {
    mode: "development",
    entry: './src/js/index.js',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },

    plugins: [
        new HTMLWebPackPlugin( {
            filename: "index.html",
            template: "./src/index.html"  // This helps inject html into the dist folder and observes changes in the index.js file
        } )],



}