import { format } from 'date-fns';

/*
* @param {String} str
* @param {String} type
*/
export function formateDate(str, type) {
	const date = new Date(str);
	return format(date, type);
}