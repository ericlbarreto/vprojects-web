import { ColumnDef } from "@tanstack/react-table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../ui/select"; // Atualize para o caminho correto do seu componente Select

export type Payment = {
    id: string;
    name: string, 
    grade: number, 
    sector: string, 
    role: string, 
    status: "Não iniciado" | "Finalizado",
}

export const statusOptions = ["Todos", "em andamento", "finalizado"];
export const yearOptions = ["Todos", "2024", "2023", "2022", "2021"];
export const gradeOptions = ["Todas", "5", "4", "3", "2", "1"];
// export const dateOrderOptions = ["Todas", "Mais recente", "Mais antiga"];

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="flex justify-start pt-4 pb-3 pl-6">

        <p className="text-base">Colaborador</p>
        {/* <Select onValueChange={(value) => column.setFilterValue(value === "Todos" ? undefined : value)}>
          <SelectTrigger className="w-auto bg-transparent shadow-none">
            <a><span>Data de abertura</span></a>
          </SelectTrigger>
          <SelectContent>
            {yearOptions.map((option) => (
              <SelectItem key={option} value={option} className="text-center text-roxoPrincipal">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      </div>
    ),
    cell: ({ cell }) => cell.getValue(),
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      const year = String(row.getValue(columnId)).split("-")[0];
      return year === filterValue;
    },
  },
  {
    accessorKey: "grade",
    header: ({ column }) => (
      <div className="flex items-center gap-2 justify-center">
        <Select onValueChange={(value) => column.setFilterValue(value === "Todas" ? undefined : value)}>
          <SelectTrigger className="w-auto bg-transparent shadow-none">
            <a><span className="">Nota final</span></a>
          </SelectTrigger>
          <SelectContent>
            {gradeOptions.map((option) => (
              <SelectItem key={option} value={option} className="text-center text-roxoPrincipal">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ),
    cell: ({ cell }) => cell.getValue(),
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      return String(row.getValue(columnId)) === filterValue;
    },
  },
  {
    accessorKey: "sector",
    header: ({ column }) => (
      <div className="flex items-center gap-2 justify-center">
        <Select onValueChange={(value) => column.setFilterValue(value === "Todos" ? undefined : value)}>
          <SelectTrigger className="w-auto bg-transparent shadow-none">
            <a><span>Setor</span></a>
          </SelectTrigger>
          <SelectContent>
            {yearOptions.map((option) => (
              <SelectItem key={option} value={option} className="text-center text-roxoPrincipal">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ),
    cell: ({ cell }) => cell.getValue(),
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      const year = String(row.getValue(columnId)).split("-")[0];
      return year === filterValue;
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <div className="flex items-center gap-2 justify-center">
        <Select onValueChange={(value) => column.setFilterValue(value === "Todos" ? undefined : value)}>
          <SelectTrigger className="w-auto bg-transparent shadow-none">
            <a><span>Cargo</span></a>
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option} value={option} className="text-center text-roxoPrincipal">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ),
    cell: ({ cell }) => cell.getValue(),
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      return row.getValue(columnId) === filterValue;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="flex items-center gap-2 justify-center">
        <Select onValueChange={(value) => column.setFilterValue(value === "Todos" ? undefined : value)}>
          <SelectTrigger className="w-auto bg-transparent shadow-none">
            <a><span>Status</span></a>
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option} value={option} className="text-center text-roxoPrincipal">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ),
    cell: ({ cell }) => cell.getValue(),
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      return row.getValue(columnId) === filterValue;
    },
  }
];
