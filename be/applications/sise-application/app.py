from flask import Flask

app = Flask(__name__)

@app.route('/api/sise')
def hello():
    return 'Hello Flask World'

if __name__ == '__main__':
    app.run('0.0.0.0', port=8085, debug=True)