'use client';
import { createContext, useContext, useState } from 'react';
import type { City } from '../lib/supabase';

type CityContextType = {
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
};

const CityContext = createContext<CityContextType | null>(null);

export function CityProvider({ children }: { children: React.ReactNode }) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const ctx = useContext(CityContext);
  if (!ctx) throw new Error('useCity must be used within CityProvider');
  return ctx;
}
