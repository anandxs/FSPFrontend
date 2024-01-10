import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetProjectTaskTypesQuery } from "../../features/taskType/taskTypeApiSlice";
import { useUpdateTaskMutation } from "../../features/task/taskApiSlice";
import { useContext } from "react";
import { TaskContext } from "./Task";

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

	const [updateTaskAsync] = useUpdateTaskMutation();
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
			updateTaskAsync({ projectId, taskId, body }).unwrap();
			handleToggle();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div
			className="bg-accent p-3 w-1/3 min-w-max"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold mb-2 py-1">Update Task Type</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="mb-3">
					<label htmlFor="type" className="font-semibold text-md block">
						Task Type
					</label>
					<select
						id="type"
						className="block w-full text-xs p-1"
						{...register("typeId", {
							required: "Select a type",
						})}
					>
						<option value="">Select a type</option>
						{isLoading && <option>Loading</option>}
						{typeOptions}
					</select>
					<p className="text-red-600">{errors?.typeId?.message}</p>
				</div>
				<button
					type="submit"
					className="bg-primary text-white text-md font-bold px-3 py-0.5 rounded w-full"
				>
					Update
				</button>
			</form>
		</div>
	);
};

export default ChangeTypeModal;
