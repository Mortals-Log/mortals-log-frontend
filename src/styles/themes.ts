export const COLOR = {
    GRAY700: '#303239',
    GRAY600: '#50525F',
    GRAY500: '#7F8295',
    GRAY400: '#AEB2C6',
    GRAY300: '#D0D3E1',
    GRAY200: '#E4E5ED',
    GRAY100: '#F1F2F6',
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    BLUE500: '#509CF7',
    BLUE400: '#79B4F9',
    BLUE300: '#AED1FB',
    BLUE200: '#CEE7F7',
    PINK600: '#FD5B73',
    PINK500: '#FF8093',
    FILTER: 'rgba(127, 130, 149, 0.30)',
    TOAST: 'rgba(0, 0, 0, 0.80)',
  } as const;
  
  export const FONT = {
    // 추후 추가
  } as const;
  
  export const theme = {
    COLOR,
    FONT,
  } as const;
  
  export type ColorType = typeof COLOR;
  export type FontType = typeof FONT;  