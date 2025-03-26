import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import './index.css';

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  const extractVideoId = (url) => {
    const match = url.match(/(?:v=|youtu\.be\/|\/embed\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSummary(null);
    setError('');
    setLoading(true);

    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      setError('Invalid YouTube URL.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`https://1e32-187-150-199-134.ngrok-free.app/summarize?video_id=${videoId}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      const data = await res.json(); // ✅ Only call this once
    
      if (res.status === 429) {
        setError(`${data.error} (${data.retry_after_seconds} sec)`);
      } else if (res.ok) {
        setSummary(data);
      } else {
        setError(data.error || 'An error occurred.');
      }
    } catch (err) {
      setError('Failed to fetch summary.');
    }

    setLoading(false);
  };

  return (
    <>
    <Helmet>
      <title>Narrify – Instantly Summarize YouTube Videos with AI</title>
      <meta name="description" content="Narrify summarizes YouTube videos instantly using AI. Just paste a link and get the key ideas, steps, or takeaways in seconds." />
      <meta name="keywords" content="YouTube summary, AI video summarizer, summarize YouTube video, YouTube transcript, explain video content, summarize video with AI, educational tool, video highlights, productivity tools" />
      <meta name="author" content="Mindware" />

      {/* Open Graph for Facebook, LinkedIn, etc. */}
      <meta property="og:title" content="Narrify – Instantly Summarize YouTube Videos with AI" />
      <meta property="og:description" content="Paste a YouTube link and Narrify instantly summarizes it using AI. Save time, get key insights fast." />
      <meta property="og:image" content="https://narrify.cloud/images/narrify-logo.png" />
      <meta property="og:url" content="https://narrify.cloud" />
      <meta property="og:type" content="website" />

      {/* Twitter card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Narrify – Instantly Summarize YouTube Videos with AI" />
      <meta name="twitter:description" content="AI-based YouTube summarizer. Paste a video link and Narrify gives you an instant, clean summary." />
      <meta name="twitter:image" content="https://narrify.cloud/images/narrify-logo.png" />
    </Helmet>
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-10 text-center">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/images/narrify.png"
            alt="Narrify logo"
            className="w-40 mb-2"
          />
        </div>

        <p className="text-gray-600 mb-6">
          Paste any YouTube link and get a smart, concise summary of what the video is about.
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter a YouTube video URL yes"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition"
          >
            {loading ? 'Narrifying...' : '🎙️ Narrify this Video'}
          </button>
        </form>

        {error && <p className="text-red-600 font-medium mt-4">{error}</p>}

        {summary && (
          <div className="mt-8 text-left space-y-4">
          {/* Title + Thumbnail side-by-side */}
          <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{
                decodeURIComponent(escape(summary.title))}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Channel: {decodeURIComponent(escape(summary.channel))}
              </p>
            </div>
        
            {/* YouTube thumbnail or video embed */}
            <div className="w-full md:w-64 shrink-0">
              <div className="aspect-video rounded-xl overflow-hidden border shadow-sm">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${summary.video_id}`}
                  title={summary.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        
          {/* Full-width summary */}
          <pre className="whitespace-pre-wrap text-base bg-gray-50 p-6 rounded-xl border border-gray-200 overflow-x-auto">
            {summary.summary}
          </pre>
        </div>
        )}
      </div>
      <section className="mt-16 max-w-4xl mx-auto text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🛠️ How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8 text-left text-gray-700">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">1️⃣ Paste a YouTube Link</h3>
            <p>Just copy the URL of any public YouTube video and paste it in the box above. We’ll take it from there.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">2️⃣ We Read the Video</h3>
            <p>We pull the video transcript, analyze it with AI, and understand the key message, arguments, or steps.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">3️⃣ Get a Smart Summary</h3>
            <p>In seconds, you get a clean, structured summary you can read faster than watching the full video.</p>
          </div>
        </div>
      </section>
      <footer className="mt-12 text-center text-gray-400 text-sm">
        © 2025 <a href="https://mindware.com.mx" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Mindware.com.mx</a>
      </footer>
    </div>
    </>
  );
}

export default App;
