# 🎨 SketchAlign 🚀

> **Welcome to SketchAlign! Your magical drawing buddy!** ✨
> Draw cool sketches, add your favorite reference images, and align them like magic to create your next drawing masterpiece! 🦖🦄🎨

---

## 🌟 What is SketchAlign?

SketchAlign (or *Drawalign*) is a super fun, interactive, and colorful drawing assistant application built with **React**, **Vite**, **TypeScript**, and **Konva.js**. Whether you are a little artist just starting to trace shapes, or a seasoned doodler matching dimensions, SketchAlign helps you overlay, zoom, flip, rotate, and align reference photos right over your locked canvas sheet. 

It is designed to be **cartoonish, vibrant, child-friendly, and simple to use!** 🧸

---

## 🚀 Magical Features

* **🎨 Double Upload Trays:** Drag and drop your locked paper sketches and your colorful reference pictures side-by-side!
* **✨ Magic Tracing Glass (Opacity Slider):** Fade the reference image in and out to comfortably draw and inspect details.
* **🌀 Spin & Scale:** Twist, zoom, stretch, and position your drawing helper directly on the canvas with touch-friendly handles.
* **🏁 Colorful Grid Guides:** Turn on the starry background grid with adjustable sizing to count blocks and measure symmetry.
* **🔮 Time Machine (Undo/Redo):** Made a mistake? Don't worry! Travel back and forth in time with full undo/redo stacks.
* **🌈 Magical Themes:** Toggle between bright sunshine (Light Mode) and starry night (Dark Mode) settings.
* **💾 Export Masterpieces:** Export your alignment compositing in high-resolution PNG with one simple click.

---

## 🎮 How to Play (Run Locally)

Ask your parent or developer buddy to open their terminal and run:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Launch the magic:**
   ```bash
   npm run dev
   ```

3. **Visit in your browser:**
   Open the address shown in the terminal (usually `http://localhost:5173`) and start drawing!

---

## ⌨️ Secret Keyboard Power-ups

Use these quick shortcut keys to control the canvas like a wizard:

| Key | Magic Power |
| :--- | :--- |
| **`Delete` / `Backspace`** | Poof! Erases the reference image from the screen. |
| **`Ctrl` + `Z`** | Time travel back (Undo). |
| **`Ctrl` + `Y` / `Ctrl` + `Shift` + `Z`** | Time travel forward (Redo). |
| **`+` / `=`** | Zoom in closer. |
| **`-`** | Zoom out further. |
| **`Mouse Wheel`** | Focus zoom in/out wherever your mouse pointer is looking. |
| **`Drag Canvas`** | Click and hold the dark canvas background to pan around. |

---

## 📂 Inside the Treasure Chest

Here is where the magical code files reside:

```text
src/
├── components/         # Reusable panels and toggles
├── features/
│   ├── alignment/      # AI alignment tips & roadmap
│   ├── canvas/         # Interactive Konva drawing canvas
│   └── upload/         # Drag-and-drop file readers
├── hooks/              # Custom dimensions & image loaders
├── pages/              # Main landing and workspace views
├── store/              # Zustand state engine & history
├── types/              # TypeScript declarations
└── utils/              # Calculation helpers & image math
```

*Have fun drawing, and keep shining!* 🌟🎨✨