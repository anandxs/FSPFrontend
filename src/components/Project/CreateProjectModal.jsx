import { useForm } from "react-hook-form";
import { useCreateProjectMutation } from "../../features/project/projectApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProjectModal = ({ setShowModal }) => {
	const [error, setError] = useState();

	const navigate = useNavigate();

	const form = useForm();
	const { register, handleSubmit, formState, watch } = form;
	const { errors } = formState;

	useEffect(() => {
		setError(null);
	}, [watch("projectName")]);

	const { id } = useSelector(selectCurrentUser);

	const [create, { isLoading }] = useCreateProjectMutation();

	const onSubmit = async ({ projectName }) => {
		try {
			const body = {
				userId: id,
				name: projectName,
			};
			const response = await create(body).unwrap();
			console.log(response);
			setShowModal(false);
			navigate(`/${response?.ownerId}/projects/${response?.projectId}`);
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
		<div className="bg-secondary p-2.5 rounded w-56">
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
