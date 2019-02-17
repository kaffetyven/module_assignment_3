module.exports = function(grunt) {
  	grunt.initConfig({
  		pkg: grunt.file.readJSON('package.json'),
  		less:{
  			dist:{
  				files:{
  					'dist/css/style.css' : 'less/style.less'
  				}
  			}
  		},
      cssmin:{
        minify: {
          src: 'dist/css/style.css',
          dest: 'dist/css/minified/stylemin.css'
        }
      },
      browserSync:{
        dev:{
          bsFiles:{
            src:[
              'dist/css/minified/stylemin.css',
              '*.html'
            ]              
          },
          options:{
            watchTask: true,
            server: './'
          }          
        }
      },
      imagemin:{
        /*static: {
            options: {
                optimizationLevel: 3,
                //svgoPlugins: [{removeViewBox: false}],
               // use: [mozjpeg()] // Example plugin usage
            }
            //files: {
                //'dist/img.png': 'src/img.png',
                //'dist/img.jpg': 'src/img.jpg',
                //'dist/img.gif': 'src/img.gif'
            //}
        },*/
        dynamic: {
            files: [{
                expand: true,
                cwd: 'img/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'dist/resized_images'
            }]
        }
      },

	  	watch: {
		  	css: {
		  		files: 'less/style.less',
		      	tasks: ['less', 'cssmin']
		  	}		      
    	}
	});
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.registerTask('default',['imagemin','browserSync','watch']);
}