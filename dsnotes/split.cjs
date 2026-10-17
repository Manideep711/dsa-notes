const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, 'notes', 'heaps.jsx');
const content = fs.readFileSync(srcFile, 'utf8');

const heapStart = content.indexOf('{', content.indexOf('id: "heap"')) - 1;
const pqStart = content.indexOf('{', content.indexOf('id: "pq"')) - 1;
const cmpStart = content.indexOf('{', content.indexOf('id: "cmp"')) - 1;
const iqStart = content.indexOf('{', content.indexOf('id: "iq"')) - 1;
const iqEnd = content.lastIndexOf(']');

// But we need to make sure we parse properly. The file structure is:
// export const HEAPS_DS = { ... tabs: [ { id: "heap" ... }, { id: "pq" ... }, ... ] };
// We can just use string splitting based on the known structure.

// Wait, doing this via string matching is risky because of nested brackets.
// Let's just create a quick Babel script or regex?
// Actually, since I know the line numbers:
const lines = content.split('\n');

const heapCode = lines.slice(10, 506).join('\n'); // lines 11 to 506
const pqCode = lines.slice(506, 775).join('\n');   // lines 507 to 775
const cmpCode = lines.slice(775, 1045).join('\n'); // lines 776 to 1045
const iqCode = lines.slice(1045, 1519).join('\n'); // lines 1046 to 1519

// Remove trailing comma if any
function cleanEnd(code) {
    if(code.trim().endsWith(',')) {
        return code.substring(0, code.lastIndexOf(','));
    }
    return code;
}

const dir = path.join(__dirname, 'notes', 'heaps');
if(!fs.existsSync(dir)) fs.mkdirSync(dir);

fs.writeFileSync(path.join(dir, 'concepts.jsx'), 'import React from "react";\nimport { tokens } from "../../tokens";\n\nexport const heapConceptsTab = ' + cleanEnd(heapCode) + ';\n');
fs.writeFileSync(path.join(dir, 'pq.jsx'), 'import React from "react";\nimport { tokens } from "../../tokens";\n\nexport const pqTab = ' + cleanEnd(pqCode) + ';\n');
fs.writeFileSync(path.join(dir, 'cmp.jsx'), 'import React from "react";\nimport { tokens } from "../../tokens";\n\nexport const cmpTab = ' + cleanEnd(cmpCode) + ';\n');
fs.writeFileSync(path.join(dir, 'iq.jsx'), 'import React from "react";\nimport { tokens } from "../../tokens";\n\nexport const iqTab = ' + cleanEnd(iqCode) + ';\n');

const indexCode = `import { heapConceptsTab } from "./concepts";
import { pqTab } from "./pq";
import { cmpTab } from "./cmp";
import { iqTab } from "./iq";

export const HEAPS_DS = {
  id: "heaps",
  label: "Heaps",
  abbr: "H",
  description: "Heap internals, Priority Queue abstraction, and Object Comparison in Java.",
  tabs: [
    heapConceptsTab,
    pqTab,
    cmpTab,
    iqTab
  ]
};
`;

fs.writeFileSync(path.join(dir, 'index.js'), indexCode);

// Finally, update notes/index.js
const notesIndex = fs.readFileSync(path.join(__dirname, 'notes', 'index.js'), 'utf8');
const newNotesIndex = notesIndex.replace('import { HEAPS_DS } from "./heaps";', 'import { HEAPS_DS } from "./heaps/index.js";');
fs.writeFileSync(path.join(__dirname, 'notes', 'index.js'), newNotesIndex);

console.log("Done refactoring.");
