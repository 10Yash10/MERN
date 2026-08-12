import { z } from "zod";

export const cartSchema = z.object({
  userId: z.string(),
  productId: z.string(),
  name: z.string(),
  quantity: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().min(1).max(50)),
  price: z.string().transform((val) => parseInt(val, 10)),
  isAvailable: z.boolean(),
});
