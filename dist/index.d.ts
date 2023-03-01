import { Domain } from './types/common';
import Account from './classes/Account';
import Config from './types/Config';
export declare function fetchDomains<Random extends boolean = false>({ page, getRandomDomain }?: {
    page?: number;
    getRandomDomain?: Random;
} | undefined): Promise<Random extends true ? Domain : Domain[]>;
export declare function createAccount(address?: string, password?: string): Promise<Account>;
export declare function loginAccount(addressOrToken: string, password?: string): Promise<Account>;
export declare function setConfig(config: Config): void;
