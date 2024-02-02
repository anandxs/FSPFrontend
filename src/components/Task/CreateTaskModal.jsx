import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetProjectTaskTypesQuery } from "../../features/taskType/taskTypeApiSlice";
import { useGetProjectStagesQuery } from "../../features/stage/stageApiSlice";
import { useCreateTaskMutation } from "../../features/task/taskApiSlice";
import LoadingButton from "../LoadingButton";

const CreateTaskModal = ({ handleToggle }) => {
	const form = useForm({
		defaultValues: {
			dueDate: null,
			description: null,
		},
	});
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;
	const { projectId } = useParams();

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

	const [createTaskAsync, { isLoading, isSubmitting }] =
		useCreateTaskMutation();

	const onSubmit = async ({
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

		try {
			await createTaskAsync({ projectId, body }).unwrap();
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
			<h1 className="text-2xl font-bold text-left">Create Task</h1>
			<form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="space-y-1 text-sm">
					{/* <label htmlFor="title" className="text-sm font-semibold">
						Title
					</label> */}
					<input
						type="text"
						id="title"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						placeholder="Title"
						{...register("title", {
							required: "Title is required.",
						})}
					/>
					<p className="text-red-600 text-xs">{errors?.title?.message}</p>
				</div>
				<div className="space-y-1 text-sm">
					{/* <label htmlFor="type" className="text-sm font-semibold">
						Type
					</label> */}
					<select
						id="type"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
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
				<div className="space-y-1 text-sm">
					{/* <label htmlFor="stage" className="text-sm font-semibold">
						Stage
					</label> */}
					<select
						id="stage"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
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
				<div className="space-y-1 text-sm">
					{/* <label htmlFor="description" className="text-sm font-semibold">
						Description
					</label> */}
					<textarea
						id="description"
						cols="30"
						rows="3"
						placeholder="Task description..."
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						{...register("description")}
					></textarea>
				</div>
				<div className="space-y-1 text-sm">
					<label htmlFor="total-hours" className="text-sm font-semibold">
						Total Hours Required
					</label>
					<input
						type="number"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
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
					/>
					<p className="text-red-600 text-xs">{errors?.totalHours?.message}</p>
				</div>
				{isSubmitting || isLoading ? (
					<LoadingButton />
				) : (
					<button
						type="submit"
						className="block w-full p-3 text-center rounded-sm text-gray-50 bg-blue-600"
					>
						Submit
					</button>
				)}
			</form>
		</div>
	);
};

const validateDecimalPlaces = (number) =>
	(number.toString().split(".")[1] || "").length < 3;

export default CreateTaskModal;
