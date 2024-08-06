import { useNavigate } from "react-router-dom"

export default function Main() {

  const navigate = useNavigate()

  const handleLoginClick=()=>{
    navigate('/login')
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
    <div className="w-full h-full flex flex-col gap-6">
      Main 페이지 입니다

      <button onClick={handleLoginClick}>
        로그인 페이지로 가기
      </button>

      <button onClick={handleDetailClick}>
        상세 페이지로 가기
      </button>

      <button onClick={handleSubClick}>
        Recoil 예시 페이지로 가기
      </button>

      <button onClick={handleApiExClick}>
        Api 예시 페이지로 가기
      </button>

    </div>
  )
}
