'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 overflow-hidden">
      {/* Floating Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-20 animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-20 animate-[float_10s_ease-in-out_infinite_2s]"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-purple-200 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-20 animate-[float_12s_ease-in-out_infinite_4s]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="text-2xl font-bold gradient-text">AIMM</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all hover:scale-105 font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all hover:scale-105 font-medium">
                How It Works
              </a>
              <a href="#marketplace" className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all hover:scale-105 font-medium">
                Marketplace
              </a>
            </div>

            <button className="px-6 py-3 rounded-full gradient-bg text-white font-semibold btn-premium shadow-lg hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transition-all flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Connect Wallet
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-5xl mx-auto mb-20">
            <div className="inline-block mb-6">
              <span className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 text-purple-700 dark:text-purple-300 text-sm font-semibold backdrop-blur-sm border border-purple-200 dark:border-purple-800">
                ⚡ Powered by Monad Blockchain
              </span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="text-slate-900 dark:text-white">The Future of </span>
              <br />
              <span className="gradient-text">AI Monetization</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Real-time, trustless AI model marketplace. Pay per inference, earn instantly. 
              <br />
              No subscriptions, no intermediaries, just pure <span className="font-bold gradient-text">click-to-compute</span> economy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="group w-full sm:w-auto px-10 py-5 rounded-full gradient-bg text-white font-bold text-lg btn-premium shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all flex items-center justify-center gap-3">
                Explore Models
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="group w-full sm:w-auto px-10 py-5 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg border-2 border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-500 hover:scale-105 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                List Your Model
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-purple-100 dark:border-purple-900 hover:scale-105 transition-transform">
                <div className="text-5xl font-black gradient-text mb-2">$0.001</div>
                <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Per Inference</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-blue-100 dark:border-blue-900 hover:scale-105 transition-transform">
                <div className="text-5xl font-black gradient-text mb-2">&lt;100ms</div>
                <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Settlement Time</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-purple-100 dark:border-purple-900 hover:scale-105 transition-transform">
                <div className="text-5xl font-black gradient-text mb-2">0%</div>
                <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Hidden Fees</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div id="features" className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-5xl lg:text-6xl font-bold mb-4 text-slate-900 dark:text-white">
                Why Choose <span className="gradient-text">AIMM</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Built on cutting-edge technology for the future of AI commerce
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group p-10 rounded-3xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 card-hover hover:border-purple-300 dark:hover:border-purple-700 transition-all">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Instant Payments</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                  Monad&apos;s high-speed blockchain ensures micropayments settle in milliseconds.
                </p>
              </div>

              <div className="group p-10 rounded-3xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 card-hover hover:border-blue-300 dark:hover:border-blue-700 transition-all">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Trustless Billing</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                  Smart contracts handle all transactions. No intermediaries required.
                </p>
              </div>

              <div className="group p-10 rounded-3xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 card-hover hover:border-purple-300 dark:hover:border-purple-700 transition-all">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Pay-Per-Use</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                  Only pay for what you use. No subscriptions, no commitments.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div id="how-it-works" className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-5xl lg:text-6xl font-bold mb-4 text-slate-900 dark:text-white">
                How It <span className="gradient-text">Works</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Three simple steps to start using or monetizing AI models
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <div className="relative group">
                <div className="text-center">
                  <div className="relative inline-block mb-8">
                    <div className="w-20 h-20 rounded-full gradient-bg text-white text-3xl font-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <div className="absolute -inset-4 rounded-full gradient-bg opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Connect Wallet</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                    Link your Monad wallet in seconds
                  </p>
                </div>
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-20"></div>
              </div>

              <div className="relative group">
                <div className="text-center">
                  <div className="relative inline-block mb-8">
                    <div className="w-20 h-20 rounded-full gradient-bg text-white text-3xl font-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <div className="absolute -inset-4 rounded-full gradient-bg opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Choose Model</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                    Browse AI models by category
                  </p>
                </div>
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-20"></div>
              </div>

              <div className="group">
                <div className="text-center">
                  <div className="relative inline-block mb-8">
                    <div className="w-20 h-20 rounded-full gradient-bg text-white text-3xl font-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <div className="absolute -inset-4 rounded-full gradient-bg opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Run & Pay</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                    Get results instantly with automatic payments
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="relative overflow-hidden rounded-[2.5rem] p-16 text-center gradient-bg shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
                Ready to Join the AI Revolution?
              </h2>
              <p className="text-xl lg:text-2xl text-white/90 mb-10">
                Whether you&apos;re a developer or user, AIMM is your gateway.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <button className="group px-10 py-5 rounded-full bg-white text-purple-600 font-bold text-lg hover:bg-slate-50 transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-3">
                  Start Building
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button className="group px-10 py-5 rounded-full bg-white/20 text-white font-bold text-lg border-2 border-white/40 hover:bg-white/30 transition-all hover:scale-105 backdrop-blur-sm flex items-center justify-center gap-3">
                  View Documentation
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-slate-200 dark:border-slate-800 py-16 px-6 lg:px-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-2xl">AI</span>
              </div>
              <span className="text-3xl font-black gradient-text">AIMM</span>
            </div>
            
            <div className="flex gap-10 text-base font-medium text-slate-600 dark:text-slate-400">
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Docs</a>
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">GitHub</a>
            </div>

            <p className="text-base text-slate-600 dark:text-slate-400 font-medium">
              © 2025 AIMM. Powered by <span className="gradient-text font-bold">Monad</span>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
