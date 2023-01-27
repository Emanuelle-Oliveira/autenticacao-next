import {tokenService} from '../src/services/auth/tokenService';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {HttpClient} from '../src/infra/HttpClient/httpClient';

export default function LogoutPage() {
  const router = useRouter();
  
  useEffect(() => {
    try {
      HttpClient('/api/refresh', {
        method: 'DELETE'
      })
        .then(() => {
          tokenService.delete();
          router.push('/');
        });
    } catch (error) {
      alert(error.message);
    }
    
  }, []);
  
  return (
    <div>
      Você será redirecionado em instantes...
    </div>
  );
}
