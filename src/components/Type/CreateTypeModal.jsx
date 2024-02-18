import { useForm } from "react-hook-form";
import { useCreateTaskTypeMutation } from "../../features/taskType/taskTypeApiSlice";
import { useContext } from "react";
import { TypeContext } from "./Types";
import LoadingButton from "../LoadingButton";

const CreateTaskTypeModal = ({ handleToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState, watch } = form;
	const { errors } = formState;

	const { projectId } = useContext(TypeContext);

	const [createTaskTypeAsync, { isSubmitting, isLoading, error }] =
		useCreateTaskTypeMutation();

	const onSubmit = ({ typeName }) => {
		const body = {
			name: typeName,
		};
		createTaskTypeAsync({ projectId, body })
			.unwrap()
			.then(() => {
				handleToggle();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div
			className="pt-4 w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold text-left">Create Task Type</h1>
			<p className="text-red-600 text-xs mb-1">{error?.data?.Message}</p>
			<form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-1 text-sm">
					<input
						type="text"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						placeholder="Enter task type"
						{...register("typeName", {
							required: "Type name is required.",
						})}
					/>
					<p className="text-red-600 text-xs">{errors?.typeName?.message}</p>
				</div>
				{isSubmitting || isLoading ? (
					<LoadingButton />
				) : (
					<button
						type="submit"
						className="block w-full p-3 text-center rounded-sm text-gray-50 bg-indigo-950"
					>
						Submit
					</button>
				)}
			</form>
		</div>
	);
};

export default CreateTaskTypeModal;
