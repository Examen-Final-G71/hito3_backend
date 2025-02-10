-- ENUM para clasificaciones (estos seran los 3 tipos de productos que se permitiran)
CREATE TYPE "clasificacion" AS ENUM (
    'art_aseo',
    'epp',
    'libreria'
);

-- Tabla de Usuarios
CREATE TABLE "Usuarios" (
    "id" SERIAL PRIMARY KEY,
    "correo" VARCHAR(255) NOT NULL UNIQUE,
    "pass" VARCHAR(255) NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "admin" BOOLEAN NOT NULL
);

-- Tabla de Publicaciones
CREATE TABLE "Publicaciones" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(255) NOT NULL,
    "precio" NUMERIC(10, 2) NOT NULL,
    "clasificacion" CLASIFICACION NOT NULL,
    "descripcion" VARCHAR(255),
    "usuario_id" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "imagen" VARCHAR(255) NOT NULL,
    "fecha_publicacion" TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("id")
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Tabla de Transacciones
CREATE TABLE "Transacciones" (
    "id" SERIAL PRIMARY KEY,
    "numero_transaccion" SERIAL NOT NULL UNIQUE,
    "monto_total" NUMERIC(10, 2) NOT NULL,
    "fecha" TIMESTAMP NOT NULL DEFAULT NOW(),
    "publicacion_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("id")
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY ("publicacion_id") REFERENCES "Publicaciones"("id")
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Tabla de Comentarios
CREATE TABLE "Comentarios" (
    "id" SERIAL PRIMARY KEY,
    "calificacion" SMALLINT NOT NULL CHECK ("calificacion" BETWEEN 1 AND 5),
    "comment" VARCHAR(255),
    "fecha" TIMESTAMP NOT NULL DEFAULT NOW(),
    "usuario_id" INTEGER NOT NULL,
    "publicacion_id" INTEGER NOT NULL,
    FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("id")
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY ("publicacion_id") REFERENCES "Publicaciones"("id")
        ON UPDATE CASCADE ON DELETE CASCADE
);
