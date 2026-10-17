import React, { useEffect, useMemo, useState } from "react";
import { PALETTE, tokens } from "./tokens";

export const SIDEBAR_WIDTH = 264;

function countSections(ds) {
  return ds.tabs.reduce((sum, tab) => sum + tab.sections.length, 0);
}

function SidebarDSNode({ ds, color, active, activeTabId, onSelectDs, onSelectTab }) {
  const [open, setOpen] = useState(active);

  useEffect(() => {
    if (active) setOpen(true);
  }, [active]);

  return (
    <div style={{ marginBottom: 4 }}>
      <button
        className="ds-node-row"
        onClick={() => {
          setOpen((value) => !value);
          onSelectDs(ds.id);
        }}
        style={{
          width: "100%",
          color: active ? color : tokens.text,
          borderLeftColor: active ? color : "transparent",
          background: active ? `${color}12` : "transparent",
          textAlign: "left",
        }}
      >
        <span className="ds-node-icon" style={{ background: `${color}26`, color }}>
          {ds.abbr}
        </span>
        <span style={{ flex: 1 }}>{ds.label}</span>
        <span style={{ color: tokens.muted, transform: open ? "rotate(90deg)" : "none" }}>{">"}</span>
      </button>

      {open && (
        <div className="ds-node-children">
          {ds.tabs.map((tab) => {
            const tabActive = active && activeTabId === tab.id;
            return (
              <div key={tab.id}>
                <button
                  className="ds-tab-link"
                  onClick={() => {
                    onSelectDs(ds.id);
                    onSelectTab(tab.id);
                  }}
                  style={{ width: "100%", color: tabActive ? tab.colorVar : tokens.muted, background: "none", border: 0, textAlign: "left" }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: tab.colorVar, flexShrink: 0 }} />
                  {tab.label}
                </button>

                {tabActive &&
                  tab.sections.map((section) => (
                    <a className="ds-section-link" key={section.id} href={`#${section.id}`}>
                      <span style={{ color: tokens.border, fontSize: 10 }}>-</span>
                      {section.navLabel}
                    </a>
                  ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ data, activeDsId, activeTabId, collapsed, onToggle, onSelectDs, onSelectTab }) {
  return (
    <>
      <button
        className="ds-sidebar-toggle"
        aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
        onClick={onToggle}
        style={{ left: collapsed ? 16 : SIDEBAR_WIDTH - 16 }}
      >
        {collapsed ? ">" : "<"}
      </button>

      <nav className="ds-sidebar" style={{ transform: collapsed ? `translateX(-${SIDEBAR_WIDTH}px)` : "translateX(0)" }}>
        <div className="ds-sidebar-header">
          <div className="ds-overline">Study Notes</div>
          <div className="ds-brand">
            DS &amp; Algo <span style={{ color: tokens.accent }}>Hub</span>
          </div>
        </div>

        <div style={{ padding: "12px 0" }}>
          <div className="ds-sidebar-group-label">Data Structures</div>
          {data.map((ds, index) => (
            <SidebarDSNode
              key={ds.id}
              ds={ds}
              color={PALETTE[index % PALETTE.length]}
              active={ds.id === activeDsId}
              activeTabId={activeTabId}
              onSelectDs={onSelectDs}
              onSelectTab={onSelectTab}
            />
          ))}
        </div>
      </nav>
    </>
  );
}

function TabStrip({ tabs, activeTabId, onSelect }) {
  return (
    <div className="ds-tabs">
      {tabs.map((tab) => {
        const active = tab.id === activeTabId;
        return (
          <button
            className="ds-tab-button"
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            style={{ color: active ? tab.colorVar : undefined, borderBottomColor: active ? tab.colorVar : "transparent" }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: tab.colorVar, opacity: active ? 1 : 0.42 }} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function Section({ section }) {
  return (
    <section id={section.id} style={{ marginBottom: 56, scrollMarginTop: 70 }}>
      <div className="section-label" style={{ color: section.labelColor }}>
        {section.labelText}
      </div>
      <h2 className="ds-h2">{section.title}</h2>
      {section.render()}
    </section>
  );
}

function DSHeader({ ds, color }) {
  const stats = useMemo(() => {
    const sectionCount = countSections(ds);
    return [`${ds.tabs.length} tabs`, `${sectionCount} sections`];
  }, [ds]);

  return (
    <header className="ds-header" style={{ "--active-color": color }}>
      <div className="ds-kicker">Data Structures - In-Depth Notes</div>
      <h1 className="ds-title">
        {ds.label} <span style={{ color }}>Notes</span>
      </h1>
      <p className="ds-summary">{ds.description}</p>
      <div className="ds-stats">
        {stats.map((stat) => (
          <span className="ds-stat" key={stat}>
            {stat}
          </span>
        ))}
      </div>
    </header>
  );
}

export function MainContent({ ds, color, activeTabId, onTabSelect }) {
  const activeTab = ds.tabs.find((tab) => tab.id === activeTabId) || ds.tabs[0];

  if (!activeTab) {
    return (
      <div className="ds-document">
        <DSHeader ds={ds} color={color} />
        <div className="ds-content">
          <div className="ds-empty">No tabs have been added for this note yet.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="ds-document">
      <DSHeader ds={ds} color={color} />
      <TabStrip tabs={ds.tabs} activeTabId={activeTab.id} onSelect={onTabSelect} />
      <div key={activeTab.id} className="ds-content fade-in">
        {activeTab.sections.map((section, index) => (
          <div key={section.id}>
            <Section section={section} />
            {index < activeTab.sections.length - 1 && <div className="divider" />}
          </div>
        ))}
      </div>
    </div>
  );
}

