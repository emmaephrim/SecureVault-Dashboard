export type Node = {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: string;
  children?: Node[];
};

export type SetExpanded = (value: Set<string> | ((prev: Set<string>) => Set<string>)) => void;
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
};

export type FileExplorerPanelProps = {
  data: Node[];
  expanded: Set<string>;
  setExpanded: SetExpanded;
  selectedId: string | null;
  setSelectedId: SetSelected;
  focusedId: string | null;
  setFocusedId: SetSelected;
};
