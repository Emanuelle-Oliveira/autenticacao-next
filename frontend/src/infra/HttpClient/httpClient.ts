// Fetch especifico para nossa aplicação
// Arquitetura hexagonal
// Ports & Adapters
import {tokenService} from '../../services/auth/tokenService';
import nookies from 'nookies';

export async function HttpClient(fetchUrl, fetchOptions) {
  const options = {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers
    },
    // Converte o que no body para string
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null
  };
  
  return fetch(fetchUrl, options)
    .then(async (response) => {
      return {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        body: await response.json()
      };
    })
    .then(async (response) => {
      if(!fetchOptions.refresh)
        return response;
      if(response.status !== 401)
        return response;
      
      // Caso exista context, é server
      const isServer = Boolean(fetchOptions?.context);
      const currentRefreshToken = fetchOptions?.context?.req?.cookies['REFRESH_TOKEN_NAME'];
      
      console.log('Middleware: Rodar código para atualizar');
      // Tentar atualizar os tokens
      const refreshResponse = await HttpClient('http://localhost:3000/api/refresh', {
        method: isServer ? 'PUT' : 'GET',
        body: isServer ? {refresh_token: currentRefreshToken} : undefined
      });
     
      const newAccessToken = refreshResponse.body.data.access_token;
      const newRefreshToken = refreshResponse.body.data.refresh_token;

      if(isServer) {
        nookies.set(fetchOptions.context, 'REFRESH_TOKEN_NAME', newRefreshToken, {
          httpOnly: true,
          sameSite: 'lax',
          path: '/'
        });
      }
      
      // Guarda os tokens
      tokenService.save(newAccessToken);
      
      // Tentar rodar o request anterior
      const retryResponse = await HttpClient(fetchUrl, {
        ...options,
        refresh: false,
        headers: {
          'Authorization': `Bearer ${newAccessToken}`
        }
      });
      
      return retryResponse;
    });
}
