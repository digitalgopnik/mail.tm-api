import { Mail } from '../types/common';
import MailCache from './MailCache';
export default class Mails {
    cache: MailCache;
    constructor();
    fetch(id: string): Promise<Mail>;
    fetchAll(page?: number): Promise<Mail[]>;
}
