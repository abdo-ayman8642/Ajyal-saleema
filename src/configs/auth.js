import { baseUrl } from './baseUrl'

const bearer = 'Bearer'

export default {
  meEndpoint: `${baseUrl}getUserData`,
  loginEndpoint: `${baseUrl}login`,
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken'
}
