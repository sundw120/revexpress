using System;
using System.Web;

namespace RevExpress
{
   /// <summary>
   /// 缓存工具类
   /// </summary>
   public class CacheHelper
    {
        /// <summary>
        /// 类实例
        /// </summary>
        private static CacheHelper _instance;

        /// <summary>
        /// 对象锁，用于线程安全
        /// </summary>
        private static readonly object CacheLock = new object();

        /// <summary>
        /// 类访问方法
        /// </summary>
        /// <returns></returns>
        public static CacheHelper GetInstance()
        {
            if (_instance != null) return _instance;
            lock (CacheLock)
            {
                return _instance ?? (_instance = new CacheHelper());
            }
        }


        #region "主体方法"

        /// <summary>
        /// 获取指定键值的缓存数据
        /// </summary>
        /// <param name="cacheKey">缓存的键值</param>
        /// <returns>返回缓存的数据</returns>
        public object GetCache(string cacheKey)
        {
            var objCache = HttpRuntime.Cache;
            return objCache[cacheKey];
        }

        public void RemoveCache(string cacheKey)
        {
            HttpRuntime.Cache.Remove(cacheKey);
        }

        /// <summary>
        /// 设置缓存数据，
        /// </summary>
        /// <param name="cacheKey">键值名</param>
        /// <param name="obj">缓存对象</param>
        public void AddCache(string cacheKey, object obj)
        {
            var objCache = HttpRuntime.Cache;
            objCache.Insert(cacheKey, obj);
        }

        /// <summary>
        /// 设置缓存，并指定过期时间，以及过期后可以分配的时间
        /// </summary>
        /// <param name="cacheKey">缓存的键值名</param>
        /// <param name="obj">需要缓存的对象</param>
        /// <param name="absoluteExpiration">所插入对象将过期并被从缓存中移除的时间。如果使用绝对过期，则 slidingExpiration 参数必须为 NoSlidingExpiration</param>
        /// <param name="slidingExpiration">最后一次访问所插入对象时与该对象过期时之间的时间间隔.如果该值等效于 20 分钟，则对象在最后一次被访问 20 分钟之后将过期并被从缓存中移除。</param>
        public void AddCache(string cacheKey, object obj, DateTime absoluteExpiration, TimeSpan slidingExpiration)
        {
            var objCache = HttpRuntime.Cache;
            objCache.Insert(cacheKey, obj, null, absoluteExpiration, slidingExpiration);
        }
        #endregion
    }
}
