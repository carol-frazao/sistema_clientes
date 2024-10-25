import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

// ** Actions & Store
import { login } from '../../redux/actions/auth';

// ** Third part components
import { Alert, Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { FaUser } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Login = () => {
    // ** States
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    // ** Functions
    const handleSubmit = (e) => {
        e.preventDefault()

        setErrors({})
        let emptyFields = {}

        if (!email) {
            emptyFields.email = 'Campo obrigatório'
        } else if (!password) {
            emptyFields.password = 'Campo obrigatório'
        }

        if (Object.keys(emptyFields)?.length > 0) {
            setErrors(emptyFields)
            return false
        }

        const data = {
            email,
            password
        }

        dispatch(login({ data, remember, setErrors }))
    }

    const handleForgotPassword = (e) => {
        e.preventDefault()
        alert('Desculpe, esta função ainda não está disponível.')
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated])

    return (
        <div className="login">
            <div className='form-container'>
                <h1>Autenticação</h1>
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
                                placeholder='E-mail'
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
                    <div className='session-options'>
                        <FormGroup check>
                            <Input className='input-checkbox' type="checkbox" onChange={(e) => setRemember(e.target.checked)} />
                            <Label check>
                                Lembrar de mim
                            </Label>
                        </FormGroup>
                        <Link to="/redefinir-senha" className='forgot-password-link link' onClick={handleForgotPassword}>
                            Esqueceu a senha?
                        </Link>
                    </div>
                    <Button className='btn-login' type="submit">
                        Entrar
                    </Button>
                    <Link to="/registrar" className='user-register-link link'>
                        Primeiro acesso?
                    </Link>
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
        </div>
    )
}

export default Login