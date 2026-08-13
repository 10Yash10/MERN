import { z } from "zod";

export const deliveryValidationSchema = z.object({
  deliveryDetails: z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    address: z.object({
      line1: z.string().min(1, "Address line 1 is required"),
      line2: z.string().optional(), // Allows empty string or missing field
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      postalCode: z.string().min(1, "Postal code is required"),
    }),
  }),
});
