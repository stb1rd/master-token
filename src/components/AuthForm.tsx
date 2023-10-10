'use client';
import { useState } from 'react';

const AuthForm = ({ children }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isAuth, setIsAuth] = useState(false);

  const handleAuth = async () => {
    setError('');
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        resolve();
      }, 2000)
    );
    if (login === process.env.NEXT_PUBLIC_AMIN_LOGIN && password === process.env.NEXT_PUBLIC_AMIN_PASSWORD) {
      setIsAuth(true);
    } else {
      setError('invalid login or password');
    }
  };

  if (!isAuth) {
    return (
      // <Auth
      //   supabaseClient={supabase}
      //   view="magic_link"
      //   appearance={{ theme: ThemeSupa }}
      //   theme="dark"
      //   showLinks={false}
      //   providers={[]}
      //   redirectTo="http://localhost:3000/auth/callback"
      // />
      <form className="flex flex-col gap-4 max-w-md mx-auto">
        <h1>CMS login</h1>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            autoComplete="email"
            className="input input-bordered w-full"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            autoComplete="password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!!error && <p>{error}</p>}
        <button type="button" className="btn btn-primary" onClick={() => handleAuth()}>
          login
        </button>
      </form>
    );
  }

  return children;
};

export default AuthForm;
