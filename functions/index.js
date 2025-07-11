const functions = require("firebase-functions");
const { defineSecret } = require("firebase-functions/params");
const fetch = require("node-fetch");

const geminiApiKey = defineSecret("GOOGLE_GEMINI_API_KEY");

exports.askGemini = functions
  .runWith({ secrets: [geminiApiKey] })
  .https.onRequest(async (req, res) => {
    const prompt = req.body.prompt;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey.value()}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      const data = await response.json();

      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        res.status(200).send({ text: data.candidates[0].content.parts[0].text });
      } else {
        res.status(200).send({ text: "(The Seer offers no reply...)" });
      }
    } catch (err) {
      console.error("Invocation failed:", err);
      res.status(500).send({ text: "The veil trembled. The Seer could not be reached." });
    }
  });

    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      res.status(200).send({ text: data.candidates[0].content.parts[0].text });
    } else {
      res.status(200).send({ text: "(The Seer offers no reply...)" });
    }
  } catch (error) {
    console.error("Invocation failed:", error);
    res.status(500).send({ text: "The veil trembled. The Seer could not be reached." });
  }
});
