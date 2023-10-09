'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function AuthForm() {
  const supabase = createClientComponentClient();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async () => {
    try {
      setError('');
      const { data, error } = await supabase.auth.signUp({
        email: login,
        password: password,
      });
      if (error) {
        setError(error.message);
      }
      if (data) {
        router.push('/cms');
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      providers={[]}
      redirectTo="http://localhost:3000/auth/callback"
    />
    // <form className="flex flex-col gap-4">
    //   <div className="form-control w-full">
    //     <label className="label">
    //       <span className="label-text">Email</span>
    //     </label>
    //     <input
    //       type="email"
    //       autoComplete="email"
    //       className="input input-bordered w-full"
    //       value={login}
    //       onChange={(e) => setLogin(e.target.value)}
    //     />
    //   </div>
    //   <div className="form-control w-full">
    //     <label className="label">
    //       <span className="label-text">Password</span>
    //     </label>
    //     <input
    //       type="password"
    //       autoComplete="password"
    //       className="input input-bordered w-full"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //   </div>
    //   {!!error && <p>{error}</p>}
    //   <button type="button" className="btn btn-primary" onClick={handleLogin}>
    //     login
    //   </button>
    // </form>
  );
}
