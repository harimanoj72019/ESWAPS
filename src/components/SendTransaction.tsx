import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

export function SendTransaction() {
    const { data: hash, error, isPending, sendTransaction } = useSendTransaction()
    useWaitForTransactionReceipt({ hash })
    const navigate = useNavigate()

    const [to, setTo] = useState('')
    const [amount, setAmount] = useState('')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        sendTransaction({
            to: to as `0x${string}`,
            value: parseEther(amount),
        }, {
            onSuccess: (data) => {
                navigate(`/status/${data}`)
            }
        })
    }

    return (
        <div className="w-full max-w-md p-8 bg-accent/50 border border-primary/20 rounded-xl backdrop-blur-sm relative overflow-hidden group">
            {/* Decorative gradient blob */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-500"></div>

            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight flex items-center gap-2">
                <span className="w-2 h-8 bg-primary block rounded-sm"></span>
                Send Transaction
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
                <div className="space-y-2">
                    <label htmlFor="address" className="text-xs text-primary font-mono uppercase tracking-wider">Recipient Address</label>
                    <input
                        id="address"
                        name="address"
                        placeholder="0x0000000000000000000000000000000000000000"
                        required
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="w-full bg-secondary border border-gray-800 focus:border-primary text-white px-4 py-3 rounded outline-none transition-colors font-mono text-sm placeholder:text-gray-700"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="amount" className="text-xs text-primary font-mono uppercase tracking-wider">Amount (ETH)</label>
                    <input
                        id="amount"
                        name="amount"
                        placeholder="0.05"
                        required
                        step="0.000000000000000001"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-secondary border border-gray-800 focus:border-primary text-white px-4 py-3 rounded outline-none transition-colors font-mono text-sm placeholder:text-gray-700"
                    />
                </div>

                <button
                    disabled={isPending || !to || !amount}
                    type="submit"
                    className="mt-4 w-full py-4 bg-primary text-black font-bold text-lg uppercase tracking-widest hover:bg-neon-green disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] rounded cursor-pointer"
                >
                    {isPending ? 'Confirming...' : 'Send Now'}
                </button>

                {error && (
                    <div className="mt-2 p-3 bg-red-900/20 border border-red-900/50 rounded text-red-400 text-xs font-mono break-words">
                        Error: {(error as any).shortMessage || error.message}
                    </div>
                )}
            </form>
        </div>
    )
}

