import { Alert, Button, Form, FormGroup, Input } from "reactstrap"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { IoMdEye, IoMdEyeOff } from "react-icons/io"
import { ChevronLeft } from "react-feather"
import axios from "axios"
import { toast } from "react-toastify"

const ResetPasswordPage = () => {
    // ** States
    const [email, setEmail] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        setErrors({})
        let emptyFields = {}

        if (!email) {
            emptyFields.email = 'Campo obrigatório'
        } else if (!oldPassword) {
            emptyFields.oldPassword = 'Campo obrigatório'
        } else if (!newPassword) {
            emptyFields.newPassword = 'Campo obrigatório'
        } else if (oldPassword?.trim() === newPassword?.trim()) {
            emptyFields.newPassword = 'A senha atual deve ser diferente da anterior.'
        }

        if (Object.keys(emptyFields)?.length > 0) {
            setErrors(emptyFields)
            return false
        }

        let token;

        const oldCredentials = { email, password: oldPassword }
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}login`, oldCredentials)
            .then(response => {
                const data = response.data
                if (data.userData) {
                    token = data.userData.token
                }
            })
            .catch(error => {
                console.error('Erro ao validar credenciais:', error)
                if (error.status === 401) {
                    toast.error("E-mail ou senha atual incorretos.")
                }
            });

        if (token) {
            const newCredentials = { token, password: newPassword }
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}user/reset-password`, newCredentials)
                .then(response => {
                    if (response.status === 200) {
                        toast.success("Senha alterada com sucesso!")
                        setOldPassword("");
                        setNewPassword("");
                        setErrors("");
                    }
                })
                .catch(error => {
                    console.error('Erro ao validar credenciais:', error)
                    toast.error("Erro ao redefinir senha.")
                });
        }  
    }

    const handleGoBack = () => {
        navigate("/")
    }

    return (
        <div className="reset-password-page">
            <div className='form-container'>
                <h1>Redefinir senha</h1>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className='form-group'>
                        <div className='input-elements'>
                            <Input
                                className='input-text'
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder='Confirme seu e-mail'
                                required
                            />
                            <FaUser size={18} />     
                        </div>
                        {errors?.email && (
                            <div className='alerta'>
                                <i>{errors.email}</i>
                            </div>
                        )}
                    </FormGroup>
                    <FormGroup className='form-group'>
                        <div className='input-elements'>
                            <Input
                                className='input-text'
                                type={!showOldPassword ? 'password' : 'text'}
                                id="old-password"
                                name="old-password"
                                value={oldPassword}
                                onChange={e => setOldPassword(e.target.value)}
                                placeholder='Senha atual'
                                required
                            />
                            {showOldPassword ? (
                                <IoMdEye size={20} className='linked-item' onClick={() => setShowOldPassword(false)} />
                            ) : (
                                <IoMdEyeOff size={20} className='linked-item' onClick={() => setShowOldPassword(true)} />
                            )}
                        </div>
                        {errors?.oldPassword && (
                            <div className='alerta'>
                                <i>{errors.oldPassword}</i>
                            </div>
                        )}
                    </FormGroup>
                    <FormGroup className='form-group'>
                        <div className='input-elements'>
                            <Input
                                className='input-text'
                                type={!showNewPassword ? 'password' : 'text'}
                                id="new-password"
                                name="new-password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                placeholder='Nova senha'
                                required
                            />
                            {showNewPassword ? (
                                <IoMdEye size={20} className='linked-item' onClick={() => setShowNewPassword(false)} />
                            ) : (
                                <IoMdEyeOff size={20} className='linked-item' onClick={() => setShowNewPassword(true)} />
                            )}
                        </div>
                        {errors?.newPassword && (
                            <div className='alerta'>
                                <i>{errors.newPassword}</i>
                            </div>
                        )}
                    </FormGroup>
                    <Button className='btn-login' type="submit">
                        Redefinir
                    </Button>
                    {errors?.auth && (
                        <Alert 
                            color="warning"
                            style={{ 
                                padding: '0.20rem 1rem', 
                                fontSize: '14px', 
                                color: '#db3535', 
                                margin: '1rem 0 -0.5rem', 
                                borderRadius: '30px'
                            }}
                        >
                            <strong><i>{errors.auth}</i></strong>
                        </Alert>
                    )}
                </Form>
            </div>
            <Button className="primary btn-go-back" onClick={handleGoBack}>
                <ChevronLeft size={18} />
                Voltar para o início
            </Button>
        </div>
    )
}

export default ResetPasswordPage