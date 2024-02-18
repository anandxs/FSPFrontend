import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUpdateTaskMutation } from "../../features/task/taskApiSlice";
import { useContext } from "react";
import { TaskContext } from "./Task";

const ChangeDueDateModal = ({ handleToggle }) => {
	const task = useContext(TaskContext);
	const { dueDate } = task;

	const form = useForm({
		defaultValues: {
			dueDate: dueDate ? dueDate.split("T")[0] : null,
		},
	});
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const { projectId, taskId } = useParams();

	const [updateTaskAsync] = useUpdateTaskMutation();
	const onSubmit = async ({ dueDate }) => {
		const { title, stage, description, assignee, type } = task;

		const body = {
			dueDate: dueDate === "" ? null : dueDate,
			title,
			description,
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
			className="bg-indigo-300 p-3 w-1/3 min-w-max"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold mb-2 py-1">Update Task Due Date</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="mb-3">
					<label htmlFor="dueDate" className="font-semibold text-md block">
						Set Date
					</label>
					<input type="date" {...register("dueDate")} />
					<p className="text-red-600">{errors?.dueDate?.message}</p>
				</div>
				<button
					type="submit"
					className="bg-indigo-950 text-gray-50 text-md font-bold px-3 py-0.5 rounded w-full"
				>
					Update
				</button>
			</form>
		</div>
	);
};

export default ChangeDueDateModal;
