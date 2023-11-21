import { apiSlice } from "../../app/api/apiSlice";

export const projectApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createProject: builder.mutation({
			query: (body) => ({
				url: `/api/users/${body.userId}/projects`,
				method: "POST",
				body: { name: body.name },
			}),
			invalidatesTags: ["Projects"],
		}),
		getUserOwnedProjects: builder.query({
			query: (userId) => ({
				url: `/api/users/${userId}/projects`,
			}),
			providesTags: ["Projects"],
		}),
		getProjectById: builder.query({
			query: ({ ownerId, projectId }) => ({
				url: `/api/users/${ownerId}/projects/${projectId}`,
			}),
			providesTags: ["Project"],
		}),
		updateProjectName: builder.mutation({
			query: ({ ownerId, projectId, name }) => ({
				url: `/api/users/${ownerId}/projects/${projectId}`,
				method: "PUT",
				body: { name },
			}),
			invalidatesTags: ["Project", "Projects"],
		}),
		deleteProject: builder.mutation({
			query: ({ ownerId, projectId }) => ({
				url: `/api/users/${ownerId}/projects/${projectId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Projects"],
		}),
		toggleProjectArchiveStatus: builder.mutation({
			query: ({ ownerId, projectId }) => ({
				url: `/api/users/${ownerId}/projects/${projectId}/archive`,
				method: "PUT",
			}),
			invalidatesTags: ["Project", "Projects"],
		}),
	}),
});

export const {
	useCreateProjectMutation,
	useGetUserOwnedProjectsQuery,
	useGetProjectByIdQuery,
	useUpdateProjectNameMutation,
	useDeleteProjectMutation,
	useToggleProjectArchiveStatusMutation,
} = projectApiSlice;
