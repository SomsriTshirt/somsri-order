import { type BaseValidation } from "@vuelidate/core"
import get from "lodash/get"

const defaultValue = {
	$error: false,
	$errors: [{ $message: "" }],
}

export default (validator: BaseValidation, key: string) => {
	const error = get(validator, key, defaultValue).$errors.length
	return get(validator, key, defaultValue).$error && error > 0
}
