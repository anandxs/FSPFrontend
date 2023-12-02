import { apiSlice } from "../../app/api/apiSlice";

export const memberApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProjectMembers: builder.query({
			query: ({ ownerId, projectId }) =>
				`/api/users/${ownerId}/projects/${projectId}/members`,
			providesTags: ["Members"],
		}),
		addMember: builder.mutation({
			query: ({ ownerId, projectId, email, roleId }) => ({
				url: `/api/users/${ownerId}/projects/${projectId}/members`,
				method: "POST",
				body: { email, roleId },
			}),
			invalidatesTags: ["Members"],
		}),
		removeMember: builder.mutation({
			query: ({ ownerId, projectId, memberId }) => ({
				url: `/api/users/${ownerId}/projects/${projectId}/members/${memberId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Members"],
		}),
	}),
});

export const {
	useGetProjectMembersQuery,
	useAddMemberMutation,
	useRemoveMemberMutation,
} = memberApiSlice;
