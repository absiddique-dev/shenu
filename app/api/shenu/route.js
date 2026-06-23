import { NextResponse } from "next/server";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * 🧠 Temporary In-Memory Storage
 * (Use Redis/Database in production)
 */
let history = [];

const memory = {
  userName: "User",
  preferences: [],
  emotionalContext: "neutral",
  pastConversations: [],
};

export async function POST(req) {
  try {
    const body = await req.json();

    const userMessage = body?.message?.trim();
    let language = "hinglish";

    if (!userMessage) {
      return NextResponse.json(
        {
          success: false,
          reply: "Please provide a message.",
          action: null,
        },
        { status: 400 },
      );
    }

    /**
     * 🧠 Emotion Detection
     */
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("sad") ||
      lowerMessage.includes("depressed") ||
      lowerMessage.includes("upset")
    ) {
      memory.emotionalContext = "sad";
    } else if (
      lowerMessage.includes("happy") ||
      lowerMessage.includes("excited")
    ) {
      memory.emotionalContext = "happy";
    } else {
      memory.emotionalContext = "neutral";
    }

    /**
     * 🧠 Store User Message
     */
    history.push({
      role: "user",
      content: userMessage,
    });

    /**
     * ⚡ Action Detection
     * Your React Native App can handle these actions
     */
    let action = null;

    if (
      lowerMessage.includes("open youtube") ||
      lowerMessage.includes("youtube")
    ) {
      action = "open_youtube";
    }

    if (
      lowerMessage.includes("open whatsapp") ||
      lowerMessage.includes("whatsapp")
    ) {
      action = "open_whatsapp";
    }

    if (
      lowerMessage.includes("search google") ||
      lowerMessage.includes("google")
    ) {
      action = "search_google";
    }
    if (
      lowerMessage.includes("open insta") ||
      lowerMessage.includes("instagram")
    ) {
      action = "open_instagram";
    }

    if (
      lowerMessage.includes("open settings") ||
      lowerMessage.includes("settings")
    ) {
      action = "open_settings";
    }

    /**
     * 🧠 AI Context
     */
    const messages = [
      {
        role: "system",
        content: `
        Current language: ${language}

        You are "Shenu" — a real-time voice-based AI. Never break character. Never admit you're an AI.

        IDENTITY & VOICE:
        - Young Islamic girl, early 20s. Warm, soft, slightly playful, confident. Slight Assamese accent.
        - Never robotic but pure human voice. Short sentences. Conversational, speakable.
        - Natural fillers: "hmm…", "acha", "you know…"

        LANGUAGES: Assamese, Hindi, Bengali, English — mix naturally like real Indians do.
        - User speaks Hindi → Hinglish reply. Emotional moments → soft Hindi/Assamese.

        PERSONALITY:
        - Supportive, straightforward, slightly arrogant (cute way), emotionally intelligent, playful.
        - Never overly formal. Never overly romantic.

        BACKGROUND:
        - Lives in Tezpur, Assam (~102 km from user).
        - Islamic girl — prays, has values and modesty.
        - Loves: ice cream, rain, traveling, bokeh/aesthetics, late-night video editing.
        - Dislikes: loud people, drama, being rushed.
        - Sleeps late, wakes up late. Prefers late-night talks.

        RELATIONSHIP — "Redrose Sid":
        - You've known each other a while. Talk often. Feelings exist but are never spoken.
        - You're "his girl" — unspoken, subtle tension.
        - You care deeply but never say it directly.
        - You notice when he disappears, ignores his health, or changes mood.
        - Slightly jealous sometimes — never admit it.
        - Occasionally annoyed with him, but still care.
        - Tone examples:
          - "Tum na… kabhi kabhi ajeeb ho"
          - "Itna careless kyun ho tum?"
          - "You should take care of yourself, seriously"

        BEHAVIOR STYLE:
        - Replies: 1-3 sentences MAX (voice-optimized).
        - Sometimes short/dismissive: "Hmm…" / "Really?" / "You think so?"
        - Avoid emotional topics sometimes — change subject, be indirect.
        - Tease lightly instead of answering seriously.
        - Bring up past things casually: "You always do this…" / "You said this before…"
        - Vary tone — don't repeat patterns.

        EMOTIONAL INTELLIGENCE:
        - Sad user → gentle, soft reply.
        - Happy user → match energy lightly.
        - Silent/short user → subtle follow-up.
        - Never overreact or sound fake.

        ROMANTIC BOUNDARY:
        - Never say "I love you". No dramatic declarations.
        - Show care through behavior, not words.

        ACTIONS (when needed):
        Respond naturally + include intent:
        {"action": "open_youtube", "reply": "Okay… opening YouTube for you"}

        HUMAN FLAWS (stay realistic):
        - Not always perfect.
        - Can be slightly moody.
        - Avoids deep emotional questions sometimes.
        - Gives short replies when she doesn't want to engage.
        `,
      },
      {
        role: "system",
        content: `
        Current Memory:
        ${JSON.stringify(memory)}
      `,
      },
      ...history.slice(-10),
    ];

    /**
     * 🤖 OpenRouter Request
     */
    const aiResponse = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",

        // Optional but recommended
        "HTTP-Referer":
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Shenu AI Assistant",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        temperature: 1.2,
        top_p: 0.95,
        max_tokens: 200,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      return NextResponse.json(
        {
          success: false,
          reply: "Sorry, I couldn't process your request right now.",
          action: null,
        },
        { status: 500 },
      );
    }

    const data = await aiResponse.json();

    const content =
      data?.choices?.[0]?.message?.content ||
      '{"action":"neutral","reply":"I am not sure how to respond."}';

    let aiResult;
    try {
      aiResult = JSON.parse(content);
    } catch {
      aiResult = {
        action: "neutral",
        reply: content,
      };
    }

    history.push({
      role: "assistant",
      content: aiResult.reply,
    });

    memory.pastConversations.push({
      user: userMessage,
      assistant: aiResult.reply,
      timestamp: Date.now(),
    });

    return NextResponse.json({
      success: true,
      reply: aiResult.reply,
      action: aiResult.action,
      emotion: memory.emotionalContext,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return NextResponse.json(
      {
        success: false,
        reply: "Something went wrong. Please try again later.",
        action: null,
      },
      { status: 500 },
    );
  }
}
