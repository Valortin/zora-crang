import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { createCoin, getCoin, tradeCoin, setApiKey } from '@zoralabs/coins-sdk';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import TradingDashboard from './TradingDashboard';
import ReferralShare from './ReferralShare';
import TutorialModal from './TutorialModal';

setApiKey(process.env.REACT_APP_ZORA_API_KEY || '');

const CrashGame: React.FC = () => {
  const { address } = useAccount();
  const [coinAddress, setCoinAddress] = useState<string>('YOUR_COIN_ADDRESS');
  const [betAmount, setBetAmount] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [gameStatus, setGameStatus] = useState<'idle' | 'running' | 'crashed'>('idle');
  const [coinData, setCoinData] = useState<{ volume: number; price: number; rewards: number } | null>(null);
  const [showTutorial, setShowTutorial] = useState<boolean>(true);
  const [showWhyZora, setShowWhyZora] = useState<boolean>(false);

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

  // Fetch AI hint
  const { data: aiHint } = useQuery({
    queryKey: ['aiHint', coinAddress],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5000/api/ai/hints/${coinAddress}`);
      return response.data;
    },
    enabled: gameStatus === 'running' && !!coinAddress,
  });

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
      await axios.post('http://localhost:5000/api/sessions', {
        coinAddress: coin.address,
        tradingVolume: 0,
        currentPrice: 0,
        creatorRewards: 0,
        userAddress: address,
        tutorialProgress: 0,
      });
      return coin;
    } catch (error) {
      console.error('Error minting crash coin:', error);
    }
  };

  // Start game
  const startGame = async () => {
    if (!address || !betAmount) return;
    setGameStatus('running');
    const coin = await mintCrashCoin();
    if (coin) {
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
      {aiHint && gameStatus === 'running' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-zora-accent text-white p-4 rounded-lg absolute top-4 right-4"
        >
          <p>{aiHint.message}</p>
          <p>Confidence: {(aiHint.confidence * 100).toFixed(0)}%</p>
        </motion.div>
      )}
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
        <button
          onClick={() => setShowTutorial(true)}
          className="bg-zora-bg text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Show Tutorial
        </button>
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: showWhyZora ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="bg-zora-secondary p-4 rounded-lg">
          <h3 className="text-xl font-bold text-zora-accent mb-2">Why Zora Coins?</h3>
          <p className="text-white">Mint a unique crash coin for each game, trade it instantly on Uniswap V4, and earn 1% of every trade as the creator. Share your coin’s referral link to earn 15% of trading fees, powered by Zora’s creator economy!</p>
        </div>
      </motion.div>
      <button
        onClick={() => setShowWhyZora(!showWhyZora)}
        className="text-zora-accent mt-2 hover:underline"
      >
        {showWhyZora ? 'Hide' : 'Why Zora Coins?'}
      </button>
      <TradingDashboard coinAddress={coinAddress} coinData={coinData} />
      <ReferralShare userAddress={address || ''} coinAddress={coinAddress} />
      <TutorialModal
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
        coinAddress={coinAddress}
        userAddress={address || ''}
      />
    </motion.div>
  );
};

export default CrashGame;