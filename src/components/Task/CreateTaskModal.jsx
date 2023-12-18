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
			<option key={type?.typeId} value={type?.typeId}>
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
			<option key={stage?.stageId} value={stage?.stageId}>
				{stage?.name}
			</option>
		));
	} else if (stagesIsError) {
		console.log(stagesError);
	}

	const [createTaskAsync] = useCreateTaskMutation();

	const onSubmit = ({ title, description, dueDate, stageId, typeId }) => {
		const body = {
			title,
			description,
			dueDate,
			stageId,
			typeId,
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
			className="bg-accent p-3 w-1/3 min-w-max"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold mb-2 py-1">Create Task</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="my-2">
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
				<div className="mb-3">
					<label htmlFor="type" className="font-semibold text-md block">
						Type
					</label>
					<select
						id="type"
						className="block w-full text-xs p-1"
						{...register("typeId", {
							required: "Select a type",
						})}
					>
						<option value="">Select a task type</option>
						{typesIsLoading && <option>Loading</option>}
						{typeOptions}
					</select>
					<p className="text-red-600">{errors?.typeId?.message}</p>
				</div>
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
						{stagesIsLoading && <option>Loading</option>}
						{stagesOptions}
					</select>
					<p className="text-red-600">{errors?.stageId?.message}</p>
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="font-semibold text-md block">
						Description
					</label>
					<textarea
						id="description"
						cols="30"
						rows="3"
						className="w-full"
						{...register("description")}
					></textarea>
				</div>
				<div className="mb-3">
					<label htmlFor="due-date" className="font-semibold text-md block">
						Due date (optional)
					</label>
					<input
						type="date"
						id="due-date"
						className="text-sm"
						{...register("dueDate")}
					/>
				</div>
				<button
					type="submit"
					className="bg-primary text-white text-md font-bold px-3 py-0.5 rounded w-full"
				>
					Create
				</button>
			</form>
		</div>
	);
};

export default CreateTaskModal;
