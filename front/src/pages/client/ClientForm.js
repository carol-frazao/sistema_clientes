import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { cepMask, cnpjMask, cpfMask, documentMask, phoneMask } from "../../utils/masks"
import axios from "axios"
import { useEffect, useState } from "react"
import Select from 'react-select'
import { Save } from "react-feather"
import { validateCEP, validateCpfCnpj, validateEmail, validatePhoneNumber } from "../../utils/validations/validations"

const ClientForm = (props) => {
    const {
        onSubmit,
        formData,
        setFormData,
        toggle,
        error,
        setError,
        client
    } = props

    // ** States
    const [statesList, setStatesList] = useState([])
    const [citiesList, setCitiesList] = useState([])    

    // Função para buscar os estados na API do IBGE
    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                const sortedStates = response.data.sort((a, b) => a.nome.localeCompare(b.nome)); // Ordenar estados por nome
                setStatesList(sortedStates)
            })
            .catch(error => console.error('Erro ao buscar estados:', error));
    }, []);
    
    const handleChange = (field, value) => {
        let newValue = value;

        if (field === "documentNumber") {
            newValue = value.replace(/\D/gim, '')
            if (newValue?.length === 11) {
                newValue = cpfMask(newValue)
            }
            if (newValue?.length === 14) {
                newValue = cnpjMask(newValue)
            }
        }
        if (field === "phone") {
            newValue = value.replace(/\D/gim, '')
            if (newValue?.length >= 10) {
                newValue = phoneMask(newValue)
            }
        }
        if (field === 'addressZipCode') {
            newValue = value.replace(/\D/gim, '')
            if (newValue?.length === 8) {
                newValue = cepMask(newValue)
            }
        }

        setFormData(prev => ({
            ...prev,
            [field]: newValue
        }))
    }

    const fetchCities = async (uf) => {
        // Fazer a requisição para a API de cidades do IBGE
        if (uf) {
            let cities = null;

            await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
                .then(response => {
                    cities = response.data
                    setCitiesList(cities?.map(item => item.nome))
                })
                .catch(error => {
                    console.error('Erro ao buscar cidades:', error)
                });

            return cities; 
        } else {
            setCitiesList([]);
            return false;
        }
    }

    const handleStateChange = async (value) => {
        const uf = value;

        handleChange("addressState", uf)

        const cities = await fetchCities(uf)

        if (cities) {
            handleChange("addressCity", cities?.[0]?.nome)
        }
    };

    const handleChangeCep = async (cep) => {
        handleChange("addressZipCode", cepMask(cep))

        if (cep) {
            const cleanedCep = cep.replace(/\D/g, '');
        
            if (cleanedCep?.length === 8) {
                try {
                    const response = await axios.get(`https://viacep.com.br/ws/${cleanedCep}/json/`);
        
                    // se a API retornar erro, nao faz nada
                    if (response.data.erro) {
                        return;
                    }
        
                    const { logradouro, bairro, localidade, uf } = response.data;
        
                    // Atualiza os campos do formulário com os dados retornados
                    setFormData(prev => ({
                        ...prev,
                        addressStreet: logradouro || '',
                        addressDistrict: bairro || '',
                        addressCity: localidade || '',
                        addressState: uf || '',
                        addressNumber: '',
                        addressComplement: ''
                    }));
        
                    // Sincroniza a lista de cidades
                    fetchCities(uf);
                } catch (error) {
                    console.error('Erro ao buscar CEP:', error);
                }
            }
        }
    };    

    const handleChangePersonType = (value) => {
        if (formData?.personType) {
            handleChange("documentNumber", "")
        }
        handleChange("personType", value)
    }

    const areObjectsEqual = (obj1, obj2) => {
        if (!obj1 || !obj2) return false; // Verifica se os objetos existem
    
        // Compara todas as propriedades dos dois objetos
        return Object.keys(obj1).every(key => obj1[key] === obj2[key]);
    };
    
    const isButtonDisabled = client && areObjectsEqual(client, formData);

    const handleSubmit = (e) => {
        e.preventDefault()

        setError("")

        const requiredFields = ['name', 'documentNumber', 'email', 'phone', 'personType', 'addressZipCode', 'addressStreet', 'addressDistrict', 'addressCity', 'addressState']

        for (const field of requiredFields) {
            if (!formData[field]) {
                setError("Campos obrigatórios não preenchidos")
                return false
            }
        }

        if (!validateEmail(formData?.email)) {
            setError("Formato de e-mail inválido")
            return false
        }
        if (!validateCpfCnpj(formData?.documentNumber?.replace(/\D/gim, ''))) {
            setError("CPF/CNPJ inválido.")
            return false
        }
        if (!validatePhoneNumber(formData?.phone)) {
            setError("Número de telefone inválido.")
            return false
        }
        if (!validateCEP(formData?.addressZipCode)) {
            setError("CEP inválido.")
            return false
        }
        if (formData?.personType === 'Física' && formData?.documentNumber?.replace(/\D/gim, '')?.length !== 11) {
            setError("CPF inválido.")
            return false
        }
        if (formData?.personType === 'Jurídica' && formData?.documentNumber?.replace(/\D/gim, '')?.length !== 14) {
            setError("CNPJ inválido.")
            return false
        }

        const data = {
            name: formData?.name,
            documentNumber: formData?.documentNumber?.replace(/\D/gim, ''),
            email: formData?.email,
            phone: formData?.phone?.replace(/\D/gim, ''),
            personType: formData?.personType,
            status: formData?.status?.toLowerCase(),
            addressZipCode: formData?.addressZipCode,
            addressStreet: formData?.addressStreet,
            addressNumber: formData?.addressNumber?.replace(/\D/gim, ''),
            addressComplement: formData?.addressComplement,
            addressDistrict: formData?.addressDistrict,
            addressCity: formData?.addressCity,
            addressState: formData?.addressState
        }

        onSubmit(data)
    }

    return (
        <Form onSubmit={handleSubmit} className="client-form">
            <div className="inline-form-group">
                <FormGroup className="form-group">
                    <Label for="name">
                        <small>*</small>{" "}
                        Nome:
                    </Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData?.name}
                        onChange={e => handleChange("name", e.target.value)}
                        placeholder="Digite"
                        required
                    />
                </FormGroup>
                <FormGroup className="form-group">
                    <Label for="personType">
                        <small>*</small>{" "}
                        Pessoa:
                    </Label>
                    <Select
                        id="personType"
                        name="personType"
                        value={formData?.personType ? {value: formData?.personType, label: formData?.personType} : ''}
                        onChange={event => handleChangePersonType(event?.value)}
                        options={["Física", "Jurídica"].map(item => ({ value: item, label: item }))}
                        placeholder='Selecione'
                        required
                    />
                </FormGroup>
            </div>
            <div className="inline-form-group">
                <FormGroup className="form-group">
                    <Label for="email">
                        <small>*</small>{" "}
                        E-mail:
                    </Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData?.email}
                        onChange={e => handleChange("email", e.target.value)}
                        placeholder="Digite"
                        required
                    />
                </FormGroup>
                <FormGroup className="form-group">
                    <Label for="phone">
                        <small>*</small>{" "}
                        Contato:
                    </Label>
                    <Input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData?.phone}
                        onChange={e => handleChange("phone", e.target.value)}
                        maxLength={15}
                        minLength={10}
                        placeholder="Digite"
                        required
                    />
                </FormGroup>
            </div>
            <div className="inline-form-group">
                <FormGroup className="form-group">
                    <Label for="documentNumber">
                        <small>*</small>{" "}
                        CPF/CNPJ:
                    </Label>
                    <Input
                        type="text"
                        id="documentNumber"
                        name="documentNumber"
                        value={formData?.documentNumber ? documentMask(formData?.documentNumber) : ''}
                        onChange={e => handleChange("documentNumber", e.target.value)}
                        placeholder="Digite"
                        maxLength={18}
                        required
                    />
                </FormGroup>
                <FormGroup className="form-group">
                    <Label for="status">
                        Status:
                    </Label>
                    <Select
                        id="status"
                        name="status"
                        value={formData?.status ? {value: formData?.status, label: formData?.status} : ''}
                        onChange={event => handleChange("status", event?.value)}
                        options={["Ativo", "Inativo"].map(item => ({ value: item, label: item }))}
                        placeholder='Selecione'
                        className="w-100"
                    />
                </FormGroup>
            </div>
            <FormGroup className="form-group">
                <Label for="addressStreet">
                    <small>*</small>{" "}
                    CEP:
                </Label>
                <Input
                    type="text"
                    id="addressZipCode"
                    name="addressZipCode"
                    value={formData?.addressZipCode ? cepMask(formData.addressZipCode) : ''}
                    onChange={e => handleChangeCep(e.target.value)}
                    placeholder="Digite"
                    required
                />
            </FormGroup>
            <div className="inline-form-group">
                <FormGroup className="form-group">
                    <Label for="addressStreet">
                        <small>*</small>{" "}
                        Rua:
                    </Label>
                    <Input
                        type="text"
                        id="addressStreet"
                        name="addressStreet"
                        value={formData?.addressStreet}
                        onChange={e => handleChange("addressStreet", e.target.value)}
                        placeholder="Digite"
                        required
                    />
                </FormGroup>
                <FormGroup className="form-group">
                    <Label for="addressNumber">
                        Número:
                    </Label>
                    <Input
                        type="text"
                        id="addressNumber"
                        name="addressNumber"
                        value={formData?.addressNumber}
                        onChange={e => handleChange("addressNumber", e.target.value)}
                        placeholder="Digite"
                    />
                </FormGroup>
            </div>
            <div className="inline-form-group">
                <FormGroup className="form-group">
                    <Label for="addressComplement">
                        Complemento (opcional):
                    </Label>
                    <Input
                        type="text"
                        id="addressComplement"
                        name="addressComplement"
                        value={formData?.addressComplement}
                        onChange={e => handleChange("addressComplement", e.target.value)}
                        placeholder="Digite"
                    />
                </FormGroup>
                <FormGroup className="form-group">
                    <Label for="addressDistrict">
                        <small>*</small>{" "}
                        Bairro:
                    </Label>
                    <Input
                        type="text"
                        id="addressDistrict"
                        name="addressDistrict"
                        value={formData?.addressDistrict}
                        onChange={e => handleChange("addressDistrict", e.target.value)}
                        placeholder="Digite"
                        required
                    />
                </FormGroup>
            </div>
            <div className="inline-form-group">
                <FormGroup className="form-group">
                    <Label for="addressState">
                        <small>*</small>{" "}
                        Estado:
                    </Label>
                    <Select
                        id="addressState"
                        name="addressState"
                        value={formData?.addressState ? {value: formData?.addressState, label: statesList.find(es => es.sigla === formData?.addressState)?.nome} : ''}
                        onChange={event => handleStateChange(event?.value)}
                        options={statesList.map(item => ({ value: item.sigla, label: item.nome }))}
                        placeholder='Selecione'
                        className="w-100"
                        required
                    />
                </FormGroup>
                <FormGroup className="form-group">
                    <Label for="addressCity">
                        <small>*</small>{" "}
                        Cidade:
                    </Label>
                    <Select
                        id="addressCity"
                        name="addressCity"
                        value={formData?.addressCity ? {value: formData?.addressCity, label: formData?.addressCity} : ''}
                        onChange={event => handleChange("addressCity", event?.value)}
                        options={citiesList?.map(item => ({ value: item, label: item }))}
                        placeholder='Selecione'
                        className="w-100"
                        required
                    />
                </FormGroup>
            </div>
            {error && (
                <i style={{color: 'red', margin: '0 2px'}}>{error}</i>
            )}
            <div style={{display: "flex", justifyContent: 'flex-end', marginTop: '1rem'}}>
                <Button className="flat-danger" style={{marginRight: '0.5rem'}} onClick={toggle}>
                    Cancelar
                </Button>
                <Button className="primary" type="submit" disabled={isButtonDisabled}>
                    <Save size={16} style={{marginTop: '-4px'}} />{" "}
                    Salvar
                </Button>
            </div>
        </Form>
    )
}

export default ClientForm