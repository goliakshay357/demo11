from flask import Flask,url_for,request,jsonify
# from flask_cors import CORS
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def home():
  return "Hello world"

@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
  if request.method == 'POST':
    data = request.json
    print(data)
    print('\n')
    
    # data.headers.add('Access-Control-Allow-Origin', '*')
  return data


if __name__ == "__main__":
  app.run(debug = True)