import { useState } from "react";
import Modal from "../../Modal/Modal";
import AddAttachmentModal from "./AddAttachmentModal";
import {
	useDeleteAttachmentMutation,
	useGetTaskAttachmentsQuery,
} from "../../../features/attachment/attachmentApiSlice";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";

const AddAttachment = () => {
	const { projectId, taskId } = useParams();
	const [toggle, setToggle] = useState(false);

	const {
		data: attachments,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetTaskAttachmentsQuery({ projectId, taskId });

	const [deleteAttachment] = useDeleteAttachmentMutation();
	const handleDelete = (attachmentId) => {
		deleteAttachment({
			projectId,
			taskId,
			attachmentId,
		})
			.unwrap()
			.then(() => {
				console.log("deleted successfully");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	let temp;
	if (isSuccess) {
		if (attachments.length === 0) {
			temp = <p>No attachments</p>;
		} else {
			temp = attachments.map(({ attachmentId, fileName, createdAt }) => (
				<li key={attachmentId} className="flex gap-2">
					<span onClick={() => downloadAttachment({ attachmentId, fileName })}>
						{fileName}
					</span>
					<span>{createdAt}</span>
					<button
						className="bg-orange-500 text-white text-sm rounded-sm px-1 py-0.5"
						onClick={() => handleDelete(attachmentId)}
					>
						Delete
					</button>
				</li>
			));
		}
	} else if (isError) {
		temp = <p>Something went wrong.</p>;
		console.log(error);
	}

	const downloadAttachment = ({ attachmentId, fileName }) => {
		fetch(
			`${
				import.meta.env.VITE_BASE_URL
			}/api/projects/${projectId}/tasks/${taskId}/attachments/${attachmentId}`,
			{
				method: "GET",
				credentials: "include",
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

	return (
		<div className="col-span-12 mb-3">
			<div>
				<div className="flex gap-2">
					<h2 className="text-xl font-bold">Attachments</h2>
					<button
						onClick={handleToggle}
						className="bg-primary text-white text-sm px-2 py-1 rounded"
					>
						Add
					</button>
				</div>

				<div>
					{isLoading && <p>Loading...</p>}
					{temp}
				</div>
			</div>

			{toggle && (
				<Modal action={handleToggle}>
					<AddAttachmentModal handleToggle={handleToggle} />
				</Modal>
			)}
		</div>
	);
};

export default AddAttachment;
