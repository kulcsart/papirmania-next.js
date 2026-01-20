'use client';
import { useState } from 'react';
import Button from '../ui/Button';
import { useTemplate } from '../providers/TemplateProvider';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState('')
  const { template, toggleTemplate } = useTemplate()
  const isLightTemplate = template === 'light'

  const menuItems = [
    { id: 'kurzusok', label: 'Kurzusok', href: '/courses', targetId: 'courses-section' },
    { id: 'technikak', label: 'Technikák', href: '/techniques', targetId: 'techniques-section' },
    { id: 'galeria', label: 'Galéria', href: '/gallery', targetId: 'gallery-section' },
    { id: 'rolam', label: 'Rólam', href: '/about', targetId: 'about-section' },
  ]

  const handleMenuItemClick = (itemId: string) => {
    setActiveMenuItem(itemId)
    setMenuOpen(false)
  }

  const handleMenuClick = (targetId?: string, fallbackHref?: string) => {
    if (targetId) {
      const section = document.getElementById(targetId)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    if (fallbackHref) {
      window.location.href = fallbackHref
    }
  }

  return (
    <header className="w-full bg-background-overlay">
      <div className="w-full max-w-content mx-auto px-[32px] sm:px-[48px] lg:px-[64px]">
        {/* Desktop Header */}
        <div className="hidden lg:flex flex-row justify-between items-center py-[32px] gap-8">
          
          {/* Left - Navigation Menu */}
          <nav className="flex-1">
            <div className="flex flex-row gap-[32px] justify-start items-center">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleMenuItemClick(item.id)
                    handleMenuClick(item.targetId, item.href)
                  }}
                  className={`text-center uppercase transition-all duration-300 ${
                    activeMenuItem === item.id 
                      ? 'text-white' 
                      : 'hover:text-white hover:scale-105'
                  }`}
                  style={{
                    fontFamily: 'DM Sans',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '150%',
                    textTransform: 'uppercase',
                    color: activeMenuItem === item.id ? '#ffffff' : 'var(--light, #ECE6E1)'
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Center - Logo */}
          <div className="flex justify-center">
            <img
              src="/images/img_papermania_logo.svg"
              alt="Papírmánia Logo"
              className="w-[68px] h-[68px]"
            />
          </div>

          {/* Right - Actions */}
          <div className="flex-1 flex flex-row justify-end items-center gap-6">
            {/* Template Toggle Button */}
            <button
              onClick={toggleTemplate}
              className="p-2 hover:scale-110 transition-transform duration-300"
              aria-label="Sablon váltás"
              title={isLightTemplate ? 'Sötét téma' : 'Világos téma'}
            >
              <img
                src={isLightTemplate ? '/images/img_lucide_sun.svg' : '/images/img_lucide_moon.svg'}
                alt={isLightTemplate ? 'Light mode' : 'Dark mode'}
                className="w-6 h-6"
              />
            </button>

            {/* Contact Button */}
            <Button
              text="Kapcsolat"
            />
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden flex flex-row justify-between items-center py-[24px] gap-4">
          
          {/* Mobile Menu Toggle */}
          <button 
            className="p-2 hover:scale-105 transition-transform duration-300" 
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Mobile Logo - Centered */}
          <img
            src="/images/img_papermania_logo.svg"
            alt="Papírmánia Logo"
            className="w-[56px] h-[56px]"
          />

          {/* Mobile Actions */}
          <div className="flex flex-row items-center gap-2">
            {/* Mobile Template Toggle */}
            <button
              onClick={toggleTemplate}
              className="p-2 hover:scale-110 transition-transform duration-300"
              aria-label="Sablon váltás"
              title={isLightTemplate ? 'Sötét téma' : 'Világos téma'}
            >
              <img
                src={isLightTemplate ? '/images/img_lucide_sun.svg' : '/images/img_lucide_moon.svg'}
                alt={isLightTemplate ? 'Light mode' : 'Dark mode'}
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <nav className="lg:hidden pb-[24px] border-t border-[#575252]">
            <div className="flex flex-col gap-[16px] pt-[24px]">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleMenuItemClick(item.id)
                    handleMenuClick(item.targetId, item.href)
                  }}
                  className={`text-center uppercase transition-all duration-300 ${
                    activeMenuItem === item.id 
                      ? 'text-white' 
                      : 'hover:text-white hover:scale-105'
                  }`}
                  style={{
                    fontFamily: 'DM Sans',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '150%',
                    textTransform: 'uppercase',
                    color: activeMenuItem === item.id ? '#ffffff' : 'var(--light, #ECE6E1)'
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header;
