import React, { useEffect, useState } from "react";
import "./App.css";

import twitterLogo from "./assets/twitter-logo.svg";

const TWITTER_HANDLE = "ViviPlasenciaC";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

function App() {
  /*
   * This function holds the logic for deciding if a Phantom Wallet is
   * connected or not
   */
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            "Connected with Public Key:",
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [walletAddress, setWalletAddress] = useState(null);
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
  return (
    <div className="flex flex-col min-h-screen px-2 bg-gray-900">
      <div className="flex items-center justify-center absolute inset-0 px-2">
        <div className="text-center space-y-5">
          <p className="font-medium text-3xl text-white">🖼 GIF Portal</p>
          <p className="text-white text-xl">
            View your GIF collection in the metaverse ✨
          </p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
      </div>
      <footer className="absolute inset-x-0 bottom-0 h-16">
        <a
          className="flex items-center justify-center text-white underline hover:no-underline"
          href={TWITTER_LINK}
          target="_blank"
          rel="noreferrer noopener nofollow"
        >
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <span>{`@${TWITTER_HANDLE}`}</span>
        </a>
      </footer>
    </div>
  );
}

export default App;
