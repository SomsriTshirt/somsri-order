import type { SpecSheet } from '~/types/SpecSheet';

const BASE_URL = `/v1/spec-sheets`;

interface ApiOptions {
    errorCallback?: () => any;
}
export function useSpecSheet() {
    async function get(id: string, options: ApiOptions = {}): Promise<SpecSheet | null> {
        try {
            const { data, error } = await useApiFetch<SpecSheet>(`${BASE_URL}/public/${id}`);

            if (error.value) throw error.value;
            if (!data.value) throw new Error('NO RESPONSE');

            return data.value;
        } catch (err) {
            useBugsnag().notify(JSON.stringify(err));
            if (options.errorCallback) options.errorCallback();
            return null;
        }
    }

    return {
        get,
    };
}
