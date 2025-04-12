
import { z } from "zod";

// Common validation schemas
export const logEntrySchema = z.object({
  // Nicotine Use
  nicotineUse: z.enum(["yes", "no"]),
  productType: z.string().optional(),
  quantity: z.union([z.string(), z.number()]).optional(),
  
  // Wellness
  mood: z.number().min(1).max(5),
  energy: z.number().min(1).max(5),
  focus: z.number().min(1).max(5),
  sleepHours: z.union([z.string(), z.number()]),
  sleepQuality: z.number().min(1).max(5),
  
  // Cravings
  cravingIntensity: z.number().min(0).max(10),
  cravingTrigger: z.string().optional(),
  
  // Journal
  journal: z.string().optional()
});

export const goalSchema = z.object({
  goalType: z.enum(["afresh", "fresher"]),
  method: z.enum(["cold-turkey", "gradual-reduction", "tapering", "nrt", "harm-reduction"]),
  product: z.string(),
  quitDate: z.date().optional(),
  reduction: z.union([z.string(), z.number()]).optional(),
  timeline: z.union([z.string(), z.number()]).optional(),
  motivation: z.string().optional()
});

export const userProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

export const productCostsSchema = z.object({
  cigaretteCost: z.union([z.string(), z.number()]).optional(),
  vapeCost: z.union([z.string(), z.number()]).optional(),
  dipCost: z.union([z.string(), z.number()]).optional(),
});

export const stepRewardSchema = z.object({
  steps: z.number().min(0, "Steps cannot be negative")
});

// Helper function to validate data against a schema
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  try {
    const validData = schema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}

// Helper function to format validation errors for UI
export function formatValidationErrors(errors: z.ZodError): Record<string, string> {
  const formattedErrors: Record<string, string> = {};
  errors.errors.forEach((error) => {
    if (error.path) {
      formattedErrors[error.path.join('.')] = error.message;
    }
  });
  return formattedErrors;
}
