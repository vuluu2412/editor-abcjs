import React from "react";
import CardContent from "./CardContent";

function Card({ children }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
      <CardContent>{children}</CardContent>
    </div>
  );
}
export default Card
