import React from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CrashGame from './components/CrashGame';
import { setApiKey } from '@zoralabs/coins-sdk';

const queryClient = new QueryClient();

setApiKey(process.env.REACT_APP_ZORA_API_KEY || '');

const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(process.env.REACT_APP_RPC_URL),
  },
});

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-yellow-500 flex flex-col items-center justify-center p-4">
          <h1 className="text-4xl font-bold text-white mb-8">Zora-crang: Crash Gambling Simulator</h1>
          <p className="text-white mb-4">Powered by Zora Coins Protocol: Create and trade your crash coins!</p>
          <CrashGame />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;