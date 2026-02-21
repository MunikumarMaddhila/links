"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ButtonStyle = 'rounded' | 'pill' | 'sharp' | 'outline' | 'icon-left' | 'icon-left-rounded' | 'icon-circle' | 'icon-float';
export type FontStyle = 'inter' | 'serif' | 'mono';

export interface ColorTheme {
  id: string;
  name: string;
  background: string;
  buttonBackground: string;
  buttonText: string;
  text: string;
  subtext: string;
}

export interface ThemeSettings {
  id: string;
  name: string;
  colorScheme: {
    background: string;
    buttonBackground: string;
    buttonText: string;
    text: string;
    subtext: string;
  };
  buttonStyle: ButtonStyle;
  fontStyle: FontStyle;
  buttonShadow?: boolean;
  backgroundPattern?: 'none' | 'dots' | 'grid' | 'gradient';
}

export const colorThemes: ColorTheme[] = [
  {
    id: 'default',
    name: 'Default',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    buttonBackground: 'rgba(255, 255, 255, 0.95)',
    buttonText: '#667eea',
    text: '#ffffff',
    subtext: 'rgba(255, 255, 255, 0.8)',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    buttonBackground: '#ffffff',
    buttonText: '#f5576c',
    text: '#ffffff',
    subtext: 'rgba(255, 255, 255, 0.9)',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    background: 'linear-gradient(135deg, #209cff 0%, #68e0cf 100%)',
    buttonBackground: '#ffffff',
    buttonText: '#209cff',
    text: '#ffffff',
    subtext: 'rgba(255, 255, 255, 0.9)',
  },
  {
    id: 'forest',
    name: 'Forest',
    background: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
    buttonBackground: '#ffffff',
    buttonText: '#56ab2f',
    text: '#ffffff',
    subtext: 'rgba(255, 255, 255, 0.9)',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    background: 'linear-gradient(135deg, #2c3e50 0%, #1a1a2e 100%)',
    buttonBackground: 'rgba(255, 255, 255, 0.1)',
    buttonText: '#ffffff',
    text: '#ffffff',
    subtext: 'rgba(255, 255, 255, 0.7)',
  },
  {
    id: 'candy',
    name: 'Candy',
    background: 'linear-gradient(135deg, #d946ef 0%, #a855f7 100%)',
    buttonBackground: '#ffffff',
    buttonText: '#d946ef',
    text: '#ffffff',
    subtext: 'rgba(255, 255, 255, 0.9)',
  },
];

export const predefinedThemes: ThemeSettings[] = [
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    colorScheme: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      buttonBackground: 'rgba(255, 255, 255, 0.95)',
      buttonText: '#667eea',
      text: '#ffffff',
      subtext: 'rgba(255, 255, 255, 0.8)',
    },
    buttonStyle: 'rounded',
    fontStyle: 'inter',
    buttonShadow: true,
    backgroundPattern: 'none',
  },
  {
    id: 'sunset',
    name: 'Sunset Vibes',
    colorScheme: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      buttonBackground: '#ffffff',
      buttonText: '#f5576c',
      text: '#ffffff',
      subtext: 'rgba(255, 255, 255, 0.9)',
    },
    buttonStyle: 'pill',
    fontStyle: 'inter',
    buttonShadow: true,
    backgroundPattern: 'none',
  },
  {
    id: 'mint',
    name: 'Mint Fresh',
    colorScheme: {
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      buttonBackground: '#ffffff',
      buttonText: '#2d3748',
      text: '#2d3748',
      subtext: '#4a5568',
    },
    buttonStyle: 'rounded',
    fontStyle: 'inter',
    buttonShadow: true,
    backgroundPattern: 'dots',
  },
  {
    id: 'midnight',
    name: 'Midnight Dark',
    colorScheme: {
      background: 'linear-gradient(135deg, #2d3436 0%, #000000 100%)',
      buttonBackground: 'rgba(255, 255, 255, 0.1)',
      buttonText: '#ffffff',
      text: '#ffffff',
      subtext: 'rgba(255, 255, 255, 0.7)',
    },
    buttonStyle: 'outline',
    fontStyle: 'inter',
    buttonShadow: false,
    backgroundPattern: 'grid',
  },
  {
    id: 'neon',
    name: 'Neon Glow',
    colorScheme: {
      background: 'linear-gradient(135deg, #141E30 0%, #243B55 100%)',
      buttonBackground: 'transparent',
      buttonText: '#00ff88',
      text: '#ffffff',
      subtext: '#00ff88',
    },
    buttonStyle: 'outline',
    fontStyle: 'mono',
    buttonShadow: false,
    backgroundPattern: 'grid',
  },
  {
    id: 'peach',
    name: 'Peachy Keen',
    colorScheme: {
      background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      buttonBackground: '#ffffff',
      buttonText: '#ff6b6b',
      text: '#2d3748',
      subtext: '#4a5568',
    },
    buttonStyle: 'pill',
    fontStyle: 'serif',
    buttonShadow: true,
    backgroundPattern: 'none',
  },
  {
    id: 'forest',
    name: 'Forest Green',
    colorScheme: {
      background: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
      buttonBackground: 'rgba(255, 255, 255, 0.95)',
      buttonText: '#134e5e',
      text: '#ffffff',
      subtext: 'rgba(255, 255, 255, 0.85)',
    },
    buttonStyle: 'rounded',
    fontStyle: 'inter',
    buttonShadow: true,
    backgroundPattern: 'dots',
  },
  {
    id: 'royal',
    name: 'Royal Purple',
    colorScheme: {
      background: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
      buttonBackground: '#ffffff',
      buttonText: '#8E2DE2',
      text: '#ffffff',
      subtext: 'rgba(255, 255, 255, 0.9)',
    },
    buttonStyle: 'sharp',
    fontStyle: 'inter',
    buttonShadow: true,
    backgroundPattern: 'none',
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    colorScheme: {
      background: '#ffffff',
      buttonBackground: '#000000',
      buttonText: '#ffffff',
      text: '#000000',
      subtext: '#666666',
    },
    buttonStyle: 'sharp',
    fontStyle: 'mono',
    buttonShadow: false,
    backgroundPattern: 'none',
  },
];

interface ThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  buttonStyle: ButtonStyle;
  setButtonStyle: (style: ButtonStyle) => void;
  fontStyle: FontStyle;
  setFontStyle: (style: FontStyle) => void;
  // Legacy support
  currentTheme: ThemeSettings;
  setTheme: (theme: ThemeSettings) => void;
  profileName: string;
  setProfileName: (name: string) => void;
  profileBio: string;
  setProfileBio: (bio: string) => void;
  profileImage: string;
  setProfileImage: (image: string) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(colorThemes[0]);
  const [buttonStyle, setButtonStyle] = useState<ButtonStyle>('rounded');
  const [fontStyle, setFontStyle] = useState<FontStyle>('inter');
  const [profileName, setProfileName] = useState('Jordan Smith');
  const [profileBio, setProfileBio] = useState('Digital creator ✨');
  const [profileImage, setProfileImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch saved appearance settings from API on mount
  useEffect(() => {
    async function fetchAppearance() {
      try {
        const response = await fetch('/api/users/appearance');
        if (response.ok) {
          const data = await response.json();
          // Apply saved settings
          if (data.colorThemeId) {
            const savedTheme = colorThemes.find(ct => ct.id === data.colorThemeId);
            if (savedTheme) setColorTheme(savedTheme);
          }
          if (data.buttonStyle) setButtonStyle(data.buttonStyle);
          if (data.fontStyle) setFontStyle(data.fontStyle);
          if (data.profileName) setProfileName(data.profileName);
          if (data.profileBio) setProfileBio(data.profileBio);
          if (data.profileImage) setProfileImage(data.profileImage);
        }
      } catch (error) {
        console.log('Appearance API not available, using defaults');
      } finally {
        setIsLoading(false);
      }
    }
    fetchAppearance();
  }, []);

  // Create legacy currentTheme from individual selections
  const currentTheme: ThemeSettings = {
    id: colorTheme.id,
    name: colorTheme.name,
    colorScheme: {
      background: colorTheme.background,
      buttonBackground: colorTheme.buttonBackground,
      buttonText: colorTheme.buttonText,
      text: colorTheme.text,
      subtext: colorTheme.subtext,
    },
    buttonStyle,
    fontStyle,
    buttonShadow: true,
    backgroundPattern: 'none',
  };

  const setTheme = (theme: ThemeSettings) => {
    const matchingColorTheme = colorThemes.find(ct => ct.id === theme.id) || colorThemes[0];
    setColorTheme(matchingColorTheme);
    setButtonStyle(theme.buttonStyle);
    setFontStyle(theme.fontStyle);
  };

  return (
    <ThemeContext.Provider
      value={{
        colorTheme,
        setColorTheme,
        buttonStyle,
        setButtonStyle,
        fontStyle,
        setFontStyle,
        currentTheme,
        setTheme,
        profileName,
        setProfileName,
        profileBio,
        setProfileBio,
        profileImage,
        setProfileImage,
        isLoading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
