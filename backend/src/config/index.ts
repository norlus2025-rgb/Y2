import dotenv from 'dotenv';

dotenv.config();

export const config = {
  database: {
    url: process.env.DATABASE_URL || '',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'earn_platform',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret',
    expiry: process.env.JWT_EXPIRY || '7d',
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackUrl: process.env.GOOGLE_CALLBACK_URL || '',
  },
  mobileMoney: {
    mtn: {
      apiKey: process.env.MTN_API_KEY || '',
      environment: process.env.MTN_ENVIRONMENT || 'sandbox',
    },
    orange: {
      apiKey: process.env.ORANGE_API_KEY || '',
    },
    vodafone: {
      apiKey: process.env.VODAFONE_API_KEY || '',
    },
  },
  crypto: {
    ethereum: {
      rpcUrl: process.env.ETHEREUM_RPC_URL || '',
      privateKey: process.env.ETHEREUM_PRIVATE_KEY || '',
    },
    bitcoin: {
      apiUrl: process.env.BITCOIN_API_URL || '',
    },
    usdc: {
      contractAddress: process.env.USDC_CONTRACT_ADDRESS || '',
    },
    walletAddress: process.env.WALLET_ADDRESS || '',
  },
  server: {
    port: parseInt(process.env.PORT || '3001'),
    nodeEnv: process.env.NODE_ENV || 'development',
    clientUrl: process.env.CLIENT_URL || '',
  },
};
