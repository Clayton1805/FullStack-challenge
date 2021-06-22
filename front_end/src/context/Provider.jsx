import React, { useState, useEffect } from 'react';

import { saveStorage, loadStorage } from '../util/localStorage';
import AMaisAppContext from './AMaisAppContext';

function Provider({ children }) {
  const [user, setUser] = useState(loadStorage('user', {}));

  useEffect(() => {
    saveStorage('user', user);
  }, [user]);

  const contextValue = {
    user,
    setUser,
  };

  return (
    <AMaisAppContext.Provider value={ contextValue }>
      {children}
    </AMaisAppContext.Provider>
  );
}

export default Provider;
