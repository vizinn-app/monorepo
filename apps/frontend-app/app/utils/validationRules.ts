export const emailValidationRules = {
  required: "Este campo é obrigatório",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Email inválido",
  },
}

export const nameValidationRules = {
  required: "Este campo é obrigatório",
}

export const cpfValidationRules = {
  required: "Este campo é obrigatório",
  minLength: {
    value: 11,
    message: "CPF deve ter 11 dígitos",
  },
}

export const phoneValidationRules = {
  required: "Este campo é obrigatório",
  minLength: {
    value: 10,
    message: "Telefone deve ter pelo menos 10 dígitos (com DDD)",
  },
}

export const verificationCodeRules = {
  required: "Este campo é obrigatório",
}

export const searchValidationRules = {
  required: "Este campo é obrigatório",
}
