import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetProjectTaskTypesQuery } from "../../features/taskType/taskTypeApiSlice";
import { useGetProjectStagesQuery } from "../../features/stage/stageApiSlice";
import { useCreateTaskMutation } from "../../features/task/taskApiSlice";

const CreateTaskModal = ({ handleToggle }) => {
	const form = useForm({
		defaultValues: {
			dueDate: null,
			description: null,
		},
	});
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const { projectId, taskId } = useParams();

	const {
		data: types,
		isLoading: typesIsLoading,
		isSuccess: typesIsSuccess,
		isError: typesIsErrors,
		error: typesError,
	} = useGetProjectTaskTypesQuery({ projectId });
	let typeOptions;
	if (typesIsSuccess) {
		typeOptions = types.map((type) => (
			<option key={type?.typeId} value={type?.typeId} className="text-xs">
				{type?.name}
			</option>
		));
	} else if (typesIsErrors) {
		console.log(typesError);
	}

	const {
		data: stages,
		isLoading: stagesIsLoading,
		isSuccess: stagesIsSuccess,
		isError: stagesIsError,
		error: stagesError,
	} = useGetProjectStagesQuery({ projectId });
	let stagesOptions;
	if (stagesIsSuccess) {
		stagesOptions = stages.map((stage) => (
			<option key={stage?.stageId} value={stage?.stageId} className="text-xs">
				{stage?.name}
			</option>
		));
	} else if (stagesIsError) {
		console.log(stagesError);
	}

	const [createTaskAsync] = useCreateTaskMutation();

	const onSubmit = ({
		title,
		description,
		dueDate,
		stageId,
		typeId,
		totalHours,
	}) => {
		const body = {
			title,
			description,
			dueDate,
			stageId,
			typeId,
			totalHours,
		};

		createTaskAsync({ projectId, body })
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
			className="bg-accent p-3 w-screen sm:w-2/3 sm:max-w-sm"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-xl font-bold">Create Task</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="mb-3">
					<label htmlFor="title" className="text-sm font-semibold">
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
					<p className="text-red-600 text-xs">{errors?.title?.message}</p>
				</div>
				<div className="mb-3">
					<label htmlFor="type" className="text-sm font-semibold">
						Type
					</label>
					<select
						id="type"
						className="block w-full text-xs"
						{...register("typeId", {
							required: "Select a type",
						})}
					>
						<option value="" className="text-xs">
							Select a task type
						</option>
						{typesIsLoading && <option>Loading</option>}
						{typeOptions}
					</select>
					<p className="text-red-600 text-xs">{errors?.typeId?.message}</p>
				</div>
				<div className="mb-3">
					<label htmlFor="stage" className="text-sm font-semibold">
						Stage
					</label>
					<select
						id="stage"
						className="block w-full text-xs"
						{...register("stageId", {
							required: "Select a stage",
						})}
					>
						<option value="" className="text-xs">
							Select a stage
						</option>
						{stagesIsLoading && <option>Loading</option>}
						{stagesOptions}
					</select>
					<p className="text-red-600 text-xs">{errors?.stageId?.message}</p>
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="text-sm font-semibold">
						Description
					</label>
					<textarea
						id="description"
						cols="30"
						rows="3"
						className="block w-full text-sm"
						{...register("description")}
					></textarea>
				</div>
				<div className="mb-3">
					<label htmlFor="total-hours" className="text-sm font-semibold">
						Total Hours Required
					</label>
					<input
						type="number"
						{...register("totalHours", {
							required: "Total hours is required",
							valueAsNumber: true,
							validate: (val) => {
								return (
									validateDecimalPlaces(val) ||
									"Cannot have more than 2 decimal places."
								);
							},
						})}
						className="block w-full text-sm"
					/>
					<p className="text-red-600 text-xs">{errors?.totalHours?.message}</p>
				</div>
				<button
					type="submit"
					className="bg-primary text-white text-sm p-1 font-semibold rounded-sm w-full"
				>
					Create
				</button>
			</form>
		</div>
	);
};

const validateDecimalPlaces = (number) =>
	(number.toString().split(".")[1] || "").length < 3;

export default CreateTaskModal;
