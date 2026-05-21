---
layout: post
title: "Desmitificando el AI First: la prioridad estratégica"
date: 2026-05-21
categories: [Artificial Intelligence, Software Architecture, Tecnología]
tags: [Artificial Intelligence, Software Architecture, Tecnología]
excerpt: "AI First no es meter IA en todo ni una estrategia aislada. Es una prioridad estratégica que convive con Data First, Security First y Cloud First. El rol del arquitecto: que las prioridades fuera del top 5 no se pierdan."
image: /assets/img/ai-first-prioridad-estrategica.webp
---

![AI First como prioridad estratégica en arquitectura de software](/assets/img/ai-first-prioridad-estrategica.webp)

En los últimos tiempos, "AI First" se convirtió en una de esas frases que aparecen en presentaciones corporativas, posts de LinkedIn y roadmaps tecnológicos. Y como suele pasar con los términos de moda, se fue distorsionando hasta convertirse en algo que muchos repiten sin entender del todo qué significa.

Hay quienes lo interpretan como "vamos a meter IA en todo lo que hagamos". Otros lo ven como una estrategia aislada y única, casi como un departamento aparte que vive en su propia burbuja. Y unos pocos lo entienden como lo que realmente es: una estrategia de priorización que debe convivir con todas las demás estrategias de la organización.

En este post quiero aclarar qué es realmente AI First, cómo se relaciona con otras estrategias "First" que ya conocemos, y por qué el rol del arquitecto de software es clave para que todo esto no se vuelva un caos.

### ¿Qué significa realmente "First"?

Antes de hablar de AI First, hablemos del sufijo "first". Cuando decimos que algo es "first" no estamos diciendo que sea lo único importante. Estamos diciendo que es lo primero a considerar al momento de tomar decisiones de diseño y arquitectura.

"Mobile First" no significa que el escritorio no importe. Significa que diseñamos pensando primero en móvil y luego adaptamos. "Cloud First" no significa que todo tiene que estar en la nube sí o sí, sino que la nube es la primera opción a evaluar antes de considerar alternativas on-premise; pensar cloud native primero.

Entonces, AI First es una prioridad, no una declaración de exclusividad. El "first" indica su posición dentro de una clasificación de estrategias, pero no implica que las demás prioridades dejen de ser relevantes. Es decir, "primero que..." y no "en lugar de...".

### El problema de tener demasiadas prioridades

Acá viene la trampa más común: si todo es prioridad, nada es prioridad. He visto organizaciones que se declaran simultáneamente AI First, Data First, Customer First, Security First, Cloud First, Mobile First, API First, Privacy First y otras. El resultado es predecible: cuando hay que tomar decisiones difíciles donde estas prioridades chocan entre sí, nadie sabe qué pesa más.

Y acá hay un fenómeno que vale la pena nombrar: en la práctica, stakeholders y desarrolladores tienden a enfocarse solo en las primeras 5 prioridades del ranking. No por mala intención, sino porque la atención humana es limitada y el ranking funciona como un filtro natural. Lo que está en el top 5 se discute, se mide y se exige; lo que queda más abajo se asume, se olvida o se posterga.

Esto no significa que haya que limitar la lista a 5. Significa que, sin una cultura organizacional fuerte o sin la presencia activa de un arquitecto de software, las prioridades que quedan fuera del top 5 corren un riesgo real de quedar abandonadas. La organización puede terminar saltando estrategias importantes simplemente porque no estaban entre las primeras cinco que el equipo tenía en mente.

## A nivel organizacional vs. a nivel proyecto

Una organización tiene su conjunto de estrategias generales, pero cada proyecto puede tener su propio orden de prioridades según su naturaleza. Eso sí, sin desviarse de la estrategia organizacional.

A nivel organizacional, una clasificación podría verse así:

1. AI First
2. Data First
3. Customer First
4. Security First
5. Cloud First

Pero cuando bajamos al nivel de un proyecto específico, la realidad cambia. Imaginemos una app bancaria móvil con capacidades de IA. El orden podría reorganizarse así:

1. AI First
2. Mobile First
3. Data First
4. Customer First
5. Security First
6. Cloud First

¿Por qué "Mobile First" entra en la lista? Porque para ese proyecto en particular, la experiencia móvil es un factor de diseño que no puede dejarse para después. Si lo hacemos, vamos a terminar con una app que funciona "más o menos" en móvil, que es exactamente lo opuesto a lo que el proyecto necesita.

Pensemos ahora en un servicio de back-end:

1. AI First
2. API First
3. Cloud First
4. Data First
5. Security First

Lo importante es que la prioridad organizacional se mantiene como marco, y las prioridades del proyecto se acomodan dentro de ese marco sin contradecirlo.

## AI First

Acá quiero ser muy explícito porque es el malentendido más común: AI First no es una estrategia aislada. No es un capítulo aparte del libro de la organización. Es una estrategia que **debe convivir con las demás**.

Cuando hablamos de AI First, estamos diciendo que la inteligencia artificial es el primer lente a través del cual evaluamos cómo resolver un problema, diseñar un producto o automatizar un proceso. Pero ese lente no anula los demás. Cuando diseñamos una solución con IA, también tenemos que pensar en los datos que la alimentan y apoyarán la toma de decisiones (Data First), en cómo la van a usar las personas y con qué propósito (Customer First), en cómo protegemos esa información y evitamos riesgos (Security First) y en dónde vive todo esto y bajo qué arquitectura (Cloud First).

Si tratamos a AI First como una isla, vamos a construir soluciones con IA sin datos confiables, sin pensar en el usuario final, sin seguridad y con una arquitectura deficiente. Y eso no es AI First, eso es un experimento que va a fracasar.

En la práctica, esto se traduce en una pregunta que el equipo debe hacerse antes de tomar decisiones importantes: ¿hay una manera en que la inteligencia artificial pueda aportar valor acá? Si la respuesta es sí, esa opción se evalúa primero. Si la respuesta es no, o si el costo no lo justifica, se descarta y se siguen las vías tradicionales. Pero la pregunta se hace siempre, no como una ocurrencia tardía.

Adoptar AI First implica varios cambios concretos:

- A nivel de mentalidad, el equipo deja de ver la IA como un "extra" o un proyecto especial, y empieza a considerarla como una capacidad disponible desde el inicio del diseño. No es algo que se agrega al final para sumar puntos de innovación.

- A nivel de procesos, las fases de discovery, diseño y arquitectura incluyen explícitamente la evaluación de componentes de IA. Esto requiere que los equipos conozcan lo suficiente sobre capacidades de modelos, sus limitaciones y sus costos para tomar decisiones informadas.

- A nivel de infraestructura, la organización invierte en las bases que hacen viable usar IA de forma seria: pipelines de datos confiables, plataformas para entrenar o consumir modelos, mecanismos de monitoreo y gobierno, y políticas claras sobre cómo y dónde se puede aplicar.

### Lo que AI First no es

No es usar IA en todo porque sí. No es reemplazar lógica determinística que ya funciona bien con un modelo solo para tener IA en la solución. No es un eslogan de marketing. Y, como ya dijimos, no es una estrategia que viva aislada del resto.

## El rol del arquitecto de software

Acá entra una pieza fundamental: el arquitecto de software. No basta con declarar prioridades en un documento y olvidarse. Alguien tiene que validar, en cada decisión técnica, que la solución esté cumpliendo con todas las prioridades del proyecto y de la organización, no solo con las que están en el top de la lista.

Recordemos el punto anterior: los equipos tienden a enfocarse en las primeras 5 prioridades. El arquitecto es justamente quien evita que las demás se pierdan en el camino. Es el contrapeso que asegura que la prioridad número 7 u 8 también esté presente en las decisiones de diseño, aunque nadie más la esté mencionando en las reuniones.

El arquitecto es responsable de:

- Verificar que la solución sea coherente con la estrategia AI First sin sacrificar las demás.
- Asegurar que las prioridades organizacionales no se pierdan en las decisiones del día a día del proyecto, incluso las que quedan fuera del top 5.
- Identificar cuándo dos prioridades entran en conflicto y resolver ese conflicto basándose en el orden establecido.
- Documentar las decisiones para que el equipo entienda no solo el "qué" sino el "por qué".

Este trabajo de validación es lo que diferencia un proyecto que realmente cumple con la estrategia organizacional de uno que solo cumple con la parte visible del ranking.

## Conclusión

AI First es una prioridad estratégica, no una declaración de que la IA es lo único que importa. Ocupa una posición en la clasificación de estrategias de la organización y dice "primero pensamos en cómo la IA puede aportar valor", pero sin descartar las demás estrategias que también son importantes.

Para que funcione, hay que mantener coherencia entre el nivel organizacional y el nivel de proyecto, y tener presente que los equipos tenderán naturalmente a enfocarse en las primeras 5 prioridades del ranking. Por eso necesitamos a alguien, típicamente el arquitecto de software, validando que cada decisión cumpla con el marco completo y no solo con la parte más visible.

Si tu organización está pensando en adoptar AI First, no lo trates como un proyecto aparte ni como una bandera para ondear. Trátalo como lo que es: una prioridad más en un conjunto cuidadosamente clasificado de estrategias que, en conjunto, definen cómo tu equipo construye soluciones.

Porque al final, una buena arquitectura no se trata de elegir una estrategia ganadora. Se trata de hacer que todas convivan en armonía, con un orden claro cuando llega el momento de decidir.

Espero sinceramente que este post evite futuras discusiones sin sentido en las redes sociales como "AI First vs Data First" o "AI First vs Security First".