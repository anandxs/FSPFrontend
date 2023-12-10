import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (credentials) => ({
				url: "/api/authentication",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		logOut: builder.mutation({
			query: () => ({
				url: "/api/authentication",
				method: "DELETE",
			}),
		}),
		login: builder.mutation({
			query: (credentials) => ({
				url: "/api/authentication/login",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		verifyEmail: builder.mutation({
			query: (body) => ({
				url: `/api/authentication/verifyemail`,
				method: "POST",
				body,
			}),
		}),
		forgotPassword: builder.mutation({
			query: (email) => ({
				url: "/api/authentication/forgotpassword",
				method: "POST",
				body: { email },
			}),
		}),
		resetPassword: builder.mutation({
			query: (body) => ({
				url: "/api/authentication/resetpassword",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogOutMutation,
	useVerifyEmailMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
} = authApiSlice;
