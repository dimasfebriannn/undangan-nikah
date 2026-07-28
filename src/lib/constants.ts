import type { Invitation, TimelineItem, GalleryImage } from '../types'

export const SAMPLE_INVITATION: Invitation = {
  id: '1',
  slug: 'galih-maesya',
  groomName: 'Galih',
  brideName: 'Maesya',
  groomFull: 'Galih Dwi Rahman Kuswanto Saehati Putra',
  brideFull: 'Maesya Bella Dian Falasifah',
  groomParents: 'Bapak H. Bambang Kuswanto & Ibu Hj. Anik Handayani',
  brideParents: 'Bapak H. Ahmad Wijaya & Ibu Hj. Fatimah Azzahra',
  weddingDate: '2026-09-20',
  akadTime: '08:00 WIB',
  akadLocation: 'Krajan, Karang Kedawung, Kec. Mumbulsari, Kab. Jember, Jawa Timur 68174',
  resepsiTime: '11:00 WIB',
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
  heroImages: [
    '/images/couple/hero.jpeg',
    '/images/couple/hero2.jpeg',
    '/images/couple/hero3.jpeg',
  ],
  musicUrl: '',
  quote: 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.',
  quoteSource: 'QS. Ar-Rum: 21',
  status: 'active',
  createdAt: new Date().toISOString(),
}

export const SAMPLE_TIMELINE: TimelineItem[] = [
  {
    id: '1',
    title: 'Pertama Bertemu',
    date: 'Maret 2020',
    description: 'Kami pertama kali bertemu di kampus, saat sesi orientasi mahasiswa baru.',
    icon: 'Sparkles',
    photoUrl: '/images/love-story/pertama-bertemu.jpeg',
  },
  {
    id: '2',
    title: 'Mulai Dekat',
    date: 'Juni 2020',
    description: 'Sering mengerjakan tugas bersama di perpustakaan, perlahan kami semakin dekat.',
    icon: 'Coffee',
    photoUrl: '/images/love-story/mulai-dekat.jpeg',
  },
  {
    id: '3',
    title: 'Resmi Berpacaran',
    date: 'September 2020',
    description: 'Setelah beberapa bulan dekat, kami memutuskan untuk berpacaran.',
    icon: 'Heart',
    photoUrl: '/images/love-story/berpacaran.jpeg',
  },
  {
    id: '4',
    title: 'Lamaran',
    date: 'Maret 2026',
    description: 'Setelah 6 tahun bersama, Budi memberanikan diri untuk melamar Sarah.',
    icon: 'Ring',
    photoUrl: '/images/love-story/lamaran.jpeg',
  },
  {
    id: '5',
    title: 'Hari Bahagia',
    date: '20 September 2026',
    description: 'InsyaAllah, kami akan mengikat janji suci di hadapan Allah SWT.',
    icon: 'CalendarHeart',
    photoUrl: '/images/love-story/hari-bahagia.jpeg',
  },
]

export const SAMPLE_GALLERY: GalleryImage[] = [
  { src: '/images/gallery/1.jpeg', alt: 'Foto prewedding 1' },
  { src: '/images/gallery/2.jpeg', alt: 'Foto prewedding 2' },
  { src: '/images/gallery/3.jpeg', alt: 'Foto prewedding 3' },
  { src: '/images/gallery/4.jpeg', alt: 'Foto prewedding 4' },
  { src: '/images/gallery/5.jpeg', alt: 'Foto prewedding 5' },
  { src: '/images/gallery/6.jpeg', alt: 'Foto prewedding 6' },
]

export const SAMPLE_GUESTS = [
  { id: 'g1', name: 'Budi Santoso', slug: 'budi-santoso' },
  { id: 'g2', name: 'Rina Wijaya', slug: 'rina-wijaya' },
  { id: 'g3', name: 'Ahmad Hidayat', slug: 'ahmad-hidayat' },
  { id: 'g4', name: 'Dewi Lestari', slug: 'dewi-lestari' },
  { id: 'g5', name: 'Andi Pratama', slug: 'andi-pratama' },
]

export const SAMPLE_WISHES = [
  {
    id: 'w1',
    guestName: 'Rina Wijaya',
    message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, wa rahmah. Barakallahu lakuma wa baraka alaikuma.',
    createdAt: '2026-07-25T10:00:00Z',
  },
  {
    id: 'w2',
    guestName: 'Ahmad Hidayat',
    message: 'Semoga selalu diberkahi kebahagiaan dan dilimpahkan rezeki yang halal. Aamiin.',
    createdAt: '2026-07-26T14:30:00Z',
  },
  {
    id: 'w3',
    guestName: 'Dewi Lestari',
    message: 'Bahagia selalu untuk kalian berdua! Nanti aku dateng ya! 🎉',
    createdAt: '2026-07-27T09:15:00Z',
  },
]
