import { apiSlice } from "../../app/api/apiSlice";

export const taskApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProjectTasks: builder.query({
			query: ({ projectId }) => `/api/projects/${projectId}/tasks`,
			providesTags: ["Tasks"],
		}),
		createTask: builder.mutation({
			query: ({ projectId, body }) => ({
				url: `/api/projects/${projectId}/tasks`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["Tasks", "Task"],
		}),
		getTaskById: builder.query({
			query: ({ projectId, taskId }) =>
				`/api/projects/${projectId}/tasks/${taskId}`,
			providesTags: ["Task"],
		}),
		updateTask: builder.mutation({
			query: ({ projectId, taskId, body }) => ({
				url: `/api/projects/${projectId}/tasks/${taskId}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Tasks", "Task"],
		}),
		deletetask: builder.mutation({
			query: ({ projectId, taskId }) => ({
				url: `/api/projects/${projectId}/tasks/${taskId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Tasks", "Task"],
		}),
	}),
});

export const {
	useGetProjectTasksQuery,
	useCreateTaskMutation,
	useGetTaskByIdQuery,
	useUpdateTaskMutation,
	useDeletetaskMutation,
} = taskApiSlice;
