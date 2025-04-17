import { useSequencer } from '../../../../components/specific/sequencer/context/SequencerContext';
import { useEffect, useRef, useState } from 'react';
import { HTable } from '../../../../components/specific/HTable/HTable';
import { ImageViewer } from '../../../../components/specific/ImageViewer/ImageViewer';
import { fetchPartner } from '../../../../services/api';
import { acceptExpense, declineExpense } from '../../../../services/api';


export const ReviewExpense = ({role}) => {
    const { internalState, goToPrevStep } = useSequencer();
    const [ selectedImageKey, setSelectedImageKey ] = useState("");
    const [ partner, setPartner ] = useState({});
    const comments = useRef(null);
    const [ showAcceptForm, setShowAcceptForm ] = useState(false);
    const [ showRejectForm, setShowRejectForm ] = useState(false);
    const payment = useRef(null);
    const {expense, ticket} = internalState;
    if (!expense){ goToPrevStep(); return null;}

    useEffect(() => {
        const fetchPartnerData = async () => {
            const partnerId = ticket.partnerId;
            const [localPartner] = await fetchPartner(partnerId);
            const partnerData = {
                name: localPartner?.User?.displayName,
                email: localPartner?.User?.email,
                insurance: localPartner?.HealtInsurance?.name,
                insuranceValidity: localPartner?.insuranceValidity,

            }
            console.log("partner", [partnerData])
            if (!partner) return;
            setPartner(partnerData);
        }
        fetchPartnerData();
    },[])

    const expenseColumnsData = [
        { key: 'Category', label: 'Categoría', render: (expense) => (expense?.Category?.name??'N/A') },
        { key: 'date', label: 'Fecha', render: (expense) => (expense?.date?.split('T')[0]??'N/A') },
        { key: 'partnerPayment', label: 'Copago del Socio', render: (expense) => (expense?.partnerPayment??'N/A') },
        { key: 'docNumber', label: 'Número de Documento', render: ({docNumber}) => (docNumber??'N/A') },
        { key: 'description', label: 'Descripción', render: ({description}) => (description??'N/A') },
        { key: 'quantity', label: 'Cantidad', render: ({quantity}) => (quantity??'N/A') },
        { key: 'unitPrice', label: 'Precio Unitario', render: ({unitPrice}) => (unitPrice??'N/A') },
        { key: 'doctorName', label: 'Nombre del Doctor', render: ({doctorName}) => (doctorName??'N/A') },
        { key: 'patientPartnerRelationship', label: 'Relación Paciente-Socio', render: ({patientPartnerRelationship}) => (patientPartnerRelationship??'N/A') },
        { key: 'payment', label: 'Monto a devolver', render: ({payment}) => (payment??'N/A') },
    ]
    const expenseColumns = expenseColumnsData.filter(column=>expense[column.key]!=null)
    console.log(expense)
    const expenseFields = {
        label: 'DocType.name',
        image: 'name',
        key: 'docId'
    }
    
    const userColumns = [
        { key: 'name', label: 'Nombre' },
        { key: 'email', label: 'Correo Electrónico' },
        { key: 'insurance', label: 'Seguro de Salud' },
        { key: 'insuranceValidity', label: 'Vigencia del Seguro', render : ({insurance, insuranceIsActive}) => insurance&&(insuranceIsActive ? "Vigente" : "Vencido") },
    ]
    return (
        <div className="flex flex-col">
            <div className='flex items-center'>
                <div className="flex gap-4">
                    <div className="border-gray-300 rounded-md border-2 flex flex-col w-[40%]">
                        <h2 className='text-2xl mb-2 mt-2 text-center grow-0 flex-initial h-min'> Detalles del gasto </h2>
                        <div className='flex-initial grow flex flex-col'>
                            <HTable className={'grow'} columns={expenseColumns} data={[expense]}/>
                        </div>
                    </div>
                    <div className=" w-[40%] gap-4 flex flex-col">
                        <div className='border-gray-300 rounded-md border-2'>
                            <h2 className='text-2xl mb-2 mt-2 text-center grow-0'> Detalles del Asociado </h2>
                            <div>
                            <HTable data={[partner]} columns={userColumns} />
                            </div>
                        </div>
                        <div className='grow flex flex-col border-gray-300 rounded-md border-2'>
                        {(expense?.executiveStateId===1 && role!=="user") ? (
                            <>
                                <h2 className='text-2xl mb-2 mt-2 text-center grow-0'>Resolución </h2>
                                <div onClick={e => setShowAcceptForm(prev => !prev)} className='cursor-pointer flex w-full border-t-2 border-black justify-center content-end px-4'>
                                    <h2 className='mb-2 mt-2 text-xl text-center grow-0'
                                    >Aceptar Gasto   <span className='text-base'>▼</span></h2>
                                </div>
                                {showAcceptForm && (<div className='flex items-center justify-center content-center border-gray-300 border-2 py-2 my-4 flex-col gap-2'>
                                        <h2 className='text-center'>Ingrese el monto a devolver </h2>
                                        <input className='border-2 border-black h-8' type="number" ref={payment}/>
                                        <button className='w-[50%] justify-self-center bg-green-300 border-green-500 border-2 hover:bg-green-200 ' onClick={()=>{acceptExpense(expense?.expenseId, payment.current.value);goToPrevStep()}}> Aceptar Gasto </button>
                                    </div>)}

                                <div onClick={e => setShowRejectForm(prev => !prev)} className='cursor-pointer flex w-full border-y-2 border-black justify-center content-end px-4'>
                                    <h2 className='mb-2 mt-2  text-xl text-center grow-0'
                                    >Rechazar Gasto   <span className='text-base'>▼</span></h2>
                                </div>
                                {showRejectForm && (
                                    <div className='flex flex-col items-center justify-center content-center border-gray-300 border-2 py-2 my-4 gap-2'>
                                        <h2 className='text-center'>Ingrese un comentario: </h2>
                                        <textarea
                                        className='w-full bg-white border-gray-500 border-2 rounded-md grow'
                                        name="comments"
                                        id="comments"
                                        rows="4"
                                        ref={comments}
                                        />
                                        <button className='bg-red-300 border-red-500 border-2 hover:bg-red-200 ' onClick={()=>{declineExpense(expense?.expenseId, comments.current.value);goToPrevStep()}}> Rechazar Gasto </button>
                                    </div>
                                )}
                                
                            </>
                        ): (
                            <div className='flex flex-col gap-4 justify-center h-full m-2'>
                                {expense.executiveStateId===3 && <h2 className='p-2'>Comentario: {expense?.executiveComments}</h2>}
                                {expense.executiveStateId===2 && <h2 className='p-2'>Reembolso: {expense?.payment}</h2>}
                                <div className={`p-2 bg-${expense.executiveStateId==2 ? 'green' : expense.executiveStateId==3 ? 'red' : 'gray'}-300`}>
                                <h2>Resolución: {expense?.ExecutiveState?.name}</h2>
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                    <div className="w-[40%] border-gray-300 rounded-md border-2 flex flex-col">
                        <h2 className='text-2xl border-b-2 border-gray-300 p-1 mt-2 text-center grow-0'> Documento </h2>
                        <ImageViewer className={"grow flex flex-col"}  fields={expenseFields} rawData={expense?.Docs} setSelected={setSelectedImageKey} ></ImageViewer>
                        <button
                            disabled={!selectedImageKey}
                            onClick={() => {console.log(selectedImageKey);const selectedImage = expense?.Docs.find(doc=>doc.docId==selectedImageKey).name; window.open(selectedImage, '_blank')}}
                            className={`border-gray-400 bg-gray-200
                                hover:bg-gray-100
                                ${!selectedImageKey ? 'btn-disabled cursor-not-allowed' : ''}`}
                        >
                            Download
                        </button>
                    </div>
                </div>
            
            </div>
            <div>
                
            </div>
        </div>
    )
}