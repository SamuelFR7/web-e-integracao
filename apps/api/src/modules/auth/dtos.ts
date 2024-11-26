import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().toLowerCase().email(),
  senha: z.string(),
})

