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
        elif self.stock_code in ["EUA", "400580", "400570", "459370", "KEAU"]:
            self.current_price = self.quantity * get_current_price_investing(self.stock_code)
        elif self.stock_code in ["610030", "520043", "580035", "570074"]:
            self.current_price = self.quantity * get_current_price_naver(self.stock_code)
        elif self.stock_code in ["CKQ24", "CKU24", "CKV24", "CKX24", "CKZ24", "CKH25", "CKM25"]:
            self.current_price = self.quantity * get_current_price_barchart(self.stock_code)

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
        # stock_code가 'EUA'인 경우 70 반환
        if stock_code == 'EUA':
            return 70.0
        
        if stock_code == 'KEAU':
            return 24.37
        
        # 데이터 읽기
        df = fdr.DataReader(stock_code, '2024-08-07')

        # 첫 번째 행의 Close 값 추출
        close_value = float(df['Close'].iloc[0]) # 첫 번째 행의 Close 값
        return close_value
    except Exception as e:
        print(f"오류 발생: {e}")
        return None

def get_current_price_barchart(symbol):
    url = 'https://www.barchart.com/proxies/timeseries/historical/queryeod.ashx'

    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Accept': '/',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cookie': 'usprivacy=1---; bcFreeUserPageView=0; _gcl_au=1.1.750942898.1722835675; _gid=GA1.2.368862929.1722835676; webinarClosed=191; OptanonAlertBoxClosed=2024-08-05T07:21:52.602Z; alo_uid=6ddd31a2-9229-4f4a-9e09-1c503b78bc48; _pbjs_userid_consent_data=6683316680106290; sharedId=298add4b-e759-4564-a779-c73907ebcef5; market=eyJpdiI6InloblVCQW1wMStOZWlIclgvdUo5K3c9PSIsInZhbHVlIjoiMVNMS2VXRXdFWUdsZGt3RVR4OCttRytHTkRsbE9CKzVBcmtQZkZPaWtkOW4wTmI5VWRLZXUvck9xK2RCUnJzMCIsIm1hYyI6ImJlNDhhMTU4NGE0OWFmY2NhNDQ3MzBkNmZhMDFiYmE4NDEyMGU5YWRiNzNmNTc0YmU2NGI2MzRiZTIzODkyZTMiLCJ0YWciOiIifQ%3D%3D; ic_tagmanager=AY; _lr_geo_location_state=11; _lr_geo_location=KR; sharedId_last=Thu%2C%2008%20Aug%202024%2000%3A55%3A36%20GMT; DIANOMI-CLICK-COOKIE=a63f1fd325d897be994cf8bb3ea86438; __gads=ID=487e5ee600454ec1:T=1722835675:RT=1723089638:S=ALNI_Ma66gT5aK2fw29NLy7ggWZvgUHXqw; __gpi=UID=00000eb3edc45cc2:T=1722835675:RT=1723089638:S=ALNI_MaW_K4QwTgleiQ-1BKo0L4z2u9GEA; __eoi=ID=f0ddd3807fd60a1f:T=1722835675:RT=1723089638:S=AA-AfjZZTv9HowgDXWIsxZRVUFhF; _ga_PE0FK9V6VN=GS1.1.1723089672.17.1.1723089775.41.0.0; _ga=GA1.1.754077408.1722835675; _awl=2.1723089784.5-902d1f47e44bade0cdee810022eb20bd-6763652d617369612d6561737431-0; cto_bundle=i3_Z_19QSSUyRk5RUFZxeUkwakxDRmJpJTJGa1o1N0FTRTdRMm1HcDBjMUZwemM1eHRyNnl4OEJQb3FZYm5kd21OeUw4QkV1YXU2eVN6Z0ZVVmZpaHAyWmE3bXJROXY3MmdZaU12UkVKZE1xS3BGRUklMkZTbDdwTGN3ZEJ5RWx1OHRocWFrSGpqUHpzc1FHNTBNYjNrWEkwd0JPJTJGTDBmT2t1ek94VG1TZVM2eU14VlJ1c2VrVnBjZmtWbUUlMkIzcTNKYkVHc1FXenJ2; laravel_token=eyJpdiI6InhvS1c4RkRLR2ZuYlR4RVVpVUdLbWc9PSIsInZhbHVlIjoiZytoVHk3Tnh3WW5QdWhuVkdxSVY2UWZjZ0xjUzgveXZ4WWpFQW11NGdnN2k1bUhaOXVkZkNheWl6bmVRa202TUpKRXQ3c0Z6VHJ3Mndyam8xVEZrcFZiZnZoM0tiY05FRHRyaEVQa1JQVkNnc3h4ckZIazZpNFA2WVVrUkgzUm9raXUwTGhtVWc5UkVQVk1oZW5VVTZDcjYvTm5JYUd3SW9KdytiYjM1V2doNnBSTjQvNWZhR0h2OUxYUkNEbGxwUGplVmdlaE04VDBzbVZGSjBZZy9TUzIveUwxNkJPOGZTNUhPYkhibzZBWGFaNWV1SVY1b2k1NVJTUEV1ZnBHdHljZVBoT3FuNzR3cTB5cFdoMkpaZnZEY0ZIY2x1bnRhdy9ZWkx0eHlZc0NjREpxVjJYbGovdEhjalduOHRuOWIiLCJtYWMiOiJlYWJjN2RhODA3NDAxNzZlOWM2NGVmMTUwYmE0YjdkZWM4ZmI3YTFjMjhlZmRmNDU0MjgwZjY0ODY4NWUzNGI1IiwidGFnIjoiIn0%3D; XSRF-TOKEN=eyJpdiI6IkVJRGFoOVZzRzMraFptRjcwSFZWVmc9PSIsInZhbHVlIjoiK3doZDcxVFBLMy9SUmd5cGJIWGxvVE9rNi91T3g0cWpBcjNKTWkvZzJEWDN1M3piMndRMklnVnV0T3hMQ3pnQ2lUL1I3WUlyZTZLT0c5S25JY2kxbEZqYVdTTTJESmROVGdYNEVsZ2ZaT2E5N2dObXcwZHhxZlBVTm1kdzlNUTEiLCJtYWMiOiJhNDM2MGYwMjlhYzVjZGZkNmU5YTQ2Mjc5MWMxMTIzMjdlYjMyZjBlNWExOWJhZDc3NGYxNjBmMGYyODJmN2NkIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Im8yR0dJbXVUeElyQk13RUVSOGpqeVE9PSIsInZhbHVlIjoiMHJ2clFoaVFuT2FyRWpicysxVncvRE0zSmRqUG9GWVM4VmtNMDhkRndaQXViT2hndHp1cHIzQysrRi9JbEpqUk9tVm1VSmhPWjBOZEhxaVp2QXg3N2dKcEt4cUtKK0lCd3BYYzJSbzBKQnFoSGZnTUdtZHN4TjZVUnh1aVhHdjAiLCJtYWMiOiI5YzdjZTU0MDRmMzVkY2NjNjUwZjBlN2E5YjJmOWZiNjg5OWY1MmMyNjM4NTVhYmExMWZkM2MwYzQ1ZDBmYTU4IiwidGFnIjoiIn0%3D; IC_ViewCounter_www.barchart.com=5; OptanonConsent=isGpcEnabled=0&datestamp=Thu+Aug+08+2024+13%3A04%3A59+GMT%2B0900+(%ED%95%9C%EA%B5%AD+%ED%91%9C%EC%A4%80%EC%8B%9C)&version=202402.1.0&browserGpcFlag=0&isIABGlobal=false&consentId=e614fc49-09f3-48cf-951b-cd610d8f79bf&interactionCount=2&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0004%3A1%2CC0003%3A1%2CC0002%3A1&hosts=H309%3A1%2CH2%3A1%2CH353%3A1%2CH330%3A1%2CH4%3A1%2CH7%3A1%2CH9%3A1%2CH12%3A1%2CH331%3A1%2CH13%3A1%2CH14%3A1%2CH15%3A1%2CH17%3A1%2CH235%3A1%2CH19%3A1%2CH236%3A1%2CH237%3A1%2CH238%3A1%2CH26%3A1%2CH321%3A1%2CH239%3A1%2CH240%3A1%2CH27%3A1%2CH29%3A1%2CH30%3A1%2CH31%3A1%2CH32%3A1%2CH366%3A1%2CH35%3A1%2CH36%3A1%2CH242%3A1%2CH367%3A1%2CH243%3A1%2CH38%3A1%2CH244%3A1%2CH245%3A1%2CH246%3A1%2CH39%3A1%2CH40%3A1%2CH247%3A1%2CH41%3A1%2CH248%3A1%2CH43%3A1%2CH356%3A1%2CH312%3A1%2CH45%3A1%2CH46%3A1%2CH334%3A1%2CH47%3A1%2CH53%3A1%2CH54%3A1%2CH368%3A1%2CH57%3A1%2CH249%3A1%2CH250%3A1%2CH369%3A1%2CH60%3A1%2CH251%3A1%2CH61%3A1%2CH62%3A1%2CH63%3A1%2CH66%3A1%2CH253%3A1%2CH254%3A1%2CH69%3A1%2CH71%3A1%2CH72%3A1%2CH255%3A1%2CH357%3A1%2CH256%3A1%2CH370%3A1%2CH257%3A1%2CH231%3A1%2CH76%3A1%2CH81%3A1%2CH82%3A1%2CH258%3A1%2CH337%3A1%2CH259%3A1%2CH86%3A1%2CH338%3A1%2CH88%3A1%2CH261%3A1%2CH89%3A1%2CH262%3A1%2CH93%3A1%2CH94%3A1%2CH95%3A1%2CH340%3A1%2CH96%3A1%2CH265%3A1%2CH98%3A1%2CH266%3A1%2CH267%3A1%2CH101%3A1%2CH268%3A1%2CH269%3A1%2CH102%3A1%2CH326%3A1%2CH103%3A1%2CH106%3A1%2CH108%3A1%2CH109%3A1%2CH111%3A1%2CH270%3A1%2CH112%3A1%2CH271%3A1%2CH114%3A1%2CH116%3A1%2CH118%3A1%2CH358%3A1%2CH342%3A1%2CH121%3A1%2CH122%3A1%2CH274%3A1%2CH275%3A1%2CH125%3A1%2CH371%3A1%2CH126%3A1%2CH276%3A1%2CH359%3A1%2CH360%3A1%2CH129%3A1%2CH314%3A1%2CH130%3A1%2CH131%3A1%2CH278%3A1%2CH344%3A1%2CH279%3A1%2CH132%3A1%2CH135%3A1%2CH137%3A1%2CH280%3A1%2CH282%3A1%2CH361%3A1%2CH139%3A1%2CH140%3A1%2CH283%3A1%2CH142%3A1%2CH284%3A1%2CH143%3A1%2CH144%3A1%2CH146%3A1%2CH147%3A1%2CH285%3A1%2CH151%3A1%2CH372%3A1%2CH286%3A1%2CH153%3A1%2CH317%3A1%2CH157%3A1%2CH288%3A1%2CH233%3A1%2CH167%3A1%2CH168%3A1%2CH347%3A1%2CH289%3A1%2CH170%3A1%2CH171%3A1%2CH172%3A1%2CH364%3A1%2CH173%3A1%2CH174%3A1%2CH177%3A1%2CH291%3A1%2CH180%3A1%2CH292%3A1%2CH348%3A1%2CH228%3A1%2CH182%3A1%2CH183%3A1%2CH184%3A1%2CH293%3A1%2CH186%3A1%2CH187%3A1%2CH365%3A1%2CH294%3A1%2CH188%3A1%2CH295%3A1%2CH296%3A1%2CH349%3A1%2CH194%3A1%2CH297%3A1%2CH195%3A1%2CH298%3A1%2CH198%3A1%2CH199%3A1%2CH299%3A1%2CH350%3A1%2CH300%3A1%2CH202%3A1%2CH301%3A1%2CH205%3A1%2CH206%3A1%2CH302%3A1%2CH303%3A1%2CH304%3A1%2CH209%3A1%2CH210%3A1%2CH211%3A1%2CH212%3A1%2CH305%3A1%2CH214%3A1%2CH306%3A1%2CH373%3A1%2CH216%3A1%2CH307%3A1%2CH217%3A1%2CH308%3A1%2CH218%3A1%2CH352%3A1%2CH320%3A1%2CH241%3A1%2CH272%3A1&genVendors=&AwaitingReconsent=false&geolocation=KR%3B41',
        'Referer': f'https://www.barchart.com/futures/quotes/{symbol}/overview',
        'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"macOS"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'X-Xsrf-Token': 'eyJpdiI6IkVJRGFoOVZzRzMraFptRjcwSFZWVmc9PSIsInZhbHVlIjoiK3doZDcxVFBLMy9SUmd5cGJIWGxvVE9rNi91T3g0cWpBcjNKTWkvZzJEWDN1M3piMndRMklnVnV0T3hMQ3pnQ2lUL1I3WUlyZTZLT0c5S25JY2kxbEZqYVdTTTJESmROVGdYNEVsZ2ZaT2E5N2dObXcwZHhxZlBVTm1kdzlNUTEiLCJtYWMiOiJhNDM2MGYwMjlhYzVjZGZkNmU5YTQ2Mjc5MWMxMTIzMjdlYjMyZjBlNWExOWJhZDc3NGYxNjBmMGYyODJmN2NkIiwidGFnIjoiIn0='
    }

    params = {
        'symbol': symbol,
        'data': 'daily',
        'maxrecords': '640',
        'volume': 'contract',
        'order': 'asc',
        'dividends': 'false',
        'backadjust': 'false',
        'daystoexpiration': '1',
        'contractroll': 'combined'
    }

    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        # 데이터를 줄 단위로 분리
        lines = response.text.strip().split('\n')

        # 마지막 줄 선택
        last_line = lines[-1]

        # ,로 데이터 분리
        values = last_line.split(',')
        
        # 현재가 반환
        return float(values[5])
    else:
        print(f"오류 발생: {response.status_code}")
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