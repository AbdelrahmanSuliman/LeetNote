import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { createProblem, getAllProblems, updateProblemById, deleteProblemById, getProblemById } from '../services/ai.service';
import { GoogleGenAI } from '@google/genai';
import { CreateProblemSchema, UpdateProblemInput, UpdateProblemSchema } from '../schemas/problem.schema';
import { logger } from '../middleware/logger';
import { getAnalyzeCodePrompt } from '../prompts/analyzeCodePrompt';

dotenv.config();

const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey });

export async function deleteProblemByIdController(req: Request, res: Response){
  try{
    logger.info("deleteProblemByIdController called")
    const problemId = parseInt(req.params.id as string)
    await deleteProblemById(problemId);

    res.status(200).json({message: `problem with id ${problemId} deleted succesfully`})
  }
  catch(error){
    logger.error({ err: error }, 'Error in deleteProblemByIdController');
    res.status(500).json({message: error})
  }
}

export async function updateProblemByIdController(req: Request, res: Response){
  try{
    logger.info("updateProblemController called");
    logger.info("Request: ", req.body)

  const data = req.body;
  const problemId = parseInt(req.query.id as string)
  const parsed: UpdateProblemInput = UpdateProblemSchema.parse(data)
  await updateProblemById(problemId, parsed);

  res.status(200).json({message: "Problem updated successfully"})
  } catch(error){
    logger.error({ err: error }, 'Error in updateProblemByIdController');
    res.status(500).json({message: error})
  }
}

export async function getProblemByIdController(req: Request, res: Response){
  logger.info("getProblemByIdController called");

  try{
    const problemId = parseInt(req.params.id as string)
    const problem = await getProblemById(problemId)

    res.status(200).json({problem})
  } catch(error){
    logger.error({ err: error }, 'Error in getProblemByIdController');
    res.status(500).json({message: error})
  }
  
}

export async function getAllProblemsController(req: Request, res: Response){
  logger.info("getAllProblemsController called");

  try{
    const problems = await getAllProblems();

    if(!problems){
      res.status(500).json({message: "Internal Server Error"})
    }

    res.status(200).json({problems})
  }catch(error){
    logger.error({ err: error }, 'Error in analyzeCodeController');
    res.status(500).json({message: error})
  }
}
export async function analyzeCodeController(req: Request, res: Response) {
  logger.info('analyzeCodeController called');

  try {
    const { code } = req.body;
    logger.info('Received code for analysis');

    const prompt = getAnalyzeCodePrompt(code);

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Fetch the corresponding LeetCode problem from the function name',
            },
            explanation: {
              type: 'string',
              description: 'Markdown-formatted explanation of how the code works',
            },
            timeComplexity: {
              type: 'string',
              description: 'Big O time complexity',
            },
            spaceComplexity: {
              type: 'string',
              description: 'Big O space complexity',
            },
            optimization: {
              type: 'string',
              description: 'Markdown-formatted suggestions to improve the code',
            },
            language: {
              type: 'string',
              description: 'Language the code is written in.'
            }
          },
          required: ['title', 'explanation', 'timeComplexity', 'spaceComplexity', 'optimization', 'language'],
        },
      },
    });

    const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      logger.error('No content returned by AI');
      res.status(500).json({ message: 'No content returned by AI' });
      return;
    }

    logger.info('Raw AI response received');
    const parsed = JSON.parse(rawText);
    const validated = CreateProblemSchema.parse({ ...parsed, code });
    await createProblem(validated);
    logger.info('Problem successfully created and saved');
    res.status(200).json(validated);

  } catch (error) {
    logger.error({ err: error }, 'Error in analyzeCodeController');
    res.status(500).json({ message: 'AI analysis failed', error });
  }
}
