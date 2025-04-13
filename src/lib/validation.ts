
import * as z from 'zod';

// Schema for log entries
export const logEntrySchema = z.object({
  nicotineUse: z.enum(['yes', 'no']),
  productType: z.string().optional().nullable(),
  quantity: z.string().optional().nullable(),
  mood: z.number().min(1).max(5),
  energy: z.number().min(1).max(5),
  focus: z.number().min(1).max(5),
  sleepHours: z.string().refine(val => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0 && num <= 24;
  }, { message: "Sleep hours must be between 0 and 24" }),
  sleepQuality: z.number().min(1).max(5),
  cravingIntensity: z.number().min(0).max(10),
  cravingTrigger: z.string(),
  journal: z.string().optional().nullable(),
});

// Schema for goal settings
export const goalSchema = z.object({
  goalType: z.enum(['afresh', 'fresher']),
  method: z.enum(['cold-turkey', 'gradual-reduction', 'tapering', 'nrt', 'harm-reduction']),
  product: z.string().min(1, "Please select a product"),
  quitDate: z.date().optional().nullable(),
  reduction: z.string().refine(val => {
    const num = parseInt(val);
    return !isNaN(num) && num > 0 && num <= 100;
  }, { message: "Reduction must be between 1 and 100%" }).optional().nullable(),
  timeline: z.string().refine(val => {
    const num = parseInt(val);
    return !isNaN(num) && num > 0;
  }, { message: "Timeline must be a positive number" }).optional().nullable(),
  motivation: z.string().optional().nullable(),
});

// Function to validate data against schema
export function validateData(schema: any, data: any) {
  try {
    return schema.safeParse(data);
  } catch (error) {
    console.error("Validation error:", error);
    return { success: false, error };
  }
}

// Helper to format validation errors for display
export function formatValidationErrors(errors: any): string[] {
  if (!errors || !errors.issues) return [];
  return errors.issues.map((issue: any) => `${issue.path.join('.')}: ${issue.message}`);
}

// Helper to get validation errors as an object
export function getValidationErrors(result: any): Record<string, string> {
  if (result.success) return {};
  
  const errors: Record<string, string> = {};
  
  if (result.error && result.error.issues) {
    result.error.issues.forEach((issue: any) => {
      const path = issue.path.join('.');
      errors[path] = issue.message;
    });
  }
  
  return errors;
}
