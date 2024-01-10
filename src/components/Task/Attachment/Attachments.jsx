import { useState, useContext } from "react";
import {
	useDeleteAttachmentMutation,
	useGetTaskAttachmentsQuery,
} from "../../../features/attachment/attachmentApiSlice";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import { toast } from "react-toastify";
import { TaskContext } from "../Task";
import { selectCurrentProjectRole } from "../../../features/user/userSlice";
import Modal from "../../Modal/Modal";
import AddAttachmentModal from "./AddAttachmentModal";

const AddAttachment = () => {
	const { projectId, taskId } = useParams();
	const [toggle, setToggle] = useState(false);
	const { id } = useSelector(selectCurrentUser);
	const { role } = useSelector(selectCurrentProjectRole);
	const { assignee } = useContext(TaskContext);
	const { accessToken } = useSelector(selectCurrentUser);

	const {
		data: attachments,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetTaskAttachmentsQuery({ projectId, taskId });

	const [deleteAttachment, { isLoading: isDeleting }] =
		useDeleteAttachmentMutation();
	const handleDelete = async (attachmentId) => {
		try {
			await deleteAttachment({
				projectId,
				taskId,
				attachmentId,
			}).unwrap();

			toast.success("Successfully deleted attachment.");
		} catch (err) {
			console.log(err);
			toast.success(err?.data?.message);
		}
	};

	const downloadAttachment = ({ attachmentId, fileName }) => {
		fetch(
			`${
				import.meta.env.VITE_BASE_URL
			}/api/projects/${projectId}/tasks/${taskId}/attachments/${attachmentId}`,
			{
				method: "GET",
				credentials: "include",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
			.then((response) => {
				const file = response.blob();
				return file;
			})
			.then((blob) => {
				let url = window.URL.createObjectURL(new Blob([blob]));
				saveAs(url, fileName);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleToggle = () => {
		setToggle(!toggle);
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isError) {
		console.log(error);
		return <p>Something went wrong.</p>;
	}

	let temp;
	if (isSuccess) {
		if (attachments.length === 0) {
			temp = <p className="text-xs sm:text-sm">No attachments</p>;
		} else {
			temp = attachments.map(({ attachmentId, fileName, createdAt }) => (
				<li
					key={attachmentId}
					className="flex gap-2 justify-between items-center text-xs mb-1"
				>
					<div>
						<span className="font-semibold">File Name: </span>
						<span
							onClick={() => downloadAttachment({ attachmentId, fileName })}
							className="underline hover:cursor-pointer"
						>
							{fileName}
						</span>
					</div>
					<div className="flex gap-2 items-center">
						<span>{new Date(createdAt).toLocaleString()}</span>
						<button
							className={`bg-orange-500 text-white text-sm rounded-sm p-1 disabled:opacity-50 ${
								id === assignee?.id || role?.name === "ADMIN" ? "" : "hidden"
							}`}
							disabled={isDeleting}
							onClick={() => handleDelete(attachmentId)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
								/>
							</svg>
						</button>
					</div>
				</li>
			));
		}
	}

	return (
		<div className="mb-3">
			<div className="flex gap-2 items-center">
				<h2 className="underline font-semibold text-md mb-2">Attachments</h2>

				<button
					onClick={handleToggle}
					className={`bg-primary text-white p-1 ${
						id === assignee?.id || role?.name === "ADMIN" ? "" : "hidden"
					}`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-3 h-3"
					>
						<path
							fillRule="evenodd"
							d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>

			<div>{temp}</div>

			{toggle && (
				<Modal action={handleToggle}>
					<AddAttachmentModal handleToggle={handleToggle} />
				</Modal>
			)}
		</div>
	);
};

export default AddAttachment;
