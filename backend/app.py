from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from simulator import TTS_simulator

app = Flask(__name__)
CORS(app)

@app.route('/text-to-speech', methods = ['POST'])
def tts():
    try:
        data = request.json
        article_text = data.get('article_text')
        selected_voice = data.get('selected_voice')
        voice_speed = data.get('voice_speed')
        model = data.get('model')
        
        if not article_text:
            raise ValueError("Article text is required")
        
        TTS_simulator(article_text, selected_voice, voice_speed, model)
        
        return jsonify({
            'status':"success",
            "message": "Audio played successfully"
        })
    except Exception as e:
        print(f"Error: {e}")
        
        return jsonify({
            'status':'error',
            'message':"An error occurred while procesing your request"
        })
        

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))
