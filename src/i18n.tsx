import { createContext, useContext, useEffect, useState } from 'react';
import type { IconName } from './data';

export type Lang = 'es' | 'en';

const es = {
  meta: {
    title: 'K.A.B. Comercio Global Inc. | Productos, equipos y soluciones para sus proyectos',
    description: 'Empresa puertorriqueña de comercio global: construcción, puertas y ventanas, casas modulares, mobiliario, equipos para negocios, maquinaria y energía, con proveedores nacionales e internacionales.',
  },
  wa: {
    default: 'Hola K.A.B. Comercio Global, me gustaría solicitar una cotización.',
    line: (s: string) => `Hola K.A.B. Comercio Global, me interesa la línea de ${s.toLowerCase()}.`,
    product: (s: string) => `Hola K.A.B. Comercio Global, me interesa cotizar: ${s.toLowerCase()}.`,
  },
  app: {
    tabs: ['Inicio', 'Soluciones', 'Proyectos', 'Cotizar', 'Más'],
    hello: 'Bienvenido a K.A.B.',
    categories: 'Explorar por línea',
    seeAll: 'Ver todo',
    tapHint: 'Toque una línea para ver el detalle',
    close: 'Cerrar',
    prev: 'Línea anterior',
    next: 'Línea siguiente',
    of: 'de',
    stats: [
      { v: '8', l: 'líneas de soluciones' },
      { v: 'Global', l: 'proveedores en todo el mundo' },
      { v: 'PR', l: 'entrega en Puerto Rico' },
    ],
    short: ['Construcción', 'Puertas y ventanas', 'Casas modulares', 'Diseño y muebles', 'Negocios y eventos', 'Maquinaria', 'Energía', 'Proyectos especiales'],
  },
  header: {
    home: 'K.A.B. Comercio Global — inicio',
    quote: 'Cotizar',
    open: 'Abrir menú',
    close: 'Cerrar menú',
    links: ['Soluciones', 'Proyectos', 'Cómo trabajamos', 'Cotizar', 'Nosotros', 'Contacto'],
  },
  hero: {
    pill: 'San Juan, Puerto Rico · Comercio global',
    title: 'Conectamos mercados, impulsamos negocios',
    accent: [2, 3], breaks: [1, 2], deskBreaks: [1],
    sub: [
      'Su ', 'socio estratégico', ' para construir, equipar y transformar sus proyectos con productos, equipos y soluciones de proveedores ',
      'nacionales e internacionales.',
    ],
    placeholder: '¿Qué necesita conseguir?',
    trackLabel: 'Producto o equipo que necesita',
    trackBtn: 'Solicitar cotización',
    containerAlt: 'Contenedor de K.A.B. Comercio Global flotando',
    swipe: 'Desliza',
    chip: ['Alcance mundial', '→ San Juan, PR'],
    chip2: ['Atención', 'personalizada'],
  },
  story: {
    routesLabel: 'Líneas de productos',
    routes: [
      'Puertas y ventanas', 'Barandas de cristal', 'Escaleras flotantes', 'Sistemas solares con baterías de litio', 'Gabinetes de cocina',
      'Refrigeración comercial', 'Máquinas de hielo', 'Iluminación LED', 'Aire acondicionado', 'Paneles de yeso', 'Mármol', 'Casas modulares',
    ],
    big: 'Conectamos mercados, impulsamos negocios ·',
    eyebrow: 'Quiénes somos',
    title: 'Su socio estratégico para construir, equipar y transformar', accent: [1, 2],
    imgAlt: 'Puerto con contenedores de carga internacional',
    badgeStrong: '360°',
    badge: 'De la idea a la entrega',
    text: 'K.A.B. Comercio Global Inc. es una empresa puertorriqueña dedicada a la importación, comercialización y distribución de productos y equipos. Identificamos oportunidades, gestionamos la adquisición y servimos de intermediario entre nuestros clientes y proveedores nacionales e internacionales.',
    cta: 'Solicitar cotización',
    more: 'Conocer más',
    stats: [
      { v: '8', label: 'Líneas de soluciones' },
      { v: '1', label: 'Socio para todo su proyecto' },
      { v: '360°', label: 'De la idea a la entrega' },
      { v: 'PR', label: 'Desde San Juan, Puerto Rico' },
    ],
  },
  services: {
    eyebrow: 'Líneas de soluciones',
    title: 'Todo lo que su proyecto necesita, en un solo lugar', accent: [8, 9],
    prev: 'Anterior', next: 'Siguiente',
    cta: 'Cotizar esta línea',
    items: [
      { title: 'Construcción, remodelación y acabados', kicker: 'Obra · Renovación', desc: 'Materiales y productos para construir y renovar, desde los componentes principales hasta los detalles finales.', tags: ['Acero y paneles', 'Yeso y mármol', 'Pisos y fachadas', 'Eléctrico y plomería', 'Cocinas y baños'] },
      { title: 'Puertas y ventanas', kicker: 'Opciones certificadas', desc: 'Ventanas diseñadas para reducir el ruido y puertas de seguridad en distintos niveles de protección, para proyectos residenciales, comerciales e industriales.', tags: ['Ventanas acústicas', 'Puertas de seguridad', 'Barandas de cristal', 'Escaleras flotantes'] },
      { title: 'Casas modulares y residenciales', kicker: 'Viviendas · Prefabricadas', desc: 'Soluciones para casas modulares, viviendas prefabricadas y proyectos residenciales completos: estructura, materiales, mobiliario y acabados.', tags: ['Modulares', 'Prefabricadas', 'Proyecto completo'] },
      { title: 'Diseño, muebles y espacios de lujo', kicker: 'Interiores · Exteriores', desc: 'Mobiliario, decoración e iluminación para casas, apartamentos, villas, hoteles, oficinas y negocios.', tags: ['Muebles', 'Cocinas y closets', 'Iluminación', 'Pérgolas y exteriores'] },
      { title: 'Negocios, discotecas y entretenimiento', kicker: 'Comercial · Eventos', desc: 'Equipamos restaurantes, bares, discotecas, hoteles y tiendas: audio, iluminación, pantallas LED, barras y mobiliario comercial.', tags: ['Audio profesional', 'Pantallas LED', 'Refrigeración comercial', 'Máquinas de hielo'] },
      { title: 'Maquinaria, equipos y tecnología', kicker: 'Industria', desc: 'Herramientas, equipos industriales, maquinaria pesada, sistemas automatizados y tecnología especializada para distintas industrias.', tags: ['Construcción', 'Manufactura', 'Impresión', 'Almacenaje'] },
      { title: 'Energía e instalaciones', kicker: 'Solar · Climatización', desc: 'Sistemas solares, baterías, generadores, equipos eléctricos y aire acondicionado de acuerdo con cada proyecto.', tags: ['Solar', 'Baterías de litio', 'Generadores', 'Aire acondicionado'] },
      { title: 'Proyectos especiales', kicker: 'Diseño · Coordinación', desc: 'Coordinamos cada etapa y le conectamos con diseñadores y especialistas nacionales e internacionales para hogares, villas, hoteles y espacios comerciales.', tags: ['Diseño a medida', 'Especialistas', 'Coordinación'] },
    ],
  },
  ops: {
    eyebrow: 'Proyectos especiales',
    title: 'Convertimos ideas en proyectos extraordinarios', accent: [3, 4],
    steps: [
      { tag: 'Su visión', label: 'Cuéntenos su idea', text: 'Ya sea desarrollar un proyecto especial, ajustar un espacio existente o gestionar los pasos para su construcción, empezamos por entender lo que desea lograr.' },
      { tag: 'Coordinación', label: 'Los profesionales adecuados', text: 'Coordinamos cada etapa y le conectamos con diseñadores y especialistas de alto nivel, nacionales e internacionales, para hogares, villas, hoteles, restaurantes, discotecas y espacios comerciales.' },
      { tag: 'Realidad', label: 'Trámites y ejecución', text: 'Le asistimos en la coordinación de los trámites y permisos aplicables, sujetos a los requisitos y aprobaciones de las autoridades correspondientes. Cuéntenos su visión y trabajaremos para hacerla realidad.' },
    ],
    captions: ['Su visión', 'Coordinación', 'Realidad'],
    cta: 'Cuéntenos su visión',
    scroll: 'Desliza para ver cómo lo hacemos',
  },
  process: {
    eyebrow: 'Cómo trabajamos',
    title: 'De su idea a su proyecto', accent: [3, 4, 5], breaks: [2],
    sub: 'Un solo socio para identificar, conseguir y coordinar lo que su proyecto necesita.',
    step: 'Paso',
    steps: [
      { title: 'Cuéntenos qué necesita', desc: 'Qué desea construir, crear o adquirir, para qué tipo de proyecto y en qué plazo.' },
      { title: 'Identificamos opciones', desc: 'Buscamos productos y proveedores nacionales e internacionales que se ajusten a su proyecto.' },
      { title: 'Propuesta a su medida', desc: 'Le presentamos alternativas, condiciones de pago y, si aplica, opciones de financiamiento.' },
      { title: 'Gestionamos la adquisición', desc: 'Coordinamos la compra con los proveedores y el envío de los productos hasta su destino.' },
      { title: 'Entrega y acompañamiento', desc: 'Le acompañamos hasta que todo llega a su proyecto y cuidamos la relación a largo plazo.' },
    ],
  },
  imports: {
    eyebrow: 'Puertas y ventanas',
    title: 'Seguridad, aislamiento y diseño para cada propiedad', accent: [5, 6],
    items: ['Ventanas acústicas', 'Puertas de seguridad', 'Puertas de aluminio', 'Barandas de cristal', 'Escaleras flotantes', 'Residencial y comercial'],
    note: 'Opciones certificadas para proyectos residenciales, comerciales e industriales. Las certificaciones, características y niveles de desempeño se verifican para cada producto según el modelo y los requisitos del proyecto.',
  },
  quote: {
    eyebrow: 'Cotización',
    title: 'Cuéntenos qué necesita conseguir', accent: [3],
    line: 'Línea de solución',
    project: 'Tipo de proyecto',
    projectOpts: ['Residencial', 'Comercial', 'Industrial'],
    financing: '¿Le interesa explorar financiamiento?',
    financingOpts: ['Sí', 'No', 'Tal vez'],
    need: '¿Qué necesita?',
    needPh: 'Ej. ventanas acústicas para un edificio de apartamentos',
    name: 'Su nombre o empresa',
    namePh: 'Opcional',
    send: 'Enviar solicitud',
    sendForm: 'Continuar con mis datos',
    note: 'Le responderemos con alternativas y condiciones adaptadas a su proyecto.',
    finNote: 'Las opciones de financiamiento se evalúan individualmente y están sujetas a disponibilidad, evaluación y aprobación de las partes o entidades correspondientes.',
    needRequired: 'Cuéntenos brevemente qué necesita.',
    msg: (line: string, project: string, fin: string, need: string, name: string) =>
      `Hola K.A.B. Comercio Global, quiero solicitar una cotización:\n• Línea: ${line}\n• Proyecto: ${project}\n• Financiamiento: ${fin}\n• Necesito: ${need}` +
      (name ? `\nMi nombre: ${name}` : ''),
  },
  coverage: {
    eyebrow: 'Alcance global',
    title: 'Conectamos mercados con su proyecto', accent: [1],
    sub: 'Trabajamos con fabricantes y proveedores de distintos mercados del mundo y coordinamos cada envío hasta San Juan, Puerto Rico.',
    mapAlt: 'Mapa de rutas de proveedores hacia San Juan, Puerto Rico',
    dr: 'San Juan, Puerto Rico',
    regions: [
      { label: 'Alcance mundial', desc: 'Fabricantes y proveedores en distintos mercados' },
      { label: 'Logística coordinada', desc: 'Compra, envío y seguimiento en un solo lugar' },
      { label: 'Entrega en Puerto Rico', desc: 'Todo llega a su proyecto en San Juan' },
    ],
  },
  about: {
    eyebrow: 'Nuestro enfoque',
    title: 'Una empresa global, enfocada en sus necesidades', accent: [5, 6],
    photoAlt: 'Carga aérea internacional',
    photoTag: 'Proveedores nacionales e internacionales',
    mission: 'Nuestro compromiso',
    missionText: 'Brindar productos competitivos, atención confiable y nuevas oportunidades para su negocio, con alternativas adaptadas a las necesidades de cada cliente.',
    vision: 'Nuestra forma de trabajar',
    visionText: 'Trabajamos con un enfoque en la calidad, el servicio personalizado y las relaciones comerciales a largo plazo. Una buena idea merece acceso a las mejores oportunidades.',
    values: 'Lo que nos define',
    valueList: ['Calidad', 'Servicio personalizado', 'Relaciones a largo plazo', 'Atención confiable', 'Productos competitivos', 'Nuevas oportunidades', 'Visión global', 'Soluciones a medida'],
  },
  team: {
    eyebrow: 'Equipo de trabajo',
    title: 'Las personas detrás de cada proyecto', accent: [1],
    sub: 'Un equipo cercano que le acompaña desde la primera conversación hasta la entrega.',
    roles: ['CEO', 'Representante'],
    call: 'Llamar',
    photoSoon: 'Foto próximamente',
  },
  tips: {
    eyebrow: 'Preguntas frecuentes',
    title: 'preguntas antes de empezar su proyecto',
    items: [
      { title: '¿Qué tipo de productos pueden conseguir?', desc: 'Trabajamos con una amplia variedad: materiales de construcción, puertas y ventanas, mobiliario, equipos para negocios y entretenimiento, maquinaria y soluciones de energía. Si se trata de una necesidad especial o un proyecto personalizado, cuéntenos y buscamos la alternativa.' },
      { title: '¿Trabajan con proveedores internacionales?', desc: 'Sí. Trabajamos con fabricantes y proveedores de distintos mercados del mundo, y gestionamos la búsqueda, la adquisición y el envío de los productos hasta Puerto Rico.' },
      { title: '¿Ofrecen financiamiento?', desc: 'Estamos disponibles para explorar alternativas de financiamiento, condiciones de pago y acuerdos comerciales. Cada propuesta se evalúa individualmente y está sujeta a disponibilidad, evaluación y aprobación de las partes o entidades correspondientes.' },
      { title: '¿Las puertas y ventanas están certificadas?', desc: 'Gestionamos opciones certificadas. Las certificaciones, características y niveles de desempeño se verifican para cada producto según el modelo y los requisitos del proyecto.' },
      { title: '¿Pueden ayudar con trámites y permisos?', desc: 'Podemos asistirle en la coordinación de los trámites y permisos aplicables, sujetos a los requisitos y aprobaciones de las autoridades correspondientes.' },
    ],
    quote: ['Cuéntenos qué desea construir, crear o adquirir. ', 'Estamos preparados para ayudarle a encontrar el camino.'],
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Hablemos de su próximo proyecto', accent: [3, 4],
    sub: 'Cuéntenos qué desea construir, crear o adquirir y le responderemos con alternativas adaptadas a su proyecto.',
    perks: ['Atención personalizada', 'Proveedores nacionales e internacionales', 'Financiamiento sujeto a evaluación y aprobación'],
    direct: 'Contacto directo',
    fields: {
      name: 'Nombre completo', company: 'Empresa', email: 'Correo electrónico', phone: 'Teléfono / WhatsApp',
      service: 'Línea de interés', origin: 'Tipo de proyecto', message: 'Cuéntenos sobre su proyecto',
    },
    ph: {
      name: 'Ej. María Rivera', company: 'Opcional', email: 'tu@empresa.com', phone: '(787) 000-0000',
      message: 'Qué necesita, cantidades aproximadas, fecha estimada…',
    },
    serviceOpts: ['Construcción, remodelación y acabados', 'Puertas y ventanas', 'Casas modulares y residenciales', 'Diseño, muebles y espacios de lujo', 'Negocios, discotecas y entretenimiento', 'Maquinaria, equipos y tecnología', 'Energía e instalaciones', 'Proyectos especiales', 'Otro / no estoy seguro'],
    originOpts: ['Residencial', 'Comercial', 'Industrial', 'Otro'],
    required: 'Campo requerido',
    invalidEmail: 'Correo no válido',
    consent: 'Acepto que K.A.B. Comercio Global me contacte sobre esta solicitud.',
    submit: 'Enviar solicitud',
    sending: 'Enviando…',
    okTitle: '¡Solicitud lista!',
    okWa: 'Abrimos WhatsApp con sus datos para que la envíe a nuestro equipo.',
    okMail: 'Abrimos su correo con la solicitud redactada para que la envíe a nuestro equipo.',
    okDemo: 'Vista demo: el envío se activará cuando se configure el canal de contacto de K.A.B.',
    mailBtn: 'Enviar por correo',
    again: 'Nueva solicitud',
    msg: (d: Record<string, string>) =>
      `Hola K.A.B. Comercio Global, quiero solicitar información:\n• Nombre: ${d.name}\n` + (d.company ? `• Empresa: ${d.company}\n` : '') +
      `• Correo: ${d.email}\n• Teléfono: ${d.phone}\n• Línea: ${d.service}\n• Proyecto: ${d.origin}\n\n${d.message}`,
    mailSubject: 'Solicitud de cotización — sitio web',
  },
  final: {
    eyebrow: 'Empecemos',
    title: 'Cuéntenos qué desea construir, crear o adquirir', accent: [3, 4, 5, 6],
    cta: 'Solicitar cotización',
    tag: 'Conectamos mercados, impulsamos negocios.',
    contact: 'Contacto',
    location: 'San Juan, Puerto Rico',
    services: 'Soluciones',
    serviceLinks: ['Construcción', 'Puertas y ventanas', 'Casas modulares', 'Diseño y muebles', 'Negocios y entretenimiento', 'Maquinaria', 'Energía'],
    company: 'Empresa',
    companyLinks: ['Nosotros', 'Equipo', 'Cómo trabajamos', 'Proyectos especiales', 'Cotizar'],
    top: 'Volver arriba ↑',
    fab: 'Escríbanos por WhatsApp',
  },
};

export type Dict = typeof es;

const en: Dict = {
  meta: {
    title: 'K.A.B. Comercio Global Inc. | Products, equipment and solutions for your projects',
    description: 'Puerto Rican global trade company: construction, doors and windows, modular homes, furniture, business equipment, machinery and energy, through national and international suppliers.',
  },
  wa: {
    default: 'Hello K.A.B. Comercio Global, I would like to request a quote.',
    line: (s: string) => `Hello K.A.B. Comercio Global, I'm interested in your ${s.toLowerCase()} line.`,
    product: (s: string) => `Hello K.A.B. Comercio Global, I'd like a quote for: ${s.toLowerCase()}.`,
  },
  app: {
    tabs: ['Home', 'Solutions', 'Projects', 'Quote', 'More'],
    hello: 'Welcome to K.A.B.',
    categories: 'Browse by line',
    seeAll: 'See all',
    tapHint: 'Tap a line to see the details',
    close: 'Close',
    prev: 'Previous line',
    next: 'Next line',
    of: 'of',
    stats: [
      { v: '8', l: 'solution lines' },
      { v: 'Global', l: 'suppliers worldwide' },
      { v: 'PR', l: 'delivery in Puerto Rico' },
    ],
    short: ['Construction', 'Doors & windows', 'Modular homes', 'Design & furniture', 'Business & events', 'Machinery', 'Energy', 'Special projects'],
  },
  header: {
    home: 'K.A.B. Comercio Global — home',
    quote: 'Get a quote',
    open: 'Open menu',
    close: 'Close menu',
    links: ['Solutions', 'Projects', 'How we work', 'Get a quote', 'About us', 'Contact'],
  },
  hero: {
    pill: 'San Juan, Puerto Rico · Global trade',
    title: 'Connecting markets, driving business',
    accent: [2, 3], breaks: [1, 2], deskBreaks: [1],
    sub: [
      'Your ', 'strategic partner', ' to build, equip and transform your projects with products, equipment and solutions from ',
      'national and international suppliers.',
    ],
    placeholder: 'What do you need to source?',
    trackLabel: 'Product or equipment you need',
    trackBtn: 'Request a quote',
    containerAlt: 'Floating K.A.B. Comercio Global container',
    swipe: 'Swipe',
    chip: ['Worldwide reach', '→ San Juan, PR'],
    chip2: ['Personalized', 'service'],
  },
  story: {
    routesLabel: 'Product lines',
    routes: [
      'Doors & windows', 'Glass railings', 'Floating staircases', 'Lithium battery solar systems', 'Kitchen cabinets',
      'Commercial refrigeration', 'Ice machines', 'LED lighting', 'Air conditioning', 'Gypsum board', 'Marble', 'Modular homes',
    ],
    big: 'Connecting markets, driving business ·',
    eyebrow: 'Who we are',
    title: 'Your strategic partner to build, equip and transform', accent: [1, 2],
    imgAlt: 'Port with international cargo containers',
    badgeStrong: '360°',
    badge: 'From idea to delivery',
    text: 'K.A.B. Comercio Global Inc. is a Puerto Rican company dedicated to importing, marketing and distributing products and equipment. We identify opportunities, manage procurement and act as the link between our clients and national and international suppliers.',
    cta: 'Request a quote',
    more: 'Learn more',
    stats: [
      { v: '8', label: 'Solution lines' },
      { v: '1', label: 'Partner for your whole project' },
      { v: '360°', label: 'From idea to delivery' },
      { v: 'PR', label: 'Based in San Juan, Puerto Rico' },
    ],
  },
  services: {
    eyebrow: 'Solution lines',
    title: 'Everything your project needs, in one place', accent: [5, 6],
    prev: 'Previous', next: 'Next',
    cta: 'Quote this line',
    items: [
      { title: 'Construction, remodeling & finishes', kicker: 'Build · Renovate', desc: 'Materials and products to build and renovate, from the main components to the final details.', tags: ['Steel & panels', 'Gypsum & marble', 'Floors & facades', 'Electrical & plumbing', 'Kitchens & baths'] },
      { title: 'Doors and windows', kicker: 'Certified options', desc: 'Windows designed to reduce noise and security doors in different protection levels, for residential, commercial and industrial projects.', tags: ['Acoustic windows', 'Security doors', 'Glass railings', 'Floating staircases'] },
      { title: 'Modular & residential homes', kicker: 'Homes · Prefab', desc: 'Solutions for modular homes, prefabricated housing and complete residential projects: structure, materials, furniture and finishes.', tags: ['Modular', 'Prefabricated', 'Full project'] },
      { title: 'Design, furniture & luxury spaces', kicker: 'Interiors · Exteriors', desc: 'Furniture, decor and lighting for houses, apartments, villas, hotels, offices and businesses.', tags: ['Furniture', 'Kitchens & closets', 'Lighting', 'Pergolas & outdoor'] },
      { title: 'Business, nightclubs & entertainment', kicker: 'Commercial · Events', desc: 'We equip restaurants, bars, nightclubs, hotels and stores: audio, lighting, LED screens, bars and commercial furniture.', tags: ['Professional audio', 'LED screens', 'Commercial refrigeration', 'Ice machines'] },
      { title: 'Machinery, equipment & technology', kicker: 'Industry', desc: 'Tools, industrial equipment, heavy machinery, automated systems and specialized technology for different industries.', tags: ['Construction', 'Manufacturing', 'Printing', 'Storage'] },
      { title: 'Energy & facilities', kicker: 'Solar · HVAC', desc: 'Solar systems, batteries, generators, electrical equipment and air conditioning tailored to each project.', tags: ['Solar', 'Lithium batteries', 'Generators', 'Air conditioning'] },
      { title: 'Special projects', kicker: 'Design · Coordination', desc: 'We coordinate every stage and connect you with national and international designers and specialists for homes, villas, hotels and commercial spaces.', tags: ['Custom design', 'Specialists', 'Coordination'] },
    ],
  },
  ops: {
    eyebrow: 'Special projects',
    title: 'We turn ideas into extraordinary projects', accent: [4, 5],
    steps: [
      { tag: 'Your vision', label: 'Tell us your idea', text: 'Whether you want to develop a special project, adapt an existing space or manage the steps to build it, we start by understanding what you want to achieve.' },
      { tag: 'Coordination', label: 'The right professionals', text: 'We coordinate every stage and connect you with top national and international designers and specialists for homes, villas, hotels, restaurants, nightclubs and commercial spaces.' },
      { tag: 'Reality', label: 'Permits and execution', text: 'We assist you in coordinating the applicable procedures and permits, subject to the requirements and approvals of the corresponding authorities. Tell us your vision and we will work to make it real.' },
    ],
    captions: ['Your vision', 'Coordination', 'Reality'],
    cta: 'Tell us your vision',
    scroll: 'Scroll to see how we do it',
  },
  process: {
    eyebrow: 'How we work',
    title: 'From your idea to your project', accent: [3, 4, 5], breaks: [2],
    sub: 'One partner to identify, source and coordinate everything your project needs.',
    step: 'Step',
    steps: [
      { title: 'Tell us what you need', desc: 'What you want to build, create or acquire, for what kind of project and by when.' },
      { title: 'We identify options', desc: 'We look for national and international products and suppliers that fit your project.' },
      { title: 'A tailored proposal', desc: 'We present alternatives, payment terms and, where applicable, financing options.' },
      { title: 'We manage procurement', desc: 'We coordinate the purchase with suppliers and the shipment of products to their destination.' },
      { title: 'Delivery and support', desc: 'We stay with you until everything reaches your project and look after a long-term relationship.' },
    ],
  },
  imports: {
    eyebrow: 'Doors and windows',
    title: 'Security, insulation and design for every property', accent: [5, 6],
    items: ['Acoustic windows', 'Security doors', 'Aluminum doors', 'Glass railings', 'Floating staircases', 'Residential & commercial'],
    note: 'Certified options for residential, commercial and industrial projects. Certifications, features and performance levels are verified for each product according to the model and the project requirements.',
  },
  quote: {
    eyebrow: 'Quote',
    title: 'Tell us what you need to source', accent: [6],
    line: 'Solution line',
    project: 'Project type',
    projectOpts: ['Residential', 'Commercial', 'Industrial'],
    financing: 'Would you like to explore financing?',
    financingOpts: ['Yes', 'No', 'Maybe'],
    need: 'What do you need?',
    needPh: 'e.g. acoustic windows for an apartment building',
    name: 'Your name or company',
    namePh: 'Optional',
    send: 'Send request',
    sendForm: 'Continue with my details',
    note: 'We will reply with alternatives and terms tailored to your project.',
    finNote: 'Financing options are evaluated individually and are subject to availability, evaluation and approval by the corresponding parties or entities.',
    needRequired: 'Briefly tell us what you need.',
    msg: (line: string, project: string, fin: string, need: string, name: string) =>
      `Hello K.A.B. Comercio Global, I'd like a quote:\n• Line: ${line}\n• Project: ${project}\n• Financing: ${fin}\n• I need: ${need}` +
      (name ? `\nMy name: ${name}` : ''),
  },
  coverage: {
    eyebrow: 'Global reach',
    title: 'Connecting markets with your project', accent: [1],
    sub: 'We work with manufacturers and suppliers from markets around the world and coordinate every shipment to San Juan, Puerto Rico.',
    mapAlt: 'Map of supplier routes to San Juan, Puerto Rico',
    dr: 'San Juan, Puerto Rico',
    regions: [
      { label: 'Worldwide reach', desc: 'Manufacturers and suppliers in many markets' },
      { label: 'Coordinated logistics', desc: 'Purchase, shipping and tracking in one place' },
      { label: 'Delivery in Puerto Rico', desc: 'Everything reaches your project in San Juan' },
    ],
  },
  about: {
    eyebrow: 'Our approach',
    title: 'A global company, focused on your needs', accent: [5, 6],
    photoAlt: 'International air cargo',
    photoTag: 'National and international suppliers',
    mission: 'Our commitment',
    missionText: 'To deliver competitive products, reliable service and new opportunities for your business, with alternatives tailored to each client’s needs.',
    vision: 'How we work',
    visionText: 'We focus on quality, personalized service and long-term business relationships. A good idea deserves access to the best opportunities.',
    values: 'What defines us',
    valueList: ['Quality', 'Personalized service', 'Long-term relationships', 'Reliable service', 'Competitive products', 'New opportunities', 'Global vision', 'Tailored solutions'],
  },
  team: {
    eyebrow: 'Our team',
    title: 'The people behind every project', accent: [1],
    sub: 'A close-knit team that supports you from the first conversation to final delivery.',
    roles: ['CEO', 'Representative'],
    call: 'Call',
    photoSoon: 'Photo coming soon',
  },
  tips: {
    eyebrow: 'Frequently asked questions',
    title: 'questions before starting your project',
    items: [
      { title: 'What kind of products can you source?', desc: 'We work with a wide variety: construction materials, doors and windows, furniture, business and entertainment equipment, machinery and energy solutions. If it is a special need or a custom project, tell us and we will look for the right alternative.' },
      { title: 'Do you work with international suppliers?', desc: 'Yes. We work with manufacturers and suppliers from markets around the world, and manage the search, procurement and shipping of products to Puerto Rico.' },
      { title: 'Do you offer financing?', desc: 'We are open to exploring financing alternatives, payment terms and business agreements. Each proposal is evaluated individually and is subject to availability, evaluation and approval by the corresponding parties or entities.' },
      { title: 'Are the doors and windows certified?', desc: 'We manage certified options. Certifications, features and performance levels are verified for each product according to the model and the project requirements.' },
      { title: 'Can you help with procedures and permits?', desc: 'We can assist you in coordinating the applicable procedures and permits, subject to the requirements and approvals of the corresponding authorities.' },
    ],
    quote: ['Tell us what you want to build, create or acquire. ', 'We are ready to help you find the way.'],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Let’s talk about your next project', accent: [4, 5],
    sub: 'Tell us what you want to build, create or acquire and we will reply with alternatives tailored to your project.',
    perks: ['Personalized service', 'National and international suppliers', 'Financing subject to evaluation and approval'],
    direct: 'Direct contact',
    fields: {
      name: 'Full name', company: 'Company', email: 'Email', phone: 'Phone / WhatsApp',
      service: 'Line of interest', origin: 'Project type', message: 'Tell us about your project',
    },
    ph: {
      name: 'e.g. Maria Rivera', company: 'Optional', email: 'you@company.com', phone: '+1 (787) 000-0000',
      message: 'What you need, approximate quantities, estimated date…',
    },
    serviceOpts: ['Construction, remodeling & finishes', 'Doors and windows', 'Modular & residential homes', 'Design, furniture & luxury spaces', 'Business, nightclubs & entertainment', 'Machinery, equipment & technology', 'Energy & facilities', 'Special projects', 'Other / not sure'],
    originOpts: ['Residential', 'Commercial', 'Industrial', 'Other'],
    required: 'Required field',
    invalidEmail: 'Invalid email',
    consent: 'I agree to be contacted by K.A.B. Comercio Global about this request.',
    submit: 'Send request',
    sending: 'Sending…',
    okTitle: 'Request ready!',
    okWa: 'We opened WhatsApp with your details so you can send them to our team.',
    okMail: 'We opened your email with the request drafted so you can send it to our team.',
    okDemo: 'Demo view: sending will be enabled once K.A.B.’s contact channel is set up.',
    mailBtn: 'Send by email',
    again: 'New request',
    msg: (d: Record<string, string>) =>
      `Hello K.A.B. Comercio Global, I'd like some information:\n• Name: ${d.name}\n` + (d.company ? `• Company: ${d.company}\n` : '') +
      `• Email: ${d.email}\n• Phone: ${d.phone}\n• Line: ${d.service}\n• Project: ${d.origin}\n\n${d.message}`,
    mailSubject: 'Quote request — website',
  },
  final: {
    eyebrow: 'Let’s begin',
    title: 'Tell us what you want to build, create or acquire', accent: [6, 7, 8, 9],
    cta: 'Request a quote',
    tag: 'Connecting markets, driving business.',
    contact: 'Contact',
    location: 'San Juan, Puerto Rico',
    services: 'Solutions',
    serviceLinks: ['Construction', 'Doors & windows', 'Modular homes', 'Design & furniture', 'Business & entertainment', 'Machinery', 'Energy'],
    company: 'Company',
    companyLinks: ['About us', 'Our team', 'How we work', 'Special projects', 'Get a quote'],
    top: 'Back to top ↑',
    fab: 'Message us on WhatsApp',
  },
};

const DICTS: Record<Lang, Dict> = { es, en };

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: 'es', t: es, setLang: () => {} });

/** PENDIENTE: dominio definitivo de K.A.B. (activa canonical y og:url cuando se complete) */
export const SITE_URL = '';
const PATHS: Record<Lang, string> = { es: '/', en: '/en/' };

/**
 * La URL manda: "/" es español y "/en/" es inglés, para que cada idioma sea una página
 * indexable. "?lang=en" redirige a la ruta correcta.
 */
function langFromUrl(): Lang {
  const q = new URLSearchParams(window.location.search).get('lang');
  if (q === 'en' || q === 'es') return q;
  return /^\/en(\/|$)/.test(window.location.pathname) ? 'en' : 'es';
}

function setMeta(selector: string, attr: string, value: string) {
  document.querySelector(selector)?.setAttribute(attr, value);
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(langFromUrl);
  const t = DICTS[lang];

  useEffect(() => {
    const path = PATHS[lang];
    if (window.location.pathname !== path || window.location.search) {
      window.history.replaceState(null, '', path + window.location.hash);
    }
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    setMeta('meta[name="description"]', 'content', t.meta.description);
    setMeta('meta[property="og:title"]', 'content', t.meta.title);
    setMeta('meta[property="og:description"]', 'content', t.meta.description);
    setMeta('meta[property="og:locale"]', 'content', lang === 'es' ? 'es_PR' : 'en_US');
    if (SITE_URL) {
      setMeta('link[rel="canonical"]', 'href', SITE_URL + path);
      setMeta('meta[property="og:url"]', 'content', SITE_URL + path);
    }
  }, [lang, t]);

  return <LangContext.Provider value={{ lang, t, setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** Íconos por posición, compartidos entre idiomas */
export const IMPORT_ICONS: IconName[] = ['window', 'shield', 'door', 'railing', 'stairs', 'home'];
export const STEP_ICONS: IconName[] = ['chat', 'search', 'doc', 'boxes', 'check'];
