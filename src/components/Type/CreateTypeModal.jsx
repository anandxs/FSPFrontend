import { useForm } from "react-hook-form";
import { useCreateTaskTypeMutation } from "../../features/taskType/taskTypeApiSlice";
import { useContext } from "react";
import { TypeContext } from "./Types";

const CreateTaskTypeModal = ({ handleToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState, watch } = form;
	const { errors } = formState;

	const { projectId } = useContext(TypeContext);

	const [createTaskTypeAsync, { isLoading, error }] =
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
			className="bg-accent p-3 w-screen sm:w-2/3 sm:max-w-sm"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-xl font-bold mb-2">Create Task Type</h1>
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					className="block w-full text-sm"
					placeholder="Enter task type"
					{...register("typeName", {
						required: "Type name is required.",
					})}
				/>
				<p className="text-red-600 text-xs mb-1">{errors?.typeName?.message}</p>
				<p className="text-red-600 text-xs mb-1">{error?.data?.Message}</p>
				<button
					type="submit"
					className="bg-primary text-white text-sm p-1 font-semibold rounded-sm w-full disabled:opacity-50"
					disabled={isLoading}
				>
					Create
				</button>
			</form>
		</div>
	);
};

export default CreateTaskTypeModal;
