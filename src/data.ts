/**
 * Datos de contacto de K.A.B. Comercio Global Inc.
 * PENDIENTE: completar con los datos reales del cliente. Mientras `whatsapp` esté vacío,
 * todos los botones de "cotizar" llevan al formulario de contacto de la página.
 */
export const CONTACT = {
  name: '',
  phone: '',
  whatsapp: '', // solo dígitos con código de país, ej. 17875551234
  email: '',
  instagram: '',
  location: 'Puerto Rico',
};

export const HAS_WHATSAPP = CONTACT.whatsapp.length > 0;

export const wa = (msg: string) =>
  HAS_WHATSAPP ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}` : '#contacto';

/** Props para un enlace de cotización: abre WhatsApp en otra pestaña o baja al formulario */
export const ctaLink = (msg: string) =>
  HAS_WHATSAPP
    ? { href: wa(msg), target: '_blank', rel: 'noreferrer' }
    : { href: '#contacto' };

export type IconName =
  | 'ship' | 'plane' | 'truck' | 'warehouse' | 'customs' | 'boxes'
  | 'arrow' | 'search' | 'globe' | 'shield' | 'clock' | 'pin'
  | 'fridge' | 'snow' | 'sofa' | 'brick' | 'plug' | 'whatsapp'
  | 'mail' | 'phone' | 'instagram' | 'check' | 'doc' | 'calendar'
  | 'calc' | 'plus' | 'users' | 'spark' | 'route' | 'menu' | 'close'
  | 'beam' | 'window' | 'home' | 'speaker' | 'gear' | 'sun' | 'bank' | 'pencil' | 'chat' | 'layers';

/** Líneas de soluciones: íconos y estilo de cada tarjeta; los textos viven en i18n.tsx (mismo orden) */
export const LINES: { id: string; icon: IconName; tone: string }[] = [
  { id: 'construccion', icon: 'beam', tone: 'tone-1' },
  { id: 'puertas', icon: 'window', tone: 'tone-2' },
  { id: 'modulares', icon: 'home', tone: 'tone-3' },
  { id: 'diseno', icon: 'sofa', tone: 'tone-4' },
  { id: 'entretenimiento', icon: 'speaker', tone: 'tone-5' },
  { id: 'maquinaria', icon: 'gear', tone: 'tone-6' },
  { id: 'energia', icon: 'sun', tone: 'tone-7' },
  { id: 'especiales', icon: 'pencil', tone: 'tone-8' },
];
