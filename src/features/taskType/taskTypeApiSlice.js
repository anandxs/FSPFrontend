import { apiSlice } from "../../app/api/apiSlice";

export const taskTypeApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProjectTaskTypes: builder.query({
			query: ({ projectId }) => `/api/projects/${projectId}/types`,
			providesTags: ["Types"],
		}),
		createTaskType: builder.mutation({
			query: ({ projectId, body }) => ({
				url: `/api/projects/${projectId}/types`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["Types", "Type"],
		}),
		getTaskTypeById: builder.query({
			query: ({ projectId, typeId }) =>
				`/api/projects/${projectId}/types/${typeId}`,
			providesTags: ["Type"],
		}),
		updateTaskType: builder.mutation({
			query: ({ projectId, typeId, body }) => ({
				url: `/api/projects/${projectId}/types/${typeId}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Types", "Type"],
		}),
		deleteTaskType: builder.mutation({
			query: ({ projectId, typeId }) => ({
				url: `/api/projects/${projectId}/types/${typeId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Types", "Type"],
		}),
		toggleTaskTypeArchiveStatus: builder.mutation({
			query: ({ projectId, typeId }) => ({
				url: `/api/projects/${projectId}/types/${typeId}`,
				method: "PUT",
			}),
			invalidatesTags: ["Types", "Type"],
		}),
	}),
});

export const {
	useGetProjectTaskTypesQuery,
	useCreateTaskTypeMutation,
	useGetTaskTypeByIdQuery,
	useUpdateTaskTypeMutation,
	useDeleteTaskTypeMutation,
	useToggleTaskTypeArchiveStatusMutation,
} = taskTypeApiSlice;
