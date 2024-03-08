"use client";
import { useState, useEffect } from "react";
import ProjectDatepicker from "./projectDatepicker";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { gql, useQuery, useMutation } from "@apollo/client";
import withApollo from "@/lib/withApollo";
import { Field, Formik, FormikValues } from "formik";
export interface ClientType {
	description: string;
	id: number;
	name: string;
	projects?: [ProjectType];
}
export interface ProjectType {
	endsOn: string | null;
	id: number;
	name: string;
	paymentFrequency: string;
	startsOn: string | null;
	status: string;
	users: [];
}

export interface ProjectValuesType {
	endsOn: string;
	hours: number;
	name: string;
	numOfFTE: string;
	numOfWeeks: string;
	startsOn: string;
	paymentFrequency: string;
	cost: number;
}

const GET_DATA = gql`
	{
		clients {
			description
			id
			name
			projects {
				id
				name
			}
			status
		}
	}
`;

const UPSERT_PROJECT = gql`
	mutation UpsertProjectUpdate(
		$clientId: ID
		$name: String
		$status: String
		$startsOn: ISO8601Date
		$endsOn: ISO8601Date
	) {
		upsertProject(
			clientId: $clientId
			name: $name
			status: $status
			startsOn: $startsOn
			endsOn: $endsOn
		) {
			id
			client {
				id
				name
			}
			name
			status
			cost
			paymentFrequency
			startsOn
			endsOn
		}
	}
`;

const AddProject = () => {
	const [clientSide, setClientSide] = useState(false);
	const router = useRouter();
	// const [projectNameExists, setProjectNameExists] = useState(false);
	useEffect(() => {
		setClientSide(true);
	}, []);

	const initialValues = {
		client: "",
		dates: { endsOn: "", startsOn: "" },
		hours: 0,
		name: "",
		numOfFTE: "",
		numOfWeeks: "",
		paymentFrequency: "flatRate",
		cost: 0,
		status: false,
	};

	const searchParams = useSearchParams();
	const pathName = usePathname();
	const showModal = searchParams.get("projectmodal");

	const { loading, error, data } = useQuery(GET_DATA, {
		context: {
			headers: {
				cookie: clientSide ? document.cookie : null,
			},
		},
		skip: !clientSide,
		errorPolicy: "all",
	});
	const [
		upsertProject,
		{ data: mutationData, loading: mutationLoading, error: mutationError },
	] = useMutation(UPSERT_PROJECT, { errorPolicy: "all" });
	if (loading || mutationLoading) return <p> LOADING PROJECT</p>;
	if (error || mutationError) return <p>ERROR PROJECT</p>;

	// const calculateHours = (values) => {
	// 	const weeklyFTECost = 38 * parseFloat(values.numOfFTE);
	// 	const totalHours = parseInt(values.numOfWeeks) * weeklyFTECost;
	// };

	//checks to see if the project name is already in use by the client, this will likely change this will be replaced by validation

	// const projectNameExists = (data: { clients: [ClientType] }) => {
	// 	const selectedClientProjects = data.clients.find((client) => {
	// 		if (client.id === selectedClient.id) return client;
	// 	});
	// 	const projectExists = selectedClientProjects?.projects?.find((project) => {
	// 		if (project.name === values.name) {
	// 			return project;
	// 		}
	// 	});
	// 	return projectExists;
	// };

	const onSubmitUpsert = (values: FormikValues) => {
		upsertProject({
			variables: {
				clientId: values.client,
				name: values.name,
				status: values.status ? "active" : "archived",
				startsOn: values.dates.startsOn,
				endsOn: values.dates.endsOn,
			},
		}).then(() => router.push("/projects"));
	};
	const onCancel = () => router.push("/projects");
	return (
		<>
			{showModal && (
				<div
					className="relative z-10"
					aria-labelledby="project-modal"
					role="dialog"
					aria-modal="true"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
					<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
						<div className="flex min-h-full p-4 text-center justify-center sm:items-center sm:p-0">
							<div className="relative transform overflow-hidden w-1/2 rounded-xl bg-white text-left shadow-xl transition-all">
								<div className="bg-white p-10">
									<div className="sm:flex-auto">
										<div>
											<Formik
												onSubmit={(e) => {
													console.log("CLICKED SUBMIT");
													onSubmitUpsert(e);
												}}
												initialValues={initialValues}
												validator={() => ({})}
											>
												{({
													handleSubmit,
													handleChange,
													dirty,
													values,
													resetForm,
													setFieldValue,
													setErrors,
												}) => (
													<form
														onSubmit={handleSubmit}
														className="max-w-lg mx-auto"
													>
														{/* section 1 */}
														<div className="flex mb-4 pb-2 border-b-4">
															<div className="w-1/3 mr-4 flex flex-col">
																<label htmlFor="projectName">
																	Name(*required)
																	<input
																		autoComplete="off"
																		id="projectName"
																		name="name"
																		value={values.name}
																		onChange={(e) => {
																			handleChange(e);
																			console.log(values);
																		}}
																		className="block mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
																		placeholder="Enter Name"
																	/>
																</label>
															</div>
															<div className="w-1/3 mr-4 flex flex-col">
																<Field
																	onChange={handleChange}
																	as="select"
																	// value={values.client}
																	name="client"
																	id="client"
																>
																	<option value={"SELECT"}>SELECT</option>
																	{data?.clients?.map((client: ClientType) => {
																		// console.log(client,"CLIENT")
																		return (
																			<option
																				key={`${client.id} + ${client.name}`}
																				value={client.id}
																			>
																				{" "}
																				{client.name}
																			</option>
																		);
																	})}
																</Field>
															</div>
															<div className="mr-2 flex items-center">
																<label className="inline-block pl-[0.15rem] hover:cursor-pointer">
																	<Field
																		className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
																		type="checkbox"
																		name="status"
																	/>
																	{values.status ? "confirmed" : "unconfirmed"}
																</label>
															</div>
														</div>
														{/* section 2 */}
														<div className="flex mb-4 pb-2 border-b-4">
															<div className="w-1/5 mr-4 flex flex-col">
																<Field
																	name="dates"
																	component={ProjectDatepicker}
																/>
															</div>
														</div>
														{/* section 3 */}
														<div className="flex mb-4 pb-2 border-b-4 space-x-10">
															<div className="w-1/5 mr-4 flex flex-col">
																<label className="block font-medium text-gray-900">
																	FTE
																	<input
																		type="number"
																		min="1"
																		max="100"
																		step="0.5"
																		name="numOfFTE"
																		id="numOfFTE"
																		autoComplete="numOfFTE"
																		className="block w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
																		placeholder="1.0"
																		onChange={handleChange}
																		value={values.numOfFTE}
																	/>
																</label>
															</div>
															<div className="w-1/5 mr-4 flex flex-col">
																<label
																	htmlFor="numOfWeeks"
																	className="block font-medium text-gray-900"
																>
																	# of Weeks
																</label>
																<input
																	type="number"
																	min="1"
																	max="999"
																	name="numOfWeeks"
																	id="numOfWeeks"
																	autoComplete="numOfWeeks"
																	className="block w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
																	placeholder="1"
																	onChange={handleChange}
																	value={values.numOfWeeks}
																/>
															</div>
															<div className="w-1/5 flex flex-col">
																<label
																	htmlFor="hours"
																	className="block font-medium text-gray-900"
																>
																	Total Hours
																</label>
																<input
																	type="number"
																	name="hours"
																	id="hours"
																	autoComplete="hours"
																	className="block w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
																	placeholder=""
																	value={values.hours}
																	readOnly
																/>
																<span
																//this will be replaced by validation
																// onClick={(values) => calculateHours(values)}
																>
																	Recalculate Hours
																</span>
															</div>
														</div>
														{/* Section 4 */}
														<div className="flex mb-4 pb-2 border-b-4">
															<div className="w-1/3 mr-3 flex flex-col">
																<div className="block">
																	<label>
																		<Field
																			type="radio"
																			name="paymentFrequency"
																			value="flatRate"
																			id="flatRate"
																		/>
																		Flat Rate
																	</label>
																</div>
																<div className="block">
																	<label>
																		<Field
																			type="radio"
																			name="paymentFrequency"
																			value="hourlyRate"
																			id="hourlyRate"
																		/>
																		Hourly Rate
																	</label>
																</div>
															</div>
															<div className="w-1/3 mr-4 flex">
																<label>
																	<span className="relative">
																		<span className="absolute inset-y-0 left-0 pl-3 pb-5 flex items-center pointer-events-none">
																			$
																		</span>
																		<input
																			className="w-full max-w-xs block mt-1 mr-3 pl-6 px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
																			placeholder="0"
																		/>
																	</span>
																	Rate($/hr)
																</label>
																<label>
																	<span className="relative">
																		<span className="absolute inset-y-0 left-0 pl-3 pb-5 flex items-center pointer-events-none">
																			$
																		</span>
																		<input
																			className="w-full max-w-xs block mt-1 mr-3 pl-6 px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
																			placeholder="0"
																		/>
																	</span>
																	Value(k$)
																</label>
															</div>
														</div>
														{/* section 5 */}
														<div className="flex mb-4 justify-between">
															<div className="mr-2">
																<button
																	type="button"
																	className="p-2 text-sm font-semibold leading-6 text-gray-900"
																	onClick={() => {
																		onCancel();
																		setErrors({});
																	}}
																>
																	Cancel
																</button>
																<button
																	type="submit"
																	className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
																>
																	Save
																</button>
															</div>
														</div>
													</form>
												)}
											</Formik>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
export default withApollo(AddProject);
