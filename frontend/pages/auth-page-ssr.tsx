import {tokenService} from '../src/services/auth/tokenService';
import nookies from 'nookies';

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  console.log(cookies);
  
  return {
    props: {
      token: tokenService.get(context)
    }
  };
}

export default function AuthPageSSR(props) {
  return(
    <div>
      <h1>
        Auth Page Server Side Render
      </h1>
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
}


