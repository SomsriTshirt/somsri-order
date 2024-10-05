export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();

    return {
        provide: {
            api: (path: string) => {
                if (path === '') {
                    return path;
                }

                if (path !== '') {
                    if (path.startsWith('http') || path.startsWith('https')) {
                        return path;
                    }
                } else {
                    return path;
                }
                return config.public.api + path;
            },
            appName: config.public.appName,
            lineLiffId: config.public.liffId,
        },
    };
});
