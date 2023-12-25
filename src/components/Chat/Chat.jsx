import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";

const Chat = () => {
	const [connection, setConnection] = useState(null);
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	const { projectId } = useParams();
	const roomId = projectId.toUpperCase();

	useEffect(() => {
		const hubConnection = new HubConnectionBuilder()
			.withUrl(`${import.meta.env.VITE_BASE_URL}/chat`)
			.build();

		setConnection(hubConnection);

		hubConnection
			.start()
			.then(() => {
				hubConnection
					.invoke("JoinGroup", roomId)
					.then((data) => {
						console.log(data);
						setMessages([
							...data.map((entity) => {
								return {
									id: entity?.id,
									message: entity?.message,
									sender: {
										firstName: entity?.sender?.firstName,
										lastName: entity?.sender?.lastName,
									},
									sentAt: entity?.sentAt,
								};
							}),
						]);
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

	useEffect(() => {
		if (connection) {
			connection.on("groupMessage", (message) => {
				console.log(message);
				setMessages([...messages, message]);
			});
		}
	}, [connection, messages]);

	const { id, name } = useSelector(selectCurrentUser);
	const sendMessage = () => {
		if (message.length == 0 || message.length > 500) {
			return;
		}

		const sender = {
			id,
			name,
		};

		connection.send("SendMessage", roomId, name, message);
		setMessage("");
	};

	return (
		<section className="bg-gray-100 p-4 rounded">
			<div className="m-4">
				<ul id="messages" className="list-disc pl-4">
					{messages?.map(({ id, message, sender, sentAt }) => (
						<li key={id}>
							<span>{message}</span>
							<span>{`${sender?.firstName} ${sender?.lastName}`}</span>
						</li>
					))}
				</ul>
			</div>
			<div class={`fixed bottom-0 left-0 right-0 bg-gray-100 p-4`}>
				<div className="flex">
					<input
						type="text"
						id="message"
						placeholder="Write a message..."
						className="flex-1 mr-2 p-2 border border-gray-300 rounded-lg"
						onChange={(e) => setMessage(e.target.value)}
						value={message}
					/>
					<button
						type="submit"
						className="bg-primary text-white p-1"
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
			</div>
		</section>
	);
};

export default Chat;
