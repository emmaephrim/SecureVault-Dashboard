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

## Live Demo

The project is deployed and accessible here:

[View Live Application](https://secure-vault-dashboard-beta.vercel.app/)

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

# Technical Approach

## Recursive Strategy (How the tree data is managed)

This project uses the provided `data.json` as a **recursive tree** (a nested folder/file structure). Each item is a `Node`, where folders can contain an array of more `Node`s:

- `type: "folder"` → may include `children: Node[]`
- `type: "file"` → leaf node (no children)
- every node has a unique `id` for state + lookups

### Why a recursive approach?

`data.json` is naturally hierarchical (folders contain folders/files), and the depth is unknown. Recursion is the cleanest way to:

- traverse the entire structure,
- render nested UI (folder → children),
- filter/search while keeping parent/child relationships intact.

### 1) Preprocessing the tree (recursive traversal)

To avoid repeatedly walking the tree during UI interactions, the app builds two maps up-front:

**A) `nodeMap` (id → node)**
Built by recursively visiting every node once:

- purpose: instantly access any node by `id` (selection, properties panel, etc.)
- benefit: avoids expensive “search the tree for this node” operations

Implementation idea:

- walk each node
- `map.set(node.id, node)`
- if the node has `children`, recurse into them

**B) `parentMap` (nodeId → parentId | null)**
Also built recursively:

- purpose: quick upward navigation (breadcrumbs + sibling)
- benefit: enables breadcrumb construction without re-traversing the whole tree

Each traversal step records:

- `parentMap.set(node.id, parentId)`
- then recurses into `children` using the current node as the parent

### 2) Breadcrumbs (upward traversal using the parent map)

When a node is selected, the breadcrumb path is derived by walking _up_ the tree:

1. start from `selectedId`
2. get the current node from `nodeMap`
3. prepend it to the path (`unshift`) so ordering becomes `Root → … → Selected`
4. move upward using `parentMap.get(currentId)`
5. stop when the parent is `null` (root)

This creates breadcrumbs efficiently because it only visits the ancestors of the selected node, not the whole dataset.

### 3) Filtering/searching while preserving structure (recursive filter)

Search is implemented as a recursive filter that **keeps the tree shape**:

- If a node name matches the query, include it.
- If it doesn’t match:
  - recursively filter its children
  - if any children match, keep the parent folder **but replace its `children` with only the matching subtree**
  - if nothing matches, return `null` for that branch

This is important because a file explorer needs context: if a deeply nested file matches, users must still see the parent folders leading to it.

### 4) Auto-expanding folders during search

Filtering also collects folder ids into an `expandedSet`:

- if a folder name matches, it is added so the folder opens
- if a child matches, the parent folders are added so the match is visible

Then the UI merges:

- user-driven expansion (`expanded` state)
- search-driven expansion (`autoExpanded` from filtering)

So search results “reveal themselves” without losing the user’s manual open/close state.

### 5) Recursive rendering (FileTree → TreeNode → FileTree)

The UI mirrors the data shape:

- `FileTree` renders a list of nodes.
- Each `TreeNode` renders its own button row.
- If the node is a folder and is expanded, it renders another `FileTree` for `node.children` with `depth + 1`.

This pattern scales to any depth and keeps indentation consistent via the `depth` value.

### 6) Flattening visible nodes for keyboard navigation (controlled recursion)

Arrow key navigation needs a linear list, so the app builds `visibleNodes` by recursively traversing only the _expanded_ parts of the tree:

- always push the current node into `result`
- only recurse into `children` if:
  - node is a folder, and
  - its id is in the expanded set

That produces the “what you can currently see on screen” order, enabling predictable:

- `ArrowUp` / `ArrowDown` focus movement
- `ArrowRight` expand
- `ArrowLeft` collapse
- `Enter` to select/open properties (mobile modal)

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
