const styles = {
	modal: {
	  position: 'fixed',
	  top: '0',
	  left: '0',
	  width: '100%',
	  height: '100%',
	  background: 'rgba(0, 0, 0, 0.6)',
	},
	modal_main: {
	  position: 'fixed',
	  background: 'white',
	  top: '50%',
	  left: '50%',
	  transform: 'translate(-50%, -50%)',
	  borderRadius: '10px',
	},
	info_image: {
	  width: '100%',
	  height: '100%',
	  borderRadius: '10px',
	  objectFit: 'contain',
	},
	display_block: {
	  display: 'block',
	},
	display_none: {
	  display: 'none',
	},
	close_button: {
	  top: '0',
	  right: '0',
	  background: 'none',
	  border: 'none',
	  cursor: 'pointer',
	  fontSize: '1.1rem',
	  color: 'white',
	  backgroundColor: 'rgb(212, 45, 45)',
	  margin: '1rem 45%',
	  padding: '3px 1rem',
	  borderRadius: '18px',
	},
  }
  
  const Modal = ({ handleClose, show, children }) => {
	const showHideClassName = show ? styles.display_block : styles.display_none
  
	return (
	  <div
		className={showHideClassName}
		style={{ ...styles.modal, ...showHideClassName }}
	  >
		<section style={styles.modal_main}>
		  <img
			src="/images/Mi_data.png"
			alt="m_i-info"
			style={styles.info_image}
		  />
		  <button type="button" style={styles.close_button} onClick={handleClose}>
			Close
		  </button>
		</section>
	  </div>
	)
  }
  
  export default Modal
  