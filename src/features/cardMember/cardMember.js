import { apiSlice } from "../../app/api/apiSlice";

export const cardMemberApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAssigneesForCard: builder.query({
			query: ({ projectId, cardId }) =>
				`/api/projects/${projectId}/cards/${cardId}/assignees`,
		}),
		getCardsForMember: builder.query({
			query: ({ projectId, memberId }) =>
				`/api/projects/${projectId}/assignee/${memberId}/cards`,
		}),
		assignCardToMember: builder.mutation({
			query: ({ projectId, cardId, assigneeId, body }) => ({
				url: `/api/projects/${projectId}/cards/${cardId}/assignees/${assigneeId}`,
				method: "POST",
				body,
			}),
		}),
		removeMemberFromCard: builder.mutation({
			query: ({ projectId, cardId, assigneeId }) => ({
				url: `/api/projects/${projectId}/cards/${cardId}/assignees/${assigneeId}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useGetAssigneesForCardQuery,
	useGetCardsForMemberQuery,
	useAssignCardToMemberMutation,
	useRemoveMemberFromCardMutation,
} = cardMemberApi;
