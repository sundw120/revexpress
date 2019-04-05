(function (window, document, $) {

    /**
     * table plugin 数据格式
     * 标准的json格式（这里要注意配置columns列，要和数据表返回的字段一一对应）
   
    var dlist2 = [
        { title: "中华人民共合同成立500周年", name: "ga1", tel: "1989882323", content: "征收契税;面积为90平方米以上的，减按1.5%的税率征收契税" },
        { title: "热烈欢迎习大大餐馆南昌大学科学技术学院", name: "ga2", tel: "1989882323", content: "征收契税;面积为90平方米以上的，减按1.5%的税率征收契税" },
        { title: "热烈庆祝中国航母下水远航", name: "ga3", tel: "1989882323", content: "征收契税;面积为90平方米以上的，减按1.5%的税率征收契税" }
    ];
      */

    /**
     * 标准配置文件格式
     * 此可作为模版使用，只需更改部分设置信息
     * showNumber -- 是否显示行号
     * showPager -- 是否启用分页
     * pager -- 分页设置项
     * showClickBackground -- 开启背景点击换色
     * showExpandRow -- 开启展开行
     * onExpandRow(id,row) -- 展开行事件接口程序,id 主键 row 行对象
     * showModelWindow -- 启用模态窗事件
     * onShowModelWindow -- 模态窗启用接口事件
     * enableOrder -- 是否启用排序事件
     * onOrder -- 排序事件接口
     * events -- 自定义事件
     *  -- enableEvents 是否启用自定义事件
     *  -- buttons 定义按钮
     *      -- name 按钮名称
     *      -- clickEvents(id) 按钮事件接口
     * enableCheckbox -- 是否启用多选
     * headpanel -- 是否启用头部面板组
     * footpanel -- 是否启用尾部面板
     * columns -- 数据字段列（不能少）{caption,name,width,clk:function(id),css}
     * data -- 绑定的数据 （不能少）
     */
    window.myTable = {

        /**
         * 承载表格容器ID
         */
        id: "table",

        /**
         * 表格数据主键名称
         */
        primarykey: "name",

        /**
         * 是否显示行号
         */
        showNumber: true,

        /**
         * 是否显示分页
         */
        showPager: true,

        /**
         * 分页参数，每页显示个数，当前是第几页，所有的记录数是多少
         */
        pager: {
            pagesize: 10, currindex: 1, totlecount: 1000, doSkip: function (pageindex) {
                pager.pageIndex = parseInt(pageindex);
            }
        },

        /**
         * 是否显示点击行背景颜色
         */
        showClickBackground: true,

        /**
         * 是否启用展开行操作
         */
        showExpandRow: true,

        /**
         * 展开行的回调函数（//id 是行的主键，row是新增行的对象）
         * @param {} id 数据主键
         * @param {} row 当前行对象
         * @returns {} 
         */
        onExpandRow: function (id, row) {
            row.html(id);
        },

        /**
         * 是否显示弹出窗口
         */
        showModelWindow: true,

        /**
         * 模态窗口时间
         * @param {} id 默认传入数据主键
         * @returns {} 
         */
        onShowModelWindow: function (id) {
            alert(id);
        },

        /**
         * 是否启用排序
         */
        enableOrder: true,

        /**
         * 排序回调程序
         * @param {} field 
         * @param {} orderType 
         * @returns {} 
         */
        onOrder: function (field, orderType) {
            console.log(field + "--" + orderType);
        },

        /**
         * 自定义事件
         */
        events: {

            /**
             * 是否启用事件
             */
            enableEvents: true,

            /**
             * 自定义事件
             */
            buttons: [
                {
                    name: "删除",
                    icon: "&#xe656;",
                    clickEvents: function (id) {
                        //自定义事件
                        console.log(id);
                    }
                }, {
                    name: "查阅",
                    icon: "&#xe705;",
                    clickEvents: function (id) {
                        //自定义事件
                        console.log("查阅" + id);
                    }
                }
            ]
        },

        /**
         * 是否启用复选框
         */
        enableCheckbox: true,

        /**
         * 复选框事件，选中id的列表
         * @param {} ids 
         * @returns {} 
         */
        onCheckBox: function (ids) {
            console.log(ids);
        },

        /**
         * 表格头部组，有定义就显示，没定义就不显示
         */
        headpanel: "关于我的这个帮助",

        /**
         *  表格尾部组件，有定义就是显示
         */
        footpanel: "感谢使用RevExpress table plugin",

        /**
         * 表格头标题列构成
         */
        columns: [
        {
            caption: "分组",
            children: [
                {
                    caption: "标题",
                    name: "caption",
                    width: "600px",
                    clk: function (id) {
                        window.location.href = "http://wwww.baidu.com?key=" + id;
                    },
                    css: "tCss"

                }, { caption: "姓名", name: "name" }
            ]
        }, { caption: "电话", name: "tel" }, { caption: "备注", name: "content" }],




        /**
         * 表格数据 必须包含这个属性
         */
        data: ""
    };


    /**
    * 注册表格事件
    * @param {} config 配置文件
    * @returns {}
    */
    window.doRegisterTable = function (config) {

        //首先校验配置文件中，必须存在的配置项定义
        // 1-id必须定义，他规定了需要向哪个容器去填充
        // 2-columns 必须定位，他规定了如何向数据集匹配数据以及表格列的渲染样式

        if (config.id === undefined || config.id === "") {
            console.log("配置文件必须包含id属性,并且id属性不能为空");
            return false;
        }

        if (!($("#" + config.id).length > 0)) {
            console.log("给定的页面id对象不存在，请检查并修改");
            return false;
        }

        if (config.primarykey === undefined || config.primarykey === "") {
            console.log("配置文件中必须包含主键配置项");
            return false;
        }

        if (config.columns === undefined || config.columns.length <= 0) {
            console.log("配置项目必须包含数组列");
            return false;
        }

        if (config.data === undefined || config.data.length <= 0) {
            console.log("配置文件中必须包含数据数组");
            return false;
        }

        var htm = "";
        htm += "<div class='devexpress_table'>";

        //判断是否显示表格头部信息
        if (table.headpanel !== undefined && table.headpanel !== "") {
            htm += "<div headpanel><div title>" + table.headpanel + "</div></div>";
        }

        //开始生成表格
        htm += "<table>";
        htm += "<tr>";

        //这里配置多选
        if (config.enableCheckbox !== undefined && config.enableCheckbox) {
            htm += "<th><input lay-filter='allcheck' lay-skin='primary' type='checkbox'></th>";
        }

        //这里配置是否显示展开行
        if (config.showExpandRow !== undefined && config.showExpandRow) {
            htm += "<th></th>";
        }

        //这里配置是否显示模态窗口快捷图标
        if (config.showModelWindow !== undefined && config.showModelWindow) {
            htm += "<th></th>";
        }

        //这里配置了表格序号，下面也必须配置哦
        if (config.showNumber !== "undefined" && config.showNumber) {
            htm += "<th>序号</th>";
        }


        //设置自定义事件尾列
        if (config.events !== undefined && config.events.enableEvents) {
            $.each(config.columns,
                function (index, item) {
                    htm += "<th data-field='" + item.name + "' " + ((config.enableOrder !== undefined && config.enableOrder) ? "data-order" : "") + ">" + item.caption + "<div data-order style='float:right;display:none;'><i style='font-size:10px;' class='layui-icon'>&#xe619;</i></div></th>";
                });
            htm += "<th last>编辑</th>";
        } else {
            $.each(config.columns,
                function (index, item) {
                    if (index !== (config.columns.length - 1)) {
                        htm += "<th data-field='" + item.name + "' " + ((config.enableOrder !== undefined && config.enableOrder) ? "data-order" : "") + ">" + item.caption + "<div data-order style='float:right;display:none;'><i style='font-size:10px;' class='layui-icon'>&#xe619;</i></div></th>";
                    } else {
                        htm += "<th data-field='" + item.name + "'  " + ((config.enableOrder !== undefined && config.enableOrder) ? "data-order" : "") + " last>" + item.caption + "<div data-order style='float:right; display:none;'><i style='font-size:10px;' class='layui-icon'>&#xe619;</i></div></th>";
                    }
                });
        }

        htm += "</tr>";
        $.each(config.data, function (index, item) {

            htm += "<tr data-line>";

            //配置单选
            if (config.enableCheckbox !== undefined && config.enableCheckbox) {
                htm += "<td><input data-id='" + item[config.primarykey] + "' lay-filter='single' lay-skin='primary' type='checkbox'></td>";
            }

            //这里是配置展开行
            if (config.showExpandRow) {
                htm += "<td expand-cell data-id='" + item[config.primarykey] + "'>";
                htm += "<i class='layui-icon'>&#xe623;</i>";
                htm += "</td>";
            }

            //这里配置是否启用模块窗口快捷图标
            if (typeof (config.showModelWindow) !== "undefined" && config.showModelWindow) {
                htm += "<td model-window data-id='" + item[config.primarykey] + "'><i class='layui-icon'>&#xe688;</i></td>";
            }

            //这里是配置序号
            if (config.showNumber) {
                htm += "<td style='width:30px'>" + ((parseInt(config.pager.pagesize) * parseInt(config.pager.currindex - 1)) + parseInt((index + 1))) + "</td>";
            }

            //启用自定义事件
            if (config.events !== undefined && config.events.enableEvents) {
                $.each(config.columns, function (ind, field) {
                    htm += "<td " + (field.css !== undefined ? "class='" + field.css + "'" : "") + " " + (field.width !== undefined ? ("style='width:" + field.width + "'") : "") + ">";

                    if (field.clk !== undefined) {
                        htm += "<a name='" + field.name + "' data-id='" + item[config.primarykey] + "' dataclk>";
                        htm += item[field.name];
                        htm += "</a>";
                    } else {
                        htm += item[field.name];
                    }

                    htm += "</td>";
                });

                htm += "<td last>";

                $.each(config.events.buttons,
                    function (inx, it) {
                        htm += "<a href='' name='" + it.name + "' data-id='" + item[config.primarykey] + "' style='margin-right:3px;'>" + ((it.icon !== undefined && it.icon !== "")
                            ? "<i style='font-size:12px;' class='layui-icon'>" + it.icon + "</i> "
                            : "") + it.name + "</a>  ";

                        if (inx !== config.events.buttons.length - 1) {
                            htm += " <i class='layui-icon' style='color:#333333; font-size:10px;'>&#xe671;</i> ";
                        }
                    });
                htm += "</td>";
            } else {
                //生成列数据
                $.each(config.columns, function (ind, field) {
                    if (ind !== (config.columns.length - 1)) {
                        htm += "<td " + (field.width !== undefined ? ("style='width:" + field.width + "'") : "") + ">" + item[field.name] + "</td>";
                    } else {
                        htm += "<td last>" + item[field.name] + "</td>";
                    }
                });
            }

            htm += "</tr>";
        });

        htm += "</table>";

        //生成表格尾部状态栏
        if (config.footpanel !== undefined) {
            htm += "<div footpanel>";
            if (config.footpanel !== "") {
                htm += "<div title>" + config.footpanel + "</div>";
            }
            htm += "</div>";
        }

        //配置显示分页

        var pageCount = 0;
        var next = 0;
        var pre = 0;
        var startCount = 0;
        var endCount = 0;

        if (config.showPager !== undefined && config.showPager) {
            htm += "<div pager>";

            //校验传入的参数当前页，是否小于1，如果小于1，默认为1
            if (config.pager.currindex < 1) {
                config.pager.currindex = 1;
            }

            //计算当前数据的总页数
            if (config.pager.pagesize !== 0) {
                pageCount = parseInt(config.pager.totlecount / config.pager.pagesize);
                pageCount = ((config.pager.totlecount % config.pager.pagesize) !== 0) ? (pageCount + 1) : pageCount;
                pageCount = pageCount === 0 ? 1 : pageCount;
            }

            next = config.pager.currindex + 1;
            pre = config.currindex - 1;

            //中间页起始序号
            startCount = (config.pager.currindex + 5) > pageCount ? (pageCount - 9) : (config.pager.currindex - 4);

            //中间页终止序号
            endCount = config.pager.currindex < 5 ? 10 : config.pager.currindex + 5;

            //为了避免输出的时候产生负数，设置如果小于1就从序号1开始
            if (startCount < 1) { startCount = 1; }

            //页码+5的可能性就会产生最终输出序号大于总页码，那么就要将其控制在页码数之内
            if (pageCount < endCount) { endCount = pageCount; }

            htm += "第<label pageIndex>" + config.pager.currindex + "</label>/";
            htm += "" + pageCount + "";
            htm += " 页 [共 <label pageCount>" + config.pager.totlecount + " </label>条]";

            htm += "<label data-start>首页</label> <label data-pre>上一页</label>";

            for (var i = startCount; i <= endCount; i++) {
                htm += (config.pager.currindex === i) ? ("<label current>" + i + "</label>") : ("<label data-toogle='" + i + "'>" + i + "</label>");
            }

            htm += "<label data-next>下一页</label><label data-end>尾页</label> ";

            htm += "</div>";
        }
        htm += "</div>";

        $("#" + config.id).html(htm);

        if (config.showPager !== undefined && config.showPager) {
            //启用首页点击事件,启用上一页点击事件
            if (config.pager.currindex > 1) {

                $("label[data-start]").click(function () {
                    config.pager.doSkip(1);
                });

                $("label[data-pre]").click(function () {
                    config.pager.doSkip(pre);
                });
            }

            //启用数据点击事件
            $("label[data-toogle]").click(function () {
                config.pager.doSkip($(this).attr("data-toogle"));
            });

            if (config.pageIndex !== pageCount) {
                $("label[data-next]").click(function () {
                    config.pager.doSkip(next);
                });

                $("label[data-end]").click(function () {
                    config.pager.doSkip(pageCount);
                });
            }
        }

        //启用点击行变色事件
        if (config.showClickBackground) {
            $("table tr[data-line]").click(function () {
                $(this).css("background", "#f9f9f8").siblings().css("background", "#ffffff");
            });
        }

        //启用展开行图标变化事件
        if (config.showExpandRow) {
            //获取当前行的列数
            var coulmnCount = $("#" + config.id).find("tr:last").find("td").length;
            var row = "<tr new-row><td colspan='" + coulmnCount + "'></td></tr>";

            $("table td[expand-cell]").click(function () {
                var obj = $(this);
                if (obj.attr("expand") === "true") {
                    $("#" + config.id).find("tr[new-row]").remove();
                    obj.html("<i class='layui-icon'>&#xe623;</i>");
                    obj.attr("expand", "false");
                } else {
                    obj.html("<i class='layui-icon'>&#xe625;</i>");
                    obj.attr("expand", "true");
                    //遍历查找是否有新行，有就删除
                    $("#" + config.id).find("tr[new-row]").remove();
                    //指定行后添加新行
                    obj.parent("tr").after(row);
                    $("table td[expand-cell]").each(function () {
                        if (!obj.is($(this))) {
                            $(this).attr("expand", "false");
                            $(this).html("<i class='layui-icon'>&#xe623;</i>");
                        }
                    });
                    config.onExpandRow(obj.attr("data-id"), $("tr[new-row] td"));
                }
            });
        }

        //启用模态窗口事件
        if (typeof (config.showModelWindow) !== "undefined" && config.showModelWindow) {
            $("table td[model-window]").click(function () {
                var obj = $(this);
                config.onShowModelWindow(obj.attr("data-id"));
            });
        }

        //启用排序事件
        if (config.enableOrder !== undefined && config.enableOrder) {
            $("th[data-order]").click(function () {
                var field = $(this).attr("data-field");
                var cssdisplay = $(this).find("div[data-order]");
                if (cssdisplay.css("display") === "none") {
                    cssdisplay.css("display", "");
                    cssdisplay.attr("data-order", "up");
                } else {
                    if (cssdisplay.attr("data-order") === "up") {
                        cssdisplay.attr("data-order", "down");
                        cssdisplay.find("i").html("&#xe61a;");
                    } else {
                        cssdisplay.attr("data-order", "up");
                        cssdisplay.find("i").html("&#xe619;");
                    }
                }
                config.onOrder(field, cssdisplay.attr("data-order"));
            });
        }

        //启用全选事件
        if (config.enableCheckbox !== undefined && config.enableCheckbox) {
            form.on('checkbox(allcheck)', function (data) {
                var singleCheckbox = $("input[lay-filter='single']");
                singleCheckbox.each(function () {
                    $(this).prop("checked", data.elem.checked);
                    form.render(); //这个很重要
                });

                var ids = "";
                if (data.elem.checked) {
                    singleCheckbox.each(function () {
                        ids += $(this).attr("data-id") + ",";
                    });
                    ids = ids.substring(0, ids.length - 1);
                }
                console.log("has been checked id：" + ids);
                config.onCheckBox(ids);
            });

            form.on("checkbox(single)", function (data) {
                var flage = true;
                var ids = "";
                $("input[lay-filter='single']").each(function () {
                    if (!this.checked) {
                        flage = false;
                        $("input[lay-filter='allcheck']").each(function () {
                            this.checked = false;
                        });
                    } else {
                        ids += $(this).attr("data-id") + ",";
                    }
                });

                if (flage) {
                    $("input[lay-filter='allcheck']").each(function () {
                        this.checked = true;
                    });
                }
                form.render();

                ids = (ids !== "" ? ids.substring(0, ids.length - 1) : "");
                console.log("has been checked id：" + ids);
                config.onCheckBox(ids);
            });
        }

        //启用按钮的事件
        if (config.events !== undefined && config.events.enableEvents) {
            $("table tr td[last] a").click(function () {
                var id = $(this).attr("data-id");
                var name = $(this).attr("name");
                $.each(config.events.buttons, function (bIndex, bItem) {
                    if (bItem.name === name) {
                        bItem.clickEvents(id);
                    }
                });
            });
        }

        //启用行连接事件
        $.each(config.columns, function (index, item) {
            if (item.clk !== undefined) {
                var name = $(this).attr("name");
                $("table tr td a[name='" + name + "']").click(function () {
                    item.clk($(this).attr("data-id"));
                });
            }
        });

        form.render();
        return true;
    }
})(window, document, $)