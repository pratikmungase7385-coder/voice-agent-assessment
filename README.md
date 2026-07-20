# Restaurant Voice Agent

## Features

- Menu Grounding
- Order State Management
- Add Item
- Remove Item
- Modify Quantity
- Recommendations
- Availability Checking

## Run

npm install

npx ts-node src/cli.ts

## Architecture

User Input
↓
Agent
↓
Tools
↓
Order State
↓
Response

## Assumptions

- STT/TTS mocked
- Menu stored in JSON
- CLI based interface