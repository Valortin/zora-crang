import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  coinAddress: string;
  userAddress: string;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose, coinAddress, userAddress }) => {
  const [step, setStep] = useState(0);

  // Fetch tutorial progress
  const { data: session } = useQuery({
    queryKey: ['session', coinAddress],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5000/api/sessions/${coinAddress}`);
      return response.data;
    },
    enabled: !!coinAddress,
  });

  // Update tutorial progress
  const mutation = useMutation({
    mutationFn: async (progress: number) => {
      const response = await axios.put(`http://localhost:5000/api/sessions/${coinAddress}/tutorial`, { progress });
      return response.data;
    },
  });

  const steps = [
    {
      title: 'Connect Your Wallet',
      description: 'Use MetaMask to connect to Base Sepolia and enable Zora Coins.',
      action: 'Connect Wallet',
    },
    {
      title: 'Mint a Crash Coin',
      description: 'Start a game to mint a unique ERC-20 coin, tradable on Uniswap V4.',
      action: 'Start Game',
    },
    {
      title: 'Place a Bet',
      description: 'Enter your Zora20 token amount and watch the multiplier rise!',
      action: 'Place Bet',
    },
    {
      title: 'Share Your Coin',
      description: 'Share your crash coin’s referral link to earn 15% of trading fees.',
      action: 'Copy Link',
    },
  ];

  const handleNext = () => {
    const nextStep = step + 1;
    if (nextStep < steps.length) {
      setStep(nextStep);
      mutation.mutate(nextStep);
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-zora-bg rounded-lg p-6 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-zora-accent mb-4">{steps[step].title}</h2>
        <p className="text-white mb-4">{steps[step].description}</p>
        <div className="w-full bg-gray-600 h-2 rounded-full mb-4">
          <div
            className="bg-zora-accent h-2 rounded-full"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
        <button
          onClick={handleNext}
          className="bg-zora-accent text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          {step === steps.length - 1 ? 'Finish' : steps[step].action}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default TutorialModal;