# Express Starter

A bare bones Node.js project starter. It uses Express.js, Grunt, Handlebars, and LESS.

## Application Structure
Docs coming soon...

## Installation / Usage
  1. RUN `npm install` to load external modules.
  2. Change settings to `conf/conf.js` to suit the app.
  3. RUN `grunt` to start the server, see below for available grunt commands.

## Grunt integration and workflow.
Gruntfile comes with a number of task for easier development workflow.

### Available Grunt Tasks/Commands
`grunt` or `grunt debug`: Starts the server using nodemon, compiles LESS files to CSS files,  watches files changes and recompiles LESS files if necessary, also triggers live-reload.

`grunt debug:inspect`: Same as above, but also fires up node-inspector using a concurrent task. This is nice because when you stop the grunt process it will stop node-inspector as well.

`grunt debug:inspect:break` – same as above, but starts the debugger with `--debug-brk`, which will apply that first breakpoint and allow you to better debug at server startup.


All grunt tasks have automatic desktop notifications for Grunt errors and warnings using Growl.