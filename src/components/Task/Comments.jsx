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
			comments = <p className="text-xs">No comments</p>;
		} else {
			comments = data.map(({ commentId, comment, commenter }) => (
				<div
					key={commentId}
					className="border border-black text-sm mb-1 flex justify-between items-center"
				>
					<p>{comment}</p>
					<p className="text-right text-xs">
						- {`${commenter?.firstName} ${commenter?.lastName}`}
					</p>
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

	if (isLoading) {
		return <p>Loading..</p>;
	}

	return (
		<div className="">
			<h2 className="text-md underline font-semibold mb-2">Comments</h2>
			<div className="p-2 bg-blue-300 rounded flex flex-col">
				{comments}
				<p className="text-xs text-red-600">{errors?.comment?.message}</p>
				<form
					className="flex gap-1"
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					<input
						type="text"
						className="block w-full text-xs p-1"
						placeholder="Add a comment..."
						{...register("comment", {
							required: "Cannot send empty comment.",
						})}
					/>
					<button
						type="submit"
						className="block w-fit bg-primary text-white text-xs p-1"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default Comments;
