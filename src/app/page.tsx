"use client";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  ListFilter,
  MoreVertical,
  Download,
  Truck,
  CopyPlus,
  ThumbsDown,
  ThumbsUp,
  Trash,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { main } from "bun";
import DatasetTable from "@/components/DatasetTable";
import EmptyStateCard from "@/components/EmptyStateCard";
import { useSampleStore } from "@/store";

export default function App() {
  const { samples } = useSampleStore();
  return (
    <main className="flex  gap-8 flex-col flex-1 p-4 sm:px-6 sm:py-0">
      <div className="flex items-start gap-4 md:gap-8">
        <div className=" w-full items-start gap-4 md:gap-8 ">
          <div className="overflow-hidden h-full w-full flex flex-col gap-4">
            <CardHeader className=" px-0 py-0 flex  flex-row items-start justify-between">
              <div className="flex flex-col gap-0 p-0">
                <h2 className="text-xl font-bold">Samples</h2>
                <CardDescription>Your dataset samples</CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 gap-1 text-sm"
                    >
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem>All</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Selected
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>
                      Liked
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Disliked
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      AI Generated
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>None</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Download</span>
                </Button>
              </div>
            </CardHeader>
            {samples.length == 0 && <EmptyStateCard />}

            {samples?.length > 0 && <DatasetTable samples={samples} />}
          </div>
        </div>
      </div>
    </main>
  );
}

// <div className="grid gap-4  lg:col-span-2">
//   <Card className="overflow-hidden lg:col-span-2">
//     <CardHeader className="flex flex-row items-start bg-muted/50">
//       <div className="grid gap-0.5">
//         <CardTitle className="group flex items-center gap-2 text-lg">
//           Order Oe31b70H
//           <Button
//             size="icon"
//             variant="outline"
//             className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
//           >
//             <Copy className="h-3 w-3" />
//             <span className="sr-only">Copy Order ID</span>
//           </Button>
//         </CardTitle>
//         <CardDescription>Date: November 23, 2023</CardDescription>
//       </div>
//       <div className="ml-auto flex items-center gap-1">
//         <Button size="sm" variant="outline" className="h-8 gap-1">
//           <Truck className="h-3.5 w-3.5" />
//           <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
//             Track Order
//           </span>
//         </Button>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button size="icon" variant="outline" className="h-8 w-8">
//               <MoreVertical className="h-3.5 w-3.5" />
//               <span className="sr-only">More</span>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem>Edit</DropdownMenuItem>
//             <DropdownMenuItem>Export</DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Trash</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </CardHeader>
//     <CardContent className="p-6 text-sm">
//       <div className="grid gap-3">
//         <div className="font-semibold">Order Details</div>
//         <ul className="grid gap-3">
//           <li className="flex items-center justify-between">
//             <span className="text-muted-foreground">
//               Glimmer Lamps x <span>2</span>
//             </span>
//             <span>$250.00</span>
//           </li>
//           <li className="flex items-center justify-between">
//             <span className="text-muted-foreground">
//               Aqua Filters x <span>1</span>
//             </span>
//             <span>$49.00</span>
//           </li>
//         </ul>
//         <Separator className="my-2" />
//         <ul className="grid gap-3">
//           <li className="flex items-center justify-between">
//             <span className="text-muted-foreground">Subtotal</span>
//             <span>$299.00</span>
//           </li>
//           <li className="flex items-center justify-between">
//             <span className="text-muted-foreground">Shipping</span>
//             <span>$5.00</span>
//           </li>
//           <li className="flex items-center justify-between">
//             <span className="text-muted-foreground">Tax</span>
//             <span>$25.00</span>
//           </li>
//           <li className="flex items-center justify-between font-semibold">
//             <span className="text-muted-foreground">Total</span>
//             <span>$329.00</span>
//           </li>
//         </ul>
//       </div>
//       <Separator className="my-4" />
//       <div className="grid grid-cols-2 gap-4">
//         <div className="grid gap-3">
//           <div className="font-semibold">Shipping Information</div>
//           <address className="grid gap-0.5 not-italic text-muted-foreground">
//             <span>Liam Johnson</span>
//             <span>1234 Main St.</span>
//             <span>Anytown, CA 12345</span>
//           </address>
//         </div>
//         <div className="grid auto-rows-max gap-3">
//           <div className="font-semibold">Billing Information</div>
//           <div className="text-muted-foreground">
//             Same as shipping address
//           </div>
//         </div>
//       </div>
//       <Separator className="my-4" />
//       <div className="grid gap-3">
//         <div className="font-semibold">Customer Information</div>
//         <dl className="grid gap-3">
//           <div className="flex items-center justify-between">
//             <dt className="text-muted-foreground">Customer</dt>
//             <dd>Liam Johnson</dd>
//           </div>
//           <div className="flex items-center justify-between">
//             <dt className="text-muted-foreground">Email</dt>
//             <dd>
//               <a href="mailto:">liam@acme.com</a>
//             </dd>
//           </div>
//           <div className="flex items-center justify-between">
//             <dt className="text-muted-foreground">Phone</dt>
//             <dd>
//               <a href="tel:">+1 234 567 890</a>
//             </dd>
//           </div>
//         </dl>
//       </div>
//       <Separator className="my-4" />
//       <div className="grid gap-3">
//         <div className="font-semibold">Payment Information</div>
//         <dl className="grid gap-3">
//           <div className="flex items-center justify-between">
//             <dt className="flex items-center gap-1 text-muted-foreground">
//               <CreditCard className="h-4 w-4" />
//               Visa
//             </dt>
//             <dd>**** **** **** 4532</dd>
//           </div>
//         </dl>
//       </div>
//     </CardContent>
//     <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
//       <div className="text-xs text-muted-foreground">
//         Updated <time dateTime="2023-11-23">November 23, 2023</time>
//       </div>
//       <Pagination className="ml-auto mr-0 w-auto">
//         <PaginationContent>
//           <PaginationItem>
//             <Button size="icon" variant="outline" className="h-6 w-6">
//               <ChevronLeft className="h-3.5 w-3.5" />
//               <span className="sr-only">Previous Order</span>
//             </Button>
//           </PaginationItem>
//           <PaginationItem>
//             <Button size="icon" variant="outline" className="h-6 w-6">
//               <ChevronRight className="h-3.5 w-3.5" />
//               <span className="sr-only">Next Order</span>
//             </Button>
//           </PaginationItem>
//         </PaginationContent>
//       </Pagination>
//     </CardFooter>
//   </Card>
// </div>;

// {
//   /* <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
//   <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
//     <CardHeader className="pb-3">
//       <CardTitle>Your Orders</CardTitle>
//       <CardDescription className="max-w-lg text-balance leading-relaxed">
//         Introducing Our Dynamic Orders Dashboard for Seamless
//         Management and Insightful Analysis.
//       </CardDescription>
//     </CardHeader>
//     <CardFooter>
//       <Button>Create New Order</Button>
//     </CardFooter>
//   </Card>
//   <Card x-chunk="dashboard-05-chunk-1">
//     <CardHeader className="pb-2">
//       <CardDescription>This Week</CardDescription>
//       <CardTitle className="text-4xl">$1,329</CardTitle>
//     </CardHeader>
//     <CardContent>
//       <div className="text-xs text-muted-foreground">
//         +25% from last week
//       </div>
//     </CardContent>
//     <CardFooter>
//       <Progress value={25} aria-label="25% increase" />
//     </CardFooter>
//   </Card>
//   <Card x-chunk="dashboard-05-chunk-2">
//     <CardHeader className="pb-2">
//       <CardDescription>This Month</CardDescription>
//       <CardTitle className="text-4xl">$5,329</CardTitle>
//     </CardHeader>
//     <CardContent>
//       <div className="text-xs text-muted-foreground">
//         +10% from last month
//       </div>
//     </CardContent>
//     <CardFooter>
//       <Progress value={12} aria-label="12% increase" />
//     </CardFooter>
//   </Card>
// </div> */
// }
