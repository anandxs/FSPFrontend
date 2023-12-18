import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";

const Project = () => {
	const { projectId } = useParams();
	const sections = [
		{
			header: "Dashboard",
			link: `/projects/${projectId}/dashboard`,
		},
		{
			header: "Tasks",
			link: `/projects/${projectId}/tasks`,
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

	return (
		<div className="flex flex-col h-full">
			<Navbar />
			<div className="grid grid-cols-12 flex-1">
				<Sidebar sections={sections} />
				<Outlet />
			</div>
		</div>
	);
};

export default Project;
