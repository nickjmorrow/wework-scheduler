export const isDateEqual = (dateOne: Date, dateTwo: Date) =>
	dateOne.getUTCDate() === dateTwo.getUTCDate() && dateOne.getUTCMonth() === dateTwo.getUTCMonth();
