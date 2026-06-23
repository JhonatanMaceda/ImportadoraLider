export interface Pedido {
  id?: number
  codigo: string
  cliente: string
  telefono: string
  total: number
  estado?: string
}