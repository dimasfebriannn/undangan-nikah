import { z } from 'zod'

export const rsvpSchema = z.object({
  name: z.string().min(2, 'Nama harus minimal 2 karakter'),
  attending: z.enum(['yes', 'no', 'maybe'], {
    message: 'Pilih konfirmasi kehadiran',
  }),
  guestCount: z.number().min(1, 'Minimal 1 orang').max(10, 'Maksimal 10 orang').optional(),
  message: z.string().max(500, 'Pesan maksimal 500 karakter').optional(),
})

export type RSVPFormValues = z.infer<typeof rsvpSchema>
