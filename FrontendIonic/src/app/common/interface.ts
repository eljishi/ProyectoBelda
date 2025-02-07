export interface ApiResponseSeries {
  status: string
  data: Serie[]
}
export interface ApiResponseSerie {
  status: string
  data: Serie
}
export interface ApiResponseSerieCategorias {
  status: string
  data: string[]
}
export interface ApiResponseMessage {
  status: string,
  message: string
}
export interface ApiResponseSerieCategoria {
  status: string
  categoria: string
}

export interface Serie {
  _id: string
  id: string
  titulo: string
  categorias: string[]
  imagenes: string[]
  capitulos: number
  emision: string
  sinopsis: string
}
