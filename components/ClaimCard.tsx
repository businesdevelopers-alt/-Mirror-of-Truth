
import React from 'react';
import { Claim, ClaimStatus } from '../types';
import { AlertCircle, CheckCircle, Clock, FileText, ChevronLeft } from 'lucide-react';

interface ClaimCardProps {
  claim: Claim;
  onSelect: (claim: Claim) => void;
  isSelected: boolean;
}

const getStatusStyles = (status: ClaimStatus) => {
  switch (status) {
    case ClaimStatus.VERIFIED: return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case ClaimStatus.DEBUNKED: return 'bg-rose-50 text-rose-700 border-rose-200';
    case ClaimStatus.CONTRADICTORY: return 'bg-amber-50 text-amber-700 border-amber-200';
    case ClaimStatus.INCOMPLETE: return 'bg-sky-50 text-sky-700 border-sky-200';
    default: return 'bg-slate-50 text-slate-700 border-slate-200';
  }
};

const getStatusIcon = (status: ClaimStatus) => {
  switch (status) {
    case ClaimStatus.VERIFIED: return <CheckCircle className="w-4 h-4" />;
    case ClaimStatus.DEBUNKED: return <AlertCircle className="w-4 h-4" />;
    case ClaimStatus.CONTRADICTORY: return <AlertCircle className="w-4 h-4" />;
    case ClaimStatus.INCOMPLETE: return <Clock className="w-4 h-4" />;
    default: return <FileText className="w-4 h-4" />;
  }
};

const ClaimCard: React.FC<ClaimCardProps> = ({ claim, onSelect, isSelected }) => {
  return (
    <div 
      onClick={() => onSelect(claim)}
      className={`p-4 rounded-lg border transition-all cursor-pointer ${
        isSelected 
          ? 'border-indigo-600 ring-1 ring-indigo-600 bg-white shadow-md' 
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-sm font-medium leading-relaxed text-slate-800 line-clamp-2">
            {claim.text}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${getStatusStyles(claim.status)}`}>
              {getStatusIcon(claim.status)}
              {claim.status}
            </span>
            <span className="text-[10px] text-slate-400">
              تم الرصد: {new Date(claim.extractedAt).toLocaleDateString('ar-SA')}
            </span>
          </div>
        </div>
        <ChevronLeft className={`w-5 h-5 text-slate-300 transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
      </div>
    </div>
  );
};

export default ClaimCard;
