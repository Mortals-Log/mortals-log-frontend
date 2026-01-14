/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

export const GetDDay = (targetDate: string): string | null => {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

	const normalizedDate = targetDate.replace(/\. /g, '-').replace(/\./g, '-');
	const target = new Date(normalizedDate);

	if (isNaN(target.getTime())) return null;

	const targetTime = new Date(target.getFullYear(), target.getMonth(), target.getDate()).getTime();

	const diff = targetTime - today;
	const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

	if (diffDays === 0) {
		return 'D-DAY';
	} else if (diffDays > 0) {
		return `D-${String(diffDays).padStart(2, '0')}`;
	} else {
		return null;
	}
};

export const FormatDateWithDay = (dateString: string) => {
	const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
	const date = new Date(dateString.replace(/\./g, '-'));
	if (isNaN(date.getTime())) return dateString;

	const mm = String(date.getMonth() + 1).padStart(2, '0');
	const dd = String(date.getDate()).padStart(2, '0');
	const day = days[date.getDay()];

	return `${date.getFullYear()}.${mm}.${dd} (${day})`;
};
