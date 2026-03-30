export type Node = {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: string;
  children?: Node[];
};

export type Props = {
  data: Node[];
  depth?: number;
};
