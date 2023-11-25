export default (...args: any): void => {
	for (const id of args) {
		const modalEl: any = document.getElementById(id)
		modalEl.close()
	}
}
