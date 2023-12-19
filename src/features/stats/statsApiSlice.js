import { apiSlice } from "../../app/api/apiSlice";

export const statsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTasksPerStageData: builder.query({
			query: ({ projectId }) => `/api/projects/${projectId}/tasksperstage`,
			providesTags: ["TasksPerStage"],
		}),
	}),
});

export const { useGetTasksPerStageDataQuery } = statsApiSlice;
