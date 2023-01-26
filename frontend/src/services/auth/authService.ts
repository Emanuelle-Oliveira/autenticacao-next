import {HttpClient} from '../../infra/HttpClient/httpClient';
import {tokenService} from './tokenService';

export const authService = {
  async login({ username, password }) {
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
      method: 'POST',
      body: {
        username,
        password
      }
    })
      .then(async (response) => {
        if(!response.ok) {
          throw new Error('Usuário ou senha inválido');
        }
        const body = await response.body;
        console.log(body);
        
        tokenService.save(body.data.access_token);
      });
  }
};