import { createContext, useContext, useState, useCallback } from "react";

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [portfolioVersion, setPortfolioVersion] = useState(0);

  const notificarActualizacionPortfolio = useCallback(() => {
    setPortfolioVersion(prev => prev + 1);
  }, []);

  return (
    <PortfolioContext.Provider value={{ portfolioVersion, notificarActualizacionPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioContext() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolioContext debe usarse dentro de PortfolioProvider");
  }
  return context;
}
