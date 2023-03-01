/// <reference types="node" />
import AccountType from '../types/AccountClass';
import UserAccount from '../types/UserAccount';
import EventEmitter from 'node:events';
import EventSource from 'eventsource';
import Config from '../types/Config';
import Mails from './Mails';
export default class Account<Listening extends boolean = true> extends EventEmitter implements AccountType<Listening> {
    mails: Mails;
    _eventSource: Listening extends true ? EventSource : undefined;
    config: Config;
    id: string;
    address: string;
    quota: number;
    used: number;
    isDisabled: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    token: string;
    password?: string | undefined;
    constructor(account: UserAccount, config?: Config);
    fetch(): Promise<this>;
    delete(): Promise<boolean>;
}
