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
}
