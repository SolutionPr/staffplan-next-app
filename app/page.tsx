"use client";
import {
	ApolloClient,
	ApolloLink,
	gql,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
	useQuery,
} from "@apollo/client";
import { useEffect, useState } from "react";
import apolloClient from "@/lib/apollo-client";
import withApollo from "../lib/withApollo";

const GET_DATA = gql`
	{
		userAssignments {
			id
			project {
				id
				name
				status

				assignments {
					id
					status

					user {
						id
						name
						email
					}

					workWeeks {
						cweek
						year
						estimatedHours
						actualHours
					}
				}

				client {
					name
				}
			}
		}
	}
`;

const HomePage: React.FC = () => {
	const [clientSide, setClientSide] = useState(false);

	useEffect(() => {
		// Once the component mounts, we know it's client-side
		setClientSide(true);
	}, []);

	const { loading, error, data } = useQuery(GET_DATA, {
		context: {
			headers: {
				// Access document.cookie only if on the client side
				cookie: clientSide ? document.cookie : null,
			},
		},
		skip: !clientSide, // Skip the query on the server side
		errorPolicy: "all",
	});

	if (loading) return <p className="text-gray-600">Loading...</p>;
	if (error) return <p className="text-red-600">Error :(</p>;

	return <>This is the / page</>
};

export default withApollo(HomePage);
