-- ================================================================
-- CARGAR REGALOS DESDE PLANILLA
-- Ejecutar en Supabase → SQL Editor
-- ================================================================

-- Limpia ideas existentes (tabla vacía de todas formas)
DELETE FROM regalo_ideas;

-- ── ALFREDO (26 Feb) ─────────────────────────────────────────
INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Giftcard ZARA', '', 0 FROM personas WHERE trim(nombre) ILIKE 'Alfredo' LIMIT 1;

INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Giftcard Falabella', '', 1 FROM personas WHERE trim(nombre) ILIKE 'Alfredo' LIMIT 1;

INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Cápsulas de café VERTUO (150ml+) - Café mexicano Nespresso', 'https://www.nespresso.com/cl/es/order/capsules/vertuo/master-origin-colombia', 2 FROM personas WHERE trim(nombre) ILIKE 'Alfredo' LIMIT 1;

-- ── PANCHO (5 Mar) ───────────────────────────────────────────
INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Giftcard IKEA', '', 0 FROM personas WHERE trim(nombre) ILIKE 'Pancho' LIMIT 1;

-- ── JAVI (11 Mar) ────────────────────────────────────────────
INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Espumador de Leche Milano Milk EasyWays', 'https://www.falabella.com/falabella-cl/product/140348465/Espumador-de-Leche-Milano-Milk-EasyWays/140348466', 0 FROM personas WHERE trim(nombre) ILIKE 'Javi' LIMIT 1;

INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Tazón doble vidrio (Blends & Tea)', 'https://www.blendsandtea.cl/collections/tazas-y-vasos/products/tazon-doble-vidrio', 1 FROM personas WHERE trim(nombre) ILIKE 'Javi' LIMIT 1;

-- ── FEÑA (15 Mar) ────────────────────────────────────────────
INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Figuras Mortal Kombat McFarlane Klassic (excepto Sub Zero)', '', 0 FROM personas WHERE trim(nombre) ILIKE 'Feña' LIMIT 1;

INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Metroid Prime Remastered (Switch)', '', 1 FROM personas WHERE trim(nombre) ILIKE 'Feña' LIMIT 1;

INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Giftcard de algún lugar interesante', '', 2 FROM personas WHERE trim(nombre) ILIKE 'Feña' LIMIT 1;

-- ── CLAUD (7 Abr) ────────────────────────────────────────────
INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Gift Card Amazon (cuenta: incoum@gmail.com)', '', 0 FROM personas WHERE trim(nombre) ILIKE 'Claud' LIMIT 1;

-- ── GERA (19 Abr) ────────────────────────────────────────────
INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Gift card Zara', '', 0 FROM personas WHERE trim(nombre) ILIKE 'Gera' LIMIT 1;

INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Gift card H&M', '', 1 FROM personas WHERE trim(nombre) ILIKE 'Gera' LIMIT 1;

INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Gift card Prune', '', 2 FROM personas WHERE trim(nombre) ILIKE 'Gera' LIMIT 1;

-- ── DAVID (19 Abr) ───────────────────────────────────────────
INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Juego de PS5 Dead Space (físico, idioma español)', '', 0 FROM personas WHERE trim(nombre) ILIKE 'David' LIMIT 1;

-- ── JOXE (8 May) ─────────────────────────────────────────────
INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Un Auto', '', 0 FROM personas WHERE trim(nombre) ILIKE 'Joxe' LIMIT 1;

INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Abrazos', '', 1 FROM personas WHERE trim(nombre) ILIKE 'Joxe' LIMIT 1;

INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Muchos besos', '', 2 FROM personas WHERE trim(nombre) ILIKE 'Joxe' LIMIT 1;

-- ── ANITA (19 Jun) ───────────────────────────────────────────
INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Gift card Zara', '', 0 FROM personas WHERE trim(nombre) ILIKE 'Anita' LIMIT 1;

INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Otra gift card Zara', '', 1 FROM personas WHERE trim(nombre) ILIKE 'Anita' LIMIT 1;

INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Más gift card Zara', '', 2 FROM personas WHERE trim(nombre) ILIKE 'Anita' LIMIT 1;

-- ── CAMI (21 Jun) ────────────────────────────────────────────
INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Gift card Zara', '', 0 FROM personas WHERE trim(nombre) ILIKE 'Cami' LIMIT 1;

INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Crema Kérastase', '', 1 FROM personas WHERE trim(nombre) ILIKE 'Cami' LIMIT 1;

INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Vinilo Björk', '', 2 FROM personas WHERE trim(nombre) ILIKE 'Cami' LIMIT 1;

-- ── CECI (4 Jul) ─────────────────────────────────────────────
INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Photocard San (Ateez) + Album Golden Hour V2 (Ver: FOR)', 'https://www.dicokpopstore.cl/ateez/10008-ateez-photocard-pob-aniteez-in-dreamland.html', 0 FROM personas WHERE trim(nombre) ILIKE 'Ceci' LIMIT 1;

INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Ateez Aniteez in Dreamland Passport Case', 'https://www.dicokpopstore.cl/ateez/9101--preventa-ateez-aniteez-in-dreamland-passport-case.html', 1 FROM personas WHERE trim(nombre) ILIKE 'Ceci' LIMIT 1;

-- ── NATI (23 Jul) ─ sin ideas registradas ────────────────────

-- ── MACA (19 Ago) ────────────────────────────────────────────
INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Gift card Zara', '', 0 FROM personas WHERE trim(nombre) ILIKE 'Maca' LIMIT 1;

-- ── BENJA (29 Ago) ───────────────────────────────────────────
INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Whisky Japonés Akashi Black 500cc 40º alc.', '', 0 FROM personas WHERE trim(nombre) ILIKE 'Benja' LIMIT 1;

INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Giftcard Mango Man', '', 1 FROM personas WHERE trim(nombre) ILIKE 'Benja' LIMIT 1;

-- ── CRISTIAN (5 Nov) ─────────────────────────────────────────
INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Camiseta Visita U. de Chile 2025 (Talla L) / Opción 2: Play 5', 'https://www.falabella.com/falabella-cl/product/140996873/Camiseta-Visita-Universidad-de-Chile-2025/141026885', 0 FROM personas WHERE trim(nombre) ILIKE 'Cristian' LIMIT 1;

-- ── DIEGO (24 Nov) ─ sin ideas registradas ───────────────────

-- ── SOLE (9 Dic) ─────────────────────────────────────────────
INSERT INTO regalo_ideas (persona_id, descripcion, enlace, orden)
SELECT id, 'Cremas: Crema hidratante + Serum retinol', '', 0 FROM personas WHERE trim(nombre) ILIKE 'Sole' LIMIT 1;

-- ================================================================
-- Verificación: muestra cuántas ideas quedaron por persona
-- ================================================================
SELECT p.nombre, count(r.id) as total_ideas
FROM personas p
LEFT JOIN regalo_ideas r ON r.persona_id = p.id
GROUP BY p.nombre, p.mes, p.dia
ORDER BY p.mes, p.dia;
