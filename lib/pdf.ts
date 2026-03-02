import pdfParse from "pdf-parse";

export async function parsePdfToText(buffer: Buffer): Promise<string> {
  const data = await pdfParse(buffer);
  return data.text;
}

