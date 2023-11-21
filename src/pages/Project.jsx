import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProjectHeader from "../components/ProjectHeader";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";

const Project = () => {
	const { ownerId, projectId } = useParams();

	return (
		<div className="flex flex-col h-full">
			<Navbar />
			<ProjectHeader ownerId={ownerId} projectId={projectId} />
			<div className="grid grid-cols-12 flex-1">
				<Sidebar ownerId={ownerId} projectId={projectId} />
				<Outlet />
			</div>
		</div>
	);
};

export default Project;
