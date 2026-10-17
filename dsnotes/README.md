# DSNotes Refactor

This folder turns the original single `DSNotes.jsx` into a component-based notes system.

## File Map

- `DSNotes.jsx` - root component and state wiring
- `components.jsx` - sidebar, tabs, header, and section rendering
- `styles.js` - global CSS and reusable class styles
- `tokens.js` - design tokens and palette
- `notes/*.jsx` - one file per data-structure topic
- `notes/index.js` - registry of note files shown in the app

## Add New Content

1. Copy `notes/_template.jsx` to a new file, for example `notes/dynamic-programming.jsx`.
2. Rename the exported constant, for example `DYNAMIC_PROGRAMMING_DS`.
3. Fill in the `tabs` and `sections` with your cleaned transcript content.
4. Import it in `notes/index.js`.
5. Append it to `DATA`.

That is the only app file you need to touch when adding a new topic.
