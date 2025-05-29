import React, { createContext, useContext, useState, useEffect } from "react";

const ComponentsContext = createContext();

export function ComponentsProvider({ children }) {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const localComps = localStorage.getItem("components");
    if (localComps) {
      setComponents(JSON.parse(localComps));
    } else {
      fetch("/data/components.json")
        .then((res) => res.json())
        .then((data) => {
          setComponents(data);
          localStorage.setItem("components", JSON.stringify(data));
        })
        .catch(() => setComponents([]));
    }
  }, []);

  const addComponent = (component) => {
    const updated = [...components, component];
    setComponents(updated);
    localStorage.setItem("components", JSON.stringify(updated));
  };

  const updateComponent = (updatedComponent) => {
    const updated = components.map((c) =>
      c.id === updatedComponent.id ? updatedComponent : c
    );
    setComponents(updated);
    localStorage.setItem("components", JSON.stringify(updated));
  };

  const deleteComponent = (id) => {
    const updated = components.filter((c) => c.id !== id);
    setComponents(updated);
    localStorage.setItem("components", JSON.stringify(updated));
  };

  return (
    <ComponentsContext.Provider
      value={{ components, addComponent, updateComponent, deleteComponent }}
    >
      {children}
    </ComponentsContext.Provider>
  );
}

export function useComponents() {
  return useContext(ComponentsContext);
}
export { ComponentsContext };