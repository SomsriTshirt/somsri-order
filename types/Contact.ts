import type { ContactSocialMedia } from './ContactSocialMedia.ts';

export interface Contact {
    id: string;
    contactType: number;
    peakId: string | null;
    displayId: string | null;
    title: string | null;
    firstName: string;
    lastName: string;
    fullName: string;
    nickName: string;
    category: 1 | 2 | 3 | 4 | 5 | 6;
    type: string;
    companyName: string | null;
    companyBranch: string | null;
    taxId: string | null;
    phoneNumber: string;
    address: string;
    subDistrict: string;
    district: string;
    province: string;
    postcode: string;
    credit: number | null;
    email: string | null;
    deliveryMethod: string | null;
    gpsLocation: string | null;
    department: string | null;
    position: string | null;
    createdAt: string;
    updatedAt: string;
    socialMedia?: ContactSocialMedia[];
}
