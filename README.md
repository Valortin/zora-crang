# Zora-crang: Crash Gambling Simulator on Base

**Zora-crang** is a decentralized application (dApp) built on the **Base** blockchain, offering a crash gambling simulator integrated with **Zora’s Coins SDK** for on-chain token trading. Featuring a sleek, responsive UI styled with **Tailwind CSS** and animated with **Framer Motion**, the app delivers an engaging user experience.

Players can bet **Zora20 tokens**, view real-time multiplier curves via `react-chartjs-2`, and cash out using secure blockchain transactions powered by **WAGMI** and **Viem**.

This project fuses **blockchain gaming, DeFi, and AI-driven development**, leveraging **Base’s scalability** and **Zora’s token infrastructure** to redefine dApp UX through a vibrant, customizable interface and transparent gameplay.

---

## 🚀 Features

* **Crash Gambling Game** – Bet Zora20 tokens, watch the multiplier rise, and cash out before the crash, rendered in real-time using `react-chartjs-2`.
* **Zora Coins Integration** – Trustless token trading via Zora’s Coins SDK (`tradeCoin`, `getCoin`).
* **Responsive UI** – Tailwind CSS-powered styling with custom themes (`bg-zora-bg`, `zora-accent`, etc.).
* **Animations** – Framer Motion-powered transitions and effects.
* **Wallet Connectivity** – MetaMask and wallet support via **WAGMI** and **Viem**, on Base mainnet or Sepolia.
* **Scalability** – Built on **Base** for low-cost, high-speed micro-betting.

---

## 🛠️ Tech Stack

* **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion, react-chartjs-2, Chart.js
* **Blockchain**: Base (mainnet/Sepolia), Zora Coins SDK, WAGMI, Viem
* **Build Tools**: Create React App (`react-scripts@5.0.1`), PostCSS, Autoprefixer
* **Dependencies**: `@tanstack/react-query`, `react@18.3.1`, `react-dom@18.3.1`

---

## 📦 Prerequisites

* Node.js v18.x or v20.x
* MetaMask or compatible wallet
* Base RPC URL (e.g., via Infura or Alchemy)
* Zora API key (from [Zora Developer Settings](https://zora.co/settings))

---

## 📥 Installation

Clone the repository:

```bash
git clone https://github.com/Valortin/zora-crashgambling-simulator
cd zora-crashgambling-simulator
```

Install dependencies (use legacy peer deps):

```bash
npm install --save-dev tailwindcss@3.4.17 postcss@8.5.5 autoprefixer@10.4.21 --legacy-peer-deps
npm install react-scripts@5.0.1 @zoralabs/coins-sdk viem@2.21.55 wagmi @tanstack/react-query framer-motion react-chartjs-2 chart.js react@18.3.1 react-dom@18.3.1 typescript@4.9.5 --legacy-peer-deps
```

Create `.env` in project root:

```env
REACT_APP_ZORA_API_KEY=your-zora-api-key
REACT_APP_RPC_URL=your-base-mainnet-or-sepolia-rpc-url
```

Initialize Tailwind:

```bash
npx tailwindcss init -p
```

Update `tailwind.config.js`:

```js
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

Fix `BigInt` errors:

* In `CrashGame.tsx`, replace `minAmountOut: 0n` with `BigInt(0)`
* Or, update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "es2020"
  }
}
```

---

## 💡 Usage

Start development server:

```bash
npm start
```

Access the app at [http://localhost:3000](http://localhost:3000)

Connect wallet:

* Use MetaMask with Base Mainnet (`chainId: 8453`) or Sepolia (`chainId: 84532`)
* Ensure ETH for gas fees

Play the game:

1. Enter Zora20 token bet amount
2. Click “Start Game”
3. Watch the multiplier rise
4. Cash out before crash
5. Set `coinAddress` in `CrashGame.tsx` to your Zora20 token

Test Tailwind setup (optional):

In `App.tsx`, verify yellow background:

```tsx
<div className="min-h-screen bg-yellow-500 flex flex-col items-center justify-center p-4">
```

---

## 🐛 Troubleshooting

* **Dependency errors**: Retry with `--legacy-peer-deps`
* **Tailwind not showing**: Check `@tailwind` directives in `index.css`, and paths in `tailwind.config.js`
* **BigInt errors**: Use `BigInt(0)` or set `target: es2020`
* **Wallet issues**: Validate `.env` RPC URL & MetaMask chain config
* **Clean cache** (if problems persist):

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

## 📈 Future Development

**Wave 1**

* Social leaderboards
* AI-personalized game modes
* NFT avatars and animated UI panels (`bg-zora-secondary`)

**Wave 2**

* Cross-chain gameplay
* AI-optimized DeFi staking
* Customizable UI themes (e.g., `bg-blue-500` chain selectors)

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch:
   `git checkout -b feature/your-feature`
3. Commit:
   `git commit -m 'Add your feature'`
4. Push:
   `git push origin feature/your-feature`
5. Open a pull request

---

## 📄 License

Licensed under the [MIT License](LICENSE)

---

## 🙏 Acknowledgments

* **Zora** for the Coins SDK & NFT infrastructure
* **Base** for scalable L2 tech
* **xAI** for AI development insights
* **Tailwind CSS** & **Framer Motion** for UI utilities