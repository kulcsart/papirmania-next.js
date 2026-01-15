/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: '640px',   
      md: '768px',    
      lg: '1024px',   
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        // Primitive colors from design system
        primary: '#7B6A3F',
        secondary: '#27414C',
        white: '#FFFFFF',
        dark: '#3B3935',
        light: '#ECE6E1',
        subtle: '#887953',
        muted: '#77736B',
        'opacity-dark': '#14141466',
        'opacity-light': '#FFFFFF33',
        'input': '#080705',
        'input-light': '#08070513',
        
        // Paper-themed colors
        paperGold: '#B8860B',
        paperBrown: '#8B4513',
        // Primary color system
        primary: {
          background: "var(--primary-background)",
          foreground: "var(--primary-foreground)",
          light: "var(--primary-light)",
          dark: "var(--primary-dark)"
        },
        // Secondary color system
        secondary: {
          background: "var(--secondary-background)",
          foreground: "var(--secondary-foreground)",
          light: "var(--secondary-light)",
          dark: "var(--secondary-dark)"
        },
        // Accent color system
        accent: {
          background: "var(--accent-color)",
          foreground: "var(--accent-foreground)",
          light: "var(--accent-light)",
          dark: "var(--accent-dark)"
        },
        // Text color system
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          inverse: "var(--text-inverse)",
          light: "var(--text-light)"
        },
        // Background color system
        background: {
          main: "var(--bg-main)",
          card: "var(--bg-card)",
          overlay: "var(--bg-overlay)",
          accent: "var(--bg-accent)",
          subtle: "var(--bg-subtle)",
          border: "var(--bg-border)"
        },
        // Border color system
        border: {
          primary: "var(--border-primary)",
          secondary: "var(--border-secondary)",
          light: "var(--border-light)",
          accent: "var(--border-accent)"
        },
        // Component-specific colors
        header: {
          background: "var(--header-bg)"
        },
        button: {
          primary: "var(--button-bg-primary)",
          secondary: "var(--button-bg-secondary)",
          accent: "var(--button-bg-accent)"
        },
        footer: {
          background: "var(--footer-bg)"
        }
      },
      // Typography system
      fontSize: {
        'xs': 'var(--font-size-xs)',
        'sm': 'var(--font-size-sm)',
        'md': 'var(--font-size-md)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)'
      },
      fontWeight: {
        'normal': 'var(--font-weight-normal)',
        'medium': 'var(--font-weight-medium)',
        'semibold': 'var(--font-weight-semibold)',
        'bold': 'var(--font-weight-bold)',
        'extrabold': 'var(--font-weight-extrabold)'
      },
      lineHeight: {
        'xs': 'var(--line-height-xs)',
        'sm': 'var(--line-height-sm)',
        'md': 'var(--line-height-md)',
        'lg': 'var(--line-height-lg)',
        'xl': 'var(--line-height-xl)',
        '2xl': 'var(--line-height-2xl)',
        '3xl': 'var(--line-height-3xl)',
        '4xl': 'var(--line-height-4xl)',
        '5xl': 'var(--line-height-5xl)',
        '6xl': 'var(--line-height-6xl)'
      },
      fontFamily: {
        'maname': ['Maname', 'serif'],
        'crimson': ['Crimson Pro', 'serif'],
        'dm': ['DM Sans', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif']
      },
      maxWidth: {
        'content': '1440px'
      },
      // Spacing system
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
        '5xl': 'var(--spacing-5xl)',
        'paper-texture': '2px'
      },
      // Border radius system
      borderRadius: {
        'xs': 'var(--radius-xs)',
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)'
      },
      // Animation presets
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in',
        'slideUp': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'scale-in': 'scaleIn 0.3s ease-in-out'
      }
    }
  },
  plugins: []
};