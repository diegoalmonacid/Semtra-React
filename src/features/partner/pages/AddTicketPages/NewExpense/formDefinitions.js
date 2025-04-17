
export const formAttributes = {
    "prescription": {
        fields: [
            {
                key: 'date',
                label: 'Fecha de la receta',
                type: 'date',
            },
            {
                key: 'docNumber',
                label: 'Número de la boleta',
                type: 'text',
            },
            {
                key: 'description',
                label: 'Detalles de la receta',
                type: 'text',
            },
            {
                key: 'quantity',
                label: 'Cantidad',
                type: 'number',
            },
            {
                key: 'unitPrice',
                label: 'Precio Unitario',
                type: 'number',
            },
            {
                key: 'doctorName',
                label: 'Nombre del Doctor',
                type: 'text',
            },
            {
                key: 'patientPartnerRelationship',
                label: 'Parentesco del paciente respecto al socio',
                type: 'text',
            }
        ]
    },
    "general": {
        fields: [
            {
              key: 'docNumber',
              label: 'Número de documento',
              type: 'text',
            },
            {
                key: 'partnerPayment',
                label: 'Pagado por el socio (Copago)',
                type: 'number',
            },
            {
                key: 'date',
                label: 'Fecha',
                type: 'date',
            }
        ]
    }
}

export const formularyTypes = {
    "Prestaciones Médicas": "general",
    "Servicio Dental": "general",
    "Aparatos Accesorios": "general",
    "Nacimiento": "general",
    "Fallecimiento": "general",
    "Recetas Médicas": "prescription"
}