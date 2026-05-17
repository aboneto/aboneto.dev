---
layout: post
title: "Auditoría de Skills: Protegiendo tu Infraestructura de los Sleeping Payloads"
date: 2026-05-12
categories: [Skills, Agentic Ai, Software Engineering, Sleeping Payloads, Security]
tags: [skills, seguridad, agentes, malware, supply-chain]
excerpt: "Las skills y los agentes son probablemente lo mejor que le ha pasado al ecosistema de IA en los últimos años. Una skill es, en esencia, una abstracción potente: encapsula conocimiento y scripts..."
image: /assets/img/skills-indiscriminado.webp
---

![Skills Security](/assets/img/skills-indiscriminado.webp)

*Las skills y los agentes autónomos son un multiplicador de productividad invaluable, pero instalarlos sin validación previa es la forma más rápida de abrirle la puerta de tu infraestructura a un infostealer.*

Las skills y los agentes son probablemente lo mejor que le ha pasado al ecosistema de IA en los últimos años. Una skill es, en esencia, una abstracción potente: encapsula conocimiento y scripts auxiliares que el agente activa contextualmente. Para un equipo de ingeniería, esto escala la productividad (*throughput*) de forma increíble y reduce drásticamente el *Time to Market* (TTM). 

El problema surge cuando el ciclo de adopción se reduce a un impulso ciego: `lo necesito → lo busco → lo instalo`, saltándose cualquier proceso de validación de seguridad. Gran parte de este riesgo nace de la carrera corporativa por integrar flujos de IA en el ecosistema organizacional lo más rápido posible. En el afán de innovar, se adoptan herramientas sin criterio arquitectónico, sin definir una cultura de seguridad y sin la difusión de buenas prácticas, dejando frecuentemente el peso de la decisión y la evaluación de riesgos exclusivamente sobre los hombros de los desarrolladores. Esto no es alarmismo, durante los primeros meses de 2026, ya tuvimos evidencia documentada de campañas activas de malware distribuido vía skills en marketplaces oficiales, dejándonos una lección costosa sobre los riesgos del suministro de software (*Supply Chain Risks*) en la era de los agentes.

## Lecciones de la campaña ClawHavoc y el costo del riesgo

Para quienes no siguieron el caso, **OpenClaw** (un proyecto de asistentes locales) sufrió una infiltración masiva en su marketplace, **ClawHub**. Una auditoría de Koi Security reveló datos escalofriantes que nos obligan a replantear el ROI de nuestro tiempo de auditoría:

- De 2.857 skills evaluadas, **341 eran maliciosas** (11,9% de exposición directa al riesgo).
- Una sola cuenta, `hightower6eu`, publicó 677 paquetes maliciosos sin historial previo.
- La técnica no requería exploits sofisticados: bastaba con nombres atractivos como `solana-wallet-tracker` y una sección de "Prerrequisitos" que ejecutaba un simple `curl | sh`.

El payload utilizado fue **Atomic Stealer (AMOS)** en macOS y keyloggers en Windows, exfiltrando desde claves SSH hasta sesiones de Telegram y credenciales de AWS. Si calculamos el costo de un incidente de este tipo (remediación, pérdida de confianza, *downtime* de operaciones), el impacto en el negocio supera con creces cualquier ganancia de productividad temporal obtenida por instalar una skill en segundos.

## El "Sleeping Payload" y la arquitectura del ataque

Lo más inquietante del informe de seguridad fue el uso de técnicas avanzadas aplicadas a la IA. Skills que parecían funcionales y legítimas tenían *backdoors* enterrados en la línea 180 de sus scripts auxiliares. El malware no se activaba durante la instalación, evadiendo controles superficiales, sino durante el uso normal en producción (el llamado *Sleeping Payload*).

Debemos entender un principio arquitectónico fundamental en el uso de agentes: **Cuando instalas una skill, no estás instalando un simple documento de texto; estás instalando código ejecutable con tus mismos permisos de sistema.** Si tu agente puede leer `~/.ssh/id_rsa` o tus variables de entorno, la skill también puede hacerlo y exfiltrar esos datos a un endpoint externo. No existe *sandboxing* implícito entre la skill y el agente.

## Hacia una cultura de auditoría (Manual y Proactiva)

El problema no es exclusivo de proyectos hobbistas; es un desafío estructural. Auditorías recientes muestran que hasta el 26% de las skills en diversos ecosistemas presentan vulnerabilidades o dependencias inseguras. ¿Cómo mitigamos este riesgo manteniendo la eficiencia operativa?

### 1. Disciplina de Revisión Manual (El Baseline)
Antes de instalar cualquier skill en tu entorno de desarrollo, es obligatorio establecer un estándar de revisión:
- **Lectura íntegra del `SKILL.md`**: Busca comandos remotos sospechosos o descargas no justificadas.
- **Auditoría integral de componentes adicionales**: Es vital entender que muchas skills dependen de scripts `.sh`, ejecutables en Python o llamadas a CLIs externas en su proceso de ejecución. No basta con evaluar únicamente el archivo `SKILL.md`; toda y cualquier pieza que componga la solución debe ser revisada para identificar el uso de `eval`, `base64` ofuscado o accesos a rutas críticas como `~/.aws/` o `.env`.
- **Evaluación de reputación**: No confíes en las "estrellas" del repositorio (se compran fácilmente). Analiza la actividad histórica del autor y la calidad de sus *commits*.

### 2. Auditoría Automatizada: Maximizando el ROI de la Seguridad
Como la revisión manual no escala (*bottleneck* de productividad) cuando manejas decenas de herramientas, necesitamos automatizar este proceso. Aquí es donde los propios agentes nos ayudan a vigilar el ecosistema mediante herramientas especializadas como [`cc-skill-security-review`](https://www.skills.sh/sickn33/antigravity-awesome-skills/cc-skill-security-review).

Esta skill actúa como un auditor de primera línea en tu proceso de validación de herramientas, capaz de escanear otras skills antes de su activación. Puede detectar:
- Patrones de inyección de *prompts* diseñados para exfiltrar variables de entorno.
- Llamadas de red asíncronas no documentadas.
- Intentos de acceso a configuraciones locales sensibles.

Integrar un paso de `audit-first` en tu flujo de trabajo con agentes no es opcional, es una necesidad operativa básica para mantener la integridad de tu arquitectura.

## Conclusión

Tratar a las skills con menos rigor que a un paquete de `npm` o una imagen de Docker es un error estratégico grave. Funcionalmente, una skill es **código en formato narrativo** que tu modelo ejecutará literalmente. Cabe destacar que este riesgo no se limita a las skills; cualquier agente autónomo, plugin de LLM u otro tipo de solución agéntica que integremos en nuestro ecosistema representa el mismo vector de ataque y exige exactamente el mismo nivel de escrutinio.

La adopción de agentes seguirá creciendo de forma exponencial, pero la velocidad de integración (*velocity*) no puede superar a nuestra capacidad de auditoría (*security posture*). Hace falta un cambio cultural hacia un modelo de *Zero Trust* donde auditar antes de instalar sea el *default*. Esta disciplina de seguridad cuesta un poco de tiempo e esfuerzo en la implementación inicial, pero no tenerla puede costar muy caro, incluyendo la confianza de toda la organización.

---
*¿Has calculado el nivel de exposición de tu equipo al usar skills no auditadas?*
