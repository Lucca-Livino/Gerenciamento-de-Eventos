import { z } from "zod";

export const UserSchema = z.object( {
    email: z.string().email().trim(),
    nome: z.string().min(3).max(50),
    senha: z.string().min(8,'A senha deve conter no mínimo 8 caracteres')
})

export const idSchema = z.preprocess((val) => Number(val), z.number().int().positive("O ID do usuário deve ser um número positivo"))


