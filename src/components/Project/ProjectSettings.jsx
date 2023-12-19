import DeleteProject from "./DeleteProject";
import ArchiveProject from "./ArchiveProject";
import ExitProject from "./ExitProject";
import RenameProject from "./RenameProject";
import { useContext } from "react";
import { ProjectContext } from "../../pages/Project";

const ProjectSettings = () => {
	const data = useContext(ProjectContext);

	return (
		<div className="m-2 p-2">
			<h1 className="text-xl font-bold hover:underline w-fit mb-3">
				Project Settings
			</h1>
			<div className="flex flex-col gap-2 border border-black rounded-md p-4">
				<div className="flex justify-between items-center border border-black rounded-md p-2">
					<p>Rename Project</p>
					<RenameProject />
				</div>
				<div className="flex justify-between items-center border border-black rounded-md p-2">
					<p>Leave Project</p>
					<ExitProject />
				</div>
				<div className="flex justify-between items-center border border-black rounded-md p-2">
					<p>Archive/Close this project</p>
					<ArchiveProject data={data} />
				</div>
				<div className="flex justify-between items-center border border-black rounded-md p-2">
					<p>Delete this project</p>
					<DeleteProject />
				</div>
			</div>
		</div>
	);
};

export default ProjectSettings;
