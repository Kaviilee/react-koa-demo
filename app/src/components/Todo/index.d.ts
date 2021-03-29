export interface Item {
  content: string
  id: number
  status: number | boolean
  user_id: number
}

export type todoProps = {
  content: string
  status: boolean | number
}

export interface FinishProps {
  itemInfo: Item
  index: number
  onBack: (item: Item) => void
}

export type User = {
  name: string
  id: number
}
