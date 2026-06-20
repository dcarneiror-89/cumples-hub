export interface RegaloIdea {
  id?: number
  persona_id?: number
  descripcion: string
  enlace: string
  orden?: number
}

export interface Persona {
  id: number
  nombre: string
  dia: number
  mes: number
  signo: string
  emoji_signo: string
  color: string
  foto_url: string | null
  telefono: string | null
  regalo_ideas: RegaloIdea[]
  created_at?: string
}

/** payments[cumpleanero_id][aportante_id] = true | false */
export type PaymentsMap = Record<number, Record<number, boolean>>

export interface AporteRow {
  id: number
  aportante_id: number
  cumpleanero_id: number
  pagado: boolean
}
