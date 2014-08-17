var fs = require('fs')
  , growl = require('growl')
  ;

module.exports = function (grunt) {
  grunt.initConfig({
    // Nodemon tasks.
    nodemon: {
      dev: {
        script: './bin/www',
        options: {
          env: {
            NODE_ENV: 'development'
          },
          ignore: ['node_modules/**', 'public/**', "Gruntfile.js", ".git/"],
          ext: 'js,hbs,yml',
          callback: function (nodemon) {
            // Refreshes browser when server reboots.
            nodemon.on('restart', function () {
              setTimeout(function () {
                fs.writeFileSync('.rebooted', 'rebooted');
              }, 1000);
            });
          }
        }
      },
      inspect: {
        script: './bin/www',
        options: {
          nodeArgs: ["--debug"],
          env: {
            NODE_ENV: 'development'
          },
          ignore: ['node_modules/**', 'public/**', "Gruntfile.js", ".git/"],
          ext: 'js,hbs,yml',
          callback: function (nodemon) {
            // Refreshes browser when server reboots.
            nodemon.on('restart', function () {
              setTimeout(function () {
                fs.writeFileSync('.rebooted', 'rebooted');
              }, 1000);
            });
          }
        }
      },
      inspectBreak: {
        script: './bin/www',
        options: {
          nodeArgs: ["--debug-brk"],
          env: {
            NODE_ENV: 'development'
          },
          ignore: ['node_modules/**', 'public/**', "Gruntfile.js", ".git/"],
          ext: 'js,hbs,yml',
          callback: function (nodemon) {
            // Refreshes browser when server reboots.
            nodemon.on('restart', function () {
              setTimeout(function () {
                fs.writeFileSync('.rebooted', 'rebooted');
              }, 1000);
            });
          }
        }
      }
    },

    // Less compiling and source mapping.
    less: {
      style: {
        files: {
          'public/css/style.css': 'public/less/style.less'
        },
        options: {
          sourceMap: true,
          sourceMapFilename: 'public/css/style.css.map',
          sourceMapURL: '/css/style.css.map',
          sourceMapBasepath: 'public',
          sourceMapRootpath: '/'
        }
      }
    },

    // Setup basic node inspector task.
    'node-inspector': {
      dev: {}
    },

    // Watch for file changes, live reload.
    watch: {
      css: {
        files: ['public/less/*.less'],
        tasks: ['less:style'],
        options: {
          livereload: true
        }
      },
      public: {
        files: ['public/**'],
        options: {
          livereload: true
        }
      },
      server: {
        files: ['.rebooted'],
        options: {
          livereload: true
        }
      }
    },

    // Current Tasks.
    concurrent: {
      options: {
        limit: 5,
        logConcurrentOutput: true
      },
      dev: {
        tasks: ['nodemon:dev', 'less', 'watch']
      },
      inspect: {
        tasks: ['nodemon:inspect', 'node-inspector', 'less', 'watch']
      },
      inspectBreak: {
        tasks: ['nodemon:inspectBreak', 'node-inspector', 'less', 'watch']
      }
    }
  });

  // Load deps.
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-node-inspector');

  // Register tasks.
  grunt.registerTask('default', 'concurrent:dev');
  grunt.registerTask("debug", function(inspect, breakOnFirstLine){
    var nodemonTask = "dev";

    if (inspect === "inspect") {
      // set nodemon task based on breakOnFirstLine grunt argument
      nodemonTask = breakOnFirstLine === "break" ? "inspectBreak" : "inspect";
    }
    grunt.task.run('concurrent:'+nodemonTask);
  });
  grunt.registerTask('prod', 'less');

  // Check for errors and run a system growl notification like a boss.
  ['warn', 'fatal'].forEach(function (level) {
    grunt.util.hooker.hook(grunt.fail, level, function (opt) {
      growl(opt.name, {
        title: opt.message,
        image: 'Console'
      });
    });
  });
};
