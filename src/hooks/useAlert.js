import { useState } from 'react';

function useAlert(options) {
  const defaultOptions = {
    active: false,
    message: '',
    type: '',
    autoClose: true,
  };

  const [alert, setAlert] = useState({
    ...defaultOptions,
    ...options,
  });

  function toggleAlert() {
    setAlert(!alert.active);
  }

  return {
    alert,
    setAlert,
    toggleAlert,
  };
}

export default useAlert;
