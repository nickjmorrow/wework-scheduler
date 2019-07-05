export const isDateEqual = (dateOne: Date, dateTwo: Date) =>
	dateOne.getDate() === dateTwo.getDate() && dateOne.getMonth() === dateTwo.getMonth();