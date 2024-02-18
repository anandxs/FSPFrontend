import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import "./Chat.css";

const Chat = () => {
	const [connection, setConnection] = useState(null);
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	const { projectId } = useParams();
	const roomId = projectId.toUpperCase();
	const { accessToken } = useSelector(selectCurrentUser);

	useEffect(() => {
		const hubConnection = new HubConnectionBuilder()
			.withUrl(`${import.meta.env.VITE_BASE_URL}/chat`, {
				accessTokenFactory: () => accessToken,
			})
			.build();

		setConnection(hubConnection);

		hubConnection
			.start()
			.then(() => {
				hubConnection
					.invoke("JoinGroup", roomId)
					.then((data) => {
						if (data) {
							setMessages([
								...data.map((entity) => {
									return {
										id: entity?.id,
										message: entity?.message,
										sender: {
											id: entity?.sender?.id,
											firstName: entity?.sender?.firstName,
											lastName: entity?.sender?.lastName,
										},
										sentAt: entity?.sentAt,
									};
								}),
							]);
						} else {
							setMessage(["x"]);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});

		return () => {
			hubConnection.stop();
		};
	}, []);

	const { id: currId, name } = useSelector(selectCurrentUser);

	useEffect(() => {
		if (connection) {
			connection.on("groupMessage", (message) => {
				setMessages([...messages, message]);
			});
		}
	}, [connection, messages]);

	const sendMessage = () => {
		if (message.length == 0 || message.length > 500) {
			return;
		}

		const sender = {
			id: currId,
			name,
		};

		connection.send("SendMessage", roomId, name, message);
		setMessage("");
	};

	return (
		<section className="">
			<ul
				id="messages"
				className="h-[440px] sm:h-[550px] overflow-auto flex flex-col pr-3 justify-start gap-2 sbar"
			>
				{messages?.map(({ id, message, sender, sentAt }) => (
					<li
						key={id}
						className={`border-2 border-indigo-950 my-1 p-1 text-sm w-fit ${
							currId === sender?.id ? "self-end" : ""
						}`}
					>
						<p className="font-semibold">{`${sender?.firstName} ${sender?.lastName}`}</p>
						<p>{message}</p>
						<p className="text-[12px]">
							Sent at {new Date(sentAt).toLocaleString()}
						</p>
					</li>
				))}
			</ul>
			<form onSubmit={(e) => e.preventDefault()}>
				<div className="w-full md:w-10/12 fixed bottom-0 backdrop-blur-md flex gap-2 border-t-2 border-indigo-500 p-2">
					<input
						type="text"
						id="message"
						placeholder="Write a message..."
						className="p-1 w-full"
						onChange={(e) => setMessage(e.target.value)}
						value={message}
					/>
					<button
						type="submit"
						className="block px-3 py-1 text-center rounded-sm text-gray-50 bg-indigo-950"
						onClick={sendMessage}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-4 h-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
							/>
						</svg>
					</button>
				</div>
			</form>
		</section>
	);
};

export default Chat;
