
import React, { useState } from 'react';
import PublicHome from './components/PublicHome';
import Workspace from './components/Workspace';
import { AppView } from './types';
import { Shield, BookOpen, UserCircle, LayoutDashboard, ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('public');

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Universal Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setView('public')}
          >
            <div className="w-8 h-8 bg-indigo-950 rounded flex items-center justify-center">
              <Shield className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">مرآة الحقيقة</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <button 
              onClick={() => setView('public')}
              className={`hover:text-slate-900 transition-colors ${view === 'public' ? 'text-indigo-900 font-bold' : ''}`}
            >
              الرئيسية
            </button>
            <button className="hover:text-slate-900 transition-colors">عن المشروع</button>
            <button className="hover:text-slate-900 transition-colors">المنهجية</button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {view === 'public' ? (
            <button 
              onClick={() => setView('workspace')}
              className="bg-indigo-950 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-indigo-900 transition-all flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              لوحة العمل الصحفي
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
              <div className="flex items-center gap-2 text-slate-600">
                <span className="text-xs font-medium">مرحباً، صحفي الحقيقة</span>
                <UserCircle className="w-6 h-6" />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1">
        {view === 'public' ? (
          <PublicHome onStartDemo={() => setView('workspace')} />
        ) : (
          <Workspace />
        )}
      </main>

      {/* Conditional Simple Footer for Public View */}
      {view === 'public' && (
        <footer className="bg-slate-950 text-slate-400 py-12 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Shield className="text-white w-6 h-6" />
              <span className="text-lg font-bold text-white">مرآة الحقيقة</span>
            </div>
            <div className="flex gap-8 text-sm">
              <a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a>
              <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
              <a href="#" className="hover:text-white transition-colors">ميثاق الأخلاقيات</a>
            </div>
            <p className="text-xs">© 2024 نظام تتبع الحقيقة - جميع الحقوق محفوظة</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
