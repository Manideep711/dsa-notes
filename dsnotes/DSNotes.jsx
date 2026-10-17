import React, { useEffect, useState } from "react";
import { MainContent, SIDEBAR_WIDTH, Sidebar } from "./components";
import { DATA } from "./notes";
import { GLOBAL_CSS } from "./styles";
import { PALETTE } from "./tokens";

function useGlobalStyles() {
  useEffect(() => {
    const id = "ds-notes-global";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
  }, []);
}

export default function DSNotes() {
  const [activeDsId, setActiveDsId] = useState(DATA[0].id);
  const [activeTabId, setActiveTabId] = useState(DATA[0].tabs[0]?.id || "");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useGlobalStyles();

  const activeDs = DATA.find((ds) => ds.id === activeDsId) || DATA[0];
  const activeDsIndex = Math.max(0, DATA.findIndex((ds) => ds.id === activeDs.id));
  const color = PALETTE[activeDsIndex % PALETTE.length];

  function handleSelectDs(dsId) {
    const nextDs = DATA.find((ds) => ds.id === dsId);
    if (!nextDs) return;

    if (dsId !== activeDsId) {
      setActiveDsId(dsId);
      setActiveTabId(nextDs.tabs[0]?.id || "");
    }
  }

  function handleSelectTab(tabId) {
    setActiveTabId(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="ds-app">
      <Sidebar
        data={DATA}
        activeDsId={activeDsId}
        activeTabId={activeTabId}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((value) => !value)}
        onSelectDs={handleSelectDs}
        onSelectTab={handleSelectTab}
      />

      <main className="ds-main" style={{ marginLeft: sidebarCollapsed ? 0 : SIDEBAR_WIDTH }}>
        <MainContent ds={activeDs} color={color} activeTabId={activeTabId} onTabSelect={handleSelectTab} />
      </main>
    </div>
  );
}

