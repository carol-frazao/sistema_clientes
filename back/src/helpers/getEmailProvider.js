function getEmailProvider(email) {
    // Verifica se o e-mail contém um '@' e um '.'
    if (!email.includes('@') || !email.includes('.')) {
      return 'E-mail inválido';
    }
  
    // Extrai o domínio (a parte após o '@')
    const domain = email.split('@')[1]; 
    
    // Extrai o provedor (a parte antes do primeiro '.' no domínio)
    const provider = domain.split('.')[0];
    
    return provider;
}

export default getEmailProvider