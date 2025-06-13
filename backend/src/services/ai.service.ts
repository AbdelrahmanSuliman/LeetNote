import { PrismaClient } from '@prisma/client';
import { CreateProblemInput, UpdateProblemInput } from '../schemas/problem.schema';
import { logger } from '../middleware/logger'; 

const prisma = new PrismaClient();

export const createProblem = async (data: CreateProblemInput) => {
  try {
    logger.info('Creating problem with data:', data);
    const {code, title, explanation, timeComplexity, spaceComplexity, optimization, language } = data
    const problem = await prisma.problem.create({
      data:{
        code,
        title,
        explanation,
        timeComplexity,
        spaceComplexity,
        optimization,
        language
      }
    });
    logger.info('Problem created successfully:', { id: problem.id, title: problem.title });
    return problem;
  } catch (error) {
    logger.error('Failed to create problem:', error);
    throw error;
  }
};

export const getAllProblems = async () => {
  try{
    logger.info(`number of problems: ${await prisma.problem.count()}`)
    logger.info("Fetching all problems")
    return await prisma.problem.findMany()
  } catch(error){
    logger.error('Failed to fetch problems:', error);
    throw error;
  }

}

export const getProblemById = async (problemId: number) => {
  try{
    const problem = await prisma.problem.findUnique({
      where: {
        id: problemId
      }
    })


    return problem;
  }catch(error){
    logger.error('Failed to fetch problem:', error);
    throw error
  }
}

export const deleteProblemById = async (problemId: number) => {
  try{
    const problem = await prisma.problem.delete({
      where: {
        id: problemId
      }
    })

    return problem;
  } catch(error){
    logger.error('Failed to update problem:', error);
    throw error
  }
}

export const updateProblemById = async(problemId: number, data: UpdateProblemInput) => {
  try{
    await prisma.problem.update({
      where: {
        id: problemId
      },
      data: {
        ...data
      }
    })
  } catch(error){
    logger.error('Failed to update problem:', error);
    throw error
  }
}
