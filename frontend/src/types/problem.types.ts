import {z} from 'zod';


export const updateProblemSchema = z.object({
    code: z.string().optional(),
    title: z.string().optional(),
    explanation: z.string().optional(),
    timeComplexity: z.string().optional(),
    spaceComplexity: z.string().optional(),
    optimization: z.string().optional(),
});

export const ProblemSchema = z.object({
    id: z.number(),
    code: z.string(),
    title: z.string(),
    explanation: z.string(),
    timeComplexity: z.string(),
    spaceComplexity: z.string(),
    optimization: z.string(),
    language: z.string()
});

export const ProblemArraySchema = z.array(ProblemSchema);

export type updateProblem = z.infer<typeof updateProblemSchema>
export type ProblemType = z.infer<typeof ProblemSchema>;
