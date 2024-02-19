"use client";
import React from "react";
import withApollo from "@/lib/withApollo";
import apolloClient from "@/lib/apollo-client";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import AddAssignment from "../components/addAssignment";

const GET_DATA = gql`
{
	clients {
	  id
	  projects {
		name
		status
		paymentFrequency
		users {
		  id
		  name
		  companies{
			name
		  }
		}
	  }
	}
  }
`;

const Projects: React.FC = () => {
	const [clientSide, setClientSide] = useState(false);

	useEffect(() => {
		setClientSide(true);
	}, []);
	const { loading, error, data } = useQuery(GET_DATA, {
		context: {
			headers: {
				cookie: clientSide ? document.cookie : null,
			},
		},
		skip: !clientSide,
		errorPolicy: "all",
	});
	if (loading) return <p> LOADING</p>;
	if (error) return <p>ERROR</p>
	return JSON.stringify(data);
};

export default withApollo(Projects)

