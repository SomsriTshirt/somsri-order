import type { Contact } from './Contact.ts';

export interface Project {
    id: string;
    name: string;
    customerId: string;
    customerData: Contact;
    coordinatorData: Contact;
    documentData: Contact;
    deliveryData: Contact;
    documentDeliveryData: Contact;
    sampleDeliveryData: Contact | Record<string, never>;
    dueDate: string;
    deliveryDate: string;
    isExpress: boolean;
    cantPostpone: boolean;
    finish: boolean;
    finishAt: string | null;
    finishById: number | null;
    createdAt: string;
    updatedAt: string;
    hasSample: boolean;
}
