import { apiSlice } from "../../app/api/apiSlice";

export const groupApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createGroup: builder.mutation({
			query: ({ ownerId, projectId, groupName }) => ({
				url: `/api/users/${ownerId}/projects/${projectId}/groups`,
				method: "POST",
				body: { name: groupName },
			}),
			invalidatesTags: ["Groups"],
		}),
		getProjectGroups: builder.query({
			query: ({ ownerId, projectId }) =>
				`/api/users/${ownerId}/projects/${projectId}/groups`,
			providesTags: ["Groups"],
		}),
		deleteProjectGroup: builder.mutation({
			query: ({ ownerId, projectId, groupId }) => ({
				url: `/api/users/${ownerId}/projects/${projectId}/groups/${groupId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Groups", "Cards"],
		}),
		updateProjectGroup: builder.mutation({
			query: ({ ownerId, projectId, groupId, groupName }) => ({
				url: `/api/users/${ownerId}/projects/${projectId}/groups/${groupId}`,
				method: "PUT",
				body: { name: groupName },
			}),
			invalidatesTags: ["Groups", "Cards"],
		}),
	}),
});

export const {
	useCreateGroupMutation,
	useGetProjectGroupsQuery,
	useDeleteProjectGroupMutation,
	useUpdateProjectGroupMutation,
} = groupApiSlice;
