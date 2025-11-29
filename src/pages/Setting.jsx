import React, { useState, useEffect, useContext, useRef } from "react";
import { SettingsOptions } from "../components/setting/SettingsOptions";
import { SettingsContext } from "../context/SettingsContext";
import "./Setting.css";

export function Setting() {
  const { settings, setSettings } = useContext(SettingsContext);
  const [tempSettings, setTempSettings] = useState(settings);
  const [saveMessage, setSaveMessage] = useState("");

  const previousThemeRef = useRef(settings.theme);
  // flag to know if user actually clicked Save
  const hasSavedRef = useRef(false);

  // keep tempSettings in sync if context settings ever change
  useEffect(() => {
    setTempSettings(settings);
  }, [settings]);

  // apply theme to body
  useEffect(() => {
    if (tempSettings.theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [tempSettings.theme]);

  // when leaving this page (unmount), revert theme if not saved
  useEffect(() => {
    return () => {
      if (!hasSavedRef.current) {
        // revert to the theme that was active before editing
        if (previousThemeRef.current === "dark") {
          document.body.classList.add("dark-mode");
        } else {
          document.body.classList.remove("dark-mode");
        }
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // save settings handler
  const handleSave = () => {
    hasSavedRef.current = true; 
    setSettings(tempSettings);  

    setSaveMessage({ text: "Settings saved successfully!", type: "success" });
    console.log("Saved settings:", tempSettings);

    // clear the message after a few seconds
    setTimeout(() => setSaveMessage(""), 3000);
  };

  // reset settings to default handler (only temp until you click Save)
  const handleReset = () => {
    const defaultSettings = {
      currency: "$",
      theme: "light",
      dateFormat: "MM/DD/YYYY",
    };

    setTempSettings(defaultSettings);
    hasSavedRef.current = false;

    setSaveMessage({ text: "Settings restored to default.", type: "neutral" });
    setTimeout(() => setSaveMessage(""), 3000);
  };


  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>Settings</h2>
      </div>
      
      {/* settings options */}
      <SettingsOptions settings={tempSettings} onChange={handleChange} />

      <div className="settings-buttons">
        <button className="settings-action-btn" onClick={handleSave}>
          Save Settings
        </button>
        <button className="reset-btn" onClick={handleReset}>
          Reset to Default
        </button>
      </div>

      {saveMessage && (
        <p className={`settings-message ${saveMessage.type}`}>
          {saveMessage.text}
        </p>
      )}
    </div>
  );
}
