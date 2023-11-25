import type { UseFetchOptions } from "nuxt/app"

export async function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
	let headers: any = {}
	const { $api }: any = useNuxtApp()
	const token = useCookie("XSRF-TOKEN")

	if (token.value) {
		headers["X-XSRF-TOKEN"] = token.value as string
	}

	headers = {
		...headers,
		...useRequestHeaders(["cookie"]),
	}

	return useFetch($api(path), {
		credentials: "include",
		watch: false,
		...options,
		headers: {
			...headers,
			...options?.headers,
		},
	})
}
