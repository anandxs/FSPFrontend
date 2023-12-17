import { apiSlice } from "../../app/api/apiSlice";

export const commentApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllTaskComments: builder.query({
			query: ({ projectId, taskId }) =>
				`/api/projects/${projectId}/tasks/${taskId}/comments`,
			providesTags: ["Commnets"],
		}),
		addCommentToTask: builder.mutation({
			query: ({ projectId, taskId, body }) => ({
				url: `/api/projects/${projectId}/tasks/${taskId}/comments`,
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useGetAllTaskCommentsQuery, useAddCommentToTaskMutation } =
	commentApiSlice;
