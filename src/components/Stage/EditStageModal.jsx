import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { StageContext } from "./Stages";
import { useUpdateStageMutation } from "../../features/stage/stageApiSlice";
import LoadingButton from "../LoadingButton";

const EditGroupModal = ({ handleToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState, setValue } = form;
	const { errors } = formState;

	const { projectId, stageId, init } = useContext(StageContext);

	const [updateStageAsync, { error, isLoading, isSubmitting }] =
		useUpdateStageMutation();

	useEffect(() => {
		setValue("stageName", init);
	}, []);

	const onSubmit = async ({ stageName }) => {
		const body = {
			name: stageName,
		};

		try {
			await updateStageAsync({
				projectId,
				stageId,
				body,
			}).unwrap();
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
			<h1 className="text-2xl font-bold text-left">Edit Stage</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
				<p className="text-red-600 text-xs">{error?.data?.Message}</p>
				<div className="space-y-1 text-sm">
					<input
						type="text"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						{...register("stageName", {
							required: "Stage name is required.",
						})}
					/>
					<p className="text-red-600 text-xs">{errors?.stageName?.message}</p>
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

export default EditGroupModal;
