"use client";
import React from "react";
import withApollo from "@/lib/withApollo";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { AssignmentType, ClientType, ProjectType } from "../typeInterfaces";
import { GET_ALL_PROJECTS_DATA } from "../gqlQueries";
import WeekDisplay from "../components/weekDisplay";
import { Project } from "next/dist/build/swc";

const Projects: React.FC = () => {
	const [clientSide, setClientSide] = useState(false);
	const [projectsList, setProjectsList] = useState<ProjectType[]>([]);

	useEffect(() => {
		setClientSide(true);
	}, []);
	const { loading, error, data: projectData } = useQuery(GET_ALL_PROJECTS_DATA, {
		context: {
			headers: {
				cookie: clientSide ? document.cookie : null,
			},
		},
		skip: !clientSide,
		errorPolicy: "all",
	});

	const handleProjectChange = (project: ProjectType) => {
		console.log("Viewing project: ", project);
	}

	useEffect(() => {
		if (projectData && projectData.currentCompany?.projects) {

			let allProjects: ProjectType[] = [];

			console.log("Projects: ", projectData.currentCompany?.projects);
			
			setProjectsList(projectData.currentCompany?.projects);
		}
		
	}, [projectData]);

	if (loading) return <p> LOADING PROJECTS</p>;
	if (error) return <p>ERROR PROJECTS</p>;
	return (
		<div>
			<WeekDisplay labelContents={
				projectsList.map((project) => (
					<div className="flex gap-x-4 gap-y-4 items-center justify-center" key={project.id}>
						<div className="flex w-16 h-16 timeline-grid-bg rounded-full overflow-hidden" onClick={() => handleProjectChange(project)}>Portrait</div>
						<div className="flex">{project.name}</div>
					</div>
				))
			} />
		</div>
	);
};

export default withApollo(Projects);
