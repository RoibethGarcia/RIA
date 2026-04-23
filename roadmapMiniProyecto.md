Roadmap del mini proyecto - version elegida para la presentacion

Si. Aca lo correcto NO es quedarse en la recomendacion principal anterior. Si en la presentacion vas a mencionar Server Components, entonces tiene mas sentido ensenarlos de verdad y no dejarlos como humo conceptual.

Lo verifique contra el material actual:

- `README.md` ya incluye explicitamente **Server Components (Next.js App Router)**.
- `Guion.md` ya les dedica una slide completa.

Entonces la decision correcta es esta:

## Decision final

El mini proyecto base de la charla pasa a ser:

**Next.js App Router + catalogo/buscador de productos**

Trade-off aceptado:

- **Ganancia**: puedes mostrar Server Components reales, frontera server/client real y una arquitectura moderna coherente con la slide.
- **Costo**: deja de ser el setup mas simple posible.

Por eso la regla es MUY importante:

**si sube la complejidad arquitectonica, baja el alcance funcional.**

No hay que inflar el proyecto. Hay que hacerlo mas chico y mas intencional.

## Dominio elegido

Me quedo con **catalogo de productos** porque conecta facil con casi toda la charla:

- busqueda y filtros
- lista grande para virtualizacion
- modal para detalles
- estados loading/error
- callbacks hacia hijos memoizados
- separacion clara entre datos del servidor e interactividad del cliente

## Por que Next.js App Router y no Vite + React

Antes la recomendacion principal era Vite + React por simplicidad. Eso tenia sentido SOLO si Server Components quedaban como explicacion conceptual.

Pero ahora cambio la prioridad pedagogica.

Como quieres ensenarlos realmente, hay que usar el stack donde viven de verdad:

- `app/products/page.tsx` como **Server Component**
- `SearchShell` como **Client Component** con `'use client'`
- props serializables cruzando la frontera

Ese punto importa porque ensena ARQUITECTURA, no solo APIs.

## Como mapearlo a la charla

Con un solo proyecto puedes cubrir toda la presentacion sin dispersarte.

### Slide 4 - Patrones de composicion

Usa un `FilterPanel` o unas `Tabs` de categorias como ejemplo de **compound components**.

### Slide 5 - Custom hooks reutilizables

El hook central del demo debe ser:

`useAsyncSearch(query)`

Y deberia encapsular:

- loading
- error
- debounce
- cancelacion con `AbortController`
- retry

### Slides 6 y 7 - Optimizacion real

Muestra el mismo flujo del catalogo:

- `ProductList` memoizada cuando tenga sentido
- `useMemo` para derivados costosos
- `useCallback` para estabilizar `onSelectProduct`

La idea NO es memoizar por reflejo. La idea es mostrar que costo resuelves.

### Slide 8 - Code splitting

Carga diferida de `ProductDetailsModal` con:

- `React.lazy`
- `Suspense`

Asi obtienes una captura simple y una explicacion concreta.

### Slide 9 - Virtualizacion

Si mockeas 1000+ productos, puedes ensenar `react-window` con un caso realista.

### Slide 10 - startTransition

En el buscador:

- actualizar el input = urgente
- actualizar resultados pesados = no urgente

Ese contraste se entiende MUCHO mejor si se ve sobre la misma pantalla.

### Slide 11 - Error Boundary + Portal

- `ErrorBoundary` alrededor de un widget secundario o del modal detallado
- `createPortal` para montar el modal fuera del contenedor principal

### Slide 12 - Server Components reales

Aca ya no lo explicas en abstracto.
Lo ensenas leyendo dos archivos:

- `app/products/page.tsx` - obtiene datos en servidor y renderiza la pagina inicial
- `SearchShell.tsx` - empieza con `'use client'` y maneja la interactividad

Mensaje pedagogico clave:

- la frontera la marca `'use client'`
- lo interactivo vive en cliente
- lo que cruza esa frontera debe ser serializable
- NO debes pasar funciones del server al client

### Slides 14 y 15 - Ejercicios

Los dos ejercicios sugeridos del README quedan PERFECTAMENTE alineados con este mismo proyecto:

1. **Optimizar un componente que re-renderiza demasiado**
2. **Crear un custom hook con logica compleja**

Eso te da coherencia total entre teoria, demo y cierre.

## Arquitectura minima del demo

No sobredisenes. La estructura minima deberia ser algo asi:

- `app/products/page.tsx`
- `components/search/SearchShell.tsx`
- `components/search/SearchInput.tsx`
- `components/products/ProductList.tsx`
- `components/products/ProductCard.tsx`
- `components/products/ProductDetailsModal.tsx`
- `components/common/ErrorBoundary.tsx`
- `hooks/useAsyncSearch.ts`
- `lib/products.ts`

Y listo. Con eso ya tienes material de sobra.

## Material que debes sacar para la PPT

Saca tres tipos de evidencia del MISMO proyecto:

### 1. Captura de UI

- buscador
- lista de productos
- modal de detalle
- version virtualizada si la muestras

### 2. Captura de codigo corta

- `app/products/page.tsx`
- `SearchShell.tsx` con `'use client'`
- `useAsyncSearch`
- `React.memo` / `useMemo`
- `createPortal`

### 3. Captura comparativa

- sin memo / con memo
- sin transicion / con `startTransition`
- lista completa / lista virtualizada
- explicacion conceptual de frontera server/client

Eso convierte las slides en material que ENSENA y no solo decora.

## Checklist de validacion

Antes de dar por cerrado el roadmap, el mini proyecto debe dejar claro esto:

- el stack elegido es **Next.js App Router**
- la demo usa **un solo dominio**: catalogo de productos
- `page.tsx` representa la capa servidor
- `SearchShell` representa la capa cliente
- `useAsyncSearch` maneja loading, error, debounce y cancelacion
- el modal puede mostrarse con lazy + suspense + portal
- el `ErrorBoundary` degrada solo una zona puntual
- no se cruzan props no serializables entre server y client

## Veredicto final

Si: la recomendacion alternativa ahora pasa a ser la correcta.

La charla deja de ser una coleccion de conceptos sueltos y pasa a ser un recorrido coherente sobre un unico demo con criterio arquitectonico real.

Eso la hace MAS solida.
No mas compleja por capricho, sino mejor enfocada.
