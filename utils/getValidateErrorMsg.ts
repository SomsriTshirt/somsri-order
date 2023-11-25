import type { BaseValidation } from "@vuelidate/core"
import get from "lodash/get"

const defaultValue = {
	$error: false,
	$errors: [{ $message: "" }],
}
export default (validator: BaseValidation, key: string) => {
	return get(validator, key, defaultValue).$errors[0].$message
}
