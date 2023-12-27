import { useForm } from "react-hook-form";
import { useCreateStageMutation } from "../../features/stage/stageApiSlice";
import { useContext } from "react";
import { StageContext } from "./Stages";

const CreateStageModal = ({ handleToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const { projectId } = useContext(StageContext);

	const [createStageAsync, { isLoading, error }] = useCreateStageMutation();

	const handleStage = ({ stageName }) => {
		const body = {
			name: stageName,
		};
		createStageAsync({ projectId, body })
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
			<h1 className="text-2xl font-bold mb-2 pt-1">Create Stage</h1>
			<form noValidate onSubmit={handleSubmit(handleStage)}>
				<input
					type="text"
					className="block mb-1 w-full"
					placeholder="Enter stage name"
					{...register("stageName", {
						required: "Stage name is required.",
					})}
				/>
				<p className="text-red-600 text-xs my-1">
					{errors?.stageName?.message}
				</p>
				<p className="text-red-600 text-xs my-1">{error?.data?.Message}</p>
				<button
					type="submit"
					className="bg-primary text-white text-sm text-bold px-3 py-1 rounded w-full disabled:opacity-50"
					disabled={isLoading}
				>
					Create
				</button>
			</form>
		</div>
	);
};

export default CreateStageModal;
