import { useState } from "react";
import { useParams } from "react-router-dom";
import { apiSlice } from "../../../app/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import { toast } from "react-toastify";
import LoadingButton from "../../LoadingButton";

const AddAttachmentModal = ({ handleToggle }) => {
	const { projectId, taskId } = useParams();
	const [file, setFile] = useState();
	const [error, setError] = useState();
	const { accessToken } = useSelector(selectCurrentUser);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (!file) {
			setError("File is requried.");
			setIsLoading(false);
			return;
		}

		const formData = new FormData();
		formData.append("file", file);
		fetch(
			`${
				import.meta.env.VITE_BASE_URL
			}/api/projects/${projectId}/tasks/${taskId}/attachments`,
			{
				method: "POST",
				body: formData,
				credentials: "include",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
			.then((response) => {
				if (response.status == 204) {
					handleToggle();
					toast.success("Successfully uploaded file.");
					dispatch(apiSlice.util.invalidateTags(["Attachments"]));
				} else if (response.status == 400) {
					setError("Duplicate name. Rename and try again.");
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const updateFile = (e) => {
		setFile(e.target.files[0]);
		setError(null);
	};

	return (
		<div
			className="pt-4 w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold text-left">Add Attachment</h1>
			<form
				onSubmit={handleSubmit}
				encType="multipart/form-data"
				className="space-y-4"
			>
				<div className="space-y-1 text-sm">
					<input
						type="file"
						onChange={updateFile}
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						disabled={isLoading}
					/>
					<p className="text-red-600 text-xs">{error && error}</p>
				</div>
				{isLoading ? (
					<LoadingButton />
				) : (
					<button
						type="submit"
						className="block w-full p-3 text-center rounded-sm text-gray-50 bg-blue-600"
					>
						Upload
					</button>
				)}
			</form>
		</div>
	);
};

export default AddAttachmentModal;
