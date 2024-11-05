export const cnpjMask = (value) => value?.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")

export const cpfMask = (value) => value?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

export const documentMask = (value) => {
    if (value) {
      value.replace(/\D/gim, '')

      if (value.length === 11) {
        return cpfMask(value)
      } 

      if (value.length === 14) {
        return cnpjMask(value)
      }

      return value
    }
}
  
export const cepMask = (value) => value?.replace(/\D/g, '')?.replace(/(\d{5})(\d)/, '$1-$2').replace(/(-\d{3})\d+?$/, '$1')

export const phoneMask = (value) => {

  const cellPhoneMask = (value) => value?.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  const telPhoneMask = (value) => value?.replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")    
  
  if (value) {
      let phoneNumber

      if (value.length === 11) {
          phoneNumber = cellPhoneMask(value)
      } else if (value.length === 10) {
          phoneNumber = telPhoneMask(value)
      } else {
          phoneNumber = value
      }    

      return phoneNumber
  }
}