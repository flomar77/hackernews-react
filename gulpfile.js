
// config
const localUrl = 'hnews.devl';
const srcDir = './src/';
const buildDir = './build/';

const scss_sources = [
  srcDir + 'scss/*.scss', 
  srcDir + 'scss/**/*.scss'
];

let watched_js_sources = [];
let js_sources = [];

watched_js_sources = [
  srcDir + 'js/**/*.js',
  srcDir + 'js/**/**/*.js',
  srcDir + 'js/*.js'
];
js_sources = [
  srcDir + 'js/scripts.js'
];

// dependencies
const { src, dest, watch, series, parallel } = require('gulp');
const browsersync   = require('browser-sync').create();
const postcss       = require('gulp-postcss');
const autoprefixer  = require('autoprefixer');
const cssnano       = require('cssnano');
const sass          = require('gulp-sass');
const sourcemaps    = require('gulp-sourcemaps');
const minify        = require('gulp-minify');
const rollup        = require('gulp-better-rollup'); // see https://nshki.com/es6-in-gulp-projects/ 
const babel         = require('rollup-plugin-babel'); // to import modules
const resolve       = require('@rollup/plugin-node-resolve');
const replace       = require('@rollup/plugin-replace');
const commonjs      = require('@rollup/plugin-commonjs');
const json          = require('@rollup/plugin-json');
const plumber       = require('gulp-plumber');
const notify        = require('gulp-notify');
const eslint        = require('gulp-eslint');
const beeper        = require('beeper');

const postcssPlugins = [ 
  autoprefixer(),
  cssnano()
];

// Compile CSS from Sass.
function buildStyles() {
  return src(srcDir + 'scss/styles.scss')
    .pipe(plumbError())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(postcssPlugins))
    .pipe(dest(buildDir + 'css/'))
    .pipe(sourcemaps.write('../src/sourcemaps'))
    .pipe(browsersync.reload({ stream: true }));
}
// Build Scripts
function buildScripts() {
  return src(js_sources)
  .pipe(eslint(
    {
      "quiet": "isWarning",
      "parser": "babel-eslint",
      "plugins": ["react"],
      "extends": ["eslint:recommended", "plugin:react/recommended"]
    }   
  ))
  .pipe(eslint.formatEach())
  .pipe(eslint.failAfterError())
  .pipe(sourcemaps.init())
  .pipe(rollup({ 
    plugins: [
      babel({
        exclude: 'node_modules/**',
        presets: [
          [
            '@babel/preset-env',
            {
              "targets": {
                "node": "current"
              }
            }
          ],
          '@babel/preset-react'
        ],
        // plugins: ["@babel/plugin-transform-for-of"],"@babel/preset-env", 
      }),
      resolve({
        browser: true,
        preferBuiltins: true,
        jsnext: true
      }), 
      commonjs({
        include: 'node_modules/**'
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify( 'production' )
      }),
      json()
    ]
  }, 'umd')
  .on('error', function(err) {
    console.error(err.message);
    this.emit('end'); // Prevent gulp from catching the error and exiting the watch process
  })
  )
  .pipe(dest(buildDir + '/js/'))
  .pipe(minify({
    ext:{
      min:'.min.js'
    }
  }))
  .pipe(dest(buildDir + '/js/'))
  .pipe(sourcemaps.write('../src/sourcemaps'))
  .pipe(browsersync.reload({ stream: true }));
}

// Watch changes separately
function watchCSS() {
  watch(
    scss_sources,
    { events: 'all', ignoreInitial: false },
    buildStyles
  );
}
function watchJS() {
  watch(
    watched_js_sources,
    { events: 'all', ignoreInitial: false },
    buildScripts
  );
}

// Init BrowserSync.
function browserSync(done) {
  browsersync.init({
    proxy: localUrl, // Change this value to match your local URL.
    socket: {
      domain: 'localhost:3000'
    }
  });
  done();
}

// Error handler.
function plumbError() {
  return plumber({
    errorHandler: function(err) {
      notify.onError({
        templateOptions: {
          date: new Date()
        },
        title: "Gulp error in " + err.plugin,
        message:  err.formatted
      })(err);
      beeper();
      this.emit('end');
    }
  })
}

// Export commands.
exports.sass = buildStyles; // $ gulp sass
exports.scripts = buildScripts; // $ gulp scripts
exports.default = parallel(buildStyles, buildScripts); // $ gulp
exports.watch = parallel(watchCSS, watchJS, browserSync); // $ gulp watch
exports.build = parallel(buildStyles, buildScripts); // $ gulp build
