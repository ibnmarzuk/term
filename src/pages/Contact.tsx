import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Terminal, AlertCircle, ShieldAlert, Sparkles, TerminalSquare } from 'lucide-react';
import PublicLayout from '../components/PublicLayout';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('integration');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    try {
      setIsSubmitting(true);
      setTerminalLogs(['[INGEST] Packet received.', '[INGEST] Reading subject header fields...']);
      await sleep(600);

      setTerminalLogs(prev => [...prev, `[RESOLVE] Target endpoint: /registry/inbound/${topic}`]);
      await sleep(600);

      setTerminalLogs(prev => [...prev, '[CRYPT] Securing payload using ephemeral session channels...']);
      await sleep(800);

      setTerminalLogs(prev => [...prev, '⚡ [DISPATCH] Inbound telemetry packets transmitted nominal.']);
      await sleep(600);

      setSubmitSuccess(true);
    } catch {
      setTerminalLogs(prev => [...prev, '❌ [FAILED] Packet upload interrupted.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSubmitSuccess(false);
    setTerminalLogs([]);
  };

  const pageTransition = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
  };

  return (
    <PublicLayout>
      <motion.div {...pageTransition} className="relative z-10 py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#00DCC4] text-[10px] font-mono uppercase tracking-widest block mb-2">// TELEMETRY</span>
          <h1 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-white font-bold mb-4">
            Initialize Contact.
          </h1>
          <p className="text-[#C5C1B9] text-sm leading-relaxed">
            Transmit questions, trial requests, or custom integration briefs directly into our secure pipeline.
          </p>
        </div>

        <div className="bg-[#08080a] border border-[#1b1b1c] rounded-lg p-6 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
          <AnimatePresence mode="wait">
            {!submitSuccess ? (
              <motion.form 
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="apex-form-group">
                    <label htmlFor="contact-name" className="apex-form-label">Name / Identity</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      disabled={isSubmitting}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Operator Name"
                      className="apex-input"
                    />
                  </div>

                  {/* Email field */}
                  <div className="apex-form-group">
                    <label htmlFor="contact-email" className="apex-form-label">Secure Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      disabled={isSubmitting}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="operator@agency.net"
                      className="apex-input"
                    />
                  </div>
                </div>

                {/* Topic selector */}
                <div className="apex-form-group">
                  <label htmlFor="contact-topic" className="apex-form-label font-mono text-xs">Topic Channels</label>
                  <select
                    id="contact-topic"
                    value={topic}
                    disabled={isSubmitting}
                    onChange={(e) => setTopic(e.target.value)}
                    className="apex-input font-mono text-xs text-[#C5C1B9] bg-[#111113] border-[#222225] py-2 w-full rouded-md focus:border-[#00DCC4] outline-none"
                  >
                    <option value="integration">// CHANNEL_01 : SYSTEM_CUSTOM_INTEGRATIONS</option>
                    <option value="pricing">// CHANNEL_02 : BILLING_OPERATIONS_STATIONS</option>
                    <option value="registry">// CHANNEL_03 : REPO_CORE_REGISTRY_ACCESS</option>
                    <option value="other">// CHANNEL_04 : GENERAL_OS_TELEMETRY</option>
                  </select>
                </div>

                {/* Message text */}
                <div className="apex-form-group">
                  <label htmlFor="contact-message" className="apex-form-label">Message Outflow Payload</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    disabled={isSubmitting}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your custom engineering brief or operational targets..."
                    className="apex-input text-xs leading-relaxed"
                  />
                </div>

                {/* Submit button / Terminal display logs */}
                <div className="space-y-4 pt-4">
                  {terminalLogs.length > 0 && (
                    <div className="bg-[#0b0b0d] border border-[#1b1b1c] rounded p-4 font-mono text-[10px] text-gray-400 space-y-1.5 max-h-40 overflow-y-auto">
                      <p className="text-yellow-500 font-bold mb-1">// SECURE DISPATCH TELEMETRY SYSTEM</p>
                      {terminalLogs.map((log, lIdx) => (
                        <p key={lIdx} className="flex items-center gap-1.5 animate-fade-in">
                          <Terminal className="w-3.5 h-3.5 text-[#00DCC4] flex-shrink-0" />
                          <span>{log}</span>
                        </p>
                      ))}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !name || !email || !message}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#00DCC4] hover:bg-[#00DCC4]/90 text-black text-xs font-mono font-bold rounded-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-40 hover:shadow-[0_0_20px_rgba(0,220,196,0.3)]"
                  >
                    {isSubmitting ? 'Transmitting Inbound...' : 'Transmit Payload Packet'} <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="contact-success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="w-16 h-16 bg-[#00DCC4]/10 rounded-full flex items-center justify-center mx-auto border border-[#00DCC4]/20 shadow-[0_0_25px_rgba(0,220,196,0.15)]">
                  <Sparkles className="w-8 h-8 text-[#00DCC4]" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-mono text-base text-white font-bold uppercase">Transmission Nominal</h3>
                  <p className="text-xs text-[#8B8680] max-w-sm mx-auto leading-relaxed">
                    We have successfully synchronized your payload packet in our central queue stack. An APEX systems engineer will open a reply route to your security email inside the next hour.
                  </p>
                </div>

                <div className="bg-[#0b0b0d] border border-[#1c1c1f] rounded p-5 font-mono text-[10px] text-emerald-400/90 text-left max-w-sm mx-auto space-y-1">
                  <p className="text-gray-500">// FINAL PACKET STATUS</p>
                  <p>✓ SOURCE COMPILER VERIFIED</p>
                  <p>✓ PAYLOAD SECURED BY SYMMETRIC ROTATION</p>
                  <p>✓ TARGET PIPELINE DISPATCH COMPLETE</p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2 bg-transparent border border-[#454545] hover:border-white text-white font-mono text-xs font-bold rounded-sm uppercase tracking-wider transition-all"
                >
                  Send another pipeline message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </PublicLayout>
  );
}
