import { Providers } from './Providers'
import { ConnectWallet } from './components/ConnectWallet'
import { SendTransaction } from './components/SendTransaction'
import { TransactionStatus } from './pages/TransactionStatus'
import { useAccount } from 'wagmi'
import { Routes, Route, HashRouter } from 'react-router-dom'

function AppContent() {
  const { isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-sans text-white">
      {/* Shiny Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-green/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>

      <header className="fixed top-0 w-full p-6 flex justify-between items-center z-50 backdrop-blur-sm border-b border-white/5">
        <h1 className="text-3xl font-bold tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          <span className="text-primary text-glow">E</span>SWAPS
        </h1>
        <div className="hidden md:block">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 glass-gloss">
            <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse shadow-[0_0_8px_#39ff14]"></span>
            <span className="text-xs font-mono text-neon-green tracking-wide">SEPOLIA NETWORK</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-12 px-4 flex flex-col items-center justify-center min-h-screen gap-12">
        <Routes>
          <Route path="/" element={
            <>
              <div className="text-center space-y-6 max-w-2xl">
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
                  Send Crypto <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-neon-green shine-effect">Instantly.</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mix-blend-plus-lighter">
                  Experience the future of Web3 transfers. Secure, fast, and beautifully designed for the Sepolia Testnet.
                </p>
              </div>

              <ConnectWallet />

              {isConnected && (
                <div className="w-full flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <SendTransaction />
                </div>
              )}
            </>
          } />
          <Route path="/status/:hash" element={<TransactionStatus />} />
        </Routes>
      </main>

      <footer className="absolute bottom-6 w-full text-center text-gray-600 text-xs font-mono pointer-events-none">
        Built with Wagmi + Vite + Tailwind v4
      </footer>
    </div>
  )
}

function App() {
  return (
    <Providers>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </Providers>
  )
}

export default App

