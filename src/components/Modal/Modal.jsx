import "./Modal.css";
const Modal = ({ children, action }) => {
	return (
		<div onClick={action} className="overlay">
			<div className="flex justify-center items-center h-full">{children}</div>
			<button onClick={action}>Close</button>
		</div>
	);
};

export default Modal;
