export interface splitTimeObject {
	object: {};
	beginDate: Date;
	endDate: Date;
}

export const isOfType = <T>(varToBeChecked: any, propertyToCheckFor: keyof T): varToBeChecked is T =>
	(varToBeChecked as T)[propertyToCheckFor] !== undefined;
