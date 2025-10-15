# 🎨 Moggi App - Design Guide

## Farbschema

Die App verwendet ein modernes **Orange-Schwarz-Weiß** Farbschema.

### Primärfarben

| Farbe | Hex-Code | Verwendung |
|-------|----------|------------|
| **Orange** | `#FF6B00` | Primärfarbe, Buttons, Highlights, aktive Tab Icons |
| **Helles Orange** | `#FF8C33` | Hover-Effekte, leichte Akzente |
| **Dunkles Orange** | `#CC5500` | Pressed States |

### Schwarz & Grau

| Farbe | Hex-Code | Verwendung |
|-------|----------|------------|
| **Schwarz** | `#1A1A1A` | Header-Hintergrund, Haupttext |
| **Dunkelgrau** | `#2D2D2D` | Sekundäre dunkle Elemente |
| **Mittelgrau** | `#666666` | Sekundärtext, inaktive Icons |
| **Hellgrau** | `#E5E5E5` | Rahmen, Trennlinien |

### Weiß & Hintergründe

| Farbe | Hex-Code | Verwendung |
|-------|----------|------------|
| **Weiß** | `#FFFFFF` | Karten, Haupthintergrund, Tab Bar |
| **Hintergrund Hell** | `#F5F5F5` | Seiten-Hintergrund |

## Verwendung im Code

```typescript
import colors from '../theme/colors';

// Beispiel:
backgroundColor: colors.primary,    // Orange
color: colors.white,               // Weiß
borderColor: colors.border,        // Hellgrau
```

## Design-Prinzipien

1. **Kontrast**: Schwarze Header mit weißem Text und orangenen Akzenten
2. **Klarheit**: Weiße Karten auf hellem Hintergrund mit Schatten
3. **Konsistenz**: Alle Screens folgen dem gleichen Layout-Muster
4. **Moderne Icons**: Ionicons mit Outline-Varianten für inaktive Zustände

## Komponenten-Styling

### Header
- Hintergrund: Schwarz (`colors.black`)
- Titel: Weiß (`colors.white`)
- Untertitel: Orange (`colors.primary`)

### Karten
- Hintergrund: Weiß (`colors.white`)
- Schatten: Leicht, für Tiefe
- Border Radius: 12px
- Orange Akzent-Streifen links (4px)

### Tab Bar
- Hintergrund: Weiß
- Aktive Icons: Orange
- Inaktive Icons: Mittelgrau

### Buttons & CTAs
- Primärbutton: Orange Hintergrund, weißer Text
- Sekundärbutton: Weißer Hintergrund, schwarzer Text, oranger Rahmen

## Typografie

- **Header Titel**: 32px, Bold, Weiß/Schwarz
- **Header Untertitel**: 18px, Regular, Orange/Grau
- **Section Titel**: 22px, Semi-Bold, Schwarz
- **Body Text**: 16px, Regular, Grau
- **Tab Labels**: 12px, Semi-Bold

## Schatten & Elevation

```typescript
shadowColor: colors.black,
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 4,
elevation: 3,  // für Android
```

## Accessibility

- Kontrastverhältnis zwischen Orange und Weiß: ✅ WCAG AA
- Kontrastverhältnis zwischen Schwarz und Weiß: ✅ WCAG AAA
- Alle wichtigen Aktionen sind auch ohne Farbe erkennbar (Icons + Text)

