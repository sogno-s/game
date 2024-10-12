const ws = new WebSocket('ws://localhost:8080');
ws.onopen = () => {
    console.log('Соединение установлено');
};

ws.onmessage = (event) => {
    console.log('Получено сообщение:', event.data);
    const data = JSON.parse(event.data);

    if (data.type === 'start') {
        const handDiv = document.getElementById('hand');
        const opponentHandDiv = document.getElementById('opponentHand');

        handDiv.innerHTML = '';
        opponentHandDiv.innerHTML = '';

        //отображение карт
        data.hand.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.textContent = `${card.rank} ${card.suit}`;
            handDiv.appendChild(cardDiv);
        });

        //отображение карт противника
        data.opponentHand.forEach(card => {
            const cardDiv = document.createElement('div')
            cardDiv.className = 'card-unknown'
            cardDiv.textContent = '?'
            opponentHandDiv.appendChild(cardDiv)
        })
    }
};

ws.onerror = (error) => {
    console.error('Ошибка WebSocket:', error);
};

ws.onclose = () => {
    console.log('Соединение закрыто');
};