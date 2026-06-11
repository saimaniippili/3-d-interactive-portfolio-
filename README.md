# Interactive 3D Developer Portfolio

This is a premium, client-side developer portfolio showcasing core expertise in Generative AI development, local LLM architectures, RAG pipelines, full-stack software engineering, and AWS cloud administration.

---

## Technical Stack and Competencies

### Programming Languages
<span style="background-color: #3776AB; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">Python</span>
<span style="background-color: #3178C6; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">TypeScript</span>
<span style="background-color: #F7DF1E; color: black; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">JavaScript</span>
<span style="background-color: #E34F26; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">HTML5</span>
<span style="background-color: #1572B6; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">CSS3</span>
<span style="background-color: #00758F; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">SQL</span>

### GenAI, Machine Learning, and Big Data
<span style="background-color: #121212; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">LangChain</span>
<span style="background-color: #D22B2B; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">Ollama</span>
<span style="background-color: #10B981; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">RAG Pipelines</span>
<span style="background-color: #8B5CF6; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">NLP</span>
<span style="background-color: #F7931E; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">Scikit-Learn</span>
<span style="background-color: #150458; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">Pandas</span>
<span style="background-color: #013243; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">NumPy</span>
<span style="background-color: #2D3748; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">Feature Engineering</span>

### Cloud, DevOps, and Database Systems
<span style="background-color: #FF9900; color: black; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">AWS (Cloud Practitioner)</span>
<span style="background-color: #FCC624; color: black; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">Linux</span>
<span style="background-color: #F05032; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">Git</span>
<span style="background-color: #4DB33D; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">MongoDB</span>
<span style="background-color: #4479A1; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">MySQL</span>

### Web Frameworks and Backend API Architectures
<span style="background-color: #61DAFB; color: black; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">React</span>
<span style="background-color: #339933; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">Node.js</span>
<span style="background-color: #000000; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">Flask</span>
<span style="background-color: #092E20; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">Django</span>
<span style="background-color: #6DB33F; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">Spring Boot</span>
<span style="background-color: #4B8BBE; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">REST APIs</span>

---

## Core Portfolio Projects

### DataChat: Conversational Data Analysis Tool
* Built a full-stack web application enabling natural language querying of CSV/Excel datasets using LangChain agents integrated with local LLMs (Llama3, Mistral, Gemma) via Ollama.
* Implemented a conversational chat interface with dynamic chart generation, supporting multi-model selection (2B to 8B parameter models) and real-time data analysis.
* Designed modular LangChain tool architecture connecting LLM inference to Pandas operations, enabling complex queries without SQL or code.
* Stack tags: Python, LangChain, Ollama, Pandas, JavaScript, HTML, CSS, REST API

### MedSage: AI Healthcare Chatbot with RAG
* Developed a clinical triage application utilizing a RAG pipeline over local medical knowledge bases, delivering structured reports with severity assessments, conditions, and care recommendations.
* Integrated local LLMs with a Flask REST backend and React frontend, supporting dynamic model switching and PDF export of reports.
* Designed for complete on-device inference with no data leaving the user's machine, ensuring patient privacy compliance.
* Stack tags: Python, Flask, LangChain, RAG, Ollama, React, Node.js, PDF Export

### Fake Job Detection Pipeline
* Built an NLP machine learning pipeline trained on 17K records using TF-IDF + Random Forest to detect fraudulent job postings with 90% accuracy.
* Handled class imbalance using SMOTE, evaluated metrics, and visualized patterns with Seaborn.
* Stack tags: Python, TF-IDF, Random Forest, SMOTE, Scikit-learn, Pandas, Seaborn

---

## Interactive Playground Features

The portfolio contains customized mock deployment playgrounds representing real-world capabilities:

### RAG Retrieval Inspector
Steps users through the inner workings of retrieval: Ingestion, Vector Lookup, Prompt Augmentation, and LLM Generation. Displays similarity scores and retrieved PDF sources.

### Local LLM Performance Benchmark
Toggles a comparative performance panel comparing throughput (tokens/second), memory footprint (GB), and relative accuracy scores for active models.

### AWS Cloud Network Map
Renders an SVG-connected network layout of a secure VPC. Toggling simulation triggers progress animation flows and outputs terminal logs representing CloudFront evaluations, private subnet routing, database queries, and indexing metrics.

---

## Demo Video

A screen recording demonstrating the interactive features of the 3D portfolio, including the dynamic mascots carousel, the admin control panel, and the interactive playgrounds (RAG, LLM Benchmarks, AWS VPC Topology):


https://github.com/user-attachments/assets/8c54f2aa-d1d5-43c7-b63c-7c4d05e0c375




---

## Local Setup and Installation

Prerequisites: Node.js (version 18 or above).

1. Clone the repository:
```bash
git clone https://github.com/saimaniippili/3-d-interactive-portfolio-.git
cd 3-d-interactive-portfolio-
```

2. Install dependencies:
```bash
npm install
```

3. Run the local development server:
```bash
npm run dev
```

4. Build the application for production:
```bash
npm run build
```
