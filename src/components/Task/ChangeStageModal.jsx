import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetProjectStagesQuery } from "../../features/stage/stageApiSlice";
import { useUpdateTaskMutation } from "../../features/task/taskApiSlice";
import { useContext } from "react";
import { TaskContext } from "./Task";
import LoadingButton from "../LoadingButton";

const ChangeStageModal = ({ handleToggle }) => {
	const task = useContext(TaskContext);
	const { stage } = task;
	const stageId = stage?.stageId;

	const form = useForm({
		defaultValues: {
			stageId,
		},
	});
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const { projectId, taskId } = useParams();

	const { data, isLoading, isSuccess, isError, error } =
		useGetProjectStagesQuery({ projectId });
	let stagesOptions;
	if (isSuccess) {
		stagesOptions = data.map((stage) => (
			<option key={stage?.stageId} value={stage?.stageId}>
				{stage?.name}
			</option>
		));
	} else if (isError) console.log(error);

	const [updateTaskAsync, { isLoading: updateLoading, isSubmitting }] =
		useUpdateTaskMutation();
	const onSubmit = async ({ stageId }) => {
		const { title, description, assignee, type, hoursSpent, totalHours } = task;

		const body = {
			stageId,
			title,
			description,
			totalHours,
			hoursSpent,
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
			<h1 className="text-2xl font-bold text-left">Update Task Stage</h1>
			<p className="text-red-600 text-xs">{""}</p>
			<form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
				<div className="space-y-1 text-sm">
					<select
						id="stage"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						{...register("stageId", {
							required: "Select a stage",
						})}
					>
						<option value="">Select a stage</option>
						{isLoading && <option>Loading</option>}
						{stagesOptions}
					</select>
					<p className="text-red-600 text-xs">{errors?.stageId?.message}</p>
				</div>
				{isSubmitting || updateLoading ? (
					<LoadingButton />
				) : (
					<button
						type="submit"
						className="block w-full p-3 text-center rounded-sm text-gray-50 bg-indigo-950"
					>
						Update
					</button>
				)}
			</form>
		</div>
	);
};

export default ChangeStageModal;
