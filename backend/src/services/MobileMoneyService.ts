import axios from 'axios';
import { config } from '../config';

// MTN Mobile Money Service
export class MTNService {
  private static readonly apiUrl = 'https://momoapi.mtn.com';
  private static readonly apiKey = config.mobileMoney.mtn.apiKey;

  static async sendMoney(
    phoneNumber: string,
    amount: number,
    externalId: string,
    currency: string = 'EUR'
  ): Promise<{ transactionId: string; status: string }> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/collection/v1_0/requesttopay`,
        {
          amount: amount.toString(),
          currency,
          externalId,
          payer: {
            partyIdType: 'MSISDN',
            partyId: phoneNumber,
          },
          payerMessage: 'Payout from Earn Platform',
          payeeNote: 'Task Completion Reward',
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'X-Reference-Id': externalId,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        transactionId: response.data.transactionId,
        status: response.status === 202 ? 'pending' : 'unknown',
      };
    } catch (error: any) {
      throw new Error(`MTN Payment Error: ${error.message}`);
    }
  }

  static async checkTransactionStatus(transactionId: string): Promise<string> {
    try {
      const response = await axios.get(
        `${this.apiUrl}/collection/v1_0/requesttopay/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.status;
    } catch (error: any) {
      throw new Error(`MTN Status Check Error: ${error.message}`);
    }
  }
}

// Orange Money Service
export class OrangeMoneyService {
  private static readonly apiUrl = 'https://api.orange.com';
  private static readonly apiKey = config.mobileMoney.orange.apiKey;

  static async sendMoney(
    phoneNumber: string,
    amount: number,
    externalId: string
  ): Promise<{ transactionId: string; status: string }> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/orange-money-webpay/cm/v1/pay`,
        {
          amount: amount.toString(),
          currency: 'XAF',
          phone_number: phoneNumber,
          order_id: externalId,
          return_url: `${config.server.clientUrl}/payment/callback`,
          is_ipn: false,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        transactionId: response.data.id,
        status: 'pending',
      };
    } catch (error: any) {
      throw new Error(`Orange Money Error: ${error.message}`);
    }
  }
}

// Vodafone Cash Service
export class VodafoneService {
  private static readonly apiKey = config.mobileMoney.vodafone.apiKey;

  static async sendMoney(
    phoneNumber: string,
    amount: number,
    externalId: string
  ): Promise<{ transactionId: string; status: string }> {
    try {
      const response = await axios.post(
        'https://api.vodafone.com/cash/transfer',
        {
          amount: amount.toString(),
          recipient_msisdn: phoneNumber,
          reference: externalId,
          description: 'Earn Platform Payout',
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        transactionId: response.data.transaction_id,
        status: 'pending',
      };
    } catch (error: any) {
      throw new Error(`Vodafone Error: ${error.message}`);
    }
  }
}
