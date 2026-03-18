"use client";

import { useTheme } from "@/contexts/ThemeContext";
import {
  StandardLayout,
  OceanDreamerLayout,
  VinylNightsLayout,
  BeachLifestyleLayout,
  SurfRiderLayout,
  CountrySoulLayout,
  CyberNeonLayout,
  GlassAuroraLayout,
  StoryHighlightsLayout,
  BentoCreativeLayout,
  PhotoBackdropLayout,
  EditorialChicLayout,
  LifestyleCreatorLayout,
  TravelArchLayout,
  NaturePhotographerLayout,
  WellnessCoachLayout,
  LuxuryBusinessLayout,
  GradientWaveLayout,
  NeonGridLayout,
  MinimalCardLayout,
  PolaroidLayout,
  RetroSynthwaveLayout,
  BotanicalLayout,
  IsometricLayout,
  defaultProfileData,
  type ProfileData,
} from "@/components/themes/layouts";

// Font family mapping
const fontFamilyMap: Record<string, string> = {
  'inter': 'Inter, system-ui, sans-serif',
  'poppins': 'Poppins, system-ui, sans-serif',
  'playfair': 'Playfair Display, Georgia, serif',
  'space-grotesk': 'Space Grotesk, system-ui, sans-serif',
  'serif': 'Georgia, Times New Roman, serif',
  'mono': 'JetBrains Mono, Consolas, monospace',
};

// Font size mapping
const fontSizeMap: Record<string, { heading: string; body: string; small: string }> = {
  'small': { heading: '1.25rem', body: '0.8rem', small: '0.7rem' },
  'medium': { heading: '1.5rem', body: '0.875rem', small: '0.75rem' },
  'large': { heading: '1.875rem', body: '1rem', small: '0.875rem' },
};

// Map of layout IDs to their components
const layoutComponents: Record<string, React.ComponentType<{ profile: ProfileData; embedded?: boolean; onLinkClick?: (link: any) => void }>> = {
  "standard": StandardLayout,
  "ocean-dreamer": OceanDreamerLayout,
  "vinyl-nights": VinylNightsLayout,
  "beach-lifestyle": BeachLifestyleLayout,
  "surf-rider": SurfRiderLayout,
  "country-soul": CountrySoulLayout,
  "cyber-neon": CyberNeonLayout,
  "glass-aurora": GlassAuroraLayout,
  "story-highlights": StoryHighlightsLayout,
  "bento-creative": BentoCreativeLayout,
  "photo-backdrop": PhotoBackdropLayout,
  "editorial-chic": EditorialChicLayout,
  "lifestyle-creator": LifestyleCreatorLayout,
  "travel-arch": TravelArchLayout,
  "nature-photographer": NaturePhotographerLayout,
  "wellness-coach": WellnessCoachLayout,
  "luxury-business": LuxuryBusinessLayout,
  "gradient-wave": GradientWaveLayout,
  "neon-grid": NeonGridLayout,
  "minimal-card": MinimalCardLayout,
  "polaroid": PolaroidLayout,
  "retro-synthwave": RetroSynthwaveLayout,
  "botanical": BotanicalLayout,
  "isometric": IsometricLayout,
};

interface LayoutRendererProps {
  profile?: ProfileData;
  embedded?: boolean;
  onLinkClick?: (link: any) => void;
  layoutId?: string; // Override the context layoutThemeId
  applyCustomStyles?: boolean; // Whether to apply custom colors/fonts/buttons
}

export function LayoutRenderer({ 
  profile = defaultProfileData, 
  embedded = false, 
  onLinkClick,
  layoutId,
  applyCustomStyles = true
}: LayoutRendererProps) {
  const { layoutThemeId, customColors, customFonts, customButtons, useCustomColors } = useTheme();
  
  // Use provided layoutId or fall back to context
  const activeLayoutId = layoutId || layoutThemeId;
  
  // Get the component for the active layout, fallback to OceanDreamer
  const LayoutComponent = layoutComponents[activeLayoutId] || OceanDreamerLayout;

  // Build animation class
  const animationClass = customButtons.animation !== 'none' ? `animate-${customButtons.animation}` : '';
  
  // Unique container ID for specific CSS targeting
  const containerId = `theme-container-${Date.now()}`;

  // If not applying custom styles OR custom colors disabled, render layout as-is (no overrides)
  if (!applyCustomStyles || !useCustomColors) {
    // When using layout colors, don't override anything - show original layout design
    return <LayoutComponent profile={profile} embedded={embedded} onLinkClick={onLinkClick} />;
  }

  // Get font families
  const headingFont = fontFamilyMap[customFonts.headingFont] || fontFamilyMap.inter;
  const bodyFont = fontFamilyMap[customFonts.bodyFont] || fontFamilyMap.inter;
  const fontSize = fontSizeMap[customFonts.fontSize] || fontSizeMap.medium;

  // Create unique style ID to avoid conflicts
  const styleId = `custom-theme-${activeLayoutId}`;
  
  // Generate background style based on type
  let bgStyle = customColors.backgroundColor;
  let bgImageStyle = {};
  
  if (customColors.backgroundType === 'gradient') {
    bgStyle = customColors.backgroundGradient;
  } else if (customColors.backgroundType === 'image' && customColors.backgroundImage) {
    bgImageStyle = {
      backgroundImage: `url(${customColors.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };
  }

  return (
    <div 
      className={`custom-theme-container ${animationClass}`} 
      data-theme-id={styleId}
      style={{ 
        background: customColors.backgroundType === 'image' ? 'transparent' : bgStyle,
        ...bgImageStyle,
        minHeight: '100%',
        width: '100%'
      }}
    >
      <style>{`
        /* Force background on all nested elements - only for solid/gradient */
        ${customColors.backgroundType !== 'image' ? `
        .custom-theme-container,
        .custom-theme-container > *,
        .custom-theme-container > div,
        .custom-theme-container > div > div {
          background: ${bgStyle} !important;
          background-color: transparent !important;
        }
        
        /* Override any inline background styles on layout wrapper */
        .custom-theme-container > div[style],
        .custom-theme-container > div > div[style] {
          background: ${bgStyle} !important;
        }
        ` : `
        /* Image background - make inner elements transparent */
        .custom-theme-container > div,
        .custom-theme-container > div > div {
          background: transparent !important;
        }
        `}
        
        /* Headings */
        .custom-theme-container h1 {
          font-family: ${headingFont} !important;
          color: ${customColors.textColor} !important;
          font-size: ${fontSize.heading} !important;
        }
        
        .custom-theme-container h2 {
          font-family: ${headingFont} !important;
          color: ${customColors.textColor} !important;
        }
        
        /* Body text */
        .custom-theme-container p {
          font-family: ${bodyFont} !important;
          font-size: ${fontSize.body} !important;
          color: ${customColors.subtextColor} !important;
        }
        
        /* Link buttons - target ALL anchor elements except social icons */
        .custom-theme-container a:not(.social-icon-link):not([aria-label]) {
          background: ${customColors.buttonBackground} !important;
          border-radius: ${customButtons.borderRadius}px !important;
          ${customButtons.shadow ? `box-shadow: 0 4px 14px rgba(0,0,0,0.15) !important;` : 'box-shadow: none !important;'}
          transition: all 0.2s ease !important;
        }
        
        /* Override inline border-radius from Framer Motion */
        .custom-theme-container a[class*="rounded"]:not(.social-icon-link) {
          border-radius: ${customButtons.borderRadius}px !important;
        }
        
        /* Button text - all span inside link buttons */
        .custom-theme-container a:not(.social-icon-link):not([aria-label]) span {
          color: ${customColors.buttonText} !important;
        }
        
        /* Preserve social icons - explicit exclusion */
        .custom-theme-container .social-icons-container,
        .custom-theme-container .social-icons-container a,
        .custom-theme-container .social-icon-link,
        .custom-theme-container a[aria-label] {
          background: transparent !important;
          box-shadow: none !important;
          border-radius: 50% !important;
        }
        
        /* Keep social icon colors */
        .custom-theme-container .social-icons-container svg,
        .custom-theme-container .social-icon-link svg {
          /* Preserve original styling */
        }
        
        /* Animations - exclude social icons */
        .custom-theme-container.animate-hover-lift a:not(.social-icon-link):not([aria-label]):hover {
          transform: translateY(-4px) scale(1.02) !important;
          box-shadow: 0 8px 25px rgba(0,0,0,0.2) !important;
        }
        
        .custom-theme-container.animate-pulse a:not(.social-icon-link):not([aria-label]) {
          animation: customPulseAnim 2s ease-in-out infinite !important;
        }
        
        .custom-theme-container.animate-glow a:not(.social-icon-link):not([aria-label]) {
          box-shadow: 0 0 20px ${customColors.accentColor}40, 0 4px 14px rgba(0,0,0,0.1) !important;
        }
        
        @keyframes customPulseAnim {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.02); opacity: 0.9; }
        }
      `}</style>
      <LayoutComponent profile={profile} embedded={embedded} onLinkClick={onLinkClick} />
    </div>
  );
}

// Export layout components map for external use
export { layoutComponents, defaultProfileData };
