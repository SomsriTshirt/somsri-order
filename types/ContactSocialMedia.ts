import type { Contact } from './Contact';

export interface ContactSocialMedia {
    id: number;
    contactId: string;
    contact?: Contact;
    platform: string;
    value: string;
    createdAt: string;
    updatedAt: string;
}
