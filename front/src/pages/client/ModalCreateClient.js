import { useEffect, useState } from "react"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import ClientForm from "./ClientForm"
import { useDispatch, useSelector } from "react-redux"
import { changeCreatedClient, createClient } from "../../redux/actions/client"

const ModalCreateClient = (props) => {
    const {
        modal, 
        toggleModal
    } = props

    const dispatch = useDispatch()

    // ** States
    const [formData, setFormData] = useState({})
    const [error, setError] = useState("")

    const createdClient = useSelector(state => state.client.createdClient)

    // ** Functions
    const handleSubmit = (data) => {
        dispatch(createClient(data))
    }

    useEffect(() => {
        if (createdClient) {
            setFormData({})
            setError("")
            toggleModal()
            dispatch(changeCreatedClient(false))
        }
    }, [createdClient])

    return (
        <Modal isOpen={modal} className="modal-dialog-centered modal-lg modal-edit-client">
            <ModalHeader toggle={toggleModal}>
               Novo cliente
            </ModalHeader>
            <ModalBody>
                <ClientForm 
                    onSubmit={handleSubmit}
                    formData={formData}
                    setFormData={setFormData}
                    toggle={toggleModal}
                    error={error}
                    setError={setError}
                />
            </ModalBody>
        </Modal>
    )   
}

export default ModalCreateClient