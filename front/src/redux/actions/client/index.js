import axios from 'axios'
import { getToken } from '../../../router/auth'
import { toast } from 'react-toastify'

export const getClients = () => {
  return async dispatch => {
    try {
      const config = {
        method: 'GET',
        url: `${process.env.REACT_APP_BACKEND_URL}client`,
        headers: {
          'Content-Type': 'application/json',
          token : `Bearer ${getToken()}`
        }
      }

      const response = await axios(config)

      dispatch({
        type: 'GET_CLIENTS',
        clients: response.data
      })
    
    } catch (error) {
      console.log("🚀 ~ getClients ~ error:", error)
    }
  }
}

export const changeUpdatedClient = (payload) => ({
  type: 'UPDATE_CLIENT',
  payload
})

export const changeCreatedClient = (payload) => ({
  type: 'CREATE_CLIENT',
  payload
})

export const createClient = (data) => {
    return async dispatch => {
      try {
        const config = {
          method: 'POST',
          url: `${process.env.REACT_APP_BACKEND_URL}client/create`,
          headers: {
            'Content-Type': 'application/json',
            token : `Bearer ${getToken()}`
          },
          data
        }
  
        await axios(config)
        await dispatch(getClients())

        dispatch({
          type: 'CREATE_CLIENT',
          payload: true
        })

        toast.success(`Cliente adicionado com sucesso.`)
      
      } catch (error) {
        console.log("🚀 ~ registerUser ~ error aqui:", error)
        const msgError = error?.response?.data?.error
        console.log("🚀 ~ createClient ~ msgError:", msgError)
        if (msgError) {
          toast.error(msgError)
        } else {
          toast.error("Erro ao registrar cliente.")
        }
      }
    }
}

export const updateClient = (clientId, data) => {
    return async dispatch => {
      try {
        const config = {
          method: 'PUT',
          url: `${process.env.REACT_APP_BACKEND_URL}client/update/${clientId}`,
          headers: {
            'Content-Type': 'application/json',
            token : `Bearer ${getToken()}`
          },
          data
        }
  
        await axios(config)
        await dispatch(getClients())

        dispatch({
          type: 'UPDATE_CLIENT',
          payload: true
        })

        toast.success("Dados atualizados com sucesso.")

      } catch (error) {
        console.log("🚀 ~ updateClient ~ error:", error)
        const msgError = error?.response?.data?.error
        if (msgError) {
          toast.error(msgError)
        } else {
          toast.error("Erro ao atualizar dados do cliente.")
        }
      }
    }
}

export const deleteClient = (clientId) => {
    return async dispatch => {
      try {
        const config = {
          method: 'DELETE',
          url: `${process.env.REACT_APP_BACKEND_URL}client/delete/${clientId}`,
          headers: {
            'Content-Type': 'application/json',
            token : `Bearer ${getToken()}`
          }
        }
  
        await axios(config)
        await dispatch(getClients())
        toast.success("Cliente deletado com sucesso.")
      
      } catch (error) {
        console.log("🚀 ~ deleteClient ~ error:", error)
        toast.error("Erro ao deletar cliente.")
      }
    }
}