import {useEffect, useState} from 'react';
import {authService} from '../src/services/auth/authService';
import {useRouter} from 'next/router';
import {withSessionHOC} from '../src/services/auth/session';
import Link from 'next/link';

function AuthPageStatic(props) {
  return(
    <div>
      <h1>
        Auth Page Static
      </h1>
      <p>
        <Link href="/logout">
          Logout
        </Link>
      </p>
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
}

export default withSessionHOC(AuthPageStatic);
