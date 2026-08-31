# EdgeShield: On-Device Vision Browser Agent 🛡️⚡

> **Smart India Hackathon 2026 Idea Submission (Problem Statement ID: SIH26171)**  
> **Team:** Redactron | **Theme:** Smart Automation | **Category:** Software  

---

## 📌 Executive Summary
**EdgeShield** is a privacy-preserving visual perception browser extension agent. It solves the critical privacy loophole of existing cloud-based web agents (which transmit raw screen pixels and unmasked credentials to remote foundation models). EdgeShield enforces an architectural **Zero-Data-Egress boundary** by performing instant DOM input masking and local visual PII redaction (faces, cards, credentials) directly on client hardware via **WebGPU**, dispatching only sanitized perceptual tokens to remote Vision-Language Models (VLMs).

---

## 🏗️ System Architecture
```
[ Browser Tab DOM ] 
        │
        ▼ (Sub-5ms Synchronous DOM Filter)
[ On-Device WebGPU Shield ] ──(Transformers.js / MediaPipe Vision)
        │
        ▼ (Sanitized Perceptual Tokens • ZERO PII)
[ Cloud Multi-Modal VLM ] ──(High-Level Action Reasoning)
        │
        ▼ (Verified Structured JSON Action)
[ Local Execution Loop ] ──(Executes Clicks/Types Directly on DOM)
```

---

## 🚀 Key Architectural Pillars
1. **Client-Side Secure Boundary:** Manifest V3 extension runs local neural networks via `@huggingface/transformers` and `onnxruntime-web` with hardware WebGPU acceleration.
2. **Hybrid Redaction Engine:**
   - **DOM-First Heuristics (~75–80% of PII):** Synchronously sanitizes `<input type="password">`, credit card fields, and ARIA attributes with zero GPU overhead.
   - **On-Device Vision AI (~20–25% of PII):** Runs lightweight quantized vision models to blur profile photos, identity cards, and dynamic captchas.
3. **Optimized Latency & Zero-Hosting:** Client-side compute eliminates backend GPU server costs, ensuring scalable deployment for enterprise and government portals.

---

## 📂 Project Structure
```text
├── manifest.json            # Chrome Manifest V3 extension configuration
├── package.json             # Project dependencies (Transformers.js, WebGPU, MediaPipe)
├── tsconfig.json            # TypeScript configuration
├── src/
│   ├── background.ts        # Service worker managing WebGPU inference & cloud messaging
│   ├── content.ts           # DOM mutation observer & instant input masking
│   ├── vision/
│   │   ├── detector.ts      # On-device visual PII / face redaction pipeline
│   │   └── webgpu_runner.ts # ONNX Runtime Web / Transformers.js WebGPU execution
│   └── types/
│       └── actions.ts       # Structured JSON Action Schema for Cloud VLM
└── README.md
```

---

## 🛠️ Quickstart & Setup

### Prerequisites
- Node.js >= 18.0.0
- Chrome / Chromium browser with WebGPU enabled (`chrome://gpu`)

### Installation
```bash
# Clone the repository
git clone https://github.com/gitwhisperer/edgeshield.git
cd edgeshield

# Install dependencies
npm install

# Build the Manifest V3 extension
npm run build
```

### Loading in Browser
1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** (toggle in top-right corner).
3. Click **Load unpacked** and select the `dist/` folder.

---

## 📄 License
MIT License. Developed for Smart India Hackathon 2026 by **Team Redactron**.
