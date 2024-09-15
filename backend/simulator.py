from gtts import gTTS
import pyttsx3
import pygame
from io import BytesIO

def TTS_simulator(article_text, selected_voice, voice_speed, model):
    try:
        if model == 'gTTS':
            pygame.init()
            pygame.mixer.init()
            
            audio_bytes = BytesIO()
            tts_gtts = gTTS(text=article_text, lang="en")
            tts_gtts.write_to_fp(audio_bytes)
            audio_bytes.seek(0)
            pygame.mixer.music.load(audio_bytes, 'mp3')
            pygame.mixer.music.play()
        
        elif model == 'pyttsx3':  
            engine = pyttsx3.init()  
            voices = engine.getProperty('voices')
            
            if selected_voice == 'Male':
                engine.setProperty('voice', voices[0].id)
            elif selected_voice == 'Female':
                engine.setProperty('voice', voices[1].id)
            
            engine.setProperty('rate', voice_speed)
            engine.say(article_text)
            engine.runAndWait()
            engine.stop()
        
        else:
            raise ValueError("Invalid model specified")
    
    except Exception as e:
        print(f"Error in TTS_simulator: {e}")
        raise
