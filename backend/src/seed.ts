import { db } from './db/index'
import { invitations, guests, wishes } from './db/schema'

async function seed() {
  console.log('🌱 Seeding database...')

  // Insert sample invitation
  const [invitation] = await db.insert(invitations).values({
    slug: 'galih-maesya',
    groomName: 'Galih',
    brideName: 'Maesya',
    groomFull: 'Galih Dwi Rahman Kuswanto Saehati Putra',
    brideFull: 'Maesya Bella Dian Falasifah',
    groomParents: 'Bapak H. Bambang Kuswanto & Ibu Hj. Anik Handayani',
    brideParents: 'Bapak H. Ahmad Wijaya & Ibu Hj. Fatimah Azzahra',
    weddingDate: '2026-09-20',
    akadTime: '08:00',
    akadLocation: 'Krajan, Karang Kedawung, Kec. Mumbulsari, Kab. Jember, Jawa Timur 68174',
    resepsiTime: '11:00',
    resepsiLocation: 'Hotel Fortunagrande Jember, Jl. Raden Saleh No.27, Jember',
    resepsiSesi: [
      { sesi: 1, start: '11:00', end: '13:00' },
      { sesi: 2, start: '14:00', end: '16:00' },
    ],
    venueMapsUrl: 'https://maps.app.goo.gl/2xk4i1Pud3TUjqUP7?g_st=ac',
    resepsiMapsUrl: 'https://maps.app.goo.gl/8hJPNCNToZ6QHZEo9',
    coverImage: '/images/cover/cover.jpeg',
    groomImage: '/images/couple/groom.jpeg',
    brideImage: '/images/couple/bride.jpeg',
    coupleImage: '/images/couple/hero.jpeg',
    heroImages: ['/images/couple/hero.jpeg', '/images/couple/hero2.jpeg', '/images/couple/hero3.jpeg'],
    musicUrl: '',
    quote: 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.',
    quoteSource: 'QS. Ar-Rum: 21',
    status: 'active',
  }).returning()

  console.log('✅ Invitation created:', invitation.id)

  // Insert sample guests
  const sampleGuests = [
    { name: 'Budi Santoso', slug: 'budi-santoso' },
    { name: 'Rina Wijaya', slug: 'rina-wijaya' },
    { name: 'Ahmad Hidayat', slug: 'ahmad-hidayat' },
    { name: 'Dewi Lestari', slug: 'dewi-lestari' },
    { name: 'Andi Pratama', slug: 'andi-pratama' },
  ]

  for (const guest of sampleGuests) {
    await db.insert(guests).values({
      invitationId: invitation.id,
      name: guest.name,
      slug: guest.slug,
      attending: 'pending',
    })
  }

  console.log('✅ Sample guests created')

  // Insert sample wishes
  const sampleWishes = [
    {
      guestName: 'Rina Wijaya',
      message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, wa rahmah. Barakallahu lakuma wa baraka alaikuma.',
      approved: true,
    },
    {
      guestName: 'Ahmad Hidayat',
      message: 'Semoga selalu diberkahi kebahagiaan dan dilimpahkan rezeki yang halal. Aamiin.',
      approved: true,
    },
    {
      guestName: 'Dewi Lestari',
      message: 'Bahagia selalu untuk kalian berdua! Nanti aku dateng ya! 🎉',
      approved: true,
    },
  ]

  for (const wish of sampleWishes) {
    await db.insert(wishes).values({
      invitationId: invitation.id,
      guestName: wish.guestName,
      message: wish.message,
      approved: wish.approved,
    })
  }

  console.log('✅ Sample wishes created')

  console.log('🎉 Seeding completed!')
  process.exit(0)
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error)
  process.exit(1)
})
