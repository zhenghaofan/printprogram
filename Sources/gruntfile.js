module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            options: {
                force:true
            },
            css: {
                src: ["./dist/css"]
            },
            js: {
                src: ["./dist/js"]
            },
            img: {
                src: ["./dist/img"]
            }
        },
        less: {
            options: {
                plugins: [
                    new (require('less-plugin-autoprefix'))({browsers: ['last 2 versions', 'ie 8', 'ie 9']})
                ]
            },
            main: {
                expand: true,
                cwd: './less/',
                src: ['style.less'],
                dest: './dist/css',
                ext: '.css'
            },
            all: {
                expand: true,
                cwd: './less/',
                src: ['*.less','admin/*.less'],
                dest: './dist/css',
                ext: '.css'
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: './dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: './dist/css',
                    ext: '.min.css'
                }]
            }
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3 //压缩等级（png）
                },
                files: [{
                    expand: true,
                    cwd: './img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: './dist/img'
                }]
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "js/",
                    dir: "./dist/js",
                    paths: {
                        //bootstrap:"lib/bootstrap"
                    },
                    mainConfigFile: "js/main.js",
                    modules: [
                        {
                            name: 'main'
                        }

                    ]
                }
            }
        },
        watch: {
            css: {
                expand: true,
                cwd: './less/',
                files: ['**/*.less'],
                tasks: ['less:main']
            },
            // js: {
            //     expand: true,
            //     cwd: './js/',
            //     files: ['**/*.js'],
            //     tasks: ['requirejs']
            // },
            livereload: {
                options: {
                    livereload:true
                },
                files: ['dist/css/style.css','../index.html','js/**/*']
            },
            img: {
                expand: true,
                cwd: './img/',
                files: ['**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            }
        }
    });

/*
    grunt.event.on("watch",function (action,filepath,target){
        var  path = filepath.replace(/^less\\/,"");
        switch (target){
            case "css":
                grunt.config("less.main.src",path);
                break;
            //case "img":
            //    grunt.config("imagemin.dynamic.files",path);
        }
    });
*/

    // 加载任务的插件。
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-requirejs');


    grunt.loadNpmTasks('grunt-contrib-watch');


    // 默认被执行的任务列表。
    grunt.registerTask('default', ['less:main','cssmin','imagemin','requirejs']);

};