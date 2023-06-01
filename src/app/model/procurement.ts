
export interface Procurement {
  id: string
  procuring_entity_pi_b: string
  procurement_plan_id: string
  start_date: Date
  end_date: Date
  procurement_name: string
  description: string
  winner_id?: string
}
// [{
//   "id": "b9226502-ed69-4ec5-92d0-6c9941290759",
//   "procuring_entity_pi_b": "500000",
//   "procurement_plan_id": "",
//   "start_date": "2023-06-01T00:00:00Z",
//   "end_date": "2023-06-29T22:00:00.000Z",
//   "procurement_name": "Купујем шармгарепе",
//   "description": "Купујем 100кг шаргарепа",
//   "winner_id": ""
// }]
