import axios from 'axios';
import {type ProblemType, ProblemArraySchema, type updateProblem, ProblemSchema} from '../types/problem.types'


const backendUrl = import.meta.env.VITE_BACKEND_URL
console.log("Backend URL: ", backendUrl)

export const analyzeCode = async (code: string) => {
    try{
        const response = await axios.post(`${backendUrl}/api/analyze-code`, {code});
        return response.data
    } catch(error){
        if(axios.isAxiosError(error)){
            if(error.response){
                console.error('Server error:', error.response.data);
                console.error('Status code:', error.response.status);
            } else if(error.request){
                console.error('No response received:', error.request);
            } else {
                console.error('Request setup error:', error.message);
            }
               
        } else {
            console.error('Unexpected error:', error);
        }
    }
}

export const getProblemById = async(id: string): Promise<ProblemType> => {
    try{
        const response = await axios.get(`${backendUrl}/api/problems/${id}`);
        return ProblemSchema.parse(response.data.problem);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error('Server error:', error.response.data);
                console.error('Status code:', error.response.status);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Request setup error:', error.message);
            }
        } else {
            console.error('Unexpected error:', error);
        }
        throw new Error('Failed to fetch problem by ID')
    }
}

export const getAllProblems = async (): Promise<ProblemType[]> => {
    try {
        const response = await axios.get(`${backendUrl}/api/problems`);
        return ProblemArraySchema.parse(response.data.problems);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error('Server error:', error.response.data);
                console.error('Status code:', error.response.status);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Request setup error:', error.message);
            }
        } else {
            console.error('Unexpected error:', error);
        }
        return [];
    }
}


export const updateProblemById = async(id: number, problemDetails: updateProblem ) => {
    try{
        const response = await axios.put(`${backendUrl}/api/problems`, problemDetails, {params: id});
        return response.data
    } catch(error){
        if(axios.isAxiosError(error)){
            if(error.response){
                console.error('Server error:', error.response.data);
                console.error('Status code:', error.response.status);
            } else if(error.request){
                console.error('No response received:', error.request);
            } else {
                console.error('Request setup error:', error.message);
            }
               
        } else {
            console.error('Unexpected error:', error);
        }
    }
}

export const deleteProblemById = async (id: number) => {
    try{
        const response = await axios.delete(`${backendUrl}/api/problems/${id}`)
        return response.data
    }catch(error){
        if(axios.isAxiosError(error)){
            if(error.response){
                console.error('Server error:', error.response.data);
                console.error('Status code:', error.response.status);
            } else if(error.request){
                console.error('No response received:', error.request);
            } else {
                console.error('Request setup error:', error.message);
            }
               
        } else {
            console.error('Unexpected error:', error);
        }
    }
}