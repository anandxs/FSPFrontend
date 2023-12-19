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
			invalidatesTags: ["Tasks", "Task", "TasksPerStage"],
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
			invalidatesTags: ["Tasks", "Task", "TasksPerStage"],
		}),
		deleteTask: builder.mutation({
			query: ({ projectId, taskId }) => ({
				url: `/api/projects/${projectId}/tasks/${taskId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Tasks", "Task", "TasksPerStage"],
		}),
	}),
});

export const {
	useGetProjectTasksQuery,
	useCreateTaskMutation,
	useGetTaskByIdQuery,
	useLazyGetTaskByIdQuery,
	useUpdateTaskMutation,
	useDeleteTaskMutation,
} = taskApiSlice;
