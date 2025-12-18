// game.js - TODO EL JUEGO EN UN ARCHIVO

// ============================
// VARIABLES GLOBALES DEL JUEGO
// ============================

const gameData = {
    mode: 'quick',
    players: [],
    currentPlayerIndex: 0,
    properties: [
        { id: 1, name: "Mediterránea", color: "#8B4513", price: 60, rent: 2, position: 1 },
        { id: 2, name: "Báltica", color: "#8B4513", price: 60, rent: 4, position: 3 },
        { id: 3, name: "Oriental", color: "#87CEEB", price: 100, rent: 6, position: 6 },
        { id: 4, name: "Vermont", color: "#87CEEB", price: 100, rent: 6, position: 8 },
        { id: 5, name: "Connecticut", color: "#87CEEB", price: 120, rent: 8, position: 9 },
        { id: 6, name: "San Carlos", color: "#FFB6C1", price: 140, rent: 10, position: 11 },
        { id: 7, name: "Estados", color: "#FFB6C1", price: 140, rent: 10, position: 13 },
        { id: 8, name: "Virginia", color: "#FFB6C1", price: 160, rent: 12, position: 14 },
        { id: 9, name: "San James", color: "#FFA500", price: 180, rent: 14, position: 16 },
        { id: 10, name: "Tennessee", color: "#FFA500", price: 180, rent: 14, position: 18 },
        { id: 11, name: "Nueva York", color: "#FFA500", price: 200, rent: 16, position: 19 },
        { id: 12, name: "Kentucky", color: "#FF0000", price: 220, rent: 18, position: 21 },
        { id: 13, name: "Indiana", color: "#FF0000", price: 220, rent: 18, position: 23 },
        { id: 14, name: "Illinois", color: "#FF0000", price: 240, rent: 20, position: 24 },
        { id: 15, name: "Atlántico", color: "#FFFF00", price: 260, rent: 22, position: 26 },
        { id: 16, name: "Ventnor", color: "#FFFF00", price: 260, rent: 22, position: 27 },
        { id: 17, name: "Marvin", color: "#FFFF00", price: 280, rent: 24, position: 29 },
        { id: 18, name: "Pacífico", color: "#008000", price: 300, rent: 26, position: 31 },
        { id: 19, name: "Carolina", color: "#008000", price: 300, rent: 26, position: 32 },
        { id: 20, name: "Pensilvania", color: "#008000", price: 320, rent: 28, position: 34 },
        { id: 21, name: "Park", color: "#000080", price: 350, rent: 35, position: 37 },
        { id: 22, name: "Marítimo", color: "#000080", price: 400, rent: 50, position: 39 }
    ],
    gameLog: [],
    maxTurns: 3,
    doubleCount: 0
};

const tokens = [
    { id: 'red', color: '#f44336', symbol: '🎩', name: 'Sombrero' },
    { id: 'blue', color: '#2196F3', symbol: '🚗', name: 'Coche' },
    { id: 'green', color: '#4CAF50', symbol: '🐶', name: 'Perro' },
    { id: 'yellow', color: '#FFEB3B', symbol: '🚢', name: 'Barco' },
    { id: 'purple', color: '#9C27B0', symbol: '🎮', name: 'Control' },
    { id: 'orange', color: '#FF9800', symbol: '👑', name: 'Corona' }
];

const botNames = ["Matemático", "Calculador", "Genio", "Profe", "Robot"];

// ============================
// INICIALIZACIÓN
// ============================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Math-opoly cargado!');
    initGame();
});

function initGame() {
    // 1. Configurar pantalla de inicio
    setupStartScreen();
    
    // 2. Configurar lobby
    setupLobby();
    
    // 3. Configurar juego
    setupGame();
    
    // 4. Generar tablero
    generateBoard();
    
    // 5. Agregar jugadores iniciales en lobby
    addInitialPlayers();
}

// ============================
// PANTALLA DE INICIO
// ============================

function setupStartScreen() {
    // Botón Modo Local
    const localBtn = document.getElementById('local-btn');
    const playBtn = document.getElementById('play-btn');
    
    if (localBtn) {
        localBtn.addEventListener('click', function() {
            // Quitar cualquier selección previa
            document.querySelectorAll('.mode-btn').forEach(btn => {
                btn.style.transform = 'none';
                btn.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            });
            
            // Resaltar botón local
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(76, 175, 80, 0.6)';
            
            // Habilitar botón JUGAR
            playBtn.disabled = false;
            playBtn.style.opacity = '1';
            playBtn.style.cursor = 'pointer';
            
            // Guardar que se seleccionó modo local
            playBtn.dataset.mode = 'local';
        });
        
        // Simular clic en modo local al cargar
        setTimeout(() => localBtn.click(), 100);
    }
    
    // Botón JUGAR
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            if (this.disabled) {
                alert('Por favor, selecciona el MODO LOCAL primero');
                return;
            }
            
            // Ir al lobby
            showScreen('lobby-screen');
            
            // Inicializar jugadores en el lobby
            setTimeout(addInitialPlayers, 100);
        });
    }
    
    // Botón Online (deshabilitado)
    const onlineBtn = document.getElementById('online-btn');
    if (onlineBtn) {
        onlineBtn.addEventListener('click', function() {
            alert('El modo online estará disponible próximamente');
        });
    }
}

// ============================
// LOBBY
// ============================

function setupLobby() {
    // Botón volver
    const backBtn = document.getElementById('back-to-menu');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            showScreen('start-screen');
        });
    }
    
    // Botones modo de juego
    const modeButtons = document.querySelectorAll('.game-mode-btn');
    modeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            modeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            gameData.mode = this.dataset.mode;
        });
    });
    
    // Botón agregar jugador humano
    const addHumanBtn = document.getElementById('add-human');
    if (addHumanBtn) {
        addHumanBtn.addEventListener('click', addHumanPlayer);
    }
    
    // Botón agregar bot
    const addBotBtn = document.getElementById('add-bot');
    if (addBotBtn) {
        addBotBtn.addEventListener('click', addBotPlayer);
    }
    
    // Botón limpiar jugadores
    const clearBtn = document.getElementById('clear-players');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            document.getElementById('players-list').innerHTML = '';
            addInitialPlayers();
            updatePlayerCount();
        });
    }
    
    // Botón comenzar juego
    const startBtn = document.getElementById('start-game-btn');
    if (startBtn) {
        startBtn.addEventListener('click', startGame);
    }
}

function addInitialPlayers() {
    const playersList = document.getElementById('players-list');
    if (!playersList) return;
    
    // Limpiar lista
    playersList.innerHTML = '';
    
    // Agregar 2 jugadores por defecto
    for (let i = 1; i <= 2; i++) {
        addPlayerToLobby(`Jugador ${i}`, false);
    }
    
    updatePlayerCount();
}

function addHumanPlayer() {
    const playerCount = document.querySelectorAll('.player-row').length;
    if (playerCount >= 6) {
        alert('Máximo 6 jugadores');
        return;
    }
    
    addPlayerToLobby(`Jugador ${playerCount + 1}`, false);
    updatePlayerCount();
}

function addBotPlayer() {
    const playerCount = document.querySelectorAll('.player-row').length;
    if (playerCount >= 6) {
        alert('Máximo 6 jugadores');
        return;
    }
    
    const randomName = botNames[Math.floor(Math.random() * botNames.length)];
    addPlayerToLobby(`${randomName} (Bot)`, true);
    updatePlayerCount();
}

function addPlayerToLobby(name, isBot) {
    const playersList = document.getElementById('players-list');
    
    // Encontrar token disponible
    const usedTokens = Array.from(playersList.querySelectorAll('.token-select'))
        .map(select => select.value);
    const availableTokens = tokens.filter(token => !usedTokens.includes(token.id));
    
    if (availableTokens.length === 0) {
        alert('No hay más tokens disponibles');
        return;
    }
    
    const token = availableTokens[0];
    
    const playerRow = document.createElement('div');
    playerRow.className = 'player-row';
    playerRow.innerHTML = `
        <input type="text" class="player-name-input" value="${name}" ${isBot ? 'readonly' : ''}>
        <select class="token-select" ${isBot ? 'disabled' : ''}>
            ${tokens.map(t => 
                `<option value="${t.id}" ${t.id === token.id ? 'selected' : ''}>
                    ${t.symbol} ${t.name}
                </option>`
            ).join('')}
        </select>
        <div class="token-preview" style="background-color: ${token.color}">
            ${token.symbol}
        </div>
    `;
    
    // Actualizar preview cuando cambie el token
    const tokenSelect = playerRow.querySelector('.token-select');
    const tokenPreview = playerRow.querySelector('.token-preview');
    
    tokenSelect.addEventListener('change', function() {
        const selectedToken = tokens.find(t => t.id === this.value);
        tokenPreview.style.backgroundColor = selectedToken.color;
        tokenPreview.innerHTML = selectedToken.symbol;
    });
    
    playersList.appendChild(playerRow);
}

function updatePlayerCount() {
    const count = document.querySelectorAll('.player-row').length;
    const countElement = document.getElementById('player-count');
    if (countElement) {
        countElement.textContent = `(${count})`;
    }
}

// ============================
// INICIAR JUEGO
// ============================

function startGame() {
    const playersList = document.querySelectorAll('.player-row');
    
    if (playersList.length < 2) {
        alert('Se necesitan al menos 2 jugadores');
        return;
    }
    
    // Configurar jugadores
    gameData.players = [];
    const usedNames = new Set();
    
    playersList.forEach((row, index) => {
        const nameInput = row.querySelector('.player-name-input');
        const tokenSelect = row.querySelector('.token-select');
        
        const playerName = nameInput.value.trim();
        if (!playerName) {
            alert(`El jugador ${index + 1} no tiene nombre`);
            return;
        }
        
        if (usedNames.has(playerName)) {
            alert(`Ya hay un jugador llamado "${playerName}"`);
            return;
        }
        usedNames.add(playerName);
        
        const token = tokens.find(t => t.id === tokenSelect.value);
        const isBot = playerName.includes('(Bot)');
        
        gameData.players.push({
            id: index + 1,
            name: playerName,
            tokenColor: token.color,
            tokenSymbol: token.symbol,
            money: 1500,
            position: 0,
            properties: [],
            isBot: isBot,
            isBankrupt: false,
            laps: 0
        });
    });
    
    if (gameData.players.length < 2) return;
    
    // Reiniciar estado del juego
    gameData.currentPlayerIndex = 0;
    gameData.doubleCount = 0;
    gameData.gameLog = [];
    
    // Mostrar pantalla de juego
    showScreen('game-screen');
    
    // Inicializar juego
    setTimeout(() => {
        updatePlayersPanel();
        updateGameInfo();
        
        const currentTurnPlayer = document.getElementById('current-player-turn');
        if (currentTurnPlayer) {
            currentTurnPlayer.textContent = `Turno de: ${gameData.players[0].name}`;
        }
        
        const gameModeIndicator = document.getElementById('game-mode-indicator');
        if (gameModeIndicator) {
            gameModeIndicator.textContent = `Modo: ${gameData.mode === 'quick' ? 'Rápido' : 'Normal'}`;
        }
        
        addToLog(`¡El juego ha comenzado!`);
        addToLog(`Modo: ${gameData.mode === 'quick' ? 'Rápido (3 vueltas)' : 'Normal'}`);
        addToLog(`Jugadores: ${gameData.players.map(p => p.name).join(', ')}`);
        addToLog(`Es el turno de ${gameData.players[0].name}`);
    }, 500);
}

// ============================
// PANTALLA DE JUEGO
// ============================

function setupGame() {
    // Botón lanzar dados
    const rollBtn = document.getElementById('roll-dice-btn');
    if (rollBtn) {
        rollBtn.addEventListener('click', rollDice);
    }
    
    // Botón vender propiedad
    const sellBtn = document.getElementById('sell-btn');
    if (sellBtn) {
        sellBtn.addEventListener('click', showSellModal);
    }
    
    // Botones limpiar registro
    const clearLogBtns = document.querySelectorAll('#clear-log-btn, #clear-log-small');
    clearLogBtns.forEach(btn => {
        btn.addEventListener('click', clearGameLog);
    });
    
    // Botón volver al lobby
    const backToLobbyBtn = document.getElementById('back-to-lobby-btn');
    if (backToLobbyBtn) {
        backToLobbyBtn.addEventListener('click', function() {
            if (confirm('¿Estás seguro de que quieres salir? Se perderá el progreso del juego.')) {
                showScreen('lobby-screen');
                addInitialPlayers();
            }
        });
    }
    
    // Botón volver desde resultados
    const backFromResultsBtn = document.getElementById('back-to-lobby-from-results');
    if (backFromResultsBtn) {
        backFromResultsBtn.addEventListener('click', function() {
            showScreen('lobby-screen');
            addInitialPlayers();
        });
    }
    
    // Botones modales
    const buyBtn = document.getElementById('buy-btn');
    const declineBtn = document.getElementById('decline-btn');
    const confirmSellBtn = document.getElementById('confirm-sell-btn');
    const cancelSellBtn = document.getElementById('cancel-sell-btn');
    
    if (buyBtn) buyBtn.addEventListener('click', purchaseProperty);
    if (declineBtn) declineBtn.addEventListener('click', declinePurchase);
    if (confirmSellBtn) confirmSellBtn.addEventListener('click', confirmSell);
    if (cancelSellBtn) cancelSellBtn.addEventListener('click', () => hideModal('sell-modal'));
}

// ============================
// TABLERO
// ============================

function generateBoard() {
    const board = document.getElementById('game-board');
    if (!board) return;
    
    // Layout simple del tablero (40 casillas)
    for (let i = 0; i < 40; i++) {
        const cell = document.createElement('div');
        cell.className = 'board-cell';
        cell.id = `cell-${i}`;
        cell.textContent = i;
        cell.style.position = 'absolute';
        
        // Posicionar en el tablero (simplificado)
        // En un juego real, esto sería más complejo
        if (i === 0) cell.textContent = 'SALIDA';
        else if (i === 10) cell.textContent = 'CÁRCEL';
        else if (i === 20) cell.textContent = 'PARADA';
        else if (i === 30) cell.textContent = 'CÁRCEL';
        
        board.appendChild(cell);
    }
}

// ============================
// MECÁNICAS DEL JUEGO
// ============================

function rollDice() {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const total = dice1 + dice2;
    const isDouble = dice1 === dice2;
    
    // Mostrar en dados
    document.getElementById('dice1').textContent = dice1;
    document.getElementById('dice2').textContent = dice2;
    
    const currentPlayer = gameData.players[gameData.currentPlayerIndex];
    addToLog(`${currentPlayer.name} lanzó: ${dice1} + ${dice2} = ${total} ${isDouble ? '¡DOBLES!' : ''}`);
    
    // Mover jugador
    movePlayer(currentPlayer, total, isDouble);
}

function movePlayer(player, steps, isDouble) {
    const oldPosition = player.position;
    player.position = (player.position + steps) % 40;
    
    // Verificar si pasó por SALIDA (posición 0)
    if (player.position < oldPosition && oldPosition + steps >= 40) {
        player.money += 200;
        player.laps++;
        addToLog(`${player.name} pasó por SALIDA y recibe $200. Vuelta ${player.laps}`);
    }
    
    addToLog(`${player.name} se movió a la casilla ${player.position}`);
    
    // Verificar propiedad
    const property = gameData.properties.find(p => p.position === player.position);
    if (property) {
        // Verificar si ya tiene dueño
        const owner = gameData.players.find(p => p.properties.some(prop => prop.id === property.id));
        
        if (!owner) {
            // Propiedad disponible para compra
            showPropertyModal(property, isDouble);
        } else if (owner.id !== player.id) {
            // Pagar alquiler
            const rent = property.rent;
            if (player.money >= rent) {
                player.money -= rent;
                owner.money += rent;
                addToLog(`${player.name} paga $${rent} de alquiler a ${owner.name}`);
            } else {
                player.isBankrupt = true;
                addToLog(`¡${player.name} no puede pagar y queda en bancarrota!`);
            }
            updatePlayersPanel();
            
            // Continuar turno
            continueTurn(isDouble);
        } else {
            // Es su propia propiedad
            continueTurn(isDouble);
        }
    } else {
        continueTurn(isDouble);
    }
}

function continueTurn(isDouble) {
    if (isDouble) {
        addToLog('¡Dobles! El jugador tira de nuevo');
        // Habilitar botón de dados
        const rollBtn = document.getElementById('roll-dice-btn');
        if (rollBtn) rollBtn.disabled = false;
    } else {
        nextTurn();
    }
}

function nextTurn() {
    // Encontrar siguiente jugador no en bancarrota
    let nextIndex = (gameData.currentPlayerIndex + 1) % gameData.players.length;
    let attempts = 0;
    
    while (gameData.players[nextIndex].isBankrupt && attempts < gameData.players.length) {
        nextIndex = (nextIndex + 1) % gameData.players.length;
        attempts++;
    }
    
    gameData.currentPlayerIndex = nextIndex;
    updatePlayersPanel();
    updateGameInfo();
    
    const currentPlayer = gameData.players[nextIndex];
    addToLog(`Es el turno de ${currentPlayer.name} ${currentPlayer.isBot ? '🤖' : ''}`);
    
    // Si es bot, jugar automáticamente después de un tiempo
    if (currentPlayer.isBot) {
        setTimeout(() => {
            addToLog(`🤖 ${currentPlayer.name} está jugando...`);
            setTimeout(() => {
                const rollBtn = document.getElementById('roll-dice-btn');
                if (rollBtn && !rollBtn.disabled) {
                    rollBtn.click();
                }
            }, 1000);
        }, 1500);
    }
}

// ============================
// PROPIEDADES
// ============================

function showPropertyModal(property, isDouble) {
    const modal = document.getElementById('property-modal');
    const info = document.getElementById('property-info');
    const question = document.getElementById('math-question');
    
    // Generar pregunta matemática
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const answer = num1 + num2;
    const wrongAnswers = [
        answer + Math.floor(Math.random() * 5) + 1,
        answer - Math.floor(Math.random() * 5) - 1,
        answer + Math.floor(Math.random() * 3) + 5
    ];
    
    const allAnswers = [answer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    
    info.innerHTML = `
        <h3 style="color: ${property.color}">${property.name}</h3>
        <p>Precio: <strong>$${property.price}</strong></p>
        <p>Alquiler: <strong>$${property.rent}</strong></p>
        <p>Responde correctamente para comprar con descuento</p>
    `;
    
    question.innerHTML = `
        <p>¿Cuánto es ${num1} + ${num2}?</p>
        <div class="answer-options">
            ${allAnswers.map(ans => `
                <button class="answer-btn" data-value="${ans}">${ans}</button>
            `).join('')}
        </div>
    `;
    
    // Configurar botones de respuesta
    const answerBtns = question.querySelectorAll('.answer-btn');
    let selectedAnswer = null;
    
    answerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            answerBtns.forEach(b => b.style.background = '');
            this.style.background = '#4CAF50';
            this.style.color = 'white';
            selectedAnswer = parseInt(this.dataset.value);
        });
    });
    
    // Guardar datos en el modal
    modal.dataset.propertyId = property.id;
    modal.dataset.correctAnswer = answer;
    modal.dataset.isDouble = isDouble;
    modal.dataset.selectedAnswer = '';
    
    // Actualizar selectedAnswer cuando se seleccione
    modal.dataset.updateAnswer = function(value) {
        modal.dataset.selectedAnswer = value;
    };
    
    // Sobrescribir botón comprar
    const buyBtn = document.getElementById('buy-btn');
    const originalClick = buyBtn.onclick;
    buyBtn.onclick = function() {
        if (selectedAnswer === null) {
            alert('Selecciona una respuesta primero');
            return;
        }
        
        const correctAnswer = parseInt(modal.dataset.correctAnswer);
        const propertyId = parseInt(modal.dataset.propertyId);
        const isDouble = modal.dataset.isDouble === 'true';
        const propertyObj = gameData.properties.find(p => p.id === propertyId);
        const player = gameData.players[gameData.currentPlayerIndex];
        
        if (selectedAnswer === correctAnswer) {
            // Respuesta correcta - comprar con precio normal
            if (player.money >= propertyObj.price) {
                player.money -= propertyObj.price;
                player.properties.push(propertyObj);
                addToLog(`¡${player.name} respondió bien y compró ${propertyObj.name} por $${propertyObj.price}!`);
            } else {
                addToLog(`¡${player.name} respondió bien pero no tiene $${propertyObj.price}!`);
            }
        } else {
            // Respuesta incorrecta - multa
            player.money -= 10;
            addToLog(`${player.name} respondió mal. Multa de $10. No puede comprar.`);
        }
        
        hideModal('property-modal');
        updatePlayersPanel();
        continueTurn(isDouble);
    };
    
    showModal('property-modal');
}

function purchaseProperty() {
    // Esta función es manejada dinámicamente en showPropertyModal
}

function declinePurchase() {
    const modal = document.getElementById('property-modal');
    const isDouble = modal.dataset.isDouble === 'true';
    const player = gameData.players[gameData.currentPlayerIndex];
    
    // Multa por no intentar
    player.money -= 50;
    addToLog(`${player.name} no intentó el ejercicio. Multa de $50.`);
    
    hideModal('property-modal');
    updatePlayersPanel();
    continueTurn(isDouble);
}

// ============================
// VENTA DE PROPIEDADES
// ============================

function showSellModal() {
    const player = gameData.players[gameData.currentPlayerIndex];
    
    if (player.properties.length === 0) {
        alert('No tienes propiedades para vender');
        return;
    }
    
    const modal = document.getElementById('sell-modal');
    const info = document.getElementById('sell-info');
    
    let propertiesHTML = '<p>Selecciona una propiedad para vender (75% del valor):</p>';
    propertiesHTML += '<div class="properties-list">';
    
    player.properties.forEach((property, index) => {
        const sellPrice = Math.floor(property.price * 0.75);
        propertiesHTML += `
            <div class="property-sell-item" data-index="${index}">
                <div style="color: ${property.color}; font-weight: bold">${property.name}</div>
                <div>Comprado: $${property.price} | Vender: $${sellPrice}</div>
            </div>
        `;
    });
    
    propertiesHTML += '</div>';
    info.innerHTML = propertiesHTML;
    
    // Configurar selección
    const propertyItems = info.querySelectorAll('.property-sell-item');
    let selectedIndex = null;
    
    propertyItems.forEach(item => {
        item.addEventListener('click', function() {
            propertyItems.forEach(i => i.style.background = '');
            this.style.background = '#4CAF50';
            this.style.color = 'white';
            selectedIndex = parseInt(this.dataset.index);
        });
    });
    
    // Guardar índice seleccionado
    modal.dataset.selectedIndex = '';
    
    showModal('sell-modal');
}

function confirmSell() {
    const modal = document.getElementById('sell-modal');
    const player = gameData.players[gameData.currentPlayerIndex];
    const selectedIndex = modal.dataset.selectedIndex;
    
    if (selectedIndex === '') {
        alert('Selecciona una propiedad para vender');
        return;
    }
    
    const property = player.properties[selectedIndex];
    const sellPrice = Math.floor(property.price * 0.75);
    
    // Vender propiedad
    player.money += sellPrice;
    player.properties.splice(selectedIndex, 1);
    
    addToLog(`${player.name} vendió ${property.name} por $${sellPrice}`);
    
    hideModal('sell-modal');
    updatePlayersPanel();
    
    alert(`¡Has vendido ${property.name} por $${sellPrice}!`);
}

// ============================
// INTERFAZ
// ============================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
    }
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function updatePlayersPanel() {
    const container = document.getElementById('players-cards');
    if (!container) return;
    
    container.innerHTML = '';
    
    gameData.players.forEach((player, index) => {
        const card = document.createElement('div');
        card.className = 'player-card';
        
        if (index === gameData.currentPlayerIndex) {
            card.classList.add('active');
        }
        
        card.innerHTML = `
            <div class="player-header">
                <div class="player-token" style="background-color: ${player.tokenColor}">
                    ${player.tokenSymbol}
                </div>
                <div class="player-name">${player.name}</div>
                ${player.isBot ? '<span style="color:#FF9800">🤖</span>' : ''}
            </div>
            <div class="player-money">$${player.money}</div>
            <div>Propiedades: ${player.properties.length}</div>
            ${gameData.mode === 'quick' ? `<div>Vueltas: ${player.laps}</div>` : ''}
        `;
        
        container.appendChild(card);
    });
}

function updateGameInfo() {
    const player = gameData.players[gameData.currentPlayerIndex];
    const turnElement = document.getElementById('current-player-turn');
    
    if (turnElement && player) {
        turnElement.textContent = `Turno de: ${player.name}`;
    }
}

function addToLog(message) {
    const logContent = document.getElementById('log-content');
    if (!logContent) return;
    
    const timestamp = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `<strong>[${timestamp}]</strong> ${message}`;
    
    logContent.appendChild(entry);
    logContent.scrollTop = logContent.scrollHeight;
    
    gameData.gameLog.push(message);
}

function clearGameLog() {
    const logContent = document.getElementById('log-content');
    if (logContent) {
        logContent.innerHTML = '';
        addToLog('=== REGISTRO LIMPIADO ===');
    }
}