import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Pencil1Icon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Payment,
  columns as defaultColumns,
} from "./columns"; // Atualize para o caminho correto do seu arquivo columns
import { format } from 'date-fns';

interface DataTableProps {
  columns?: ColumnDef<Payment, any>[];
  data: Payment[];
}

const formatDate = (isoDate: string) => {
  return format(new Date(isoDate), 'dd/MM/yyyy');
};

export function CycleTable({ columns = defaultColumns, data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting
    },
  });

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="relative"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  const columnId = cell.column.id;
                  const isStatusCell = columnId === 'status';
                  const status = row.original.status;
                  const isOngoing = status === true;

                  const isDateCell = columnId === 'startDate' || columnId === 'endDate';
                  const formattedDate = isDateCell ? formatDate(row.original[columnId]) : null;

                  return (
                    <TableCell key={cell.id}>
                      {isStatusCell ? (
                        <span className={isOngoing ? 'bg-yellow-100 px-2 py-1 rounded' : 'bg-green-100 px-2 py-1 rounded'}>
                          {isOngoing ? 'Em andamento' : 'Finalizado'}
                        </span>
                      ) : isDateCell ? (
                        formattedDate
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
            ))
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
  );
}
