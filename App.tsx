import React, { useState, useEffect } from 'react';
import BridgePage from './components/BridgePage';
import AdminPanel from './components/AdminPanel';
import { ADMIN_ROUTE } from './constants';

const App: React.FC = () => {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Normalizar rota: #/rota -> /rota
  const getPath = (h: string) => {
    const clean = h.replace(/^#/, '');
    return clean.startsWith('/') ? clean : '/' + clean;
  };

  const currentPath = getPath(hash);

  // Redirecionar root para /priscila
  useEffect(() => {
    if (currentPath === '/' || currentPath === '') {
      window.location.hash = '/priscila';
    }
  }, [currentPath]);

  // Enquanto redireciona
  if (currentPath === '/' || currentPath === '') {
    return null;
  }

  // Rota Admin
  if (currentPath === ADMIN_ROUTE) {
    return <AdminPanel />;
  }

  // Rota BridgePage (/:modelId)
  // Remove a barra inicial para pegar o ID
  const modelId = currentPath.substring(1);

  return <BridgePage modelId={modelId} />;
};

export default App;