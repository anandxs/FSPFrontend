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
import LoadingButton from "../LoadingButton";

const RenameProjectModal = ({ handleToggle }) => {
	const { name } = useContext(ProjectContext);
	const form = useForm({
		defaultValues: {
			name,
		},
	});
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const [renameProjectAsync, { error, isLoading, isSubmitting }] =
		useUpdateProjectMutation();
	const { projectId } = useParams();
	const dispatch = useDispatch();
	const userRole = useSelector(selectCurrentProjectRole);

	const onSubmit = async ({ name }) => {
		const body = {
			name,
		};
		try {
			await renameProjectAsync({ projectId, body }).unwrap();
			handleToggle();
			dispatch(setRole({ ...userRole, projectName: name }));
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div
			className="pt-4 w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold text-center">Rename Project</h1>
			<p className="text-red-600 text-xs">{error?.data?.Message}</p>
			<form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
				<div className="space-y-1 text-sm">
					<input
						type="text"
						id="name"
						placeholder="Enter project name"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						{...register("name", {
							required: "Project name is required.",
						})}
					/>
					<p className="text-red-600 text-xs">{errors?.name?.message}</p>
				</div>
				{isSubmitting || isLoading ? (
					<LoadingButton />
				) : (
					<button
						type="submit"
						className="block w-full p-3 text-center rounded-sm text-gray-50 bg-blue-600"
					>
						Login
					</button>
				)}
			</form>
		</div>
	);
};

export default RenameProjectModal;
