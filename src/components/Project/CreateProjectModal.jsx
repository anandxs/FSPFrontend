import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useCreateProjectMutation } from "../../features/project/projectApiSlice";
import { useNavigate } from "react-router-dom";

const CreateProjectModal = ({ handleProjectToggle }) => {
	const [error, setError] = useState();
	const { id } = useSelector(selectCurrentUser);

	const form = useForm();
	const { register, handleSubmit, formState, watch } = form;
	const { errors } = formState;

	const [createProject, { isLoading }] = useCreateProjectMutation();

	const navigate = useNavigate();

	useEffect(() => {
		setError(null);
	}, [watch("projectName")]);

	const onSubmit = async ({ projectName }) => {
		const body = {
			userId: id,
			name: projectName,
		};
		try {
			const response = await createProject(body);
			const { ownerId, projectId } = response?.data;
			handleProjectToggle();
			navigate(`/${ownerId}/projects/${projectId}`);
		} catch (err) {
			if (err.status === 404) {
				setError(err.data.Message);
			} else if (err.status == 401) {
				await createProject(body);
			} else if (err.state === 422) {
				setError("Enter valid data.");
			} else if (err.status === 500) {
				setError("Internal server error.");
			} else {
				setError("Network error");
			}
		}
	};

	return (
		<div
			className="bg-secondary p-3 w-1/3 min-w-max"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold mb-2 py-1">Create Project</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<p className="text-xs mb-1 text-red-600">
					{errors?.projectName?.message}
				</p>
				{error && <p className="text-xs mb-1 text-red-600">{error}</p>}
				<input
					className="rounded-sm block mb-2 w-full"
					type="text"
					id="project-name"
					placeholder="Enter project name"
					{...register("projectName", {
						required: "Project name is required.",
					})}
				/>
				<button
					className="bg-primary text-white font-semibold p-1 rounded w-full disabled:opacity-50"
					type="submit"
					disabled={isLoading}
				>
					Create
				</button>
			</form>
		</div>
	);
};

export default CreateProjectModal;
