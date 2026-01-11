import { useParams, Link } from 'react-router-dom'
import { useWaitForTransactionReceipt, useTransaction } from 'wagmi'
import { motion } from 'framer-motion'
import { formatEther } from 'viem'

export function TransactionStatus() {
    const { hash } = useParams<{ hash: `0x${string}` }>()
    const { data: receipt, isLoading: isWaiting } = useWaitForTransactionReceipt({ hash })
    const { data: transaction } = useTransaction({ hash })

    // Determine status
    const isSuccess = receipt?.status === 'success'
    const isFailed = receipt?.status === 'reverted'

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-secondary/80 glass-gloss border border-white/5 rounded-2xl p-8 md:p-12 relative overflow-hidden"
            >
                {/* Status Indicator */}
                <div className="flex justify-center mb-8">
                    {isWaiting && (
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full border-4 border-primary/20 animate-[spin_3s_linear_infinite]"></div>
                            <div className="absolute inset-0 w-24 h-24 rounded-full border-t-4 border-primary animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center font-mono text-primary font-bold text-lg animate-pulse">
                                PENDING
                            </div>
                        </div>
                    )}
                    {isSuccess && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-24 h-24 rounded-full bg-primary/10 border-4 border-primary flex items-center justify-center shadow-[0_0_50px_rgba(0,255,65,0.4)]"
                        >
                            <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </motion.div>
                    )}
                    {isFailed && (
                        <div className="w-24 h-24 rounded-full bg-red-900/10 border-4 border-red-500 flex items-center justify-center shadow-[0_0_50px_rgba(255,0,0,0.4)]">
                            <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    )}
                </div>

                <h2 className="text-3xl font-bold text-center mb-6 text-glow">
                    {isWaiting ? 'Transaction Processing' : isSuccess ? 'Transfer Successful' : 'Transaction Failed'}
                </h2>

                {/* Transaction Details */}
                <div className="space-y-4 mb-8">
                    <div className="bg-black/40 rounded-lg p-4 border border-white/5 flex flex-col gap-1">
                        <span className="text-gray-500 text-xs uppercase tracking-wider font-mono">Status</span>
                        <span className={`font-mono font-bold ${isWaiting ? 'text-yellow-400' : isSuccess ? 'text-primary' : 'text-red-500'}`}>
                            {isWaiting ? 'Confirming on Blockchain...' : isSuccess ? 'Confirmed' : 'Reverted'}
                        </span>
                    </div>

                    <div className="bg-black/40 rounded-lg p-4 border border-white/5 flex flex-col gap-1">
                        <span className="text-gray-500 text-xs uppercase tracking-wider font-mono">Amount</span>
                        <span className="text-white text-xl font-mono">
                            {transaction?.value ? `${formatEther(transaction.value)} ETH` : 'Loading...'}
                        </span>
                    </div>

                    <div className="bg-black/40 rounded-lg p-4 border border-white/5 flex flex-col gap-1">
                        <span className="text-gray-500 text-xs uppercase tracking-wider font-mono">Transaction Hash</span>
                        <a
                            href={`https://sepolia.etherscan.io/tx/${hash}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary hover:text-neon-green break-all font-mono text-sm underline transition-colors"
                        >
                            {hash}
                        </a>
                    </div>
                </div>

                {/* Home Button */}
                <Link to="/" className="block w-full">
                    <button className="w-full py-4 bg-accent hover:bg-white/10 border border-white/10 text-white font-bold uppercase tracking-widest rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer backdrop-blur-md">
                        ← Back to Home
                    </button>
                </Link>

            </motion.div>
        </div>
    )
}
