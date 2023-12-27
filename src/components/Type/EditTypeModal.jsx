import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TypeContext } from "./Types";
import { useUpdateTaskTypeMutation } from "../../features/taskType/taskTypeApiSlice";

const EditTypeModal = ({ handleToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState, setValue } = form;
	const { errors } = formState;

	const { projectId, typeId, init } = useContext(TypeContext);

	const [updateTypeAsync, { error }] = useUpdateTaskTypeMutation();

	useEffect(() => {
		setValue("typeName", init);
	}, []);

	const onSubmit = ({ typeName }) => {
		const body = {
			name: typeName,
		};

		updateTypeAsync({
			projectId,
			typeId,
			body,
		})
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
			<h1 className="text-2xl font-bold mb-1 pt-1">Edit Type</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<p className="text-red-600 text-xs my-1">{error?.data?.Message}</p>
				<div className="mb-2">
					<input
						type="text"
						className="w-full"
						{...register("typeName", {
							required: "Type name is required.",
						})}
					/>
					<p className="text-red-600 text-xs pt-1">
						{errors?.typeName?.message}
					</p>
				</div>
				<div className="flex justify-between">
					<button
						type="submit"
						className="bg-primary text-white px-3 py-0.5 text-sm rounded-sm w-2/5"
					>
						Update
					</button>
					<button
						type="submit"
						className="bg-orange-600 text-white px-3 py-0.5 text-sm rounded-sm w-2/5"
						onClick={handleToggle}
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditTypeModal;
