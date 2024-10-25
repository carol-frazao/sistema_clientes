import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** Actions & Store
import { changeRegisteredUser, registerUser } from '../../redux/actions/auth';

// ** Third part components
import { Alert, Button, Form, FormGroup, Input } from 'reactstrap'
import { FaUser } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { ChevronLeft, X } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { MdOutlineAlternateEmail } from "react-icons/md";

const CreateAccount = () => {
    // ** States
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const registeredUser = useSelector(state => state.auth.registeredUser)

    // ** Functions
    const handleSubmit = (e) => {
        e.preventDefault()

        setErrors({})
        let emptyFields = {}

        if (!name) {
            emptyFields.name = 'Campo obrigatório'
        } else if (!email) {
            emptyFields.email = 'Campo obrigatório'
        } else if (!password) {
            emptyFields.password = 'Campo obrigatório'
        } else if (!confirmPassword) {
            emptyFields.confirmPassword = 'Campo obrigatório'
        } else if (password !== confirmPassword) {
            emptyFields.confirmPassword = 'As senhas não coincidem'
        }

        if (Object.keys(emptyFields)?.length > 0) {
            setErrors(emptyFields)
            return false
        }

        const data = {
            name,
            email,
            password
        }

        dispatch(registerUser(data))
    }

    const handleGoLogin = () => {
        navigate("/login")
    }

    // reseta a store ao montar o componente
    useEffect(() => {
        dispatch(changeRegisteredUser(false))
    }, [dispatch])

    useEffect(() => {
        if (registeredUser) {
            setName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")

            setTimeout(() => dispatch(changeRegisteredUser(false)), 10000)
        }
    }, [registeredUser])

    return (
        <div className="login">
            <div className='form-container'>
                <h1>Registrar</h1>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className='form-group'>
                        <div className='input-elements'>
                            <Input
                                className='input-text'
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder='Nome'
                                required
                            />
                            <FaUser size={18} />     
                        </div>
                        {errors?.name && (
                            <div className='alerta'>
                                <i>{errors.name}</i>
                            </div>
                        )}
                    </FormGroup>
                    <FormGroup className='form-group'>
                        <div className='input-elements'>
                            <Input
                                className='input-text'
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder='E-mail'
                                required
                            />
                            <MdOutlineAlternateEmail size={18} />     
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
                                type={!showPassword ? 'password' : 'text'}
                                id="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder='Senha'
                                required
                            />
                            {showPassword ? (
                                <IoMdEye size={20} className='linked-item' onClick={() => setShowPassword(false)} />
                            ) : (
                                <IoMdEyeOff size={20} className='linked-item' onClick={() => setShowPassword(true)} />
                            )}
                        </div>
                        {errors?.password && (
                            <div className='alerta'>
                                <i>{errors.password}</i>
                            </div>
                        )}
                    </FormGroup>
                    <FormGroup className='form-group'>
                        <div className='input-elements'>
                            <Input
                                className='input-text'
                                type={!showConfirmPassword ? 'password' : 'text'}
                                id="confirm-password"
                                name="confirm-password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder='Confirme a senha'
                                required
                            />
                            {showConfirmPassword ? (
                                <IoMdEye size={20} className='linked-item' onClick={() => setShowConfirmPassword(false)} />
                            ) : (
                                <IoMdEyeOff size={20} className='linked-item' onClick={() => setShowConfirmPassword(true)} />
                            )}
                        </div>
                        {errors?.confirmPassword && (
                            <div className='alerta'>
                                <i>{errors.confirmPassword}</i>
                            </div>
                        )}
                    </FormGroup>
                    <Button className='btn-login' type="submit">
                        Criar conta
                    </Button>
                </Form>

                {registeredUser && (
                    <Alert color="success" className='success'>
                        Conta criada. Retorne ao login.
                    </Alert>
                )}
            </div>
            <Button className="primary btn-go-to-login" onClick={handleGoLogin}>
                <ChevronLeft size={18} />
                Voltar para o login
            </Button>
        </div>
    )
}

export default CreateAccount