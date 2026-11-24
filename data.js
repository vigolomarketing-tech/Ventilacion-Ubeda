// CONFIG — Ventilación Ubeda (demo Vigolo Web Studio)
// Todo lo que cambia de un comercio a otro vive acá.
// Marcado con "PENDIENTE CLIENTE" = dato a confirmar con el dueño.

const CONFIG = {
  negocio: {
    nombre: "Ventilación Ubeda",
    rubro: "Fábrica de extractores de aire",
    localidad: "Glew",
    eslogan: "Extractores de aire industriales y semi industriales, hechos a la medida de tus necesidades.",
    logo: "img/logo.webp",
  },

  colores: {
    primario: "#d92b2b",
    acento: "#f4742b",
    oscuro: "#1f2125",
    fondo: "#f4f2ef",
  },

  contacto: {
    whatsapp: "5491171201139",
    mensajeWhatsapp: "¡Hola! Vi su web y quería consultar por un extractor...",
    telefono: "+54 9 11 7120-1139",
    email: "david_euclides@hotmail.com",
    instagram: "", // PENDIENTE CLIENTE (link al perfil de Instagram)
    direccion: "Av. Hipólito Yrigoyen 21006, Glew, Almirante Brown, Buenos Aires",
    mapsEmbed: "https://www.google.com/maps?q=Av.+Hip%C3%B3lito+Yrigoyen+21006,+Glew,+Buenos+Aires&output=embed",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Av.+Hip%C3%B3lito+Yrigoyen+21006,+Glew,+Buenos+Aires",
  },

  // 0 = domingo ... 6 = sábado. En WhatsApp figura "abierto las 24 horas". PENDIENTE CLIENTE: confirmar horario real del local.
  horarios: {
    0: [["00:00", "24:00"]],
    1: [["00:00", "24:00"]],
    2: [["00:00", "24:00"]],
    3: [["00:00", "24:00"]],
    4: [["00:00", "24:00"]],
    5: [["00:00", "24:00"]],
    6: [["00:00", "24:00"]],
  },

  // Medidas de hélice que fabrican (cm)
  diametros: [25, 30, 35, 40, 44, 52, 61, 76, 95],

  // Líneas de producto (también filtran el catálogo)
  categorias: [
    { id: "axial", nombre: "Axiales", frase: "Del 25 al 96, para uso continuo", foto: "img/axiales-apilados.webp" },
    { id: "centrifugo", nombre: "Centrífugos", frase: "En todas las potencias", foto: "img/centrifugo-hero.webp" },
    { id: "satelite", nombre: "Satélites y parrilleros", frase: "Para cocinas, parrillas y techos", foto: "img/satelite-sombrerete.webp" },
    { id: "campana", nombre: "Campanas de cocina", frase: "TCT · Maraldi · Díaz Sur", foto: "img/campanas-cocina.webp" },
  ],

  // Sin precios: el catálogo de WhatsApp no los muestra. Se cotiza por WhatsApp.
  productos: [
    { id: "axial-25", categoria: "axial", nombre: "Axial Ø25", spec: "Motor 1/16 hp · 1500 rpm", uso: "Cocinas chicas, parrillas y locales gastronómicos", foto: "img/axial-30.webp", alt: "Extractor axial de aluminio de 25 cm" },
    { id: "axial-30", categoria: "axial", nombre: "Axial Ø30", spec: "Motor 1/16 hp · 1500 rpm", uso: "Cocinas chicas, parrillas y locales gastronómicos", foto: "img/axial-30.webp", alt: "Extractor axial de aluminio de 30 cm" },
    { id: "axial-30-reforzado", categoria: "axial", nombre: "Axial Ø30 reforzado", spec: "Motor 1/10 hp · 1500 rpm", uso: "Versión pesada para más exigencia", foto: "img/axial-aluminio-rojo.webp", alt: "Extractor axial reforzado de 30 cm con hélice roja" },
    { id: "axial-35", categoria: "axial", nombre: "Axial Ø35", spec: "Motor 1/10 hp · 1500 rpm", uso: "Cocinas, locales y talleres", foto: "img/axial-35.webp", alt: "Extractor axial de 35 cm con hélice roja", destacado: true },
    { id: "axial-40-liviano", categoria: "axial", nombre: "Axial Ø40", spec: "Motor 1/8 hp · 1500 rpm", uso: "Uso continuo 12 horas", foto: "img/axial-40-liviano.webp", alt: "Extractor axial de 40 cm" },
    { id: "axial-40-reforzado", categoria: "axial", nombre: "Axial Ø40 reforzado", spec: "Motor 1/4 hp · 1500 rpm", uso: "Uso intenso", foto: "img/axial-40-reforzado.webp", alt: "Extractor axial reforzado de 40 cm sobre soporte" },
    { id: "axial-40", categoria: "axial", nombre: "Axial Ø40", spec: "Motor 1/2 hp · 1500 rpm", uso: "Uso continuo 24 horas", foto: "img/axial-40.webp", alt: "Extractor axial de 40 cm con hélice roja" },
    { id: "axial-45", categoria: "axial", nombre: "Axial Ø45", spec: "Motor 1/2 hp · 1500 rpm", uso: "Uso continuo 24 horas", foto: "img/axial-45.webp", alt: "Extractor axial de 45 cm con hélice roja" },
    { id: "axial-52", categoria: "axial", nombre: "Axial Ø52", spec: "Motor 1/2 hp · 1500 rpm", uso: "Uso continuo 24 horas", foto: "img/axial-52.webp", alt: "Extractor axial de 52 cm con hélice roja", destacado: true },
    { id: "axial-61", categoria: "axial", nombre: "Axial Ø61", spec: "Motor 3/4 hp · 1500 rpm", uso: "Uso continuo 24 horas", foto: "img/axial-61.webp", alt: "Extractor axial de 61 cm con hélice roja" },
    { id: "axial-76", categoria: "axial", nombre: "Axial Ø76", spec: "Motor 1 hp · 900 rpm", uso: "Uso continuo 24 horas", foto: "img/axial-76.webp", alt: "Extractor axial de 76 cm con hélice roja" },
    { id: "axial-96", categoria: "axial", nombre: "Axial Ø96", spec: "Motor 2 hp · 900 rpm", uso: "Uso continuo 24 horas", foto: "img/axial-96.webp", alt: "Dos extractores axiales de 96 cm" },
    { id: "centrifugo", categoria: "centrifugo", nombre: "Extractor centrífugo", spec: "0,5 · 1 · 1,5 · 2 · 3 hp y más", uso: "Fabricados en todas las potencias", foto: "img/centrifugo-hero.webp", alt: "Extractor centrífugo gris de chapa", destacado: true },
    { id: "satelite-52", categoria: "satelite", nombre: "Satélite Ø52 con sombrerete", spec: "Motor 1/2 hp · 1500 rpm", uso: "Para techos y salidas al exterior", foto: "img/satelite-sombrerete.webp", alt: "Extractor satélite de 52 cm con sombrerete" },
    { id: "satelite-cocina", categoria: "satelite", nombre: "Extractor satélite de cocina", spec: "Para cocinas y locales gastronómicos", uso: "Salida por techo", foto: "img/satelite-cocina.webp", alt: "Extractor satélite de cocina color gris" },
    { id: "parrillero", categoria: "satelite", nombre: "Extractor parrillero", spec: "Para parrillas y quinchos", uso: "Soporta el calor del humo", foto: "img/extractor-parrillero.webp", alt: "Extractor parrillero de chapa" },
    { id: "campanas", categoria: "campana", nombre: "Campanas de cocina", spec: "Marcas TCT · Maraldi · Díaz Sur", uso: "Para cocinas hogareñas y comerciales", foto: "img/campanas-cocina.webp", alt: "Campanas de cocina sobre cocinas industriales", destacado: true },
  ],

  // Galería "De nuestra fábrica"
  galeria: [
    { foto: "img/axiales-apilados.webp", alt: "Extractores axiales listos para entregar en la fábrica" },
    { foto: "img/fabrica-axial-gris.webp", alt: "Extractor axial con aro gris y hélice roja" },
    { foto: "img/centrifugo-hero.webp", alt: "Extractores centrífugos terminados" },
    { foto: "img/satelite-sombrerete.webp", alt: "Extractor satélite con sombrerete" },
    { foto: "img/axial-aluminio-rojo.webp", alt: "Extractor axial con hélice roja de seis palas" },
    { foto: "img/satelite-cocina.webp", alt: "Extractor satélite de cocina" },
  ],

  resenas: [], // PENDIENTE CLIENTE: reseñas de Google

  seo: {
    titulo: "Extractores de aire en Glew | Ventilación Ubeda",
    descripcion: "Fábrica de extractores de aire industriales y semi industriales en Glew. Axiales, centrífugos, satélites y campanas a medida. Cotizá por WhatsApp.",
  },
};
