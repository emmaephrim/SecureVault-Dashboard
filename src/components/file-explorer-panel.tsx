import { SectionTitle } from "./ui/section-title";
import data from "../../data.json";
import FileTree from "./ui/file-tree";
import type { Node } from "../types";

export default function FileExplorerPanel(): React.ReactElement {
    return (
        <section className="p-2 md:pl-6 pt-3 w-full overflow-y-auto">
            <SectionTitle>FILE EXPLORER</SectionTitle>
            {/* Section for recursive tree */}

            <FileTree data={data as Node[]} />
        </section>
    )
}
