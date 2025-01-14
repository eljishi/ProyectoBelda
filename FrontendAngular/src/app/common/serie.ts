export interface ApiResponseSeries {
  status: string
  data: Serie[]
}
export interface ApiResponseSerie {
  status: string
  data: Serie
}
export interface ApiResponseSerieSinopsis {
  status: string
  data: string
}
export interface ApiResponseMessage {
  status: string,
  message: string
}

export interface Serie {
  _id: string
  id: string
  titulo: string
  categorias: string[]
  capitulos: number
  emision: string
  sinopsis: string
}
