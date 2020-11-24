const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

/*mix.js(['resources/js/app.js', 'resources/js/water_buffalo/lib/phaser.js'], 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);*/

mix.scripts(['resources/js/water_buffalo/constants.js',
        'resources/js/water_buffalo/breadboard.js',
        'resources/js/water_buffalo/components.js',
        'resources/js/water_buffalo/game.js'
      ], "public/js/game.js");

mix.copyDirectory('resources/assets', 'public/assets');
