-- ============================================================
-- CUMPLES HUB — Schema de Supabase
-- Ejecutar en: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- 1. Tabla de personas (integrantes del equipo)
CREATE TABLE personas (
  id          BIGSERIAL PRIMARY KEY,
  nombre      TEXT NOT NULL,
  dia         INTEGER NOT NULL CHECK (dia BETWEEN 1 AND 31),
  mes         INTEGER NOT NULL CHECK (mes BETWEEN 1 AND 12),
  signo       TEXT,
  emoji_signo TEXT,
  color       TEXT DEFAULT 'from-blue-400 to-indigo-500',
  foto_url    TEXT,
  telefono    TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabla de ideas de regalo (relación N:1 con personas)
CREATE TABLE regalo_ideas (
  id          BIGSERIAL PRIMARY KEY,
  persona_id  BIGINT NOT NULL REFERENCES personas(id) ON DELETE CASCADE,
  descripcion TEXT,
  enlace      TEXT,
  orden       INTEGER DEFAULT 0
);

-- 3. Tabla de aportes (quién aporta para el regalo de quién)
CREATE TABLE aportes (
  id             BIGSERIAL PRIMARY KEY,
  aportante_id   BIGINT NOT NULL REFERENCES personas(id) ON DELETE CASCADE,
  cumpleanero_id BIGINT NOT NULL REFERENCES personas(id) ON DELETE CASCADE,
  pagado         BOOLEAN DEFAULT FALSE,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT no_autoporte CHECK (aportante_id != cumpleanero_id),
  CONSTRAINT aporte_unico UNIQUE (aportante_id, cumpleanero_id)
);

-- ============================================================
-- TRIGGER: Al insertar una persona nueva, crear automáticamente
-- los registros de aporte con todos los demás integrantes
-- ============================================================

CREATE OR REPLACE FUNCTION crear_aportes_para_nueva_persona()
RETURNS TRIGGER AS $$
BEGIN
  -- Nueva persona aporta para todos los existentes
  INSERT INTO aportes (aportante_id, cumpleanero_id, pagado)
  SELECT NEW.id, id, false
  FROM personas
  WHERE id != NEW.id;

  -- Todos los existentes aportan para la nueva persona
  INSERT INTO aportes (aportante_id, cumpleanero_id, pagado)
  SELECT id, NEW.id, false
  FROM personas
  WHERE id != NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_insert_persona
AFTER INSERT ON personas
FOR EACH ROW
EXECUTE FUNCTION crear_aportes_para_nueva_persona();

-- ============================================================
-- ROW LEVEL SECURITY — Configuración permisiva para app interna
-- (cualquiera con la URL puede leer y escribir)
-- ============================================================

ALTER TABLE personas     ENABLE ROW LEVEL SECURITY;
ALTER TABLE regalo_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE aportes      ENABLE ROW LEVEL SECURITY;

-- Políticas: acceso público total (anon key)
CREATE POLICY "acceso_publico_personas"     ON personas     FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "acceso_publico_regalos"      ON regalo_ideas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "acceso_publico_aportes"      ON aportes      FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- STORAGE: Bucket para fotos de perfil
-- Ejecutar esto también en SQL Editor
-- ============================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('fotos-perfil', 'fotos-perfil', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "subir_fotos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'fotos-perfil');

CREATE POLICY "ver_fotos" ON storage.objects
  FOR SELECT USING (bucket_id = 'fotos-perfil');

CREATE POLICY "eliminar_fotos" ON storage.objects
  FOR DELETE USING (bucket_id = 'fotos-perfil');

-- ============================================================
-- DATOS INICIALES (opcional — importar el equipo existente)
-- Descomenta y ajusta si quieres cargar los datos desde el SQL
-- ============================================================

/*
INSERT INTO personas (nombre, dia, mes, signo, emoji_signo, color) VALUES
  ('Alfredo',  26,  2, 'Piscis',    '♓', 'from-blue-400 to-indigo-500'),
  ('Pancho',    5,  3, 'Piscis',    '♓', 'from-emerald-400 to-teal-500'),
  ('Javi',     11,  3, 'Piscis',    '♓', 'from-pink-400 to-rose-500'),
  ('Feña',     15,  3, 'Piscis',    '♓', 'from-purple-400 to-violet-500'),
  ('Claud',     7,  4, 'Aries',     '♈', 'from-orange-400 to-amber-500'),
  ('Gera',     19,  4, 'Aries',     '♈', 'from-teal-400 to-green-500'),
  ('David',    19,  4, 'Aries',     '♈', 'from-cyan-400 to-blue-500'),
  ('Joxe',      8,  5, 'Tauro',     '♉', 'from-fuchsia-400 to-pink-500'),
  ('Anita',    19,  6, 'Géminis',   '♊', 'from-red-400 to-rose-600'),
  ('Cami',     21,  6, 'Géminis',   '♊', 'from-yellow-400 to-amber-500'),
  ('Ceci',      4,  7, 'Cáncer',    '♋', 'from-violet-400 to-fuchsia-500'),
  ('Nati',     23,  7, 'Leo',       '♌', 'from-sky-400 to-blue-500'),
  ('Maca',     19,  8, 'Leo',       '♌', 'from-rose-400 to-pink-500'),
  ('Benja',    29,  8, 'Virgo',     '♍', 'from-lime-400 to-green-500'),
  ('Cristian',  5, 11, 'Escorpio',  '♏', 'from-indigo-400 to-purple-500'),
  ('Diego',    24, 11, 'Sagitario', '♐', 'from-amber-400 to-red-500'),
  ('Sole',      9, 12, 'Sagitario', '♐', 'from-emerald-400 to-cyan-500');
*/
