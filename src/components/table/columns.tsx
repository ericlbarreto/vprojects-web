import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  id: string
  startDate: string;
  endDate: string;
  grade: number
  status: "em andamento" | "finalizado"
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "startDate",
    header: "Data de abertura",
  },
  {
    accessorKey: "grade",
    header: "Nota final",
  },
  {
    accessorKey: "endDate",
    header: "Data de finalização",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]
