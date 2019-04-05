using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Xml;

namespace RevExpress.SmsApi
{
    /// <summary>
    /// 短信发送类
    /// </summary>
    public partial class SmsApi
    {
        /// <summary>
        /// 初始化模块
        /// </summary>
        /// <param name="config">配置文件路径，默认config</param>
        public SmsApi(string config = "config")
        {
            var jsonObj = JObject.Parse(File.ReadAllText(config, Encoding.Default));

            jsonObj.TryGetValue("apiUrl", out var obj);
            Url = obj?.ToString() ?? "";

            jsonObj.TryGetValue("apiKey", out obj);
            Un = obj?.ToString() ?? "";

            jsonObj.TryGetValue("apiSecret", out obj);
            Pw = obj?.ToString() ?? "";

            jsonObj.TryGetValue("sign", out obj);
            Sign = obj?.ToString() ?? "";
        }

        /// <summary>
        /// 发送短信
        /// </summary>
        /// <param name="mobile">手机号码，多个号码用分号(半角)分割。请不要超过 100 个号码</param>
        /// <param name="message">短信内容</param>
        /// <returns></returns>
        public SmsApiEntity SendSms(string mobile, string message)
        {
            var checkMobile = CheckMobile(mobile);
            if (checkMobile != "success")
            {
                return new SmsApiEntity
                {
                    Id = "",
                    Err = 1,
                    ErrMessage = checkMobile,
                    Success = false,
                    RawData = checkMobile
                };
            }
            Da = mobile;
            Sm = CodingFormat(Sign + message);
            var url = Url + $"?dc={Dc}&un={Un}&pw={Pw}&da={Da}&sm={Sm}&tf={Tf}&rf={Rf}&rd={Rd}";
            var result = DoRequest(url);

            //Console.WriteLine(result);
            var smsApiEntity = ResultAnalysis(result);

            SysLog.WriteLog("短信请求", $"请求数据：手机号：{mobile}，内容：{message}；返回数据：{result}");

            return smsApiEntity;
        }
        /// <summary>
        /// 检查手机号是否有效
        /// </summary>
        /// <param name="mobile">待检查手机号</param>
        /// <returns>有效返回 success，无效返回错误提示</returns>
        private static string CheckMobile(string mobile)
        {
            var strSplit = mobile.Split(';');
            if (strSplit.Length > 100)
            {
                return "手机号码超过100个限制";
            }
            foreach (var str in strSplit)
            {
                if (!Regex.IsMatch(str, "^((13[0-9])|(14[0,4-9])|(15([0-3]|[5-9]))|(166)|(17[0-8])|(18[0-9])|(19[8-9]))\\d{8}$"))
                {
                    return "手机号码错误";
                }
            }
            return "success";
        }

        /// <summary>
        /// 执行网络请求（GET）
        /// </summary>
        /// <param name="url">请求地址</param>
        /// <returns>返回请求后数据</returns>
        private static string DoRequest(string url)
        {
            string result;
            var request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "GET";
            HttpWebResponse response;
            try
            {
                response = (HttpWebResponse)request.GetResponse();
            }
            catch (WebException ex)
            {
                response = (HttpWebResponse)ex.Response;
            }
            using (var reader = new StreamReader(response.GetResponseStream() ?? throw new InvalidOperationException(), Encoding.UTF8))
            {
                result = reader.ReadToEnd();
            }
            return result;
        }

        /// <summary>
        /// 根据Tf条件转换编码
        /// </summary>
        /// <param name="msg">待转换内容</param>
        /// <returns>转换后内容</returns>
        private string CodingFormat(string msg)
        {
            switch (Tf)
            {
                case 0://指定内容使用 HEX 编码格式
                    return StrToHex(msg);
                case 1://指定内容使用 BASE64 编码格式
                    return EncodeBase64(msg);
                case 2://指定内容使用 URLEncode+GBK 编码格式
                    return HttpUtility.UrlEncode(msg, Encoding.GetEncoding("GBK"));
                case 3://指定内容使用 URLENCODE+UTF8 编码格式
                    return HttpUtility.UrlEncode(msg, Encoding.UTF8);
                default:
                    return "";
            }
        }

        /// <summary>
        /// Hex编码加密
        /// </summary>
        /// <param name="mStr">待加密内容</param>
        /// <returns>加密后内容</returns>
        private static string StrToHex(string mStr)
        {
            return BitConverter.ToString(Encoding.Default.GetBytes(mStr)).Replace("-", "");
        }

        /// <summary>
        /// BASE64编码加密
        /// </summary>
        /// <param name="content">待加密内容</param>
        /// <returns>加密后内容</returns>
        private static string EncodeBase64(string content)
        {
            string encode;
            var bytes = Encoding.Default.GetBytes(content);
            try
            {
                encode = Convert.ToBase64String(bytes);
            }
            catch
            {
                encode = content;
            }
            return encode;
        }

        /// <summary>
        /// 根据Rf条件转解析返回结果
        /// </summary>
        /// <param name="result">返回结果</param>
        /// <returns>返回解析后数据类</returns>
        private SmsApiEntity ResultAnalysis(string result)
        {
            var smsApiEntity = new SmsApiEntity();
            switch (Rf)
            {
                case 0://当 rf=0 时，返回普通字符串，各字段以&符号分割//
                    var strsSplit = result.Split('&');
                    var dictionary = new Dictionary<string, string>();
                    foreach (var str in strsSplit)
                    {
                        var sSplit = str.Split('=');
                        dictionary[sSplit[0]] = sSplit[1];
                    }
                    smsApiEntity.Id = dictionary.ContainsKey("id") ? dictionary["id"] : "";
                    smsApiEntity.OnErr(int.Parse(dictionary.ContainsKey("r") ? dictionary["r"] : "0"));
                    smsApiEntity.Success = smsApiEntity.Err == 0;
                    smsApiEntity.RawData = result;
                    break;
                case 1://当 rf=1 时，返回XML格式
                    var doc = new XmlDocument();
                    doc.LoadXml(result);
                    var e = doc.SelectSingleNode("id")?.InnerText ?? "";
                    smsApiEntity.Id = e;

                    e = doc.SelectSingleNode("error")?.InnerText ?? "0";
                    smsApiEntity.OnErr(int.Parse(e));

                    smsApiEntity.Success = smsApiEntity.Err == 0;

                    smsApiEntity.RawData = result;
                    break;
                case 2://当 rf=2 时，返回JSON格式，。可能会出现未定义字段，忽略即可。缺失字段则按默认处理。
                    var jsonObj = JObject.Parse(result);

                    jsonObj.TryGetValue("id", out var obj);
                    smsApiEntity.Id = obj?.ToString() ?? "";

                    jsonObj.TryGetValue("r", out obj);
                    smsApiEntity.OnErr(obj == null ? 0 : int.Parse(obj.ToString()));

                    smsApiEntity.Success = smsApiEntity.Err == 0;
                    smsApiEntity.RawData = result;
                    break;
            }

            return smsApiEntity;
        }
    }
}