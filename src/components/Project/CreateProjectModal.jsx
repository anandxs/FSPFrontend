import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateProjectMutation } from "../../features/project/projectApiSlice";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../LoadingButton";

const CreateProjectModal = ({ handleProjectToggle }) => {
	const [error, setError] = useState();

	const form = useForm();
	const { register, handleSubmit, formState, watch } = form;
	const { errors } = formState;

	const [createProject, { isLoading, isSubmitting }] =
		useCreateProjectMutation();

	const navigate = useNavigate();

	useEffect(() => {
		setError(null);
	}, [watch("projectName")]);

	const onSubmit = async ({ projectName }) => {
		const body = {
			name: projectName,
		};
		try {
			const { projectId } = await createProject({ body }).unwrap();
			handleProjectToggle();
			navigate(`/projects/${projectId}/tasks`);
		} catch (err) {
			if (err.status === 404) {
				setError(err.data.Message);
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
			className="pt-4 w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800"
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
				{isSubmitting || isLoading ? (
					<LoadingButton />
				) : (
					<button
						type="submit"
						className="block w-full p-3 text-center rounded-sm text-gray-50 bg-blue-600"
					>
						Create
					</button>
				)}
			</form>
		</div>
	);
};

export default CreateProjectModal;
