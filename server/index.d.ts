interface Config {
  maxHistory: number;
  framework: "esx" | "qb";
  logging: {
    enabled: boolean;
    webhook: string;
  };
  tick: {
    min: number;
    max: number;
    upDownRatio: number;
    maxDeviation: number;
    interval: number;
    crashChance: number;
  }
}

interface DbTransaction {
  type: "bought" | "sold" | "transferred";
  amount: number;
  value: number;
  isReceiving?: boolean;
}

interface RawTransaction {
  id: number;
  identifier: string;
  type: "bought" | "sold" | "transferred";
  amount: number;
  worth: number;
  sentTo?: string;
  createdAt?: number;
}