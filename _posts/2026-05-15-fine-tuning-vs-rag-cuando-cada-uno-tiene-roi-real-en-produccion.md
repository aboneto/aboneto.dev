---
layout: post
title: "Fine-tuning vs. RAG: cuándo cada uno tiene ROI real en producción"
date: 2026-05-15
categories: [Rag, Fine Tuning, Artificial Intelligence, Return On Investment, Generative Ai Solution]
tags: [rag, fine-tuning, qwen, costos, latencia, produccion]
excerpt: "Ya vimos cómo bajar el costo de inferencia usando modelos open-weight como Qwen 3.5 en el artículo Reduciendo el costo en producción: Qwen 3.5 en AWS vs APIs Comerciales. Pero cuando tienes el costo..."
image: /assets/img/rag-vs-finetuning-roi.webp
---

![Fine-tuning vs. RAG](/assets/img/rag-vs-finetuning-roi.webp)

Ya vimos cómo bajar el costo de inferencia usando modelos open-weight como `Qwen 3.5` en el artículo [Reduciendo el costo en producción: Qwen 3.5 en AWS vs APIs Comerciales](https://aboneto.medium.com/reduciendo-el-costo-en-producci%C3%B3n-qwen-3-5-en-aws-vs-openai-c4dc8eb16ed6). Pero cuando tienes el costo base bajo control, te enfrentas a otro problema: cómo darle al modelo conocimiento específico de tu empresa. 

Aquí casi todo el mundo salta directo a RAG (Retrieval-Augmented Generation) porque el fine-tuning tiene fama de ser caro y complejo. Hoy vamos a ver por qué esa idea está desactualizada. Olvídate de los tutoriales de código por un momento. Vamos a hablar de números, latencia y el costo real de operar esto en producción.

## La trampa de hacer siempre RAG

RAG se convirtió en el estándar. Tienes un problema de conocimiento y le tiras una base de datos vectorial encima. Funciona bien, pero no es la única opción. Entrenar modelos open-weight en plataformas como [AWS SageMaker](https://aws.amazon.com/es/sagemaker/ai/) o [Google Vertex AI](ttps://docs.cloud.google.com/vertex-ai/docs/start/introduction-unified-platform?hl=es) hoy es mucho más accesible. La pregunta correcta no es cuál tecnología está de moda, sino cuál tiene sentido financiero y operativo para tu tráfico.

## Dónde se va el presupuesto

Hacer RAG significa que pagas todo el tiempo. Cada vez que cambian tus datos, tienes que generar embeddings. Pagas la base de datos vectorial todos los meses. Y el costo oculto más grande: cada request incluye miles de tokens de contexto recuperado. Eso dispara el consumo de input tokens. Si usas un modelo propietario o muy pesado, la factura a fin de mes duele.

El fine-tuning funciona diferente. Pagas el cómputo GPU por adelantado para entrenar el modelo. Luego pagas el hosting del endpoint. ¿La ventaja? Como el modelo ya memorizó la información, tus prompts son cortos. Te ahorras millones de input tokens a largo plazo. Con mucho volumen de consultas, el fine-tuning sale más barato.

## Latencia: TTFT y TPOT

Si mides el tiempo hasta el primer token (TTFT), RAG es naturalmente más lento. Tienes que vectorizar la consulta, buscar en la base de datos, extraer los chunks, armar un prompt gigante, mandarlo al LLM y esperar la respuesta. El fine-tuning se salta esos pasos, el request llega y el modelo responde directo.

Si mides los tokens por segundo (TPOT), un modelo open-weight afinado como un `Qwen 3.5` o `Qwen 3.6` escupe palabras mucho más rápido que un modelo propietario de gran tamaño conectado a un sistema RAG, como los modelos comerciales de OpenAI o Claude.

## Cuándo usar cada enfoque

Aquí tienes una guía rápida para tomar la decisión.

**Fine-tuning**: si tienes volumen y previsibilidad. Si haces clasificación masiva, generas JSONs estructurados o tienes mucho tráfico sobre un dominio de conocimiento estático, el fine-tuning gana. La baja latencia y el ahorro en tokens justifican el costo de entrenamiento. También es tu mejor opción si tienes SLAs de latencia que no soportan el retraso de una búsqueda vectorial.

**RAG**: si tus datos cambian todos los días. Si es una base de soporte al cliente que se actualiza constantemente, reentrenar el modelo a diario destruiría tu presupuesto. RAG también es obligatorio si por compliance necesitas mostrar de qué documento exacto salió la respuesta.

**Combina los dos**: si tienes los recursos. Puedes hacer fine-tuning para que el modelo aprenda sobre su empresa, su estructura interna, sus productos y su forma de comunicarse, y usar RAG solo para buscar datos dinámicos como precios o inventario. Obtienes la máxima precisión posible, aunque requiere mayor madurez en tu equipo de ingeniería.

## Cómo aplicar este modelo mental

Para llevar esta teoría a producción sin quemar el presupuesto, te recomiendo un enfoque iterativo:

1. **Mide tu baseline de RAG**: Aísla el costo de tu base de datos vectorial (Pinecone, pgvector) y suma el gasto mensual de *input tokens* que consumes por inyectar contexto.
2. **Compara contra el fierro**: Calcula el costo de levantar un endpoint dedicado en[AWS SageMaker](https://aws.amazon.com/es/sagemaker/ai/) o [Google Vertex AI](ttps://docs.cloud.google.com/vertex-ai/docs/start/introduction-unified-platform?hl=es) para un modelo open-weight como `Qwen 3.5` o `Qwen 3.6`. Si tu gasto en tokens supera el costo de la infraestructura fija, tienes el caso de negocio justificado para el fine-tuning.
3. **Mide el impacto del TTFT**: Haz pruebas de carga para medir el Time To First Token. Si tu sistema RAG actual retrasa la respuesta y afecta la retención de usuarios, el fine-tuning se vuelve una necesidad operativa, no solo financiera.
4. **Implementa un LLM Router**: Si vas por la ruta híbrida, dale al modelo una *tool* para consultar el RAG solo cuando necesite datos que no memorizó. Si la consulta es sobre conocimiento interno, responde directo. Así consigues precisión y flexibilidad, pero pagas el precio en complejidad arquitectónica. Evalúa si tu caso de uso justifica mantener ambos sistemas vivos.

## Conclusión

No asumas que RAG es la única ruta válida solo porque es la más repetida en la industria de hoy. Tampoco asumas que el fine-tuning es un lujo reservado para gigantes tecnológicos. En entornos de producción reales, la viabilidad de un sistema generativo se mide en dólares por millón de tokens y en milisegundos de latencia.

Cruza tus propios números. Compara el costo mensual de tu infraestructura vectorial y los input tokens que quemas inyectando contexto, frente al precio fijo de levantar una instancia en AWS y entrenar un modelo open-weight altamente optimizado. Es muy probable que descubras que el fine-tuning, o un enfoque híbrido impulsado por herramientas (tools), tiene mucho más sentido financiero y operativo para tu tráfico.

Si quieres profundizar en los números duros de levantar estos modelos en la nube, revisa el análisis de [Qwen 3.5 en AWS vs APIs Comerciales](https://aboneto.medium.com/reduciendo-el-costo-en-producci%C3%B3n-qwen-3-5-en-aws-vs-openai-c4dc8eb16ed6) y empieza a optimizar tu arquitectura hoy mismo.
