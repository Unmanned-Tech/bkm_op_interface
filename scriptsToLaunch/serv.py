from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/send_command', methods=['POST'])
def send_command():
    try:
        command = request.json['command']
        import subprocess
        result = subprocess.run(command.split(), capture_output=True, text=True)
        return result.stdout
    except Exception as e:
        return str(e)
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='5000')