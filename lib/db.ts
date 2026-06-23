import { supabase } from './supabase'
import type { Persona, PaymentsMap, RegaloIdea } from '@/types'

// ─── PERSONAS ───────────────────────────────────────────────

/** Trae todas las personas ordenadas por mes/día, incluyendo sus ideas de regalo */
export async function getPersonas(): Promise<Persona[]> {
  const { data, error } = await supabase
    .from('personas')
    .select('*, regalo_ideas(id, descripcion, enlace, orden)')
    .order('mes', { ascending: true })
    .order('dia', { ascending: true })

  if (error) throw error
  return (data ?? []).map(p => ({
    ...p,
    regalo_ideas: (p.regalo_ideas ?? []).sort((a: RegaloIdea, b: RegaloIdea) => (a.orden ?? 0) - (b.orden ?? 0)),
  }))
}

interface PersonaInput {
  nombre: string
  dia: number
  mes: number
  signo: string
  emoji_signo: string
  color: string
  foto_url: string | null
  telefono: string | null
  regalo_ideas: Array<{ descripcion: string; enlace: string }>
}

/** Crea una persona nueva + sus ideas de regalo */
export async function createPersona(input: PersonaInput): Promise<Persona> {
  const { regalo_ideas, ...personaData } = input

  const { data: persona, error: pErr } = await supabase
    .from('personas')
    .insert(personaData)
    .select()
    .single()

  if (pErr) throw pErr

  if (regalo_ideas.length > 0) {
    await saveRegaloIdeas(persona.id, regalo_ideas)
  }

  return { ...persona, regalo_ideas }
}

/** Actualiza una persona + reemplaza sus ideas de regalo */
export async function updatePersona(id: number, input: PersonaInput): Promise<void> {
  const { regalo_ideas, ...personaData } = input

  const { error: pErr } = await supabase
    .from('personas')
    .update(personaData)
    .eq('id', id)

  if (pErr) throw pErr

  // Borra las ideas antiguas y vuelve a insertar
  await supabase.from('regalo_ideas').delete().eq('persona_id', id)
  if (regalo_ideas.length > 0) {
    await saveRegaloIdeas(id, regalo_ideas)
  }
}

/** Elimina una persona (cascade borra aportes y regalo_ideas) */
export async function deletePersona(id: number): Promise<void> {
  const { error } = await supabase.from('personas').delete().eq('id', id)
  if (error) throw error
}

async function saveRegaloIdeas(
  personaId: number,
  ideas: Array<{ descripcion: string; enlace: string }>
) {
  const rows = ideas.map((idea, i) => ({
    persona_id: personaId,
    descripcion: idea.descripcion,
    enlace: idea.enlace,
    orden: i,
  }))
  const { error } = await supabase.from('regalo_ideas').insert(rows)
  if (error) throw error
}

// ─── APORTES ────────────────────────────────────────────────

/**
 * Trae todos los aportes y los transforma al mapa
 * payments[cumpleanero_id][aportante_id] = boolean
 */
export async function getAportes(): Promise<PaymentsMap> {
  const { data, error } = await supabase
    .from('aportes')
    .select('aportante_id, cumpleanero_id, pagado')

  if (error) throw error

  const map: PaymentsMap = {}
  for (const row of data ?? []) {
    if (!map[row.cumpleanero_id]) map[row.cumpleanero_id] = {}
    map[row.cumpleanero_id][row.aportante_id] = row.pagado
  }
  return map
}

/** Upsert del estado de un aporte */
export async function toggleAporte(
  cumpleaneroId: number,
  aportanteId: number,
  pagado: boolean
): Promise<void> {
  const { error } = await supabase
    .from('aportes')
    .upsert(
      { cumpleanero_id: cumpleaneroId, aportante_id: aportanteId, pagado },
      { onConflict: 'aportante_id,cumpleanero_id' }
    )
  if (error) throw error
}

/** Marca todos los aportes de un cumpleañero como pagados */
export async function marcarTodoPagado(cumpleaneroId: number): Promise<void> {
  const { error } = await supabase
    .from('aportes')
    .update({ pagado: true })
    .eq('cumpleanero_id', cumpleaneroId)
  if (error) throw error
}

// ─── STORAGE (Fotos de perfil) ───────────────────────────────

/**
 * Sube una imagen al bucket 'fotos-perfil' y devuelve la URL pública.
 * Si personaId ya tenía foto, la sobreescribe.
 */
export async function uploadFoto(personaId: number, file: File): Promise<string> {
  const ext  = file.name.split('.').pop()
  const path = `${personaId}.${ext}`

  const { error: upErr } = await supabase.storage
    .from('fotos-perfil')
    .upload(path, file, { upsert: true })

  if (upErr) throw upErr

  const { data } = supabase.storage.from('fotos-perfil').getPublicUrl(path)
  // Agrega un timestamp para forzar cache-bust en el navegador
  return `${data.publicUrl}?t=${Date.now()}`
}

/** Actualiza solo el campo foto_url de una persona */
export async function updateFotoUrl(id: number, foto_url: string | null): Promise<void> {
  const { error } = await supabase
    .from('personas')
    .update({ foto_url })
    .eq('id', id)
  if (error) throw error
}

/** Elimina la foto de una persona del bucket */
export async function deleteFoto(personaId: number): Promise<void> {
  // Intenta borrar .jpg, .png, .webp (sin importar extensión)
  const extensions = ['jpg', 'jpeg', 'png', 'webp', 'gif']
  await Promise.allSettled(
    extensions.map(ext =>
      supabase.storage.from('fotos-perfil').remove([`${personaId}.${ext}`])
    )
  )
}
