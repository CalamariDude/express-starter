/**
 * Configuration for RequireJS.
 */
requirejs.config({
  baseUrl: '/js/',
  paths: {
    // Handlebars template loader/compiler.
    'hbs': 'require.hbs',

    // Vendor libraries.
    'jquery': '../vendor/jquery',
    'text': '../vendor/require.text',
    'handlebars': '../vendor/handlebars'
  },

  // Shims for non-AMD compatible libraries.
  shim: {
    'jquery': {
      exports: 'jQuery'
    },
    'handlebars': {
      exports: 'Handlebars'
    }
  }
});