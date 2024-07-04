import { Payment, columns } from "./columns"
import { CycleControlTable } from "./data-table"

export default async function DemoPage() {
  const data: Payment[] = [
    {
      id: "m5gr84i9",
      startDate: "2021-10-10",
      endDate: "2021-10-10",
      status: "em andamento",
      grade: 2,
    },
    {
      id: "3u1reuv4",
      startDate: "2021-10-10",
      endDate: "2021-10-10",
      status: "em andamento",
      grade: 3,
    },
    {
      id: "derv1ws0",
      startDate: "2021-10-10",
      endDate: "2021-10-10",
      status: "finalizado",
      grade: 2,
    },
    {
      id: "5kma53ae",
      startDate: "2021-10-10",
      endDate: "2021-10-10",
      status: "em andamento",
      grade: 3,
    },
    {
      id: "bhqecj4p",
      startDate: "2021-10-10",
      endDate: "2021-10-10",
      status: "finalizado",
      grade: 5,
    },
  ]

  return (
    <div className="container mx-auto py-10">
      <CycleControlTable columns={columns} data={data} />
    </div>
  )
}
