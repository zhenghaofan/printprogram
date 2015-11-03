//var baseURL = document.getElementById("mainJS").getAttribute("data-baseurl") || "./Sources/dist/js";
requirejs.config({
    //baseUrl: baseURL,
    //baseUrl: '/Sources/dist/js',
    baseUrl: './Sources/js',
    paths: {
        jquery:'lib/jquery',
        jqueryUI: 'lib/jquery-ui.min',
        knockout: 'lib/knockout-3.3.0',
        mapping: 'lib/knockout.mapping',
        sammy: 'lib/sammy.min',
        kinetic: 'lib/kinetic.min',
        object: 'app/object',
        DBObj: 'app/DBObj',
        vue:'lib/vue'
    }
});
require(['knockout','app/App','object/Text','jquery'],function (ko,app,text,$){
   ko.applyBindings(app);
app.getStage().addDoc().curDoc().addCode();
    function a (){
        app.getStage().loadData({
            docs: [
                {
                    id: 1,
                    name: "文档1",
                    width: 1800,
                    height: 800
                },
                {
                    id: 2,
                    name: "文档2",
                    width: 800,
                    height: 800
                },
                {
                    id: 3,
                    name: "文档3",
                    width: 1000,
                    height: 2000
                }
            ]
        });
    }
    function b (){
        app.getStage().loadData({
            docs: [
                {
                    id: 1,
                    name: "文档1 新",
                    width: 1000,
                    height: 800,
                    objects: [
                        {
                            id: 1,
                            type: "line",
                            offsetX: 250,
                            offsetY: 98,
                            lineWidth: 1,
                            lineType: "v",
                            lineLenght: 450
                        },
                        {
                            id: 5,
                            type: "rect",
                            offsetX: 300,
                            offsetY: 300,
                            width: 650,
                            height: 280,
                            lineWidth: 2        
                        },
                        {
                            id: 21,
                            type: "rect"                  
                        },
                        {
                            id: 31,
                            type: "line"                 
                        }
                    ]
                },
                {
                    id: 2,
                    name: "文档2 新",
                    width: 1000,
                    height: 800,
                    objects: [
                        {
                            id: 1,
                            type: "line"                 
                        },
                        {
                            id: 5,
                            type: "rect"                
                        },
                        {
                            id: 21,
                            type: "line"                  
                        },
                        {
                            id: 31,
                            type: "line"                 
                        }
                    ]
                },
                {
                    id: 3,
                    name: "文档3 新",
                    width: 1000,
                    height: 800,
                    objects: [
                        {
                            id: 1,
                            type: "rect"                 
                        },
                        {
                            id: 5,
                            type: "rect"                
                        },
                        {
                            id: 21,
                            type: "line",
                            offsetX:600,
                            offsetY: 59
                        }
                    ]
                }
            ]
        });
    }
    function c() {
        app.getStage().curDoc().loadData({
                id: 1,
                name: "文档1111111111",
                width: 1000,
                height: 800,
                objects: [
                    {
                        id: 1,
                        type: "line",
                        offsetX: 250,
                        offsetY: 298,
                        lineWidth: 1,
                        lineType: "v",
                        lineLenght: 450
                    },
                    {
                        id: 5,
                        type: "rect",
                        offsetX: 300,
                        offsetY: 300,
                        width: 650,
                        height: 280,
                        lineWidth: 2        
                    },
                    {
                        id: 21,
                        type: "rect"                  
                    },
                    {
                        id: 31,
                        type: "line"                 
                    }
                ]
        });
        app.getStage().updateCanvas();
    }
    //a();
    //setTimeout(c,1000);
});