import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import { CopyPlus, ThumbsDown, ThumbsUp, Trash } from "lucide-react";

const DatasetTable = ({ samples }) => (
  <div className="w-full h-full overflow-auto px-4">
    <Table className="w-full">
      {/* <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px] px-2">
                      <Checkbox />
                    </TableHead>
                    <TableHead className="px-2">Sample ID</TableHead>
                    <TableHead className="px-2"></TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader> */}
      <TableBody>
        {samples.map((sample, index) => (
          <TableRow key={sample.id}>
            <TableCell className="p-2 w-[40px] ">
              <Checkbox />
            </TableCell>
            <TableCell className="font-medium p-2 w-[100px] whitespace-nowrap">
              Sample {index}
            </TableCell>
            <TableCell className="p-2">
              <div className="flex gap-1 flex-wrap">
                {sample.labels.map((label, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {label}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-end space-x-1 gap-1">
                <ThumbsDown className="h-4 w-4 text-muted-foreground hover:text-red-500 cursor-pointer" />
                <ThumbsUp className="h-4 w-4 text-muted-foreground hover:text-green-500 cursor-pointer" />
                <CopyPlus className="h-4 w-4 text-muted-foreground hover:text-black cursor-pointer" />
                <Trash className="h-4 w-4 text-muted-foreground hover:text-black cursor-pointer" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default DatasetTable;
