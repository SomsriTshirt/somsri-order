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

    async function verifyCustomer(id: string, pin: string[], options: ApiOptions = {}): Promise<{ verify: boolean }> {
        try {
            const { data, error } = await useApiFetch<{ verify: boolean }>(`${BASE_URL}/public/${id}`, {
                method: 'POST',
                body: {
                    verifyPin: pin.join(''),
                },
            });

            if (error.value) throw error.value;
            if (!data.value) throw new Error('NO RESPONSE');

            return data.value;
        } catch (err) {
            useBugsnag().notify(JSON.stringify(err));
            if (options.errorCallback) options.errorCallback();
            return { verify: false };
        }
    }

    async function confrim(id: string, body: { by: string }, options: ApiOptions = {}): Promise<SpecSheet | null> {
        try {
            const { data, error } = await useApiFetch<SpecSheet>(`${BASE_URL}/public/${id}/approved/customer`, {
                method: 'POST',
                body: body,
            });

            if (error.value) throw error.value;
            if (!data.value) throw new Error('NO RESPONSE');

            return data.value;
        } catch (err) {
            useBugsnag().notify(JSON.stringify(err));
            if (options.errorCallback) options.errorCallback();
            return null;
        }
    }

    async function isExist(id: string, options: ApiOptions = {}): Promise<{ status: boolean } | null> {
        try {
            const { data, error } = await useApiFetch<{ status: boolean }>(`${BASE_URL}/public/status/${id}`);

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
        verifyCustomer,
        confrim,
        isExist,
    };
}
