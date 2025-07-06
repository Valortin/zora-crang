import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { createCoin, getCoin, tradeCoin, setApiKey } from '@zoralabs/coins-sdk';
import { motion } from 'framer-motion';
import TradingDashboard from './TradingDashboard';
import ReferralShare from './ReferralShare';

setApiKey(process.env.REACT_APP_ZORA_API_KEY || '');

const CrashGame: React.FC = () => {
  const { address } = useAccount();
  const [coinAddress, setCoinAddress] = useState<string>('YOUR_COIN_ADDRESS');
  const [betAmount, setBetAmount] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [gameStatus, setGameStatus] = useState<'idle' | 'running' | 'crashed'>('idle');
  const [coinData, setCoinData] = useState<{ volume: number; price: number; rewards: number } | null>(null);

  // Mint a new crash coin
  const mintCrashCoin = async () => {
    try {
      const coin = await createCoin({
        name: `CrashRound-${Date.now()}`,
        symbol: `CRASH${Date.now()}`,
        supply: 1_000_000_000,
        uniswapPool: true,
      });
      setCoinAddress(coin.address);
      return coin;
    } catch (error) {
      console.error('Error minting crash coin:', error);
    }
  };

  // Fetch coin trading data
  const fetchCoinData = async () => {
    if (!coinAddress) return;
    try {
      const coin = await getCoin(coinAddress);
      setCoinData({
        volume: coin.tradingVolume || 0,
        price: coin.currentPrice || 0,
        rewards: coin.creatorRewards || 0,
      });
    } catch (error) {
      console.error('Error fetching coin data:', error);
    }
  };

  // Start game
  const startGame = async () => {
    if (!address || !betAmount) return;
    setGameStatus('running');
    const coin = await mintCrashCoin();
    if (coin) {
      // Simulate multiplier increase (replace with real logic)
      const interval = setInterval(() => {
        setMultiplier(prev => {
          if (prev >= 10) {
            setGameStatus('crashed');
            clearInterval(interval);
            return prev;
          }
          return prev + 0.1;
        });
      }, 100);
    }
  };

  // Cash out
  const cashOut = async () => {
    if (gameStatus !== 'running') return;
    try {
      await tradeCoin({
        coinAddress,
        amount: betAmount * multiplier,
        tradeType: 'sell',
        minAmountOut: BigInt(0),
      });
      setGameStatus('idle');
      setMultiplier(1);
    } catch (error) {
      console.error('Error cashing out:', error);
    }
  };

  useEffect(() => {
    if (coinAddress) fetchCoinData();
  }, [coinAddress]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl bg-zora-secondary rounded-lg p-6 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-zora-accent mb-4">Crash Game</h2>
      <div className="mb-4">
        <label className="text-white">Bet Amount (ZORA):</label>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          className="ml-2 p-2 rounded bg-zora-bg text-white"
        />
      </div>
      <div className="mb-4">
        <p className="text-white">Multiplier: {multiplier.toFixed(2)}x</p>
        <p className="text-white">Status: {gameStatus}</p>
      </div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={startGame}
          disabled={gameStatus !== 'idle'}
          className="bg-zora-accent text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Start Game
        </button>
        <button
          onClick={cashOut}
          disabled={gameStatus !== 'running'}
          className="bg-zora-accent text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Cash Out
        </button>
      </div>
      <TradingDashboard coinAddress={coinAddress} coinData={coinData} />
      <ReferralShare userAddress={address || ''} coinAddress={coinAddress} />
    </motion.div>
  );
};

export default CrashGame;