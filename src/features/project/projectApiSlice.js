import { apiSlice } from "../../app/api/apiSlice";

export const projectApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUserProjects: builder.query({
			query: () => `/api/projects`,
		}),
		createProject: builder.mutation({
			query: ({ body }) => ({
				url: `/api/projects`,
				method: "POST",
				body,
			}),
		}),
		getProject: builder.query({
			query: ({ projectId }) => `/api/projects/${projectId}`,
		}),
		updateProject: builder.mutation({
			query: ({ projectId, body }) => ({
				url: `/api/projects/${projectId}`,
				method: "PUT",
				body,
			}),
		}),
		deleteProject: builder.mutation({
			query: (projectId) => ({
				url: `/api/projects/${projectId}`,
				method: "DELETE",
			}),
		}),
		toggleProjectArchiveStatus: builder.mutation({
			query: ({ projectId }) => ({
				url: `/api/projects/${projectId}`,
				method: "PUT",
			}),
		}),
	}),
});

export const {
	useGetUserProjectsQuery,
	useCreateProjectMutation,
	useGetProjectQuery,
	useUpdateProjectMutation,
	useDeleteProjectMutation,
	useToggleProjectArchiveStatusMutation,
} = projectApiSlice;
