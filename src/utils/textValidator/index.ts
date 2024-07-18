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

export const shortGiftName = (name: string) => {
  const MAX_LENGTH = 18
  return name.length > MAX_LENGTH ? name.substring(0, MAX_LENGTH) + '...' : name
}
