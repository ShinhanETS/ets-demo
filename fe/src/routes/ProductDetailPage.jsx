import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { productId } = useParams();

  return (
    <div>
      상품상세페이지 입니다.
      <div>
        현재 상품 id : {productId}
      </div>
    </div>
  );
}
