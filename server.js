const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const players = [];
const deck = [];
const suits = ['♡', '♢', '♧', '♤'];
const ranks = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Создаем колоду карт
function createDeck() {
    suits.forEach(suit => {
        ranks.forEach(rank => {
            deck.push({ suit, rank });
        });
    });
    shuffleDeck();
}

// Перемешиваем колоду
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}
//раздача
function dealCards(){
    players.forEach(player=>{
        player.hand = deck.splice(0,6)
    })
}

wss.on('connection', (ws) => {
    if (players.length >= 2) {
        ws.send('Игра уже началась')
        ws.close()
        return
    }
    console.log('подключение произошо')
    const player = {ws, hand: []};
    players.push(player)

    if (players.length === 2){
        createDeck()
        dealCards()

        console.log(`Sending to player :`);


        players.forEach((player, index) => {
            const opponentHand = new Array(6).fill({suit: 'unknown', rank: 'unknown'})
            console.log(`Sending to player ${index}:`, { type: 'start', hand: player.hand, opponentHand });
            player.ws.send(JSON.stringify({type: 'start', hand: player.hand, opponentHand}))

        })

        ws.on('close', () => {
            const index = players.indexOf(player)
            if (index!==-1) players.splice(index, 1)
        })
    }
})

server.listen(8080, ()=>{
    console.log('на порту 8080')
})