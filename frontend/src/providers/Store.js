/**
 * contain all global values and method in order to update
 * @typedef  {Object}   storage
 * @property {Object}   get contain all global values
 * @property {Function} set method in order to update values
 */

import { useState, createContext } from 'react';
import data from './defaultData';

const StoreContext = createContext(undefined);

/**
 * @type {storage}
 */
const store = {
  get: {},
  set: () => {},
};

function StoreProvider({ children }) {
  const [get, set] = useState(data);
  store.get = get;
  store.set = (newData) => update(newData);

  function update(newData) {
    set({
      ...get,
      ...newData,
    });
  }

  return <StoreContext.Provider value={[get, update]}>{children}</StoreContext.Provider>;
}

export { StoreProvider, StoreContext, store };
 