import { Wallet } from 'ethers';
import crypto from 'crypto';

// Generate a new Ethereum wallet
export function generateWallet(): { address: string; privateKey: string } {
  const wallet = Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
}

// Encrypt private key using AES-256-GCM
export function encryptPrivateKey(privateKey: string): string {
  const algorithm = 'aes-256-gcm';
  const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(privateKey, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  // Return iv:authTag:encrypted
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

// Decrypt private key
export function decryptPrivateKey(encryptedData: string): string {
  const algorithm = 'aes-256-gcm';
  const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');
  
  const [ivHex, authTagHex, encrypted] = encryptedData.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

// Get wallet balance (placeholder - you'll need to implement actual RPC calls)
export async function getWalletBalance(address: string): Promise<string> {
  try {
    // TODO: Implement actual Monad RPC call
    // const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_MONAD_RPC_URL);
    // const balance = await provider.getBalance(address);
    // return ethers.formatEther(balance);
    
    // Mock balance for now
    return '0.00';
  } catch (error) {
    console.error('Error fetching balance:', error);
    return '0.00';
  }
}
