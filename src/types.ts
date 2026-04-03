// Basic tree structure used across the file explorer
export type Node = {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: string;
  children?: Node[];
};

// Setter for expanded folders (Set of node ids)
export type SetExpanded = (value: Set<string> | ((prev: Set<string>) => Set<string>)) => void;
// Setter for selection/focus state (node id or null)
export type SetSelected = (value: string | null | ((prev: string | null) => string | null)) => void;

export type FileTreeProps = {
  data: Node[];
  depth?: number;
  expanded: Set<string>;
  setExpanded: SetExpanded;
  selectedId: string | null;
  setSelectedId: SetSelected;
  focusedId: string | null;
  setFocusedId: SetSelected;
  showProperties: boolean;
  setShowProperties: (value: boolean) => void;
};

export type TreeNodeProps = {
  node: Node;
  depth: number;
  expanded: Set<string>;
  setExpanded: SetExpanded;
  selectedId: string | null;
  setSelectedId: SetSelected;
  focusedId: string | null;
  setFocusedId: SetSelected;
  showProperties: boolean;
  setShowProperties: (value: boolean) => void;
};

export type FileExplorerPanelProps = {
  data: Node[];
  expanded: Set<string>;
  setExpanded: SetExpanded;
  selectedId: string | null;
  setSelectedId: SetSelected;
  focusedId: string | null;
  setFocusedId: SetSelected;
  showProperties: boolean;
  setShowProperties: (value: boolean) => void;
};

export type PropertiesModalProps = {
  node?: Node | null;
  open: boolean;
  onClose: () => void;
};

export type HandleKeyParams = {
  e: KeyboardEvent;
  visibleNodes: Node[];
  focusedId: string | null;
  setFocusedId: (id: string) => void;
  setExpanded: SetExpanded;
  setSelectedId: (id: string) => void;
  setShowProperties: (value: boolean) => void;
};
