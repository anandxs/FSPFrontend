import { useDispatch } from "react-redux";
import { useDeleteProjectMutation } from "../../features/project/projectApiSlice";
import { unsetProject } from "../../features/project/projectSlice";
import { useNavigate } from "react-router-dom";

const DeleteProject = ({ params }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [deleteProject] = useDeleteProjectMutation();

	const handleDelete = async () => {
		try {
			const { ownerId, projectId } = params;
			await deleteProject({ ownerId, projectId });
			dispatch(unsetProject());
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<button
			className="bg-orange-500 text-white text-sm text-bold px-3 py-1 rounded"
			onClick={handleDelete}
		>
			Delete Project
		</button>
	);
};

export default DeleteProject;
