const Modal = ({ handleClose, show, children }) => {
	const showHideClassName = show
		? "modal display-block"
		: "modal display-none";

	return (
		<div className={showHideClassName}>
			<section className="modal-main">
				<img
					src="/images/Mi_data.png"
					alt="m_i-info"
					className="info-image"
				/>
				<button
					type="button"
					className="close-button"
					onClick={handleClose}
				>
					Close
				</button>
			</section>
		</div>
	);
};

export default Modal;
