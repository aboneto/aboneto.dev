---
layout: post
title: "RAG no es la respuesta a todo: cuándo no usar IA"
date: 2026-03-01
categories: [ia, practicas]
tags: [rag, ia, decision-framework]
excerpt: "La presión por incluir IA en el roadmap está produciendo soluciones en busca de problema. Una checklist honesta."
reading_time: 10
image: rag
---

Todos quieren RAG. Nadie pregunta si lo necesitan. El resultado: sistemas de búsqueda que funcionan peor que un `grep` bien hecho, pero con más latency y costo.

## Checklist: ¿realmente necesitas RAG?

Antes de implementar RAG, responde estas preguntas:

1. ¿Tu corpus de documentos cambia frecuentemente?
2. ¿Las preguntas de los usuarios requieren síntesis de múltiples fuentes?
3. ¿Un keyword search simple no resuelve el 80% de los casos?
4. ¿Tienes la infraestructura para evaluar la calidad de las respuestas?

Si respondiste "no" a cualquiera de estas, probablemente no necesitas RAG. Necesitas un buen search engine.

## El problema del embedding dump

El patrón más común de RAG es: chunk documentos → generar embeddings → buscar por similaridad → pasar contexto al LLM. El problema es que **la similaridad semántica no es relevancia**.

"El microservicio de pagos falló" y "El microservicio de pagos escaló correctamente" son semánticamente similares pero conceptualmente opuestos.

> La mejor IA es la que no se nota. Si tu solución con IA es más complicada que la alternativa sin IA, estás resolviendo el problema equivocado.
