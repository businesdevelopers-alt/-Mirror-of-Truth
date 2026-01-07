
import React, { useState, useCallback } from 'react';
import { Claim, ClaimStatus } from '../types';
import { extractClaimsFromContent } from '../services/geminiService';
import ClaimCard from './ClaimCard';
import Timeline from './Timeline';
import { Loader2, Send, Save, Trash2, History, MessageSquare, ShieldCheck } from 'lucide-react';

const Workspace: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    try {
      const extracted = await extractClaimsFromContent(inputText);
      setClaims(prev => [...extracted, ...prev]);
      if (extracted.length > 0) setSelectedClaim(extracted[0]);
    } catch (error) {
      console.error("Extraction failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateClaimStatus = (id: string, newStatus: ClaimStatus) => {
    setClaims(prev => prev.map(c => {
      if (c.id === id) {
        const newEvent = {
          id: `event-${Date.now()}`,
          date: new Date().toLocaleDateString('ar-SA'),
          description: `تحديث الحالة يدوياً من قبل المحرر إلى: ${newStatus}`
        };
        const updated = { ...c, status: newStatus, timeline: [newEvent, ...c.timeline] };
        if (selectedClaim?.id === id) setSelectedClaim(updated);
        return updated;
      }
      return c;
    }));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      {/* Top Input Bar */}
      <div className="bg-white border-b border-slate-200 p-4">
        <div className="max-w-5xl mx-auto flex gap-4">
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="أدخل النص الصحفي، رابط الخبر، أو التصريح للتحليل..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none h-24"
            />
            <button 
              onClick={handleAnalyze}
              disabled={isLoading || !inputText}
              className="absolute bottom-3 left-3 bg-indigo-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              تحليل المحتوى
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 overflow-hidden grid grid-cols-12 bg-slate-50">
        {/* Claims List */}
        <div className="col-span-4 border-l border-slate-200 overflow-y-auto p-4 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              الادعاءات المستخرجة
              <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs">{claims.length}</span>
            </h3>
          </div>
          {claims.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <History className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-sm">لا توجد ادعاءات حالياً</p>
            </div>
          ) : (
            claims.map(claim => (
              <ClaimCard 
                key={claim.id} 
                claim={claim} 
                isSelected={selectedClaim?.id === claim.id}
                onSelect={setSelectedClaim}
              />
            ))
          )}
        </div>

        {/* Claim Detail / Timeline */}
        <div className="col-span-8 overflow-y-auto bg-white p-8">
          {selectedClaim ? (
            <div className="max-w-3xl mx-auto">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">معرف الادعاء: {selectedClaim.id}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 leading-snug">
                    {selectedClaim.text}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Save className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-400 mb-2">الحالة الحالية</p>
                  <select 
                    value={selectedClaim.status}
                    onChange={(e) => updateClaimStatus(selectedClaim.id, e.target.value as ClaimStatus)}
                    className="w-full bg-transparent font-bold text-slate-900 outline-none cursor-pointer"
                  >
                    {Object.values(ClaimStatus).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-400 mb-2">درجة الموثوقية</p>
                  <p className="font-bold text-indigo-900 text-lg">{(selectedClaim.confidence * 100).toFixed(0)}%</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-400 mb-2">تاريخ الاستخراج</p>
                  <p className="font-bold text-slate-900">{new Date(selectedClaim.extractedAt).toLocaleDateString('ar-SA')}</p>
                </div>
              </div>

              <div className="space-y-10">
                <section>
                  <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                    <History className="w-4 h-4 text-indigo-600" />
                    خط زمن التغيرات
                  </h4>
                  <Timeline events={selectedClaim.timeline} />
                </section>

                <section>
                  <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                    ملاحظات المحرر
                  </h4>
                  <textarea 
                    value={selectedClaim.notes}
                    onChange={(e) => {
                       const updated = { ...selectedClaim, notes: e.target.value };
                       setSelectedClaim(updated);
                       setClaims(prev => prev.map(c => c.id === updated.id ? updated : c));
                    }}
                    placeholder="أضف ملاحظاتك البحثية هنا..."
                    className="w-full min-h-[150px] p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </section>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-300">
              <ShieldCheck className="w-16 h-16 mb-4 opacity-10" />
              <p>اختر ادعاءً من القائمة لعرض تفاصيل التحليل والجدول الزمني</p>
            </div>
          )}
        </div>
      </div>

      {/* Ethics Layer Footer */}
      <footer className="bg-indigo-950 text-indigo-200 px-6 py-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <span className="bg-indigo-800 px-2 py-0.5 rounded font-bold text-white flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            طبقة الحوكمة نشطة
          </span>
          <p>تنبيه: هذا تحليل آلي أولي. القرار النهائي وحق النشر يعود للمحرر البشري.</p>
        </div>
        <div className="flex items-center gap-4">
          <span>سجل التغييرات الآمن: 100% شفاف</span>
          <span className="opacity-50">النشر التلقائي: معطل</span>
        </div>
      </footer>
    </div>
  );
};

export default Workspace;
