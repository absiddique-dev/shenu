"use client";

import { useState, useRef, useEffect } from "react";
import ShenuUI from "./components/ShenuUI";

export default function ShenuAgent() {
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const recognitionRef = useRef(null);
  const processingRef = useRef(false);
  const listeningRef = useRef(false); // mirror of state, safe inside closures
  const speakingRef = useRef(false);
  const manualStopRef = useRef(false); // true when user explicitly stops
  const voicesRef = useRef([]);

  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const createRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported");
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "hi-IN";

    recognition.onresult = async (event) => {
      if (processingRef.current || speakingRef.current) return;

      const result = event.results[event.results.length - 1];
      if (!result.isFinal) return;

      const text = result[0].transcript.trim();
      if (!text) return;

      console.log("User:", text);

      processingRef.current = true;
      try {
        await handleMessage(text);
      } finally {
        processingRef.current = false;
      }
    };

    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e.error);
      // 'no-speech' / 'aborted' are recoverable; let onend handle restart
    };

    recognition.onend = () => {
      // Only auto-restart if user hasn't manually stopped and we're not mid-speech
      if (
        !manualStopRef.current &&
        listeningRef.current &&
        !speakingRef.current
      ) {
        try {
          recognition.start();
        } catch (e) {
          console.error("Restart failed:", e);
        }
      }
    };

    return recognition;
  };

  const startListening = () => {
    manualStopRef.current = false;
    const recognition = createRecognition();
    if (!recognition) return;

    recognition.start();
    recognitionRef.current = recognition;

    listeningRef.current = true;
    setListening(true);
  };

  const stopListening = () => {
    manualStopRef.current = true;
    recognitionRef.current?.stop();
    recognitionRef.current = null;

    listeningRef.current = false;
    setListening(false);
  };

  const handleMessage = async (text) => {
    try {
      const res = await fetch("/api/shenu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      await speak(data.reply);
      switch (data.action) {
        case "open_youtube":
          window.open("https://youtube.com", "_blank");
          break;
        case "open_whatsapp":
          window.open("https://web.whatsapp.com", "_blank");
          break;
        case "search_google":
          window.open(
            `https://www.google.com/search?q=${encodeURIComponent(text)}`,
            "_blank",
          );
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Pauses recognition while TTS speaks, resumes after. Returns a Promise
  // that resolves only when speech actually finishes.
  const speak = (text) => {
    return new Promise((resolve) => {
      if (!text) return resolve();

      // Pause mic while AI talks to avoid it transcribing itself
      speakingRef.current = true;
      setSpeaking(true);
      recognitionRef.current?.stop();

      window.speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(text);
      const voices = voicesRef.current.length
        ? voicesRef.current
        : window.speechSynthesis.getVoices();

      const voice =
        voices.find((v) => v.name === "Google हिन्दी") ||
        voices.find((v) => v.name === "Lekha") ||
        voices.find((v) => v.name === "Piya") ||
        voices[0];

      speech.voice = voice;
      speech.rate = 0.95;
      speech.pitch = 1.15;
      speech.volume = 1;

      const finishUp = () => {
        speakingRef.current = false;
        setSpeaking(false);

        // Resume listening if user hasn't stopped it
        if (listeningRef.current && !manualStopRef.current) {
          const recognition = createRecognition();
          if (recognition) {
            recognition.start();
            recognitionRef.current = recognition;
          }
        }
        resolve();
      };

      speech.onend = finishUp;
      speech.onerror = finishUp;

      window.speechSynthesis.speak(speech);
    });
  };

  return (
    <div className="p-4">
      <ShenuUI
        listening={listening}
        speaking={speaking}
        startListening={startListening}
        stopListening={stopListening}
      />
    </div>
  );
}
