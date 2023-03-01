import { Mail as MailType } from '../types/common';
export default class Mail implements MailType {
    readonly id: string;
    readonly accountId: string;
    readonly msgid: string;
    readonly from: {
        address: string;
        name: string;
    };
    readonly to: Array<{
        address: string;
        name: string;
    }>;
    readonly subject: string;
    readonly intro: string;
    readonly seen: boolean;
    readonly isDeleted: boolean;
    readonly hasAttachments: boolean;
    readonly downloadUrl: string;
    readonly size: number;
    readonly createdAt: string;
    readonly updatedAt: string;
    constructor(mail: MailType);
    fetch(): Promise<this>;
    delete(): Promise<this>;
    setIsSeen(seen?: boolean): Promise<this>;
    download<Path extends string = ''>(path?: Path): Promise<Path>;
}
