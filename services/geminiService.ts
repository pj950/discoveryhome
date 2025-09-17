
import { GoogleGenAI } from "@google/genai";
import { type Property } from '../types';

export const generateInsights = async (properties: Property[]): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const propertyDetails = properties.map(p => `- ${p.name} at ¥${p.price}/night`).join('\n');

  const prompt = `
    As a business analyst for a vacation rental company called 'Discovery Homes', analyze the following property portfolio and provide actionable business insights.

    Current Property Portfolio:
    ${propertyDetails}

    Based on this data, provide:
    1.  A brief summary of the current market position (e.g., are we budget-focused, luxury, diverse?).
    2.  Two specific marketing suggestions to attract more customers. For example, suggest targeted campaigns or package deals.
    3.  One suggestion for a new type of property to add to the portfolio to fill a potential market gap.

    Keep the entire response concise and under 150 words. Format it with clear headings for each section.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating insights from Gemini API:", error);
    throw new Error("Failed to get insights from AI. Please check the API key and network connection.");
  }
};
