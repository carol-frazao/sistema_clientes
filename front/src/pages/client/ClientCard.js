
// ** Third Part Components
import { Media, Col, Row, Button } from 'reactstrap'
import { cepMask, documentMask, phoneMask } from '../../utils/masks'
import { Edit2, Trash2 } from 'react-feather'
import { useState } from 'react'
import ModalEditClient from './ModalEditClient'
import ModalDeleteClient from './ModalDeleteClient'

const ClientCard = props => {
    // ** Props
    const { client } = props

    // ** State
    const [modalEditClient, setModalEditClient] = useState(false)
    const [modalDeleteClient, setModalDeleteClient] = useState(false)

    // ** Functions
    const toggleEditClient = () => setModalEditClient(!modalEditClient)
    const toggleDeleteClient = () => setModalDeleteClient(!modalDeleteClient)

    const changeColor = (status) => {
        switch (status?.toLowerCase()) {
            case "ativo":
                return '#28b04d'
            case 'inativo':
                return '#f25050'
            default:
                return '#28b04d'        
        }
    }

    return (
        <Media tag='li' className='client-card-container' style={{borderLeft: `solid 2px #8381d3`}}>
            <div className='client-data'>
                <div className='client-name'>{client?.name}</div>

                <Row className='card-data'>
                    <Col>
                        <div className='data'> 
                            <strong>CPF/CNPJ:</strong>{" "}
                            <span>{client?.documentNumber ? documentMask(client.documentNumber) : 'N/D'}</span>
                        </div>
                        <div className='data'> 
                            <strong>Contato:</strong>{" "}
                            <span>{client?.phone ? phoneMask(client?.phone) : 'N/D'}</span>
                        </div>
                        <div className='data'> 
                            <strong>E-mail:</strong>{" "}
                            <span>{client?.email || 'N/D'}</span>
                        </div>
                    </Col>
                    <Col>
                        <div className='data'> 
                            <strong>Pessoa:</strong>{" "}
                            <span>{client?.personType || 'N/D'}</span>
                        </div>
                        <div className='data'> 
                            <strong>Status:</strong>{" "}
                            <span style={{textTransform: 'capitalize', color: changeColor(client?.status)}}>
                                {client?.status || 'N/D'}
                            </span>
                        </div>
                        <div className='data'> 
                            <strong>Endereço:</strong>{" "}
                            <span> 
                                {client?.addressStreet ? (
                                    `${client.addressStreet}${client?.addressNumber ? `, ${client.addressNumber}` : ''}${client?.addressComplement ? `, ${client.addressComplement}` : ''}` 
                                ) : 'N/D'}
                            </span>
                        </div>
                    </Col>
                    <Col>
                        <div className='data'> 
                            <strong>Bairro:</strong>{" "}
                            <span>{client?.addressDistrict || "N/D"}</span>
                        </div>
                        <div className='data'> 
                            <strong>Cidade:</strong>{" "}
                            <span>{client?.addressCity ? `${client.addressCity}/${client?.addressState}` : 'N/D'}</span>
                        </div>
                        <div className='data'> 
                            <strong>CEP:</strong>{" "}
                            <span>{client?.addressZipCode ? cepMask(client.addressZipCode) : "N/D"}</span>
                        </div>
                    </Col>
                    <Col className='client-actions'>
                        <Button size="sm" className='edit-client-btn' title='Editar dados' onClick={toggleEditClient}>
                            <Edit2 size={16} />
                        </Button>
                        <Button size="sm" className='delete-client-btn' title="Excluir cliente" onClick={toggleDeleteClient}>
                            <Trash2 size={16} />
                        </Button>
                    </Col>
                </Row>
            </div>

            <ModalEditClient
                modal={modalEditClient}
                toggleModal={toggleEditClient}
                client={client}
            />
             <ModalDeleteClient
                modal={modalDeleteClient}
                toggleModal={toggleDeleteClient}
                client={client}
            />
        </Media>
    )
}

export default ClientCard