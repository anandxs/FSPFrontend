import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import ProjectHeader from "../components/Project/ProjectHeader";
import Sidebar from "../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Project = () => {
	const { projectId } = useParams();
	const sections = [
		{
			header: "Dashboard",
			link: `/projects/${projectId}/dashboard`,
		},
		{
			header: "Groups",
			link: `/projects/${projectId}/groups`,
		},
		{
			header: "Members",
			link: `/projects/${projectId}/members`,
		},
	];

	const navigate = useNavigate();
	useEffect(() => {
		navigate("dashboard");
	}, []);

	return (
		<div className="flex flex-col h-full">
			<Navbar />
			<ProjectHeader projectId={projectId} />
			<div className="grid grid-cols-12 flex-1">
				<Sidebar sections={sections} />
				<Outlet />
			</div>
		</div>
	);
};

export default Project;
