import React from "react";
import "./App.less";
import GitHubButton from "react-github-btn";
import { Routes } from "./routes";

function App() {
  return (
    <div className="App">
      <div className="Banner">
        <div className="Banner-description">
          SRMSwap暂未完成代码审计，请自行承担风险(需翻墙使用)。
        </div>
      </div>
      <Routes />
      <div className="social-buttons">
          微信：srmswap
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
