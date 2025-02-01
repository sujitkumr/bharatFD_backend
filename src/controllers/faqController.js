const FAQ = require("../models/FAQ");
const { translateText } = require("../utils/translate");


exports.createFAQ = async (req, res) => {
  try {
    let { question, answer } = req.body;

    const question_hi = await translateText(question, "hi");  // Hindi translation
    const question_bn = await translateText(question, "bn");  // Bengali translation
    const question_od = await translateText(question, "or");  // Odia translation (use "or" for Odia)

    const faq = new FAQ({ question, answer, question_hi, question_bn, question_od });
    await faq.save();
    
    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ message: "Error creating FAQ", error });
  }
};


// Fetch FAQs with optional language translation
exports.getFAQs = async (req, res) => {
  try {
    const lang = req.query.lang || "en";
    const faqs = await FAQ.find();

    const translatedFAQs = faqs.map((faq) => ({
      id: faq._id,
      question:
        lang === "hi" ? faq.question_hi :
        lang === "bn" ? faq.question_bn :
        lang === "od" ? faq.question_od :
        faq.question,
      answer: faq.answer,
    }));

    res.status(200).json(translatedFAQs);
  } catch (error) {
    console.error("❌ Error fetching FAQs:", error);
    res.status(500).json({ message: "Error fetching FAQs", error });
  }
};
