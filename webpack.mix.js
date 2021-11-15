let mix = require('laravel-mix');

mix.setPublicPath('dist');
mix.js('src/js/fever-cookies.js', 'dist/fever-cookies.min.js');
mix.sass('src/scss/fever-cookies.scss', 'dist/fever-cookies.min.css');