"use client";
import React, { useEffect, useState, Fragment } from "react";
import { useRouter, usePathname } from "next/navigation";
import withApollo from "@/lib/withApollo";
import { useQuery } from "@apollo/client";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { UserType, AssignmentType, UserAssignmentDataMapType, WorkWeekType, WorkWeekBlockMemberType } from "../typeInterfaces";
import { processUserAssignmentDataMap, getWorkWeeksForUserByWeekAndYear, drawBar } from "../helperFunctions";
import { GET_USER_LIST } from "../gqlQueries";
import WeekDisplay from "../components/weekDisplay";
import { render } from "@testing-library/react";
import { getWeek } from "date-fns";

const PeopleView: React.FC = () => {
	const [clientSide, setClientSide] = useState(false);
	const [selectedUser, setSelectedUser] = useState<UserType>({
		id: NaN,
		name: "Select",
	});
	const [userAssignmentDataMap, setUserAssignmentDataMap] = useState<UserAssignmentDataMapType>({});
	const [rowIdtoUserIdMap, setRowIdtoUserIdMap] = useState<Map<number, number>>(new Map());
	const router = useRouter();
	const pathname = usePathname();

	const {
		loading: userListLoading,
		error: userListError,
		data: userListData,
	} = useQuery(GET_USER_LIST, {
		context: {
			headers: {
				cookie: clientSide ? document.cookie : null,
			},
		},
		skip: !clientSide,
		errorPolicy: "all",
	});

	useEffect(() => {
		setClientSide(true);
	}, []);

	useEffect(() => {
		if (userListData) {
			// Setup the map of users to their assignments' work weeks
			setUserAssignmentDataMap(processUserAssignmentDataMap(userListData));

			// Setup the map of row ids to user ids
			userListData?.currentCompany?.users?.map((user: UserType, index: number) => {
				if (user.id && !rowIdtoUserIdMap.has(index)) {
					rowIdtoUserIdMap.set(index, user.id);
				}
			});
			console.log("userListData: ", userListData, ", userAssignmentDataMap: ", userAssignmentDataMap, ", rowIdtoUserIdMap: ", rowIdtoUserIdMap);
		}
	}, [userListData]);

	const handleUserChange = (user: UserType) => {
		router.push(pathname + "/" + encodeURIComponent(user.name.toString()));
	};

	const drawBars = (workWeekBlocks: WorkWeekBlockMemberType[], width?: number, height?: number, gap: number = 4, cornerRadius = 6) => {
		if (!width || !height) { return; }
		const labelPadding = 4;

		return (
			<div className="absolute bottom-0 z-30">
				{workWeekBlocks.map((workWeekBlock: WorkWeekBlockMemberType, index: number) => {
					if (workWeekBlock.workWeek.estimatedHours && width && height) {
						const weekHeight = (height * workWeekBlock.workWeek.estimatedHours / 40);
						return (
							<div key={index}>
								<svg width={width + 1} height={weekHeight} xmlns="http://www.w3.org/2000/svg">
									{drawBar(workWeekBlock.consecutivePrevWeeks != 0 ? 0 : gap, (index * gap), cornerRadius, weekHeight, weekHeight, width + 1, workWeekBlock.consecutivePrevWeeks != 0, !workWeekBlock.isLastConsecutiveWeek)}
								</svg>
							</div>

						)
					}

				})}
			</div>

		);
	}

	const drawFTELabels = (workWeekBlocks: WorkWeekBlockMemberType[], prevWeekHasSameProject: boolean[], width?: number, height?: number, gap: number = 4) => {
		if (!width || !height) { return; }
		const labelPadding = 4;

		return (
			<div className="absolute bottom-0 z-40">
				{workWeekBlocks.map((workWeekBlock: WorkWeekBlockMemberType, index: number) => {
					if (workWeekBlock.workWeek.estimatedHours && width && height) {
						const weekHeight = (height * workWeekBlock.workWeek.estimatedHours / 40);
						return (
							<div key={index}
								className="relative z-40"
								style={{
									width: `${width}px`,
									height: `${weekHeight}px`,
									lineHeight: `${weekHeight}px`,
								}}>
								<div
									className="absolute text-bottom text-black text-xs"
									style={{
										left: `${labelPadding + gap}px`,
										bottom: `${labelPadding}px`,
									}}
								>
									{prevWeekHasSameProject[index] ? "" : (workWeekBlock.workWeek.project && workWeekBlock.workWeek.project.name ? workWeekBlock.workWeek.project.name : "")}
								</div>
							</div>
						);
					}
				})}
			</div>
		);
	}

	const renderCell = (cweek: number, year: number, rowIndex: number, isSelected: boolean, width?: number, height?: number) => {

		const userId = rowIdtoUserIdMap.get(rowIndex);

		if (userId) {
			const prevWorkWeeksForUser = getWorkWeeksForUserByWeekAndYear(userAssignmentDataMap, userId, cweek - 1, year) ?? [];
			const workWeeksForUser = getWorkWeeksForUserByWeekAndYear(userAssignmentDataMap, userId, cweek, year) ?? [];

			const prevWeekHasSameProject: boolean[] = [];

			if (prevWorkWeeksForUser.length > 0) {
				workWeeksForUser.forEach((workWeekBlock: WorkWeekBlockMemberType, weekIndex: number) => {
					const hasSameProject = prevWorkWeeksForUser[weekIndex]?.workWeek.project?.name === workWeekBlock.workWeek.project?.name;
					prevWeekHasSameProject.push(hasSameProject);
				});
			}

			if (workWeeksForUser.length > 0) {
				return (
					<div className="relative absolute" style={{ height: height }}>
						{drawBars(workWeeksForUser, width, height)}
						{drawFTELabels(workWeeksForUser, prevWeekHasSameProject, width, height)}
					</div>
				)
			}
		}


		return (<></>)

	}

	return (
		<>
			<WeekDisplay labelContents={
				userListData?.currentCompany?.users?.map((user: UserType) => (
					<div className="flex gap-x-4 gap-y-4 items-center justify-center" key={user.id}>
						<div className="flex w-16 h-16 timeline-grid-bg rounded-full overflow-hidden" onClick={() => handleUserChange(user)}>Portrait</div>
						<div className="flex">{user.name}</div>
					</div>
				))}
				renderCell={renderCell}
			/>
			<div className="flex flex-col">
				<Listbox value={selectedUser} onChange={handleUserChange}>
					{({ open }) => (
						<>
							<div className="w-1/2 mr-2">
								<Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
									Person
								</Listbox.Label>
								<div className="relative mt-2">
									<Listbox.Button className="relative cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
										<span className="flex items-center">
											<span className="ml-3 block truncate">
												{selectedUser.name}
											</span>
										</span>
										<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
											<ChevronDownIcon
												className="h-5 w-5 text-gray-400"
												aria-hidden="true"
											/>
										</span>
									</Listbox.Button>
								</div>

								<Transition
									show={open}
									as={Fragment}
									leave="transition ease-in duration-100"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<Listbox.Options className="absolute z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
										{userListData?.users?.map((user: UserType) => (
											<Listbox.Option
												key={user.id}
												className={({ active }) =>
													active
														? "bg-indigo-600 text-white py-3"
														: "text-gray-900 relative cursor-default select-none py-3 pl-3 pr-9"
												}
												value={user}
											>
												{({ selected, active }) => (
													<>
														<div className="flex items-center">
															<span
																className={
																	selected
																		? "font-semibold"
																		: "font-normal ml-3 block truncate"
																}
															>
																{user.name}
															</span>
														</div>

														{selected ? (
															<span
																className={
																	active
																		? "text-white"
																		: "text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4"
																}
															>
																<CheckIcon
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															</span>
														) : null}
													</>
												)}
											</Listbox.Option>
										))}
									</Listbox.Options>
								</Transition>
							</div>
						</>
					)}
				</Listbox>
			</div>
		</>
	);
};

export default withApollo(PeopleView);
