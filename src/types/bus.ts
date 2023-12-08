export interface IBus {
  driver: {
    email: string
    firstName: string
    id: string
    lastName: string
    username: string
  }
  id: number
  number: string
  route: {
    id: number
    number: string
    path: string
    stations: [
      {
        id: number
        lat: number
        lon: number
        name: string
        routes: string[]
      },
    ]
  }
  routeID: number
  status: string
}

export interface IBusData {
  number: string
  rout: string
  status: string
  driver: string
}
