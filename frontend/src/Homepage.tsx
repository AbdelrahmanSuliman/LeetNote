import { useContext, useEffect, useState} from 'react'
import { analyzeCode, deleteProblemById, getAllProblems } from './apis/problem.api'
import { type ProblemType } from './types/problem.types'
import { Link } from 'react-router-dom'
import "./Homepage.css"
import { ThemeContext } from './components/ThemeContext'
import logo from './assets/LeetCode_logo.png'
import sunImg from './assets/sun-inverted.png'
import moonImg from './assets/moon-svgrepo-com.svg'
import sendImg from './assets/send.png'
import deleteImg from './assets/trash.png'

function App() {
  const [problems, setProblems] = useState<ProblemType[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<ProblemType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newProblemCode, setNewProblemCode] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext)

  useEffect(() => {
    getAllProblems()
      .then((response) => {
        setProblems(response)
        setFilteredProblems(response)
      })
      .catch((error) => console.error(error))
  }, [])

  

  useEffect(() => {
    const filtered = problems.filter((problem) =>
      problem.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredProblems(filtered)
  }, [searchQuery, problems])

  const deleteProblem = (id: number) => {
    const newProblems = problems.filter((problem) => problem.id !== id);
    setFilteredProblems(newProblems);
    setProblems(newProblems)
    setIsDeleting(true)
    deleteProblemById(id)
      .then((response) => console.log(response))
      .catch((error) => console.error(error))
      .finally(() => setIsDeleting(false))
  }

  const addProblem = () => {
    if (!newProblemCode.trim()) return;
    setIsLoading(true)
    analyzeCode(newProblemCode)
      .then((response) => {
        setProblems((prev) => [...prev, response])
        setFilteredProblems((prev) => [...prev, response])
        setNewProblemCode('')
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false))
  }

  return (
    <main>
      <header>
        <div className='fade-down' style={{display: 'flex', alignItems: "fl"}}>
          <img src={logo} id='logo' />
          <h1 id='title'>LeetNote</h1>
        </div>
      <img className='fade-down' onClick={toggleTheme} src={theme === 'light' ? moonImg : sunImg}id='toggle-theme-btn'/>
      </header>

      <input
        type='text'
        id='search-field'
        onChange={(e) => setSearchQuery(e.target.value)}
        className='fade-up'
        placeholder='Enter a problem title...'
      />

      <ul id='problem-list'>
        {filteredProblems.map((problem) => (
          <li key={problem.id} className='fade-in'>
            {isDeleting ? (
              <p >Deleting problem...</p>
            ) : (
              <Link to={`/problems/${problem.id}`} id='problem-item' >
                <div id='problem-content'>
                  <span>{problem.title}</span>
                  <img
                    id='delete-btn'
                    src={deleteImg}
                    onClick={(e) => {
                      e.preventDefault();
                      deleteProblem(problem.id);
                    }}
                  />
                </div>
              </Link>
            )}
          </li>
        ))}
      </ul>
      {isLoading && <p id='analyzing-text'>Analyzing solution</p>}
      <div id='add-problem-card'>
      
      <textarea
        placeholder='Enter code for evaluation...'
        value={newProblemCode}
        onChange={(e) => setNewProblemCode(e.target.value)}
        id='code-input'
      />
        <img onClick={addProblem} src={sendImg} id='add-problem-btn'/>
      </div>
    </main>
  )
}

export default App
