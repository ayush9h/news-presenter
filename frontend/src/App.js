import React, { useState } from "react";
import axios from "axios";

function App() {
  const [newsArticle, setNewsArticle] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("Male");

  const [avatarImage, setAvatarImage] = useState(
    `./avatars/idle-${selectedVoice.toLowerCase()}.svg`
  );
  const [voiceSpeed, setVoiceSpeed] = useState(100);
  const [TTSModel, setTTSModel] = useState("pyttsx3");

  const [status, setStatus] = useState("");
  const handleReadNews = async () => {
    setAvatarImage(`./avatars/speaking-${selectedVoice.toLowerCase()}.svg`);

    try {
      const response = await axios.post(
        "https://news-presenter.onrender.com/text-to-speech",
        {
          article_text: newsArticle,
          selected_voice: selectedVoice,
          voice_speed: voiceSpeed,
          model: TTSModel,
        }
      );

      setStatus(response.data.message);
    } catch (error) {
      setStatus("Error occurred during processing of request");
      console.error("Error details:", error.response);
    } finally {
      setAvatarImage(`./avatars/idle-${selectedVoice.toLowerCase()}.svg`);
    }
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto flex justify-center items-center text-center p-8">
        <h1 className="text-2xl uppercase font-semibold">News Article Presenter</h1>
      </div>
      
      <div className="max-w-screen-xl mx-auto">
        {status && <p>{status}</p>}
      </div>
      
      <div className='max-w-screen-xl mx-auto grid grid-cols-2 space-x-4'>
        <div className='mt-12 bg-white shadow-lg border border-zinc-600 rounded-md p-8'>
          {/* Model Selection */}
          <div>
            <label className='text-black font-mono uppercase'>
              Select the TTS model:{" "}
            </label>
            <select
              value={TTSModel}
              onChange={(e) => setTTSModel(e.target.value)}
              className='ml-2 p-2 rounded-md bg-white text-black border border-zinc-400 font-mono'>
              <option value='pyttsx3'>pyttsx3</option>
              <option value='gTTS'>gTTS</option>
            </select>

            <div className='grid grid-cols-2 gap-2 w-full'>
              {/* Voice Speed  */}
              {TTSModel == "pyttsx3" && (
                <div className='mt-12'>
                  <label className='text-black font-mono uppercase'>
                    Select your voice speed:
                  </label>
                  <input
                    value={voiceSpeed}
                    onChange={(e) => setVoiceSpeed(e.target.value)}
                    type='range'
                    min={50}
                    max={200}
                    step={5}
                  />
                  {voiceSpeed}
                </div>
              )}

              {/* Voice Select */}
              {TTSModel == "pyttsx3" && (
                <div className='mt-12'>
                  <label className='text-black font-mono uppercase'>
                    Select Voice:{" "}
                  </label>
                  <select
                    value={selectedVoice}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                    className='ml-2 p-2 rounded-md bg-white text-black border border-slate-500 font-mono text-lg'>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                  </select>
                </div>
              )}
            </div>

            {/* Text Area */}
            <div className='mt-12'>
              <textarea rows={5} cols={66} placeholder="Enter the news article" value={newsArticle} onChange={(e)=>setNewsArticle(e.target.value)} className="border border-zinc-400 p-2"></textarea>
                
            </div>

            <button
              onClick={handleReadNews}
              className='bg-white px-4 py-2 text-black font-semibold border border-zinc-400 rounded-md text-lg mt-8 hover:bg-gray-300 hover:transition-all'>
              Read Aloud
            </button>

          </div>
        </div>

        <div className='flex justify-center items-center'>
          <img src={avatarImage} alt='Avatar' className='w-64'></img>
        </div>
      </div>
    </>
  );
}

export default App;
