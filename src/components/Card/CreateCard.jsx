import { useNavigate, useParams } from "react-router-dom";
import { useGetProjectGroupsQuery } from "../../features/group/groupApiSlice";
import { useForm } from "react-hook-form";
import { useCreateCardMutation } from "../../features/card/cardApiSlice";

const CreateCard = () => {
	const { ownerId, projectId } = useParams();
	const { data, isLoading } = useGetProjectGroupsQuery({ ownerId, projectId });
	const [createCard] = useCreateCardMutation();

	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const navigate = useNavigate();

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
			}).unwrap();
			console.log(response);
			navigate(`/${ownerId}/projects/${projectId}/dashboard`);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="col-span-10 p-3">
			<section className="m-1 px-4 py-3 bg-secondary rounded-md w-fit">
				<h1 className="text-2xl font-bold">Create Card</h1>
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
						<label
							htmlFor="description"
							className="font-semibold text-xl block"
						>
							Description
						</label>
						<textarea
							id="description"
							cols="30"
							rows="4"
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
			</section>
		</div>
	);
};

export default CreateCard;
