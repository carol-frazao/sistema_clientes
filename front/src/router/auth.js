export const isAuthenticated = () => {
  const userData = sessionStorage.getItem('userData') || localStorage.getItem('userData');
  
  if (!userData) return false;

  try {
    const parsedUserData = JSON.parse(userData);
    // Verifica se o token existe e se não está expirado (lógica local)
    return parsedUserData && parsedUserData.token ? true : false;
  } catch (error) {
    return false;
  }
};

export const getToken = () => {
  const userData = sessionStorage.getItem("userData") || localStorage.getItem("userData")
  const token = JSON.parse(userData)?.token

  if (token) {
      return token
  } else {
      return null
  }
}

export const getUserData = () => {
  const data = localStorage.getItem("userData") || sessionStorage.getItem("userData")
  const userData = JSON.parse(data)

  if (userData) {
      return userData
  } else {
      return null
  }
}