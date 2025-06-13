import { Link, useParams } from "react-router-dom"
import type { ProblemType } from "../types/problem.types";
import { useState, useEffect, useContext } from "react";
import { getProblemById } from '../apis/problem.api'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import {ThemeContext} from './ThemeContext'
import ReactMarkdown from 'react-markdown'
import './Problem.css'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'




export default function Problem(){

    const{id} = useParams();
    const [problem, setProblem] = useState<ProblemType>()
    const [isLoading, setIsLoading] = useState(false);
    const {theme} = useContext(ThemeContext)


    useEffect(() => {
        setIsLoading(true);
        getProblemById(id as string)
        .then((response) => {
            setProblem(response)    
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false))
        
    }, [id])

    if(isLoading) return <p>Loading problem...</p>

    return(<div id="main">
                <Link to='/' id="back-text">{"<--"}Back to problems</Link>
        <h1 id="title">{problem?.title}</h1>
        <div className="section">
            <SyntaxHighlighter id= 'code'language = {problem?.language} style={theme === 'light' ? solarizedlight : darcula} customStyle={{background: 'none', backgroundColor: 'transparent', padding: 0, margin: 0}} showLineNumbers>
                {problem?.code ?? ''}
            </SyntaxHighlighter>
        </div>
        <div id="explanation" className="markdown">
        <h2>Explanation: </h2>
        <div className="section">
            <ReactMarkdown >
                {problem?.explanation ?? ''}
            </ReactMarkdown>
        </div>
        </div>
        <h2 id="time-complexity" className="complexity">Time Complexity: {problem?.timeComplexity}</h2>
        <h2 className="complexity">Space Complexity: {problem?.spaceComplexity}</h2>
        <div id="optimization" className="markdown">
        <h2>Optimization: </h2>
        <div className="section"> 
            <ReactMarkdown>
                {problem?.optimization ?? ''}
            </ReactMarkdown>
        </div>
        </div>
    </div>)
}