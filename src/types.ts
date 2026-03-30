export type Node = {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: string;
  children?: Node[];
};

export type FileTreeProps = {
  data: Node[];
  depth?: number;
  expanded: Set<string>;
  setExpanded: (expanded: Set<string>) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
};

export type TreeNodeProps = {
  node: Node;
  depth: number;
  expanded: Set<string>;
  setExpanded: (expanded: Set<string>) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
};
