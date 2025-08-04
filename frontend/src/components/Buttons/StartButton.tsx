import { useNavigate } from 'react-router'

const StartButton = () => {

    const navigate = useNavigate();

    const startOver = () => {
        navigate('/plan-form')
    }

  return (
    <button onClick={startOver} className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 hover:border-gray-400 transition">
        Start Over
      </button>
  )
}

export default StartButton