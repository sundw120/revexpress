using System.Text;

namespace RevExpress
{
    public class ClassHelper
    {

        /// <summary>
        /// 类实例
        /// </summary>
        private static ClassHelper _instance;
        /// <summary>
        /// 对象锁，确保线程安全
        /// </summary>
        private static readonly object ClassLocker = new object();

        /// <summary>
        /// 访问类方法
        /// </summary>
        /// <returns></returns>
        public static ClassHelper GetInstance()
        {
            if (_instance != null) return _instance;
            lock (ClassLocker)
            {
                return _instance ?? (_instance = new ClassHelper());
            }
        }

        /// <summary>
        /// 获取类信息
        /// </summary>
        /// <param name="c"></param>
        /// <returns></returns>
        public string GetClassInfo(object c)
        {
            var strBuilder = new StringBuilder();
            foreach (var p in c.GetType().GetProperties())
            {
                if (p.Name != "DataTable_Action_")
                    strBuilder.AppendFormat("[{0}：{1}]  ,  ", p.Name, p.GetValue(c, null));
            }
            return strBuilder.ToString();
        }
    }
}
