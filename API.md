# API Integration Documentation

This document describes all internal and external API integrations used by the Tubezip client application to fetch video metadata, download transcripts, generate AI summaries, and power contextual chat sessions.

---

## 1. YouTube Transcript AI

Public, open subtitle download service utilized to bypass standard CORS blocks on the frontend client.

- **Purpose**: Fetch raw video subtitles formatted with timestamps.
- **Endpoint**: `GET https://youtube-transcript.ai/transcript/{videoId}.txt`
- **Authentication**: None (Publicly available with `Access-Control-Allow-Origin: *` headers).
- **Rate Limits**: None documented; subject to standard IP rate-limiting.
- **Usage inside Tubezip**: Called inside [`SummaryTranscriptTabs.jsx`](src/components/dashboard/SummaryTranscriptTabs.jsx) to load transcripts directly from the browser. The returned plaintext string is sliced from the `## Transcript` marker and stripped of double-newlines.
- **Example Response**:
  ```markdown
  # Transcript: Intro to JavaScript
  Source video: https://www.youtube.com/watch?v=a-wVHL0lpb0
  
  ## Transcript
  [0:02] Welcome to the JavaScript course...
  [0:15] In this section we will cover variables...
  ```
- **Possible Errors**:
  - `404 Not Found`: Subtitles/captions are disabled or unavailable for this video ID.
  - `503 Service Unavailable`: Temporary server issues on the API provider side.

---

## 2. Groq Chat Completions API

High-speed Inference API compatible with the OpenAI completions schema.

- **Purpose**: Power AI summary compilation, transcript translations, and video-content Q&A.
- **Endpoint**: `POST https://api.groq.com/openai/v1/chat/completions`
- **Authentication**: Bearer token via the `Authorization: Bearer <VITE_GROQ_API_KEY>` header.
- **Rate Limits**: Governed by Groq's model limits (e.g., Llama 3.3 70B model rate-limits are listed on your Groq Console dashboard).
- **Usage inside Tubezip**:
  - **Summary**: Summarizes video context.
  - **Translation**: Translates transcripts to selected languages (Hindi, Spanish, French, English) while preserving timestamp format.
  - **Chat**: Answers user queries dynamically using the transcript as context.
- **Payload Format**:
  ```json
  {
    "model": "llama-3.3-70b-versatile",
    "messages": [
      { "role": "system", "content": "System guidelines here..." },
      { "role": "user", "content": "User prompt/transcript here..." }
    ],
    "temperature": 0.3
  }
  ```
- **Possible Errors**:
  - `401 Unauthorized`: Missing or invalid API key.
  - `429 Too Many Requests`: Exceeded token rate-limit or query rate-limit.
  - `503 Service Unavailable`: Groq model instances are temporarily overloaded.

---

## 3. YouTube Data API v3 (Videos Endpoint)

Official Google API to fetch video status and metadata details.

- **Purpose**: Retrieve precise video titles, descriptions, categories, and durations.
- **Endpoint**: `GET https://www.googleapis.com/youtube/v3/videos`
- **Authentication**: Query parameter key `?key=<VITE_YOUTUBE_API_KEY>`.
- **Rate Limits**: 10,000 quota units per day for Google Console projects. (Retrieval costs 1 unit).
- **Usage inside Tubezip**:
  - Used in [`SummaryTranscriptTabs.jsx`](src/components/dashboard/SummaryTranscriptTabs.jsx) as a backup mechanism: if the transcript fails, the AI uses the fetched video title and description as context to generate summaries.
  - Used in [`Suggestions.jsx`](src/components/dashboard/Suggestions.jsx) to determine original video keywords and audio language, ensuring relevant recommendations.
- **Possible Errors**:
  - `400 Bad Request`: Incorrect video ID or query formatting.
  - `403 Quota Exceeded / Forbidden`: Exceeded developer daily units or invalid API key.

---

## 4. YouTube Data API v3 (Search Endpoint)

Official Google API to retrieve search results matching query filters.

- **Purpose**: Query related educational videos to display in the Recommendations panel.
- **Endpoint**: `GET https://www.googleapis.com/youtube/v3/search`
- **Authentication**: Query parameter key `?key=<VITE_YOUTUBE_API_KEY>`.
- **Rate Limits**: Shared Google Developer quota. (Search costs 100 units).
- **Usage inside Tubezip**: Called in [`Suggestions.jsx`](src/components/dashboard/Suggestions.jsx) to pull up to 8 relevant videos based on the active video's title keywords, filtering for the original audio language to maintain continuity.
- **Possible Errors**:
  - `403 Quota Exceeded`: Daily query unit limit hit. (Fails gracefully to mock recommendations in client).
