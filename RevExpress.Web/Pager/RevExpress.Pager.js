/*
 传入数据规范
 var pager = {
    id: "pager",
    //每页的数量
    pageSize: 10,

    //分页当前的索引
    pageIndex: 1,

    //总的记录数
    totleCount: 200,

    //分页的回调函数
    doSkip: function (pageindex) {
        pager.pageIndex = parseInt(pageindex);
        doRegisterPager(pager);
    }

};*/


/**
      *
      * 创建分页数据
      * @param {} config
      * @returns {}
      */
function doRegisterPager(config) {

    if (config.id === undefined || config.id === "") {
        console.log("页面容器id不能为空");
        return false;
    }

    if (!($("#" + config.id).length > 0)) {
        console.log("页面必须包含有效的页面承载容器，当前id没有找到这个容器");
        return false;
    }

    var htm = "<div class='pager'>";

    var pageCount = 0;
    var next = 0;
    var pre = 0;
    var startCount = 0;
    var endCount = 0;

    //校验传入的参数当前页，是否小于1，如果小于1，默认为1
    if (config.pageIndex < 1) {
        config.pageIndex = 1;
    }

    //计算当前数据的总页数
    if (config.pageSize !== 0) {
        pageCount = (config.totleCount / config.pageSize);
        pageCount = ((config.totleCount % config.pageSize) !== 0) ? pageCount + 1 : pageCount;
        pageCount = pageCount === 0 ? 1 : pageCount;
    }

    next = config.pageIndex + 1;
    pre = config.pageIndex - 1;

    //中间页起始序号
    startCount = (config.pageIndex + 5) > pageCount ? (pageCount - 9) : (config.pageIndex - 4);

    //中间页终止序号
    endCount = config.pageIndex < 5 ? 10 : config.pageIndex + 5;

    //为了避免输出的时候产生负数，设置如果小于1就从序号1开始
    if (startCount < 1) { startCount = 1; }

    //页码+5的可能性就会产生最终输出序号大于总页码，那么就要将其控制在页码数之内
    if (pageCount < endCount) { endCount = pageCount; }

    htm += "第<label pageIndex>" + config.pageIndex + "</label>/";
    htm += "" + pageCount + "";
    htm += " 页 [共 <label pageCount>" + config.totleCount + " </label>条]";

    htm += "<label data-start>首页</label> <label data-pre>上一页</label>";

    for (var i = startCount; i <= endCount; i++) {
        htm += (config.pageIndex === i) ? ("<label current>" + i + "</label>") : ("<label data-toogle='" + i + "'>" + i + "</label>");
    }

    htm += "<label data-next>下一页</label><label data-end>尾页</label> ";

    htm += "</div>";

    $("#" + config.id).html(htm);

    //启用首页点击事件,启用上一页点击事件
    if (config.pageIndex > 1) {

        $("label[data-start]").click(function () {
            config.doSkip(1);
        });

        $("label[data-pre]").click(function () {
            config.doSkip(pre);
        });
    }

    //启用数据点击事件
    $("label[data-toogle]").click(function () {
        config.doSkip($(this).attr("data-toogle"));
    });

    if (config.pageIndex !== pageCount) {
        $("label[data-next]").click(function () {
            config.doSkip(next);
        });

        $("label[data-end]").click(function () {
            config.doSkip(pageCount);
        });
    }

    return true;

}
