import axios from 'axios'
import { toast } from 'react-toastify'
import { getToken } from '../../../router/auth'

export const login = ({ data, remember, setErrors }) => {
  return async dispatch => {
    try {
      const config = {
        method: 'POST',
        url: `${process.env.REACT_APP_BACKEND_URL}login`,
        headers: {
          'Content-Type': 'application/json',
          token : `Bearer ${getToken()}`
        },
        data
      }

      const response = await axios(config)
      const userData = response.data.userData

      sessionStorage.setItem("userData", JSON.stringify(userData))
      toast.success(`Olá, ${userData.name}!`)

      if (remember) {
        localStorage.setItem("userData", JSON.stringify(userData))
      }

      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        userData 
      });

    } catch (error) {
      console.log("🚀 ~ login ~ error:", error)
      const errorStatus = error.response.status
      if (errorStatus === 401) {
        if (setErrors) {
          setErrors(prev => ({ ...prev, auth: 'E-mail ou senha inválidos.'}))
        } else {
          toast.error("E-mail ou senha inválidos.")
        };
      } else {
        toast.error("Erro na autenticação.")
      }
    }
  }
}

export const logout = () => {
  return async dispatch => {
    try {
      dispatch({ type: 'LOGOUT'})
      window.location.href = "/login"
    } catch (error) {
      console.log("🚀 ~ logout ~ error:", error)
    }
  }
}

export const checkSession = (userData) => {
  return async dispatch => {
    try {
      const config = {
        method: 'GET',
        url: `${process.env.REACT_APP_BACKEND_URL}check-session`,
        headers: {
          'Content-Type': 'application/json',
          token: `Bearer ${userData.token}`
        }
      };

      const response = await axios(config);

      if (response.status === 200) {
        dispatch({ 
          type: 'LOGIN_SUCCESS', 
          userData 
        });
      } else {
        dispatch({ type: 'LOGOUT' });
        toast.error('Sessão expirada. Faça login novamente.');
        // Redireciona pro login
        window.location.href = '/login';
      }
    } catch (error) {
      // Erro ao validar sessão, limpa os dados de autenticação
      dispatch({ type: 'LOGOUT' });
      window.location.href = "/login"
      toast.error('Erro na validação da sessão. Por favor, faça login novamente.');
    }
  };
};

export const registerUser = (data) => {
    return async dispatch => {
      try {
        const config = {
          method: 'POST',
          url: `${process.env.REACT_APP_BACKEND_URL}user/register`,
          headers: {
            'Content-Type': 'application/json',
            token : `Bearer ${getToken()}`
          },
          data
        }
  
        await axios(config)
        toast.success("Usuário cadastrado com sucesso!")

        dispatch({
          type: 'REGISTER',
          payload: true
        })
      } catch (error) {
        console.log("🚀 ~ registerUser ~ error:", error)
        const msgError = error?.response?.data?.error
        if (msgError) {
          toast.error(msgError)
        } else {
          toast.error("Erro ao cadastrar usuário.")
        }
      }
    }
}

export const changeRegisteredUser = (payload) => ({
  type: 'REGISTER',
  payload
})

export const resetPassword = (data) => {
    return async dispatch => {
      try {
        const config = {
          method: 'POST',
          url: `${process.env.REACT_APP_BACKEND_URL}user/reset-password`,
          headers: {
            'Content-Type': 'application/json',
            token : `Bearer ${getToken()}`
          },
          data
        }
  
        const response = await axios(config)
        console.log("🚀 ~ resetPassword ~ response:", response.data)
      
      } catch (error) {
        console.log("🚀 ~ resetPassword ~ error:", error)
      }
    }
}