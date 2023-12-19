import { apiSlice } from "../../app/api/apiSlice";

export const projectApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUserProjects: builder.query({
			query: () => `/api/projects`,
			providesTags: ["Projects"],
		}),
		createProject: builder.mutation({
			query: ({ body }) => ({
				url: `/api/projects`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["Projects"],
		}),
		getProject: builder.query({
			query: ({ projectId }) => `/api/projects/${projectId}`,
			providesTags: ["Project"],
		}),
		updateProject: builder.mutation({
			query: ({ projectId, body }) => ({
				url: `/api/projects/${projectId}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Projects", "Project"],
		}),
		deleteProject: builder.mutation({
			query: ({ projectId }) => ({
				url: `/api/projects/${projectId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Projects"],
		}),
		toggleProjectArchiveStatus: builder.mutation({
			query: ({ projectId }) => ({
				url: `/api/projects/${projectId}/archive`,
				method: "PUT",
			}),
			invalidatesTags: ["Projects", "Project"],
		}),
	}),
});

export const {
	useGetUserProjectsQuery,
	useCreateProjectMutation,
	useGetProjectQuery,
	useLazyGetProjectQuery,
	useUpdateProjectMutation,
	useDeleteProjectMutation,
	useToggleProjectArchiveStatusMutation,
} = projectApiSlice;
