import {useState} from 'react';
import {useRouter} from 'next/router';
import {authService} from '../src/services/auth/authService';
import Link from 'next/link';

export default function HomeScreen() {
  const router = useRouter();
  
  const [values, setValues] = useState({
    user: 'omariosouto',
    password: 'safepassword'
  });
 
  function handleChange(event) {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue,
      };
    });
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(event) => {
        // onSubmit -> Controller
        event.preventDefault();
        // Service -> Lógica de negócio
        // Para fazer o login:
        authService.login({
          username: values.user,
          password: values.password
        })
          .then(() => {
            router.push('/auth-page-static');
            //router.push('/auth-page-ssr');
          })
          .catch(() => {
            alert('Usuário ou senha inválido');
          });
       
      }}>
        <input
          placeholder="Usuário" name="user"
          value={values.user} onChange={handleChange}
        />
        <input
          placeholder="Senha" name="password" type="password"
          value={values.password} onChange={handleChange}
        />
        <pre>
          {JSON.stringify(values, null, 2)}
        </pre>
        <div>
          <button>
            Entrar
          </button>
        </div>
        <p>
          <Link href="/auth-page-ssr">
            auth-page-ssr
          </Link>
        </p>
        <p>
          <Link href="/auth-page-static">
            auth-page-static
          </Link>
        </p>
      </form>
    </div>
  );
}
