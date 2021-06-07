import { useState, createContext, useContext } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

// We will use the Provider in the _app.file to provide the state to the entire app.
function CartStateProvider({ children }) {
  // Custom Cart State Provider
  // State, getter and setter here to be used anywhere as a Context consumer.

  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  // The value can be accessed anywhere by the consumer
  return (
    <LocalStateProvider value={{ cartOpen, setCartOpen, toggleCart }}>
      {children}
    </LocalStateProvider>
  );
}

function useCart() {
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };
