import React, { useState, useContext, createContext } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api/';

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProviderAuth() {
  const [user, setUser] = useState(null);

  async function signIn(email, password) {
    const { login, profile } = endPoints.auth;
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    const { data: access_token } = await axios.post(login, { email, password }, options);

    if (access_token) {
      const token= access_token.access_token
      Cookie.set('token', token, { expires: 5 });

      axios.defaults.headers['Authorization'] = `Bearer ${token}`
      const { data: user } = await axios.get(profile)
      setUser(user)
    }
  }

  function logout() {
    Cookie.remove('token')
    setUser(null)
    delete axios.defaults.headers['Authorization']
    window.location.href = '/login'
  }

  return {
    user,
    signIn,
    logout
  };
}
