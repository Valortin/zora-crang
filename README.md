# Zora-crang: Crash Gambling Simulator on Base

Zora-crang is a decentralized application (dApp) built on the Base blockchain, delivering a crash gambling simulator that showcases the power of Zora’s Coins Protocol. Players can mint unique ERC-20 “crash coins” per game session, trade them instantly on Uniswap V4, and earn 1% trading fees, highlighting the protocol’s instant liquidity and creator economy. A real-time trading dashboard, styled with Tailwind CSS and animated with Framer Motion, displays coin prices and rewards, making the protocol’s benefits tangible. Social sharing features enable players to distribute referral links, earning 15% of trading fees, driving engagement akin to Zora’s attention economy. 

The app leverages Base’s low-cost transactions for seamless micro-betting and trading. The vibrant UI, tested with a `bg-yellow-500` homepage, ensures an engaging experience. Zora-crang demonstrates the fusion of blockchain gaming, DeFi, and AI-driven development, positioning it as a trendsetter in the creator-driven Web3 space.

## Features

- **Crash Gambling Game**: Bet Zora20 tokens, watch the multiplier rise, and cash out before the crash, visualized with `react-chartjs-2`.
- **Player-Created Crash Coins**: Mint unique ERC-20 coins per game session using Zora’s Coins SDK, tradable on Uniswap V4 with 1% creator fees.
- **Real-Time Trading Dashboard**: Displays live trading volume, prices, and creator rewards, styled with Tailwind CSS (`bg-zora-bg`, `text-zora-accent`).
- **Referral Sharing**: Share crash coin links to earn 15% of trading fees, enhancing social engagement.
- **Responsive UI**: Custom themes (`zora-bg`, `zora-accent`, `zora-secondary`) with Framer Motion animations for dynamic interactions.
- **Wallet Connectivity**: Seamless integration with MetaMask via WAGMI and Viem, supporting Base mainnet or Sepolia.
- **Scalability**: Leverages Base’s low-cost, high-speed transactions for frequent bets and trades.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion, `react-chartjs-2`, Chart.js
- **Blockchain**: Base (mainnet/Sepolia), Zora Coins SDK, WAGMI, Viem
- **Build Tools**: Create React App (`react-scripts@5.0.1`), PostCSS, Autoprefixer
- **Dependencies**: `@tanstack/react-query`, `react@18.3.1`, `typescript@4.9.5`, `ajv@8.12.0`

## Prerequisites

- Node.js (v18.x or v20.x)
- MetaMask or another wallet compatible with Base
- Base mainnet (chain ID `8453`) or Sepolia (chain ID `84532`) RPC URL (e.g., from Infura or Alchemy)
- Zora API key (from Zora’s Developer Settings)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/valortin/zora-crang.git
   cd zora-crang
   ```

2. **Install dependencies**:
   Use `--legacy-peer-deps` to handle peer dependency conflicts:
   ```bash
   npm install --save-dev tailwindcss@3.4.17 postcss@8.5.5 autoprefixer@10.4.21 --legacy-peer-deps
   npm install react-scripts@5.0.1 @zoralabs/coins-sdk viem@2.21.55 wagmi@2.15.6 @tanstack/react-query framer-motion react-chartjs-2 chart.js react@18.3.1 react-dom@18.3.1 typescript@4.9.5 ajv@8.12.0 ajv-keywords@5.1.0 --legacy-peer-deps
   ```

3. **Configure environment variables**:
   Create a `.env` file in the project root:
   ```env
   REACT_APP_ZORA_API_KEY=your-zora-api-key
   REACT_APP_RPC_URL=your-base-sepolia-rpc-url
   ```

4. **Verify Tailwind CSS configuration**:
   Ensure `tailwind.config.js` includes:
   ```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: ["./src/**/*.{js,jsx,ts,tsx}"],
     theme: {
       extend: {
         colors: {
           'zora-bg': '#1a202c',
           'zora-accent': '#ff4d4f',
           'zora-secondary': '#4a5568',
         },
       },
     },
     plugins: [],
   }
   ```

5. **Check PostCSS configuration**:
   Ensure `postcss.config.js` includes:
   ```js
   module.exports = {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }
   ```

6. **Fix BigInt errors**:
   The `tsconfig.json` has been updated to `target: "es2020"` to resolve `TS2737` errors in `CrashGame.tsx`. Verify:
   ```json
   {
     "compilerOptions": {
       "target": "es2020",
       "lib": ["dom", "dom.iterable", "esnext"],
       "allowJs": true,
       "skipLibCheck": true,
       "esModuleInterop": true,
       "allowSyntheticDefaultImports": true,
       "strict": true,
       "forceConsistentCasingInFileNames": true,
       "noFallthroughCasesInSwitch": true,
       "module": "esnext",
       "moduleResolution": "node",
       "resolveJsonModule": true,
       "isolatedModules": true,
       "noEmit": true,
       "jsx": "react-jsx"
     },
     "include": ["src"]
   }
   ```

## Usage

1. **Start the development server**:
   ```bash
   npm start
   ```
   The app opens at `http://localhost:3000`.

2. **Connect a wallet**:
   - Use MetaMask to connect to Base Sepolia (chain ID `84532`) or mainnet (chain ID `8453`).
   - Ensure testnet ETH for Sepolia or mainnet ETH for Base.

3. **Play the game**:
   - In the `CrashGame` component, enter a bet amount in Zora20 tokens.
   - Click “Start Game” to mint a crash coin and watch the multiplier rise.
   - Cash out before the crash to secure winnings.
   - Replace `YOUR_COIN_ADDRESS` in `src/components/CrashGame.tsx` with a valid Zora20 token address.

4. **Test Tailwind CSS**:
   - The homepage uses `bg-yellow-500` for testing (bright yellow, `#eab308`). Verify in the browser.
   - Inspect the `<div>` (F12) to confirm `background-color: #eab308;`.
   - Revert to `bg-zora-bg` in `src/App.tsx` for production:
     ```tsx
     <div className="min-h-screen bg-zora-bg flex flex-col items-center justify-center p-4">
     ```

5. **Explore Zora Coins Features**:
   - **Crash Coins**: Mint a new ERC-20 coin per game session, tradable on Uniswap V4.
   - **Trading Dashboard**: View live trading volume, prices, and creator rewards in `CrashGame`.
   - **Referral Sharing**: Copy and share your crash coin’s referral link to earn 15% of trading fees.

## Troubleshooting

- **Dependency errors** (e.g., `Cannot find module 'ajv/dist/compile/codegen'`):
  ```bash
  npm install ajv@8.12.0 ajv-keywords@5.1.0 --legacy-peer-deps
  ```
  If issues persist, clean and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm cache clean --force
  npm install --legacy-peer-deps
  ```

- **Tailwind not working**: Ensure `src/index.css` includes:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
    background-color: #1a202c;
    color: white;
  }
  ```
  Verify `src/index.tsx` imports `index.css`.

- **Wallet issues**: Confirm the RPC URL and chain ID in `.env` and MetaMask.
- **BigInt errors**: The `tsconfig.json` update (`target: "es2020"`) should resolve `TS2737`. If not, replace `0n` with `BigInt(0)` in `CrashGame.tsx`.

## Future Development

- **Community Leagues**: Introduce Crash Leagues where teams create shared coins, with AI-powered crash predictions and NFT badges for referrals.

- **Cross-Chain Expansion**: Enable tournaments across Base, Optimism, and Arbitrum, with an AI-driven marketplace for crash coins and NFTs.


## Contributing

Contributions are welcome! Please:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

### Changes from Previous README

- **Zora Coins Emphasis**: Highlights player-created crash coins, trading dashboard, and referral sharing to address showcasing the protocol’s power.
- **New Features**: Details minting ERC-20 coins, real-time trading visuals, and referral rewards, reflecting the current wave’s improvements.
- **UI Testing**: Retains instructions for testing `bg-yellow-500` and reverting to `bg-zora-bg`.
- **Stability Fixes**: Includes steps to resolve the `ajv` error and BigInt issues, ensuring `npm start` works.
- **Updated Tech Stack**: Reflects pinned versions (`react@18.3.1`, `typescript@4.9.5`, `ajv@8.12.0`).

