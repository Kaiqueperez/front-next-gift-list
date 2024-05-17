import { validateName } from '.'
describe('ValidName function', () => {
  it('Should return error message whem recieve invalid names', () => {
    expect(validateName('Jose saga23')).toStrictEqual(
      'Permitido somente letras'
    )
    expect(validateName('<Jose> saga23')).toStrictEqual(
      'Permitido somente letras'
    )
    expect(validateName('Jose silva 2')).toStrictEqual(
      'Permitido somente letras'
    )
    expect(validateName('Jose @')).toStrictEqual('Permitido somente letras')
    expect(validateName('Jose _)')).toStrictEqual('Permitido somente letras')
  })

  it('Should return empty message whem recieve valid names', () => {
    expect(validateName('Jose')).toStrictEqual('')
    expect(validateName('Da silva Amâncio')).toStrictEqual('')
  })
})
