import React, { useState, useEffect, useCallback } from 'react';
import { useAccount, useWalletClient, usePublicClient } from 'wagmi';
import { Address, parseEther } from 'viem';
import { base } from 'viem/chains'; // Add this import
import { tradeCoin, getCoin } from '@zoralabs/coins-sdk';
import { motion, AnimatePresence } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CrashGame: React.FC = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const [betAmount, setBetAmount] = useState<string>('0.1');
  const [multiplier, setMultiplier] = useState<number>(1);
  const [gameState, setGameState] = useState<'idle' | 'running' | 'crashed'>('idle');
  const [crashedAt, setCrashedAt] = useState<number | null>(null);
  const [chartData, setChartData] = useState<number[]>([1]);
  const [coinAddress] = useState<Address>('0xYourCoinAddress'); // Replace with actual Zora Coin address
  const [coinData, setCoinData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch coin data
  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await getCoin({ address: coinAddress, chain: base.id });
        setCoinData(response.data?.zora20Token);
      } catch (err: any) {
        setError('Failed to fetch coin data: ' + err.message);
      }
    };
    fetchCoinData();
  }, [coinAddress]);

  // Crash game logic
  const startGame = useCallback(async () => {
    if (!address || !walletClient || !publicClient) {
      setError('Please connect your wallet');
      return;
    }

    setGameState('running');
    setMultiplier(1);
    setChartData([1]);
    setCrashedAt(null);

    // Simulate crash game
    const crashPoint = Math.random() * 5 + 1; // Random crash between 1x and 6x
    let currentMultiplier = 1;
    const interval = setInterval(() => {
      if (currentMultiplier >= crashPoint) {
        setGameState('crashed');
        setCrashedAt(currentMultiplier);
        clearInterval(interval);
        return;
      }
      currentMultiplier += 0.1;
      setMultiplier(parseFloat(currentMultiplier.toFixed(2)));
      setChartData((prev) => [...prev, currentMultiplier]);
    }, 100);

    // Place bet by buying Zora Coins
    try {
      const buyParams = {
        direction: 'buy' as const,
        target: coinAddress,
        args: {
          recipient: address,
          orderSize: parseEther(betAmount),
          minAmountOut: 0n,
        },
      };
      const result = await tradeCoin(buyParams, walletClient, publicClient);
      console.log('Bet placed:', result);
    } catch (err: any) {
      setError('Failed to place bet: ' + err.message);
      setGameState('idle');
      clearInterval(interval);
    }
  }, [address, walletClient, publicClient, betAmount, coinAddress]);

  const cashOut = useCallback(async () => {
    if (gameState !== 'running' || !address || !walletClient || !publicClient) return;

    setGameState('idle');
    try {
      const sellParams = {
        direction: 'sell' as const,
        target: coinAddress,
        args: {
          recipient: address,
          orderSize: parseEther((parseFloat(betAmount) * multiplier).toString()),
          minAmountOut: 0n,
        },
      };
      const result = await tradeCoin(sellParams, walletClient, publicClient);
      console.log('Cashed out:', result);
    } catch (err: any) {
      setError('Failed to cash out: ' + err.message);
    }
  }, [gameState, address, walletClient, publicClient, betAmount, multiplier, coinAddress]);

  // Chart configuration
  const chartConfig = {
    labels: chartData.map((_, i) => i.toString()),
    datasets: [
      {
        label: 'Multiplier',
        data: chartData,
        borderColor: '#ff4d4f',
        backgroundColor: 'rgba(255, 77, 79, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="w-full max-w-2xl bg-zora-secondary rounded-lg p-6">
      {coinData && (
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">{coinData.name} ({coinData.symbol})</h2>
          <p>Market Cap: ${coinData.marketCap}</p>
          <p>24h Volume: ${coinData.volume24h}</p>
        </div>
      )}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-6">
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded text-white"
          placeholder="Bet amount (ETH)"
          disabled={gameState === 'running'}
        />
      </div>
      <motion.div
        className="relative h-64"
        animate={{ scale: gameState === 'running' ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Line
          data={chartConfig}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, max: 6 } },
          }}
        />
        {gameState === 'crashed' && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-red-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Crashed at {crashedAt?.toFixed(2)}x!
          </motion.div>
        )}
      </motion.div>
      <div className="flex justify-between mt-4">
        <motion.button
          className="px-4 py-2 bg-zora-accent text-white rounded disabled:opacity-50"
          onClick={startGame}
          disabled={gameState === 'running' || !address}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Start Game
        </motion.button>
        <motion.button
          className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          onClick={cashOut}
          disabled={gameState !== 'running'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Cash Out ({multiplier.toFixed(2)}x)
        </motion.button>
      </div>
    </div>
  );
};

export default CrashGame;