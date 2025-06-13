import { z } from "zod";

export const CreateProblemSchema = z.object({
  code: z.string().min(1, "Code is required"),
  title: z.string().min(1, "Title is required"),
  explanation: z.string().min(1, "Explanation is required, markdown allowed"),
  timeComplexity: z.string().min(1, "Time complexity is required"),
  spaceComplexity: z.string().min(1, "Space complexity is required"),
  optimization: z.string().min(1, "Optimization is required, markdown allowed"),
  language: z.string().min(1)
});

export const UpdateProblemSchema = z.object({
  code: z.string().min(1, "Code is required").optional(),
  title: z.string().min(1, "Title is required").optional(),
  explanation: z.string().min(1, "Explanation is required, markdown allowed").optional(),
  timeComplexity: z.string().min(1, "Time complexity is required").optional(),
  spaceComplexity: z.string().min(1, "Space complexity is required").optional(),
  optimization: z.string().min(1, "Optimization is required, markdown allowed").optional(),
})


export type CreateProblemInput = z.infer<typeof CreateProblemSchema>
export type UpdateProblemInput = z.infer<typeof UpdateProblemSchema>

