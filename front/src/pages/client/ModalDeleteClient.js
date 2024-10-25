import { useDispatch } from "react-redux"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { deleteClient } from "../../redux/actions/client"

const ModalDeleteClient = (props) => {
    const {
        modal, 
        toggleModal,
        client
    } = props

    const dispatch = useDispatch()

    const handleDeleteClient = () => {
        if (client.id) {
            dispatch(deleteClient(client.id))
        }
    }

    return (
        <Modal isOpen={modal} toggle={toggleModal} className="modal-dialog-centered">
            <ModalBody>
                <p className="text-center mt-3">
                    Tem certeza que deseja deletar o(a) cliente <strong>{client?.name}</strong>?
                </p>
                <p className="text-center mt-4">
                    <Button size="sm" className="flat-danger" style={{marginRight: '0.5rem'}} onClick={toggleModal}>
                        Cancelar
                    </Button>
                    <Button size="sm" className="primary" onClick={handleDeleteClient}>
                        Confirmar
                    </Button>
                </p>
            </ModalBody>
        </Modal>
    )   
}

export default ModalDeleteClient