import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Pencil1Icon, ChevronRightIcon } from "@radix-ui/react-icons"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type Payment = {
  id: string
  startDate: string;
  endDate: string;
  grade: number
  status: "em andamento" | "finalizado"
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

import { useState } from "react"

export function DataTable<TData extends { status: string }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  className="relative"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isStatusCell = cell.column.id === 'status';
                    const status = row.original.status;
                    const isOngoing = status === "em andamento";
                    return (
                      <TableCell key={cell.id}>
                        {isStatusCell ? (
                          <span className={isOngoing ? 'bg-yellow-100 px-2 py-1 rounded' : 'bg-green-100 px-2 py-1 rounded'}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </span>
                        ) : (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                        {isStatusCell && (
                          isOngoing ? (
                            <Pencil1Icon className="absolute right-12 text-roxoPrincipal top-5 cursor-pointer "/>
                          ) : (
                            <ChevronRightIcon className="absolute right-12 text-roxoPrincipal top-5 cursor-pointer"/>
                          )
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
