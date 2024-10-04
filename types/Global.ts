export interface StatusList {
    id: string;
    label: string;
}

export interface StatusData {
    done?: boolean;
    at?: string;
    by?: string;
    note?: string;
}

export interface GetAllApiMetadata {
    search?: string;
    filter?: Record<string, any>;
    include?: string[];
    orderBy?: Record<string, any>;
    limit?: number;
}

export interface GetAllApiMetadataWithPaginate extends GetAllApiMetadata {
    limit: number;
    page: number;
}

export interface GetApiMetadata {
    include?: string[];
}

export interface GetApiOptions {
    errorCallback?: () => any;
}
