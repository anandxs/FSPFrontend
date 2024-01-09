import { apiSlice } from "../../app/api/apiSlice";

export const stageApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProjectStages: builder.query({
			query: ({ projectId }) => `/api/projects/${projectId}/stages`,
			providesTags: ["Stages"],
		}),
		createStage: builder.mutation({
			query: ({ projectId, body }) => ({
				url: `/api/projects/${projectId}/stages`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["Stages", "Stage", "TasksPerStage"],
		}),
		getStageById: builder.query({
			query: ({ projectId, stageId }) =>
				`/api/projects/${projectId}/stages/${stageId}`,
			providesTags: ["Stage"],
		}),
		updateStage: builder.mutation({
			query: ({ projectId, stageId, body }) => ({
				url: `/api/projects/${projectId}/stages/${stageId}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Stages", "Stage", "TasksPerStage", "Tasks"],
		}),
		deleteStage: builder.mutation({
			query: ({ projectId, stageId }) => ({
				url: `/api/projects/${projectId}/stages/${stageId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Stages", "Stage", "TasksPerStage"],
		}),
		toggleStageArchiveStatus: builder.mutation({
			query: ({ projectId, stageId }) => ({
				url: `/api/projects/${projectId}/stages/${stageId}`,
				method: "PUT",
			}),
			invalidatesTags: ["Stages", "Stage", "TasksPerStage"],
		}),
	}),
});

export const {
	useGetProjectStagesQuery,
	useCreateStageMutation,
	useGetStageByIdQuery,
	useUpdateStageMutation,
	useDeleteStageMutation,
	useToggleStageArchiveStatusMutation,
} = stageApiSlice;
