using System;
using System.Linq;
using System.Management;

namespace RevExpress
{
    /// <summary>
    /// 获取计算机或者服务器的相关硬件接口信息
    /// </summary>
    public class ComputerConfig
    {
        /// <summary>
        /// 类实例
        /// </summary>
        private static ComputerConfig _instance;

        /// <summary>
        /// 对象锁，用于线程安全
        /// </summary>
        private static readonly object CacheLock = new object();

        /// <summary>
        /// 类访问方法
        /// </summary>
        /// <returns></returns>
        public static ComputerConfig GetInstance()
        {
            if (_instance != null) return _instance;
            lock (CacheLock)
            {
                return _instance ?? (_instance = new ComputerConfig());
            }
        }


        /// <summary>
        /// 获取计算机的MAC地址
        /// </summary>
        /// <returns></returns>
        public string GetMacAddress()
        {
            try
            {
                //获取网卡硬件地址 
                var mac = " ";
                var mc = new ManagementClass("Win32_NetworkAdapterConfiguration");
                var moc = mc.GetInstances();
                foreach (var mo in moc.Cast<ManagementObject>().Where(mo => (bool)mo["IPEnabled"]))
                {
                    mac = mo["MacAddress"].ToString();
                    break;
                }
                return mac;
            }
            catch
            {
                return "unknow ";
            }
        }

        /// <summary>
        /// 获取Ip地址
        /// </summary>
        /// <returns></returns>
        public string GetIpAddress()
        {
            try
            {
                var st = " ";
                var mc = new ManagementClass("Win32_NetworkAdapterConfiguration");
                var moc = mc.GetInstances();
                foreach (var ar in moc.Cast<ManagementObject>().Where(mo => (bool)mo["IPEnabled"]).Select(mo => (Array)(mo.Properties["IpAddress"].Value)))
                {
                    st = ar.GetValue(0).ToString();
                    break;
                }
                return st;
            }
            catch
            {
                return "unknow ";
            }
        }

        /// <summary>
        /// 获取cpu序列号代码
        /// </summary>
        /// <returns></returns>
        public string GetCpuId()
        {
            try
            {
                var cpuInfo = " ";
                var mc = new ManagementClass("Win32_Processor");
                var moc = mc.GetInstances();
                foreach (var mo in moc.Cast<ManagementObject>())
                {
                    cpuInfo = mo.Properties["ProcessorId"].Value.ToString();
                }
                return cpuInfo;
            }
            catch
            {
                return "unknow ";
            }
        }

        /// <summary>
        /// 获取服务器Cpu的个数
        /// </summary>
        /// <returns></returns>
        public int GetCpuCount()
        {
            try
            {
                using (var mCpu = new ManagementClass("Win32_Processor"))
                {
                    var cpus = mCpu.GetInstances();
                    return cpus.Count;
                }
            }
            catch
            {
                // ignored
            }
            return -1;
        }
        /// <summary>
        /// 获取cpu的频率
        /// </summary>
        /// <returns></returns>
        public string[] GetCpuMhz()
        {
            var mc = new ManagementClass("Win32_Processor");
            var cpus = mc.GetInstances();

            var mHz = new string[cpus.Count];
            var c = 0;
            var mySearch = new ManagementObjectSearcher("select * from Win32_Processor");
            foreach (var mo in mySearch.Get().Cast<ManagementObject>())
            {
                mHz[c] = mo.Properties["CurrentClockSpeed"].Value.ToString();
                c++;
            }
            mc.Dispose();
            mySearch.Dispose();
            return mHz;
        }

        /// <summary>
        /// 获取硬盘的序列号
        /// </summary>
        /// <returns></returns>
        public string GetDiskId()
        {
            try
            {
                //获取硬盘ID 
                var hDid = " ";
                var mc = new ManagementClass("Win32_DiskDrive");
                var moc = mc.GetInstances();
                foreach (var mo in moc.Cast<ManagementObject>())
                {
                    hDid = (string)mo.Properties["Model"].Value;
                }
                return hDid;
            }
            catch
            {
                return "unknow ";
            }
        }
    }
}
