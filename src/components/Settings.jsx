import { useSelector } from "react-redux";
import { selectProjectArchiveStatus } from "../features/project/projectSlice";
import { useToggleProjectArchiveStatusMutation } from "../features/project/projectApiSlice";
import { useParams } from "react-router-dom";

const Settings = () => {
	// const { isActive } = useSelector(selectProjectArchiveStatus);
	const [toggleArchive] = useToggleProjectArchiveStatusMutation();

	const { ownerId, projectId } = useParams();

	const handleToggle = async () => {
		try {
			const response = await toggleArchive({ ownerId, projectId }).unwrap();
			console.log(response);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<div className="col-span-10 p-2">
			<h1 className="text-2xl font-bold mt-3">Project Settings</h1>
			<div className="py-3 mt-3 flex flex-row justify-start gap-2 flex-wrap">
				<button
					type="button"
					className="bg-gray-500 text-white font-semibold p-2 rounded-md"
					onClick={handleToggle}
				>
					Archive
				</button>
				{true && (
					<button
						type="button"
						className="bg-orange-600 text-white font-semibold p-2 rounded-md"
					>
						Delete Project
					</button>
				)}
			</div>
		</div>
	);
};

export default Settings;
