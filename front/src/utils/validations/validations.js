export function validateCEP(cep) {
    if (cep) {
        const cepRegex = /^\d{5}-?\d{3}$/;
        return cepRegex.test(cep);
    }
}

export function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export function validatePhoneNumber(phoneNumber) {
    if (phoneNumber) {
        const cleanedNumber = phoneNumber.replace(/\D/g, '');
        const phoneRegex = /^\d{2}(9\d{8}|\d{8})$/;
        return phoneRegex.test(cleanedNumber);
    }
}

export const validateCpfCnpj = (documentNumber) => {
    documentNumber = documentNumber.replace(/[^\d]+/g, '')

    function validaCnpj(cnpj) {
        while (cnpj.length < 14) cnpj = `0${cnpj}`

        if (cnpj === '') return false

        if (cnpj.length !== 14) return false

        // Elimina cnpjs invalidos conhecidos
        if (cnpj === "00000000000000" ||
          cnpj === "11111111111111" ||
          cnpj === "22222222222222" ||
          cnpj === "33333333333333" ||
          cnpj === "44444444444444" ||
          cnpj === "55555555555555" ||
          cnpj === "66666666666666" ||
          cnpj === "77777777777777" ||
          cnpj === "88888888888888" ||
          cnpj === "99999999999999") return false

        // Valida DVs
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0, tamanho)
        const digitos = cnpj.substring(tamanho)
        let soma = 0
        let pos = tamanho - 7

        for (let i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--
          if (pos < 2) pos = 9
        }

        let resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11)
        // eslint-disable-next-line
        if (resultado != digitos.charAt(0)) return false

        tamanho = tamanho + 1
        numeros = cnpj.substring(0, tamanho)
        soma = 0
        pos = tamanho - 7

        for (let i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--
          if (pos < 2) pos = 9
        }

        resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11)
        // eslint-disable-next-line
        if (resultado != digitos.charAt(1)) return false

        return true
    }

    function validaCpf(cpf) {
        const multiply = (multiplier, array, sliceNum) => {
            array = array.slice(0, sliceNum)
            const sum = array.reduce((acum, curr) => {
                return (curr * multiplier--) + acum
            }, 0) % 11
            return (sum < 2) ? 0 : 11 - sum
        }

        const calculate = (cpf) => {
            if (cpf[9] === multiply(10, cpf, 9) && cpf[10] === multiply(11, cpf, 10)) return true
            else return false
        }

        while (cpf.length < 11 && cpf.length > 2) cpf = `0${cpf}`

        // eslint-disable-next-line
        Number.isInteger(cpf) ? cpf = cpf.toString() : false

        cpf = cpf.replace(/[^\d]+/g, '').split('').map(Number)

        return (cpf.length !== 11) || cpf.every((item) => item === cpf[0]) ? false : calculate(cpf)
    }

    if (documentNumber.length === 11) return validaCpf(documentNumber)
    else if (documentNumber.length === 14) return validaCnpj(documentNumber)
    else return false
}