from flask import Flask, request, jsonify
import json
import requests
from bs4 import BeautifulSoup
import pandas as pd
import FinanceDataReader as fdr

app = Flask(__name__)

class HoldingDTO:
    def __init__(self, stock_code, acct_no, quantity, current_price, total_price, country):
        self.stock_code = stock_code
        self.acct_no = acct_no
        self.quantity = quantity
        self.current_price = current_price
        self.total_price = total_price
        self.country = country

    def update_price(self):
        # 현재 가격을 업데이트하는 로직
        # 예시: 가격을 10% 증가시키기
        if self.stock_code in ["KAU23", "KAU24", "KAU25"]:
            self.current_price = self.quantity * get_current_price_krx(self.stock_code)
        elif self.stock_code in ["400580", "400570", "459370"]:
            self.current_price = self.quantity * get_current_price_investing(self.stock_code)
        elif self.stock_code in ["610030", "520043", "580035", "570074"]:
            self.current_price = self.quantity * get_current_price_naver(self.stock_code)

def get_current_price_krx(stock_code):
    # 요청할 URL
    url = "https://ets.krx.co.kr/contents/ETS/99/ETS99000001.jspx"

    # 요청 헤더 설정
    headers = {
        "authority": "ets.krx.co.kr",
        "method": "POST",
        "path": "/contents/ETS/99/ETS99000001.jspx",
        "scheme": "https",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://ets.krx.co.kr",
        "Referer": "https://ets.krx.co.kr/contents/ETS/03/03010000/ETS03010000.jsp",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest",
    }

    # 요청 페이로드 설정
    payload = {
        "isu_cd": "",
        "fromdate": "20240707",
        "todate": "20240807",
        "pagePath": "/contents/ETS/03/03010000/ETS03010000.jsp",
        "code": "tlW8OtHVuI2WAKZXlszdwkmIIuT7WE73BSZpiukGGZRYmhpUiShCNSSurCaSqeglABmvXgNbslKoVH8lR07wi99XN/dK2w5aGU7stvpozYRdTLxThqWsQh5gmFSsOTOC/qCnB+wnekPBO79o5x66AWMA417d6aA6lcHPv2Z9RMbe/ejRBtoiI4m0VIIdpsfZ",
        "bldcode": "ETS/03/03010000/ets03010000_04"
    }

    # POST 요청 보내기
    response = requests.post(url, headers=headers, data=payload)

    # 응답 확인
    if response.status_code == 200:
        # 'isu_cd'가 주어진 종목 코드인 객체 찾기
        result = next((item for item in response.json()['result'] if item['isu_cd'] == stock_code), None)

        # 결과 출력
        if result:
            return int(result["tdd_clsprc"].replace(",",""))  # 현재가 반환   "9,150"
        else:
            return f"{stock_code} 객체를 찾을 수 없습니다."
    else:
        return f"요청 실패. 상태 코드: {response.status_code}"


def  get_current_price_naver(stock_code):
    # URL 설정
    url = f'https://finance.naver.com/item/sise_day.naver?code={stock_code}'
    
    # 요청 보내기
    req = requests.get(url, headers={'User-agent': 'Mozilla/5.0'})
    html = BeautifulSoup(req.text, "lxml")
    
    # 페이지 수 추출
    pgrr = html.find('td', class_='pgRR')
    last_page = pgrr.a['href'].split('=')[-1]

    # 데이터프레임 초기화
    df = pd.DataFrame()

    # 페이지 수 만큼 데이터 가져오기
    req = requests.get(f'{url}&page={1}', headers={'User-agent': 'Mozilla/5.0'})
    df = pd.concat([df, pd.read_html(req.text, encoding='euc-kr')[0]], ignore_index=True)

    df.dropna(inplace=True)
    df.reset_index(drop=True, inplace=True)

    # 첫 번째 행의 두 번째 열 값 반환
    if not df.empty:
        return df.iloc[0, 1]  # 두 번째 열의 값 반환
    else:
        return None  # 데이터가 없을 경우 None 반환

def get_current_price_investing(stock_code):
    try:
        # 데이터 읽기
        df = fdr.DataReader(stock_code, '2024-08-07')

        # 첫 번째 행의 Close 값 추출
        close_value = float(df['Close'].iloc[0]) # 첫 번째 행의 Close 값
        return close_value
    except Exception as e:
        print(f"오류 발생: {e}")
        return None


@app.route('/api/sise/holdings', methods=['POST'])
def holdings():
    data = request.json
    holdings_list = []

    # DTO 리스트를 순회하면서 가격 업데이트
    for item in data:
        holding = HoldingDTO(
            stock_code=item.get("stock_code"),
            acct_no=item.get("acct_no"),
            quantity=item.get("quantity"),
            current_price=item.get("currentPrice"),
            total_price=item.get("totalPrice"),
            country=item.get("country")
        )
        holding.update_price()  # 가격 업데이트
        holdings_list.append(holding.__dict__)  # DTO를 딕셔너리 형태로 변환하여 리스트에 추가

    return jsonify(holdings_list)  # 업데이트된 DTO 리스트 반환

if __name__ == '__main__':
    app.run('0.0.0.0', port=8085, debug=True)