import type { StatusData, StatusList } from './Global.ts';
import type { Project } from './Project';

export type SpecSheetType = 'ORDER' | 'SAMPLE' | 'CLAIM';

export type Status = 'managerApproved' | 'customerApproved' | 'issueWorkOrder';

export interface SpecSheetAmountInner {
    id: string;
    productId: string;
    name: string;
    amount: number;
    unitName: string;
    unitMultiplier: number;
}

export interface SpecSheetAmountImage {
    id: string;
    url: string;
}

export interface SpecSheetAmount {
    id: string;
    name: string;
    img: SpecSheetAmountImage[];
    template: string;
    info: SpecSheetAmountInner[];
    note: string;
}

export interface SpecSheetSizeInfoInner {
    id: string;
    name: string;
    width?: number;
    long?: number;
    waist?: number;
    hip?: number;
}

export interface SpecSheetSizeInfo {
    id: string;
    name: string;
    info: SpecSheetSizeInfoInner[];
    note: string;
}

export interface SpecSheetScreenPoint {
    id: string;
    position: string;
    size: string;
    spaceFromCollar: string;
    type: string;
    color: string;
    file: string;
    note: string;
}

export interface SpecSheetPinPoint {
    id: string;
    position: string;
    type: string;
    size: string;
    spaceFromCollar: string;
    color: string;
    file: string;
    note: string;
}

export interface SpecSheetPrintPoint {
    id: string;
    position: string;
    size: string;
    spaceFromCollar: string;
    type: string;
    color: string;
    file: string;
    note: string;
}

export interface SpecSheet {
    id: string;
    name: string;
    projectId: string;
    project?: Project;
    productType: string;
    specSheetType: SpecSheetType[];
    quotationId: string;
    specialRequest: string;
    details: Record<string, any>;
    screenPoints: SpecSheetScreenPoint[];
    pinPoints: SpecSheetPinPoint[];
    printPoints: SpecSheetPrintPoint[];
    sizeInfo: SpecSheetSizeInfo[];
    amount: SpecSheetAmount[];
    sizeLabel: string;
    sizeLabelUrl: string | null;
    sizeLabelNote: string;
    sampleType: string;
    sampleConfirmedType: string;
    sampleConfirmedTime: string;
    sampleDue: Date | string;
    packing: string;
    isActive: boolean;
    currentStep: string;
    img: Record<string, any>[];
    stepList: StatusList[];
    stepData: Record<Status, StatusData>;
    isFinish: boolean;
    isVoid: boolean;
    finishAt: string | Date | null;
    createdAt: string;
    updatedAt: string;
}
