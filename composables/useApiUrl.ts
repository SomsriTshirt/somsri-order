export function useApiUrl(path: string) {
	const { $api } = useNuxtApp()
	return $api(path)
}
