import { regexHelper } from '../regexHelper'

export const validateName = (personName: string) => {
  const isValidName = regexHelper.validName.test(personName)

  const errorMessage = isValidName
    ? ''
    : personName.length
    ? 'Permitido somente letras'
    : ''

  return errorMessage
}
