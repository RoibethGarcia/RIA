Guion sincronizado con las slides
Slide 1 - React Avanzado: Patrones y Optimizacion

Tiempo: 1 min

Que decir:

"Buenas. En esta presentacion vamos a ver React avanzado con foco en dos ejes: como disenar mejor nuestros componentes y como optimizar la aplicacion sin caer en optimizaciones innecesarias.

La idea no es memorizar APIs, sino entender cuando conviene usar ciertos patrones y herramientas. Y para que eso no quede en teoria, toda la charla va a apoyarse en un mismo demo: un catalogo de productos montado con Next.js App Router, donde podemos ver composicion, custom hooks, performance, robustez de interfaz, Server Components y testing."

Slide 2 - Ruta de la presentacion

Tiempo: 1 min

Que decir:

"Esta es la hoja de ruta de la exposicion. Primero voy a hablar de composicion y reutilizacion de logica. Despues pasamos a performance real, no placebo. Luego vemos herramientas de resiliencia y arquitectura moderna, y cerramos con testing y ejercicios."

"Hay cuatro aclaraciones importantes desde el inicio: hoy React ya no presenta 'Concurrent Mode' como un modo separado, sino como concurrent features; los render props siguen siendo validos, pero hoy son menos comunes; memoizar no equivale automaticamente a optimizar; y en esta charla voy a usar un unico demo de catalogo de productos para conectar todas las piezas, incluyendo Server Components reales con Next.js App Router."

Slide 3 - Mapa conceptual: de la composicion a la optimizacion

Tiempo: 2 min

Que decir:

"Este mapa resume la logica de toda la charla. Primero disenamos bien la API de nuestros componentes. Despues extraemos logica reutilizable. Recien despues pensamos en rendimiento. Y por ultimo, reforzamos la aplicacion con manejo de errores, arquitectura servidor-cliente y testing."

"La idea central que quiero sostener en toda la exposicion es esta: React avanzado no es usar APIs raras; es disenar con buena composicion, reutilizar logica con intencion y optimizar solo donde hay costo real. Por eso todo lo voy a ir aterrizando sobre el mismo proyecto, en vez de mostrar ejemplos desconectados."

Slide 4 - Patrones de composicion

Tiempo: 4 min

Que decir:

"React historicamente recomienda composicion sobre herencia. En lugar de extender componentes, los combinamos. Eso lo vemos desde cosas simples como children, hasta APIs mas avanzadas."

"Aca aparecen dos patrones importantes. El primero son los compound components. La idea es tener una API declarativa donde un componente padre coordina el estado y sus hijos expresan la estructura. En el demo eso se puede ver en un FilterPanel o en unas Tabs de categorias dentro del catalogo."

"Este patron conviene cuando queremos una API elegante, semantica y flexible, donde varias piezas comparten estado implicito. La contracara es que internamente suele requerir mas complejidad, generalmente con Context."

"El segundo patron es render props. Consiste en pasar una funcion a un componente para que esa funcion decida que renderizar. Fue muy util para reutilizar logica con control total del render, pero hoy muchas veces genera nesting, complica la lectura y en muchos casos fue reemplazado por custom hooks. Por eso aca lo trato como referencia historica breve, no como eje del demo."

Cierre de la slide:
"Entonces, composicion nos ayuda a construir APIs mas expresivas; render props es un patron importante historicamente; y ahora vamos a ver la herramienta moderna principal para reutilizar logica."

Slide 5 - Custom hooks reutilizables

Tiempo: 4 min

Que decir:

"Los custom hooks sirven para reutilizar logica, no UI. Ese punto es clave. No comparten la misma instancia de estado entre componentes; comparten la logica para manejar ese estado."

"En el mini proyecto, el hook central puede ser algo como useAsyncSearch(query). Ahi encapsulamos loading, error, debounce, cancelacion y retry, y dejamos que la UI solo se concentre en renderizar estados."

"Un custom hook puede encapsular estado, efectos, cancelaciones, sincronizacion con APIs externas, cache o coordinacion entre varios hooks. Por eso suele ser util cuando empezamos a repetir logica o cuando un componente mezcla demasiadas responsabilidades."

"Ademas, una practica avanzada es que si el hook devuelve funciones, a veces conviene devolverlas estabilizadas con useCallback, especialmente si los componentes consumidores estan memoizados."

Cierre de la slide:
"Entonces, si con composicion organizamos la UI, con custom hooks organizamos la logica."

Slide 6 - Performance optimization: mentalidad correcta

Tiempo: 2 min

Que decir:

"Antes de ver APIs concretas, esta slide marca la mentalidad correcta. El anti-patron es optimizar antes de medir: agregar memo en todos lados, cachear calculos baratos o meter useCallback sin necesidad."

"La documentacion moderna empuja una idea importante: memoizar no debe ser un ritual. Tiene que responder a un problema real de renders innecesarios, calculos costosos o props inestables."

"En nuestro catalogo, el lugar correcto para discutir performance no es la teoria, sino mirar donde se recalcula la lista, donde cambian las props y donde realmente esta el costo."

Frase fuerte:
"Primero medir, despues optimizar."

Slide 7 - React.memo, useMemo y useCallback

Tiempo: 6 min

Que decir:

"Estas tres herramientas suelen mencionarse juntas, pero hacen cosas distintas."

"React.memo permite que un componente saltee renders si sus props no cambiaron. En el demo eso tiene sentido si ProductList o ProductCard se renderizan seguido, son relativamente costosos y reciben props estables."

"useMemo cachea el resultado de un calculo. Sirve para calculos caros, para estabilizar valores derivados y para no rehacer trabajo que no cambio. En este caso puede servir para el filtrado o para derivados de la busqueda si realmente son costosos. Pero React deja claro que esto es una optimizacion de performance, no algo que deba usarse para que el codigo funcione."

"useCallback cachea la definicion de una funcion. Es util cuando pasamos callbacks a hijos memoizados, cuando devolvemos funciones desde un custom hook o cuando queremos evitar dependencias inestables en un efecto. En el catalogo, un ejemplo claro seria estabilizar onSelectProduct si ProductList esta memoizado."

Cierre de la slide:
"En resumen: no son herramientas magicas. Son herramientas tacticas. Si no hay un problema real, probablemente no hagan falta."

Slide 8 - Code splitting con React.lazy y Suspense

Tiempo: 4 min

Que decir:

"Aca el objetivo es reducir el JavaScript inicial y cargar ciertas partes solo cuando realmente se necesitan."

"React.lazy permite diferir la carga de un componente hasta su primer render. Suspense permite mostrar un fallback mientras ese componente todavia no esta listo."

"Una forma simple de explicarlo es: lazy decide cuando cargar, y Suspense decide que ve el usuario mientras espera."

"En el demo, eso encaja muy bien con ProductDetailsModal: no tiene sentido cargar de entrada algo que el usuario quiza nunca abra. La ventaja es menos JS inicial. El costo es que aparecen mas estados de carga y hay que disenarlos bien."

"Tambien hay que evitar declarar el componente lazy dentro de otro componente, porque eso puede resetear estado."

Slide 9 - Virtualizacion de listas con react-window

Tiempo: 3 min

Que decir:

"Cuando una lista tiene miles de elementos, el problema no es solo React. Tambien hay costo de layout, paint y memoria del navegador. La solucion es virtualizar."

"Virtualizar significa renderizar solo los elementos visibles y un pequeno buffer. react-window es una libreria muy conocida para esto. Trabaja con conceptos como cantidad de filas, altura y overscan."

"En este caso lo podemos aterrizar en un catalogo mockeado con 1000 o mas productos. Ahi si se entiende por que la lista completa empieza a costar y por que virtualizar tiene sentido. En listas pequenas, esta complejidad no vale la pena."

"Un detalle tecnico interesante es que los tamanos dinamicos existen, pero tienden a ser menos eficientes que los tamanos fijos."

Slide 10 - Concurrent rendering y startTransition

Tiempo: 4 min

Que decir:

"Aca conviene corregir la terminologia: hoy lo correcto es hablar de concurrent features, no de un 'Concurrent Mode' separado."

"startTransition permite marcar una actualizacion como no urgente. Asi React puede mantener responsiva la interfaz mientras procesa algo mas pesado."

"El caso clasico es el buscador del catalogo: actualizar el texto del input es urgente, pero recalcular una lista grande de resultados puede tratarse como no urgente. Entonces el usuario siente que la UI sigue respondiendo, aunque la parte pesada se procese en segundo plano."

"Algo importante: esto no se usa para controlar el input en si, sino para la actualizacion costosa asociada a ese input."

Slide 11 - Robustez de interfaz: Error Boundaries y Portals

Tiempo: 4 min

Que decir:

"Esta slide reune dos herramientas distintas, pero ambas ayudan a construir interfaces mas robustas."

"Primero, los Error Boundaries. Sirven para capturar errores de render en un subarbol y mostrar una UI de fallback, en lugar de romper toda la aplicacion. Son muy utiles alrededor de widgets secundarios, paneles experimentales o zonas del modal que podrian fallar."

"Ademas, hay un dato importante: los Error Boundaries en React siguen siendo una API basada en clases."

"Segundo, los Portals. Permiten renderizar algo en otra parte del DOM sin romper el arbol logico de React. Esto es ideal para modales, tooltips, popovers o dropdowns."

"En el demo, ProductDetailsModal puede ir por portal. Y lo importante es que aunque el nodo cambie de lugar en el DOM, sigue perteneciendo al arbol React: conserva contexto y la propagacion de eventos sigue el arbol React."

Slide 12 - Server Components con Next.js App Router

Tiempo: 4 min

Que decir:

"Este tema hay que explicarlo sin marketing. Los Server Components son una herramienta de arquitectura, no 'React mejorado'."

"Aca si quiero mostrar algo real. En Next.js App Router, las pages y layouts son Server Components por defecto. Entonces puedo ensenar la frontera leyendo dos archivos: app/products/page.tsx, que obtiene datos del servidor y renderiza la pagina inicial, y SearchShell.tsx, que arranca con 'use client' y se queda con la interactividad."

"Que ganamos con esto? Menos JavaScript enviado al cliente, acceso directo a datos del servidor y una mejor separacion entre lo que necesita interactividad y lo que no."

"Hay cuatro ideas importantes: 'use client' marca la frontera cliente-servidor; la parte interactiva vive del lado cliente; las props que se pasan a componentes cliente deben ser serializables; y NO debemos pasar funciones del server al client como si nada, porque esa frontera impone reglas reales."

Cierre de la slide:
"Entonces, Server Components no son para todo; sirven cuando queremos mover trabajo fuera del cliente y reducir bundle, a cambio de mayor complejidad arquitectonica."

Slide 13 - Testing de componentes

Tiempo: 3 min

Que decir:

"Para testing, en una charla de 40 minutos lo mas importante no es cubrir todas las herramientas, sino explicar el enfoque correcto."

"El enfoque moderno es probar comportamiento, accesibilidad e interaccion, evitando tests demasiado atados a detalles internos. Por eso React Testing Library propone testear como usuario, no como cirujano del arbol interno."

"En este proyecto, ejemplos razonables serian testear el buscador, los estados loading y error de useAsyncSearch, y el comportamiento del modal. Las queries recomendadas priorizan getByRole, luego getByLabelText, luego getByText, y getByTestId como ultimo recurso. Para casos async se usan consultas como findBy...."

Cierre de la slide:
"La idea es que un test util no comprueba internamente como esta hecho el componente, sino si se comporta como el usuario espera."

Slide 14 - Ejercicio 1: Optimizar un componente que re-renderiza demasiado

Tiempo: 3 min

Que decir:

"En este ejercicio vemos un caso tipico usando el mismo catalogo. Tenemos una pagina de productos, un input de busqueda y una lista filtrada. El componente filtra en cada render y ademas le pasa una funcion inline a ProductList."

"Aca la pregunta no es 'que hook uso', sino 'donde esta el costo real'. Si la lista es grande, quiza conviene memoizar el filtrado con useMemo. Si ProductList esta memoizado, quiza conviene estabilizar onSelect con useCallback. Y si el problema es la cantidad de elementos visibles, quiza lo correcto ni siquiera sea memoizar, sino virtualizar."

Cierre del ejercicio:
"Este ejercicio resume la idea de toda la charla: no optimizar por reflejo, sino entender primero que esta costando."

Slide 15 - Ejercicio 2: Crear un custom hook con logica compleja

Tiempo: 3 min + cierre

Que decir:

"Este segundo ejercicio apunta a diseno de logica reutilizable. La idea es crear algo como useAsyncSearch(query), que encapsule loading, error, cancelacion, debounce y retry."

"Lo importante aca es decidir que queda dentro del hook y que queda en la UI. El hook deberia manejar la logica de busqueda y exponer una API simple. El componente consumidor deberia centrarse en renderizar el estado."

Cierre final de toda la exposicion:

"Si tuviera que cerrar con una sola idea, diria esta: React avanzado no es acumular tecnicas, sino tomar buenas decisiones. Primero disenar bien la composicion, despues extraer logica reusable, luego optimizar con criterio, y finalmente validar comportamiento con testing. Y si ademas vas a hablar de Server Components, ensenalos de verdad, con una frontera servidor-cliente visible en el codigo."
