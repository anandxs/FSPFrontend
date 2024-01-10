import { apiSlice } from "../../app/api/apiSlice";

export const statsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTasksPerStageData: builder.query({
			query: ({ projectId }) => `/api/projects/${projectId}/tasksperstage`,
			providesTags: ["TasksPerStage"],
		}),
		getTasksPerTypeData: builder.query({
			query: ({ projectId }) => `/api/projects/${projectId}/taskspertype`,
			providesTags: ["TasksPerStage"],
		}),
		getTotalHoursRequiredForProject: builder.query({
			query: ({ projectId }) => `/api/projects/${projectId}/tasks/totalHours`,
			providesTags: ["TotalHours"],
		}),
	}),
});

export const {
	useGetTasksPerStageDataQuery,
	useGetTasksPerTypeDataQuery,
	useGetTotalHoursRequiredForProjectQuery,
} = statsApiSlice;
