// Genera dist/en/index.html: la misma app con la cabecera SEO en inglés, para que
// /en/ se indexe como página propia en inglés.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const html = readFileSync('dist/index.html', 'utf8');

const ES = {
  title: 'K.A.B. Comercio Global Inc. | Productos, equipos y soluciones para sus proyectos',
  desc: 'Empresa puertorriqueña de comercio global: construcción, puertas y ventanas, casas modulares, mobiliario, equipos para negocios, maquinaria y energía, con proveedores nacionales e internacionales.',
};
const EN = {
  title: 'K.A.B. Comercio Global Inc. | Products, equipment and solutions for your projects',
  desc: 'Puerto Rican global trade company: construction, doors and windows, modular homes, furniture, business equipment, machinery and energy, through national and international suppliers.',
};

const replacements = [
  ['<html lang="es">', '<html lang="en">'],
  [ES.title, EN.title],
  [ES.desc, EN.desc],
  ['content="es_PR"', 'content="en_US"'],
  ['content="Contenedor de K.A.B. Comercio Global"', 'content="K.A.B. Comercio Global container"'],
  ['<h1>K.A.B. Comercio Global Inc. — Conectamos mercados, impulsamos negocios</h1>',
    '<h1>K.A.B. Comercio Global Inc. — Connecting markets, driving business</h1>'],
  ['<p>Su socio estratégico para construir, equipar y transformar sus proyectos: construcción, remodelación y acabados; puertas y ventanas; casas modulares; diseño y mobiliario; equipos para negocios, discotecas y entretenimiento; maquinaria y tecnología; energía e instalaciones.</p>',
    '<p>Your strategic partner to build, equip and transform your projects: construction, remodeling and finishes; doors and windows; modular homes; design and furniture; business, nightclub and entertainment equipment; machinery and technology; energy and facilities.</p>'],
  ['<p>Proveedores nacionales e internacionales · San Juan, Puerto Rico.</p>', '<p>National and international suppliers · San Juan, Puerto Rico.</p>'],
];

let out = html;
for (const [from, to] of replacements) {
  if (!out.includes(from)) throw new Error(`prerender-en: no se encontró en dist/index.html → ${from.slice(0, 70)}`);
  out = out.split(from).join(to);
}

mkdirSync('dist/en', { recursive: true });
writeFileSync('dist/en/index.html', out);
console.log('✓ dist/en/index.html generado');
