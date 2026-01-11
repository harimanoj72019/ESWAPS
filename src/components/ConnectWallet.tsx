import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { formatEther } from 'viem'

export function ConnectWallet() {
    const { address, isConnected } = useAccount()
    const { connectors, connect } = useConnect()
    const { disconnect } = useDisconnect()
    const { data: balance } = useBalance({ address })

    if (isConnected) {
        return (
            <div className="flex items-center gap-4 bg-secondary border border-primary/30 p-4 rounded-lg shadow-[0_0_10px_rgba(0,255,65,0.1)]">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-mono">Connected as</span>
                    <span className="text-primary font-mono font-bold tracking-wider">
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                    </span>
                </div>
                <div className="h-8 w-px bg-primary/20 mx-2"></div>
                <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-400 font-mono">Balance</span>
                    <span className="text-white font-bold">
                        {balance ? `${parseFloat(formatEther(balance.value)).toFixed(4)} ${balance.symbol}` : 'Loading...'}
                    </span>
                </div>
                <button
                    onClick={() => disconnect()}
                    className="ml-4 px-4 py-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/50 rounded transition-colors text-sm font-mono cursor-pointer"
                >
                    Disconnect
                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2">
            {connectors.map((connector) => (
                <button
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                    className="px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary hover:border-neon-green rounded-lg transition-all duration-300 font-mono font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(0,255,65,0.2)] hover:shadow-[0_0_25px_rgba(0,255,65,0.4)] cursor-pointer"
                >
                    Connect {connector.name}
                </button>
            ))}
        </div>
    )
}
