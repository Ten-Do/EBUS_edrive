export interface IRout {
  Id: number
  Lengths: number | null
  Length: number | null
  Number: string
  Path: string
  Stations: {
    ID: number
    Name: string
    Lat: number
    Lon: number
    Routes: any
  }[]
  Time: number[]
}

export interface IRoutData {
  id: number
  number: string
}
