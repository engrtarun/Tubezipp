# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-20

This is the initial release of Tubezip as part of the Hackathon submission.

### Added

#### Landing Page
- Designed a modern, premium landing page with hero header and search utilities.
- Implemented an interactive, auto-playing **Feature Carousel** showcasing smart notes, transcripts, AI chat, and export capabilities.
- Added responsive structural sections outlining features and user workflow guidelines.

#### Dashboard
- Implemented a dual-pane workspace containing the video player, suggestions, and learning tabs.
- Added responsive layouts optimized for desktops, tablets, and mobile screens.

#### Video Player
- Created a custom embedded player wrapper utilizing the official YouTube IFrame Embed API.
- Enabled auto-play on load and video status tracking.

#### AI Summary
- Added integration with the **Groq API** running the Llama 3.3 70B model to generate summary cards.
- Supports structured markdown summaries containing bold terms, lists, and formatted code blocks.
- Supports multi-lingual summaries (Hindi, Hinglish, English, etc.) based on video content.

#### Transcript
- Switched to the open, CORS-enabled **`youtube-transcript.ai`** service for fast, zero-delay transcript downloads.
- Added support for translation into multiple languages (Spanish, French, Hindi, English) with Groq.

#### Smart Suggestions
- Added dynamic, context-aware suggestions showcasing related videos to fill learning gaps.
- Handles automated fallback to curated mock videos if the YouTube API quota is exceeded.

#### Export Options
- Integrated 1-click export controls to Notion, Markdown download, raw plaintext files, or copy to clipboard.

### Improved
- **API Performance**: Cleaned up legacy backend fetch queries from the landing page load state, saving up to 300 YouTube API units per visitor.
- **Error Handling**: Wrapped Groq API calls in strict error handlers with visible user warning dialogs.
- **Scrollbar Styling**: Implemented custom scrollbars and viewport styling to optimize screen real estate.
