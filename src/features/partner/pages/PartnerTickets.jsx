import { Table } from "../../../components/specific/Table";
import { AssignedTicketsTable } from "../../executive/components/AssignedTicketTable";
import { ReviewExpense } from "../../executive/pages/AssignedTickets/ReviewExpense";
import { SelectExpensePage } from "../../executive/pages/AssignedTickets/SelectExpensePage";
import { fetchTicketInfo, columns } from "../services/ticketDecoder";
import { useEffect, useState } from "react";
import { Sequencer } from "../../../components/specific/sequencer/Sequencer";

export const PartnerTickets = () => {

    const steps = [
        {
            path: 'select-expense',
            label: 'Gastos',
            element: <SelectExpensePage role={"user"}/>
        },
        {
            path: 'expenses',
            label: 'Detalles Gasto',
            element: <ReviewExpense role={"user"}/>

        }
    ]


    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchTicketInfo();
            setData(result);
        };

        fetchData();
    }, []);

    return (
        <Sequencer steps={steps}>
                    <div className="flex flex-col justify-between">
                        <div className="grow">
                            <AssignedTicketsTable title={"Solicitudes enviadas "} filter={{}}/>
                        </div>
                    </div>
        </Sequencer>
    );
}