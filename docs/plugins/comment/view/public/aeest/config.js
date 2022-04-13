    (function () {
        var URL = window.UEDITOR_HOME_URL || getUEBasePath();
        window.UEDITOR_CONFIG = {

            //为编辑器实例添加一个路径，这个不能被注释
            UEDITOR_HOME_URL: GV.WEB_ROOT + 'static/js/ueditor/'

            // 服务器统一请求接口路径
            , serverUrl: GV.ROOT + "user/Ueditor/upload"//"../../../index.php?g=Asset&m=Ueditor&a=upload"

            //工具栏上的所有的功能按钮和下拉框，可以在new编辑器的实例时选择自己需要的从新定义
            , toolbars: [['fullscreen', 'undo', 'redo', '|',
                'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                'insertimage', 'emotion', 'insertcode', '|',
                'searchreplace', 'drafts']
            ]
            
			//启用自动保存
			,enableAutoSave: false
            ,textarea:'content' // 提交表单时，服务器获取编辑器提交内容的所用的参数，多实例时可以给容器name属性，会将name给定的值最为每个实例的键值，不用每次实例化的时候都设置这个值

            //,initialContent:'欢迎使用ueditor!'    //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子

            , initialFrameWidth: '100%'  //初始化编辑器宽度,默认1000
            ,initialFrameHeight:120  //初始化编辑器高度,默认320   
            , emotionLocalizatio: true //是否开启表情本地化，默认关闭。若要开启请确保emotion文件夹下包含官网提供的images表情文件夹
            // xss 过滤是否开启,inserthtml等操作
            , xssFilterRules: true
            //input xss过滤
            , inputXssFilter: true
            //output xss过滤
            , outputXssFilter: true
            // xss过滤白名单 名单来源: https://raw.githubusercontent.com/leizongmin/js-xss/master/lib/default.js
            , whiteList: {
                //a: ['target', 'href', 'title', 'class', 'style'],
                abbr: ['title', 'class', 'style'],
                address: ['class', 'style', 'id'],
                area: ['shape', 'coords', 'href', 'alt'],
                article: [],
                aside: [],
                //audio: ['autoplay', 'controls', 'loop', 'preload', 'src', 'class', 'style'],
                b: ['class', 'style', 'id'],
                bdi: ['dir'],
                bdo: ['dir'],
                big: [],
                blockquote: ['cite', 'class', 'style', 'id'],
                br: ['class', 'style', 'id'],
                caption: ['class', 'style', 'id'],
                center: [],
                cite: [],
                code: ['class', 'style', 'id'],
                col: ['align', 'valign', 'span', 'width', 'class', 'style', 'id'],
                colgroup: ['align', 'valign', 'span', 'width', 'class', 'style', 'id'],
                dd: ['class', 'style', 'id'],
                del: ['datetime', 'class', 'style', 'id'],
                details: ['open'],
                div: ['class', 'style', 'id'],
                dl: ['class', 'style', 'id'],
                dt: ['class', 'style', 'id'],
                em: ['class', 'style', 'id'],
                footer: [],
                h1: ['class', 'style', 'id'],
                h2: ['class', 'style', 'id'],
                h3: ['class', 'style', 'id'],
                h4: ['class', 'style', 'id'],
                h5: ['class', 'style', 'id'],
                h6: ['class', 'style', 'id'],
                header: [],
                hr: ['class', 'style', 'id'],
                i: ['class', 'style', 'id'],
                //iframe: ['src', 'width', 'height', 'class', 'id', 'style', 'frameborder', 'name'],
                img: ['src', 'alt', 'title', 'width', 'height', 'id', '_src', 'loadingclass', '_url', 'data-latex'],
                ins: ['datetime', 'class', 'style', 'id'],
                li: ['class', 'style', 'id'],
                mark: [],
                nav: [],
                ol: ['class', 'style', 'id'],
                p: ['class', 'style', 'id'],
                pre: ['class', 'style', 'id'],
                s: [],
                section: [],
                small: ['class', 'style', 'id'],
                source: ['src', 'type'],
                span: ['class', 'style', 'id'],
                sub: ['class', 'style', 'id'],
                sup: ['class', 'style', 'id'],
                strong: ['class', 'style', 'id'],
                u: [],
                ul: ['class', 'style', 'id'],
                //video: ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width', 'class', 'style', 'id']
            }
        };

        function getUEBasePath(docUrl, confUrl) {
            return getBasePath(docUrl || self.document.URL || self.location.href, confUrl || getConfigFilePath());
        }
        function getConfigFilePath() {
            var configPath = document.getElementsByTagName('script');
            return configPath[configPath.length - 1].src;
        }
        function getBasePath(docUrl, confUrl) {
            var basePath = confUrl;
            if (/^(\/|\\\\)/.test(confUrl)) {
                basePath = /^.+?\w(\/|\\\\)/.exec(docUrl)[0] + confUrl.replace(/^(\/|\\\\)/, '');
            } else if (!/^[a-z]+:/i.test(confUrl)) {
                docUrl = docUrl.split("#")[0].split("?")[0].replace(/[^\\\/]+$/, '');
                basePath = docUrl + "" + confUrl;
            }
            return optimizationPath(basePath);
        }
        function optimizationPath(path) {
            var protocol = /^[a-z]+:\/\//.exec(path)[0],
                tmp      = null,
                res      = [];
            path = path.replace(protocol, "").split("?")[0].split("#")[0];
            path = path.replace(/\\/g, '/').split(/\//);
            path[path.length - 1] = "";
            while (path.length) {
                if (( tmp = path.shift() ) === "..") {
                    res.pop();
                } else if (tmp !== ".") {
                    res.push(tmp);
                }
            }
            return protocol + res.join("/");
        }
        window.UE = {
            getUEBasePath: getUEBasePath
        };

    })();