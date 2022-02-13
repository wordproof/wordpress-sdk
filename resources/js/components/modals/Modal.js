const { Modal } = wp.components;

import PropTypes from 'prop-types';

const WordProofModal = ( props ) => {
	const { title, children, close } = props;

	return (
		<>
			<Modal title={ title } onRequestClose={ close }>
				{ children }
			</Modal>
			) }
		</>
	);
};

WordProofModal.proptypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.any,
	close: PropTypes.func.isRequired,
};

export default WordProofModal;
