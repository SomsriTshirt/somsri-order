export default (
	modalId: string,
	beforeOpen: unknown = () => {},
	afterOpen: unknown = () => {}
): void => {
	if (typeof beforeOpen === "function") {
		beforeOpen()
	}

	const modalEl: any = document.getElementById(modalId)
	modalEl.showModal()

	if (typeof afterOpen === "function") {
		afterOpen()
	}
}
