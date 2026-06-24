-- ============================================================
-- CUMPLES LEADS — Schema de Supabase
-- Ejecutar en: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- 1. Tabla de personas
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

-- 2. Tabla de ideas de regalo
CREATE TABLE regalo_ideas (
  id          BIGSERIAL PRIMARY KEY,
  persona_id  BIGINT NOT NULL REFERENCES personas(id) ON DELETE CASCADE,
  descripcion TEXT,
  enlace      TEXT,
  orden       INTEGER DEFAULT 0
);

-- 3. Tabla de aportes
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
-- TRIGGER: Al insertar persona nueva, crear aportes automáticos
-- ============================================================

CREATE OR REPLACE FUNCTION crear_aportes_para_nueva_persona()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO aportes (aportante_id, cumpleanero_id, pagado)
  SELECT NEW.id, id, false FROM personas WHERE id != NEW.id;

  INSERT INTO aportes (aportante_id, cumpleanero_id, pagado)
  SELECT id, NEW.id, false FROM personas WHERE id != NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_insert_persona
AFTER INSERT ON personas
FOR EACH ROW
EXECUTE FUNCTION crear_aportes_para_nueva_persona();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE personas     ENABLE ROW LEVEL SECURITY;
ALTER TABLE regalo_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE aportes      ENABLE ROW LEVEL SECURITY;

CREATE POLICY "acceso_publico_personas"  ON personas     FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "acceso_publico_regalos"   ON regalo_ideas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "acceso_publico_aportes"   ON aportes      FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- STORAGE: Bucket fotos de perfil
-- ============================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('fotos-perfil', 'fotos-perfil', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "subir_fotos"    ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'fotos-perfil');
CREATE POLICY "ver_fotos"      ON storage.objects FOR SELECT USING (bucket_id = 'fotos-perfil');
CREATE POLICY "eliminar_fotos" ON storage.objects FOR DELETE USING (bucket_id = 'fotos-perfil');

-- ============================================================
-- DATOS INICIALES — 4 integrantes
-- ============================================================

INSERT INTO personas (nombre, dia, mes, signo, emoji_signo, color) VALUES
  ('Pame',   29,  4, 'Tauro',      '♉', 'from-pink-400 to-rose-500'),
  ('Diego',  24, 11, 'Sagitario',  '♐', 'from-amber-400 to-red-500'),
  ('Pauli',  10, 12, 'Sagitario',  '♐', 'from-violet-400 to-fuchsia-500'),
  ('Danilo', 23, 12, 'Capricornio','♑', 'from-blue-400 to-indigo-500');
