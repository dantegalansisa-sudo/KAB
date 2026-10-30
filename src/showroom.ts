import type { IconName } from './data';

/**
 * Showroom: fotos de referencia sacadas de los catálogos del cliente (data de servicios).
 * Las imágenes viven en `public/img/cat/<area>-NN.webp` (grande) y `-s.webp` (miniatura).
 * Los textos (nombre del área, descripción y títulos de cada foto) están en `t.showroom` de i18n.tsx,
 * en el mismo orden que `sizes`. REGLA: nada de marcas de fabricantes ni referencias de origen.
 */
export type AreaId = 'sala' | 'comedor' | 'dormitorio' | 'oficina' | 'recibidor' | 'casas' | 'acabados' | 'iluminacion' | 'audio';

export type Area = {
  id: AreaId;
  group: number; // posición en t.showroom.groups
  icon: IconName;
  service: number; // posición en contact.serviceOpts (para el formulario)
  origin: number; // posición en contact.originOpts
  keywords: string; // palabras extra para el buscador (ES y EN)
  sizes: [number, number][]; // ancho y alto de cada foto grande
};

export const AREAS: Area[] = [
  {
    id: 'sala', group: 0, icon: 'sofa', service: 3, origin: 0,
    keywords: 'living room sofa sofá sillón butaca armchair mesa de centro coffee table alfombra rug seccional sectional muebles furniture',
    sizes: [[1600, 460], [1600, 990], [1600, 709], [1600, 849], [1600, 686], [1600, 710], [1600, 685], [1600, 1369], [1600, 704], [1600, 686], [1600, 686], [1600, 709], [1600, 689]],
  },
  {
    id: 'comedor', group: 0, icon: 'dining', service: 3, origin: 0,
    keywords: 'dining room mesa table sillas chairs aparador sideboard mármol marble muebles furniture',
    sizes: [[1600, 477], [1600, 686], [1600, 685], [1600, 686], [1600, 686], [1569, 1352], [1600, 686], [1565, 1352], [1600, 1373], [1570, 1352], [1600, 686], [1600, 686], [1600, 686]],
  },
  {
    id: 'dormitorio', group: 0, icon: 'bed', service: 3, origin: 0,
    keywords: 'bedroom habitación cuarto recámara cama bed cabecero headboard mesa de noche nightstand tocador vanity muebles furniture',
    sizes: [[1600, 660], [1600, 686], [1570, 1432], [1600, 990], [1600, 686], [1600, 782], [1600, 990], [1600, 686], [1600, 687], [1600, 990], [1600, 685], [1600, 709], [1570, 1432], [1571, 1432]],
  },
  {
    id: 'oficina', group: 0, icon: 'desk', service: 3, origin: 1,
    keywords: 'office despacho estudio study escritorio desk silla chair librero bookcase ejecutivo executive muebles furniture',
    sizes: [[1600, 620], [1600, 990], [1600, 1368], [1600, 1368], [1600, 710], [1600, 990], [1600, 709], [1600, 686], [1600, 686], [1600, 686], [1600, 990], [1600, 990], [1600, 990]],
  },
  {
    id: 'recibidor', group: 0, icon: 'door', service: 3, origin: 0,
    keywords: 'entrada entryway lobby consola console bar cocina kitchen isla island taburetes stools aparador sideboard',
    sizes: [[1600, 507], [1600, 991], [1600, 990], [1600, 1368], [1600, 991], [1600, 709], [1600, 1368], [1600, 782], [1600, 1369], [1600, 785], [1600, 782]],
  },
  {
    id: 'casas', group: 1, icon: 'home', service: 2, origin: 0,
    keywords: 'casa house home villa modular prefabricada prefab fachada facade frente exterior residencia construcción construction',
    sizes: [[558, 709], [411, 359], [421, 360], [409, 360], [409, 345], [432, 350], [449, 346], [407, 366], [445, 374], [438, 363], [438, 359]],
  },
  {
    id: 'acabados', group: 1, icon: 'brick', service: 0, origin: 0,
    keywords: 'acabados finishes pared wall techo ceiling piso floor baño bathroom puertas doors mármol marble remodelación remodeling',
    sizes: [[463, 318], [444, 272], [465, 304], [473, 290], [460, 289], [424, 263]],
  },
  {
    id: 'iluminacion', group: 2, icon: 'lamp', service: 4, origin: 1,
    keywords: 'luces lights lighting iluminación láser laser led cabeza móvil moving head escenario stage pista dance floor discoteca nightclub efectos effects',
    sizes: [[800, 640], [800, 640], [761, 761], [734, 529], [800, 424], [525, 525], [800, 800], [1000, 1000]],
  },
  {
    id: 'audio', group: 2, icon: 'music', service: 4, origin: 1,
    keywords: 'audio sonido sound bocinas speakers música music discoteca nightclub club lounge eventos events concierto concert pantallas screens',
    sizes: [[1600, 653], [622, 328], [621, 327], [622, 327], [579, 328], [602, 337]],
  },
];

export const photo = (area: AreaId, i: number, small = false) =>
  `/img/cat/${area}-${String(i + 1).padStart(2, '0')}${small ? '-s' : ''}.webp`;

/** Minúsculas y sin acentos, para que "salon" encuentre "salón" */
export const fold = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
