import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { EqProps } from "@/interfaces/Equalizations";
import { User } from "@/interfaces/User";
import api from "@/services/axiosConfig";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import {
  columns as defaultColumns
} from "./columns"; // Atualize para o caminho correto do seu arquivo columns

interface DataTableProps {
  columns?: ColumnDef<User, any>[];
  data: User[];
  idCycleEqParam: string | number; 
  isFinishedParam: string | boolean;

}

export function CycleControlTable({ columns = defaultColumns, data, idCycleEqParam, isFinishedParam }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [equalizations, setEqualizations] = useState<{ [key: number]: EqProps }>({});

  const navigate = useNavigate();

  useEffect(() => {
    const verificarEqualizacaoJaRealizada = async (cycleEqId: number | string, idEvaluated: number) => {
      if (typeof cycleEqId === 'string') {
          cycleEqId = +cycleEqId; // Converte a string para número
      }

      try {
          const response = await api.get(`/api/equalization/cycle/${cycleEqId}`);
          return response.data;
      } catch (error) {
          console.error('Erro ao buscar equalizações:', error);
          return [];
      }
    };

    const fetchEqualizations = async () => {
      try {
        const results = await Promise.all(
          data.map((colab) => verificarEqualizacaoJaRealizada(idCycleEqParam, colab.id))
        );

        const equalizationMap: { [key: number]: EqProps } = {};
        results.forEach((result, index) => {
          const foundEqualization = result.find((eq: EqProps) => eq.evaluatedId === data[index].id);
          if (foundEqualization) {
            equalizationMap[data[index].id] = foundEqualization;
          }
        });

        setEqualizations(equalizationMap);
      } catch (error) {
        console.error('Erro ao buscar equalizações:', error);
      }
    };

    fetchEqualizations();
  }, [data, idCycleEqParam]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting
    },
  });

  return (
    <div className="rounded-md">
      <div className="flex justify-between py-4">
        <h1 className="text-cinzaAlt font-semibold text-xl pl-12 pt-3">Selecione o colaborador</h1>
        <div className="flex">
          <Input
            placeholder="Pesquise o nome do colaborador"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="bg-azulBackground border-none w-[512px] focus:outline-none focus:border-roxoPrincipal mr-28"
          />
        </div>
      </div>
      
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
                  const isStatusCell = cell.column.id === 'status';
                  const sector = row.original.sector;
                  const idColab = row.original.id;
                  const position = row.original.position;
                  const profile = row.original.name;
                  const profilePhoto = row.original.profilePhoto;
                  const equalization = equalizations[idColab];
                  const isFinished = !equalization;

                  return (
                    <TableCell key={cell.id}>
                      {isStatusCell ? (
                        <span className={isFinished ? 'bg-red-50 text-red-800 px-2 py-1 rounded mr-6 w-44 flex justify-center' : 'bg-finished text-verde px-2 py-1 rounded mr-6 w-28 flex justify-center w-44'}>
                            {isFinished ? 'Não iniciado' : 'Finalizado'}
                        </span>
                      ) : (columnId === "grade") ? (
                        <span className="text-cinzaClaro text-sm mr-14">{equalization ? equalization.finalGrade : "-"}</span>
                      ) : (columnId === "sector") ? (
                        <span className="text-cinzaClaro text-sm w-72 ml-2 flex">{sector}</span>
                      ) : (columnId === "role") ? (
                        <span className="text-cinzaClaro text-sm w-64 flex">{position}</span>
                      ) : (
                        <div className="flex gap-2 w-80 py-5 pl-6">
                          <img src={profilePhoto} alt="Foto de perfil" className="w-12 h-12 rounded-full" />
                          <div className="flex flex-col justify-center">
                            <p>{profile}</p>
                          </div>
                        </div>
                      )}
                      <ChevronRightIcon onClick={() => navigate(`/equalizacao?idCycleEqParam=${idCycleEqParam}&isFinishedParam=${isFinished}&colabId=${idColab}`)} className="absolute right-12 text-roxoPrincipal mt-4 mr-10 top-5 cursor-pointer size-7"/>
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
