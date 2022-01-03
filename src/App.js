import React, { useEffect, useState } from "react";
import "./App.css";

import twitterLogo from "./assets/twitter-logo.svg";

const TWITTER_HANDLE = "ViviPlasenciaC";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const TEST_GIFS = [
  "https://media.giphy.com/media/SGkufeMafyuBhIw796/giphy.gif",
  "https://media.giphy.com/media/a42CE9jJY8zYGU51bG/giphy.gif",
  "https://media.giphy.com/media/iK636zveaFVRR0SRFu/giphy.gif",
  "https://media.giphy.com/media/tHvMDELcZVSpBDzDRr/giphy.gif",
  "https://media.giphy.com/media/FWcoE5AkG3BRe/giphy.gif"
];

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
  const [inputValue, setInputValue] = useState("");
  const [gifList, setGifList] = useState([]);

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };
  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log("Gif link:", inputValue);
      setGifList([...gifList, inputValue]);
      setInputValue("");
    } else {
      console.log("Empty input. Try again.");
    }
  };
  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };
  const renderNotConnectedContainer = () => (
    <button className="connect-wallet-button" onClick={connectWallet}>
      Connect to Wallet
    </button>
  );
  const renderConnectedContainer = () => (
    <div className="connected-container">
      <form
        className="gif-form"
        onSubmit={(event) => {
          event.preventDefault();
          sendGif();
        }}
      >
        <input
          autoFocus
          type="text"
          placeholder="Enter gif link!"
          value={inputValue}
          onChange={onInputChange}
        />
        <button type="submit" className="submit-gif-button">
          Add Gif
        </button>
      </form>
      <div className="gif-grid">
        {gifList.map((gif, i) => (
          <div className="gif-item" key={i}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
  useEffect(() => {
    if (walletAddress) {
      console.log("Fetching GIF list...");

      // Call Solana program here.

      // Set state
      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);
  return (
    <div className="app">
      <div className="flex items-center justify-center mt-20">
        <div className="text-center space-y-5">
          <div className="mb-20">
            <p className="font-medium text-3xl text-white mb-5">
              🖼 Dance GIF Portal
            </p>
            <p className="text-white text-xl">
              View your Dance GIF collection in the metaverse ✨
            </p>
          </div>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
      </div>
      <footer className="footer">
        <a
          className="flex items-center justify-center text-white underline hover:no-underline w-fit"
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
