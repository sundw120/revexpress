using System;
using System.IO;
using System.Text;

namespace RevExpress
{
    /// <summary>
    /// 系统日志
    /// </summary>
    public class SysLog
    {
        static SysLog()
        {
            logPath = System.Windows.Forms.Application.StartupPath + "\\SysLog";
        }
        private static readonly System.Collections.Generic.Queue<string> LogBuffer = new System.Collections.Generic.Queue<string>();
        private static bool _isDispose;

        /// <summary>
        /// 为 WinForm 应用程序绑定异常日志
        /// </summary>
        public static void BindExceptionLog()
        {
            AppDomain.CurrentDomain.UnhandledException += CurrentDomain_UnhandledException;
            System.Windows.Forms.Application.ThreadException += Application_ThreadException;
        }

        public static void RemoveExceptionLog()
        {
            AppDomain.CurrentDomain.UnhandledException -= CurrentDomain_UnhandledException;
            System.Windows.Forms.Application.ThreadException -= Application_ThreadException;
        }

        private static void CurrentDomain_UnhandledException(object sender, UnhandledExceptionEventArgs e)
        {
            var sb = new StringBuilder();
            try
            {
                Exception currentExc;
                for (currentExc = (Exception)e.ExceptionObject;
                    currentExc != null; currentExc = currentExc.InnerException)
                {
                    sb.AppendFormat("\r\n{0}\r\n{1}\r\n{2}",
                        currentExc.GetType().FullName,
                        currentExc.Message,
                        currentExc.StackTrace);
                }
            }
            catch
            {
                sb.Append("\r\n记录本条日志时也出现异常，导致捕获的信息不完整...");
            }
            SyncWriteLog("发现应用程序域中未被捕获的异常", sb.ToString());
        }

        private static void Application_ThreadException(object sender, System.Threading.ThreadExceptionEventArgs e)
        {
            SyncWriteLog("发现未被捕获的异常",
                $"{e.Exception.GetType().FullName}\r\n{e.Exception.Message}\r\n{e.Exception.StackTrace}");
        }

        /// <summary>
        /// 同步写入日志
        /// </summary>
        /// <param name="title">标题</param>
        /// <param name="info">信息</param>
        private static void SyncWriteLog(string title, string info)
        {
            AddLog(DateTime.Now, title, info);
            _isDispose = true;
            WriteLog(null);
            OnNewLog(title, info, true);
        }

        private static void AddLog(DateTime logTime, string title, string info)
        {
            if (_isDispose) return;
            lock (logPath)
            {
                try
                {
                    LogBuffer.Enqueue("[" + logTime.ToString(TimeFormat) + "]  " + title + "  " + info + Environment.NewLine);
                }
                catch
                {
                    // ignored
                }
            }
        }


        /// <summary>
        /// 写入日志
        /// </summary>
        /// <param name="title">标题</param>
        /// <param name="info">信息</param>
        public static void WriteLog(string title, string info)
        {
            logPath = System.Windows.Forms.Application.StartupPath + "\\SysLog";
            AddLog(DateTime.Now, title, info);
            System.Threading.ThreadPool.QueueUserWorkItem(WriteLog);
            OnNewLog(title, info, false);
        }

        private static bool _isAdd;
        private static void WriteLog(object obj)
        {
            if (_isAdd) return;
            _isAdd = true;
            lock (logPath)
            {
                var logFile = LogPath + "\\" + DateTime.Now.ToString("yyyyMMdd") + ".log";
                try
                {
                    using (var sw = new StreamWriter(logFile, true, Encoding.Default))
                    {
                        while (LogBuffer.Count > 0)
                        {
                            var log = LogBuffer.Peek();
                            try
                            {
                                sw.Write(log);
                                LogBuffer.Dequeue();
                            }
                            catch
                            {
                                break;
                            }
                        }
                        sw.Close();
                        sw.Dispose();
                    }
                }
                catch
                {
                    // ignored
                }
            }
            _isAdd = false;
        }

        private static string logPath;
        /// <summary>
        /// 获取或设置日志文件存放路径
        /// </summary>
        public static string LogPath
        {
            get
            {
                if (!Directory.Exists(logPath))
                {
                    Directory.CreateDirectory(logPath);
                }
                return logPath;
            }
            set => logPath = value;
        }

        /// <summary>
        /// 时间格式
        /// </summary>
        public static string TimeFormat { get; set; } = "HH:mm:ss,fff";

        /// <summary>
        /// 有新日志产生时
        /// </summary>
        public static event ExceptionHandler NewLog;
        private static void OnNewLog(string title, string info, bool IsTerminating)
        {
            NewLog?.Invoke(title, info, IsTerminating);
        }
    }
    /// <summary>
    /// 异常事件
    /// </summary>
    public delegate void ExceptionHandler(string title, string info, bool isTerminating);
}