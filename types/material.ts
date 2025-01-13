export type Material = {
  id: string
  name: string
  unit_quantity: number
  unit_type: string
  price: number
  createdAt?: string
}
export type NewMaterial = Omit<Material, 'id' | 'createdAt'>
