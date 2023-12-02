import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import ProjectHeader from "../components/Project/ProjectHeader";
import Sidebar from "../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Project = () => {
	const { ownerId, projectId } = useParams();
	const sections = [
		{
			header: "Dashboard",
			link: `/${ownerId}/projects/${projectId}/dashboard`,
		},
		{
			header: "Groups",
			link: `/${ownerId}/projects/${projectId}/groups`,
		},
		{
			header: "Members",
			link: `/${ownerId}/projects/${projectId}/members`,
		},
	];

	const navigate = useNavigate();
	useEffect(() => {
		navigate("dashboard");
	}, []);

	return (
		<div className="flex flex-col h-full">
			<Navbar />
			<ProjectHeader ownerId={ownerId} projectId={projectId} />
			<div className="grid grid-cols-12 flex-1">
				<Sidebar sections={sections} />
				<Outlet />
			</div>
		</div>
	);
};

export default Project;
