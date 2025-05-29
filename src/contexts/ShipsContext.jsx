import React, { createContext, useContext, useState, useEffect } from "react";

const ShipsContext = createContext();

export function ShipsProvider({ children }) {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const localShips = localStorage.getItem("ships");
    if (localShips) {
      setShips(JSON.parse(localShips));
    } 
    else {
      fetch("/data/ships.json")
        .then((res) => res.json())
        .then((data) => {
          setShips(data);
          localStorage.setItem("ships", JSON.stringify(data));
        })
        .catch(() => setShips([]));
    }
  }, []);

  const addShip = (ship) => {
    const updated = [...ships, ship];
    setShips(updated);
    localStorage.setItem("ships", JSON.stringify(updated));
  };

  const updateShip = (updatedShip) => {
    const updated = ships.map((s) =>
      s.id === updatedShip.id ? updatedShip : s
    );
    setShips(updated);
    localStorage.setItem("ships", JSON.stringify(updated));
  };

  const deleteShip = (id) => {
    const updated = ships.filter((s) => s.id !== id);
    setShips(updated);
    localStorage.setItem("ships", JSON.stringify(updated));
  };

  return (
    <ShipsContext.Provider
      value={{ ships, addShip, updateShip, deleteShip }}
    >
      {children}
    </ShipsContext.Provider>
  );
}

export function useShips() {
  return useContext(ShipsContext);
}
export { ShipsContext };