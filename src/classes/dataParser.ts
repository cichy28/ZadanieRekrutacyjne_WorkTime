enum SplitInterval {
	Hour,
	Day,
	Month,
}

class DataParser {
	constructor() {}

	public splitArrayToArrayOfArrays(array: Array<{}>, numberOfElementsInArray: number): Array<Array<{}>> | null {
		if (array.length <= numberOfElementsInArray) return null;
		const resultArray = [];
		for (let index = 0; index < array.length - numberOfElementsInArray; index += numberOfElementsInArray) {
			let resultArray2 = [];
			for (let index2 = index; index2 < index + numberOfElementsInArray; index2++) {
				resultArray2.push(array[index2]);
			}
			resultArray.push(resultArray2);
		}
		return resultArray;
	}

	public splitTimeObjectToArrayOfObjects(
		object: {},
		beginDate: Date,
		endDate: Date,
		splitInterval: SplitInterval
	): Array<{}> {
		const DifferenceInTimeInMinutes = (endDate.getTime() - beginDate.getTime()) / 1000 / 60;
		const resultArray = [];
		if (DifferenceInTimeInMinutes < this.minutesUntilMidnight(beginDate)) {
			resultArray.push(object);
			return resultArray;
		}
		return [{ a: "dupa" }];
	}

	private minutesUntilMidnight(date: Date) {
		let midnight: Date = new Date(date);
		midnight.setHours(24);
		midnight.setMinutes(0);
		midnight.setSeconds(0);
		midnight.setMilliseconds(0);
		return (midnight.getTime() - date.getTime()) / 1000 / 60;
	}
}

export default DataParser;
