const Chat = () => {
	return (
		<section className="px-3 pt-3">
			<div>
				<ul id="messages"></ul>
			</div>
			<div className="flex gap-2">
				<input
					type="text"
					id="message"
					placeholder="Write a message..."
					className="w-full"
				/>
				<button type="submit" className="bg-primary text-white p-1">
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
		</section>
	);
};

export default Chat;
