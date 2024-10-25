import { useEffect, useState } from "react"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import ClientForm from "./ClientForm"
import { useDispatch, useSelector } from "react-redux"
import { changeUpdatedClient, updateClient } from "../../redux/actions/client"

const ModalEditClient = (props) => {
    const {
        modal, 
        toggleModal,
        client
    } = props

    const dispatch = useDispatch()

    // ** States
    const [formData, setFormData] = useState(client || {})
    const [error, setError] = useState("")

    const updatedClient = useSelector(state => state.client.updatedClient)

    // ** Functions
    const handleSubmit = (data) => {
        dispatch(updateClient(client.id, data))
    }

    useEffect(() => {
        if (client && updatedClient && modal) {
            setFormData(client)
            setError("")
            toggleModal()
            dispatch(changeUpdatedClient(false))
        }
    }, [updatedClient])

    useEffect(() => {
        if (modal) {
            setFormData(client)
            setError("")
        }
    }, [modal])

    return (
        <Modal isOpen={modal} className="modal-dialog-centered modal-lg modal-edit-client">
            <ModalHeader toggle={toggleModal}>
               Editar: {client?.name}
            </ModalHeader>
            <ModalBody>
                <ClientForm 
                    onSubmit={handleSubmit}
                    formData={formData}
                    setFormData={setFormData}
                    toggle={toggleModal}
                    error={error}
                    setError={setError}
                    client={client}
                />
            </ModalBody>
        </Modal>
    )   
}

export default ModalEditClient