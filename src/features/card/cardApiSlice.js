import { apiSlice } from "../../app/api/apiSlice";

export const cardApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCardsForProject: builder.query({
			query: ({ projectId }) => `/api/projects/${projectId}/cards`,
			providesTags: ["Cards"],
		}),
		getCardById: builder.query({
			query: ({ projectId, cardId }) =>
				`/api/projects/${projectId}/cards/${cardId}`,
			providesTags: ["Card"],
		}),
		deleteCard: builder.mutation({
			query: ({ projectId, cardId }) => ({
				url: `/api/projects/${projectId}/cards/${cardId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Cards"],
		}),
		createCard: builder.mutation({
			query: ({ groupId, body }) => ({
				url: `/api/groups/${groupId}/cards`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["Cards"],
		}),
		updateCard: builder.mutation({
			query: ({ cardId, body }) => ({
				url: `/api/cards/${cardId}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Card", "Cards"],
		}),
		toggleCardArchiveStatus: builder.mutation({
			query: ({ projectId, cardId }) => ({
				url: `api/projects/${projectId}/cards/${cardId}/archive`,
			}),
		}),
	}),
});

export const {
	useGetCardByIdQuery,
	useGetCardsForProjectQuery,
	useCreateCardMutation,
	useDeleteCardMutation,
	useUpdateCardMutation,
	useToggleCardArchiveStatusMutation,
} = cardApiSlice;
