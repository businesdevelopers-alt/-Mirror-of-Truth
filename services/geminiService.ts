
import { GoogleGenAI, Type } from "@google/genai";
import { Claim, ClaimStatus } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function extractClaimsFromContent(content: string): Promise<Claim[]> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `قم باستخراج الادعاءات الرئيسية من النص التالي. قدم النتيجة بتنسيق JSON.
    النص: "${content}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: "نص الادعاء المستخرج" },
            status: { 
              type: Type.STRING, 
              enum: ["قيد التحقق", "ناقص", "متناقض", "موثق", "زائف"],
              description: "الحالة الأولية للادعاء"
            },
            notes: { type: Type.STRING, description: "ملاحظات أولية حول الادعاء" }
          },
          required: ["text", "status"]
        }
      }
    }
  });

  const parsed = JSON.parse(response.text || '[]');
  return parsed.map((item: any, index: number) => ({
    id: `claim-${Date.now()}-${index}`,
    text: item.text,
    status: item.status as ClaimStatus,
    confidence: 0.85,
    extractedAt: new Date().toISOString(),
    timeline: [
      {
        id: `event-${Date.now()}`,
        date: new Date().toLocaleDateString('ar-SA'),
        description: 'تم رصد الادعاء واستخراجه آلياً'
      }
    ],
    notes: item.notes || ''
  }));
}
