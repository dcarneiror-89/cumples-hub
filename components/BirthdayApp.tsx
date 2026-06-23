'use client'
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import type { Persona, PaymentsMap } from '@/types'
import * as db from '@/lib/db'

// ─── ICONOS SVG ───────────────────────────────────────────────
const IconCake = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-4v4m3-4v2M9 12h.01M12 12h.01M15 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)
const IconGift = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
  </svg>
)
const IconCheck = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)
const IconChevronLeft = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
)
const IconChevronRight = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
)
const IconSparkles = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
)
const IconParty = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
const IconLink = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
)
const IconSearch = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)
const IconDatabase = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
)
const IconEdit = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)
const IconUserAdd = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
)
const IconTrash = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)
const IconCamera = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

// ─── CONSTANTES ───────────────────────────────────────────────
const PRESET_COLORS = [
  { name: 'Azulito',  value: 'from-blue-400 to-indigo-500' },
  { name: 'Amarillo', value: 'from-yellow-400 to-amber-500' },
  { name: 'Rojo',     value: 'from-red-400 to-rose-600' },
  { name: 'Verde',    value: 'from-emerald-400 to-teal-500' },
  { name: 'Rosa',     value: 'from-pink-400 to-rose-500' },
  { name: 'Violeta',  value: 'from-purple-400 to-violet-500' },
  { name: 'Naranja',  value: 'from-orange-400 to-amber-500' },
  { name: 'Cyan',     value: 'from-cyan-400 to-blue-500' },
]

const MONTH_NAMES = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
]

function getZodiacInfo(day: number, month: number) {
  const d = day, m = month
  if ((m===3&&d>=21)||(m===4&&d<=19)) return { sign:'Aries',      emoji:'♈' }
  if ((m===4&&d>=20)||(m===5&&d<=20)) return { sign:'Tauro',      emoji:'♉' }
  if ((m===5&&d>=21)||(m===6&&d<=20)) return { sign:'Géminis',    emoji:'♊' }
  if ((m===6&&d>=21)||(m===7&&d<=22)) return { sign:'Cáncer',     emoji:'♋' }
  if ((m===7&&d>=23)||(m===8&&d<=22)) return { sign:'Leo',        emoji:'♌' }
  if ((m===8&&d>=23)||(m===9&&d<=22)) return { sign:'Virgo',      emoji:'♍' }
  if ((m===9&&d>=23)||(m===10&&d<=22)) return { sign:'Libra',     emoji:'♎' }
  if ((m===10&&d>=23)||(m===11&&d<=21)) return { sign:'Escorpio', emoji:'♏' }
  if ((m===11&&d>=22)||(m===12&&d<=21)) return { sign:'Sagitario',emoji:'♐' }
  if ((m===12&&d>=22)||(m===1&&d<=19)) return { sign:'Capricornio',emoji:'♑' }
  if ((m===1&&d>=20)||(m===2&&d<=18)) return { sign:'Acuario',   emoji:'♒' }
  return { sign:'Piscis', emoji:'♓' }
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────
export default function BirthdayApp() {
  const CURRENT_MONTH = new Date().getMonth() + 1

  const [team, setTeam] = useState<Persona[]>([])
  const [payments, setPayments] = useState<PaymentsMap>({})
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'home'|'regalos'|'planilla'>('home')
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null)
  const [theme, setTheme] = useState<'dark'|'light'>('dark')
  const [showConfettiSplash, setShowConfettiSplash] = useState(false)
  const [celebratedId, setCelebratedId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'todos'|'completados'|'pendientes'>('todos')

  // Formulario
  const [isEditing, setIsEditing]     = useState(false)
  const [editingPersonId, setEditingPersonId] = useState<number | null>(null)
  const [formName, setFormName]       = useState('')
  const [formDay, setFormDay]         = useState(1)
  const [formMonth, setFormMonth]     = useState(new Date().getMonth() + 1)
  const [formSign, setFormSign]       = useState('Géminis')
  const [formEmoji, setFormEmoji]     = useState('♊')
  const [formColor, setFormColor]     = useState('from-blue-400 to-indigo-500')
  const [formPhone, setFormPhone]     = useState('')
  const [formGiftText1, setFormGiftText1] = useState('')
  const [formGiftLink1, setFormGiftLink1] = useState('')
  const [formGiftText2, setFormGiftText2] = useState('')
  const [formGiftLink2, setFormGiftLink2] = useState('')
  const [formGiftText3, setFormGiftText3] = useState('')
  const [formGiftLink3, setFormGiftLink3] = useState('')
  // Foto: File para subir, string para preview (URL o base64)
  const [formPhotoFile, setFormPhotoFile] = useState<File | null>(null)
  const [formPhotoPreview, setFormPhotoPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging]   = useState(false)

  const [searchAdminQuery, setSearchAdminQuery] = useState('')
  const [adminNotification, setAdminNotification] = useState<{msg:string,type:string}|null>(null)
  const [personToDelete, setPersonToDelete] = useState<Persona | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [formExpanded, setFormExpanded] = useState(false)

  // ── Cargar datos al montar ──────────────────────────────────
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [personas, aportes] = await Promise.all([
        db.getPersonas(),
        db.getAportes(),
      ])
      setTeam(personas)
      setPayments(aportes)
    } catch (e) {
      console.error(e)
      showNotification('Error al cargar datos de Supabase', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  // Recalcular signo al cambiar día/mes
  useEffect(() => {
    const z = getZodiacInfo(formDay, formMonth)
    setFormSign(z.sign)
    setFormEmoji(z.emoji)
  }, [formDay, formMonth])

  // ── Helpers ────────────────────────────────────────────────
  const playSoundEffect = (type: 'tap'|'complete') => {
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext
      if (!AC) return
      const ctx = new AC()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      if (type === 'tap') {
        osc.type = 'sine'
        osc.frequency.setValueAtTime(280, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.08)
        gain.gain.setValueAtTime(0.04, ctx.currentTime)
        osc.start(); osc.stop(ctx.currentTime + 0.08)
      } else {
        osc.type = 'sine'
        osc.frequency.setValueAtTime(330, ctx.currentTime)
        osc.frequency.setValueAtTime(392, ctx.currentTime + 0.1)
        osc.frequency.setValueAtTime(523, ctx.currentTime + 0.2)
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.3)
        gain.gain.setValueAtTime(0.06, ctx.currentTime)
        osc.start(); osc.stop(ctx.currentTime + 0.45)
      }
    } catch {}
  }

  const handleCopyLink = (url: string) => {
    try {
      const el = document.createElement('input')
      document.body.appendChild(el)
      el.value = url
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      showNotification('¡Enlace copiado!', 'success')
    } catch {
      showNotification('Error al copiar enlace', 'error')
    }
  }

  const showNotification = (msg: string, type: string) => {
    setAdminNotification({ msg, type })
    setTimeout(() => setAdminNotification(null), 4000)
  }

  const getPaidCount = (personId: number) =>
    Object.values(payments[personId] ?? {}).filter(Boolean).length

  const isFullyPaid = (personId: number) =>
    getPaidCount(personId) === team.length - 1

  const triggerCelebration = (id: number) => {
    playSoundEffect('complete')
    setCelebratedId(id)
    setShowConfettiSplash(true)
    setTimeout(() => { setCelebratedId(null); setShowConfettiSplash(false) }, 2800)
  }

  // ── Toggle de aporte (optimistic update) ───────────────────
  const handleTogglePayment = async (targetId: number, contributorId: number) => {
    const currentStatus = payments[targetId]?.[contributorId] ?? false
    const newStatus = !currentStatus
    playSoundEffect('tap')

    // Optimistic update
    const updatedForTarget = { ...payments[targetId], [contributorId]: newStatus }
    setPayments(prev => ({ ...prev, [targetId]: updatedForTarget }))

    const fullyPaidNow = Object.values(updatedForTarget).filter(Boolean).length === team.length - 1
    if (fullyPaidNow && !currentStatus) {
      setTimeout(() => triggerCelebration(targetId), 350)
    }

    // Persist
    try {
      await db.toggleAporte(targetId, contributorId, newStatus)
    } catch {
      // Revertir en caso de error
      setPayments(prev => ({ ...prev, [targetId]: { ...prev[targetId], [contributorId]: currentStatus } }))
      showNotification('Error al guardar aporte', 'error')
    }
  }

  // ── Completar vaca (marcar todos como pagados) ──────────────
  const handleCompletarVaca = async (personId: number) => {
    const fullyPaid: Record<number,boolean> = {}
    team.forEach(t => { if (t.id !== personId) fullyPaid[t.id] = true })

    setPayments(prev => ({ ...prev, [personId]: fullyPaid }))
    triggerCelebration(personId)

    try {
      await db.marcarTodoPagado(personId)
    } catch {
      showNotification('Error al guardar cambios', 'error')
      await loadData() // recargar estado real
    }
  }

  // ── Foto handlers ───────────────────────────────────────────
  const handlePhotoSelect = (file: File) => {
    setFormPhotoFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setFormPhotoPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleDragOver  = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = () => setIsDragging(false)
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file?.type.startsWith('image/')) {
      handlePhotoSelect(file)
      showNotification('¡Foto cargada!', 'success')
    } else {
      showNotification('Arrastra un archivo de imagen válido', 'error')
    }
  }

  // ── Guardar persona ────────────────────────────────────────
  const handleSavePerson = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim()) { showNotification('Ingresa un nombre', 'error'); return }
    playSoundEffect('tap')
    setIsSaving(true)

    const gifts = [
      { descripcion: formGiftText1.trim(), enlace: formGiftLink1.trim() },
      { descripcion: formGiftText2.trim(), enlace: formGiftLink2.trim() },
      { descripcion: formGiftText3.trim(), enlace: formGiftLink3.trim() },
    ].filter(g => g.descripcion || g.enlace)

    try {
      if (isEditing && editingPersonId !== null) {
        // Subir foto si hay una nueva
        let foto_url = team.find(p => p.id === editingPersonId)?.foto_url ?? null
        if (formPhotoFile) {
          foto_url = await db.uploadFoto(editingPersonId, formPhotoFile)
        }

        await db.updatePersona(editingPersonId, {
          nombre: formName.trim(),
          dia: formDay,
          mes: formMonth,
          signo: formSign,
          emoji_signo: formEmoji,
          color: formColor,
          foto_url,
          telefono: formPhone.trim() || null,
          regalo_ideas: gifts,
        })
        showNotification(`${formName} actualizado`, 'success')
      } else {
        // Crear persona primero para obtener el id
        const newPersona = await db.createPersona({
          nombre: formName.trim(),
          dia: formDay,
          mes: formMonth,
          signo: formSign,
          emoji_signo: formEmoji,
          color: formColor,
          foto_url: null,
          telefono: formPhone.trim() || null,
          regalo_ideas: gifts,
        })

        // Subir foto si hay una
        if (formPhotoFile) {
          const foto_url = await db.uploadFoto(newPersona.id, formPhotoFile)
          await db.updatePersona(newPersona.id, {
            nombre: newPersona.nombre,
            dia: newPersona.dia,
            mes: newPersona.mes,
            signo: newPersona.signo,
            emoji_signo: newPersona.emoji_signo,
            color: newPersona.color,
            foto_url,
            telefono: newPersona.telefono,
            regalo_ideas: gifts,
          })
        }
        showNotification(`¡${formName} agregado!`, 'success')
      }

      await loadData()
      resetForm()
    } catch (err) {
      console.error(err)
      showNotification('Error al guardar', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const handleStartEdit = (person: Persona) => {
    playSoundEffect('tap')
    setIsEditing(true)
    setEditingPersonId(person.id)
    setFormName(person.nombre)
    setFormDay(person.dia)
    setFormMonth(person.mes)
    setFormSign(person.signo)
    setFormEmoji(person.emoji_signo)
    setFormColor(person.color)
    setFormPhone(person.telefono ?? '')
    setFormPhotoFile(null)
    setFormPhotoPreview(person.foto_url ?? null)
    setFormGiftText1(person.regalo_ideas[0]?.descripcion ?? '')
    setFormGiftLink1(person.regalo_ideas[0]?.enlace ?? '')
    setFormGiftText2(person.regalo_ideas[1]?.descripcion ?? '')
    setFormGiftLink2(person.regalo_ideas[1]?.enlace ?? '')
    setFormGiftText3(person.regalo_ideas[2]?.descripcion ?? '')
    setFormGiftLink3(person.regalo_ideas[2]?.enlace ?? '')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const confirmDeletePerson = async () => {
    if (!personToDelete) return
    const { id, nombre } = personToDelete
    try {
      await db.deletePersona(id)
      if (editingPersonId === id) resetForm()
      setPersonToDelete(null)
      showNotification(`${nombre} eliminado`, 'info')
      await loadData()
    } catch {
      showNotification('Error al eliminar', 'error')
    }
  }

  const resetForm = () => {
    setIsEditing(false); setEditingPersonId(null)
    setFormName(''); setFormDay(1); setFormMonth(new Date().getMonth() + 1)
    setFormColor('from-blue-400 to-indigo-500'); setFormPhone('')
    setFormGiftText1(''); setFormGiftLink1('')
    setFormGiftText2(''); setFormGiftLink2('')
    setFormGiftText3(''); setFormGiftLink3('')
    setFormPhotoFile(null); setFormPhotoPreview(null); setIsDragging(false); setFormExpanded(false)
  }

  // ── Memos ──────────────────────────────────────────────────
  const globalStats = useMemo(() => {
    const hoy = new Date()
    const mesHoy = hoy.getMonth() + 1
    const diaHoy = hoy.getDate()

    const cumpleYaPaso = (mes: number, dia: number) =>
      mes < mesHoy || (mes === mesHoy && dia <= diaHoy)

    let cumplesPasados = 0, cumplesPorVenir = 0
    let pagosPendientesEnPasados = 0

    team.forEach(p => {
      const paso = cumpleYaPaso(p.mes, p.dia)
      if (paso) {
        cumplesPasados++
        const pendientesDeEste = (team.length - 1) - getPaidCount(p.id)
        pagosPendientesEnPasados += pendientesDeEste
      } else {
        cumplesPorVenir++
      }
    })

    return { cumplesPasados, cumplesPorVenir, pagosPendientesEnPasados }
  }, [team, payments])

  const currentMonthBirthdays = useMemo(
    () => team.filter(p => p.mes === CURRENT_MONTH).sort((a,b) => a.dia - b.dia),
    [team, CURRENT_MONTH]
  )

  const filteredTeam = useMemo(() => team.filter(p => {
    const match = p.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    if (statusFilter === 'completados') return match && isFullyPaid(p.id)
    if (statusFilter === 'pendientes')  return match && !isFullyPaid(p.id)
    return match
  }), [team, payments, searchQuery, statusFilter])

  const filteredAdminTeam = useMemo(
    () => team.filter(p => p.nombre.toLowerCase().includes(searchAdminQuery.toLowerCase())),
    [team, searchAdminQuery]
  )

  // ── Loading screen ─────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-4xl animate-bounce">🎂</div>
          <p className="text-slate-400 font-bold text-sm">Cargando cumpleaños...</p>
        </div>
      </div>
    )
  }

  // ── RENDER ─────────────────────────────────────────────────
  return (
    <div className={`min-h-screen font-sans antialiased selection:bg-rose-500 selection:text-white transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    } flex flex-col md:flex-row`}>

      {/* Sidebar — solo desktop */}
      <aside className={`hidden md:flex md:w-72 shrink-0 md:border-r flex-col z-30 ${
        theme === 'dark' ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white'
      }`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-800/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-500">
              <IconCake className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <span className={`font-black text-lg ${theme==='dark'?'text-white':'text-slate-900'}`}>Cumples</span>
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">del Mejor HUB!</span>
            </div>
          </div>
          <button onClick={() => { playSoundEffect('tap'); setTheme(t => t==='dark'?'light':'dark') }}
            className={`p-2 rounded-xl transition-all hover:scale-105 ${theme==='dark'?'bg-slate-800 text-amber-400':'bg-slate-100 text-slate-600'}`}>
            {theme==='dark'?'☀️':'🌙'}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {(['home','regalos','planilla'] as const).map(tab => (
            <button key={tab} onClick={() => { playSoundEffect('tap'); setActiveTab(tab); setSelectedPersonId(null) }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                activeTab===tab ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}>
              {tab==='home'    && <><IconCake className="w-5 h-5" /><span>Inicio & Festejos</span></>}
              {tab==='regalos' && <><IconGift className="w-5 h-5" /><span>Gestión de Regalos</span><span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">{team.length}</span></>}
              {tab==='planilla'&& <><IconDatabase className="w-5 h-5" /><span>Gestionar Planilla</span></>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Bottom tab bar — solo mobile */}
      <nav className={`fixed bottom-0 left-0 right-0 md:hidden z-40 border-t ${
        theme==='dark' ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
      } backdrop-blur-md`}>
        <div className="flex items-stretch h-16">
          {(['home','regalos','planilla'] as const).map(tab => (
            <button key={tab} onClick={() => { playSoundEffect('tap'); setActiveTab(tab); setSelectedPersonId(null) }}
              className={`flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-bold transition-all ${
                activeTab===tab ? 'text-rose-500' : 'text-slate-500'
              }`}>
              {tab==='home'     && <><IconCake className="w-5 h-5"/><span>Inicio</span></>}
              {tab==='regalos'  && <><IconGift className="w-5 h-5"/><span>Regalos</span></>}
              {tab==='planilla' && <><IconDatabase className="w-5 h-5"/><span>Planilla</span></>}
              {activeTab===tab && <span className="absolute bottom-1 w-1 h-1 rounded-full bg-rose-500"/>}
            </button>
          ))}
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto pb-16 md:pb-0">
        <header className={`px-6 lg:px-8 py-5 border-b flex items-center justify-between backdrop-blur-md z-20 ${
          theme==='dark'?'border-slate-800 bg-slate-900/40':'border-slate-200 bg-white/80'
        }`}>
          <div>
            {selectedPersonId !== null ? (
              <button onClick={() => { playSoundEffect('tap'); setSelectedPersonId(null) }}
                className="flex items-center gap-2 text-sm font-bold text-rose-500 bg-rose-500/10 px-4 py-2 rounded-xl">
                <IconChevronLeft className="w-4 h-4" /><span>Volver a la Lista</span>
              </button>
            ) : (
              <h2 className="text-xl font-black">
                {activeTab==='home'    && 'Cumpleaños HUB'}
                {activeTab==='regalos' && 'Centro de Regalos Colectivos'}
                {activeTab==='planilla'&& 'Base de Datos del Equipo'}
              </h2>
            )}
          </div>
          <div className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-400">
            Mes actual: <span className="text-rose-500 font-extrabold">{MONTH_NAMES[CURRENT_MONTH-1]}</span>
          </div>
        </header>

        <div className="p-6 lg:p-8 flex-1">

          {/* ── DETALLE DE PERSONA ── */}
          {selectedPersonId !== null ? (() => {
            const person = team.find(p => p.id === selectedPersonId)!
            const paidCount  = getPaidCount(person.id)
            const isFinished = isFullyPaid(person.id)
            const percent    = Math.round((paidCount / Math.max(team.length-1, 1)) * 100)
            const validGifts = person.regalo_ideas.filter(g => g.descripcion || g.enlace)

            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
                <div className="lg:col-span-5 space-y-6">
                  <div className={`p-6 rounded-3xl border shadow-xl ${theme==='dark'?'bg-slate-900 border-slate-800':'bg-white border-slate-100'}`}>
                    <div className="flex items-center gap-5">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${person.color} flex items-center justify-center text-white font-extrabold text-2xl shadow-md overflow-hidden shrink-0`}>
                        {person.foto_url
                          ? <img src={person.foto_url} className="w-full h-full object-cover" alt={person.nombre} />
                          : person.nombre.charAt(0)}
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs uppercase tracking-wider text-rose-500 font-extrabold">Fondo Colectivo</span>
                        <h2 className="text-2xl font-black">{person.nombre}</h2>
                        <p className="text-xs text-slate-400 font-bold">
                          📅 {person.dia} de {MONTH_NAMES[person.mes-1]} | {person.emoji_signo} {person.signo}
                          {person.telefono && <span className="ml-2">📱 {person.telefono}</span>}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-800/10 space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-slate-400">Recaudación:</span>
                        <span className={`font-black text-lg ${isFinished?'text-emerald-500':'text-rose-500'}`}>
                          {paidCount}/{team.length-1} ({percent}%)
                        </span>
                      </div>
                      <div className="w-full h-3 bg-slate-800/30 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full bg-gradient-to-r transition-all duration-500 ${isFinished?'from-emerald-400 to-green-500':'from-rose-400 to-indigo-500'}`}
                          style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Regalos Registrados 🎁</h3>
                    {validGifts.length > 0 ? validGifts.map((g, i) => (
                      <div key={i} className={`p-4 rounded-3xl border ${theme==='dark'?'bg-slate-900/80 border-slate-800':'bg-white border-slate-100 shadow-md'}`}>
                        <div className="flex items-start gap-4">
                          <span className="text-xs font-extrabold text-rose-500 bg-rose-500/10 w-7 h-7 rounded-full flex items-center justify-center shrink-0">{i+1}</span>
                          <div className="flex-1 overflow-hidden space-y-3">
                            {g.descripcion && <p className="text-sm font-semibold whitespace-pre-line break-words text-slate-300">{g.descripcion}</p>}
                            {g.enlace && (
                              <div className="pt-2 border-t border-slate-800/40 flex flex-col gap-2">
                                <span className="text-[10px] font-bold uppercase text-rose-400 flex items-center gap-1"><IconLink className="w-3.5 h-3.5"/>Enlace:</span>
                                <div className="flex gap-2">
                                  <a href={g.enlace} target="_blank" rel="noopener noreferrer"
                                    className="flex-1 text-xs text-blue-400 hover:text-blue-300 underline truncate bg-slate-950/40 p-2 rounded-xl border border-slate-850">
                                    {g.enlace}
                                  </a>
                                  <button onClick={() => handleCopyLink(g.enlace)}
                                    className="px-3 py-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-xl text-xs font-bold border border-rose-500/20">
                                    Copiar
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="p-6 text-center rounded-2xl border border-dashed border-slate-800">
                        <p className="text-sm text-slate-400 italic">Sin ideas de regalo cargadas.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className={`p-6 rounded-3xl border ${theme==='dark'?'bg-slate-900/40 border-slate-800':'bg-white border-slate-100'}`}>
                    <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-800/30">
                      <div>
                        <h3 className="text-base font-black">Aportantes ({team.length-1-paidCount} pendientes)</h3>
                        <p className="text-xs text-slate-400 mt-1">Haz clic para marcar/desmarcar.</p>
                      </div>
                      <button onClick={() => handleCompletarVaca(person.id)}
                        className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs uppercase shadow-lg flex items-center gap-2 active:scale-95 transition-all">
                        <IconSparkles className="w-4 h-4"/><span>Completar Vaca</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
                      {team.filter(t => t.id !== person.id).map(contributor => {
                        const hasPaid = payments[person.id]?.[contributor.id] ?? false
                        return (
                          <div key={contributor.id} onClick={() => handleTogglePayment(person.id, contributor.id)}
                            className={`p-3 rounded-2xl flex items-center justify-between border cursor-pointer transition-all active:scale-98 ${
                              hasPaid ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-900/20 border-slate-800'
                            }`}>
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${contributor.color} flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden`}>
                                {contributor.foto_url
                                  ? <img src={contributor.foto_url} className="w-full h-full object-cover" alt="" />
                                  : contributor.nombre.charAt(0)}
                              </div>
                              <span className="text-sm font-semibold truncate max-w-[100px]">{contributor.nombre}</span>
                            </div>
                            <span className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black ${hasPaid?'bg-emerald-500/15 text-emerald-400':'bg-slate-800 text-slate-400'}`}>
                              {hasPaid?'PAGÓ':'FALTA'}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )
          })() : (
            <>
              {/* ── HOME ── */}
              {activeTab === 'home' && (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start animate-fadeIn">
                  <div className="xl:col-span-8 space-y-6">
                    <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 text-white shadow-xl">
                      <h2 className="text-3xl font-black">¡Este mes celebramos {currentMonthBirthdays.length} cumpleaños!</h2>
                      <p className="text-xs text-indigo-100 mt-2">Gestiona el fondo colectivo y descubre los regalos del equipo.</p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Cumpleañeros de {MONTH_NAMES[CURRENT_MONTH-1]} 🎉</h3>
                      {currentMonthBirthdays.length === 0 && (
                        <p className="text-sm text-slate-400 italic">Sin cumpleaños este mes.</p>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentMonthBirthdays.map(person => {
                          const paidCount  = getPaidCount(person.id)
                          const totalPaid  = isFullyPaid(person.id)
                          const primaryGift = person.regalo_ideas[0]?.descripcion || 'Sorpresa ✨'
                          return (
                            <div key={person.id} className={`relative rounded-3xl border p-6 transition-all ${celebratedId===person.id?'scale-102 ring-2 ring-rose-500':'bg-slate-900 border-slate-800'}`}>
                              {totalPaid && <span className="absolute top-4 right-4 bg-emerald-500 text-white font-black text-[9px] px-2.5 py-1 rounded-full">COMPRADO ✅</span>}
                              <div className="flex items-start gap-4">
                                <div className={`w-14 h-16 rounded-2xl bg-gradient-to-tr ${person.color} flex items-center justify-center text-white text-2xl font-extrabold shadow-md overflow-hidden shrink-0`}>
                                  {person.foto_url ? <img src={person.foto_url} className="w-full h-full object-cover" alt="" /> : person.nombre.charAt(0)}
                                  <span className="absolute -bottom-1 -right-1 text-2xl">{person.emoji_signo}</span>
                                </div>
                                <div className="flex-1 space-y-1 overflow-hidden">
                                  <h3 className="font-black text-lg truncate">{person.nombre}</h3>
                                  <p className="text-xs text-rose-400 font-bold">📅 {person.dia} de {MONTH_NAMES[person.mes-1]} | {person.signo}</p>
                                  <div className="mt-3 p-3 rounded-2xl bg-slate-950/60">
                                    <span className="block text-[8px] font-bold text-slate-400 uppercase mb-1">Regalo Principal:</span>
                                    <span className="text-xs font-semibold truncate block">🎁 {primaryGift}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4 pt-4 border-t border-slate-800/40 flex items-center justify-between gap-4">
                                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-rose-500" style={{ width: `${(paidCount/Math.max(team.length-1,1))*100}%` }} />
                                </div>
                                <div className="flex gap-2">
                                  <button onClick={() => triggerCelebration(person.id)} className="p-2 rounded-xl bg-rose-500 text-white"><IconParty className="w-4 h-4"/></button>
                                  <button onClick={() => setSelectedPersonId(person.id)} className="px-3 py-2 rounded-xl bg-slate-800 text-slate-200 font-bold text-[11px]">Ver persona</button>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="xl:col-span-4 space-y-6">
                    <div className="p-5 rounded-3xl border bg-slate-900 border-slate-800 space-y-3">
                      <h4 className="text-xs font-black uppercase text-slate-400">Resumen del Año 📊</h4>

                      {/* Cumpleaños ya pasados */}
                      <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                        <span className="text-2xl">✅</span>
                        <div>
                          <span className="text-[10px] font-black uppercase text-emerald-400 block">Ya celebrados</span>
                          <span className="text-xl font-black text-emerald-400">{globalStats.cumplesPasados} cumpleaños</span>
                        </div>
                      </div>

                      {/* Cumpleaños por venir */}
                      <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-3">
                        <span className="text-2xl">🎂</span>
                        <div>
                          <span className="text-[10px] font-black uppercase text-indigo-400 block">Por celebrar</span>
                          <span className="text-xl font-black text-indigo-400">{globalStats.cumplesPorVenir} cumpleaños</span>
                        </div>
                      </div>

                      {/* Pagos pendientes de pasados */}
                      <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
                        globalStats.pagosPendientesEnPasados === 0
                          ? 'bg-slate-800/40 border-slate-700'
                          : 'bg-rose-500/10 border-rose-500/20'
                      }`}>
                        <span className="text-2xl">{globalStats.pagosPendientesEnPasados === 0 ? '💸' : '⏳'}</span>
                        <div>
                          <span className={`text-[10px] font-black uppercase block ${globalStats.pagosPendientesEnPasados===0?'text-slate-400':'text-rose-400'}`}>
                            Aportes por cobrar
                          </span>
                          <span className={`text-xl font-black ${globalStats.pagosPendientesEnPasados===0?'text-slate-300':'text-rose-400'}`}>
                            {globalStats.pagosPendientesEnPasados === 0 ? '¡Todo al día!' : `${globalStats.pagosPendientesEnPasados} pagos`}
                          </span>
                          {globalStats.pagosPendientesEnPasados > 0 && (
                            <span className="text-[10px] text-rose-400/70 block">de cumpleaños ya pasados</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xs font-black uppercase text-slate-400">Próximos Cumpleaños ⏳</h4>
                      {team.filter(p => p.mes !== CURRENT_MONTH).slice(0,5).map(p => (
                        <div key={p.id} onClick={() => setSelectedPersonId(p.id)}
                          className="p-3 rounded-2xl flex items-center justify-between border bg-slate-900/50 hover:bg-slate-900 border-slate-800 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${p.color} flex items-center justify-center text-white font-bold text-xs shrink-0 overflow-hidden`}>
                              {p.foto_url ? <img src={p.foto_url} className="w-full h-full object-cover" alt=""/> : p.nombre.charAt(0)}
                            </div>
                            <div><p className="text-sm font-bold">{p.nombre}</p><p className="text-[10px] text-slate-400">{p.dia} de {MONTH_NAMES[p.mes-1]}</p></div>
                          </div>
                          <IconChevronRight className="w-4 h-4 text-slate-500"/>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── REGALOS ── */}
              {activeTab === 'regalos' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className={`p-4 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${theme==='dark'?'bg-slate-900/60 border-slate-800':'bg-white border-slate-200'}`}>
                    <div className="relative flex-1 max-w-md">
                      <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"/>
                      <input type="text" placeholder="Buscar integrante..." value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-[11px] rounded-2xl text-sm font-semibold outline-none border bg-slate-950 border-slate-800 text-white focus:border-rose-500"/>
                    </div>
                    <div className="flex items-center gap-2">
                      {(['todos','pendientes','completados'] as const).map(f => (
                        <button key={f} onClick={() => setStatusFilter(f)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${statusFilter===f?'bg-rose-500 text-white':'bg-slate-800 text-slate-400'}`}>
                          {f==='todos'?'Todos':f==='pendientes'?'Pendientes ⏳':'Listos ✅'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTeam.map(person => {
                      const paidCount   = getPaidCount(person.id)
                      const totalPaid   = isFullyPaid(person.id)
                      const progress    = Math.round((paidCount / Math.max(team.length-1,1)) * 100)
                      const primaryGift = person.regalo_ideas[0]?.descripcion || 'Sorpresa general'
                      return (
                        <div key={person.id} onClick={() => { playSoundEffect('tap'); setSelectedPersonId(person.id) }}
                          className="p-5 rounded-3xl border bg-slate-900 border-slate-800 hover:bg-slate-850 cursor-pointer flex flex-col justify-between min-h-[220px]">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${person.color} flex items-center justify-center text-white text-sm font-black shrink-0 overflow-hidden`}>
                                  {person.foto_url ? <img src={person.foto_url} className="w-full h-full object-cover" alt=""/> : person.nombre.charAt(0)}
                                </div>
                                <div>
                                  <h3 className="text-sm font-extrabold">{person.nombre}</h3>
                                  <p className="text-[10px] text-slate-400">{person.dia} de {MONTH_NAMES[person.mes-1]}</p>
                                </div>
                              </div>
                              <span className="text-xl">{person.emoji_signo}</span>
                            </div>
                            <div className="p-3 rounded-2xl text-[11px] bg-slate-950/80 text-slate-300">
                              <span className="block text-[8px] font-bold text-slate-400 uppercase mb-1">Deseo Principal:</span>
                              <p className="truncate font-medium">🎁 {primaryGift}</p>
                            </div>
                          </div>
                          <div className="mt-5 pt-4 border-t border-slate-800/40 space-y-2">
                            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-rose-500" style={{ width:`${progress}%` }}/>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full ${totalPaid?'bg-emerald-500/15 text-emerald-400':'bg-rose-500/10 text-rose-400'}`}>{totalPaid?'Listo':'En curso'}</span>
                              <span className="text-[10px] text-rose-400 font-bold">Gestionar →</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* ── PLANILLA ── */}
              {activeTab === 'planilla' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Formulario */}
                    <form onSubmit={handleSavePerson} className="lg:col-span-5 space-y-4">
                      <div className={`rounded-3xl border ${theme==='dark'?'bg-slate-900/60 border-slate-800':'bg-white border-slate-200 shadow-xl'}`}>
                        {/* Header — siempre visible, en mobile es clickeable para plegar/desplegar */}
                        <button
                          type="button"
                          onClick={() => setFormExpanded(v => !v)}
                          className="lg:pointer-events-none w-full flex items-center justify-between gap-3 p-6 pb-3"
                        >
                          <div className="flex items-center gap-3">
                            {isEditing ? <IconEdit className="text-rose-500 w-5 h-5"/> : <IconUserAdd className="text-rose-500 w-5 h-5"/>}
                            <h4 className="font-black text-base">{isEditing?'Editar Integrante':'Agregar Integrante'}</h4>
                          </div>
                          <IconChevronRight className={`lg:hidden w-5 h-5 text-slate-400 transition-transform duration-200 ${formExpanded || isEditing ? 'rotate-90' : ''}`}/>
                        </button>

                        {/* Contenido: siempre visible en desktop, plegable en mobile */}
                        <div className={`${(formExpanded || isEditing) ? 'block' : 'hidden'} lg:block px-6 pb-6`}>
                        <div className="pt-3 border-t border-slate-800/30 mb-5"/>

                        <div className="space-y-4">
                          {/* Nombre */}
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Nombre</label>
                            <input type="text" required placeholder="Ej. Francisca" value={formName}
                              onChange={e => setFormName(e.target.value)}
                              className="w-full px-4 py-[11px] rounded-xl text-sm font-semibold outline-none border bg-slate-950 border-slate-800 text-white focus:border-rose-500"/>
                          </div>

                          {/* Fecha */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Día</label>
                              <input type="number" required min={1} max={31} value={formDay}
                                onChange={e => setFormDay(Math.max(1, Math.min(31, parseInt(e.target.value)||1)))}
                                className="w-full px-4 py-[11px] rounded-xl text-sm font-semibold outline-none border bg-slate-950 border-slate-800 text-white focus:border-rose-500"/>
                            </div>
                            <div>
                              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Mes</label>
                              <select value={formMonth} onChange={e => setFormMonth(parseInt(e.target.value))}
                                className="w-full px-4 py-[11px] rounded-xl text-sm font-semibold outline-none border bg-slate-950 border-slate-800 text-white focus:border-rose-500">
                                {MONTH_NAMES.map((n,i) => <option key={i+1} value={i+1}>{n}</option>)}
                              </select>
                            </div>
                          </div>

                          {/* Signo (auto) */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Signo (auto)</label>
                              <input type="text" disabled value={formSign}
                                className="w-full px-4 py-2.5 rounded-xl text-xs font-semibold outline-none border bg-slate-950/40 border-slate-800 text-slate-300"/>
                            </div>
                            <div>
                              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Emoji</label>
                              <input type="text" disabled value={formEmoji}
                                className="w-full px-4 py-2.5 rounded-xl text-center text-sm outline-none border bg-slate-950/40 border-slate-800 text-white"/>
                            </div>
                          </div>

                          {/* Teléfono */}
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Teléfono (opcional)</label>
                            <input type="tel" placeholder="+56 9 1234 5678" value={formPhone}
                              onChange={e => setFormPhone(e.target.value)}
                              className="w-full px-4 py-[11px] rounded-xl text-sm font-semibold outline-none border bg-slate-950 border-slate-800 text-white focus:border-rose-500"/>
                          </div>

                          {/* Foto */}
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Foto de Perfil</label>
                            <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
                              className={`p-4 rounded-2xl border-2 border-dashed transition-all flex items-center gap-4 ${
                                isDragging ? 'border-rose-500 bg-rose-500/10 scale-[1.02]' : 'border-slate-800 bg-slate-955/20 hover:border-slate-700'
                              }`}>
                              <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                                {formPhotoPreview
                                  ? <img src={formPhotoPreview} className="w-full h-full object-cover" alt="preview"/>
                                  : <IconCamera className={`w-6 h-6 ${isDragging?'text-rose-500 animate-bounce':'text-slate-600'}`}/>}
                              </div>
                              <div className="flex-1 space-y-2">
                                <p className="text-xs font-bold text-slate-300">{isDragging?'¡Suelta la foto aquí!':'Arrastra o selecciona una foto'}</p>
                                <div className="flex items-center gap-2">
                                  <input type="file" accept="image/*" id="photo-upload" onChange={e => { if(e.target.files?.[0]) handlePhotoSelect(e.target.files[0]) }} className="hidden"/>
                                  <label htmlFor="photo-upload" className="px-3.5 py-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-xl text-[11px] font-extrabold border border-rose-500/20 cursor-pointer">
                                    {formPhotoPreview?'Cambiar':'Examinar'}
                                  </label>
                                  {formPhotoPreview && (
                                    <button type="button" onClick={() => { setFormPhotoFile(null); setFormPhotoPreview(null) }}
                                      className="text-[10px] text-red-400 font-bold hover:underline">Eliminar</button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Color avatar */}
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Color de Avatar</label>
                            <select value={formColor} onChange={e => setFormColor(e.target.value)}
                              className="w-full px-4 py-[11px] rounded-xl text-xs font-semibold outline-none border bg-slate-950 border-slate-800 text-white focus:border-rose-500">
                              {PRESET_COLORS.map((c,i) => <option key={i} value={c.value}>{c.name}</option>)}
                            </select>
                            <div className="flex items-center gap-2 mt-2 pl-1">
                              <span className="text-[10px] text-slate-400">Preview:</span>
                              <div className={`w-6 h-6 rounded-lg bg-gradient-to-tr ${formColor} flex items-center justify-center text-white text-xs font-black overflow-hidden`}>
                                {formPhotoPreview ? <img src={formPhotoPreview} className="w-full h-full object-cover" alt=""/> : (formName.charAt(0)||'A')}
                              </div>
                            </div>
                          </div>

                          {/* Regalos */}
                          <div className="space-y-4 pt-2 border-t border-slate-800/40">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Ideas de Regalos</label>
                            {[
                              [formGiftText1,setFormGiftText1,formGiftLink1,setFormGiftLink1,'Regalo 1'],
                              [formGiftText2,setFormGiftText2,formGiftLink2,setFormGiftLink2,'Regalo 2'],
                              [formGiftText3,setFormGiftText3,formGiftLink3,setFormGiftLink3,'Regalo 3'],
                            ].map(([text,setText,link,setLink,label],i) => (
                              <div key={i} className="p-3 rounded-2xl border border-slate-800 bg-slate-950/20 space-y-2">
                                <span className="text-[10px] font-bold text-rose-400 block">{label as string}</span>
                                <textarea rows={3} placeholder="Descripción del regalo..." value={text as string}
                                  onChange={e => (setText as (v:string)=>void)(e.target.value)}
                                  className="w-full px-3 py-2 rounded-xl text-xs font-medium border bg-slate-950 border-slate-800 text-white focus:border-rose-500 resize-y"/>
                                <input type="text" placeholder="URL del regalo (opcional)..." value={link as string}
                                  onChange={e => (setLink as (v:string)=>void)(e.target.value)}
                                  className="w-full px-3 py-2 rounded-xl text-xs font-medium border bg-slate-950 border-slate-800 text-white focus:border-rose-500"/>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-6 pt-4 border-t border-slate-800/30">
                          <button type="submit" disabled={isSaving}
                            className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95">
                            {isSaving ? 'Guardando...' : (isEditing?'Guardar Cambios':'Agregar Integrante')}
                          </button>
                          {(isEditing || formName) && (
                            <button type="button" onClick={resetForm}
                              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-400 hover:bg-slate-700">
                              Cancelar
                            </button>
                          )}
                        </div>
                        </div>{/* fin div plegable */}
                      </div>
                    </form>

                    {/* Lista de integrantes */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className={`p-4 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${theme==='dark'?'bg-slate-900/60 border-slate-800':'bg-white border-slate-200 shadow-xl'}`}>
                        <div>
                          <h4 className="font-black text-sm">Integrantes en la Planilla</h4>
                          <p className="text-[10px] text-slate-400">Total: {team.length} personas</p>
                        </div>
                        <div className="relative max-w-xs flex-1">
                          <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"/>
                          <input type="text" placeholder="Buscar..." value={searchAdminQuery}
                            onChange={e => setSearchAdminQuery(e.target.value)}
                            className="w-full pl-10 pr-3 py-1.5 rounded-xl text-xs font-semibold outline-none border bg-slate-950 border-slate-800 text-white focus:border-rose-500"/>
                        </div>
                      </div>

                      <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
                        {filteredAdminTeam.map(person => (
                          <div key={person.id}
                            className={`p-4 rounded-3xl border flex items-center justify-between transition-all ${
                              editingPersonId===person.id ? 'border-rose-500 bg-rose-500/5' : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900'
                            }`}>
                            <div className="flex items-center gap-4 min-w-0">
                              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${person.color} flex items-center justify-center text-white font-black text-sm shadow-md shrink-0 overflow-hidden`}>
                                {person.foto_url ? <img src={person.foto_url} className="w-full h-full object-cover" alt=""/> : person.nombre.charAt(0)}
                              </div>
                              <div className="min-w-0 space-y-0.5">
                                <h5 className="font-extrabold text-sm truncate">{person.nombre} <span>{person.emoji_signo}</span></h5>
                                <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] text-slate-400 font-bold">
                                  <span>{person.dia} de {MONTH_NAMES[person.mes-1]}</span>
                                  {person.telefono && <span className="text-slate-500">| 📱 {person.telefono}</span>}
                                  <span className="text-slate-500">| {person.regalo_ideas.length} deseos</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 pl-3">
                              <button onClick={() => handleStartEdit(person)}
                                className="p-2 rounded-xl border bg-slate-800/50 border-slate-700 text-rose-400 hover:text-rose-300 transition-all hover:scale-105">
                                <IconEdit className="w-4 h-4"/>
                              </button>
                              <button onClick={() => { playSoundEffect('tap'); setPersonToDelete(person) }}
                                className="p-2 rounded-xl border bg-slate-850/50 border-slate-800 text-rose-500/70 hover:text-rose-500 hover:bg-rose-500/10 transition-all hover:scale-105">
                                <IconTrash className="w-4 h-4"/>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Notificación */}
      {adminNotification && (
        <div className={`fixed bottom-6 right-6 px-5 py-3.5 rounded-2xl text-sm font-bold shadow-2xl z-50 transition-all animate-fadeIn ${
          adminNotification.type==='success' ? 'bg-emerald-500 text-white'
          : adminNotification.type==='error' ? 'bg-red-500 text-white'
          : 'bg-slate-800 text-slate-200'
        }`}>
          {adminNotification.msg}
        </div>
      )}

      {/* Modal confirmar borrado */}
      {personToDelete && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className={`p-6 rounded-[32px] max-w-md w-full border shadow-2xl space-y-4 ${theme==='dark'?'bg-slate-900 border-slate-800 text-slate-100':'bg-white border-slate-200 text-slate-800'}`}>
            <div className="text-center space-y-2">
              <span className="text-4xl">⚠️</span>
              <h3 className="text-lg font-black">¿Confirmas la eliminación?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Estás a punto de eliminar a <span className="font-extrabold text-rose-500">{personToDelete.nombre}</span>. Esta acción borrará permanentemente sus datos, aportes y deseos de regalo.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={confirmDeletePerson}
                className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all active:scale-95">
                Sí, eliminar
              </button>
              <button onClick={() => { playSoundEffect('tap'); setPersonToDelete(null) }}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-400 hover:bg-slate-700 transition-all">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
