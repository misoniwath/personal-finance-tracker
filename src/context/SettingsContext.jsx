import React, { createContext, useState, useEffect } from "react";

export const SettingsContext = createContext();

const DEFAULT_SETTINGS = {
  currency: "$",
  theme: "light",
  dateFormat: "MM/DD/YYYY",
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem("appSettings");
      return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
    } catch (e) {
      console.error("Failed to parse settings from localStorage", e);
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    localStorage.setItem("appSettings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (settings.theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [settings.theme]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
