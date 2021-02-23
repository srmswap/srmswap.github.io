import React from "react";
import "./App.less";
import GitHubButton from "react-github-btn";
import { Routes } from "./routes";

function App() {
  return (
    <div className="App">
      <div className="Banner">
        <div className="Banner-description">
          请自行承担风险(需翻墙使用)
        </div>
      </div>
      <Routes />
      <div className="out-links">
        <a
          href="https://www.sollet.io/"
        >
          Sollet钱包  
        </a>  
           &nbsp;|&nbsp;      
        <a
          href="https://explorer.solana.com/"
        >
          Solana 区块链浏览器
        </a>          
      </div>
      <div className="social-buttons">
          微博:@srmswap   
          &nbsp;|&nbsp;  
          微信：srmswap 
          &nbsp;|&nbsp;  
        <a
          href="https://twitter.com/srmswap"
        >
          Twitter:@srmswap
        </a>         
      </div>	      
    </div>
  );
}

export default App;
