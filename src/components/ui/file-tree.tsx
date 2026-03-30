import type { Props } from "../../types"
import { TreeNode } from "./tree-node"

export default function FileTree({ data, depth = 0 }: Props) {
    return (
        <ul>
            {data.map(node => (
                <TreeNode key={node.id} node={node} depth={depth} />
            ))}
        </ul>
    )
}
