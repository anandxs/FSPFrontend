import { useToggleProjectArchiveStatusMutation } from "../../features/project/projectApiSlice";

const ArchiveProject = ({ params, data }) => {
	const [toggleProjectArchiveStatus] = useToggleProjectArchiveStatusMutation();

	const handleArchive = async () => {
		try {
			const { ownerId, projectId } = params;
			const response = await toggleProjectArchiveStatus({
				ownerId,
				projectId,
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<button
			className="bg-primary text-white text-sm text-bold px-3 py-1 rounded"
			onClick={handleArchive}
		>
			{data?.isActive ? "Archive Project" : "Unarchive project"}
		</button>
	);
};

export default ArchiveProject;
