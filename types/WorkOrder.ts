import type { StatusData, StatusList } from './Global.ts';

export interface WorkOrder {
    id: string;
    projectId: string | null;
    specSheetId: string;
    stepList: StatusList[];
    stepData: Record<string, StatusData>;
    currentStep: string;
    isActive: boolean;
    confirmed: boolean;
    isVoid: boolean;
    confirmedAt: Date | string;
    isFinish: boolean;
    finishAt: Date | string | null;
    createdAt: string;
    updateAt: string;
}
