using System;
using System.Text;

namespace RevExpress
{
    /// <summary>
    /// 计算Md5加密字符串，返回三十二位的加密字符串，默认大写
    /// </summary>
    public class Md5Helper
    {
        /// <summary>
        /// 类实例
        /// </summary>
        private static Md5Helper _instance;
        /// <summary>
        /// 对象锁，确保线程安全
        /// </summary>
        private static readonly object Md5Locker = new object();

        /// <summary>
        /// 访问Md5实例
        /// </summary>
        /// <returns></returns>
        public static Md5Helper GetInstance()
        {
            if (_instance != null) return _instance;
            lock (Md5Locker)
            {
                return _instance ?? (_instance = new Md5Helper());
            }
        }

        /// <summary>
        /// 计算32位MD5码
        /// </summary>
        /// <param name="word">字符串</param>
        /// <param name="toUpper">返回哈希值格式 true：英文大写，false：英文小写</param>
        /// <returns></returns>
        public string Hash_MD5_32(string word, bool toUpper = true)
        {
            try
            {
                var md5Csp = new System.Security.Cryptography.MD5CryptoServiceProvider();
                var bytValue = Encoding.UTF8.GetBytes(word);
                var bytHash = md5Csp.ComputeHash(bytValue);
                md5Csp.Clear();

                //根据计算得到的Hash码翻译为MD5码
                var sHash = "";
                foreach (var t in bytHash)
                {
                    long i = t / 16;
                    var sTemp = i > 9 ? ((char)(i - 10 + 0x41)).ToString() : ((char)(i + 0x30)).ToString();
                    i = t % 16;
                    if (i > 9)
                    {
                        sTemp += ((char)(i - 10 + 0x41)).ToString();
                    }
                    else
                    {
                        sTemp += ((char)(i + 0x30)).ToString();
                    }
                    sHash += sTemp;
                }
                //根据大小写规则决定返回的字符串
                return toUpper ? sHash : sHash.ToLower();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
