import { useNavigate } from "react-router-dom"
import { Button } from "flowbite-react"

export default function LandingPage() {

  const navigate = useNavigate()

  const handleLoginClick=()=>{
    navigate('/login')
  }

  const handleMainClick=()=>{
    navigate('/main')
  }
  
  const handleDetailClick=()=>{
    navigate('/detail/123')
  }

  const handleSubClick=()=>{
    navigate('/recoilex')
  }
  
  const handleApiExClick=()=>{
    navigate('/api')
  }

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center gap-6 px-6">
      랜딩 페이지 입니다
      <div>
        <button onClick={handleMainClick}>
          메인 페이지로 가기
        </button>
      </div>
      <div>
        <button onClick={handleLoginClick}>
          로그인 페이지로 가기
        </button>
      </div>
      <div>
        <button onClick={handleDetailClick}>
          상세 페이지로 가기
        </button>
      </div>
      <div>
        <button onClick={handleSubClick}>
          Recoil 예시 페이지로 가기
        </button>
      </div>
      <div>
        <button onClick={handleApiExClick}>
          Api 예시 페이지로 가기
        </button>
      </div>
      <div>
        <Button color="blue">Flowbite예시</ Button>
      </div>
    </div>
  )
}
