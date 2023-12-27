import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useUpdateProjectMutation } from "../../features/project/projectApiSlice";
import { useContext } from "react";
import { ProjectContext } from "../../pages/Project";
import { useDispatch, useSelector } from "react-redux";
import {
	selectCurrentProjectRole,
	setRole,
} from "../../features/user/userSlice";

const RenameProjectModal = ({ handleToggle }) => {
	const { name } = useContext(ProjectContext);

	const form = useForm({
		defaultValues: {
			name,
		},
	});
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const [renameProjectAsync, { error }] = useUpdateProjectMutation();
	const { projectId } = useParams();
	const dispatch = useDispatch();
	const userRole = useSelector(selectCurrentProjectRole);
	const onSubmit = ({ name }) => {
		const body = {
			name,
		};
		renameProjectAsync({ projectId, body })
			.unwrap()
			.then(() => {
				handleToggle();
				dispatch(setRole({ ...userRole, projectName: name }));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div
			className="bg-accent p-3 w-1/3 min-w-max"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold mb-2 py-1">Rename Project</h1>
			<p className="text-red-600">{error?.data?.Message}</p>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="my-2">
					<label htmlFor="name" className="font-semibold text-base block">
						New Name
					</label>
					<input
						type="text"
						id="name"
						className="block w-full"
						placeholder="Enter project name"
						{...register("name", {
							required: "Project name is required.",
						})}
					/>
					<p className="text-red-600">{errors?.name?.message}</p>
				</div>
				<button
					type="submit"
					className="bg-primary text-white text-md font-bold px-3 py-1 rounded w-full"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default RenameProjectModal;
