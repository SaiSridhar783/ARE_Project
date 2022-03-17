import * as React from "react";

const TextInput = (props) => {
	return (
		<div className="field-container">
			<label htmlFor={props.id} className="input-label">
				{props.label} {props.children}
				{props.required && <span className="required">*</span>}
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
