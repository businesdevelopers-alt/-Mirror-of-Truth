
import React from 'react';
import { ArrowLeft, CheckCircle, Search, Clock, Info } from 'lucide-react';

interface PublicHomeProps {
  onStartDemo: () => void;
}

const PublicHome: React.FC<PublicHomeProps> = ({ onStartDemo }) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
            نحن لا نتحقق من الأخبار... <br/>
            <span className="text-indigo-900 underline decoration-indigo-200 underline-offset-8 italic">نحن نتابع الحقيقة</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            مرآة الحقيقة هي بيئة عمل صحفية معززة بالذكاء الاصطناعي، مصممة لمساعدة الباحثين والمحررين في تتبع الادعاءات وتطورها عبر الزمن.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStartDemo}
              className="px-8 py-4 bg-indigo-950 text-white rounded-xl font-bold text-lg hover:bg-indigo-900 transition-all flex items-center gap-3 w-full sm:w-auto"
            >
              ابدأ تجربة العمل
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold text-lg hover:bg-slate-200 transition-all w-full sm:w-auto">
              تواصل معنا
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-slate-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-900">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">رصد الادعاءات</h3>
              <p className="text-slate-500 text-sm leading-relaxed">استخراج آلي للجمل الخبرية والادعاءات من النصوص والروابط والتصريحات المسجلة.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-900">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">تتبع عبر الزمن</h3>
              <p className="text-slate-500 text-sm leading-relaxed">بناء جدول زمني لتطور الادعاء وتغيره، مما يكشف التناقضات المنهجية بدقة.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-900">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">ربط الأدلة</h3>
              <p className="text-slate-500 text-sm leading-relaxed">ربط كل ادعاء بمصادر متعددة ومستندات لدعم قرار المحرر النهائي.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">لماذا مرآة الحقيقة؟</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1"><Info className="w-5 h-5 text-indigo-600" /></div>
                  <p className="text-slate-600 leading-relaxed">الأدوات التقليدية تتحقق من "صحة" الخبر اللحظية، بينما نحن نبني ذاكرة مؤسسية لتطور الحقيقة.</p>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1"><Info className="w-5 h-5 text-indigo-600" /></div>
                  <p className="text-slate-600 leading-relaxed">واجهة هادئة، بلا ضجيج، تشبه أدوات البحث الأكاديمي والتحقيق الجنائي الرقمي.</p>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-slate-900 rounded-3xl p-8 text-white aspect-video flex flex-col justify-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 opacity-10 rounded-full -mr-16 -mt-16"></div>
               <p className="text-2xl font-light italic mb-4 opacity-80 leading-relaxed">"الهدف ليس مجرد كشف الزيف، بل فهم كيف تتحول الحقائق بمرور الوقت."</p>
               <span className="font-bold text-indigo-400">رؤية المشروع</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicHome;
