// import AuthGuard from '@/components/AuthGuard'
// import HeaderPMI from '@/components/HeaderPMI'


// export default function DashboardPage() {
//   return (
//     <AuthGuard>
//       <HeaderPMI />

//       <main className="max-w-6xl mx-auto px-4 py-6">
//         <h1 className="text-2xl font-bold text-red-600 mb-2">
//           Dashboard ALDEBARAN
//         </h1>

//         <p className="text-gray-700 mb-6">
//           Aplikasi Kesiapsiagaan Bencana Kabupaten Klaten
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="border rounded p-4">
//             <h2 className="font-semibold mb-2">
//               📘 Modul Pembelajaran
//             </h2>
//             <p className="text-sm text-gray-600">
//               Materi kesiapsiagaan bencana
//             </p>
//           </div>

//           <div className="border rounded p-4">
//             <h2 className="font-semibold mb-2">
//               ✅ Checklist Siaga Bencana
//             </h2>
//             <p className="text-sm text-gray-600">
//               Cek kesiapan pribadi
//             </p>
//           </div>

//           <div className="border rounded p-4">
//             <h2 className="font-semibold mb-2">
//               🤖 Asisten AI
//             </h2>
//             <p className="text-sm text-gray-600">
//               Tanya jawab edukasi bencana
//             </p>
//           </div>
//         </div>
//       </main>
//     </AuthGuard>
//   )
// }
// ``
import Link from 'next/link'
import AuthGuard from '@/components/AuthGuard'
import HeaderPMI from '@/components/HeaderPMI'

type QuickCardProps = {
  href: string
  icon: string
  title: string
  desc: string
  cta: string
  badge?: string
}

function QuickCard({ href, icon, title, desc, cta, badge }: QuickCardProps) {
  return (
    <Link
      href={href}
      className="group border border-red-100 rounded-2xl p-5 bg-white hover:shadow-sm hover:border-red-200 transition"
    >
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center text-red-600 text-xl">
          {icon}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-gray-900">{title}</h2>
            {badge && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-100">
                {badge}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-1">{desc}</p>

          <p className="text-xs text-red-600 mt-3 font-semibold group-hover:underline">
            {cta} →
          </p>
        </div>
      </div>
    </Link>
  )
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <HeaderPMI />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* HERO / BANNER PMI */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white p-6 md:p-7 shadow-sm">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute -right-10 -bottom-24 w-72 h-72 rounded-full bg-white/10" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Dashboard ALDEBARAN
              </h1>
              <p className="text-white/90 mt-1">
                Aplikasi Kesiapsiagaan Bencana <b>Kabupaten Klaten</b>
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-white/15 border border-white/20">
                  PMI • Pilot Klaten
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/15 border border-white/20">
                  Edukasi • Checklist • AI (bertahap)
                </span>
              </div>
            </div>

            <div className="bg-white/15 rounded-xl px-4 py-3 border border-white/20">
              <div className="text-xs font-semibold text-white/90">Wilayah</div>
              <div className="text-lg font-bold">Kabupaten Klaten</div>
              <div className="text-xs text-white/80 mt-1">Region: ID-JT-KLT</div>
            </div>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-gray-900">Fitur Utama</h3>
            <span className="text-xs text-gray-500">
              *Beberapa fitur aktif bertahap sesuai MVP
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <QuickCard
              href="/modules"
              icon="📘"
              title="Modul Pembelajaran"
              desc="Materi kesiapsiagaan bencana (Klaten)."
              cta="Buka modul"
              badge="Aktif"
            />

            <QuickCard
              href="/checklist"
              icon="✅"
              title="Checklist Tas Siaga"
              desc="Cek kesiapan pribadi dan simpan progres."
              cta="Buka checklist"
              badge="Tahap D"
            />

            <QuickCard
              href="/ai"
              icon="🤖"
              title="Asisten AI"
              desc="Tanya jawab edukasi bencana (aman & sederhana)."
              cta="Mulai tanya"
              badge="Tahap E"
            />
          </div>
        </section>

        {/* INFO / STATUS PANEL */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h3 className="font-bold text-gray-900 mb-2">Catatan Penting</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Konten di ALDEBARAN ditujukan untuk edukasi kesiapsiagaan. Untuk keadaan
              darurat, ikuti arahan resmi PMI/BPBD/BMKG atau gunakan fitur SOS
              (akan ditambahkan pada fase berikutnya).
            </p>

            <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-100">
              <p className="text-sm text-red-700">
                Jika terjadi keadaan darurat sekarang, gunakan jalur resmi darurat setempat.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h3 className="font-bold text-gray-900 mb-2">Rencana Pengembangan</h3>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
              <li>Lengkapi modul (banjir, gempa, longsor, gunung).</li>
              <li>Checklist tambahan (papan informasi bencana, panduan keselamatan).</li>
              <li>AI edukasi: penyederhanaan literasi & ringkasan materi.</li>
              <li>Notifikasi BMKG & fitur SOS (fase lanjutan).</li>
            </ul>
          </div>
        </section>

        {/* FOOTER LINK */}
        <section className="mt-6 flex justify-end">
          <Link
            href="/modules"
            className="text-sm text-red-600 font-semibold hover:underline"
          >
            Mulai dari Modul Pembelajaran →
          </Link>
        </section>
      </main>
    </AuthGuard>
  )
}
``