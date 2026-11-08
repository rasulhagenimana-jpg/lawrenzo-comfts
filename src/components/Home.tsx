import React from 'react';
import { Camera, Upload, ShieldCheck, Lock, Sparkles, CheckCircle2, FileText, Download, Zap, HelpCircle } from 'lucide-react';
import { ActiveTab } from '../types';

interface HomeProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  const faqs = [
    {
      q: 'Does PhotoVault alter or enhance my old photographs with AI?',
      a: 'Never. PhotoVault strictly adheres to original image preservation. We do not use AI, do not apply filters, do not adjust colors or contrast automatically, and do not beautify faces. Your photographs remain exactly as captured.'
    },
    {
      q: 'Are my private family photographs uploaded to a public cloud?',
      a: 'No. All image processing happens locally within your browser using secure client-side APIs. Your photos remain on your device unless you choose to export them.'
    },
    {
      q: 'Is PhotoVault really 100% free with no hidden fees?',
      a: 'Yes. PhotoVault is entirely free with no subscriptions, paid tiers, payment gateways, or registration requirements. You can start scanning and downloading immediately.'
    },
    {
      q: 'What equipment do I need to digitize my physical prints?',
      a: 'You can use your smartphone rear camera, computer webcam, or any desktop scanner software that saves images (JPG, PNG, TIFF, PDF) to your computer.'
    },
    {
      q: 'How do I download my scanned photographs?',
      a: 'You can download individual photos in original resolution, export as JPG/PNG, bundle multiple photos into a ZIP archive, or export an archival PDF document.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#101827] text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))]" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              Free Online Photo Digitization Platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] max-w-2xl">
              Bring Your Printed Memories Into the Digital World.
            </h1>
            <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
              Convert physical printed photographs, vintage albums, and scanned archives into permanent digital files. 100% private, zero AI alterations, and completely free.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setActiveTab('studio')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-3 text-base"
              >
                <Camera className="w-5 h-5" />
                START SCANNING
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-2xl border border-slate-700 transition-all flex items-center gap-3 text-base"
              >
                <Upload className="w-5 h-5" />
                UPLOAD PHOTOS
              </button>
            </div>
            <div className="flex items-center gap-6 pt-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                No Registration Required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Original Fidelity Preserved
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Free Forever
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-30 blur-xl" />
              <div className="relative rounded-3xl bg-[#172B4D] border border-slate-700 p-6 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs text-slate-400 font-mono">photovault.scanner.live</span>
                </div>
                <div className="aspect-[4/3] rounded-2xl bg-[#101827] border border-slate-800 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors" />
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/30">
                    <Camera className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">Live Camera & Scanner Studio</h3>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Position your printed photo in good natural light and capture instantly with zero quality loss.
                  </p>
                  <button
                    onClick={() => setActiveTab('studio')}
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
                  >
                    Open Studio
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-[#101827] border border-slate-800">
                    <span className="block text-lg font-bold text-blue-400">100%</span>
                    <span className="text-[11px] text-slate-400">Local Privacy</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#101827] border border-slate-800">
                    <span className="block text-lg font-bold text-emerald-400">0%</span>
                    <span className="text-[11px] text-slate-400">AI Tampering</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#101827] border border-slate-800">
                    <span className="block text-lg font-bold text-amber-400">Free</span>
                    <span className="text-[11px] text-slate-400">No Subscriptions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-[#131d2e] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-semibold tracking-wider text-blue-400 uppercase">Simple 3-Step Process</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">How PhotoVault Works</h3>
            <p className="text-slate-400 text-sm">
              Digitizing physical albums and loose prints has never been faster or more secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#172B4D] border border-slate-700 relative">
              <span className="absolute top-6 right-6 text-3xl font-black text-slate-700/50">01</span>
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-6 border border-blue-500/30">
                <Camera className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Capture or Upload</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Use your smartphone camera, webcam, or existing desktop scanner files (JPG, PNG, TIFF, PDF).
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#172B4D] border border-slate-700 relative">
              <span className="absolute top-6 right-6 text-3xl font-black text-slate-700/50">02</span>
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-6 border border-indigo-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Original Preservation</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Your photos remain untouched by artificial intelligence, filters, or automatic color adjustments.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#172B4D] border border-slate-700 relative">
              <span className="absolute top-6 right-6 text-3xl font-black text-slate-700/50">03</span>
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-6 border border-emerald-500/30">
                <Download className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Organize & Export</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Review your personal gallery and download individual files, ZIP bundles, or archival PDF portfolios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-semibold tracking-wider text-blue-400 uppercase">Designed for Authenticity</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Why Choose PhotoVault</h3>
          <p className="text-slate-400 text-sm">
            Built specifically to preserve family history without cloud tracking or intrusive paywalls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#172B4D]/60 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Zero AI Tampering</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never modify, beautify, or reconstruct your photographs with artificial intelligence.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#172B4D]/60 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Local Privacy</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Processed directly in your browser. Your private memories are never exposed or stored on public servers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#172B4D]/60 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Multiple Formats</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Support for JPG, PNG, TIFF, PDF files and direct smartphone/webcam camera captures.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#172B4D]/60 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">No Subscriptions</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              100% free with no credit cards, no login walls, and no hidden trial periods.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-[#131d2e] border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-xs font-semibold tracking-wider text-blue-400 uppercase">Got Questions?</h2>
            <h3 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#172B4D] border border-slate-700/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left font-semibold text-white flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base">{faq.q}</span>
                  <span className={`w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs transition-transform ${openFaq === idx ? 'rotate-180 bg-blue-600 text-white' : 'text-slate-400'}`}>
                    ↓
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-sm text-slate-300 leading-relaxed border-t border-slate-700/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
