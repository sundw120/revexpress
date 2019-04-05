
/**
 * js文件依赖 jquery ，请在引入本js前引入jquery
 * @param {} config 
 * @returns {} 
 */

//menubar菜单生成需要的json注册信息
//class:菜单烂设置的类名称
//icon:工具栏大图标（可以为空）
//title:工具栏说明文字，不能为空，格式为json数组。数组对象格式为：icon:说明文字图标，可为空
//help:帮助行文字
//option:操作说明文字
//button:系统菜单按钮



/*var menubar = {
    "id": "menubar",
    "class": "menubar",
    "icon": "&#xe60a;",
    "title": [{ "icon": "&#xe62c;", "text": "招生辅助管理系统", "url": "http://www.baidu.com" }, { "icon": "&#xe67c;", "text": "用户信息管理", "url": "http://www.baidu.com" }, { "icon": "", "text": "添加用户信息", "url": "http://www.sina.com" }],
    "help": { "text": "系统帮助", "url": "" },
    "option": "目前操作功能：普通高等教育招生计划申报表",
    "button": [{ "icon": "&#xe654;", "text": "新建用户", "url": "javascript:alert('哈哈哈哈')" }, { "icon": "&#x1006;", "text": "删除全部用户", "url": "" }]
};
*/

/**
 *注册通用工具栏，依赖样式，请引入RevExpress.Toolbar.css
 * @param {} config = 
 * var menubar = {
    "id": "menubar",
    "class": "menubar",
    "icon": "&#xe60a;",
    "title": [{ "icon": "&#xe62c;", "text": "招生辅助管理系统", "url": "http://www.baidu.com" }, { "icon": "&#xe67c;", "text": "用户信息管理", "url": "http://www.baidu.com" }, { "icon": "", "text": "添加用户信息", "url": "http://www.sina.com" }],
    "help": { "text": "系统帮助", "url": "" },
    "option": "目前操作功能：普通高等教育招生计划申报表",
    "button": [{ "icon": "&#xe654;", "text": "新建用户", "url": "javascript:alert('哈哈哈哈')" }, { "icon": "&#x1006;", "text": "删除全部用户", "url": "" }]
    };
 * @returns {} 
 */
function DoRegistMenuBar(config) {

    //校验是否包含id，没有id，提示错误
    if (config.id == undefined) {
        console.log("参数必须包含id属性，Id应指向界面上存在的一个元素");
        return false;
    }

    var htm = "";

    //判断是否包含类样式,设置配置文件定义的类属性,设置默认的样式属性
    htm += "<div " + ((config.class !== undefined && config.class !== "") ? "class='" + config.class + "'" : "class='menubar'") + ">";
    htm += "<div toptools>";
    htm += "<div style='float:left'><i style='font-size:30px' class='layui-icon'>" + ((config.icon !== undefined && config.icon !== "") ? config.icon : "&#xe62c;") + "</i></div>";


    //添加左侧工具栏
    htm += "<div style='float:left; padding-top:9px;'>";

    //检查菜单工具栏路径中的title不能为空，如果为空则输出日志
    var titleFlage = true;
    $.each(config.title, function (index, item) {
        if (item.text === undefined || item.text === "") {
            titleFlage = false;
        }
    });

    if (!titleFlage) {
        console.log("error:工具栏，路径配置参数title数组中的对象必须包含text属性，且不能为空");
        return false;
    }

    //校验title参数中的数据均包含text属性，进行工具路径的输出操作

    htm += "当前路径：";

    $.each(config.title, function (index, item) {
        if (item.text !== undefined && item.text !== "") {
            htm += "<a " + ((item.url !== undefined && item.url !== "") ? "href='" + item.url + "'" : "") + ">";
            if (item.icon !== undefined && item.icon !== "") {
                htm += "<i class='layui-icon'>" + item.icon + "</i>";
            }
            htm += item.text;
            htm += "</a>";
            if (index !== (config.title.length - 1)) {
                htm += "<label line-separator>/</label>";
            }
        }
    });
    htm += "</div>";

    //添加右侧工具栏
    htm += "<div line-help style='float:right;'>";
    if (config.help !== "undefined") {
        if (config.help.icon !== undefined) {
            htm += "<i style='font-size:20px;' class='layui-icon'>" + (config.help.icon === "" ? "&#xe705;" : config.help.icon) + "</i>";
        }
        htm += "<a " + ((config.help.url !== undefined && config.help.url !== "") ? "href='" + config.help.url + "'" : "href='#'") + ">";
        htm += (config.help.text === "" ? "帮助" : config.help.text);
        htm += "</a>";
    }
    htm += "</div>";
    htm += "</div>";

    //设置工具栏的底部说明和按钮组
    htm += "<div bottomtools>";
    if (config.option !== undefined && config.option !== "") {
        htm += "<div option>";
        htm += config.option;
        htm += "</div>";
    }

    if (config.button !== undefined && config.button.length > 0) {
        //添加按钮组
        htm += "<div buttons>";
        htm += "<ul>";
        $.each(config.button, function (index, item) {

            if (item.text !== "undefined" && item.text !== "") {
                htm += "<li>";
                if (item.icon !== undefined && item.icon !== "") {
                    htm += "<i class='layui-icon'>" + item.icon + "</i>";
                }
                htm += "<a href=\"" + ((item.url !== undefined && item.url !== "") ? item.url : "#") + "\">";
                htm += item.text;
                htm += "</a>";
                htm += "</li>";
            }
        });
        htm += "</ul>";
        htm += "</div>";
    }

    htm += "</div>";
    htm += "</div>";
    window.$("#" + config.id).append(htm);

    console.log("生成页面工具栏，成功");
    return true;
}


