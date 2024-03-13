"use client";
import React, { useEffect, useState, Fragment } from "react";
import { useRouter, usePathname } from "next/navigation";
import withApollo from "@/lib/withApollo";
import {  useQuery } from "@apollo/client";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { UserType } from "./typeInterfaces";
import { GET_USER_LIST } from "./gqlQueries";


const PeopleView: React.FC = () => {
	const [clientSide, setClientSide] = useState(false);
	const [selectedUser, setSelectedUser] = useState<UserType>({
		id: NaN,
		name: "Select",
	});
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		setClientSide(true);
	}, []);

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

	const handleUserChange = (user: UserType) => {
		router.push(pathname + "/" + encodeURIComponent(user.name.toString()));
	};

	return (
		<div className="flex flex-col">
			<Listbox value={selectedUser} onChange={handleUserChange}>
				{({ open }) => (
					<>
						<div className="w-1/2 mr-2">
							<Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
								Person
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
							</Listbox.Label>
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
	);
};

export default withApollo(PeopleView);