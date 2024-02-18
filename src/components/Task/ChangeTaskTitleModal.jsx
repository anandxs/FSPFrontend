import { useContext } from "react";
import { useForm } from "react-hook-form";
import { TaskContext } from "./Task";
import { useUpdateTaskMutation } from "../../features/task/taskApiSlice";
import { useParams } from "react-router-dom";
import LoadingButton from "../LoadingButton";

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

	const [updateTaskAsync, { isLoading, isSubmitting }] =
		useUpdateTaskMutation();
	const onSubmit = async ({ title }) => {
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
			<h1 className="text-2xl font-bold text-left">Edit Title</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
				<div className="space-y-1 text-sm">
					<input
						type="text"
						id="title"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						{...register("title", {
							required: "Title is required.",
						})}
					/>
					<p className="text-red-600 text-xs">{errors?.title?.message}</p>
				</div>
				<div className="flex gap-2 justify-between">
					{isSubmitting || isLoading ? (
						<LoadingButton />
					) : (
						<button
							type="submit"
							className="block w-1/2 p-3 text-center rounded-sm text-gray-50 bg-indigo-950"
						>
							Update
						</button>
					)}
					<button
						type="submit"
						className="block w-1/2 p-3 text-center rounded-sm text-gray-50 bg-red-600"
						onClick={handleToggle}
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default ChangeTaskTitleModal;
