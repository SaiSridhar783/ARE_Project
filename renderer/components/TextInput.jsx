import * as React from "react";
import Modal from "./Modal";

const TextInput = (props) => {
	const [showModal, setShowModal] = React.useState(false);

	return (
		<div className="field-container">
			<Modal show={showModal} handleClose={() => setShowModal(false)} />
			<label htmlFor={props.id} className="input-label">
				{props.label} {props.children}
				{props.required && <span className="required">*</span>}
				{props.id === "m_i" && (
					<button
						type="button"
						className="info-button"
						onClick={() => setShowModal(true)}
					>
						i
					</button>
				)}
			</label>
			<input
				id={props.id}
				name={props.name}
				type="number"
				value={props.value}
				onChange={(e) => props.onChangeText(e)}
				className="input-field"
				required={props.required}
				max={props.max}
				min={0}
				step=".0001"
			/>
		</div>
	);
};

export default TextInput;
