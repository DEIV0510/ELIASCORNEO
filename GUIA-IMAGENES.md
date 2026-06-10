# 📸 Guía para subir las fotografías reales — Elías Coneo

La landing ya está **100% terminada y funcional**. Mientras subes las fotos reales, cada
espacio muestra una **placa artística de marca** (degradado + monograma) para que el sitio
se vea elegante. En cuanto coloques una imagen con el **nombre exacto** indicado abajo,
aparecerá automáticamente en su lugar (no hay que tocar el código).

> **Cómo funciona:** cada `<img>` apunta a una ruta. Si el archivo existe, se muestra la foto.
> Si no existe, se muestra la placa de marca. Solo tienes que **copiar tus fotos con el nombre
> y carpeta correctos**.

## ✅ Recomendaciones de calidad
- Formato: **.jpg** (o .webp). Calidad alta, pero optimizadas (<400 KB por imagen idealmente).
- Resolución: usa el tamaño sugerido o mayor (respetando la proporción).
- Color: tonos cálidos, luz natural, estética serena (acorde a la marca).
- Después de subir varias, puedo **optimizarlas y convertirlas a WebP** para máxima velocidad.

---

## 1) HERO (portada)
Ya usa la **foto real** extraída del PDF de marca. Si tienes una toma en mayor resolución:
| Archivo | Carpeta | Proporción | Tamaño sugerido |
|---|---|---|---|
| *(opcional)* `interior-real-1224.jpg` | `assets/img/` | panorámica | 1920×940+ |

## 2) COLECCIÓN · Después del Agua
| Archivo | Carpeta | Proporción | Tamaño sugerido |
|---|---|---|---|
| `coleccion-01.jpg` | `assets/img/coleccion/` | vertical 3:4 | 900×1200 |
| `coleccion-02.jpg` | `assets/img/coleccion/` | vertical 3:4 | 900×1200 |

*(El render 3D del centro ya es real, del estudio.)*

## 3) FILOSOFÍA
| Archivo | Carpeta | Proporción | Tamaño sugerido |
|---|---|---|---|
| `filosofia.jpg` | `assets/img/` | vertical 4:5 | 1000×1250 |

## 4) PORTAFOLIO (Proyectos)
Es una **galería mosaico (masonry) + lightbox**. El **Proyecto destacado (Casa Marea)** ya usa la foto real (va arriba, grande). Sube los del mosaico:
| Archivo | Carpeta | Proporción | Tamaño sugerido | Proyecto |
|---|---|---|---|---|
| `proyecto-02.jpg` | `assets/img/proyectos/` | vertical 4:5 | 800×1000 | Apartamento Sereno · Bogotá |
| `proyecto-03.jpg` | `assets/img/proyectos/` | cuadrada 1:1 | 1000×1000 | Café Lumière · Medellín |
| `proyecto-04.jpg` | `assets/img/proyectos/` | horizontal 16:9 | 1200×675 | Penthouse Horizonte · Santa Marta |
| `proyecto-05.jpg` | `assets/img/proyectos/` | vertical 4:5 | 800×1000 | Estudio Atelier · Barranquilla |
| `proyecto-06.jpg` | `assets/img/proyectos/` | vertical 4:5 | 800×1000 | Suite Después del Agua · Cartagena |
| `proyecto-07.jpg` | `assets/img/proyectos/` | cuadrada 1:1 | 1000×1000 | Loft Marfil · Medellín |
| `proyecto-08.jpg` | `assets/img/proyectos/` | horizontal 16:9 | 1200×675 | Terraza Origen · Cartagena |
| `proyecto-09.jpg` | `assets/img/proyectos/` | vertical 4:5 | 800×1000 | Casa Travertino · Barranquilla |

> La proporción es flexible — el mosaico se adapta. Los nombres/ciudad/tipo son **editables** en `index.html` (sección Portafolio). Al hacer clic en cualquier imagen (o en "Ver galería completa") se abre el **lightbox** para verlas grandes y navegar.

## 5) SOBRE ELÍAS (retrato profesional)
| Archivo | Carpeta | Proporción | Tamaño sugerido |
|---|---|---|---|
| `elias-retrato.jpg` | `assets/img/` | vertical 4:5 | 1000×1250 |

## 6) CTA FINAL (imagen emocional de fondo)
| Archivo | Carpeta | Proporción | Tamaño sugerido |
|---|---|---|---|
| `cta.jpg` | `assets/img/` | panorámica 16:9 | 1920×1080 |

---

## ✍️ Datos de contacto a reemplazar (placeholders)
En **`js/main.js`** (arriba del todo, objeto `CONFIG`):
- `whatsapp`: número real con código de país (ej. `573001234567`).

En **`index.html`** (footer + JSON-LD):
- Correo (`hola@eliasconeo.com`), Instagram (`@eliasconeo`), ciudad/ubicación, teléfono.

> Cuando tengas las fotos, pásamelas y las **integro, optimizo y convierto a WebP** por ti.
