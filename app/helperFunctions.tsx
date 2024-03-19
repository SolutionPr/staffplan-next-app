import { DateTime, Interval } from "luxon";
import { differenceInWeeks } from "date-fns";
import { WorkWeek } from "./components/workWeek";
import {
	AssignmentType,
	UserAssignmentDataType,
	WorkWeekType,
	UserAssignmentDataMapType,
	WorkWeekBlockMemberType,
} from "./typeInterfaces";
// convert a human readable date to calendar week and year
export const parseProjectDates = (date: string) => {
	return {
		cweek: parseInt(DateTime.fromISO(date).toFormat("W")),
		year: parseInt(DateTime.fromISO(date).toFormat("kkkk")),
	};
};

// creates a human readable date from calendar week and year
export const parseWorkWeekDate = (weekYear: number, weekNumber: number) => {
	return DateTime.fromObject({ weekYear, weekNumber }).toISODate();
};

// returns an array of workWeeks with a formatted date added to the object
export const workWeekArr = (userAssignmentData: UserAssignmentDataType) => {
	return userAssignmentData?.userAssignments.flatMap(
		(assignment: AssignmentType) =>
			assignment.workWeeks.map((week: WorkWeekType) => {
				const date = parseWorkWeekDate(week.year, week.cweek);
				return { workWeek: week, date };
			})
	);
};

//an array of calendar dates, IF an assignment has a start and end date we set the workWeeks to follow those dates, otherwise we generate dates for current week thru end of year
export const calWeekDatesArr = (
	startDate: string | null,
	endDate: string | null
) => {
	return Interval.fromDateTimes(
		//we set the start date to monday to ensure it captures that week
		startDate
			? DateTime.fromISO(startDate).set({ weekday: 1 })
			: DateTime.now().set({ weekday: 1 }),
		//we set the end date to tuesday to ensure it captures the monday of that week
		endDate
			? DateTime.fromISO(endDate).set({ weekday: 2 })
			: DateTime.now().endOf("year").set({ weekday: 2 })
		// DateTime.now().endOf("year").set({ weekday: 1 })
	)
		.splitBy({ days: 1 })
		.filter((dur: Interval<true>) => dur.start.weekday === 1)
		.map((dur: Interval<true>) => dur.start.toISODate());
};

//compare work week data and array of weeks and generate components accordingly
export const workWeekComponentsArr = (
	assignmentStartDate: string | null,
	assignmentEndDate: string | null,
	calWeekDatesArr: (
		assignmentStartDate: string | null,
		assignmentEndDate: string | null
	) => string[],
	workWeekArr: { workWeek: WorkWeekType; date: string | null }[],
	assignmentId: number
) => {
	return calWeekDatesArr(assignmentStartDate, assignmentEndDate).map(
		(date: string) => {
			//if a workWeek entry exists for a date include it in the array of work week inputs
			const existingWeek = workWeekArr?.find(
				(week: { workWeek: WorkWeekType; date: string | null }) =>
					week.date == date && week.workWeek.assignmentId == assignmentId
			);
			if (existingWeek) {
				return (
					<WorkWeek key={existingWeek.date} workWeek={existingWeek.workWeek} />
				);
			}
			const { cweek, year } = parseProjectDates(date);
			return <WorkWeek key={date} workWeek={{ assignmentId, cweek, year }} />;
		}
	);
};

export function getDateFromWeekAndYear(cweek: number, year: number): Date {
	const firstDayOfYear = new Date(year, 0, 1);
	const dayOfWeek = firstDayOfYear.getDay();
	const firstMondayOfYear = new Date(year, 0, 1 + ((8 - dayOfWeek) % 7));
	return new Date(firstMondayOfYear.getFullYear(), firstMondayOfYear.getMonth(), firstMondayOfYear.getDate() + (cweek - 1) * 7);
}

export function processUserAssignmentDataMap(userAssignmentDataMap: any): UserAssignmentDataMapType {
	const processedDataMap: UserAssignmentDataMapType = {};

	userAssignmentDataMap.currentCompany.users.forEach((user: any) => {
		const userId = user.id;
		processedDataMap[userId] = {};
		let maxTotalEstHours = 40;

		// Calculate the max total number of estimated hours in the assignment
		user.assignments.forEach((assignment: any) => {
			if (assignment.project.id && assignment.workWeeks.length > 0) {
				let totalEstHoursInAssignment = 0;

				assignment.workWeeks.forEach((workWeek: any) => {
					totalEstHoursInAssignment += workWeek.estimatedHours;
				});

				if (totalEstHoursInAssignment > maxTotalEstHours) {
					maxTotalEstHours = totalEstHoursInAssignment;
				}
			}
		});

		// Add the data to the map
		user.assignments.forEach((assignment: any) => {
			if (assignment.project.id && assignment.workWeeks.length > 0) {
				processedDataMap[userId][assignment.project.id] = {};
				let itemEstHoursOffset = 0;

				assignment.workWeeks.forEach((workWeek: any) => {
					if (!processedDataMap[userId][assignment.project.id][workWeek.year]) {
						processedDataMap[userId][assignment.project.id][workWeek.year] = {};
					}
					
					let consecutivePrevWeeks = 0;

					// Check if the previous week is consecutive and update the consecutivePrevWeeks count
					if (processedDataMap[userId][assignment.project.id][workWeek.year][workWeek.cweek - 1]){
						const prevWeek = processedDataMap[userId][assignment.project.id][workWeek.year][workWeek.cweek - 1];
						consecutivePrevWeeks = prevWeek.consecutivePrevWeeks + 1;
						prevWeek.isLastConsecutiveWeek = false;
					}

					// Add the work week to the map
					processedDataMap[userId][assignment.project.id][workWeek.year][workWeek.cweek] = {
						workWeek: workWeek,
						maxTotalEstHours: maxTotalEstHours,
						itemEstHoursOffset: itemEstHoursOffset,
						consecutivePrevWeeks: consecutivePrevWeeks,
						isLastConsecutiveWeek: true,
					};
					itemEstHoursOffset += workWeek.estimatedHours;
				});

			}
		});
	});

	return processedDataMap;
}

export function getWorkWeeksForUserByWeekAndYear(
	userAssignmentDataMap: UserAssignmentDataMapType,
	userId: number,
	cweek: number,
	year: number
): WorkWeekBlockMemberType[] {
	const workWeeksBlocksByProject: WorkWeekBlockMemberType[] = [];

	if (userAssignmentDataMap[userId]) {
		for (const projectId in userAssignmentDataMap[userId]) {
			if (
				userAssignmentDataMap[userId][projectId] &&
				userAssignmentDataMap[userId][projectId][year] &&
				userAssignmentDataMap[userId][projectId][year][cweek]
			) {
				workWeeksBlocksByProject.push(userAssignmentDataMap[userId][projectId][year][cweek]);
			}
		}
	}

	return workWeeksBlocksByProject;
}

// Draws a bar with rounded corners for the schedule
export const drawBar = (xOffset: number, yOffset: number, 
	targetCornerRadius: number, 
	barHeight: number, fullBarHeight: number, fullBarWidth: number, 
	hasTopLeftConnection: boolean = false, hasTopRightConnection: boolean = true, 
	key?: number) => {
	const cornerRadius = Math.min(targetCornerRadius, barHeight);
	const vLength = hasTopRightConnection ? barHeight + cornerRadius : barHeight - cornerRadius;
	const hLength = fullBarWidth - 2 * cornerRadius;

	const topSection = ("M " + xOffset + ", " + (hasTopLeftConnection ? (yOffset + fullBarHeight - barHeight - cornerRadius) : (yOffset + cornerRadius + (fullBarHeight - barHeight)))
	+ " a " + cornerRadius + "," + (hasTopLeftConnection ? (cornerRadius + " 0 0 0 " + cornerRadius + "," + cornerRadius) : (cornerRadius + " 0 0 1 " + cornerRadius + "," + (cornerRadius * -1)))
	+ " h " + hLength
	+ " a " + cornerRadius + "," + (hasTopRightConnection ? (cornerRadius + " 0 0 0 " + cornerRadius + "," + (cornerRadius * -1)) : (cornerRadius + " 0 0 1 " + cornerRadius + "," + cornerRadius))
	);

	return (
		<path key={key} d={topSection
			+ " v " + vLength + " h " + (fullBarWidth * -1) + " z"}
			fill="blue" />
	)

}