import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetProjectStagesQuery } from "../../features/stage/stageApiSlice";
import { useUpdateTaskMutation } from "../../features/task/taskApiSlice";
import { useContext } from "react";
import { TaskContext } from "./Task";

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
	} else if (isError) {
		console.log(error);
	}

	const [updateTaskAsync] = useUpdateTaskMutation();
	const onSubmit = ({ stageId }) => {
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
			<h1 className="text-2xl font-bold mb-2 py-1">Update Task Stage</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="mb-3">
					<label htmlFor="stage" className="font-semibold text-md block">
						Stage
					</label>
					<select
						id="stage"
						className="block w-full text-xs p-1"
						{...register("stageId", {
							required: "Select a stage",
						})}
					>
						<option value="">Select a stage</option>
						{isLoading && <option>Loading</option>}
						{stagesOptions}
					</select>
					<p className="text-red-600">{errors?.stageId?.message}</p>
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

export default ChangeStageModal;
