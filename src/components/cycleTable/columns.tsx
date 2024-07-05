import { ColumnDef } from "@tanstack/react-table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../ui/select"; // Atualize para o caminho correto do seu componente Select
import { Cycle } from "@/interfaces/Cycle";

export const statusOptions = ["Todos", "em andamento", "finalizado"];
export const yearOptions = ["Todos", "2024", "2023", "2022", "2021"];
export const gradeOptions = ["Todas", "5", "4", "3", "2", "1"];
// export const dateOrderOptions = ["Todas", "Mais recente", "Mais antiga"];

export const columns: ColumnDef<Cycle>[] = [
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <div className="flex items-center gap-2 justify-center">
        <Select onValueChange={(value) => column.setFilterValue(value === "Todos" ? undefined : value)}>
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
    accessorKey: "finalGrade",
    header: ({ column }) => (
      <div className="flex items-center gap-2 justify-center">
        <Select onValueChange={(value) => column.setFilterValue(value === "Todas" ? undefined : value)}>
          <SelectTrigger className="w-auto bg-transparent shadow-none">
            <a><span>Nota final</span></a>
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
  
      const cellValue = row.getValue(columnId);
  
      // Verifica se cellValue é do tipo string antes de tentar converter para número
      const numericValue = typeof cellValue === 'string' ? parseFloat(cellValue) : cellValue;
  
      if (isNaN(numericValue as number)) {
        return false; // Se não for um número válido, não filtra
      }
  
      const firstDigit = Math.floor(numericValue as number); // Arredonda para o primeiro dígito
  
      return String(firstDigit) === filterValue;
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <div className="flex items-center gap-2 justify-center">
        <Select onValueChange={(value) => column.setFilterValue(value === "Todos" ? undefined : value)}>
          <SelectTrigger className="w-auto bg-transparent shadow-none">
            <a><span>Data de finalização</span></a>
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
    accessorKey: "status",
    header: ({ column }) => (
      <div className="flex items-center gap-2 justify-center">
        <Select onValueChange={(value) => column.setFilterValue(value === "Todos" ? undefined : value)}>
          <SelectTrigger className="w-auto bg-transparent shadow-none text-textoCor">
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
    cell: ({ cell }) => {
      const status = cell.getValue() as boolean;
      return (
        <span className={status ? 'bg-yellow-100 px-2 py-1 rounded' : 'bg-green-100 px-2 py-1 rounded'}>
          {status ? 'Em andamento' : 'Finalizado'}
        </span>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      const status = row.getValue(columnId) as boolean;
      if (filterValue === "em andamento") return status === true;
      if (filterValue === "finalizado") return status === false;
      return true;
    },
  },
];
