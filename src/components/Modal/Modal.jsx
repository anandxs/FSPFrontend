import "./Modal.css";
const Modal = ({ children, action }) => {
	return (
		<div onClick={action} className="overlay z-10">
			<div className="flex justify-center items-center h-full">{children}</div>
		</div>
	);
};

export default Modal;
