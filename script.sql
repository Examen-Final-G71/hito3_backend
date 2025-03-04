-- ENUM para clasificaciones (estos seran los 3 tipos de productos que se permitiran)
CREATE TYPE "clasificacion" AS ENUM ('art_aseo','epp','libreria');

-- Tabla de Usuarios
CREATE TABLE "usuarios" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(255) NOT NULL, 
    "correo" VARCHAR(255) NOT NULL UNIQUE,
    "pass" VARCHAR(255) NOT NULL,
);

-- Tabla de Publicaciones
CREATE TABLE "publicaciones" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(255) NOT NULL,
    "precio" NUMERIC(10, 2) NOT NULL,
    "clasificacion" clasificacion NOT NULL,
    "descripcion" VARCHAR(255),
    "usuario_id" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "imagen" VARCHAR(255) NOT NULL,
    "fecha_publicacion" TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id")
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Tabla de Transacciones
CREATE TABLE "transacciones" (
    "id" SERIAL PRIMARY KEY,
    "tipo_transaccion" BOOLEAN NOT NULL,
    "monto_total" NUMERIC(10, 2) NOT NULL,
    "fecha" TIMESTAMP NOT NULL DEFAULT NOW(),
    "usuario_id" INTEGER NOT NULL,
    FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id")
        ON UPDATE CASCADE ON DELETE CASCADE,
);

-- Tabla de Comentarios
CREATE TABLE "comentarios" (
    "id" SERIAL PRIMARY KEY,
    "calificacion" SMALLINT NOT NULL CHECK ("calificacion" BETWEEN 1 AND 5),
    "comment" TEXT,
    "fecha" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "usuario_id" INTEGER,
    "publicacion_id" INTEGER NOT NULL,
    FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id")
        ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY ("publicacion_id") REFERENCES "publicaciones"("id")
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Tabla de Detalle de Transacciones
CREATE TABLE "detalle_transacciones" (
    "id" SERIAL PRIMARY KEY,
    "transaccion_id" INTEGER NOT NULL,
    "publicacion_id" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL CHECK ("cantidad" > 0),
    "subtotal" NUMERIC(10, 2) NOT NULL CHECK ("subtotal" >= 0),

    FOREIGN KEY ("transaccion_id") REFERENCES "transacciones"("id")
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY ("publicacion_id") REFERENCES "publicaciones"("id")
        ON UPDATE CASCADE ON DELETE CASCADE
);