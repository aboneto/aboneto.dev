---
layout: post
title: "Claude, Vibe Coding y la falsa promesa de la autonomía operativa"
date: 2026-03-25
categories: [Software Engineering, Software Architecture, Artificial Intelligence, Claude, Vibe Coding]
tags: [claude, vibe-coding, agentes, autonomia, sdd]
excerpt: "Se habla mucho de Vibe Coding y flujos basados en agentes con Claude, y con razón. Ya no estamos limitados al autocompletado; el objetivo…"
image: /assets/img/vibe-coding-autonomia.webp
---

![Vibe Coding](/assets/img/vibe-coding-autonomia.webp)

Se habla mucho de [_Vibe Coding_](https://en.wikipedia.org/wiki/Vibe_coding) y flujos basados en agentes con Claude, y con razón. Ya no estamos limitados al autocompletado; el objetivo hoy es que la IA tome un requerimiento, consuma el contexto del repositorio, escriba la lógica, arme los tests y levante un _Pull Request_ listo para revisión. Esa capacidad operativa existe.

El problema es el malentendido gigante que hay en la industria: creer que pagar la licencia corporativa te da independencia operativa desde el día uno. La realidad es más dura. La mayoría de las organizaciones no tienen la infraestructura ni los procesos para soportar este nivel de automatización.

La autonomía de un agente no es un _feature_ que venga incluido en la API. Exige disciplina de ingeniería, adoptar [_Spec Driven Development (SDD)_](https://en.wikipedia.org/wiki/Spec-driven_development) en serio cuando sea necesario y, sobre todo, diseñar una arquitectura de contexto bien pensada.

No alcanza con un _system prompt_ global y un buen SDD. Si tienes un sistema con varios módulos, el error de novato es meter todas las directrices en un único archivo `CLAUDE.md` en la raíz del proyecto o tener multiples skills y reglas en una única carpeta `.claude`. Si el agente va a tocar el módulo de pagos, necesita las reglas y el contexto exclusivo de facturación; no le sirve de nada tener en memoria el esquema de base de datos de otros dominios.

Podríamos modularizarlo en múltiples _skills_, pero hay un claro _trade-off_: inyectar el listado y sus descripciones penaliza la ventana de contexto. A gran escala, este _overhead_ genera un consumo ineficiente de tokens, por lo que esta estrategia solo escala bien en proyectos o repositorios más acotados.

Para que esto escale, necesitas diseñar contextos y agentes especializados. En un entorno _backend_ maduro no usas una sola instancia para todo. Tienes un orquestador que analiza el ticket y rutea, un agente aislado en su dominio que escribe la lógica, un revisor de código estricto (con reglas de performance y linters) y quizás otro dedicado solo a la documentación.

Si le inyectas todo el repositorio en cada iteración por simple flojera de segmentar, el modelo se va a perder en el ruido, va a alucinar y vas a quemar millones de tokens. Eventualmente resolverá la tarea a base de correcciones, pero el costo de la API se va a ir a las nubes tratando de que la IA adivine una arquitectura mal gestionada.

Piénsalo como cuando sumamos a un ingeniero al equipo. No le tiras un ticket de dos líneas y lo dejas solo frente a todo el código fuente. Requiere un _onboarding_, colaboración constante, empatía para entender el problema del usuario final y adaptabilidad para encajar en las convenciones de cada módulo. Pedirle automatización a la IA requiere un _onboarding_ igual de estructurado: definirle los límites de su especialidad y darle un marco donde los agentes interactúen sin pisarse.

Es un proceso muy similar a cuando implementamos una funcionalidad de IA en nuestro propio código para automatizar un proceso que requiere modificación de datos: es necesario partir con un [HITL (Human In The Loop)](https://www.ibm.com/es-es/think/topics/human-in-the-loop) más cercano. Con Claude es lo mismo, al principio, revisas cada código o _commit_ con lupa. A medida que el agente va ganando confianza, madurez y demuestra consistencia en el dominio, vas automatizando más y dándole mayor libertad.

## Conclusión

Pretender saltarse esta etapa de madurez técnica para forzar una automatización temprana es un error grave de gestión. La inteligencia artificial no viene a arreglar tu falta de arquitectura o tus malos procesos internos.

La verdadera automatización y autonomía operativa se conquistan iteración tras iteración: gestionando contextos con precisión clínica, segmentando responsabilidades en agentes especializados y exigiendo calidad absoluta en las especificaciones. No se compran con una tarjeta de crédito. Si tienes una cultura de buena ingeniería, Claude va a automatizar partes enteras de tu ciclo de desarrollo. Pero si tu configuración es un desorden, simplemente vas a terminar pagando facturas altísimas por iteraciones infinitas que pudiste evitar estructurando bien el trabajo desde el principio.

Estoy convencido de que Vibe Coding ya es un estándar. Lo aplico en mi día a día, pero con mucha responsabilidad. No estoy de acuerdo con empresas que lo aplican solamente, porque está de moda, sin al menos preocuparse con lo mínimo requerido, la seguridad y la eficiencia.
