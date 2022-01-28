enum SplitInterval {
	Hour,
	Day,
	Month,
}

interface splitTimeObject {
	object: {};
	beginDate: Date;
	endDate: Date;
	splitInterval: SplitInterval;
}
import * as _ from "lodash";
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

	public splitTimeObjectToArrayOfObjects(x: splitTimeObject): Array<splitTimeObject> | null {
		const recurencyFunction = this.initSplitTimeObjectToArrayOfObjects();
		return recurencyFunction([x], recurencyFunction);
	}

	private initSplitTimeObjectToArrayOfObjects() {
		const TimeObjectDivider = this.initTimeObjectDivider();
		return (x: splitTimeObject[], recurentFunction: Function) => {
			let recurency = TimeObjectDivider(x);
			if (!recurency.flag) {
				return recurentFunction(recurency.result, recurentFunction);
			}
			if (recurency.flag) {
				return recurency.result;
			}
			return null;
		};
	}

	private initTimeObjectDivider() {
		let resultArray: splitTimeObject[] = [];
		return (x: splitTimeObject[]) => {
			let resultObject: splitTimeObject[] = _.cloneDeep(x);
			let resultWraper: { result: splitTimeObject[]; flag: boolean } = {
				result: resultObject,
				flag: false,
			};
			const DifferenceInTimeInMinutes = (x[0].endDate.getTime() - x[0].beginDate.getTime()) / 1000 / 60;
			if (DifferenceInTimeInMinutes < this.minutesUntilMidnight(x[0].beginDate)) {
				resultArray.push(resultObject[0]);
				resultWraper.result = resultArray;
				resultWraper.flag = true;
				return resultWraper;
			}
			resultObject[0].endDate = this.sameDayButMidnight(resultObject[0].beginDate);
			resultArray.push(resultObject[0]);
			let nextObject: splitTimeObject[] = _.cloneDeep(x);
			nextObject[0].beginDate = this.sameDayButMidnight(resultObject[0].beginDate);
			resultWraper.result = nextObject;
			return resultWraper;
		};
	}

	private sameDayButMidnight(date: Date) {
		let midnight: Date = _.cloneDeep(date);
		midnight.setHours(24);
		midnight.setMinutes(0);
		midnight.setSeconds(0);
		midnight.setMilliseconds(0);
		return midnight;
	}

	private minutesUntilMidnight(date: Date) {
		return (this.sameDayButMidnight(date).getTime() - date.getTime()) / 1000 / 60;
	}
}

export default DataParser;
