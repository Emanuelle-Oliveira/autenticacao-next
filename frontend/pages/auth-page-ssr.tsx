//import {tokenService} from '../src/services/auth/tokenService';
//import nookies from 'nookies';
//import {authService} from '../src/services/auth/authService';
import {withSession} from '../src/services/auth/session';

// Decorator Pattern
export const getServerSideProps = withSession((context) => { // Função como parâmetro
  return {
    props: {
      session: context.req.session
    }
  };
});
  
export default function AuthPageSSR(props) {
  return(
    <div>
      <h1>
          Auth Page Server Side Render
      </h1>
      <p>
        <a href="/logout">
          Logout
        </a>
      </p>
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
}
  
/*export async function getServerSideProps(context) {
  //const cookies = nookies.get(context);
  //console.log(cookies);
  //const token = tokenService.get(context);
  //console.log(token);
  try {
    const session = await authService.getSession(context);
    return {
      props: {
        session
      }
    };
  } catch (error) { // Se não está autorizado, redireciona
    return {
      redirect: {
        permanent: false,
        destination: '/?error=401'
      }
    };
  }
}*/


