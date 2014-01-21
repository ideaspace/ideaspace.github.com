module.exports = function (grunt) {

    grunt.initConfig({
        transport: {
            options: {
                paths: ['js'] // where is the module, default value is ['sea-modules']
            },
            helloworld: {
                options: {
                    idleading: 'helloworld/'
                },
                files: [
                    {
                        expand : true,
                        cwd: 'app/helloworld',
                        src: '**/*.js',
                        dest: '.build/helloworld'
                    }
                ]
            },
            main: {
                options: {
                    idleading: 'index/'
                },
                files: [
                    {
                        dest: '.build/index'
                    }
                ]
            }
        },
        concat: {
            options: {
                include: 'self'
            },
            build: {
                files: {
                    'dist/helloworld/hello.js': ['.build/helloworld/hello.js', '.build/helloworld/world.js'],
                    'dist/main/main.js': ['.build/main/main.js']
                }
            }
        },
        uglify: {
            main: {
                files: {
                    'dist/helloworld/hello.js': ['dist/helloworld/hello.js'],
                    'dist/main/main.js': ['dist/main/main.js']
                }
            }
        },
        clean: {
            build: ['.build'] // clean .build directory
        }
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');


    grunt.registerTask('build', ['transport', 'concat', 'clean']);

};