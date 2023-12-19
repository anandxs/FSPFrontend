import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "../features/project/projectApiSlice";
import { createContext } from "react";

export const ProjectContext = createContext({
	projectId: null,
	name: null,
	ownerId: null,
});

const Project = () => {
	const { projectId } = useParams();
	const sections = [
		{
			header: "Tasks",
			link: `/projects/${projectId}/tasks`,
		},
		{
			header: "Dashboard",
			link: `/projects/${projectId}/dashboard`,
		},
		{
			header: "Stages",
			link: `/projects/${projectId}/stages`,
		},
		{
			header: "Task Types",
			link: `/projects/${projectId}/types`,
		},
		{
			header: "Roles",
			link: `/projects/${projectId}/roles`,
		},
		{
			header: "Members",
			link: `/projects/${projectId}/members`,
		},
		{
			header: "Settings",
			link: `/projects/${projectId}/settings`,
		},
	];

	const {
		data: project,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetProjectQuery({ projectId });

	let data;
	if (isSuccess) {
		data = project;
	} else if (isError) {
		console.log(error);
	}

	return (
		<ProjectContext.Provider value={{ ...data }}>
			<div className="flex flex-col h-full">
				<Navbar />
				<div className="grid grid-cols-12 flex-1">
					<Sidebar sections={sections} />
					<div className="col-span-10">
						<h1 className="underline px-3 py-1 font-bold text-lg bg-primary text-white">
							{data?.name}
						</h1>
						<Outlet />
					</div>
				</div>
			</div>
		</ProjectContext.Provider>
	);
};

export default Project;
