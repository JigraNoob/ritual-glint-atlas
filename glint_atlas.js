// In glint_atlas.js or a separate firebase-init.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

initializeApp(firebaseConfig);

async function invokeGemini() {
  const prompt = document.getElementById("seer-prompt").value;
  const responseBox = document.getElementById("seer-response");

  responseBox.innerHTML = "<em>The Seer listens...</em>";

  try {
    const res = await fetch("/askGemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    responseBox.innerHTML = `<div class="seer-utterance">🜂 ${data.text}</div>`;
  } catch (err) {
    responseBox.innerHTML = `<div class="seer-utterance error">⚠ The veil trembled. No response arrived.</div>`;
  }
}
