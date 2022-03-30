import * as React from 'react'
import Modal from './Modal'

const TextInput = (props) => {
  const [showModal, setShowModal] = React.useState(false)

  return (
    <div className="field-container">
      <Modal show={showModal} handleClose={() => setShowModal(false)} />
      <label htmlFor={props.id} className="input-label">
        {props.label} {props.children}
        {props.required && <span className="required">*</span>}
        {props.id === 'm_i' && (
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
      <style jsx>
        {`
          .required {
            color: red;
            font-size: 1.5rem;
            margin-left: 2px;
          }

          .info-button {
            border-radius: 15px;
            background-color: #7e5b5b;
            box-sizing: border-box;
            display: inline;
            color: white;
            font-size: 12px;
            border: none;
            box-shadow: 0px 4px 4px 0 #00000025;
            font-weight: 900;
            margin-left: 10px;
            cursor: pointer;
            font-family: serif;
            font-family: 'PT Sans';
          }
          .input-label {
            font-size: 1.1rem;
            min-width: 55%;
            margin-right: 5%;
            font-family: 'PT Sans';
          }
          .input-field {
            border: 2px solid black;
            border-radius: 4px;
            padding: 0.5rem 0.8rem;
            min-width: 40%;
            font-family: 'PT Sans';
          }
          .field-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 90%;
            margin: 1rem 0;
          }
          @media (max-width: 900px) {
            .field-container {
              width: 150%;
            }
          }
        `}
      </style>
    </div>
  )
}

export default TextInput
