import { useRouteError } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home, RefreshCw, ArrowLeft, Globe } from 'lucide-react';

interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
  data?: string;
}

function ErrorPage() {
  const error = useRouteError() as RouteError;

  const getErrorInfo = () => {
    if (error?.status === 404) {
      return {
        title: 'Trang không tìm thấy',
        description:
          'Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.',
        icon: '🔍',
        statusCode: 404,
      };
    }

    if (error?.status === 403) {
      return {
        title: 'Không có quyền truy cập',
        description:
          'Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên.',
        icon: '🔒',
        statusCode: 403,
      };
    }

    if (error?.status === 500) {
      return {
        title: 'Lỗi máy chủ',
        description:
          'Đã xảy ra lỗi từ phía máy chủ. Vui lòng thử lại sau hoặc liên hệ hỗ trợ kỹ thuật.',
        icon: '⚙️',
        statusCode: 500,
      };
    }

    return {
      title: 'Đã xảy ra lỗi',
      description:
        'Có vẻ như đã xảy ra lỗi không mong muốn. Vui lòng thử lại hoặc liên hệ hỗ trợ.',
      icon: '⚠️',
      statusCode: error?.status || 'Unknown',
    };
  };

  const errorInfo = getErrorInfo();

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Decor */}
      <div
        className="fixed inset-0 -z-10 opacity-60"
        style={{ background: 'var(--gradient-mesh)' }}
      />
      <div className="fixed -z-10 top-1/4 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-orb" />
      <div
        className="fixed -z-10 bottom-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-orb"
        style={{ animationDelay: '-10s' }}
      />

      <div className="max-w-md w-full animate-fade-in relative z-10">
        {/* Error Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-20 animate-pulse" />
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <div className="absolute -top-2 -right-2 text-2xl">
              {errorInfo.icon}
            </div>
          </div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent mb-3">
            {errorInfo.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed max-w-sm mx-auto">
            {errorInfo.description}
          </p>
        </div>

        {/* Error Details Card */}
        <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-3xl p-6 shadow-2xl mb-8 group transition-all duration-300 hover:shadow-purple-500/10 hover:border-purple-500/20">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-black/5 dark:border-white/5">
            <span className="text-sm font-semibold text-slate-500">
              Mã định danh lỗi
            </span>
            <span className="text-sm font-mono bg-purple-500/10 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full border border-purple-500/20 shadow-sm">
              {errorInfo.statusCode}
            </span>
          </div>

          {error?.message && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Chi tiết kỹ thuật
              </span>
              <div className="bg-black/5 dark:bg-black/40 rounded-2xl p-4 overflow-hidden border border-black/5 dark:border-white/5">
                <p className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed break-all">
                  {error.message}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Button
            variant="gradient"
            className="w-full h-12 rounded-2xl font-semibold shadow-lg shadow-purple-500/20"
            onClick={() => (window.location.href = '/')}
          >
            <Home className="w-4 h-4 mr-2" />
            Về trang chủ
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 rounded-2xl bg-white/5 backdrop-blur-sm border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Tải lại trang
          </Button>
        </div>

        <Button
          variant="ghost"
          className="w-full h-12 rounded-2xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại trang trước
        </Button>

        {/* Help Links */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-6 text-sm">
            <a
              href="mailto:support@example.com"
              className="text-slate-400 hover:text-purple-500 transition-colors duration-200 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              Liên hệ hỗ trợ
            </a>
            <a
              href="/help"
              className="text-slate-400 hover:text-blue-500 transition-colors duration-200 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              Tài liệu hướng dẫn
            </a>
          </div>

          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-slate-500/50">
              <Globe className="w-3 h-3" />
              <span className="text-[10px] font-bold tracking-widest uppercase">
                Script Generator System
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
