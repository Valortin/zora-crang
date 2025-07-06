import React from 'react';
import { motion } from 'framer-motion';

interface ReferralShareProps {
  userAddress: string;
  coinAddress: string;
}

const ReferralShare: React.FC<ReferralShareProps> = ({ userAddress, coinAddress }) => {
  const shareLink = `https://zora.co/trade?ref=${userAddress}&coin=${coinAddress}`;
  const referralRewards = 0.015; // Mock data; replace with getCoin().tradeReferralRewards

  const copyToClipboard = () => {
    navigator.clipboard.write(shareLink);
    alert('Referral link copied!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-zora-secondary rounded-lg p-4 mt-4"
    >
      <h2 className="text-xl font-bold text-zora-accent mb-2">Share Your Crash Coin</h2>
      <p className="text-white mb-2">Referral Earnings: {referralRewards} ZORA</p>
      <button
        onClick={copyToClipboard}
        className="bg-zora-accent text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Copy Referral Link
      </button>
    </motion.div>
  );
};

export default ReferralShare;