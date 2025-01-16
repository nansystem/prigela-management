export type Supplier = {
  id: string
  name: string
  url: string
  createdAt?: string
}

export type NewSupplier = Omit<Supplier, 'id' | 'createdAt'>
export type SupplierField = keyof Supplier
