import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { api } from '../lib/api'
import type { Guest } from '../types'
import { Copy, Check, Trash2, Plus, Users, Link2, Download, MessageCircle, X, ChevronDown, ChevronUp, Send, Eye } from 'lucide-react'

const SLUG = 'galih-maesya'
const COUPLE_NAMES = 'Galih & Maesya'
const WEDDING_DATE = '20 Agustus 2026'

function getBaseUrl() {
  if (typeof window !== 'undefined') return window.location.origin
  return 'http://localhost:5173'
}

function getInviteUrl(name: string) {
  return `${getBaseUrl()}/?to=${encodeURIComponent(name)}`
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all"
      style={{
        background: copied ? 'rgba(139,158,121,0.15)' : 'rgba(194,113,79,0.08)',
        color: copied ? '#8B9E79' : '#C2714F',
        border: `1px solid ${copied ? 'rgba(139,158,121,0.2)' : 'rgba(194,113,79,0.12)'}`,
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'OK' : label}
    </button>
  )
}

function StatusBadge({ status }: { status: Guest['attending'] }) {
  const config = {
    pending: { label: 'Pending', bg: 'rgba(196,153,107,0.12)', color: '#C4996B', border: 'rgba(196,153,107,0.2)' },
    yes: { label: 'Hadir', bg: 'rgba(139,158,121,0.12)', color: '#8B9E79', border: 'rgba(139,158,121,0.2)' },
    no: { label: 'Tidak Hadir', bg: 'rgba(194,113,79,0.08)', color: '#C2714F', border: 'rgba(194,113,79,0.12)' },
    maybe: { label: 'Belum Pasti', bg: 'rgba(138,117,101,0.1)', color: '#8A7565', border: 'rgba(138,117,101,0.15)' },
  }
  const c = config[status] || config.pending
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
      style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}
    >
      {c.label}
    </span>
  )
}

function GuestDetailModal({
  guest,
  onClose,
  onSaved,
}: {
  guest: Guest
  onClose: () => void
  onSaved: () => void
}) {
  const [name, setName] = useState(guest.name)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!name.trim() || name.trim() === guest.name) {
      onClose()
      return
    }
    setIsSaving(true)
    try {
      await api.deleteGuest(SLUG, guest.id)
      await api.addGuest(SLUG, name.trim())
      onSaved()
      onClose()
    } catch {
      alert('Gagal mengubah nama')
    } finally {
      setIsSaving(false)
    }
  }

  const whatsAppUrl = `https://wa.me/?text=${encodeURIComponent(
    `Kepada Yth. Bapak/Ibu/Saudara/i ${guest.name}\n\nAssalamu'alaikum Wr. Wb.\nDengan memohon rahmat dan ridho Allah SWT, kami mengundang Anda untuk menghadiri acara pernikahan kami:\n\n💑 ${COUPLE_NAMES}\n📅 ${WEDDING_DATE}\n\nSilakan buka undangan digital kami:\n${getInviteUrl(guest.name)}\n\nMerupakan suatu kehormatan dan kebahagiaan apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.\n\nTerima kasih.\nWassalamu'alaikum Wr. Wb.`
  )}`

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-md overflow-hidden rounded-2xl"
        style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Detail Tamu</h3>
          <button onClick={onClose} className="rounded-lg p-1 transition-all hover:bg-black/5">
            <X size={16} style={{ color: 'var(--color-text-muted)' }} />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          {/* Name Edit */}
          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Nama</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 rounded-xl px-3 py-2 text-sm outline-none"
                style={{ background: '#fff', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
              />
              <button
                onClick={handleSave}
                disabled={isSaving || name.trim() === guest.name}
                className="rounded-xl px-3 py-2 text-xs font-medium text-white transition-all disabled:opacity-40"
                style={{ background: 'var(--color-accent)' }}
              >
                {isSaving ? '...' : 'Simpan'}
              </button>
            </div>
          </div>

          {/* RSVP Status */}
          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>RSVP Status</label>
            <div className="flex items-center gap-2">
              <StatusBadge status={guest.attending} />
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {guest.guestCount > 0 ? `${guest.guestCount} orang` : 'Belum konfirmasi'}
              </span>
            </div>
          </div>

          {/* Message */}
          {guest.message && (
            <div>
              <label className="mb-1 block text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Pesan / Doa</label>
              <div
                className="rounded-xl px-3 py-2.5 text-sm leading-relaxed"
                style={{ background: '#fff', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
              >
                {guest.message}
              </div>
            </div>
          )}

          {/* Link */}
          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Link Undangan</label>
            <div className="flex items-center gap-2">
              <code
                className="flex-1 truncate rounded-lg px-2.5 py-1.5 text-[11px]"
                style={{ background: 'var(--color-bg)', color: 'var(--color-text-muted)' }}
              >
                {getInviteUrl(guest.name)}
              </code>
              <CopyButton text={getInviteUrl(guest.name)} label="Copy" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-medium text-white transition-all"
              style={{ background: '#25D366' }}
            >
              <Send size={12} />
              Kirim via WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function WhatsAppTemplate() {
  const [copied, setCopied] = useState(false)
  const template = `Kepada Yth. Bapak/Ibu/Saudara/i [NAMA TAMU]

Assalamu'alaikum Wr. Wb.

Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Anda untuk menghadiri acara pernikahan kami:

💑 ${COUPLE_NAMES}
📅 ${WEDDING_DATE}

Silakan buka undangan digital kami:
[LINK UNDANGAN]

Merupakan suatu kehormatan dan kebahagiaan apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.

Terima kasih.
Wassalamu'alaikum Wr. Wb.`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(template)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid var(--color-border)' }}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle size={14} style={{ color: '#25D366' }} />
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
            Template Pesan WhatsApp
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all"
          style={{
            background: copied ? 'rgba(37,211,102,0.12)' : 'rgba(37,211,102,0.06)',
            color: '#25D366',
            border: '1px solid rgba(37,211,102,0.15)',
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'OK' : 'Copy'}
        </button>
      </div>
      <pre
        className="whitespace-pre-wrap rounded-xl px-3 py-2.5 text-[11px] leading-relaxed"
        style={{ background: 'var(--color-bg)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
      >
        {template}
      </pre>
      <p className="mt-2 text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
        Ganti [NAMA TAMU] dan [LINK UNDANGAN] sebelum kirim. Atau klik nama tamu di bawah untuk langsung kirim via WhatsApp.
      </p>
    </div>
  )
}

export function AdminPage() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [newName, setNewName] = useState('')
  const [bulkNames, setBulkNames] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [isBulkAdding, setIsBulkAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showBulk, setShowBulk] = useState(false)
  const [showTemplate, setShowTemplate] = useState(false)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [detailGuest, setDetailGuest] = useState<Guest | null>(null)

  const fetchGuests = useCallback(async () => {
    try {
      const res = await api.getGuests(SLUG)
      setGuests(res.guests)
      setTotal(res.total)
    } catch {
      setGuests([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => { fetchGuests() }, [fetchGuests])

  const stats = {
    total: guests.length,
    pending: guests.filter((g) => g.attending === 'pending').length,
    yes: guests.filter((g) => g.attending === 'yes').length,
    no: guests.filter((g) => g.attending === 'no').length,
    maybe: guests.filter((g) => g.attending === 'maybe').length,
  }

  const handleAdd = async () => {
    if (!newName.trim()) return
    setIsAdding(true)
    setError(null)
    try {
      await api.addGuest(SLUG, newName.trim())
      setNewName('')
      await fetchGuests()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal menambah tamu'
      setError(message)
    } finally {
      setIsAdding(false)
    }
  }

  const handleBulk = async () => {
    const names = bulkNames.split('\n').map((n) => n.trim()).filter((n) => n.length > 0)
    if (names.length === 0) return
    setIsBulkAdding(true)
    setError(null)
    try {
      const res = await api.addGuestsBulk(SLUG, names)
      setBulkNames('')
      setError(null)
      alert(`Berhasil menambah ${res.added} tamu baru`)
      await fetchGuests()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal menambah tamu'
      setError(message)
    } finally {
      setIsBulkAdding(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus "${name}"?`)) return
    try {
      await api.deleteGuest(SLUG, id)
      await fetchGuests()
    } catch {
      alert('Gagal menghapus tamu')
    }
  }

  const copyAllLinks = async () => {
    const links = filteredGuests
      .map((g) => `${g.name}: ${getInviteUrl(g.name)}`)
      .join('\n')
    await navigator.clipboard.writeText(links)
    alert(`${filteredGuests.length} link berhasil dicopy!`)
  }

  const downloadCSV = () => {
    const header = 'Nama,Status,Jumlah,Link'
    const rows = filteredGuests.map((g) =>
      `"${g.name}","${g.attending}","${g.guestCount}","${getInviteUrl(g.name)}"`
    )
    const csv = [header, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `undangan-${SLUG}-guests.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const filteredGuests = guests.filter((g) => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filterStatus === 'all' || g.attending === filterStatus
    return matchSearch && matchFilter
  })

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1
            className="text-3xl font-light tracking-wide"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            Admin — {COUPLE_NAMES}
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Kelola tamu undangan & RSVP
          </p>
        </div>

        {/* RSVP Summary */}
        <div
          className="mb-6 rounded-2xl p-5"
          style={{ background: '#fff', border: '1px solid var(--color-border)' }}
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
            Ringkasan RSVP
          </p>

          {/* Stats cards */}
          <div className="mb-4 grid grid-cols-4 gap-2">
            {[
              { label: 'Total', value: stats.total, color: 'var(--color-text)', bg: 'var(--color-bg)' },
              { label: 'Hadir', value: stats.yes, color: '#8B9E79', bg: 'rgba(139,158,121,0.08)' },
              { label: 'Tidak', value: stats.no, color: '#C2714F', bg: 'rgba(194,113,79,0.06)' },
              { label: 'Pending', value: stats.pending, color: '#C4996B', bg: 'rgba(196,153,107,0.08)' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: s.bg }}>
                <p className="text-xl font-semibold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          {stats.total > 0 && (
            <div>
              <div className="mb-1 flex h-2 overflow-hidden rounded-full" style={{ background: 'var(--color-bg)' }}>
                {stats.yes > 0 && (
                  <div
                    className="transition-all duration-500"
                    style={{ width: `${(stats.yes / stats.total) * 100}%`, background: '#8B9E79' }}
                  />
                )}
                {stats.no > 0 && (
                  <div
                    className="transition-all duration-500"
                    style={{ width: `${(stats.no / stats.total) * 100}%`, background: '#C2714F' }}
                  />
                )}
                {stats.maybe > 0 && (
                  <div
                    className="transition-all duration-500"
                    style={{ width: `${(stats.maybe / stats.total) * 100}%`, background: '#8A7565' }}
                  />
                )}
              </div>
              <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
                {stats.yes} hadir · {stats.no} tidak hadir · {stats.maybe} belum pasti · {stats.pending} pending
              </p>
            </div>
          )}
        </div>

        {/* Add Single */}
        <div className="mb-4 rounded-2xl p-4" style={{ background: '#fff', border: '1px solid var(--color-border)' }}>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
            Tambah Tamu
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="Nama lengkap tamu..."
              className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
              style={{
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}
            />
            <button
              onClick={handleAdd}
              disabled={isAdding || !newName.trim()}
              className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-all disabled:opacity-50"
              style={{ background: 'var(--color-accent)' }}
            >
              <Plus size={14} />
              {isAdding ? '...' : 'Tambah'}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-xs" style={{ color: '#e74c3c' }}>{error}</p>
          )}
        </div>

        {/* Bulk Add */}
        <div className="mb-4">
          <button
            onClick={() => setShowBulk(!showBulk)}
            className="flex items-center gap-1 text-xs font-medium transition-all"
            style={{ color: 'var(--color-accent)' }}
          >
            {showBulk ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {showBulk ? 'Tutup' : 'Tambah Banyak Sekaligus'}
          </button>
          <AnimatePresence>
            {showBulk && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 rounded-2xl p-4" style={{ background: '#fff', border: '1px solid var(--color-border)' }}>
                  <p className="mb-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    Satu nama per baris. Nama yang sudah ada akan di-skip.
                  </p>
                  <textarea
                    value={bulkNames}
                    onChange={(e) => setBulkNames(e.target.value)}
                    placeholder={"Budi Santoso\nSiti Aminah\nKeluarga Wiranto"}
                    rows={5}
                    className="w-full resize-none rounded-xl px-4 py-2.5 text-sm outline-none"
                    style={{
                      background: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                  />
                  <button
                    onClick={handleBulk}
                    disabled={isBulkAdding || !bulkNames.trim()}
                    className="mt-2 flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-all disabled:opacity-50"
                    style={{ background: 'var(--color-accent-2)' }}
                  >
                    <Plus size={14} />
                    {isBulkAdding ? 'Menambah...' : `Tambah ${bulkNames.split('\n').filter((n) => n.trim()).length} Tamu`}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* WhatsApp Template */}
        <div className="mb-4">
          <button
            onClick={() => setShowTemplate(!showTemplate)}
            className="flex items-center gap-1 text-xs font-medium transition-all"
            style={{ color: '#25D366' }}
          >
            {showTemplate ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {showTemplate ? 'Tutup' : 'Lihat Template Pesan WhatsApp'}
          </button>
          <AnimatePresence>
            {showTemplate && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3">
                  <WhatsAppTemplate />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search + Filter + Actions */}
        {guests.length > 0 && (
          <div className="mb-4 space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama..."
                className="flex-1 rounded-xl px-4 py-2 text-sm outline-none"
                style={{
                  background: '#fff',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                }}
              />
              <div className="flex gap-1">
                {[
                  { value: 'all', label: 'Semua' },
                  { value: 'yes', label: 'Hadir' },
                  { value: 'no', label: 'Tidak' },
                  { value: 'pending', label: 'Pending' },
                ].map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFilterStatus(f.value)}
                    className="rounded-lg px-2 py-1.5 text-[10px] font-medium transition-all"
                    style={{
                      background: filterStatus === f.value ? 'var(--color-accent)' : 'rgba(194,113,79,0.06)',
                      color: filterStatus === f.value ? '#fff' : 'var(--color-text-muted)',
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {filteredGuests.length} dari {total} tamu
              </p>
              <div className="flex gap-2">
                <button
                  onClick={copyAllLinks}
                  className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all"
                  style={{ background: 'rgba(194,113,79,0.08)', color: 'var(--color-accent)', border: '1px solid rgba(194,113,79,0.12)' }}
                >
                  <Copy size={12} />
                  Copy Link
                </button>
                <button
                  onClick={downloadCSV}
                  className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all"
                  style={{ background: 'rgba(139,158,121,0.08)', color: 'var(--color-accent-2)', border: '1px solid rgba(139,158,121,0.12)' }}
                >
                  <Download size={12} />
                  CSV
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Guest List */}
        {isLoading ? (
          <div className="py-12 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-accent)]/30 border-t-[var(--color-accent)]" />
          </div>
        ) : filteredGuests.length === 0 ? (
          <div className="rounded-2xl py-12 text-center" style={{ background: '#fff', border: '1px solid var(--color-border)' }}>
            <Users size={32} className="mx-auto mb-3 opacity-20" style={{ color: 'var(--color-text-muted)' }} />
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {guests.length === 0 ? 'Belum ada tamu. Tambah nama di atas.' : 'Tidak ditemukan.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredGuests.map((guest) => (
              <motion.div
                key={guest.id}
                layout
                className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3 transition-all"
                style={{ background: '#fff', border: '1px solid var(--color-border)', cursor: 'pointer' }}
                whileHover={{ boxShadow: '0 2px 8px rgba(58,42,30,0.06)' }}
                onClick={() => setDetailGuest(guest)}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                      {guest.name}
                    </p>
                    <StatusBadge status={guest.attending} />
                  </div>
                  {guest.message && (
                    <p className="mt-0.5 truncate text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                      "{guest.message}"
                    </p>
                  )}
                </div>
                <div
                  className="flex items-center gap-1.5 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CopyButton text={getInviteUrl(guest.name)} label="Link" />
                  <button
                    onClick={() => handleDelete(guest.id, guest.name)}
                    className="rounded-lg p-1.5 text-[var(--color-text-muted)] opacity-30 transition-all hover:opacity-100 hover:text-red-500"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {detailGuest && (
          <GuestDetailModal
            guest={detailGuest}
            onClose={() => setDetailGuest(null)}
            onSaved={fetchGuests}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
