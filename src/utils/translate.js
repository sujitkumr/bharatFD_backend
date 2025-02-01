const axios = require("axios");
const redis = require("redis");
const { connectRedis } = require("../config/redis");

const client = connectRedis(); // Use the centralized Redis connection

// Function to translate text
const translateText = async (text, targetLang) => {
  const cacheKey = `translate_${text}_${targetLang}`;
  try {
    // Check if the translation is cached
    const cachedTranslation = await client.get(cacheKey);
    if (cachedTranslation) return cachedTranslation;

    // Fetch translation from the API
    const response = await axios.get(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    );
    const translation = response.data[0][0][0];

    // Cache the translation for 24 hours
    await client.set(cacheKey, translation, { EX: 86400 });
    return translation;
  } catch (error) {
    console.error("❌ Translation Error:", error);
    return text; // Fallback to the original text in case of an error
  }
};

module.exports = { translateText };
