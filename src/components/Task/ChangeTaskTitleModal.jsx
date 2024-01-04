import { useContext } from "react";
import { useForm } from "react-hook-form";
import { TaskContext } from "./Task";
import { useUpdateTaskMutation } from "../../features/task/taskApiSlice";
import { useParams } from "react-router-dom";

const ChangeTaskTitleModal = ({ handleToggle }) => {
	const task = useContext(TaskContext);
	const { title } = task;

	const form = useForm({
		defaultValues: {
			title,
		},
	});
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const { projectId, taskId } = useParams();

	const [updateTaskAsync] = useUpdateTaskMutation();
	const onSubmit = ({ title }) => {
		const { description, assignee, type, stage, hoursSpent, totalHours } = task;

		const body = {
			title,
			description,
			totalHours,
			hoursSpent,
			stageId: stage?.stageId,
			typeId: type?.typeId,
			assigneeId: assignee?.id,
		};

		updateTaskAsync({ projectId, taskId, body })
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
			<h1 className="text-2xl font-bold mb-2 py-1">Update Task Title</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="mb-3">
					<label htmlFor="title" className="font-semibold text-md block">
						Title
					</label>
					<input
						type="text"
						id="title"
						className="block w-full"
						{...register("title", {
							required: "Title is required.",
						})}
					/>
					<p className="text-red-600">{errors?.title?.message}</p>
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

export default ChangeTaskTitleModal;
