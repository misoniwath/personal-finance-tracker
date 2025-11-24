import React, { useState, useEffect } from "react";
import { SettingsOptions } from "../components/setting/SettingsOptions";
import "./Setting.css";

export function Setting() {
  const [settings, setSettings] = useState({
    currency: "$",
    theme: "light",
    dateFormat: "MM/DD/YYYY", 
  });
  
  // apply theme to body
  useEffect(() => {
    if (settings.theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [settings.theme]);

  const [saveMessage, setSaveMessage] = useState("");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // save settings handler
  const handleSave = () => {
    setSaveMessage({ text: "Settings saved successfully!", type: "success" });
    console.log("Saved settings:", settings);

    // clear the message after a few seconds
    setTimeout(() => setSaveMessage(""), 3000);
  };

  // reset settings to default handler
  const handleReset = () => {
    setSettings({
      currency: "$",
      theme: "light",
      dateFormat: "MM/DD/YYYY",
    });
    
    setSaveMessage({ text: "Settings restored to default.", type: "neutral" });
    setTimeout(() => setSaveMessage(""), 3000);
  };


  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>Setting</h2>
      </div>
      
      {/* settings options */}
      <SettingsOptions settings={settings} onChange={handleChange} />

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
