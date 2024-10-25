import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getClients } from "../../redux/actions/client"
import ClientCard from "./ClientCard"
import { Button } from "reactstrap"
import { PlusCircle, Search, User } from "react-feather"
import ModalCreateClient from "./ModalCreateClient"

const Clients = () => {
    const dispatch = useDispatch()

    const clients = useSelector(state => state.client.clients)

    // ** States
    const [modalCreateClient, setModalCreateClient] = useState(false)

    const toggleCreateClient = () => setModalCreateClient(!modalCreateClient)

    useEffect(() => {
        dispatch(getClients())
    }, [dispatch])

    // ** Renderiza a lista de parcelas
    const renderClientsList = () => {
        return clients?.map((client) => {
            return (
                <ClientCard
                    key={client.id}
                    client={client}
                />
            )
        })
    }

    return (
        <div className="clients page">
            <div className="client-top">
                <h2>
                    <User size={21} />
                    Clientes
                </h2>
                <Button size="sm" className="primary" onClick={toggleCreateClient}>
                    Novo cliente{" "}
                    <PlusCircle size={14} style={{marginTop: '-2px'}}/>
                </Button>
            </div>
            {clients?.length > 0 ? (
                <ul className='clients-media-list'>
                    {renderClientsList()}
                </ul>
            ) : (
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem'}}>
                  Nenhum resultado encontrado.
                  <Button size="sm" className="primary" style={{width: '160px', marginTop: '0.5rem'}} onClick={() => dispatch(getClients())}>
                    Buscar novamente{" "}
                    <Search size={16} />
                  </Button>
                </div>
            )}  

            <ModalCreateClient 
                modal={modalCreateClient}
                toggleModal={toggleCreateClient}
            />
        </div>
    )
}

export default Clients