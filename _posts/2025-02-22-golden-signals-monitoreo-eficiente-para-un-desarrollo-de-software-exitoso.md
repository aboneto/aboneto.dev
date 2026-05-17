---
layout: post
title: "Golden Signals: monitoreo eficiente para un desarrollo de software exitoso"
date: 2025-02-22
categories: [DevOps, Golden Signals, Metrics, Software Engineering, Monitoring]
tags: [DevOps, Golden Signals, Metrics, Software Engineering, Monitoring]
excerpt: "Las Golden Signals son cuatro métricas básicas esenciales para el monitoreo de nuestro sistema. Con ellas, podemos detectar posibles…"
image: /assets/img/golden-signals.webp
---


Las **Golden Signals** son cuatro métricas básicas esenciales para el monitoreo de nuestro sistema. Con ellas, podemos detectar posibles problemas en nuestro sistema con mayor facilidad, reduciendo los tiempos de depuración y análisis por parte del equipo de soporte de su organización.

En lo personal, siento una gran afinidad por las métricas Golden Signals, ya que me han sido de gran ayuda en mi trabajo durante los últimos años, tanto como Software Engineer como Engineering Manager. Con una simple mirada en el dashboard, puedo evaluar la salud y el rendimiento de mi servicio, sin perder tiempo con multiples dashboards, queries o herramientas. Además, me brindan la seguridad de que los cambios que realizo en mi código no tendrán un impacto negativo en los clientes, lo que facilita considerablemente la adopción de la [Continuous Delivery](https://aws.amazon.com/es/devops/continuous-delivery/#:~:text=Continuous%20delivery%20automates%20the%20entire,is%20triggered%20by%20the%20developer.) (Entrega Continua).

![](/assets/img/golden-signals.webp)

### Las cuatro Golden Signals

#### Traffic (Transito)

Son la cantidad de solicitudes que llegan a su sistema. En servicios web, normalmente medimos la cantidad de HTTP requests por segundo. En otros servicios, se mide la cantidad de transacciones ejecutadas por segundo.

#### Errors (Errores)

Son la cantidad de errores en su sistema, normalmente diferenciados por tipo. En servicios web, tenemos los distintos HTTP status. En otros servicios, podemos proporcionar una descripción más detallada del error, eso nos ayuda a ser más eficientes en la depuración.

HTTP Status:

*   [500](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500): error interno del servidor
*   [502](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502): conexión incorrecta
*   [503](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503): servicio temporalmente indisponible
*   [504](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504): timeout en la conexión
*   [400](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400): request incorrecto
*   [401](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401): no autorizado
*   [403](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403): sin permisos
*   404: no encontrado
*   [409](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409): inconsistencia en la solicitud, puede ocurrir cuando intentamos responder una solicitud que el cliente ya desistió

#### Latency (Latencia)

La latencia, o tiempo de respuesta de una solicitud, se mide desde que se recibe la petición hasta que se envía la respuesta. Es crucial diferenciar los tiempos de respuesta de las solicitudes exitosas y fallidas. Mezclar ambos tipos de solicitudes puede contaminar las métricas y dificultar la identificación de problemas.

#### Saturation (Saturación)

Esta métrica mide el nivel de saturación de los recursos operativos del sistema, es decir, cuán cerca estamos de alcanzar el límite. Por ejemplo: en uso de CPU, memoria, almacenamiento, operaciones de I/O (de entrada y salida) en el disco duro y network (red).

### Alertas

Estas métricas nos ayudan a evaluar la salud y el rendimiento de nuestro sistema, sin embargo, su utilidad queda limitada si no se monitorea continuamente. Para evitar la necesidad de personal vigilando monitores las 24 horas del día, podemos utilizar tecnología para crear alertas basadas en reglas y umbrales, lo que permite un monitoreo más eficiente. Las notificaciones se activan cuando se cumplen las reglas y se superan los umbrales preestablecidos.

### Dashboard (Panel de Control)

![](/assets/img/golden-signals-dashboard.webp)

Es fundamental que las cuatro métricas se visualicen en un mismo dashboard, para facilitar la identificación de problemas por parte de los desarrolladores y equipo de soporte, evitando la pérdida de tiempo al navegar entre dashboards y herramientas de monitoreo buscando cada métrica por separado.

También es crucial que tenga visibilidad de todos los servicios de su sistema. Si cuenta con bases de datos, workers, Kafka o microservicios, debe disponer de un dashboard para cada uno de ellos. Siguiendo este mismo principio, como mínimo, debe incluir las métricas de Golden Signals.

## Conclusión

¿Qué organización no ha experimentado discusiones intensas entre desarrolladores y DevOps sobre la causa de un fallo que afecta al cliente final? ¿Qué ingeniero de software no ha perdido tiempo intentando identificar un error de origen desconocido? Para eso, y para otras cosas, están las métricas de las métricas Golden Signals, herramientas clave para detectar el origen del problema. Su implementación reduce considerablemente los tiempos de depuración de problemas y facilitar la adopción de [Continuous Delivery](https://aws.amazon.com/es/devops/continuous-delivery/#:~:text=Continuous%20delivery%20automates%20the%20entire,is%20triggered%20by%20the%20developer.) en un sistema, lo que ayuda a mantener el SLA de soporte bajo control.

Entonces, si estás buscando un desarrollo de software exitoso, es esencial contar al menos con las métricas Golden Signals en cada servicio de tu sistema.

## Referencias

*   [Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/) (by Google)
*   [What are golden signals?](https://www.dynatrace.com/knowledge-base/golden-signals/) (by Dynatrace)
