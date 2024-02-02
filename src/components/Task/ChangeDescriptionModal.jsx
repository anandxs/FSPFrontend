import { useContext } from "react";
import { useForm } from "react-hook-form";
import { TaskContext } from "./Task";
import { useUpdateTaskMutation } from "../../features/task/taskApiSlice";
import { useParams } from "react-router-dom";
import LoadingButton from "../LoadingButton";

const ChangeDescriptionModal = ({ handleToggle }) => {
	const task = useContext(TaskContext);
	const { description } = task;
	const form = useForm({
		defaultValues: {
			description,
		},
	});
	const { register, handleSubmit, formState, setValue } = form;
	const { errors } = formState;
	const { projectId, taskId } = useParams();
	const [updateTaskAsync, { isLoading, isSubmitting }] =
		useUpdateTaskMutation();

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

	const clearInput = () => {
		setValue("description", null);
	};

	return (
		<div
			className="pt-4 w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800"
			onClick={(e) => e.stopPropagation()}
		>
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold text-left">Update Description</h1>
				<button
					onClick={clearInput}
					className="block px-3 py-1 text-center rounded-sm text-gray-50 bg-blue-600"
				>
					Clear
				</button>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
				<div className="space-y-1 text-sm">
					<textarea
						type="text"
						id="description"
						placeholder="Add description..."
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						{...register("description")}
					></textarea>
					<p className="text-red-600 text-xs">{errors?.description?.message}</p>
				</div>
				{isSubmitting || isLoading ? (
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

export default ChangeDescriptionModal;
