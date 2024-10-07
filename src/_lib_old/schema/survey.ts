import { z } from "zod";

const surveyQuestionSchema = z.discriminatedUnion("type", [
  // Open-Ended Question
  z.object({
    id: z.number(),
    type: z.literal("open-ended"),
    title: z.string(),
    label: z
      .object({
        text: z.string(),
        icon: z.string(),
      })
      .optional(),
    placeholder: z.string().optional(),
  }),

  // Multiple Choice Question (Single Answer)
  z.object({
    id: z.number(),
    type: z.literal("multiple-choice-single"),
    title: z.string(),
    options: z.array(z.string()),
    label: z
      .object({
        text: z.string(),
        icon: z.string(),
      })
      .optional(),
  }),

  // Multiple Choice Question (Multiple Answers)
  z.object({
    id: z.number(),
    type: z.literal("multiple-choice-multiple"),
    title: z.string(),
    options: z.array(z.string()),
    label: z
      .object({
        text: z.string(),
        icon: z.string(),
      })
      .optional(),
  }),

  // Rating Scale Question
  z.object({
    id: z.number(),
    type: z.literal("rating-scale"),
    title: z.string(),
    scale: z.object({
      min: z.number(),
      max: z.number(),
      questions: z.array(z.string()).optional(),
    }),
    label: z
      .object({
        text: z.string(),
        icon: z.string(),
      })
      .optional(),
  }),

  // Likert Scale Question
  z.object({
    id: z.number(),
    type: z.literal("likert-scale"),
    title: z.string(),
    options: z.array(z.string()), // e.g., ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    label: z
      .object({
        text: z.string(),
        icon: z.string(),
      })
      .optional(),
  }),

  // Yes/No Question
  z.object({
    id: z.number(),
    type: z.literal("yes-no"),
    title: z.string(),
    label: z
      .object({
        text: z.string(),
        icon: z.string(),
      })
      .optional(),
  }),

  // Demographic Question
  z.object({
    id: z.number(),
    type: z.literal("demographic"),
    title: z.string(),
    fieldType: z.enum(["text", "number", "date", "select"]),
    options: z.array(z.string()).optional(), // For select fields
    label: z
      .object({
        text: z.string(),
        icon: z.string(),
      })
      .optional(),
  }),

  // Consent Question
  z.object({
    id: z.number(),
    type: z.literal("consent"),
    title: z.string(),
    consentText: z.string(),
    label: z
      .object({
        text: z.string(),
        icon: z.string(),
      })
      .optional(),
  }),

  // Numeric Input Question
  z.object({
    id: z.number(),
    type: z.literal("numeric"),
    title: z.string(),
    min: z.number().optional(),
    max: z.number().optional(),
    label: z
      .object({
        text: z.string(),
        icon: z.string(),
      })
      .optional(),
  }),

  // Ranking Question
  z.object({
    id: z.number(),
    type: z.literal("ranking"),
    title: z.string(),
    options: z.array(z.string()),
    label: z
      .object({
        text: z.string(),
        icon: z.string(),
      })
      .optional(),
  }),
]);

const surveyAnswer = z.object({
  id: z.number(),
  type: z.literal("ranking"),
  answers: z.any(),
})



export default {
  surveyQuestionSchema,
};
