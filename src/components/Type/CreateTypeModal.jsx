import { useForm } from "react-hook-form";
import { useCreateTaskTypeMutation } from "../../features/taskType/taskTypeApiSlice";
import { useContext } from "react";
import { TypeContext } from "./Types";

const CreateTaskTypeModal = ({ handleToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const { projectId } = useContext(TypeContext);

	const [createTaskTypeAsync, { isLoading }] = useCreateTaskTypeMutation();

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
			className="bg-accent p-3 w-1/3 min-w-max"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold mb-2 py-1">Create Task Type</h1>
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					className="block w-full"
					placeholder="Enter task type"
					{...register("typeName", {
						required: "Type name is required.",
					})}
				/>
				<p className="text-red-600 text-xs my-1">{errors?.typeName?.message}</p>
				<button
					type="submit"
					className="bg-primary text-white text-sm text-bold px-3 py-1 rounded w-full disabled:opacity-50"
					disabled={isLoading}
				>
					Create
				</button>
			</form>
		</div>
	);
};

export default CreateTaskTypeModal;
