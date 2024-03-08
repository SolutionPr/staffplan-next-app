"use client";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import withApollo from "@/lib/withApollo";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { UserType } from "../../components/addAssignmentModal";
import {
	AssignmentType,
	calWeekDatesArr,
	parseProjectDates,
	parseWorkWeekDate,
	workWeekArr,
	workWeekComponentsArr,
} from "../../people/helperFunctions";

const GET_USER_ASSIGNMENTS = gql`
	query getUserAssignments($selectedUserId: ID!) {
		userAssignments(userId: $selectedUserId) {
			id
			startsOn
			endsOn
			status
			assignedUser {
				name
				id
			}
			workWeeks {
				id
				actualHours
				assignmentId
				cweek
				estimatedHours
				year
			}
			project {
				name
				id
				startsOn
				endsOn
			}
		}
	}
`;

const GET_USER_LIST = gql`
	{
		users {
			id
			name
		}
	}
`;

const UserPage: React.FC = () => {
	const params = useParams();
	const searchParams = useSearchParams();
	const [clientSide, setClientSide] = useState(false);
	const [selectedUser, setSelectedUser] = useState<UserType>({
		id: NaN,
		name: "Select",
	});

	const [
		getUserAssignments,
		{
			data: userAssignmentData,
			loading: userAssignmentLoading,
			error: userAssignmentError,
			called,
		},
	] = useLazyQuery(GET_USER_ASSIGNMENTS, {
		variables: { selectedUserId: selectedUser.id },
	});

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

	const getUserIdFromName: (name: string) => number | null = (name: string) => {
		// Iterate through the list of users and find the one with the matching name
		if (userListData && userListData.users) {
			for (const user of userListData.users) {
				if (user.name === name) {
					// Return the user's ID as a number
					return parseInt(user.id);
				}
			}
		}
		return null;
	};

	console.log(searchParams);
	if (params.id) {
		console.log(decodeURIComponent(params.name.toString()));
	}

	useEffect(() => {
		setClientSide(true);
	}, []);

	useEffect(() => {
		if (clientSide && userListData) {
			const name = decodeURIComponent(params.name.toString());
			const userId = getUserIdFromName(name);
			if (userId) {
				setSelectedUser({ id: userId, name }); // Adjust if necessary
				getUserAssignments({ variables: { selectedUserId: userId } });
			}
		}
		// Dependencies array includes userListData to re-run this effect when userListData changes.
		// Make sure to include all dependencies correctly.
	}, [clientSide, userListData, params.name]);

	useEffect(() => {
		if (userAssignmentData) {
			console.log(userAssignmentData); // Or perform any action to display this data
		}
	}, [userAssignmentData]);

	if (called && userAssignmentLoading)
		return (
			<p>
				Loading User Assignments for{" "}
				{decodeURIComponent(params.name.toString())}
			</p>
		);
	if (userListLoading) return <p>Finding user...</p>;
	if (userListError) return <p>Error Loading Users List</p>;
	if (userAssignmentError)
		return (
			<p>
				Error Loading User Assignments for{" "}
				{decodeURIComponent(params.name.toString())}
			</p>
		);

	return (
		<div>
			<h1>Assignments for {decodeURIComponent(params.name.toString())}</h1>
			<div className="flex flex-col items-start">
				{userAssignmentData ? (
					userAssignmentData.userAssignments.map(
						(assignment: AssignmentType) => (
							<div key={assignment.id} className="flex">
								<div>
									<p className="text-xl underline">
										Project Name: {assignment.project.name}
									</p>
									{assignment.project.startsOn ? (
										<p>Project Start Date: {assignment.project.startsOn}</p>
									) : (
										""
									)}
									{assignment.project.endsOn ? (
										<p>Project End Date: {assignment.project.endsOn}</p>
									) : (
										""
									)}
									<div className="p-3">
										<span>Assignment Status:{assignment.status}</span>
										<br />
										<span>Assignment Duration</span>
										<br />
										<span>Starts On: {assignment.startsOn}</span>
										<br />
										<span>Ends On: {assignment.endsOn}</span>
										<br />
									</div>
								</div>
								{assignment.project.startsOn ? (
									<p>
										Project Work Week:
										{parseProjectDates(assignment.project.startsOn).cweek}
									</p>
								) : (
									""
								)}
								<div className="p-3 flex">
									{workWeekComponentsArr(
										assignment.startsOn,
										assignment.endsOn,
										calWeekDatesArr,
										workWeekArr(userAssignmentData),
										assignment.id
									)}
								</div>
							</div>
						)
					)
				) : (
					<p>User has no Assignments</p>
				)}
			</div>
		</div>
	);
};

export default withApollo(UserPage);
