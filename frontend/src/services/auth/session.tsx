import {authService} from './authService';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

// SSR
export function withSession(receivedFunction) {
  return async (context) => {
    try {
      // Busca a sessão
      const session = await authService.getSession(context);
      // Contexto atualizado
      const modifiedContext = {
        ...context,
        req: {
          ...context.req,
          session
        }
      };
      return receivedFunction(modifiedContext);
    } catch (error) { // Se não está autorizado, redireciona
      return {
        redirect: {
          permanent: false,
          destination: '/?error=401'
        }
      };
    }
  };
}

function useSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    authService.getSession()
      .then((response) => {
        setSession(response);
        console.log(response);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  return {
    data: {
      session
    },
    error,
    loading
  };
}

// Static
// HOC = High Order Component
export function withSessionHOC(Component) {
  return function Wrapper(props) {
    const session = useSession();
    const router = useRouter();

    if(!session.loading && session.error) {
      router.push('/?error=401');
    }

    const modifiedProps = {
      ...props,
      session: session.data.session
    };

    return (
      <Component {...modifiedProps}/>
    );
  };
}
