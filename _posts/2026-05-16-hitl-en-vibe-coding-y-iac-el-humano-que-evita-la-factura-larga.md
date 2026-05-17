---
layout: post
title: "HITL en Vibe Coding e IaC: evita la factura larga"
date: 2026-05-16
categories: [Human In The Loop, Vibe Coding, Iac, Llm Engineering, Artificial Intelligence]
tags: [hitl, vibe-coding, iac, terraform, sdd, agentes]
excerpt: "En 2026 el discurso corporativo va casi todo en una sola dirección: agentes autónomos, full automation, self-healing pipelines. La promesa es seductora porque vende. La realidad operativa es que casi..."
image: /assets/img/hitl-vibe-coding-iac.webp
---

![HITL en Vibe Coding e IaC: evita la factura larga](/assets/img/hitl-vibe-coding-iac.webp)

*La IA generativa ya escribe specs, código y pipelines completos. Quitar al humano del proceso no te da velocidad: te da tokens quemados, drift en producción y noches de oncall que podrías haber evitado con un único checkpoint bien colocado.*

En 2026 el discurso corporativo va casi todo en una sola dirección: agentes autónomos, *full automation*, *self-healing pipelines*. La promesa es seductora porque vende. La realidad operativa es que casi ningún equipo está listo para ejecutar esa promesa sin un humano validando los puntos críticos del flujo.

Ya escribí antes sobre la [falsa promesa de la autonomía operativa](https://medium.com/@aboneto/claude-vibe-coding-y-la-falsa-promesa-de-la-autonom%C3%ADa-comprada-3824adc1a762). Ese post diagnosticaba el problema. Este es la versión prescriptiva: dónde poner el HITL (Human In The Loop), qué validar en cada gate y por qué saltarse esa disciplina se paga en tokens, en MTTR y en horas de retrabajo.

## El HITL no es freno, es multiplicador

Hay una confusión muy instalada en equipos que recién están explorando flujos agénticos: pensar que HITL significa "el humano revisa todo" o "el humano frena a la IA". Ninguna de las dos cosas escala.

HITL bien diseñado funciona como un *gate* en transiciones críticas de estado. La IA sugiere, propone, optimiza, detecta typos que el ojo humano deja pasar. El humano aprueba el paso de una etapa a la siguiente cuando ese paso es costoso de revertir. Es la misma lógica que aplicamos en CI/CD desde hace años: no bloqueas cada commit, bloqueas el merge a `main` y el deploy a producción.

Aplicado a flujos con IA, los dos lugares donde el gate paga su costo con creces son la definición de specs en Vibe Coding y el camino de IaC hacia producción.

## HITL en Vibe Coding: el gate está en el SDD, no en el código

Cuando un agente entrega un *Pull Request* mediocre, el reflejo natural es revisar el código línea por línea. Es tarde. El error casi nunca está en el código; está en la spec o prompt que generó ese código.

[Spec Driven Development (SDD)](https://en.wikipedia.org/wiki/Spec-driven_development) le da estructura al agente: requirements (Requerimientos), scenarios (Escenarios), design decisions (Decisiones de Diseño), tasks (Tareas). Sin esa estructura, el agente alucina interfaces, inventa contratos y mezcla dominios. Con esa estructura, el agente avanza con menos ruido y más predictibilidad.

El problema es que una spec mal definida es radioactiva. El agente la va a interpretar literalmente y va a generar 800 líneas de código que cumplen al pie de la letra algo que no era lo que querías. Después vienen las correcciones, los re-prompts, los rollbacks parciales. Cada iteración consume contexto completo del repo, specs intermedias y el historial de la conversación.

Una estimación conservadora basada en proyectos reales: una *feature* mediana arrancada con una spec floja suele requerir entre 3 y 5 iteraciones extras de corrección, cada una consumiendo entre 30k y 80k tokens. Eso es entre 100k y 400k tokens quemados que no aportaron valor, solo deshicieron una decisión que se tomó mal al inicio.

El HITL en SDD es barato comparado con eso. Diez minutos revisando que el spec describe el problema correcto, que los scenarios cubren los edge cases que conoces y que las decisions reflejan el stack real del proyecto. Ese gate evita que el agente genere medio sistema sobre una premisa equivocada.

### Los frameworks SDD no son magia

Aquí hay un punto que se está pasando por alto en muchos equipos: adoptar un framework SDD como [OpenSpec](https://github.com/Fission-AI/OpenSpec) o [SpecKit](https://github.com/github/spec-kit) no resuelve el problema solo por instalarlo. El framework te da el esqueleto: estructura de carpetas, tipos de artefactos, flujo de ejecución, hooks. Lo que no te da es contexto del dominio, reglas de tu organización ni convenciones de tu stack.

Si dejas el framework en su configuración por defecto, el agente sigue alucinando. No alucina menos por usar OpenSpec; aluciana distinto. Va a inventar bibliotecas, va a sugerir patrones de microservicios donde tu proyecto es un monolito modular, va a proponer arquitecturas event-driven cuando tu equipo de cinco personas no las opera bien.

Personalizar el framework es trabajo de ingeniería: glosario de dominio inyectado en el contexto, reglas de codificación del proyecto, restricciones del stack (versiones de runtime, bases de datos permitidas, libraries vetadas), naming conventions, criterios de testing. Esa capa es la que convierte un framework genérico en algo que reduce alucinaciones de verdad.

El HITL convive con todo esto. El humano valida que el framework esté bien configurado, que las reglas se mantienen al día y que cada spec generada respeta esas reglas antes de que el agente baje a implementación. Sin esa validación, el framework solo le da apariencia de rigor a un flujo que sigue siendo caótico.

## HITL en IaC y GitOps: el gate va antes del apply, no después

En infraestructura, la tentación de dejar a la IA ejecutar por CLI directo es alta. Hay agentes que pueden correr `terraform plan`, `terraform apply`, `kubectl apply`, `gh workflow run`. Funcionan. El problema es que el costo de un error en infra no se mide en re-prompts, se mide en outages.

Un caso real que se repite: un agente genera un cambio en Terraform donde un `for_each` recibe un mapa con keys distintas a las del state. Para el ojo humano sin contexto suficiente, el diff se ve razonable. El `plan` muestra "5 to add, 5 to destroy". Si nadie revisa ese plan con criterio, el `apply` borra cinco recursos productivos y los recrea con IDs nuevos. Endpoints rotos, *downtime* medido en minutos en el mejor caso y en horas si depende de DNS o de cosas que se replican lento.

El HITL en IaC no significa que un humano apruebe cada `terraform apply`. Eso fricciona demasiado y termina en *rubber stamping*, que es peor que no tener gate. El HITL útil está en dos puntos concretos:

- **Pull Request review** antes del merge, con el `plan` adjunto en el PR (estilo Atlantis, Terraform Cloud o Argo CD con preview). El humano lee el plan y aprueba el cambio cuando entiende qué se va a tocar.
- **Promotion gate** entre ambientes (staging → prod), donde un humano confirma que lo aplicado en staging se comportó como se esperaba antes de propagar a prod.

Lo que la IA aporta en este flujo es valioso y específico: detecta errores de tipado, valida que el código compile, sugiere optimizaciones de módulos, compara el diff contra el state, anota riesgos potenciales en el PR. Es trabajo que un humano hace lento y mal porque es repetitivo. La IA lo hace rápido y consistente.

Una estimación basada en equipos que adoptaron este modelo: gating el merge y la promotion con HITL reduce incidentes graves atribuibles a cambios de infra entre un 30 y un 50%. No elimina los incidentes, pero los empuja a categorías menos costosas y deja el MTTR mucho más sano porque el rollback se decide con contexto, no en pánico.

## Checklist de gates: dónde poner al humano

Resumen accionable, pensado para equipos que recién están armando su flujo con agentes:

- **Gate 1, Spec aprobada**: antes de que el agente genere una sola línea de código, un humano valida que el spec describe el problema correcto, los escenarios cubren los edge cases conocidos y las decisions reflejan el stack real.
- **Gate 2, Framework SDD configurado**: revisar periódicamente que las reglas, glosarios y restricciones del framework estén al día con la evolución del proyecto. Los frameworks no se autoadministran.
- **Gate 3, PR review con plan visible**: en IaC, ningún merge a `main` sin que el `terraform plan` (o equivalente) esté en el PR (pipeline ejecutado) y haya sido leído por un humano que entienda qué recursos toca.
- **Gate 4, Promotion entre ambientes**: el paso staging hacia prod requiere confirmación humana, idealmente con métricas de staging adjuntas. Apply automático en prod sin validación previa de staging es deuda técnica disfrazada de velocidad.
- **Gate 5, Auditoría de output del agente**: spot-check periódico de los PRs aprobados por agentes para detectar drift en calidad antes de que se vuelva sistémico.

## Conclusión

La conversación interesante en 2026 ya no es si usar IA en el ciclo de desarrollo, sino dónde dejarla decidir sola y dónde forzar un humano en el medio. Los equipos que están sacando ROI real lo entendieron: HITL no es resistencia al cambio, es disciplina de ingeniería aplicada al nuevo stack.

Saltarse esa disciplina por entusiasmo o por presión de un roadmap agresivo es barato al principio y caro al final. La factura llega en forma de tokens consumidos, incidentes de producción y confianza erosionada con el negocio. Poner los gates correctos cuesta menos que cualquiera de esas tres cosas.

La IA es un multiplicador brutal cuando opera dentro de un marco que le definimos nosotros. Sin ese marco, el multiplicador funciona igual de bien para el caos.
