import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { rsvpSchema, type RSVPFormValues } from '../../lib/validations'
import { useGuestName } from '../../hooks/useGuestName'
import { useInvitationData } from '../../hooks/useInvitationContext'
import { api } from '../../lib/api'
import { ScrollReveal } from '../shared/ScrollReveal'
import { SectionContainer } from '../shared/SectionContainer'
import { SectionOrnament } from '../shared/SectionOrnament'
import { RSVPSuccess } from './RSVPSuccess'
import { Send } from 'lucide-react'

export function RSVPForm() {
  const data = useInvitationData()
  const { guestName } = useGuestName(data.slug)
  const submittedKey = `rsvp_submitted_${data.slug}`
  const [isSuccess, setIsSuccess] = useState(() => !!localStorage.getItem(submittedKey))
  const [submittedName, setSubmittedName] = useState(() => localStorage.getItem(submittedKey) || '')
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RSVPFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: guestName || '',
      attending: undefined,
      guestCount: 1,
      message: '',
    },
  })

  const attendingValue = watch('attending')

  const onSubmit = async (form: RSVPFormValues) => {
    setSubmitError(null)
    try {
      await api.submitRSVP(data.slug, {
        name: form.name,
        attending: form.attending,
        guestCount: form.guestCount,
      })

      if (form.message) {
        await api.submitWish(data.slug, {
          guestName: form.name,
          message: form.message,
        })
      }

      setSubmittedName(form.name)
      setIsSuccess(true)
      localStorage.setItem(submittedKey, form.name)
      window.dispatchEvent(new Event('wish-submitted'))
    } catch (err) {
      setSubmitError('Gagal mengirim. Silakan coba lagi.')
    }
  }

  if (isSuccess) {
    return <RSVPSuccess name={submittedName} />
  }

  return (
    <SectionContainer className="section-warm">
      <SectionOrnament position="top-right" variant="leaf" className="scale-75" />
      <SectionOrnament position="bottom-left" variant="diamond" className="scale-50" />

      <ScrollReveal>
        <p
          className="mb-3 text-center text-xs tracking-[0.3em] uppercase"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-subtle)' }}
        >
          Konfirmasi Kehadiran Anda
        </p>
        <h2
          className="mb-10 text-center text-5xl md:text-6xl"
          style={{ fontFamily: 'var(--font-decorative)', color: 'var(--color-accent)', lineHeight: 1.1 }}
        >
          RSVP
        </h2>
      </ScrollReveal>

      <ScrollReveal>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="glass-warm mx-auto max-w-md space-y-6 rounded-3xl p-8"
        >
          {/* Nama */}
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium"
              style={{ color: 'var(--color-text)' }}
            >
              Nama Lengkap
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className="w-full rounded-xl glass px-4 py-3 text-sm outline-none transition-all focus:ring-2"
              style={{
                borderColor: errors.name ? '#ef4444' : 'transparent',
                color: 'var(--color-text)',
                '--tw-ring-color': 'var(--color-accent)',
              } as React.CSSProperties}
              placeholder="Masukkan nama lengkap"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Konfirmasi */}
          <div>
            <label className="mb-2 block text-sm font-medium" style={{ color: 'var(--color-text)' }}>
              Konfirmasi Kehadiran
            </label>
            <div className="flex flex-wrap gap-3">
              {[
                { value: 'yes' as const, label: 'Hadir' },
                { value: 'no' as const, label: 'Tidak Hadir' },
                { value: 'maybe' as const, label: 'Masih Ragu' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm transition-all duration-300"
                  style={{
                    border: attendingValue === opt.value ? '1px solid var(--color-accent)' : '1px solid transparent',
                    backgroundColor: attendingValue === opt.value ? 'rgba(194, 113, 79, 0.15)' : 'rgba(255, 255, 255, 0.4)',
                    color: attendingValue === opt.value ? 'var(--color-accent)' : 'var(--color-text)',
                  }}
                >
                  <input
                    type="radio"
                    value={opt.value}
                    {...register('attending')}
                    className="sr-only"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            {errors.attending && (
              <p className="mt-1 text-xs text-red-500">{errors.attending.message}</p>
            )}
          </div>

          {/* Jumlah Pendamping */}
          {attendingValue === 'yes' && (
            <div>
              <label
                htmlFor="guestCount"
                className="mb-1 block text-sm font-medium"
                style={{ color: 'var(--color-text)' }}
              >
                Jumlah Pendamping
              </label>
              <input
                id="guestCount"
                type="number"
                min={1}
                max={10}
                {...register('guestCount', { valueAsNumber: true })}
                className="w-full rounded-xl glass px-4 py-3 text-sm outline-none transition-all focus:ring-2"
                style={{
                  color: 'var(--color-text)',
                  '--tw-ring-color': 'var(--color-accent)',
                } as React.CSSProperties}
              />
            </div>
          )}

          {/* Ucapan */}
          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm font-medium"
              style={{ color: 'var(--color-text)' }}
            >
              Ucapan & Doa <span className="font-normal opacity-60">(opsional)</span>
            </label>
            <textarea
              id="message"
              rows={3}
              {...register('message')}
              className="w-full resize-none rounded-xl glass px-4 py-3 text-sm outline-none transition-all focus:ring-2"
              style={{
                borderColor: errors.message ? '#ef4444' : 'transparent',
                color: 'var(--color-text)',
                '--tw-ring-color': 'var(--color-accent)',
              } as React.CSSProperties}
              placeholder="Tulis ucapan atau doa..."
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
            )}
          </div>

          {/* Submit */}
          {submitError && (
            <p className="text-center text-sm text-red-500">{submitError}</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium text-white transition-opacity disabled:opacity-60"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            {isSubmitting ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <Send size={16} />
                Kirim Konfirmasi
              </>
            )}
          </button>
        </form>
      </ScrollReveal>
    </SectionContainer>
  )
}
