import { useParams } from "react-router-dom";
import {
	useGetCardByIdQuery,
	useUpdateCardMutation,
} from "../../features/card/cardApiSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetProjectGroupsQuery } from "../../features/group/groupApiSlice";
import DeleteCard from "./DeleteCard";

const Card = () => {
	const { ownerId, projectId, groupId, cardId } = useParams();

	const form = useForm();
	const { register, handleSubmit, formState, setValue } = form;
	const { errors } = formState;

	const [toggleUpdate, setToggleUpdate] = useState(false);

	const { data } = useGetCardByIdQuery({
		ownerId,
		projectId,
		groupId,
		cardId,
	});

	const { data: groups } = useGetProjectGroupsQuery({ ownerId, projectId });
	const [updateCard] = useUpdateCardMutation();

	const handleUpdate = () => {
		setToggleUpdate(true);
		setValue("title", data?.title);
		setValue("groupId", data?.group?.groupId);
		setValue("description", data?.description);
	};

	const onSubmit = async (data) => {
		try {
			console.log(data);
			const body = { ...data };
			const response = await updateCard({
				ownerId,
				projectId,
				groupId,
				cardId,
				body,
			}).unwrap();
			setToggleUpdate(false);
		} catch (err) {
			console.log(err);
		}
	};

	return !toggleUpdate ? (
		<div className="col-span-10 p-3">
			<section className="flex justify-between gap-3 m-1 px-4 py-3 bg-secondary rounded-md w-full max-w-md">
				<div className="w-2/3 m-1">
					<div className="mb-3">
						<h1 className="text-2xl font-bold hover:cursor-pointer">
							{data?.title}
						</h1>
						<p className="text-sm">
							in group{" "}
							<span className="font-bold px-1 hover:cursor-pointer">
								{data?.group.name}
							</span>
						</p>
					</div>
					{data?.description && (
						<div className="mb-3">
							<h2 className="text-md font-bold hover:cursor-pointer">
								Description
							</h2>
							<p className="text-sm">{data?.description}</p>
						</div>
					)}
				</div>
				<div className="w-1/3 m-1 h-full bg-accent flex flex-col gap-1">
					<button
						className="bg-primary text-white font-semibold rounded px-1 w-full"
						onClick={handleUpdate}
					>
						Update
					</button>
					<DeleteCard params={{ ownerId, projectId, groupId, cardId }} />
				</div>
			</section>
		</div>
	) : (
		<div className="col-span-10 p-3">
			<section className="flex justify-between gap-3 m-1 px-4 py-3 bg-secondary rounded-md w-full max-w-md">
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<div className="my-2">
						<label htmlFor="title" className="font-semibold text-xl block">
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
							{groups?.map((g) => (
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
					<div className="flex gap-2">
						<button
							type="submit"
							className="bg-primary text-white text-md font-bold px-3 py-1 rounded w-full"
						>
							Update
						</button>
						<button
							type="button"
							className="bg-primary text-white text-md font-bold px-3 py-1 rounded w-full"
							onClick={() => setToggleUpdate(false)}
						>
							Cancel
						</button>
					</div>
				</form>
			</section>
		</div>
	);
};

export default Card;
