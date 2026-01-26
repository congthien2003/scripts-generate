import { Outlet } from 'react-router-dom';
import { ScriptSidebar } from './ScriptSidebar';

export function ScriptLayout() {
  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Background gradient mesh */}
      <div
        className="fixed inset-0 -z-10 opacity-60"
        style={{ background: 'var(--gradient-mesh)' }}
      />

      {/* Animated gradient orbs */}
      <div className="fixed -z-10 top-1/4 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-orb" />
      <div
        className="fixed -z-10 top-3/4 -right-20 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-orb"
        style={{ animationDelay: '-5s' }}
      />
      <div
        className="fixed -z-10 bottom-1/4 left-1/3 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-orb"
        style={{ animationDelay: '-10s' }}
      />

      <ScriptSidebar />
      <main className="flex-1 overflow-y-auto lg:ml-72">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
