import React, { useState, ChangeEvent, FormEvent } from 'react';

interface UTMParams {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
}

const HomePage: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [customSlug, setCustomSlug] = useState<string>('');
  const [utmParams, setUtmParams] = useState<UTMParams>({
    source: '',
    medium: '',
    campaign: '',
    term: '',
    content: '',
  });
  const [expLocal, setExpLocal] = useState<string>('');
  const [expUTC, setExpUTC] = useState<string | null>(null);
  const [shortenedUrl, setShortenedUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUrl(e.target.value);
  const handleSlugChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCustomSlug(e.target.value);

  const getMinDateTime = () => {
    const now = new Date();
    now.setSeconds(0, 0);
    return now.toISOString().slice(0, 16);
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const localInput = e.target.value;
    setExpLocal(localInput);

    if (localInput) {
      const utcDateString = new Date(localInput).toISOString();
      console.log('utcDateString', utcDateString);
      setExpUTC(utcDateString);
    } else {
      setExpUTC(null);
    }
  };

  const handleUtmChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUtmParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          customSlug,
          exp: expUTC,
          utm: utmParams,
        }),
      });
      const data = await response.json();
      setShortenedUrl(data.shortenedUrl);
      console.log('data.shortenedUrl', data.shortenedUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">URL Shortener</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Original URL</label>
            <input
              type="url"
              value={url}
              onChange={handleUrlChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">
              Custom Slug (Optional)
            </label>
            <input
              type="text"
              value={customSlug}
              onChange={handleSlugChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">Expiration Date</label>
            <input
              type="datetime-local"
              value={expLocal}
              onChange={handleExpirationChange}
              min={getMinDateTime()}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="text-gray-700">UTM Parameters (Optional)</div>
          <div className="grid grid-cols-2 gap-2">
            <input
              name="source"
              value={utmParams.source}
              onChange={handleUtmChange}
              placeholder="Source"
              className="p-2 border border-gray-300 rounded-md"
            />
            <input
              name="medium"
              value={utmParams.medium}
              onChange={handleUtmChange}
              placeholder="Medium"
              className="p-2 border border-gray-300 rounded-md"
            />
            <input
              name="campaign"
              value={utmParams.campaign}
              onChange={handleUtmChange}
              placeholder="Campaign"
              className="p-2 border border-gray-300 rounded-md"
            />
            <input
              name="term"
              value={utmParams.term}
              onChange={handleUtmChange}
              placeholder="Term"
              className="p-2 border border-gray-300 rounded-md"
            />
            <input
              name="content"
              value={utmParams.content}
              onChange={handleUtmChange}
              placeholder="Content"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Shortening...' : 'Generate Short URL'}
          </button>
        </form>

        {shortenedUrl && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Your Shortened URL:</h3>
            <a
              href={shortenedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {shortenedUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
