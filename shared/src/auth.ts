import { z } from "zod";

export const loginSchema = z.object({
  cpf: z
    .string({ error: "O CPF é obrigatório" })
    .regex(/^\d{11}$/, "O CPF deve conter exatamente 11 números (apenas dígitos)")
    .meta({ example: "12345678901" }),

  senha: z
    .string({ error: "A senha é obrigatória" })
    .min(1, "A senha é obrigatória")
    .meta({ example: "senhaForte123" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
