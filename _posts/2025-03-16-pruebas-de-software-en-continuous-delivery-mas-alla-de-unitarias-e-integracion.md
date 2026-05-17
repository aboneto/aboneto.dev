---
layout: post
title: "Pruebas de software en Continuous Delivery: más allá de las pruebas unitarias y de integración"
date: 2025-03-16
categories: [Continuous Delivery, Software Engineering, Software Testing, Tecnologia, Pruebas De Software]
tags: [testing, continuous-delivery, qa, automatizacion]
excerpt: "Muchos desarrolladores aún están presos al pasado, a prácticas obsoletas de pruebas, propias de épocas donde los proyectos se enfocaban en…"
image: /assets/img/pruebas-software-cd.webp
---

![pruebas de software en continuous delivery](/assets/img/pruebas-software-cd.webp)

Muchos desarrolladores aún están presos al pasado, a prácticas obsoletas de pruebas, propias de épocas donde los proyectos se enfocaban en lanzamientos de largo plazo. En aquellos tiempos, dependíamos de profesionales de Control de Calidad (QA) para la ejecución de pruebas manuales, o de Ingenieros de Automatización de Pruebas (TAE) para la construcción de pruebas automatizadas.

Hoy en día, todas las empresas que trabajan con tecnología aspiran a implementar [Continuous Delivery (Entrega Continua)](https://en.wikipedia.org/wiki/Continuous_delivery), pero no todas están realmente preparadas para alcanzar este objetivo. La búsqueda de la Continuous Delivery ha llevado a una disminución en la presencia de profesionales de QA en las organizaciones. Los profesionales de TAE también han enfrentado desafíos, convirtiéndose en un cuello de botella para esta práctica de la Ingeniería de Software, ya que el ritmo de desarrollo suele superar la capacidad de automatización de pruebas de estos profesionales.

Para implementar con éxito la Continuous Delivery, es fundamental automatizar la mayor cantidad posible de pruebas, reduciendo la dependencia de las pruebas manuales. Para lograrlo, es crucial involucrar a todos los Ingenieros de Software en la construcción de todo tipo de pruebas, no solo las unitarias y de integración. Esto busca equilibrar la relación entre la velocidad de entrega y la calidad del software.

Cuando priorizamos la Continuous Delivery sin implementar todas las pruebas necesarias, comprometemos la calidad del software y la continuidad operativa, lo que puede generar nuevos problemas en el sistema, de forma similar a lo que ocurría cuando los equipos carecían de profesionales de QA.

Si las organizaciones desean prescindir de los profesionales de Control de Calidad (QA), deben asegurarse de que su software cuente con una cobertura adecuada de pruebas automatizadas. De lo contrario, estaríamos retrocediendo en lugar de avanzar.

## Beneficios de las pruebas de software

Las pruebas de software permiten a las organizaciones ahorrar tiempo y dinero, garantizando la estabilidad y mantenibilidad del software, asegurando que las funcionalidades operen según lo previsto y reduciendo los errores en producción. Esto, a su vez, disminuye los costos de desarrollo y soporte.

El tiempo de desarrollo de nuevas funcionalidades se reduce al contar con un conjunto de pruebas que aseguran que la nueva funcionalidad esté completa y lista para su entrega. Esto permite a los desarrolladores realizar estimaciones de plazos más precisas y reduce la probabilidad de errores. Además, se reducen los costos generales de mantenimiento y se asegura que las funcionalidades ya entregadas sigan funcionando correctamente.

## Niveles de pruebas de software

![](/assets/img/niveles-pruebas.webp)

Existen diversos niveles de pruebas de software, y cada uno complementa a los demás. Podría extenderme aquí sobre los patrones de pruebas, la pirámide de pruebas o la pirámide invertida (ice cream cone testing), pero al final, todo se reduce a la estrategia que un equipo u organización adopta para priorizar las pruebas. En mi opinión, independientemente de la estrategia, es esencial realizarlas. Por lo tanto, dejo que cada organización decida qué es lo mejor para su contexto y sus acuerdos.

Vamos a los tipos de pruebas:

### Unit testing (Pruebas unitarias)

Las pruebas unitarias son fundamentales en el desarrollo de software, ya que determinan la cobertura de código y deben ser las únicas en hacerlo. Es común que los desarrolladores incluyan otros tipos de pruebas en la cobertura, pero esto distorsiona la medición real.

En las pruebas unitarias, se verifican las entradas y salidas de unidades de código individuales. Se prueban clases o módulos de forma completamente independiente, comprobando cada línea de código y las posibles variaciones. Es fundamental incluir las excepciones y los escenarios de error en las pruebas.

También se deben considerar los componentes de la interfaz de usuario (frontend), no solo el backend. Las pruebas unitarias se ejecutan utilizando mocks, simulando todas las integraciones necesarias para aislar la unidad de código. Esto garantiza que solo se esté probando la unidad en cuestión, lo que hace que las pruebas sean más rápidas y eficientes.

Una buena práctica para mejorar la eficiencia de este tipo de pruebas es seguir los [principios SOLID](https://www.aluracursos.com/blog/solid).

### Integration testing (Pruebas de Integración)

Las pruebas de integración verifican la interacción entre dos o más módulos dentro del sistema, utilizando mocks para simular datos y comunicaciones externas.

Personalmente, considero que estas pruebas son las menos atractivas y, en algunos casos, pueden resultar redundantes dependiendo del conjunto de pruebas implementado. Las pruebas funcionales bien diseñadas pueden cubrir fácilmente los casos de prueba de integración. Las pruebas de integración se vuelven necesarias cuando se requiere probar un escenario específico no contemplado en las pruebas funcionales, o cuando se comparten módulos con aplicaciones externas.

### Functional testing (Pruebas funcionales)

Las pruebas funcionales simulan la experiencia completa del usuario y pueden confundirse fácilmente con las pruebas end-to-end debido a su similitud. La principal diferencia radica en que las pruebas funcionales se ejecutan localmente utilizando mocks, mientras que las pruebas end-to-end se realizan en un entorno real con datos reales.

En las pruebas funcionales, se verifica el correcto funcionamiento de todas las funcionalidades, casos de uso, validaciones, alertas, excepciones y cualquier otro aspecto relevante para la aplicación.

Ejemplos :

*   **Frontend:** Secuencia de pasos (clics y relleno de campos) para ejecutar la acción requerida y verificar una funcionalidad en la interfaz de usuario (UI).
*   **REST API:** Pruebas de los distintos endpoints con sus datos de entrada y respuestas, validando tanto los datos como las excepciones.
*   **Worker:** Ejecución de un job o proceso, verificando sus datos de entrada y las respuestas o cambios generados.
*   **Backend MVC:** Similar a las pruebas de REST API, pero también se verifica el renderizado de las vistas según la acción ejecutada.

Es fundamental contar con casos de uso y pruebas definidos por el equipo de producto para garantizar el correcto funcionamiento de la aplicación y establecer un conjunto mínimo de pruebas necesarias.

### End-to-end testing (Pruebas de extremo a extremo)

Las pruebas end-to-end son similares a las pruebas funcionales, pero se ejecutan en un entorno real con datos reales, generalmente en un entorno de pruebas (de staging). También es posible ejecutarlas en producción con un conjunto de pruebas controlado.

Estas pruebas son fundamentales para verificar que todos los componentes necesarios para ejecutar una funcionalidad estén correctamente configurados. Por ejemplo, pueden detectar la omisión de configurar un secreto o una variable de entorno en producción, lo que podría generar problemas para los usuarios.

### Exploratory testing (pruebas exploratorias de software)

Estas pruebas consisten en asignar tareas a usuarios para que prueben la aplicación, buscando errores, fallos de seguridad, comportamientos inesperados o casos de uso no contemplados. Algunas organizaciones incluso ofrecen recompensas a los usuarios que identifiquen problemas.

Son pruebas comunes en el área de Experiencia de Usuario (UX). Es una prueba que fomenta el aprendizaje continuo por parte del probador, son altamente adaptables y pueden utilizarse para probar cualquier tipo de software. Las pruebas exploratorias a menudo se centran en la experiencia del usuario, lo que permite descubrir problemas de usabilidad que podrían no ser evidentes en las pruebas

## Otras pruebas

### Cobertura (Coverage)

Generalmente, se ejecuta un análisis con [Sonarqube](https://www.sonarsource.com/products/sonarqube/) (o otra herramienta similar) para obtener el resultado de la cobertura de código. Si este resultado es igual o superior al umbral establecido por el equipo u organización, la prueba se considera superada. Algunas organizaciones configuran esta prueba como un requisito bloqueante para la implementación.

### Contract testing (Pruebas de contracto)

Estas pruebas tienen como objetivo garantizar la consistencia de las entradas y respuestas de una API a lo largo del ciclo de vida de un endpoint, previniendo así problemas con integraciones futuras o existentes.

Se verifican los tipos de datos y sus formatos para evitar inconsistencias.

### API Lint

Estas pruebas garantizan que nuestra API cumpla con los estándares REST u otras reglas necesarias. Esto permite que los desarrolladores trabajen bajo un estándar común, evitando problemas futuros en la integración de endpoints y facilitando la comprensión y el uso de la API.

### Performance (Rendimiento)

Son pruenas que nos ayudan a evaluar cómo se comporta un sistema o aplicación bajo una carga de trabajo específica. Su principal uso es identificar y resolver problemas de rendimiento antes de que el software se lance al público o cuando tenemos cambios considerables.

Nos ayuda a garantizar la satisfacción del usuario, a planificar la escalabilidad del sistema, prevenir fallos en producción y la optimización correcta de los recursos.

### Profiling POD testing

Estas pruebas son similares a las pruebas de rendimiento, pero su objetivo principal es medir la capacidad de recursos que requerirá un POD para satisfacer una demanda específica. Nos ayudan a definir con precisión la cantidad de CPU, memoria y la estrategia de escalabilidad de nuestros PODs.

## Conclusión

Un sistema debería tener, como mínimo, Unit testing y Functional testing para su implementación en producción. Se recomienda una cobertura de pruebas unitarias del 80% y que las funcionalidades críticas estén cubiertas por las pruebas funcionales. Sin embargo, para lograr un desarrollo de software exitoso con Continuous Delivery, es necesario maximizar la cantidad de pruebas posibles, garantizando así la calidad y la continuidad operativa del sistema.

Todos los tipos de pruebas deben ejecutarse en todos los servicios de un sistema, no solo en el frontend. Esto implica que las pruebas funcionales y end-to-end deben aplicarse también a las APIs, Workers y cualquier componente del backend. Cada parte del sistema debe ser probada para garantizar la calidad del software y la continuidad operativa, aprovechando la rapidez con la que se generan los despliegues mediante Continuous Delivery (la Entrega Continua).

## Referencias:

*   [Software testing in continuous delivery (by Atlassian)](https://www.atlassian.com/es/continuous-delivery/software-testing)
