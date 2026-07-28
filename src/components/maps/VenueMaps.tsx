import { ScrollReveal } from '../shared/ScrollReveal'
import { SectionContainer } from '../shared/SectionContainer'
import { SAMPLE_INVITATION } from '../../lib/constants'
import { MapPin, Navigation } from 'lucide-react'

const AKAD_LAT = -8.2336769
const AKAD_LNG = 113.7612143
const AKAD_OSM = `https://www.openstreetmap.org/export/embed.html?bbox=${AKAD_LNG - 0.012}%2C${AKAD_LAT - 0.008}%2C${AKAD_LNG + 0.012}%2C${AKAD_LAT + 0.008}&layer=mapnik&marker=${AKAD_LAT}%2C${AKAD_LNG}`

const RES_LAT = -8.1765055
const RES_LNG = 113.7170857
const RES_OSM = `https://www.openstreetmap.org/export/embed.html?bbox=${RES_LNG - 0.012}%2C${RES_LAT - 0.008}%2C${RES_LNG + 0.012}%2C${RES_LAT + 0.008}&layer=mapnik&marker=${RES_LAT}%2C${RES_LNG}`

function MapEmbed({ title, osmEmbed, mapsUrl }: { title: string; osmEmbed: string; mapsUrl: string }) {
  return (
    <ScrollReveal>
      <div className="group relative overflow-hidden rounded-2xl" style={{
        boxShadow: '0 8px 32px rgba(44,30,20,0.1)',
      }}>
        {/* Map */}
        <div className="relative h-56 sm:h-64">
          <iframe
            src={osmEmbed}
            width="100%"
            height="100%"
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.02]"
            style={{ border: 0, filter: 'sepia(0.3) saturate(0.85) brightness(1.03) hue-rotate(-8deg)' }}
            loading="lazy"
          />
          {/* Warm overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(180deg, rgba(240,230,216,0.5) 0%, transparent 25%, transparent 75%, rgba(240,230,216,0.5) 100%)',
          }} />
        </div>

        {/* Floating label */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between" style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          borderRadius: 12,
          padding: '10px 14px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full" style={{
              background: 'var(--color-accent)',
            }}>
              <MapPin size={12} color="#fff" />
            </div>
            <span className="text-xs font-semibold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
              {title}
            </span>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium transition-all duration-200 hover:scale-105"
            style={{
              background: 'var(--color-accent)',
              color: '#fff',
            }}
          >
            <Navigation size={10} />
            Maps
          </a>
        </div>
      </div>
    </ScrollReveal>
  )
}

export function VenueMaps() {
  const data = SAMPLE_INVITATION

  return (
    <SectionContainer>
      <ScrollReveal>
        <p className="mb-3 text-center text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-subtle)' }}>
          Lokasi Acara
        </p>
        <h2 className="mb-8 text-center text-5xl md:text-6xl" style={{ fontFamily: 'var(--font-decorative)', color: 'var(--color-accent)', lineHeight: 1.1 }}>
          Peta Lokasi
        </h2>
      </ScrollReveal>

      <div className="space-y-5">
        <MapEmbed title="Akad Nikah" osmEmbed={AKAD_OSM} mapsUrl={data.venueMapsUrl} />
        <MapEmbed title="Resepsi" osmEmbed={RES_OSM} mapsUrl={data.resepsiMapsUrl || data.venueMapsUrl} />
      </div>
    </SectionContainer>
  )
}
