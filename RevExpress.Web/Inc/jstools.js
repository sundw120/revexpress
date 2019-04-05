(function (window, document, $) {
    var systemConfig = {
        pageLogin: "/pages/login.html",
        pageIndex: "/pages/default.html"

    };

    /**
     * 系统常见反馈信息定义
     */
    var errorEnum = {
        //系统执行正确
        success: "10000",
        //登录超时
        login_timeout: "10001",
        //系统未知异常
        unknow_exception: "10002",
        //系统业务错误
        business_exception: "50001",
        //系统用户登录校验异常,认证失败
        login_exception: "50002",
        //没有授权
        non_authorized: "50003",
        //没有数据访问权限
        no_dataaccess: "50004"
    };

    /**
     * 系统常见反馈信息定义
     */

    var errorMessage = {
        passwordComplexity: "录入的密码不符合系统要求的复杂度要求，请重新输入",
        emailAddress: "录入的数据不符合标准电子邮件地址格式，请重新输入",
        chineseCharacter: "数据包含非中文字符，请重新输入",
        chars: "数据中包含非字符数据，请重新输入",
        mulityPhones: "数据中包含非电话号码信息，请重新输入",
        mobilePhone: "系统要求必须输入电话数据，请重新输入",
        digit: "系统要求必须输入纯数字，请重新输入",
        loginname: "输入数据不符合注册账户复杂度要求，请重新输入",
        telephone: "电话、传真号码：可以+开头，除数字外，可含有-,不符合格式要求，请重新输入",
        postalcode: "系统要求必须输入邮政编码数据，请重新输入",
        ipaddress: "系统要求必须输入ip数据，请重新输入",
        month: "系统要求必须输入月份数据，请重新输入",
        doubles: "系统要求必须输入数字[可含小数点]，请重新输入",
        moeny: "系统要求必须输入金额数据，请重新输入",
        date: "系统要求必须输入日期数据（中间为横线），请重新输入",
        idcard: "系统要求必须输入身份证数据，请重新输入",
        percent: "系统要求必须输入百分数，范围从0%~100%,允许包含两位小数，请重新输入",
        url: "系统要求必须输入网址类型，请重新输入",
        qq: "输入不符合QQ号码格式，请重新输入",
        lower: "输入中包含不是小写字母的数据，请重新输入",
        upper: "输入中包含不是大写字母的数据，请重新输入",
        nullerror: "对不起，请录入需要提交的数据，此处不能为空",
        nullselecterror: "对不起，选择项必须选择，不能为空",
        typeerror: "对不起，当前录入的数据不符合系统的录入数据类型要求"
    };

    /**
     * 常用正则表达式枚举类
     */
    var regexEnum = {
        //密码复杂度
        passwordComplexity: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/,
        //邮件地址校验
        emailAddress: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
        //是否为中文字符校验
        chineseCharacter: /^[\u4e00-\u9fa5]{0,}$/,
        //是否为字符
        chars: /^[a-zA-Z]*$/,
        //是否包含多个手机号码，并且以‘，’英文逗号分隔
        mulityPhones: /^1[3578][0-9]{9}(,1[3578][0-9]{9})*$/,
        //移动电话规则校验
        mobilePhone: /^1[3578][0-9]{9}$/,
        //纯数字字符串校验
        digit: /^(0|[1-9]\d*)$/,
        //注册账户复杂度要求
        loginname: /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/,
        //校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”
        telephone: /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/,
        //校验邮政编码
        postalcode: /^[a-zA-Z0-9 ]{3,12}$/,
        //是否正确的ip地址
        ipaddress: /^[0-9.]{1,20}$/,
        //校验月份
        month: /0[1-9]|1[0-2]/,
        //校验是否为双精度类型
        doubles: /^\d+(\.\d+)?$/,
        //校验是否是金额类型
        moeny: /^\d*(?:\.\d{0,2})?$/,
        //标准日期类型，中间为横线
        date: /^(\d{4})-(\d{2})-(\d{2})$/,
        //身份证类型
        idcard: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
        //校验是否百分数%0-100%
        percent: /^(100|[1-9]?\d(\.\d\d?\d?)?)%$|0$/,
        //校验是否为url
        url: /^((http:[/][/])?\w+([.]\w+|[/]\w*)*)?$/,
        //qq号码
        qq: /^[1-9][0-9]{4,9}$/,
        //小写字母
        lower: /^[a-z]+$/,
        // 大写字母
        upper: /^[A-Z]+$/
    };

    /**
     * 友好提示信息
     */
    var friendMessageEnum = {
        forenoon: "上午好",
        afternoon: "下午好",
        night: "晚上好"
    };

    /**
     * 周末显示
     */
    var cnWeekEnum = {
        monday: "星期一",
        tuesday: "星期二",
        wednesday: "星期三",
        thursday: "星期四",
        friday: "星期五",
        saturday: "星期六",
        weekday: "星期日"
    };

    /**
     * 字符串工具
     */
    window.stringUtils = {
        /**
         * trimStr-去除字符串中的空格字符
         * @param {} str 需要去除空格的字符串
         * @returns {}
         * 例子：var 变量=trimStr(需要去空格的字符串)
         */
        trimStr: function (str, isGlobal) {
            var result;
            result = str.replace(/(^\s+)|(\s+$)/g, "");
            if (isGlobal.toLowerCase() === "g") {
                result = result.replace(/\s/g, "");
            }
            return result;
        },
        /**
         * 替换字符串
         * @param {} str 
         * @param {} oldStr 
         * @param {} newStr 
         * @returns {} 
         */
        replace: function (str, oldStr, newStr) {
            var reg = new RegExp(oldStr, "g");
            return str.replace(reg, newStr);
        },
        /**
         * 从左边开始截取字符串
         * @param {} str 
         * @param {} n 
         * @returns {} 
         */
        left: function (str, n) {
            if (str.length > 0) {
                if (n > str.length) {
                    n = str.length;
                }
                return str.substr(0, n);
            } else {
                return "";
            }
        },
        /**
         * 从右边截取字符串
         * @param {} str 
         * @param {} n 
         * @returns {} 
         */
        right: function (str, n) {
            if (str.length > 0) {
                if (n >= str.length) return str;
                return str.substr(str.length - n, n);
            } else {
                return "";
            }
        },
        /**
         * 截取字符串，按指定的长度截取
         * @param str
         * @param len
         * @returns 截取后的字符串
         */
        cutString: function (str, len) {
            if (str == null || trimStr(str, "g") === "") {
                return "";
            }
            if (parseInt(len, 10) !== len) {
                console.log("输入的截取长度有问题，请检查");
                return false;
            }
            var length = str.length;
            if (length < len) {
                return str;
            }
            return str.substring(0, len);
        },
        /**
         * 校验传入参数是否为空
         * @param {} v 
         * @returns {}
         * isEmpty()              //true
         * isEmpty([])            //true
         * isEmpty({})            //true
         * isEmpty(0)             //true
         * isEmpty(Number("abc")) //true
         * isEmpty("")            //true
         * isEmpty("   ")         //true
         * isEmpty(false)         //true
         * isEmpty(null)          //true
         * isEmpty(undefined)     //true
         */
        isEmpty: function (v) {
            switch (typeof v) {
                case "undefined":
                    return true;
                case "string":
                    if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length === 0) return true;
                    break;
                case "boolean":
                    if (!v) return true;
                    break;
                case "number":
                    if (0 === v || isNaN(v)) return true;
                    break;
                case "object":
                    if (null === v || v.length === 0) return true;
                    for (var i in v) {
                        if (v.hasOwnProperty(i)) {
                            return false;
                        }
                    }
                    return true;
            }
            return false;
        },
        /**
         * toPercent 小数转百分数
         * @param {} point 传入的小数数值，需自行校验是否符合浮点值格式
         * @param {} num  保留小数的位数
         * @returns {} 返回转换后的字符数百分数
         */
        toPercent: function (point, num) {
            var str = Number(point * 100).toFixed(num);
            str += "%";
            return str;
        },
        /**
         * 字符串复杂度校验，可用于密码校验
         * @param {} str 
         * @returns {} 返回密码复杂度级别。
         * 长度小于6，默认最低级别0，包含数字级别+1，包含小写字母级别+1，包含大写字母级别+1，包含.-_@#$,级别+1，级别最高为4
         */
        complexity: function (str) {
            var lv = 0;
            if (str.length < 6) {
                return lv;
            }
            if (/[0-9]/.test(str)) {
                lv++;
            }
            if (/[a-z]/.test(str)) {
                lv++;
            }
            if (/[A-Z]/.test(str)) {
                lv++;
            }
            if (/[\.|\-|_|@|#|$]/.test(str)) {
                lv++;
            }
            return lv;
        },
        /**
         * 1:首字母大写  2：首页母小写  3：大小写转换  4：全部大写  5：全部小写
         * @param {} str 
         * @param {} type 默认：4
         * @returns {} 
         */
        changeCase: function (str, type) {
            type = type || 4;
            switch (type) {
                case 1:
                    return str.replace(/\b\w+\b/g, function (word) {
                        return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
                    });
                case 2:
                    return str.replace(/\b\w+\b/g, function (word) {
                        return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
                    });
                case 3:
                    return str.split("").map(function (word) {
                        if (/[a-z]/.test(word)) {
                            return word.toUpperCase();
                        } else {
                            return word.toLowerCase();
                        }
                    }).join("");
                case 4:
                    return str.toUpperCase();
                case 5:
                    return str.toLowerCase();
                default:
                    return str;
            }
        }
    };

    /**
     * 日期类型工具
     */
    window.dateUtils = {
        /**
         * 转换时间戳工具，将时间戳转换为标准8位时间。ex：2000年01月01日
         * @param {} sjc 
         * @returns {} 
         */
        convertToStandardTime: function (sjc) {
            var date = new Date(parseInt(sjc));
            var y = date.getFullYear() + "-";
            var m = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
            var d = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
            return y + m + d;
        },
        /**
         * 格式化日期和时间，对于不足两位的补充0
         * 
         * @param date
         * @returns {String}
         */
        formatDate: function (date) {
            if (date < 10) {
                return "0" + date;
            } else {
                return "" + date;
            }
        },
        /**
         * 获取当前日期,参数为空，返回2010-01-01,不为空返回：2010年01月01日
         * @returns {} 
         */
        currentDate: function (format) {
            var dt = new Date();
            if (stringUtils.isEmpty(format)) {
                return dt.getFullYear() + "-" + dateUtils.formatDate((dt.getMonth() + 1)) + "-" + dateUtils.formatDate(dt.getDate());
            }
            return dt.getFullYear() + "年" + dateUtils.formatDate((dt.getMonth() + 1)) + "月" + dateUtils.formatDate(dt.getDate()) + "日 ";
        },
        /**
         * 获取当前时间
         * @returns {} 
         */
        currentTime: function () {
            var dt = new Date();
            return dateUtils.formatDate(dt.getHours()) + ":" + dateUtils.formatDate(dt.getMinutes()) + ":" + dateUtils.formatDate(dt.getSeconds());
        },
        /**
         * 获取当前的日期和时间
         * @param {} format 
         * @returns {} 
         */
        currentDataAndTime: function (format) {
            return currentDate(format) + currentTime();
        },
        /**
         * 显示上午、下午、晚上等友好提示
         * @returns {} 
         */
        friendMessage: function () {
            var h = new Date().getHours();
            if (h > 5 && h < 12) {
                return friendMessageEnum.forenoon;
            }
            if (h >= 12 && h <= 18) {
                return friendMessageEnum.afternoon;
            }
            if (h > 18 || h <= 5) {
                return friendMessageEnum.night;
            }
            return "";
        },
        /**
         * 日期转换
         * @param {} day 
         * @returns {} 
         */
        cnWeek: function (day) {
            switch (day) {
                case 0:
                    return cnWeekEnum.weekday;
                case 1:
                    return cnWeekEnum.monday;
                case 2:
                    return cnWeekEnum.tuesday;
                case 3:
                    return cnWeekEnum.wednesday;
                case 4:
                    return cnWeekEnum.thursday;
                case 5:
                    return cnWeekEnum.friday;
                case 6:
                    return cnWeekEnum.saturday;
            }
            return "";
        },
        /**
         * 根据转入的时间返回星期几，参数为空返回当前日期的星期数
         * @param {} date 
         * @returns {} 
         */
        showCnWeek: function (date) {
            if (date != null) {
                return dateUtils.cnWeek(new Date(parseInt(date)).getDay());
            }
            return dateUtils.cnWeek(new Date().getDay());
        },
        /**
         * 显示当前的时间信息，例：2010年10月10日 星期一
         * @param {} format 
         * @returns {} 
         */
        currentDateAndWeek: function (format) {
            return dateUtils.currentDate(format) + " " + dateUtils.showCnWeek();
        },
        /**
         * 时间比较大小
         * @param {} d1 比较时间1
         * @param {} d2 比较时间2
         * @returns {} 
         */
        compare: function (d1, d2) {
            var oDate1 = new Date(d1);
            var oDate2 = new Date(d2);
            return oDate1.getTime() > oDate2.getTime();
        }
    };

    /**
     * 正则表达式校验工具
     */
    window.regexUtils = {
        /**
         * 根据给定的正则表达式校验传入的数
         * @param {string} rex - 进行匹配的正则表达式
         * @param {string} data - 需要进行校验的数据
         * @returns {Boolean}
         */
        checkRegex: function (rex, data) {
            var r = new RegExp(rex);
            if (!r.exec(data)) return false;
            return true;
        },
        /**
         * 校验身份证号码
         * @param {} idcard 身份证号码
         * @returns {} 返回校验的结果，真或假
         */
        checkIdCard: function (idcard) {
            // 加权因子
            var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            // 校验码
            var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
            var reg = regexEnum.idcard;
            if (reg.test(idcard)) {
                var sum = 0;
                for (var i = 0; i < idcard.length - 1; i++) {
                    // 对前17位数字与权值乘积求和
                    sum += parseInt(idcard.substr(i, 1), 10) * arrExp[i];
                }
                // 计算模（固定算法）
                var idx = sum % 11;
                // 检验第18为是否与校验码相等
                return arrValid[idx] === idcard.substr(17, 1).toUpperCase();
            } else {
                return false;
            }
        }
    };

    /**
     * cookie 工具
     */
    window.cookieUtils = {
        /**
         * 设置cookie
         * @param {} name 
         * @param {} value 
         * @param {} day 
         * @returns {} 
         */
        set: function (name, value, day) {
            var days = (stringUtils.isEmpty(day) ? 30 : day);
            var exp = new Date();
            exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
            document.cookie = (name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/");
        },
        /**
         * 获取cookie
         * @param {} name 
         * @returns {} 
         */
        get: function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr === document.cookie.match(reg)) return unescape(arr[2]);
            else return null;
        },
        /**
         * 删除cookie
         * @param {} name 
         * @returns {} 
         */
        del: function (name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = get(name);
            if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }
    };

    /**
     * js实现的hashmap
     */
    window.hashmapUtil = {
        Hashmap: function () {

            // 定义长度
            var length = 0;
            // 创建一个对象
            var obj = new Object();

            //判断Map是否为空
            this.isEmpty = function () {
                return length === 0;
            };

            //判断对象中是否包含给定Key
            this.containsKey = function (key) {
                return (key in obj);
            };

            //判断对象中是否包含给定的Value
            this.containsValue = function (value) {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (obj[key] === value) {
                            return true;
                        }
                    }
                }
                return false;
            };

            //向map中添加数据
            this.put = function (key, value) {
                if (!this.containsKey(key)) {
                    length++;
                }
                obj[key] = value;
            };

            //根据给定的Key获得Value
            this.get = function (key) {
                return this.containsKey(key) ? obj[key] : null;
            };

            //根据给定的Key删除一个值
            this.remove = function (key) {
                if (this.containsKey(key) && (delete obj[key])) {
                    length--;
                }
            };

            //获得Map中的所有Value
            this.values = function () {
                var values = new Array();
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        values.push(obj[key]);
                    }
                }
                return values;
            };

            //获得Map中的所有Key
            this.keySet = function () {
                var keys = new Array();
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        keys.push(key);
                    }
                }
                return keys;
            };

            //获得Map的长度
            this.size = function () {
                return length;
            };

            //清空Map
            this.clear = function () {
                length = 0;
                obj = new Object();
            };
        }
    };

    /**
     * url 参数工具类
     */
    window.urlparamUtils = {
        /**
         * 获取url中的查询参数
         * @param {} name 参数名称
         * @returns {} 
         */
        queryParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return r[2];
            return null;
        }
    };

    /**
     * 浏览器工具
     */
    window.browserUtils = {

        /**
         * 判断是否为IE浏览器
         * @returns {} 
         */
        isIE: function () {
            return (!!window.ActiveXObject || "ActiveXObject" in window);
        },

        /**
         * 判断浏览器类型
         * @returns {} 
         */
        judgeBrowser: function () {
            if (!!window.ActiveXObject || "ActiveXObject" in window) {
                return "ie";
            } else {
                var explorer = window.navigator.userAgent;
                if (explorer.indexOf("Firefox") >= 0) {
                    return "firefox";
                }
                else if (explorer.indexOf("Chrome") >= 0) {
                    return "chrome";
                }
                else if (explorer.indexOf("Opera") >= 0) {
                    return "opera";
                }
                else if (explorer.indexOf("Safari") >= 0) { return "safari"; }
            }
            return "unknown browser";
        },

        /**
         * 校验是否pc端浏览器
         * @returns {} 
         */
        isPersonalComputer: function () {
            var userAgentInfo = navigator.userAgent;
            var agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < agents.length; v++) {
                if (userAgentInfo.indexOf(agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        }
    };

    /**
     * 数字工具类
     */
    window.numberUtils = {
        /**
         * 生成随机数
         * @param {} min 
         * @param {} max 
         * @returns {} 
         */
        random: function (min, max) {
            if (arguments.length === 2) {
                return Math.floor(min + Math.random() * ((max + 1) - min));
            } else {
                return null;
            }
        },
        /**
         * 将阿拉伯数字翻译成中文的大写数字
         * @param {} num 
         * @returns {} 
         */
        changeNumberToChinese: function (num) {
            var aa = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
            var bb = new Array("", "十", "百", "仟", "萬", "億", "点", "");
            var a = ("" + num).replace(/(^0*)/g, "").split("."), k = 0, re = "";
            var i;
            for (i = a[0].length - 1; i >= 0; i--) {
                switch (k) {
                    case 0:
                        re = bb[7] + re;
                        break;
                    case 4:
                        if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                            re = bb[4] + re;
                        break;
                    case 8:
                        re = bb[5] + re;
                        bb[7] = bb[5];
                        k = 0;
                        break;
                }
                if (k % 4 === 2 && a[0].charAt(i + 2) !== 0 && a[0].charAt(i + 1) === 0)
                    re = aa[0] + re;
                if (a[0].charAt(i) !== 0)
                    re = aa[a[0].charAt(i)] + bb[k % 4] + re;
                k++;
            }

            if (a.length > 1) // 加上小数部分(如果有小数部分)
            {
                re += bb[6];
                for (i = 0; i < a[1].length; i++)
                    re += aa[a[1].charAt(i)];
            }
            if (re === "一十")
                re = "十";
            if (re.match(/^一/) && re.length === 3)
                re = re.replace("一", "");
            return re;
        },
        /**
         * 将数字转换为大写金额
         * @param {} num 
         * @returns {} 
         */
        changeMontyToChinese: function (num) {
            //判断如果传递进来的不是字符的话转换为字符
            if (typeof num == "number") {
                num = new String(num);
            };
            num = num.replace(/,/g, ""); //替换tomoney()中的“,”
            num = num.replace(/ /g, ""); //替换tomoney()中的空格
            num = num.replace(/￥/g, ""); //替换掉可能出现的￥字符
            if (isNaN(num)) { //验证输入的字符是否为数字
                console.log("输入的字符不是数字，请检查");
                return "";
            };
            //字符处理完毕后开始转换，采用前后两部分分别转换
            var part = String(num).split(".");
            var newchar = "";
            //小数点前进行转化
            var tmpnewchar;
            var i;
            var perchar;
            for (i = part[0].length - 1; i >= 0; i--) {
                if (part[0].length > 10) {
                    return "";
                    //若数量超过拾亿单位，提示
                }
                tmpnewchar = "";
                perchar = part[0].charAt(i);
                switch (perchar) {
                    case "0":
                        tmpnewchar = "零" + tmpnewchar;
                        break;
                    case "1":
                        tmpnewchar = "壹" + tmpnewchar;
                        break;
                    case "2":
                        tmpnewchar = "贰" + tmpnewchar;
                        break;
                    case "3":
                        tmpnewchar = "叁" + tmpnewchar;
                        break;
                    case "4":
                        tmpnewchar = "肆" + tmpnewchar;
                        break;
                    case "5":
                        tmpnewchar = "伍" + tmpnewchar;
                        break;
                    case "6":
                        tmpnewchar = "陆" + tmpnewchar;
                        break;
                    case "7":
                        tmpnewchar = "柒" + tmpnewchar;
                        break;
                    case "8":
                        tmpnewchar = "捌" + tmpnewchar;
                        break;
                    case "9":
                        tmpnewchar = "玖" + tmpnewchar;
                        break;
                }
                switch (part[0].length - i - 1) {
                    case 0:
                        tmpnewchar = tmpnewchar + "元";
                        break;
                    case 1:
                        if (perchar !== 0) tmpnewchar = tmpnewchar + "拾";
                        break;
                    case 2:
                        if (perchar !== 0) tmpnewchar = tmpnewchar + "佰";
                        break;
                    case 3:
                        if (perchar !== 0) tmpnewchar = tmpnewchar + "仟";
                        break;
                    case 4:
                        tmpnewchar = tmpnewchar + "万";
                        break;
                    case 5:
                        if (perchar !== 0) tmpnewchar = tmpnewchar + "拾";
                        break;
                    case 6:
                        if (perchar !== 0) tmpnewchar = tmpnewchar + "佰";
                        break;
                    case 7:
                        if (perchar !== 0) tmpnewchar = tmpnewchar + "仟";
                        break;
                    case 8:
                        tmpnewchar = tmpnewchar + "亿";
                        break;
                    case 9:
                        tmpnewchar = tmpnewchar + "拾";
                        break;
                }
                newchar = tmpnewchar + newchar;
            }
            //小数点之后进行转化
            if (num.indexOf(".") !== -1) {
                if (part[1].length > 2) {
                    // alert("小数点之后只能保留两位,系统将自动截断");
                    part[1] = part[1].substr(0, 2);
                }
                for (i = 0; i < part[1].length; i++) {
                    tmpnewchar = "";
                    perchar = part[1].charAt(i);
                    switch (perchar) {
                        case "0":
                            tmpnewchar = "零" + tmpnewchar;
                            break;
                        case "1":
                            tmpnewchar = "壹" + tmpnewchar;
                            break;
                        case "2":
                            tmpnewchar = "贰" + tmpnewchar;
                            break;
                        case "3":
                            tmpnewchar = "叁" + tmpnewchar;
                            break;
                        case "4":
                            tmpnewchar = "肆" + tmpnewchar;
                            break;
                        case "5":
                            tmpnewchar = "伍" + tmpnewchar;
                            break;
                        case "6":
                            tmpnewchar = "陆" + tmpnewchar;
                            break;
                        case "7":
                            tmpnewchar = "柒" + tmpnewchar;
                            break;
                        case "8":
                            tmpnewchar = "捌" + tmpnewchar;
                            break;
                        case "9":
                            tmpnewchar = "玖" + tmpnewchar;
                            break;
                    }
                    if (i === 0) tmpnewchar = tmpnewchar + "角";
                    if (i === 1) tmpnewchar = tmpnewchar + "分";
                    newchar = newchar + tmpnewchar;
                }
            }
            //替换所有无用汉字
            while (newchar.search("零零") !== -1)
                newchar = newchar.replace("零零", "零");
            newchar = newchar.replace("零亿", "亿");
            newchar = newchar.replace("亿万", "亿");
            newchar = newchar.replace("零万", "万");
            newchar = newchar.replace("零元", "元");
            newchar = newchar.replace("零角", "");
            newchar = newchar.replace("零分", "");
            if (newchar.charAt(newchar.length - 1) === "元") {
                newchar = newchar + "整";
            }
            return newchar;
        }
    };

    /**
     * 事件类工具
     */
    window.eventUtil = {
        // 添加句柄
        addHandler: function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },
        // 删除句柄
        removeHandler: function (element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent("on" + type, handler);
            } else {
                element["on" + type] = null;
            }
        },
        //获取事件
        getEvent: function (event) {
            return event ? event : window.event;
        },
        //获取事件类型
        getType: function (event) {
            return event.type;
        },
        //获取事件源
        getElement: function (event) {
            return event.target || event.srcElement;
        },
        //阻止默认事件比如a链接跳转
        preventDefault: function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        //阻止事件冒泡
        stopPropagation: function (event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        }
    }

    /**
     * http工具类，我们这里封装jquery的ajax，便于调用
     *
     */
    window.httpUtil = {

        /**
         * 加载静态资源
         * @param {} v 
         * @param {} fn 
         * @returns {} 
         */
        doLoadHtml: function (v, fn) {

            // 验证ajax是否有url数据执行的地址，没有则提示并停止执行
            if (!v.hasOwnProperty("url")) {
                console.log("ajax执行缺乏必须的url参数数据");
                return false;
            }

            // 验证是否传入了回调函数，没有则提示必须定义回调函数
            if (stringUtils.isEmpty(fn)) {
                console.log("缺少必须的回调函数，请定义");
                return false;
            }

            //执行加载事件
            layui.use("layer", function () {
                var layer = layui.layer;
                var layerIndex = layer.load(0, { shade: false });

                $.ajax({
                    url: v.url,
                    type: "get",
                    success: function (res) {
                        //交由回调完成后续处理
                        console.log("读取html文件成功");
                        fn(stringUtils.isEmpty(v.selector) ? $(res) : $(res).find(v.selector));
                    }, error: function (xmlHttpRequest, textStatus) {
                        //判断是否网络超时
                        if (textStatus === "timeout") {
                            console.log("请求网络超时");
                        } else {
                            console.log("加载文件发生错误，请联系管理员解决！" + xmlHttpRequest + "," + textStatus);
                        }
                        return false;
                    }, complete: function () {
                        layer.close(layerIndex);
                        return true;
                    }
                });
            });
            return true;
        },
        /**
         * 执行异步请求处理方法
         * @param {} v 请求参数集合
         * @param {} fn 回调方法
         * @returns {} 
         */
        doRequest: function (v, fn) {

            // 验证ajax是否有url数据执行的地址，没有则提示并停止执行
            if (!v.hasOwnProperty("url")) {
                console.log("ajax执行缺乏必须的url参数数据，请定义");
                return false;
            }

            if (stringUtils.isEmpty(v.url)) {
                console.log("ajax执行缺乏必须的url参数数据，请定义");
                return false;
            }

            if (stringUtils.isEmpty(v.data)) {
                console.log("ajax执行缺乏必须的v.data 参数数据，请定义");
                return false;
            }

            // 校验是否缺乏回调函数
            if (stringUtils.isEmpty(fn)) {
                console.log("ajax执行缺乏必须的回调函数，请定义！");
                return false;
            }

            // 执行ajax的超时时间，默认情况下为为10秒
            v.timeout = v.hasOwnProperty("timeout") ? v.timeout : 10000;

            // 设置ajax的type类型
            v.type = (v.hasOwnProperty("type") ? v.type : "post".toUpperCase());

            // 设置ajax的dataType类型
            v.dataType = (v.hasOwnProperty("dataType") ? v.dataType : "json");

            // 设置ajax的async的属性
            v.async = (v.hasOwnProperty("async") ? v.async : true);

            // 设置ajax的cache属性，默认不缓存
            v.cache = (v.hasOwnProperty("cache") ? v.cache : false);

            //得到当前访问的url地址，防止快速点击，返回的数据被加载到其他页面
            var urlparam = window.location.href;

            layui.use("layer", function () {
                var layer = layui.layer;
                var layerIndex = layer.load(0, { shade: false });

                $.ajax({
                    url: v.url,
                    data: v.data,
                    type: v.type,
                    dataType: v.dataType,
                    timeout: v.timeout,
                    async: v.async,
                    success: function (mes) {
                        // 执行成功，内部校验逻辑开始,是否已经超时：10001
                        if (!mes.ret && mes.errcode === errorEnum.login_timeout) {
                            // 跳转登录页
                            window.top.location.href = systemConfig.pageLogin;
                            return false;
                        }

                        if (!mes.ret && mes.errcode === errorEnum.non_authorized) {
                            // 没有权限怎么提示? 跳转到首页
                            window.location.href = systemConfig.pageIndex;
                        }

                        // 校验返回的数据，确实是当前请求页面的数据
                        if (window.location.href === urlparam) {
                            console.log("开始执行回调函数");
                            fn(mes);
                        }

                        return true;
                    },
                    error: function (xmlHttpRequest, textStatus) {
                        if (xmlHttpRequest.status !== 0) {
                            console.log("服务器返回状态码：" + XMLHttpRequest.status + ",服务器响应状态：" + xmlHttpRequest.readyState + "错误原因：" + textStatus);
                        }
                        return false;
                    },
                    complete: function (xmlHttpRequest) {
                        layer.close(layerIndex);
                        // 拦截ajax请求超时问题,需要在后台添加header，response.setHeader("sessionstatus", "timeout")
                        var sessionstatus = xmlHttpRequest.getResponseHeader("sessionstatus");
                        if (sessionstatus === "timeout") {
                            window.top.location.href = systemConfig.pageLogin + "?action=reload";
                            return ("您的访问已经超过响应时间，" + (v.timeout / 1000) + ",请尝试重新登录本系统");
                        }
                        return true;
                    }
                });
            });
            return true;
        }
    };

    /**
     * 模态窗口工具类，需要layui插件支持
     */
    window.modalsUtil = {
        /**
         * 封装layui模态框，传统模式
         * @param {} title 标题
         * @param {} url 打开的页面地址
         * @param {} fun 回调函数
         * @returns {} 
         */
        modals: function (title, url, fun) {
            layui.use("layer", function () {
                var layer = layui.layer;
                layer.open({
                    type: 2,
                    title: title,
                    area: ["90%", "90%"],
                    shadeClose: true,
                    shade: 0.8,
                    content: url,
                    end: function () {
                        if (fun != null) {
                            fun();
                        }
                    }
                });
            });
        },

        /**
         * 
         * @param {} mes 弹出的消息
         * @param {} times 定时
         * @param {} fn 定时后的回调
         * @returns {} 
         */
        msg: function (mes, times, fn) {
            layui.use("layer", function () {
                var layer = layui.layer;
                if (stringUtils.isEmpty(time) && stringUtils.isEmpty(fn)) {
                    layer.msg(mes);
                } else {
                    layer.msg(mes, { time: times }, function () {
                        fn();
                    });
                }
            });
        }
    };

    /**
     * 校验表单，需要引用jquery，layui等第三方插件
     */
    window.formUtil = {

        /**
         * 表单校验入口
         * @param {} v (v.data 控件内部使用，用户定义会被覆盖，请不要定义)
         * @returns {} 
         */
        validate: function (v, fn, el) {
            layui.use("layer", function () {
                var layer = layui.layer;
                var result = true;

                if (stringUtils.isEmpty(v)) {
                    console.log("缺乏必须的对象参数v，请定义对象参数");
                    layer.msg("缺乏必须的对象参数v，请定义对象参数");
                    return false;
                }

                if (stringUtils.isEmpty(fn)) {
                    console.log("回调函数为空，必须传入");
                    layer.msg("缺乏必须的回调函数，请定义");
                    return false;
                }

                v.data = {};

                //是否传入获取控件指定区域的id，如果没有传入，则使用document.body
                var page = stringUtils.isEmpty(el) ? document.body : document.getElementById(el);

                //首先校验inputs类型
                var inputs = page.getElementsByTagName("input");
                if (!stringUtils.isEmpty(inputs)) {
                    //不为空进行表单校验和收集
                    result = formUtil.inputs(inputs, v, layer);
                }

                if (!result) {
                    return false;
                }

                //然后校验textareas类型表单
                var textareas = page.getElementsByTagName("textarea");
                if (!stringUtils.isEmpty(textareas)) {
                    result = formUtil.textareas(textareas, v, layer);
                }

                if (!result) {
                    return false;
                }

                //然后校验select类型表单
                var selects = page.getElementsByTagName("select");
                if (!stringUtils.isEmpty(selects)) {
                    result = formUtil.selects(selects, v, layer);
                }

                if (!result) {
                    return false;
                }

                var checkboxs = page.getElementsByTagName("input");
                if (!stringUtils.isEmpty(checkboxs)) {
                    result = formUtil.checkboxs(checkboxs, v, layer);
                }

                if (!result) {
                    return false;
                }

                var radios = page.getElementsByTagName("input");
                if (!stringUtils.isEmpty(radios)) {
                    result = formUtil.radios(radios, v, layer);
                }

                if (!result) {
                    return false;
                }

                //调用回调函数
                fn(result);

                return true;

            });
        },

        /**
         * 注册表单颜色和事件
         * @param {} objs 
         * @param {} color 
         * @param {} time 
         * @returns {} 
         */
        registerInputBgColor: function (objs, color, time) {
            var obj = $(objs);
            var delayTime = (time == null ? 3000 : time);
            var errColor = (color == null ? "#E4FCE5" : color);

            obj.css("background-color", errColor);
            obj.focus();

            setTimeout(function () {
                obj.css("background-color", "#ffffff");
            }, delayTime);

            obj.click(function () {
                obj.css("background-color", "#ffffff");
            });
        },

        /**
         * 校验数据类型
         * @param {} t 
         * @param {} dataType 
         * @returns {} 
         */
        checkDataType: function (t, dataType, lay) {

            //获取对应dataTtype类型的正则表达式
            var regex = regexEnum[dataType];
            //传入了错误的正则表达式标识，提示，并结束执行
            if (!stringUtils.isEmpty(regex)) {
                console.log("传入的datatype系统不支持，请检查！");
                lay.msg("表单的datatype类型系统不支持，请检查");
                formUtil.registerInputBgColor(t);
                return false;
            }

            //调用dataType类型正则校验，不符合要求，提示，并结束执行
            if (!regexUtils.checkRegex(regex, t.value)) {

                var errmsg = errorMessage[dataType];
                if (stringUtils.isEmpty(errmsg)) {
                    errmsg = errorMessage.typeerror;
                }
                lay.msg(errmsg);

                formUtil.registerInputBgColor(t);
                return false;
            }
            return true;
        },

        /**
         * 校验复选框
         * @param {} checkboxs 
         * @param {} v 
         * @param {} lay 
         * @returns {} 
         */
        checkboxs: function (checkboxs, v, lay) {
            var hs = new hashmapUtil.Hashmap();
            for (var i = 0; i < checkboxs.length; i++) {
                if (checkboxs[i].type === "checkbox") {
                    hs.put(checkboxs[i].getAttribute("oid"));
                }
            }

            var sets = hs.keySet();
            for (var j = 0; j < sets.length; j++) {
                var obj = sets[j];
                var chks = $("input[type=checkbox][oid='" + obj + "']");
                var isRequired = false;
                var checkvalues = "";
                var errmsg = "";

                for (var m = 0; m < chks.length; m++) {
                    if (!stringUtils.isEmpty(chks[m].getAttribute("required"))) {
                        isRequired = true;
                        errmsg = stringUtils.isEmpty(chks[m].getAttribute("errmsg")) ? errorMessage.nullerror : chks[m].getAttribute("errmsg");
                    }

                    if (chks[m].checked) {
                        checkvalues += chks[m].value + ",";
                    }
                }

                if (isRequired) {
                    //校验必须有一个选择项目
                    if (stringUtils.isEmpty(checkvalues)) {
                        lay.msg(errmsg);
                        return false;
                    }
                }

                if (!stringUtils.isEmpty(checkvalues)) {
                    v.data[obj] = checkvalues.substr(0, checkvalues.length - 1);
                }
            }
            return true;
        },

        /**
         * 校验radio表单
         * @param {} radios 
         * @param {} v 
         * @param {} lay 
         * @returns {} 
         */
        radios: function (radios, v, lay) {
            var ras = new hashmapUtil.Hashmap();
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].type === "radio") {
                    ras.put(radios[i].getAttribute("oid"));
                }
            }

            var sets = ras.keySet();

            for (var j = 0; j < sets.length; j++) {
                var obj = sets[j];
                var rads = $("input[type=radio][oid='" + obj + "']");
                var isRequired = false;
                var checkvalues = "";
                var errmsg = "";

                for (var m = 0; m < rads.length; m++) {
                    if (stringUtils.isEmpty(rads[m].getAttribute("name"))) {
                        lay.msg("radio类型表单必须设置name属性，请检查源文件");
                        return false;
                    }

                    if (!stringUtils.isEmpty(rads[m].getAttribute("required"))) {
                        isRequired = true;
                        errmsg = stringUtils.isEmpty(rads[m].getAttribute("errmsg")) ? errorMessage.nullerror : rads[m].getAttribute("errmsg");
                    }

                    if (rads[m].checked) {
                        checkvalues += rads[m].value + ",";
                    }
                }

                if (isRequired) {
                    //校验必须有一个选择项目
                    if (stringUtils.isEmpty(checkvalues)) {
                        lay.msg(errmsg);
                        return false;
                    }
                }

                if (!stringUtils.isEmpty(checkvalues)) {
                    var vs = checkvalues.substr(0, checkvalues.length - 1);
                    if (vs.split(",").length > 1) {
                        lay.msg("radio类型表单不能多选，只能存在一个有效值");
                        return false;
                    }
                    v.data[obj] = vs;
                }
            }
            return true;
        },

        /**
         * 校验select选择框
         * @param {} sels 
         * @param {} v 
         * @param {} lay 
         * @returns {} 
         */
        selects: function (sels, v, lay) {
            for (var i = 0; i < sels.length; i++) {
                var t = sels[i];
                var errmsg = t.getAttribute("errmsg");
                errmsg = stringUtils.isEmpty(errmsg) ? errorMessage.nullselecterror : errmsg;
                // 校验单选框
                if (t.type === "select-one" || t.type === "select-multiple") {
                    var required = t.getAttribute("required");
                    if (required === "required") {

                        var mutileResult = false;
                        for (i = 0; i < t.length; i++) {
                            if (t.options[i].selected) {
                                mutileResult = true;
                            }
                        }

                        if (!mutileResult) {
                            lay.msg(errmsg);
                            return false;
                        }

                        var value = "";
                        for (i = 0; i < t.length; i++) {
                            if (t.options[i].selected) {
                                if (!stringUtils.isEmpty(t.options[i].value)) {
                                    value += t.options[i].value + ",";
                                }
                            }
                        }

                        if (stringUtils.isEmpty(value)) {
                            lay.msg(errmsg);
                            return false;
                        }

                        var oid = t.getAttribute("oid");
                        v.data[oid] = value.substr(0, value.length - 1);
                    }

                }
            }
            return true;
        },

        /**
         * 校验textarea文本域的数据
         * @param {} areas 
         * @param {} v 
         * @param {} lay 
         * @returns {} 
         */
        textareas: function (areas, v, lay) {
            for (var i = 0; i < areas.length; i++) {
                var t = areas[i];
                if (t.type === "textarea") {
                    var required = t.getAttribute("required");
                    if (required === "required" && stringUtils.trimStr(t.value, "g") === "") {

                        var errmsg = t.getAttribute("errmsg");
                        if (errmsg === null) {
                            errmsg = errorMessage.nullerror;
                        }

                        lay.msg(errmsg);
                        t.focus();
                        registerInputBgColor(t);
                        return false;
                    }

                    //如果表单为空校验通过，开始进行数据类型校验（当数据不为空的时候）
                    if (stringUtils.trimStr(t.value, "g") !== "") {

                        // 校验是否包含正则表达式
                        var regex = t.getAttribute("regex");
                        // 如果包含正则表达式，则执行正则表达式校验
                        if (!stringUtils.isEmpty(regex)) {
                            if (!regexUtils.checkRegex(regex, t.value)) {

                                //校验不合法，提示错误信息
                                var exmsg = t.getAttribute("exmsg");
                                if (stringUtils.isEmpty(exmsg)) {
                                    exmsg = "输入的信息不符合系统格式要求，请重新录入！";
                                }

                                lay.msg(exmsg);
                                formUtil.registerInputBgColor(t);
                                return false;
                            }
                        }

                        //校验是否包含数据类型
                        var dataType = t.getAttribute("datatype");
                        if (!stringUtils.isEmpty(dataType)) {
                            if (!formUtil.checkDataType(t, dataType, lay)) {
                                return false;
                            }
                        }
                    }

                    var oid = t.getAttribute("oid");
                    if (oid != null) {
                        v.data[oid] = t.value.replace(/%/g, "％");
                    }
                }
            }
            return true;
        },

        /**
         * 校验文本框类表单控件
         * @param {} inputs 
         * @param {} v 
         * @param {} lay 
         * @returns {} 
         */
        inputs: function (inputs, v, lay) {

            for (var i = 0; i < inputs.length; i++) {
                var t = inputs[i];

                // 获取控件的type属性,校验必须具备type属性
                var type = t.getAttribute("type");
                if (type == null) {
                    t.focus();
                    t.style.backgroundColor = "#ff0000";
                    console.log("input 表单元素必须包含 type属性，没有type属性，返回错误");
                    lay.msg("input标签缺少必须的type属性，请检查并更正程序文件");
                    return false;
                }

                // type 类型为text / password / date / hidden 都是需要有文本输入的，校验是否为空，或者格式是否正确
                if (t.type === "text" || t.type === "password" || t.type === "date" || t.type === "hidden") {

                    // 获取表单的required属性
                    var required = t.getAttribute("required");

                    // 如果具备required属性，并且值为空，则需提示
                    if (required === "required" && stringUtils.trimStr(t.value, "g") === "") {

                        // 是否有定义错误信息
                        var errmsg = t.getAttribute("errmsg");
                        if (errmsg === null) {
                            errmsg = errorMessage.nullerror;
                        }

                        //提示错误信息
                        lay.msg(errmsg);

                        //注册表单颜色和事件
                        formUtil.registerInputBgColor(t);

                        //返回错误状态
                        return false;
                    }

                    //如果表单为空校验通过，开始进行数据类型校验（当数据不为空的时候）
                    if (stringUtils.trimStr(t.value, "g") !== "") {

                        // 校验是否包含正则表达式
                        var regex = t.getAttribute("regex");
                        // 如果包含正则表达式，则执行正则表达式校验
                        if (!stringUtils.isEmpty(regex)) {
                            if (!regexUtils.checkRegex(regex, t.value)) {

                                //校验不合法，提示错误信息
                                var exmsg = t.getAttribute("exmsg");
                                if (stringUtils.isEmpty(exmsg)) {
                                    exmsg = "输入的信息不符合系统格式要求，请重新录入！";
                                }

                                lay.msg(exmsg);
                                formUtil.registerInputBgColor(t);
                                return false;
                            }
                        }

                        //校验是否包含数据类型
                        var dataType = t.getAttribute("datatype");
                        if (!stringUtils.isEmpty(dataType)) {
                            if (!formUtil.checkDataType(t, dataType, lay)) {
                                return false;
                            }
                        }
                    }

                    var oid = t.getAttribute("oid");
                    if (oid != null) {
                        v.data[oid] = t.value.replace(/%/g, "％");
                    }
                }
            }
            return true;
        }
    };
})(window, document, $)
