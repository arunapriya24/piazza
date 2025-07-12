// utils/olmOCR.js
import Tesseract from "tesseract.js";

export async function processDocument(file) {
  const result = await Tesseract.recognize(file, 'eng', {
    logger: m => console.log(m),
  });

  const text = result.data.text;
  console.log("📝 Extracted OCR Text:", text);

  // === Improved Name Extraction ===
  const nameRegex = /\b(?:Mr\.|Ms\.|Mrs\.)?\s*[A-Z][a-z]+(?:\s[A-Z][a-z]+){1,2}\b/g;
  const rawNames = [...text.matchAll(nameRegex)].map(m => m[0]);

  // Filter out non-person names (common headers)
  const excludeWords = [
    "Employee Onboarding Form",
    "Emergency Contact",
    "Educational Qualifications",
    "Degree Institution Year Percentage"
  ];
  const names = Array.from(new Set(rawNames.filter(name => !excludeWords.includes(name))));

  // === Date Extraction ===
  const dates = [...text.matchAll(/\b\d{2}[\/\-]\d{2}[\/\-]\d{4}\b/g)].map(m => m[0]);

  // === Address Extraction (same logic) ===
  const addresses = [...text.matchAll(/\d{1,5}\s[\w\s]+,\s*\w+,\s*\w+\s*-\s*\d{6}/g)].map(m => m[0]);

  // === Educational Table Extraction (optional: use this for future improvements) ===
  const tableLines = text
    .split('\n')
    .filter(line =>
      line.match(/(B\.?Tech|10th Grade|12th Grade|Kendriya Vidyalaya|IIT|DPS)/)
    );

  const headers = ["Degree", "Institution", "Year", "Percentage"];
  const rows = tableLines.map(line =>
    line.trim().split(/\s{2,}|\t/).filter(col => col !== '')
  );

  return {
    entities: {
      names,
      dates: Array.from(new Set(dates)),
      addresses: Array.from(new Set(addresses)),
    },
    tables: [
      {
        headers,
        rows,
      },
    ],
  };
}
