import React from "react";

function Slider({ label, min, max, step, value, onChange }) {
  return (
    <div style={{ margin: "10px 0" }}>
      <label>{label}: {value}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}
export default Slider
