import { Settings as SettingsIcon, Save, Key, Shield, User, Check } from 'lucide-react';
import { useTerminal } from '../lib/TerminalContext';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function Settings() {
  const { collapsed } = useTerminal();
  const [apiKey, setApiKey] = useState('');
  const [autoApprove, setAutoApprove] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setApiKey(localStorage.getItem('apex_api_key') || '');
    setAutoApprove(localStorage.getItem('apex_auto_approve') === 'true');
    setTheme(localStorage.getItem('apex_theme') || 'dark');
  }, []);

  const handleSave = () => {
    localStorage.setItem('apex_api_key', apiKey);
    localStorage.setItem('apex_auto_approve', String(autoApprove));
    localStorage.setItem('apex_theme', theme);
    toast.success('Settings saved successfully');
  };

  return (
    <div className={cn("flex flex-col h-full bg-[#020B0A] text-[#F2F5F4] overflow-y-auto w-full transition-all duration-300", collapsed ? "pb-8" : "pb-64")}>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#12302A 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="flex-1 p-4 sm:p-8 relative z-10 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 border-b border-[#12302A] pb-6">
          <div className="w-12 h-12 rounded-lg bg-[#00E5C3]/10 flex items-center justify-center border border-[#00E5C3]/30">
            <SettingsIcon className="w-6 h-6 text-[#00E5C3]" />
          </div>
          <div>
            <h1 className="text-2xl font-mono uppercase tracking-tight font-bold">System Settings</h1>
            <p className="text-zinc-400 text-sm font-mono mt-1">// CONFIGURATION_AND_PREFERENCES</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* API Keys */}
          <section className="bg-[#040C0A] border border-[#12302A] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Key className="w-5 h-5 text-[#00E5C3]" />
              <h2 className="text-lg font-mono font-bold">External APIs</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-[#00E5C3] mb-2">Gemini API Key</label>
                <input 
                  type="password" 
                  value={apiKey} 
                  onChange={e => setApiKey(e.target.value)}
                  className="w-full bg-[#020B0A] border border-[#12302A] focus:border-[#00E5C3] rounded-md p-3 text-sm text-white font-mono outline-none transition-colors"
                  placeholder="AIzaSy..."
                />
                <p className="text-zinc-500 text-xs mt-2">Required for advanced agent reasoning capabilities.</p>
              </div>
            </div>
          </section>

          {/* Execution Preferences */}
          <section className="bg-[#040C0A] border border-[#12302A] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-[#00E5C3]" />
              <h2 className="text-lg font-mono font-bold">Execution Preferences</h2>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-0.5">
                  <input 
                    type="checkbox" 
                    checked={autoApprove}
                    onChange={e => setAutoApprove(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border border-[#12302A] rounded bg-[#020B0A] peer-checked:bg-[#00E5C3] peer-checked:border-[#00E5C3] transition-colors" />
                  <Check className="w-3 h-3 text-[#020B0A] absolute opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-[#00E5C3] transition-colors">Auto-Approve Agent Actions</div>
                  <div className="text-xs text-zinc-500 mt-1">If enabled, agents will execute standard procedures without prompting for confirmation. High-risk actions will still require approval.</div>
                </div>
              </label>
            </div>
          </section>
          
          {/* Appearance */}
          <section className="bg-[#040C0A] border border-[#12302A] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-[#00E5C3]" />
              <h2 className="text-lg font-mono font-bold">Appearance</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-[#00E5C3] mb-2">Theme Mode</label>
                <select 
                  value={theme}
                  onChange={e => setTheme(e.target.value)}
                  className="w-full bg-[#020B0A] border border-[#12302A] focus:border-[#00E5C3] rounded-md p-3 text-sm text-white font-mono outline-none transition-colors"
                >
                  <option value="dark">Dark (Terminal)</option>
                  <option value="light">Light</option>
                  <option value="system">System Default</option>
                </select>
              </div>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-end pt-4 pb-12">
            <button 
              onClick={handleSave}
              className="px-6 py-3 bg-[#00E5C3] hover:bg-[#00CFAE] text-[#02110E] transition-all rounded-md text-sm font-mono uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,195,0.15)] font-bold cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
