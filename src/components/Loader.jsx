import React from "react";
import '../styles/loader.css'

export function Loader() {
   
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
