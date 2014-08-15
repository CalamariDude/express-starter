var fs = require('fs')
  , growl = require('growl')
  ;

module.exports = function (grunt) {
  grunt.initConfig({
    nodemon: {
      dev: {
        options: {
          exec: 'npm start',
          env: {
            NODE_ENV: 'development'
          },
          ignore: ['node_modules/**', 'public/**'],
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
    'node-inspector': {
      custom: {
        options: {
          'web-port': 8081
        }
      }
    },
    watch: {
      css: {
        files: ['public/less/*.less'],
        tasks: ['less:style'],
        options: {
          // livereload: true
        }
      },
      public: {
        files: ['public/**'],
        options: {
          // livereload: true
        }
      },
      server: {
        files: ['.rebooted'],
        options: {
          // livereload: true
        }
      }
    },
    concurrent: {
      compress: ['less'],
      start: {
        tasks: ['nodemon', 'node-inspector', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      },
      // debug: {
      //   tasks: ['node-inspector']
      // },
    },
    // concurrent: {
    //   options: {
    //     limit: 3,
    //     logConcurrentOutput: true
    //   },
    //   dev: {
    //     tasks: ["nodemon:dev", "compass:watch", "watch"]
    //   },
    //   inspect: {
    //     tasks: ["nodemon:inspect", "compass:watch", "watch"]
    //   },
    //   inspectBreak: {
    //     tasks: ["nodemon:inspectBreak", "compass:watch", "watch"]
    //   }
    // }
  });

  // Load deps.
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-node-inspector');

  // Register tasks.
  grunt.registerTask('default', 'concurrent');
  grunt.registerTask('dev', 'concurrent');
  grunt.registerTask('prod', 'less');


  // grunt.registerTask("debug", function(inspect, breakOnFirstLine){
  //   var nodemonTask = "dev";
  //   if (inspect === "inspect") {

  //     // set nodemon task based on breakOnFirstLine grunt argument
  //     nodemonTask = breakOnFirstLine === "break" ? "inspectBreak" : "inspect";

  //     // spawn node-inspector as a child process
  //     grunt.util.spawn({
  //       cmd: "node-inspector"
  //     });

  //     console.log("Node inspector running at http://localhost:8080/debug?port=5858");
  //   }

  //   grunt.task.run(["jshint", "concat", "uglify", "imagemin", "cssmin", "handlebars", "concurrent:"+nodemonTask]);
  // });

  // Check for errors and run a system growl notification.
  ['warn', 'fatal'].forEach(function (level) {
    grunt.util.hooker.hook(grunt.fail, level, function (opt) {
      growl(opt.name, {
        title: opt.message,
        image: 'Console'
      });
    });
  });
};
