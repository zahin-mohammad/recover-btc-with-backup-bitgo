import {
  EnvironmentName,
  Environments,
} from "@bitgo/sdk-core";
import { string, option, Type } from "cmd-ts";

export const accessTokenFlag = option({
  type: string,
  defaultValue: () => {
    const accessToken = process.env.ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error("ACCESS_TOKEN env var not set");
    }
    return accessToken;
  },
  long: "accessToken",
  short: "a",
  description:
    "BitGo user account access token. If not provided, the env var ACCESS_TOKEN will be used.",
});

export const passwordFlag = option({
  type: string,
  defaultValue: () => {
    const password = process.env.WALLET_PASSCODE;
    if (!password) {
      throw new Error("WALLET_PASSCODE env var not set");
    }
    return password;
  },
  long: "walletPassword",
  short: "p",
  description: "The wallet passphrase for the wallet associated to walletId.",
});

export const walletIdFlag = option({
  type: string,
  defaultValue: () => {
    const walletId = process.env.WALLET_ID;
    if (!walletId) {
      throw new Error("WALLET_ID env var not set");
    }
    return walletId;
  },
  long: "walletId",
  short: "w",
  description:
    "BitGo wallet id. If not provided, the env var WALLET_ID will be used.",
});

export const recoveryDestinationFlag = option({
  type: string,
  defaultValue: () => {
    const dest = process.env.RECOVERY_DESTINATION;
    if (!dest) {
      throw new Error("RECOVERY_DESTINATION env var not set");
    }
    return dest;
  },
  long: "destination",
  short: "d",
  description:
    "Recovery destination. If not provided, the env var RECOVERY_DESTINATION will be used.",
});

export const blockChairApiKeyFlag = option({
  type: string,
  defaultValue: () => {
    const apiKey = process.env.BLOCK_CHAIR_API_KEY;
    if (!apiKey) {
      throw new Error("BLOCK_CHAIR_API_KEY env var not set");
    }
    return apiKey;
  },
  long: "blockChairApiKey",
  short: "blockChairApiKey",
  description:
    "Recovery destination. If not provided, the env var BLOCK_CHAIR_API_KEY will be used.",
});

export const keyTypes = ["user", "backup"] as const;

export type KeyType = (typeof keyTypes)[number];

export const KeyTypeDecoder: Type<string, KeyType> = {
  async from(str: string): Promise<KeyType> {
    if (!keyTypes.includes(str as KeyType)) {
      throw new Error(`invalid keyType ${str}`);
    }
    return str as KeyType;
  },
};

export const envDecoder: Type<string, EnvironmentName> = {
  async from(str: string): Promise<EnvironmentName> {
    if (Environments[str as keyof typeof Environments] !== undefined) {
      return str as EnvironmentName;
    }
    throw new Error(`invalid environment ${str}`);
  },
};

export const envFlag = option({
  type: envDecoder,
  long: "env",
  short: "e",
  defaultValue: () => {
    const envStr = process.env.BITGO_ENV;
    if (Environments[envStr as keyof typeof Environments] !== undefined) {
      return envStr as EnvironmentName;
    }
    throw new Error("BITGO_ENV env var not set");
  },
  description:
    "BitGo environment. If not provided, the env var BITGO_ENV will be used.",
});

export const userKeyFlag = option({
  type: string,
  defaultValue: () => {
    const userKey = process.env.USER_KEY;
    if (!userKey) {
      throw new Error("USER_KEY env var not set");
    }
    return userKey;
  },
  long: "userKey",
  short: "u",
  description:
      "Encrypted user private key (xprv)",
});

export const backupKeyFlag = option({
  type: string,
  defaultValue: () => {
    const backupKey = process.env.BACKUP_KEY;
    if (!backupKey) {
      throw new Error("BACKUP_KEY env var not set");
    }
    return backupKey;
  },
  long: "backupKey",
  short: "b",
  description:
      "Encrypted backup private key (xprv)",
});

export const bitgoPubKeyFlag = option({
  type: string,
  defaultValue: () => {
    const bitgoPubkey = process.env.BITGO_PUB_KEY;
    if (!bitgoPubkey) {
      throw new Error("BITGO_PUB_KEY env var not set");
    }
    return bitgoPubkey;
  },
  long: "bitgoPubkey",
  short: "g",
  description:
      "Bitgo public key in plain text",
});

export const redeemScriptFlag = option({
  type: string,
  defaultValue: () => {
    const redeemScript = process.env.REDEEM_SCRIPT;
    if (!redeemScript) {
      throw new Error("REDEEM_SCRIPT env var not set");
    }
    return redeemScript;
  },
  long: "redeemScript",
  short: "r",
  description:
      "Redeem script in plain text",
});
