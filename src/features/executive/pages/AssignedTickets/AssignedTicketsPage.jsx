import { AssignedTicketsTable } from "../../components/AssignedTicketTable";
import { Sequencer } from "../../../../components/specific/sequencer/Sequencer";
import { SelectExpensePage } from "./SelectExpensePage";
import { ReviewExpense } from "./ReviewExpense";

export const AssignedTicketsPage = ({title, }) => {
    const steps = [
        {
            path: 'select-expense',
            label: 'Gastos',
            element: <SelectExpensePage />
        },
        {
            path: 'expenses',
            label: 'Revisar Gasto',
            element: <ReviewExpense />

        }
    ]
    return (
        <Sequencer steps={steps}>
            <div className="flex flex-col justify-between">
                <div className="grow">
                    <AssignedTicketsTable />
                </div>
                <div className="grow">
                    <AssignedTicketsTable filter={{ notExecutiveStateId: 1 }} title={"Tickets Procesados"}/>
                </div>
            </div>
        </Sequencer>
    )
}