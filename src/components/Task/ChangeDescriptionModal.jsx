import { useContext } from "react";
import { useForm } from "react-hook-form";
import { TaskContext } from "./Task";
import { useUpdateTaskMutation } from "../../features/task/taskApiSlice";
import { useParams } from "react-router-dom";

const ChangeDescriptionModal = ({ handleToggle }) => {
	const task = useContext(TaskContext);
	const { description } = task;

	const form = useForm({
		defaultValues: {
			description,
		},
	});
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const { projectId, taskId } = useParams();

	const [updateTaskAsync] = useUpdateTaskMutation();
	const onSubmit = async ({ description }) => {
		const { totalHours, hoursSpent, title, assignee, type, stage } = task;

		const body = {
			description: description === "" ? null : description,
			title,
			totalHours,
			hoursSpent,
			stageId: stage?.stageId,
			typeId: type?.typeId,
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
			className="bg-accent p-3 w-1/3 min-w-max"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold mb-2 py-1">Update Description</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="mb-3">
					<textarea
						type="text"
						id="description"
						className="block w-full"
						{...register("description")}
					></textarea>
					<p className="text-red-600">{errors?.description?.message}</p>
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

export default ChangeDescriptionModal;
