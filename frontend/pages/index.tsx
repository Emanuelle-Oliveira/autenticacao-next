import {useState} from 'react';
import {useRouter} from 'next/router';

export default function HomeScreen() {
  const router = useRouter();
  
  const [values, setValues] = useState({
    user: 'manu',
    password: '12345'
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
        event.preventDefault();
        router.push('/auth-page-static');
        //router.push('/auth-page-ssr');
      }
      }>
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
      </form>
    </div>
  );
}
