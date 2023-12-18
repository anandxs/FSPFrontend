import { useParams } from "react-router-dom";
import {
	useAddCommentToTaskMutation,
	useGetAllTaskCommentsQuery,
} from "../../features/comment/commentApiSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Comments = () => {
	const form = useForm();
	const { register, handleSubmit, formState, setValue } = form;
	const { errors } = formState;

	const { projectId, taskId } = useParams();

	const { data, isLoading, isSuccess, isError, error } =
		useGetAllTaskCommentsQuery({ projectId, taskId });

	let comments;
	if (isSuccess) {
		if (data.length === 0) {
			comments = <p>No comments</p>;
		} else {
			comments = data.map(({ commentId, comment, commenter }) => (
				<div
					key={commentId}
					className="flex justify-between border border-black my-0.5 px-1"
				>
					<p>{comment}</p>
					<p>- {`${commenter?.firstName} ${commenter?.lastName}`}</p>
				</div>
			));
		}
	}

	const [addCommentAsync] = useAddCommentToTaskMutation();

	const onSubmit = ({ comment }) => {
		const body = {
			comment,
		};
		addCommentAsync({ projectId, taskId, body })
			.unwrap()
			.then(() => {
				setValue("comment", "");
			})
			.catch((err) => {
				console.log(err);
				toast.error("Could not sent comment.");
			});
	};

	return (
		<div className="col-span-12 mb-3">
			<h2 className="text-xl font-bold hover:underline w-fit">Comments</h2>
			<div className="p-2 bg-blue-300 rounded flex flex-col">
				{isLoading ? <p>Loading...</p> : comments}
				<form
					className="flex gap-1"
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					<input
						type="text"
						className="block w-full"
						placeholder="Add a comment..."
						{...register("comment", {
							required: "Cannot send empty comment.",
						})}
					/>
					<button
						type="submit"
						className="block w-fit px-2 bg-primary text-white text-sm"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default Comments;
