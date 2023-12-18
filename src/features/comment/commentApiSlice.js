import { apiSlice } from "../../app/api/apiSlice";

export const commentApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllTaskComments: builder.query({
			query: ({ projectId, taskId }) =>
				`/api/projects/${projectId}/tasks/${taskId}/comments`,
			providesTags: ["Comments"],
		}),
		addCommentToTask: builder.mutation({
			query: ({ projectId, taskId, body }) => ({
				url: `/api/projects/${projectId}/tasks/${taskId}/comments`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["Comments"],
		}),
	}),
});

export const { useGetAllTaskCommentsQuery, useAddCommentToTaskMutation } =
	commentApiSlice;
