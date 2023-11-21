import { useNavigate } from "react-router-dom";
import {
	useGetProjectByIdQuery,
	useToggleProjectArchiveStatusMutation,
	useUpdateProjectNameMutation,
	useDeleteProjectMutation,
} from "../features/project/projectApiSlice";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectProjectArchiveStatus,
	setProject,
	unsetProject,
} from "../features/project/projectSlice";
import CreateGroupModal from "./CreateGroupModal";
import { Link } from "react-router-dom";

const ProjectHeader = ({ ownerId, projectId }) => {
	const [updateNameToggle, setUpdateNameToggle] = useState(false);
	const [createGroupToggle, setCreateGroupToggle] = useState(false);

	const { data } = useGetProjectByIdQuery({ ownerId, projectId });
	const [updateProject] = useUpdateProjectNameMutation();
	const [deleteProject] = useDeleteProjectMutation();
	const [toggleProjectArchiveStatus] = useToggleProjectArchiveStatusMutation();

	const isActive = useSelector(selectProjectArchiveStatus);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const form = useForm();

	const { register, formState, handleSubmit, setValue } = form;
	const { errors } = formState;

	useEffect(() => {
		dispatch(setProject({ ...data }));
	}, [data]);

	const onSubmit = async ({ projectName }) => {
		try {
			const response = await updateProject({
				ownerId,
				projectId,
				name: projectName,
			}).unwrap();
			setUpdateNameToggle(false);
		} catch (err) {
			console.log(err);
		}
	};

	const handleArchive = async () => {
		console.log(isActive);
		try {
			const response = await toggleProjectArchiveStatus({
				ownerId,
				projectId,
			}).unwrap();
		} catch (err) {
			console.log(err);
		}
	};

	const handleDelete = async () => {
		try {
			const response = await deleteProject({ ownerId, projectId }).unwrap();
			dispatch(unsetProject());
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="bg-blue-300 py-2 flex flex-row justify-between px-4">
			<div className="flex flex-row gap-3">
				{updateNameToggle ? (
					<form
						onSubmit={handleSubmit(onSubmit)}
						noValidate
						className="flex flex-row gap-1"
					>
						<input
							type="text"
							className="rounded bg-blue-100 border-black-1 w-32"
							{...register("projectName", {
								required: "Project name is requried.",
							})}
						/>
						<p className="text-xs text-red-600">
							{errors?.projectName?.message}
						</p>
						<button
							type="submit"
							className="bg-primary text-white text-sm text-bold px-3 py-1 rounded"
						>
							Ok
						</button>
						<button
							onClick={() => setUpdateNameToggle(false)}
							button="button"
							className="bg-primary text-white text-sm text-bold px-3 py-1 rounded"
						>
							Cancel
						</button>
					</form>
				) : (
					<p
						className="text-md font-bold"
						onClick={() => {
							setValue("projectName", data?.name);
							setUpdateNameToggle(true);
						}}
					>
						{data?.name}
					</p>
				)}
				<p>&gt;&gt;</p>
				<p className="text-md font-bold">Dashboard</p>
			</div>
			<div className="flex flex-row gap-2">
				<div className="flex flex-col gap-3">
					<button
						className="bg-primary text-white text-sm text-bold px-3 py-1 rounded"
						onClick={() => setCreateGroupToggle((prev) => !prev)}
					>
						Create Group
					</button>
					{createGroupToggle && (
						<CreateGroupModal setCreateGroupToggle={setCreateGroupToggle} />
					)}
				</div>
				<Link
					to={`/${ownerId}/projects/${projectId}/createcard`}
					className="bg-primary text-white text-sm text-bold px-3 py-1 rounded"
				>
					Create Card
				</Link>
				<button
					className="bg-primary text-white text-sm text-bold px-3 py-1 rounded"
					onClick={handleArchive}
				>
					{data?.isActive ? "Archive Project" : "Unarchive project"}
				</button>
				<button
					className="bg-orange-500 text-white text-sm text-bold px-3 py-1 rounded"
					onClick={handleDelete}
				>
					Delete Project
				</button>
			</div>
		</div>
	);
};

export default ProjectHeader;
