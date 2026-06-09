# Elías Coneo — Diseño Interior & Experiencias

Landing page premium (editorial, lujo atemporal) para el estudio de diseño interior
**Elías Coneo**. Construida con **HTML, CSS y JavaScript puro** (sin frameworks, sin
dependencias en tiempo de ejecución). Lista para abrir desde `index.html`.

> _“Diseñamos espacios que se viven, se sienten y se recuerdan.”_

---

## ✨ Lo que incluye
- **Pantalla de carga cinematográfica** “Después del Agua” (ondas, reflejo, reveal del logo).
- **Hero** a pantalla completa con la fotografía real del estudio.
- Secciones: Colección *Después del Agua* (con cuenta regresiva a Sept. 2026), Filosofía,
  Servicios, Portafolio editorial, Proceso, Testimonios, Sobre Elías, CTA + formulario y Footer.
- **Mobile-first** real, animaciones de scroll refinadas, parallax sutil, `prefers-reduced-motion`.
- **SEO técnico**: meta tags, Open Graph, Twitter Cards, JSON-LD (ProfessionalService),
  `sitemap.xml`, `robots.txt`, favicons y `site.webmanifest`.
- **Accesibilidad**: HTML semántico, skip-link, foco visible, `alt`, contraste cuidado.
- Logo de marca **vectorizado desde el material original** (extraído del PDF de rebranding),
  recoloreado a marfil / terracota / teal / carboncillo según el fondo.

## 🎨 Marca
| | |
|---|---|
| **Tipografías** | Cormorant Garamond (títulos) · Chillax/Jost (texto) |
| **Marfil** `#F7F4EE` · **Arena** `#D8CBB8` · **Topo** `#8A8175` | **Teal** `#0F353C` · **Terracota** `#A56937` · **Sienna** `#7F4920` · **Blush** `#FCEDE3` · **Dorado** `#C5A46D` |

## 📁 Estructura
```
elias-coneo/
├─ index.html              ← página principal
├─ css/styles.css          ← sistema de diseño completo
├─ js/main.js              ← loader, nav, reveals, countdown, form→WhatsApp
├─ assets/
│  ├─ logo/                ← logo real (horizontal/vertical/icono, varios colores)
│  ├─ favicon/             ← favicons + apple-touch + manifest icon
│  └─ img/                 ← fotos web (hero real, render 3D, og-image)
│     ├─ proyectos/        ← (vacío) ← aquí van las fotos de proyectos
│     └─ coleccion/        ← (vacío) ← aquí van las fotos de la colección
├─ GUIA-IMAGENES.md        ← 📸 qué foto subir, con qué nombre y tamaño
├─ site.webmanifest · robots.txt · sitemap.xml
└─ _serve.mjs              ← servidor local opcional para previsualizar
```

## ▶️ Previsualizar
- **Opción simple:** abre `index.html` con doble clic.
- **Recomendado (servidor local):**
  ```bash
  node _serve.mjs      # luego abre http://localhost:5204
  ```

## 🛠️ Personalizar (pendientes)
1. **Fotografías reales** → ver **`GUIA-IMAGENES.md`** (solo copiar archivos con el nombre indicado).
2. **WhatsApp** → en `js/main.js`, objeto `CONFIG.whatsapp` (número real con código de país).
3. **Contacto** → en `index.html` (footer y JSON-LD): correo, Instagram, ciudad, teléfono.
4. **Testimonios y nombres de proyectos** son editables directamente en `index.html`.

---

Hecho con sensibilidad — diseño interior que se vive, se siente y se recuerda.
