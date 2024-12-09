# YOUR PROJECT TITLE
#### Video Demo:  <https://youtu.be/L3dTw9Bl9Wk>
#### Description:

# Memory Card Game
Overview
The Memory Card Game is an interactive browser-based game built with React. The objective of the game is to click on unique cards without selecting the same card twice. As the game progresses, the cards shuffle, increasing the challenge of remembering which ones you’ve already selected. This project was developed as part of a learning module to enhance proficiency in React state management, component-based architecture, and modern styling techniques.

This README serves to document the structure, design choices, and functionality of the project. It outlines each file's role, the technologies used, and the reasoning behind key decisions.

# Features
Dynamic Gameplay: Cards shuffle each time they are clicked, making the game more challenging.
Score Tracking: Displays both the current score and the high score, encouraging replayability.
Interactive Feedback: Visual and auditory feedback for correct and incorrect card selections.
Responsive Design: Ensures a smooth experience across different devices and screen sizes.

# File Descriptions
src/App.jsx
The main entry point for the application. This file manages the overall structure of the game and initializes the state variables score and highScore. It also includes the layout for the title, instructions, and score display. The LeagueCards component is embedded here to display the game's card grid.

# src/components/LeagueCards.jsx
This component renders the game’s card grid. Each card is displayed using the ReactCardFlip and ReactParallaxTilt libraries to create smooth flipping and tilting effects. It is responsible for:

### Generating the card grid based on the provided championCards data.
### Handling user interactions by invoking the checkWin function.
### Animating the card flipping through the handleFlip function.

# src/components/Popup.jsx
A reusable modal component that appears at the end of the game. It displays a message ("You Win!" or "You Lose!") and provides options to restart the game. This component ensures a clear and concise user experience.

# src/assets/sound_effects/
Contains MP3 files for sound effects that play during gameplay. These include sounds for correct and incorrect selections. These files are preloaded and referenced in the checkWin function for intuitive feedback.

# src/styles/global.css
Holds global styles such as typography, spacing, and default body styling. A combination of Google Fonts (Press Start 2P and Poppins) is used to provide a retro yet modern aesthetic.

# src/styles/LeagueCards.module.css
Contains styles specific to the LeagueCards component. It ensures the cards remain consistent in size and layout, regardless of flipping or shuffling. It also includes hover effects to enhance interactivity.

# Design Decisions
###  State Management
State variables such as score, highScore, and selectedCards are managed using React’s useState hook. This choice was made for simplicity and ease of state tracking within the component hierarchy. While alternatives like Redux were considered, the application’s scope did not warrant such complexity.

### Card Animation
The decision to use ReactCardFlip and ReactParallaxTilt was driven by their lightweight nature and compatibility with React. These libraries simplify the implementation of visually appealing animations, enhancing the user experience without significant performance trade-offs.

### Sound Effects
Sound effects were included to provide immediate feedback for user actions. This addition improves engagement and helps players understand the outcome of their selections. The sounds are kept small in size to ensure fast loading times.

### Responsive Design
CSS Grid was chosen for the card layout because of its simplicity and flexibility in creating responsive designs. This ensures the game functions well on both desktop and mobile devices.

### Error Handling
Error boundaries were considered but not implemented in this version of the app due to time constraints. Future iterations could include error handling for missing or corrupted images.

# Challenges and Trade-offs
### Shuffling Logic: Ensuring the cards shuffle without affecting their unique identifiers was a challenge. A Fisher-Yates shuffle algorithm was eventually used to maintain the game’s integrity.

### State Reset on Loss: Resetting the game state (selectedCards and score) without affecting other components required careful design of the checkWin function.

### Audio Playback Issues: Initially, sound effects failed to load due to missing imports. The issue was resolved by explicitly importing audio files as modules and preloading them for seamless playback.