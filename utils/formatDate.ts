import { DateTime } from "luxon"
export default (date: string, locale: string = "th") => {
	const dt = DateTime.fromISO(date)
	if (dt.isValid) {
		return dt.setLocale(locale).toLocaleString()
	} else {
		return "-"
	}
}
