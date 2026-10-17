import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DSNotes from "./DSNotes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DSNotes />
  </StrictMode>,
);
