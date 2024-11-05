import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getClients } from "../../redux/actions/client"
import ClientCard from "./ClientCard"
import { Button, Input } from "reactstrap"
import { PlusCircle, Search, User, X } from "react-feather"
import ModalCreateClient from "./ModalCreateClient"
import { Paginator } from 'primereact/paginator'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'

const Clients = () => {
    const dispatch = useDispatch()

    const clients = useSelector(state => state.client.clients)

    // ** States
    const [modalCreateClient, setModalCreateClient] = useState(false)
    const [first, setFirst] = useState(0) // Índice do primeiro item na página atual
    const [rows, setRows] = useState(10) // Número de itens por página
    const [searchValue, setSearchValue] = useState("")

    const toggleCreateClient = () => setModalCreateClient(!modalCreateClient)

    const onPageChange = async (event) => {
        setFirst(event.first)
        setRows(event.rows)
    }

    const handleSearch = (e) => {
        const value = e.target.value
        if (value !== " ") {
            setSearchValue(value)
            setFirst(0) // Reseta para a primeira página após uma nova busca    
        }
    }

    useEffect(() => {
        dispatch(getClients())
    }, [dispatch])

    // ** Filtra os clientes com base no searchValue
    const filteredClients = clients?.length > 0 ? clients.filter(client => {
        const fieldsToSearch = [
            client.name,
            client.documentNumber,
            client.email,
            client.phone,
            client.addressStreet,
            client.addressCity,
            client.addressDistrict
        ]
        // Verifica se algum dos campos inclui o valor de busca (case-insensitive)
        return fieldsToSearch.some(field => 
            field && field.toLowerCase().includes(searchValue.toLowerCase())
        )
    }) : [];

    // ** Renderiza a lista de clientes paginada
    const renderClientsList = () => {
        const paginatedClients = filteredClients.slice(first, first + rows) // Exibe apenas os itens da página atual
        return paginatedClients?.map((client) => (
            <ClientCard key={client.id} client={client} />
        ))
    }

    return (
        <div className="clients page">
            <div className="client-top">
                <h2>
                    <User size={21} />
                    Clientes
                </h2>
                <div>
                    <div className='input-elements'>
                        <Input 
                            type="text"
                            id="search"
                            name="search"
                            value={searchValue}
                            onChange={handleSearch}
                            placeholder="Pesquisar..."
                        />
                        {!searchValue ? (
                            <Search size={15} />     
                        ) : (
                            <X 
                                size={18} 
                                style={{color: '#db0f27', opacity: 1, cursor: 'pointer'}} 
                                onClick={() => setSearchValue("")}
                            />
                        )}
                    </div>
                   
                    <Button size="sm" className="primary" onClick={toggleCreateClient}>
                        Novo cliente{" "}
                        <PlusCircle size={14} style={{marginTop: '-2px'}}/>
                    </Button>
                </div>
            </div>

            {clients?.length > 0 ? (
                <>
                    <ul className='clients-media-list'>
                        {renderClientsList()}  
                    </ul>

                    <div className="paginacao">
                        <span className="view-info">
                            Exibindo {Math.min(first + rows, filteredClients?.length)} de {filteredClients?.length}
                        </span>
                        <Paginator
                            first={first}
                            rows={rows}
                            totalRecords={filteredClients?.length || 0}
                            onPageChange={onPageChange}
                        />
                    </div>
                </>
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