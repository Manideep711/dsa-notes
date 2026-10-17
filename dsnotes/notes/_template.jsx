import React from "react";
import { tokens } from "../tokens";

export const NEW_TOPIC_DS = {
  id: "new-topic",
  label: "New Topic",
  abbr: "N",
  description: "Replace this with a one-line summary for the header.",
  tabs: [
    {
      id: "overview",
      label: "Overview",
      colorVar: tokens.accent4,
      sections: [
        {
          id: "nt1",
          labelText: "Section 01",
          labelColor: tokens.accent4,
          title: "First Concept",
          navLabel: "First Concept",
          render: () => (
            <>
              <p className="ds-p">
                Write the cleaned-up transcript notes here. Use the existing classes so the UI stays consistent.
              </p>
              <div className="callout info">
                <div className="callout-label">Tip</div>
                Duplicate this file, rename the exported constant, import it in <code className="ds-code">notes/index.js</code>,
                and append it to <code className="ds-code">DATA</code>.
              </div>
            </>
          ),
        },
      ],
    },
  ],
};

