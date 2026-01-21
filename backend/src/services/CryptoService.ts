import { ethers } from 'ethers';
import axios from 'axios';
import { config } from '../config';

const USDC_ABI = [
  'function transfer(address to, uint256 amount) returns (bool)',
  'function balanceOf(address account) view returns (uint256)',
];

export class CryptoService {
  private static provider = new ethers.JsonRpcProvider(config.crypto.ethereum.rpcUrl);
  private static wallet = new ethers.Wallet(
    config.crypto.ethereum.privateKey,
    this.provider
  );

  // Ethereum USDC Transfer
  static async sendUSDC(
    recipientAddress: string,
    amount: number
  ): Promise<{ transactionHash: string; status: string }> {
    try {
      const contract = new ethers.Contract(
        config.crypto.usdc.contractAddress,
        USDC_ABI,
        this.wallet
      );

      const tx = await contract.transfer(
        recipientAddress,
        ethers.parseUnits(amount.toString(), 6)
      );

      await tx.wait();

      return {
        transactionHash: tx.hash,
        status: 'completed',
      };
    } catch (error: any) {
      throw new Error(`USDC Transfer Error: ${error.message}`);
    }
  }

  // Bitcoin Transaction (Simplified - using blockchain API)
  static async checkBitcoinAddress(address: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `${config.crypto.bitcoin.apiUrl}/addresses/${address}/`
      );
      return !!response.data.address;
    } catch (error: any) {
      throw new Error(`Bitcoin Address Validation Error: ${error.message}`);
    }
  }

  // ETH Transfer (Optional)
  static async sendETH(
    recipientAddress: string,
    amount: number
  ): Promise<{ transactionHash: string; status: string }> {
    try {
      const tx = await this.wallet.sendTransaction({
        to: recipientAddress,
        value: ethers.parseEther(amount.toString()),
      });

      await tx.wait();

      return {
        transactionHash: tx.hash,
        status: 'completed',
      };
    } catch (error: any) {
      throw new Error(`ETH Transfer Error: ${error.message}`);
    }
  }

  static async getEthereumBalance(): Promise<string> {
    try {
      const balance = await this.provider.getBalance(config.crypto.walletAddress);
      return ethers.formatEther(balance);
    } catch (error: any) {
      throw new Error(`Balance Check Error: ${error.message}`);
    }
  }
}
