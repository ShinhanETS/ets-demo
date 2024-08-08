import { useNavigate } from "react-router-dom"

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
    </div>
  )
}
