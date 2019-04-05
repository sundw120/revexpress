namespace RevExpress.SmsApi
{
    /// <summary>
    /// 短信发送类
    /// </summary>
    partial class SmsApi
    {
        /// <summary>
        /// 0 表示英文，8 表示 UCS2，15 表示中文，指定内容类型
        /// </summary>
        private int Dc { get; } = 15;

        /// <summary>
        /// 用户名
        /// </summary>
        private string Un { get; }

        /// <summary>
        /// 密码（请勿在生产环境中直接使用，如需直接使用请联系绑定IP地址）
        /// </summary>
        private string Pw { get; }

        /// <summary>
        /// 手机号码，多个号码用分号(半角)分割。请不要超过 100 个号码
        /// </summary>
        private string Da { get; set; }

        /// <summary>
        /// 由 tf 指定的编码后的内容
        /// </summary>
        private string Sm { get; set; }

        /// <summary>
        /// 短信内容的编码
        /// 当 tf=0 时，指定内容使用 HEX 编码格式
        /// 当 tf=1 时，指定内容使用 BASE64 编码格式
        /// 当 tf=2 时，指定内容使用 URLEncode+GBK 编码格式
        /// 当 tf=3 时，指定内容使用 URLENCODE+UTF8 编码格式
        /// </summary>
        private int Tf { get; } = 3;

        /// <summary>
        /// 控制返回格式，见上面的响应格式说明
        /// 当 rf=0 时，返回普通字符串，各字段以"&"符号分割
        /// 当 rf=1 时，返回XML格式
        /// 当 rf=2 时，返回JSON格式，。可能会出现未定义字段，忽略即可。缺失字段则按默认处理。
        /// </summary>
        private int Rf { get; } = 0;

        /// <summary>
        /// 是否需要状态报告。0 表示不需要；1 表示需要
        /// </summary>
        private int Rd { get; } = 1;

        //public object SmsApi { get; internal set; }
        /// <summary>
        /// 签名
        /// </summary>
        private string Sign { get; }

        /// <summary>
        /// 请求地址
        /// </summary>
        private string Url { get; }
    }
}