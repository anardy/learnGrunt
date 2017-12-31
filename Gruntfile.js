module.exports = function(grunt) {

  grunt.initConfig({

    copy : {

      public : {
          expand : true,
          cwd : 'public', // diretorio padrão
          src : '**',
          dest : 'dist'
      }

    },

    clean : {

      dist : {
        src : 'dist'
      }

    },

    useminPrepare : { // primeira task responsavel em realizar a mificação concat, uglify e cssmin
      html: 'dist/**/*.html'
    },

    usemin : { // segunda task responsavel em alterar o html para apontar para os arquivos minificados
      html: 'dist/**/*.html'
    },

    imagemin : {

      public : {
        expand :true,
        cwd : 'dist/img',
        src : '**/*.{png,jpg,gif}',
        dest : 'dist/img'
      },
    },

    rev : {
      options : {
        enconding : 'utf8',
        algorithm : 'md5',
        length : 8
      },
      imagens : {
        src : ['dist/img/**/*.{png.jpg,gif}'],
      },
      minificados : {
        src : ['dist/js/**/*.min.js', 'dist/css/**/*.min.css']
      }
    },

    coffee : {
      compilar : {
        expand : true,
        cwd : 'public/coffee',
        src : ['**/*.coffee'],
        dest : 'public/js',
        ext : '.js'
      }
    },

    less : {
      compilar : {
        expand : true,
        cwd : 'public/less',
        src : ['**/*.less'],
        dest : 'public/css',
        ext : '.css'
      }
    },

    watch : {
      coffee : {
        options : { // só será executada a tasks nos evento de adicionar um
                    // arquivo ou deletar um arquivo
          event : ['added', 'changed']
        },
        files : 'public/coffee/**/*.coffee',
        tasks : 'coffee:compilar' // tarefa que será executada
      },
      less : {
        options : {
          event : ['added', 'changed']
        },
        files : 'public/less/**/*.less',
        tasks : 'less:compilar'
      },
      js : {
        options : {
          event : ['changed']
        },
        files : 'public/js/**/*.js',
        tasks : 'jshint:js'
      }
    },

    jshint : {
      js : {
        src : ['public/js/**/*.js']
      }
    },

    browserSync : {
      public : {
        bsFiles : {
          watchTask: true, // integração com a task Watch
          src : ['public/**/*']
        },
        options : { // injeção do script
          server : {
            baseDir : 'public'
          }
        }
      }
    }

  });

  grunt.registerTask('server', ['browserSync', 'watch']);

  grunt.registerTask('dist', ['clean', 'copy']);

  grunt.registerTask('minifica', ['useminPrepare', 'concat', 'uglify',
                                  'cssmin', 'rev',  'usemin', 'imagemin']);

  grunt.registerTask('default', ['dist', 'minifica']);

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browser-sync');
}
