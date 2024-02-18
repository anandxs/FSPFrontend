import { useForm } from "react-hook-form";
import { useCreateStageMutation } from "../../features/stage/stageApiSlice";
import { useContext } from "react";
import { StageContext } from "./Stages";
import LoadingButton from "../LoadingButton";

const CreateStageModal = ({ handleToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const { projectId } = useContext(StageContext);

	const [createStageAsync, { isLoading, isSubmitting, error }] =
		useCreateStageMutation();

	const handleStage = async ({ stageName }) => {
		const body = {
			name: stageName,
		};
		try {
			await createStageAsync({ projectId, body }).unwrap();
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
			<h1 className="text-2xl font-bold text-left">Create Stage</h1>
			<p className="text-red-600 text-xs">{error?.data?.Message}</p>
			<form
				className="space-y-4"
				noValidate
				onSubmit={handleSubmit(handleStage)}
			>
				<div className="space-y-1 text-sm">
					<input
						type="text"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						placeholder="Enter stage name"
						{...register("stageName", {
							required: "Stage name is required.",
						})}
					/>
					<p className="text-red-600 text-xs">{errors?.stageName?.message}</p>
				</div>
				{isSubmitting || isLoading ? (
					<LoadingButton />
				) : (
					<button
						type="submit"
						className="block w-full p-3 text-center rounded-sm text-gray-50 bg-indigo-950"
					>
						Submit
					</button>
				)}
			</form>
		</div>
	);
};

export default CreateStageModal;
