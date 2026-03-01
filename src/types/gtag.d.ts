export {};

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export interface GtagConversionEvent {
  send_to: string;
  value?: number;
  currency?: string;
  transaction_id?: string;
  user_data?: {
    sha256_email_address?: string;
    sha256_phone_number?: string;
    address?: {
      sha256_first_name?: string;
      sha256_last_name?: string;
    };
  };
}
