import axios from './axios'

type verificacion = {
    Unidad: string,
    Tipo: String,
    Fecha: string,
    Desde: string,
    Hasta: string
}

export const getVerificaciones = async (values: verificacion) => {
    const response = await axios.get(`/Verificaciones/${values.Unidad}/${values.Fecha}`)
    return response.data
}

export const getVerificacionPorRecibo = async (recibo: string) => {
    const response = await axios.get(`/Verificaciones/buscar-por-verificacion/${recibo}`)
    return response.data
}

export const getVerificacionesRango = async (values: verificacion) => {
    const response = await axios.get(`/Verificaciones/${values.Unidad}/${values.Desde}/${values.Hasta}/${values.Tipo ? (values.Tipo != '0' ? values.Tipo : 'no_ingresado')  : 'no_ingresado'}`)
    return response.data
}

export const sendVerificacion = async (verificacion: any) => {
    const response = await axios.post('/Verificaciones', verificacion)
    return response.data
}

export const editVerificacion = async (verificacion: any) => {

    const response = await axios.put(`/Verificaciones/${verificacion.Id}`, verificacion)
    return response.data
}

export const deleteVerificacion = async (id: number) => {
    const response = await axios.delete(`/Verificaciones/${id}`)
    return response.data
}

