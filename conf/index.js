var conf = {
  title: 'Express Starter',
  description: 'A bare bones Node.js project starter. It uses Express.js, Grunt, Handlebars, and LESS.',
  styles: [
    {'path':'/css/style.css'}
  ],
  scripts: [
    {'path':'vendor/require.js'},
    {'path':'js/config.js'}
  ]
}
module.exports = function(mode) {
  return conf;
}