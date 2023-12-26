import { apiSlice } from "../../app/api/apiSlice";

export const attachmentApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTaskAttachments: builder.query({
			query: ({ projectId, taskId }) => ({
				url: `/api/projects/${projectId}/tasks/${taskId}/attachments`,
			}),
			providesTags: ["Attachments"],
		}),
		addAttachment: builder.mutation({
			query: ({ projectId, taskId, body }) => ({
				url: `/api/projects/${projectId}/tasks/${taskId}/attachments`,
				method: "POST",
				headers: {
					"content-type": "multipart/form-data",
				},
				body,
			}),
			invalidatesTags: ["Attachments"],
		}),
		getAttachmentById: builder.query({
			query: ({ projectId, taskId, attachmentId }) => ({
				url: `/api/projects/${projectId}/tasks/${taskId}/attachments/${attachmentId}`,
			}),
		}),
		deleteAttachment: builder.mutation({
			query: ({ projectId, taskId, attachmentId }) => ({
				url: `/api/projects/${projectId}/tasks/${taskId}/attachments/${attachmentId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Attachments"],
		}),
	}),
});

export const {
	useGetTaskAttachmentsQuery,
	useAddAttachmentMutation,
	useLazyGetAttachmentByIdQuery,
	useDeleteAttachmentMutation,
} = attachmentApiSlice;
