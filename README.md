# Montco Midweek Bible Study Game

A lightweight, host-controlled game for a projected screen. The board includes 25 friendly clues and an optional finale based on the Knowing God series. See `HOST-REFERENCE.md` for lesson sources and hosting notes.

## Start

Open `index.html` in a modern browser. All files are local, with no accounts, dependencies, network connection, or build step. To host, upload the four application files (`index.html`, `styles.css`, `app.js`, and `game-data.js`) together to any static host.

## Add the series material

Edit `game-data.js` with a plain-text editor. Follow the existing structure: each category has a unique stable `id`, `name`, and array of `clues`; each clue has its own unique stable `id`, numeric `value`, `clue`, and `answer`, plus an optional `reference`. Use straight quotes and commas as in the example. Add only material checked against the series. Reload the page after editing. The interface reports malformed entries where possible; a JavaScript syntax error may prevent the data file from loading at all.

Categories can contain different numbers of clues; the optional finale is a separate object and can be removed. The board scrolls horizontally when needed. IDs should remain stable during a game, since played clues are tracked by ID.

## Host a game

Edit team names directly, add or remove teams, and type an amount next to a score before using + or −. Negative scores are allowed but never required. Choose a clue, optionally start the timer, reveal the answer, and mark it played when ready. Close a clue without marking it to leave it available. The score controls are on the main board; close the clue to adjust scores. Undo reverses the last team or played-clue change. Reset asks for confirmation and restores two teams and an unplayed board.

Progress, including an open clue and running timer, is saved in the current browser on the current device when browser storage is available. Browser storage can be cleared by the browser or unavailable in some private modes; do not rely on it as a permanent backup. Resetting game data does not edit `game-data.js`. Test the data and game on the actual presentation device before the gathering.
