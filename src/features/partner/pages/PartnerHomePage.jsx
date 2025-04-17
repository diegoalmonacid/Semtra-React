import { Table } from "../../../components/specific/Tablev2/Table";
import { getArancel } from "../../../services/api";
import { useEffect, useState } from "react";
import { Tooltip } from "../../../components/ui/Tooltip";

const toolTips = {
    "Consultas Médicas": "Consulta con médico general o especialista.",
    "Atenciones Médicas": "psicólogos, psicopedagogos, fonoaudiólogos, kinesiólogos, enfermeras universitarias, obstetras y practicantes",
    "Psiquiatría": "Consulta con psiquiatra.",
    "Recetas Médicas": "Tambien incluye insumos de atenciones urgencia, de pabellón de yeso, de examenes y radiografías",
    "Hospitalizaciones": "Hospitalizaciones en clínicas y hospitales",
    "Intervención Quirúrgica y Derecho a Pabellón": "Incluye insumos y médicamentos utilizados en la intervención quirúrgica",
    "Servicio Dental": "radiografías dentales se imputan al item Exámenes y Radiografías",
    "Aparatos Accesorios": "Los reembolsos son una vez al año por mismo diagnóstico para cristales, en marcos son una vez al año por socio, por cada carga familiar y por cada socio jubilado.",
    "Nacimiento": "Incluye parto normal y cesárea",
    "Fallecimiento": "Incluye gastos funerarios pagados",
}
const col = [
    { key: 'type', label: 'Tipo' },
    { key: 'total', label: 'Total' , render: (item) => item.total.toLocaleString('es-CL') },
    { key: 'utilizado', label: 'Disponible', render: (item) => (item.total - item.utilizado)?.toLocaleString('es-CL') || "-"  },
    { key: 'diasRestantesSocio', label: 'Días Restantes Socio' },
    { key: 'diasRestantesCarga', label: 'Días Restantes Carga' },
]



export const PartnerHomePage = () => {
    const [arancel, setArancel] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const result = await getArancel();
            setArancel(result[0]?.arancel);
        };
        fetchData();
    }, []);
    return (
        <div>
            <h1>Portal del Asociado</h1>
            <p className="mt-8 mb-4">En esta tabla se presenta información actualizada sobre su arancel. 
                Los ítems que contienen un valor numérico en la columna "Disponible" 
                corresponden a los topes anuales establecidos para cada tipo de gasto médico.
            </p>
            <div className="h-[80%] overflow-auto pr-2 relative" style={{ maxHeight: '75vh' }}>
                {Object.keys(arancel ?? {})?.map((key, index) => {
                    const category = key;
                    const items = arancel[key];
                    const keys = items?.map(item => {
                        return item ? Object.keys(item) : null;
                    })?.flat().filter((value, index, self) => self.indexOf(value) === index);
                    const localCol = col.filter(column => keys.includes(column.key));
                    return (
                        <div className="z-50 " key={index}>
                            <Tooltip text={toolTips[category]}>
                                <h2 className="font-bold text-center text-xl p-2 border-y-2 border-black">{category}</h2>
                            </Tooltip>
                            <Table className={""} data={items} columns={localCol} />
                        </div>
                    );
                }
                )}
            </div>
        </div>
    );

};