// import './AuthPage.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('authpage-root');
    return () => {
      document.body.classList.remove('authpage-root');
    };
  }, []);

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
      navigate('/');
      return;
    }

    // If login failed, try to register
    const { error: signUpError } = await supabase.auth.signUp({ email, password });

    if (!signUpError) {
      setLoading(false);
      console.log('Registered and logged in!');
      navigate('/');
      return;
    }

    // If both fail
    setLoading(false);
    setErrorMsg(signUpError.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleAuth}
        className="bg-[#111] p-8 rounded-xl shadow-xl w-full max-w-sm"
      >
        <h2 className="text-2xl text-center mb-6">Login into <span className="text-white font-bold">LensNest</span></h2>

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
