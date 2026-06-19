import React, { useState } from 'react';
import { Dataset } from './types';
import { FileUpload } from './components/FileUpload';
import { Dashboard } from './components/Dashboard';
import { DataView } from './components/DataView';
import { PredictiveAnalysis } from './components/PredictiveAnalysis';
import { NAV_ITEMS } from './constants';
import { LayoutDashboard, Database, BrainCircuit, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleUpload = (data: Dataset) => {
    setDataset(data);
    setActiveView('dashboard');
  };

  const renderContent = () => {
    if (!dataset) return <FileUpload onUploadSuccess={handleUpload} />;

    switch (activeView) {
      case 'dashboard':
        return <Dashboard dataset={dataset} />;
      case 'data':
        return <DataView dataset={dataset} />;
      case 'predictions':
        return <PredictiveAnalysis dataset={dataset} />;
      default:
        return <Dashboard dataset={dataset} />;
    }
  };

  return (
    // Root Container: Fixed to viewport, no window scroll
    <div className="h-screen w-full bg-transparent text-slate-800 flex flex-col md:flex-row font-sans overflow-hidden selection:bg-primary-100">
      
      {/* Sidebar Navigation */}
      {dataset && (
        <>
            {/* Mobile Header - Shrinks if needed, fixed height */}
            <div className="md:hidden p-4 bg-white/90 backdrop-blur border-b border-slate-200 flex justify-between items-center sticky top-0 z-30 shadow-sm flex-shrink-0">
                <div className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">XAI-Insight</div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-700 p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar - Fixed width on Desktop, Slide-over on Mobile */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-72 bg-white/80 backdrop-blur-2xl border-r border-white/60 shadow-2xl shadow-slate-200/50 transform transition-transform duration-300 ease-in-out flex flex-col
                md:relative md:translate-x-0 md:h-full
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
            <div className="p-8 border-b border-slate-100/50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-2.5 rounded-xl shadow-lg shadow-primary-500/30">
                   <BrainCircuit className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="font-extrabold text-xl tracking-tight text-slate-800">XAI-Insight</h1>
                    <p className="text-xs text-primary-600 font-bold uppercase tracking-wider">Analytics Platform</p>
                </div>
              </div>
            </div>

            <nav className="p-6 space-y-3 flex-1 overflow-y-auto">
              {NAV_ITEMS.map(item => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActiveView(item.id); setIsMobileMenuOpen(false); }}
                    className={`
                      w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-200
                      ${isActive 
                        ? 'bg-white text-primary-700 shadow-md shadow-slate-200 ring-1 ring-slate-100' 
                        : 'text-slate-500 hover:bg-white/60 hover:text-slate-800 hover:shadow-sm'}
                    `}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-slate-400'}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="p-6 border-t border-slate-100/50 flex-shrink-0">
              <div className="bg-white/50 rounded-xl p-4 border border-white/60 shadow-sm backdrop-blur-sm">
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Current Dataset</p>
                <p className="text-sm text-slate-800 font-bold truncate" title={dataset.name}>
                  {dataset.name}
                </p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <p className="text-xs text-slate-500 font-medium">
                    {dataset.rows.length.toLocaleString()} rows active
                    </p>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Main Content - Takes remaining space, handles own scroll */}
      <main className="flex-1 flex flex-col h-full min-w-0 relative overflow-hidden">
         <div className="flex-1 overflow-y-auto scroll-smooth p-6 md:p-10">
            <div className="max-w-7xl mx-auto pb-32 w-full min-h-full flex flex-col">
              {renderContent()}
            </div>
         </div>
      </main>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && dataset && (
        <div 
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default App;