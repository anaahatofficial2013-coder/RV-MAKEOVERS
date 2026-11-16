'use client';

const navLinks = [
  { label: 'HOME', id: 'hero' },
  { label: 'SERVICES', id: 'services' },
  { label: 'BRIDAL', id: 'bridal' },
  { label: 'ACADEMY', id: 'academy' },
  { label: 'ABOUT', id: 'about' },
  { label: 'GALLERY', id: 'gallery' },
  { label: 'CONTACT', id: 'contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#faf8f5] border-t border-[rgba(184,149,106,0.15)] py-16 px-6 md:px-16 lg:px-24">
      {/* Top Row */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div>
          <p className="font-serif text-xl tracking-wider text-[#1a1612]">
            RV MAKEOVERS
          </p>
          <p className="font-serif italic text-sm text-[#9a8e80] mt-1">
            Where beauty becomes art.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() =>
                document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })
              }
              className="text-[10px] tracking-[0.2em] uppercase text-[#9a8e80] hover:text-[#b8956a] transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Middle Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-12 py-8 border-y border-[rgba(184,149,106,0.1)]">
        <a
          href="tel:+917508533429"
          className="text-sm text-[#6b5e50] hover:text-[#b8956a] transition-colors duration-300"
        >
          +91 75085 33429
        </a>
        <a
          href="https://instagram.com/rv_makeovers_nabha"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#6b5e50] hover:text-[#b8956a] transition-colors duration-300"
        >
          @rv_makeovers_nabha
        </a>
        <p className="text-sm text-[#6b5e50]">Nabha, Punjab</p>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-8">
        <p className="text-xs text-[#9a8e80]">
          © 2026 RV Makeovers. All rights reserved.
        </p>
        <p className="text-xs text-[#9a8e80]">
          Crafted with care in Nabha, Punjab
        </p>
      </div>
    </footer>
  );
}