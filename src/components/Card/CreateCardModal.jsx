import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetProjectGroupsQuery } from "../../features/group/groupApiSlice";
import { useCreateCardMutation } from "../../features/card/cardApiSlice";

const CreateCardModal = ({ handleCardToggle }) => {
	const { ownerId, projectId } = useParams();
	const { data, isLoading } = useGetProjectGroupsQuery({ ownerId, projectId });
	const [createCard] = useCreateCardMutation();

	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const onSubmit = async (data) => {
		try {
			const body = {
				title: data.cardName,
				description: data.description === "" ? null : data.description,
			};
			const response = await createCard({
				ownerId,
				projectId,
				groupId: data.groupId,
				body,
			});

			handleCardToggle();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div
			className="bg-accent p-3 w-1/3 min-w-max"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold mb-2 py-1">Create Card</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="my-2">
					<label htmlFor="title" className="font-semibold text-xl block">
						Title
					</label>
					<input
						type="text"
						id="title"
						className="block w-full"
						{...register("cardName", {
							required: "Title is required.",
						})}
					/>
					<p className="text-red-600">{errors?.cardName?.message}</p>
				</div>
				<div className="mb-3">
					<label htmlFor="group" className="font-semibold text-xl block">
						Group
					</label>
					<select
						id="group"
						className="block w-full text-xs p-1"
						{...register("groupId", {
							required: "Select a group",
						})}
					>
						<option>{isLoading && "Loading..."}</option>
						{data?.map((g) => (
							<option key={g.groupId} value={g.groupId}>
								{g.name}
							</option>
						))}
					</select>
					<p className="text-red-600">{errors?.groupId?.message}</p>
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="font-semibold text-xl block">
						Description
					</label>
					<textarea
						id="description"
						cols="30"
						rows="4"
						className="w-full"
						{...register("description")}
					></textarea>
				</div>
				<button
					type="submit"
					className="bg-primary text-white text-md font-bold px-3 py-1 rounded w-full"
				>
					Create
				</button>
			</form>
		</div>
	);
};

export default CreateCardModal;
