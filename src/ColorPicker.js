import React, { useState } from "react";

import colors from "./colors";

import "./ColorPicker.css";

const Dropdown = ({ colorName }) => {
  const [currentColor, setCurrentColor] = useState(
    window.getComputedStyle(document.documentElement).getPropertyValue(colorName)
  );

  const setColor = e => {
    const color = e.target.value;
    document.documentElement.style.setProperty(colorName, color);
    setCurrentColor(color);
  };

  return (
    <div className="dropdown">
      <select onChange={setColor}>
        {colors.map(color => (
          <option style={{ backgroundColor: color }}>{color}</option>
        ))}
      </select>
      <div className="colorbox" style={{ backgroundColor: currentColor }}></div>
    </div>
  );
};

const Section = ({ title, colorName }) => (
  <section>
    <label>{title}</label>
    <Dropdown colorName={colorName} />
  </section>
);

export default function ColorPicker() {
  return (
    <div className="color-picker">
      <Section title="Bakgrunn" colorName="--bg-color" />
      <Section title="Header" colorName="--main-color" />
      <Section title="Grid bakgrunn" colorName="--board-color" />
      <Section title="Tekst" colorName="--font-color" />
      <Section title="Rute bakgrunn" colorName="--item-color" />
    </div>
  );
}
