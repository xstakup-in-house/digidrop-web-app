'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Send, CheckCircle2, ChevronRight, Mail, Wallet, Users, Link as LinkIcon, Info } from "lucide-react";

interface FormState {
  communityName: string;
  platform: string;
  inviteLink: string;
  memberCount: string;
  walletAddress: string;
  email: string;
  feedback: string;
}

const INITIAL_FORM: FormState = {
  communityName: "",
  platform: "",
  inviteLink: "",
  memberCount: "",
  walletAddress: "",
  email: "",
  feedback: "",
};

export default function OnboardingForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const validate = () => {
    if (!form.walletAddress.trim()) return "BNB Wallet Address is required.";
    if (!/^0x[a-fA-F0-9]{40}$/.test(form.walletAddress)) return "Please enter a valid BNB wallet address (0x...).";
    if (!form.email.trim()) return "Email Address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Please enter a valid email address.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const payload = {
        ...form,
        'bot-field': (e.currentTarget.elements.namedItem('bot-field') as HTMLInputElement)?.value || "",
      };

      const response = await fetch("https://api.digidrops.xyz/api/testnet/onboard/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit coordinates.");
      }
    } catch (err: any) {
      setError(err.message || "Scanners are offline. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isSuccess ? (
        <motion.div
          key="form"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full glass-card p-6 sm:p-8"
        >
          <form 
            onSubmit={handleSubmit} 
            name="digidrops-testnet"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="digidrops-testnet" />
            <p className="hidden">
              <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                <Users className="w-3 h-3" />
                Community Profile (Optional)
              </div>
              
              <InputField 
                name="communityName" 
                placeholder="Community Name (Optional)" 
                value={form.communityName} 
                onChange={handleChange} 
              />
              
              <div className="grid grid-cols-2 gap-3">
                <InputField 
                  name="memberCount" 
                  type="number" 
                  placeholder="Size (Optional)" 
                  value={form.memberCount} 
                  onChange={handleChange} 
                />
                <div className="relative">
                  <select
                    name="platform"
                    value={form.platform}
                    onChange={handleChange}
                    className="w-full h-[46px] bg-white/[0.03] border border-white/10 rounded-xl px-4 text-xs text-slate-300 outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Platform (Opt)</option>
                    <option>Telegram</option>
                    <option>Discord</option>
                    <option>X / Twitter</option>
                  </select>
                  <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 rotate-90 pointer-events-none" />
                </div>
              </div>

              <InputField 
                name="inviteLink" 
                placeholder="Link (Optional)" 
                value={form.inviteLink} 
                onChange={handleChange} 
                icon={<LinkIcon className="w-3 h-3" />}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                <Wallet className="w-3 h-3" />
                Identification (Required)
              </div>
              
              <InputField 
                name="walletAddress" 
                placeholder="BNB Wallet (0x...) *" 
                value={form.walletAddress} 
                onChange={handleChange} 
              />
              
              <InputField 
                name="email" 
                type="email" 
                placeholder="Email Address *" 
                value={form.email} 
                onChange={handleChange} 
                icon={<Mail className="w-3 h-3" />}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                <Info className="w-3 h-3" />
                Final Words
              </div>
              <textarea
                name="feedback"
                placeholder="What are your expectations for the DigiDrops ecosystem?"
                value={form.feedback}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-xs text-slate-300 outline-none focus:border-blue-500/50 transition-all h-24 resize-none"
              />
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-[10px] font-medium text-center">
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 h-[52px] rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                  <Send className="w-4 h-4" />
                </motion.div>
              ) : (
                <>
                  Apply to Testnet
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full glass-card p-10 text-center space-y-6"
        >
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Welcome to the Vanguard.</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your application is being reviewed with care. You'll receive a personal welcome in your inbox shortly.
            </p>
          </div>
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-[11px] text-slate-500 text-left space-y-2">
            <div className="flex items-center gap-2 text-emerald-400">
              <div className="w-1 h-1 rounded-full bg-current" />
              Next: Elite Access Pass Review
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-slate-700" />
              Phase 1 Testnet Onboarding
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface InputFieldProps {
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}

function InputField({ name, type = "text", placeholder, value, onChange, icon }: InputFieldProps) {
  return (
    <div className="relative group">
      {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">{icon}</div>}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className={`w-full h-[46px] bg-white/[0.03] border border-white/10 rounded-xl ${icon ? 'pl-10' : 'px-4'} pr-4 text-xs text-slate-300 outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-600`}
      />
    </div>
  );
}
