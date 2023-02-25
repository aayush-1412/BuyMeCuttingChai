import { ethers } from "ethers";
import { useState } from "react";
import { Button, Typography } from "@mui/material";

const networks = {
  polygon: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
};

const Wallet = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const connectWallet = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    if (provider.network !== "matic") {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks["polygon"],
          },
        ],
      });
    }
    const account = provider.getSigner();
    const Address = await account.getAddress();
    setAddress(Address);
    const Balance = ethers.utils.formatEther(await account.getBalance());
    setBalance(Balance);
  };

  return (
    <Button onClick={connectWallet}>
      {balance == "" ? <h3></h3> : <h3>{balance.slice(0, 4)} Matic</h3>}
      {address == "" ? (
        <Typography sx={{ color: "#f8dc9a" }}>Connect Wallet</Typography>
      ) : (
        <Typography sx={{ color: "#f8dc9a" }}>
          {address.slice(0, 6)}...{address.slice(39)}
        </Typography>
      )}
    </Button>
  );
};

export default Wallet;
