---
title: Características Extendidas de Markdown
published: 2025-04-25
tags:
  - Guía
toc: false
lang: es
abbrlink: markdown-extended-features
---

Aquí presentamos algunas características extendidas de Markdown compatibles con Retypeset, incluyendo ejemplos de sintaxis y sus efectos estilísticos.

## Leyendas de Figuras

Para crear leyendas automáticas para figuras, utilice la sintaxis estándar de imágenes de Markdown `![alt](src)`. Para ocultar la leyenda, añada un guion bajo `_` antes del texto `alt` o deje el texto `alt` vacío.

### Sintaxis

```
![Descripción de la imagen](https://image.example.com/image-01.webp)

![_Descripción de la imagen](https://image.example.com/image-01.webp)
```

### Resultado

![Descripción de la imagen](https://image.radishzz.cc/image/gallery/06.webp)

![_Descripción de la imagen](https://image.radishzz.cc/image/gallery/06.webp)

## Bloques de Admonición

Para crear bloques de admonición, utilice la sintaxis de GitHub `> [!TYPE]` o la directiva contenedor `:::type`. Se admiten cinco tipos: `note`, `tip`, `important`, `warning` y `caution`.

### Sintaxis

```
> [!NOTE]
> Información útil que los usuarios deben conocer, incluso al leer por encima.

> [!TIP]
> Consejos útiles para hacer las cosas mejor o más fácilmente.

> [!IMPORTANT]
> Información clave que los usuarios necesitan saber para lograr su objetivo.

:::warning
Información urgente que requiere atención inmediata del usuario para evitar problemas.
:::

:::caution
Advierte sobre riesgos o resultados negativos de ciertas acciones.
:::

:::note[TÍTULO PERSONALIZADO]
Esta es una nota con un título personalizado.
:::
```

### Resultado

> [!NOTE]
> Información útil que los usuarios deben conocer, incluso al leer por encima.

> [!TIP]
> Consejos útiles para hacer las cosas mejor o más fácilmente.

> [!IMPORTANT]
> Información clave que los usuarios necesitan saber para lograr su objetivo.

:::warning
Información urgente que requiere atención inmediata del usuario para evitar problemas.
:::

:::caution
Advierte sobre riesgos o resultados negativos de ciertas acciones.
:::

:::note[TÍTULO PERSONALIZADO]
Esta es una nota con un título personalizado.
:::

## Repositorio de Github

Para crear una tarjeta de repositorio de Github, utilice la directiva hoja `::github{repo="owner/repo"}`. Los datos del repositorio se obtienen en tiempo real de la API de GitHub después de que la página se carga.

### Sintaxis

```
::github{repo="radishzzz/astro-theme-retypeset"}
```

### Resultado

::github{repo="radishzzz/astro-theme-retypeset"}

## Videos

Para crear videos, utilice la directiva hoja `::youtube{id="videoId"}`.

### Sintaxis

```
::youtube{id="9pP0pIgP2kE"}

::bilibili{id="BV1sK4y1Z7KG"}
```

### Resultado

::youtube{id="9pP0pIgP2kE"}

::bilibili{id="BV1sK4y1Z7KG"}

## Publicaciones de X

Para crear tarjetas de publicaciones de X, utilice la directiva hoja `::x{url="postLink"}`.

### Sintaxis

```
::x{url="https://x.com/astrodotbuild/status/1632809919291457537"}
```

### Resultado

::x{url="https://x.com/astrodotbuild/status/1632809919291457537"}
