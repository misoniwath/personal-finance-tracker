
import React from "react";
import "./SettingsOptions.css";

export function SettingsOptions({ settings, onChange }) {
  return (
    <div className="settings-options">
      <h3>Display Preferences</h3>

      <div className="settings-field">
        <label>Currency</label>
        <select name="currency" value={settings.currency} onChange={onChange}>
          <option value="$">$ – US Dollar</option>
          <option value="៛">៛ – Cambodian riel</option>
          <option value="€">€ – Euro</option>
          <option value="£">£ – British Pound</option>
          <option value="¥">¥ – Japanese Yen</option>
        </select>
      </div>

      <div className="settings-field">
        <label>Theme</label>
        <select name="theme" value={settings.theme} onChange={onChange}>
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>
      </div>

      <div className="settings-field">
        <label>Date Format</label>
        <select name="dateFormat" value={settings.dateFormat} onChange={onChange}>
          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          <option value="DD-MM-YYYY">DD-MM-YYYY</option>
          <option value="MM-DD-YYYY">MM-DD-YYYY</option>
        </select>
      </div>
    </div>
  );
}
