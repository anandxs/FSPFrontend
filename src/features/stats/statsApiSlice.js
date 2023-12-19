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
	}),
});

export const { useGetTasksPerStageDataQuery, useGetTasksPerTypeDataQuery } =
	statsApiSlice;
