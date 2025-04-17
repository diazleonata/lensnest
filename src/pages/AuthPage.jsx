// src/pages/AuthPage.jsx

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';


const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    // Try logging in first
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });

    if (!loginError) {
      // success, user exists
      setLoading(false);
      console.log('Logged in!');
      return;
    }

    // If login failed, try to register
    const { error: signUpError } = await supabase.auth.signUp({ email, password });

    if (!signUpError) {
      setLoading(false);
      console.log('Registered and logged in!');
      return;
    }

    // If both fail
    setLoading(false);
    setErrorMsg(signUpError.message);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <form
        onSubmit={handleAuth}
        className="bg-[#111] p-8 rounded-xl shadow-xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Welcome to <span className="text-white font-bold">LensNest</span></h2>

        <label className="block mb-2">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded bg-[#222] text-white border border-gray-700 focus:outline-none focus:ring"
          required
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded bg-[#222] text-white border border-gray-700 focus:outline-none focus:ring"
          required
        />

        {errorMsg && <p className="text-red-500 text-sm mb-4">{errorMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black py-2 px-4 rounded hover:bg-gray-300 transition duration-300"
        >
          {loading ? 'Loading...' : 'Continue'}
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
