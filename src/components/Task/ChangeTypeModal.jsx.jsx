import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetProjectTaskTypesQuery } from "../../features/taskType/taskTypeApiSlice";
import { useUpdateTaskMutation } from "../../features/task/taskApiSlice";
import { useContext } from "react";
import { TaskContext } from "./Task";
import LoadingButton from "../LoadingButton";

const ChangeTypeModal = ({ handleToggle }) => {
	const task = useContext(TaskContext);
	const { type } = task;
	const typeId = type?.typeId;

	const form = useForm({
		defaultValues: {
			typeId,
		},
	});
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const { projectId, taskId } = useParams();

	const { data, isLoading, isSuccess, isError, error } =
		useGetProjectTaskTypesQuery({ projectId });
	let typeOptions;
	if (isSuccess) {
		typeOptions = data.map((type) => (
			<option key={type?.typeId} value={type?.typeId}>
				{type?.name}
			</option>
		));
	} else if (isError) console.log(error);

	const [
		updateTaskAsync,
		{ isLoading: updateLoading, isSubmitting, error: updateError },
	] = useUpdateTaskMutation();
	const onSubmit = async ({ typeId }) => {
		const { title, description, assignee, stage, hoursSpent, totalHours } =
			task;

		const body = {
			typeId,
			title,
			description,
			totalHours,
			hoursSpent,
			stageId: stage?.stageId,
			assigneeId: assignee?.id,
		};

		try {
			await updateTaskAsync({ projectId, taskId, body }).unwrap();
			handleToggle();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div
			className="pt-4 w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold text-left">Update Task Type</h1>
			<p className="text-red-600 text-xs">{""}</p>
			<form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
				<div className="space-y-1 text-sm">
					<select
						id="type"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						{...register("typeId", {
							required: "Select a type",
						})}
					>
						<option value="">Select a type</option>
						{isLoading && <option>Loading</option>}
						{typeOptions}
					</select>
					<p className="text-red-600 text-xs">{errors?.typeId?.message}</p>
				</div>
				{isSubmitting || updateLoading ? (
					<LoadingButton />
				) : (
					<button
						type="submit"
						className="block w-full p-3 text-center rounded-sm text-gray-50 bg-blue-600"
					>
						Update
					</button>
				)}
			</form>
		</div>
	);
};

export default ChangeTypeModal;
