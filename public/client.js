const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === 'start') {
        const handDiv = document.getElementById('hand');
        data.hand.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.textContent = `${card.rank} ${card.suit}`;
            handDiv.appendChild(cardDiv);
        });
    }
};