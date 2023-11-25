import { DateTime } from "luxon"
export default (date: string, locale: string = "th") => {
	const dt = DateTime.fromISO(date)
	if (dt.isValid) {
		return dt.setLocale(locale).toLocaleString(DateTime.TIME_24_SIMPLE)
	} else {
		return "-"
	}
}
