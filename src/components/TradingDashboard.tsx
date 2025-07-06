import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

interface TradingDashboardProps {
  coinAddress: string;
  coinData: { volume: number; price: number; rewards: number } | null;
}

const TradingDashboard: React.FC<TradingDashboardProps> = ({ coinAddress, coinData }) => {
  const chartData = {
    labels: ['1m', '2m', '3m', '4m', '5m'], // Simplified time labels
    datasets: [
      {
        label: 'Coin Price',
        data: coinData ? [coinData.price, coinData.price * 1.1, coinData.price * 1.2, coinData.price * 1.15, coinData.price] : [],
        borderColor: '#ff4d4f',
        fill: false,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-zora-bg rounded-lg p-6 mt-4"
    >
      <h2 className="text-2xl font-bold text-zora-accent mb-4">Live Trading</h2>
      <p className="text-white mb-2">Coin Address: {coinAddress}</p>
      {coinData && (
        <>
          <p className="text-white mb-2">Trading Volume: {coinData.volume} ZORA</p>
          <p className="text-white mb-4">Creator Rewards: {coinData.rewards} ZORA</p>
          <Line data={chartData} />
        </>
      )}
    </motion.div>
  );
};

export default TradingDashboard;