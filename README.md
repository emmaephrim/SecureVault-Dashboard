# SecureVault File Explorer

A modern, keyboard-accessible file explorer interface built for SecureVault Inc.

This project focuses on handling deeply nested data structures efficiently while delivering a clean and responsive user experience.

---

## Overview

SecureVault provides secure cloud storage for enterprise clients, but their existing frontend made navigating large folder structures difficult.

This project rebuilds that experience into a performant and intuitive file explorer that supports:

- Deeply nested folder navigation
- Keyboard-first interaction
- File inspection via a properties panel
- Responsive behavior across devices

---

## Design

**Design File:** [Figma Link](https://www.figma.com/design/DDkhT0tQoHu1EbY9P45DTu/Secure-Vault---Dashboard?node-id=31-681&t=oqXGOVsn4eyAE9SI-1)

The interface follows a dark-themed design system aligned with SecureVault’s “cyber-secure, precise, and fast” brand direction.

### Design System Includes:

- Typography scale
- Color palette
- Spacing Grid
- Component states (Defualt, Hover, Active,Focus)

---

## Features

### 1. Recursive Tree Structure

The file explorer renders a nested folder structure using a recursive component pattern.

- Handles levels of depth (tested beyond 10+ levels)
- Folders expand/collapse without page reload
- Efficient rendering using memoization where necessary

---

### 2. File Selection & Properties Panel

- Clicking a file selects it
- Selected state is visually distinct
- A properties panel displays:
  - Name
  - Type
  - Size
  - ID
  - Item count (for folders)

#### Desktop

- Properties panel is fixed and scrollable independently

#### Mobile

- Properties appear as a modal for better usability

---

### 3. Keyboard Navigation

The explorer supports full keyboard interaction:

- `↑ / ↓` :move focus between visible items
- `→` : expand folder
- `←` : collapse folder
- `Enter` : select item

Focus and selection are handled separately to match expected behavior in file systems.

Since the tree is recursive, I flatten the visible nodes into a list for navigation. This makes arrow key movement predictable and easier to manage.

---

### 4. Search & Filtering

- Search input filters the tree
- Matching nodes are shown even if deeply nested
- Parent folders auto-expand to reveal results

Filtering is also done recursively. If a node doesn’t match the search, its children are checked. If any child matches, the parent is still kept.

This keeps the tree structure intact and automatically expands folders that contain matches.

---

## Wildcard Feature: Breadcrumb Navigation

One gap in the original requirements was **navigation context** .

When working with deeply nested folders, users can easily lose track of where they are.

### Solution

A breadcrumb navigation system was introduced:

- Displays the full path from root to the selected node
- Allows quick navigation back to any parent folder
- Integrates with selection and search state

### Why it matters

This significantly improves usability for real-world scenarios, especially for:

- Legal documents
- Large enterprise file systems
- Deeply nested data structures

It reduces navigation friction and makes the system feel more predictable.

---

## Technical Approach

### Recursive Strategy

The data is structured as a nested tree (folders containing files or other folders), so the UI follows the same pattern.

Each node is rendered using a `TreeNode` component. If the node is a folder and it’s expanded, it renders its children using the same component. That’s what makes it recursive.

```
if (node.type === "folder" && expanded.has(node.id)) {
  // render children
}
```

This means the same logic works no matter how deep the structure goes — no need to handle levels differently.

---

### Managing the Tree Efficiently

To avoid repeatedly traversing the tree, I created a few helper structures:

- **Node map (id → node)**

  Used to quickly get a node when needed (e.g. for the properties panel)

- **Parent map (id → parentId)**

  Used to rebuild the breadcrumb path and understand relationships between nodes

---

### Data Handling

Two key maps are built for efficient lookups:

- **Node Map (id → node)** : Used to retrieve node details in constant time.
- **Parent Map (id → parentId)** : Used for breadcrumb path reconstruction.

---

### Keyboard Navigation Strategy

- Visible nodes are flattened into a list.
- Navigation operates on this flattened structure.
- Focus (`focusedId`) is separate from selection (`selectedId`).

This mirrors how real file explorers behave.

---

### State Management

Core state includes:

- `expanded` → tracks open folders
- `selectedId` → current selection
- `focusedId` → keyboard navigation focus
- `query` → search input
- `showPropeties` → properties modal for mobile view

---

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

**Bash**

```
# Clone the repository
git clone https://github.com/emmaephrim/SecureVault-Dashboard.git

# Navigate into the project
cd SecureVault-Dashboard/

# Install dependencies
npm install

# Run the development server
npm run dev
```

The app should now be running locally (usually at http://localhost:5173 or similar depending on your setup).

---

## Tech Stack

- React (UI rendering)
- TypeScript (type safety)
- Tailwind CSS (styling)
- npm (package management)

---

## Notes

- The project uses the provided `data.json` structure without modification.
- Additional data can be added for stress testing deeper nesting.
- The UI is optimized for both desktop and mobile interactions.

---

## Author

Emmanul Ephrim

**Github**: [emmaephrim](https://github.com/emmaephrim)
