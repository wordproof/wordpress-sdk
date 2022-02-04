const {Modal} = wp.components;
const {useState} = wp.element;

import PropTypes from 'prop-types';

const WordProofModal = (props) => {
    const [isOpen, setOpen] = useState(true);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    const {
        title,
        children
    } = props;

    return (
            <>
                {isOpen &&
                <Modal title={title} onRequestClose={closeModal}>
                    {children}
                </Modal>
                }
            </>
    );
}

WordProofModal.proptypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any
}

export default WordProofModal;
