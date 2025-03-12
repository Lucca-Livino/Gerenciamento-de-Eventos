import { z } from "zod";

export const eventoSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    data: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida. Use o formato YYYY-MM-DD.")
        .refine((val) => {
            const date = new Date(val);
            return !isNaN(date.getTime());
        }, { message: "Data inválida. Informe uma data real." }),
    local: z.string().min(1, "Local é obrigatório"),
    usuario_id: z.number().int().positive("O ID do usuário deve ser um número positivo")
});

