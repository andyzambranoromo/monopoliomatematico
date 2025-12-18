// ui.js - Lógica del juego

// Datos del juego
const gameData = {
    mode: 'quick',
    players: [],
    currentPlayerIndex: 0,
    properties: [
        { id: 1, name: "Avenida Mediterránea", color: "#8B4513", price: 60, rent: 2, group: "brown", position: 1 },
        { id: 2, name: "Avenida Báltica", color: "#8B4513", price: 60, rent: 4, group: "brown", position: 3 },
        { id: 3, name: "Avenida Oriental", color: "#87CEEB", price: 100, rent: 6, group: "light-blue", position: 6 },
        { id: 4, name: "Avenida Vermont", color: "#87CEEB", price: 100, rent: 6, group: "light-blue", position: 8 },
        { id: 5, name: "Avenida Connecticut", color: "#87CEEB", price: 120, rent: 8, group: "light-blue", position: 9 },
        { id: 6, name: "Plaza San Carlos", color: "#FFB6C1", price: 140, rent: 10, group: "pink", position: 11 },
        { id: 7, name: "Avenida Estados", color: "#FFB6C1", price: 140, rent: 10, group: "pink", position: 13 },
        { id: 8, name: "Avenida Virginia", color: "#FFB6C1", price: 160, rent: 12, group: "pink", position: 14 },
        { id: 9, name: "Plaza San James", color: "#FFA500", price: 180, rent: 14, group: "orange", position: 16 },
        { id: 10, name: "Avenida Tennessee", color: "#FFA500", price: 180, rent: 14, group: "orange", position: 18 },
        { id: 11, name: "Avenida Nueva York", color: "#FFA500", price: 200, rent: 16, group: "orange", position: 19 },
        { id: 12, name: "Avenida Kentucky", color: "#FF0000", price: 220, rent: 18, group: "red", position: 21 },
        { id: 13, name: "Avenida Indiana", color: "#FF0000", price: 220, rent: 18, group: "red", position: 23 },
        { id: 14, name: "Avenida Illinois", color: "#FF0000", price: 240, rent: 20, group: "red", position: 24 },
        { id: 15, name: "Avenida Atlántico", color: "#FFFF00", price: 260, rent: 22, group: "yellow", position: 26 },
        { id: 16, name: "Avenida Ventnor", color: "#FFFF00", price: 260, rent: 22, group: "yellow", position: 27 },
        { id: 17, name: "Jardines Marvin", color: "#FFFF00", price: 280, rent: 24, group: "yellow", position: 29 },
        { id: 18, name: "Avenida Pacífico", color: "#008000", price: 300, rent: 26, group: "green", position: 31 },
        { id: 19, name: "Avenida Carolina", color: "#008000", price: 300, rent: 26, group: "green", position: 32 },
        { id: 20, name: "Avenida Pensilvania", color: "#008000", price: 320, rent: 28, group: "green", position: 34 },
        { id: 21, name: "Plaza Park", color: "#000080", price: 350, rent: 35, group: "blue", position: 37 },
        { id: 22, name: "Paseo Marítimo", color: "#000080", price: 400, rent: 50, group: "blue", position: 39 }
    ],
    railroads: [
        { id: 1, name: "Ferrocarril Reading", price: 200, position: 5, emoji: "🚂" },
        { id: 2, name: "Ferrocarril Pensilvania", price: 200, position: 15, emoji: "🚂" },
        { id: 3, name: "Ferrocarril B&O", price: 200, position: 25, emoji: "🚂" },
        { id: 4, name: "Ferrocarril Short Line", price: 200, position: 35, emoji: "🚂" }
    ],
    utilities: [
        { id: 1, name: "Compañía Eléctrica", price: 150, position: 12, emoji: "💡" },
        { id: 2, name: "Compañía de Agua", price: 150, position: 28, emoji: "💧" }
    ],
    gameLog: [],
    turnCount: 0,
    maxTurns: 3,
    doubleCount: 0
};

// Tokens disponibles
const tokens = [
    { id: 'hat', color: '#e74c3c', symbol: '🎩', name: 'Sombrero' },
    { id: 'car', color: '#3498db', symbol: '🚗', name: 'Coche' },
    { id: 'dog', color: '#2ecc71', symbol: '🐶', name: 'Perro' },
    { id: 'ship', color: '#f1c40f', symbol: '🚢', name: 'Barco' }
];

// Nombres para bots
const botNames = ["Profesor Matemático", "Genio Calculador", "Maestro Álgebra"];

// Hacer gameData global
window.gameData = gameData;

// Inicializar UI
function init() {
    console.log("Inicializando UI del juego...");
    setupGameListeners();
}

// Configurar listeners del juego
function setupGameListeners() {
    // Botón lanzar dados
    const rollDiceBtn = document.getElementById('roll-center-dice');
    if (rollDiceBtn) {
        rollDiceBtn.addEventListener('click', rollDice);
    }
    
    // Botón vender propiedad
    const sellBtn = document.getElementById('sell-property-btn');
    if (sellBtn) {
        sellBtn.addEventListener('click', showSellModal);
    }
    
    // Botón limpiar registro
    const clearLogBtns = document.querySelectorAll('#clear-log, #clear-log-small');
    clearLogBtns.forEach(btn => {
        btn.addEventListener('click', clearGameLog);
    });
    
    // Botones del modal de propiedad
    const buyBtn = document.getElementById('buy-property');
    const declineBtn = document.getElementById('decline-purchase');
    const closeCardBtn = document.getElementById('close-card');
    
    if (buyBtn) buyBtn.addEventListener('click', purchaseProperty);
    if (declineBtn) declineBtn.addEventListener('click', declinePurchase);
    if (closeCardBtn) closeCardBtn.addEventListener('click', processCardAction);
    
    // Botones cerrar modal
    const closeModalBtns = document.querySelectorAll('.close-modal');
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => modal.classList.remove('active'));
        });
    });
}

// Función para inicializar lobby (llamada desde game.js)
window.initLobbyUI = function() {
    console.log("Inicializando lobby UI...");
    
    // Agregar jugadores por defecto si no hay
    const playerInputs = document.getElementById('player-inputs');
    if (playerInputs && playerInputs.children.length === 0) {
        generatePlayerInput(1);
        generatePlayerInput(2);
    }
    
    // Configurar listeners del lobby
    setupLobbyListeners();
    
    // Seleccionar modo rápido por defecto
    const quickMode = document.querySelector('#lobby-screen .mode-card[data-mode="quick"]');
    if (quickMode) {
        quickMode.click();
    }
};

// Configurar listeners del lobby
function setupLobbyListeners() {
    // Selección de modo en lobby
    const modeCards = document.querySelectorAll('#lobby-screen .mode-card');
    modeCards.forEach(card => {
        card.addEventListener('click', function() {
            modeCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            gameData.mode = this.dataset.mode;
            console.log("Modo de juego seleccionado:", gameData.mode);
        });
    });
    
    // Botón agregar jugador
    const addPlayerBtn = document.getElementById('add-player');
    if (addPlayerBtn) {
        addPlayerBtn.addEventListener('click', function() {
            const currentPlayers = document.querySelectorAll('.player-row').length;
            if (currentPlayers < 6) {
                generatePlayerInput(currentPlayers + 1);
            } else {
                alert('Máximo 6 jugadores permitidos');
            }
        });
    }
    
    // Botón agregar bot
    const addBotBtn = document.getElementById('add-bot');
    if (addBotBtn) {
        addBotBtn.addEventListener('click', addBotPlayer);
    }
    
    // Botón limpiar todo
    const clearAllBtn = document.getElementById('clear-all');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', function() {
            const playerInputs = document.getElementById('player-inputs');
            if (playerInputs) {
                playerInputs.innerHTML = '';
                generatePlayerInput(1);
                generatePlayerInput(2);
                alert('Todos los jugadores han sido eliminados. Se han agregado 2 jugadores por defecto.');
            }
        });
    }
    
    // Botón comenzar juego
    const startGameBtn = document.getElementById('start-game');
    if (startGameBtn) {
        startGameBtn.addEventListener('click', startGame);
    }
}

// Generar campo de jugador
function generatePlayerInput(index) {
    const playerInputs = document.getElementById('player-inputs');
    if (!playerInputs) return;
    
    const playerRow = document.createElement('div');
    playerRow.className = 'player-row';
    playerRow.innerHTML = `
        <input type="text" class="player-name" value="Jugador ${index}" placeholder="Nombre del jugador">
        <select class="player-token">
            ${tokens.map(token => `<option value="${token.id}">${token.symbol} ${token.name}</option>`).join('')}
        </select>
        <div class="token-preview" style="background-color: ${tokens[0].color}">
            ${tokens[0].symbol}
        </div>
    `;
    
    const tokenSelect = playerRow.querySelector('.player-token');
    const tokenPreview = playerRow.querySelector('.token-preview');
    
    tokenSelect.addEventListener('change', function() {
        const selectedToken = tokens.find(t => t.id === this.value);
        tokenPreview.style.backgroundColor = selectedToken.color;
        tokenPreview.innerHTML = selectedToken.symbol;
    });
    
    playerInputs.appendChild(playerRow);
}

// Agregar bot
function addBotPlayer() {
    const currentPlayers = document.querySelectorAll('.player-row').length;
    if (currentPlayers >= 6) {
        alert('Máximo 6 jugadores permitidos');
        return;
    }
    
    const usedTokens = Array.from(document.querySelectorAll('.player-token'))
        .map(select => select.value);
    const availableTokens = tokens.filter(token => !usedTokens.includes(token.id));
    
    if (availableTokens.length === 0) {
        alert('No hay más tokens disponibles');
        return;
    }
    
    const randomToken = availableTokens[Math.floor(Math.random() * availableTokens.length)];
    const randomName = botNames[Math.floor(Math.random() * botNames.length)];
    
    const playerRow = document.createElement('div');
    playerRow.className = 'player-row';
    playerRow.innerHTML = `
        <input type="text" class="player-name" value="${randomName} (Bot)" readonly>
        <select class="player-token" disabled>
            <option value="${randomToken.id}">${randomToken.symbol} ${randomToken.name}</option>
        </select>
        <div class="token-preview" style="background-color: ${randomToken.color}">
            ${randomToken.symbol}
        </div>
    `;
    
    document.getElementById('player-inputs').appendChild(playerRow);
}

// Comenzar juego
function startGame() {
    console.log("Comenzando juego...");
    
    // Verificar modo seleccionado
    const selectedModeCard = document.querySelector('#lobby-screen .mode-card.selected');
    if (!selectedModeCard) {
        alert('Por favor, selecciona un modo de juego (Rápido o Normal)');
        return;
    }
    gameData.mode = selectedModeCard.dataset.mode;
    
    // Obtener jugadores
    const playerRows = document.querySelectorAll('.player-row');
    if (playerRows.length < 2) {
        alert('Se necesitan al menos 2 jugadores');
        return;
    }
    
    // Configurar jugadores
    gameData.players = [];
    const usedNames = new Set();
    
    playerRows.forEach((row, index) => {
        const nameInput = row.querySelector('.player-name');
        const tokenSelect = row.querySelector('.player-token');
        
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
            token: tokenSelect.value,
            tokenColor: token.color,
            tokenSymbol: token.symbol,
            money: 1500,
            position: 0,
            properties: [],
            railroads: [],
            utilities: [],
            isBankrupt: false,
            laps: 0,
            isBot: isBot,
            inJail: false
        });
    });
    
    if (gameData.players.length < 2) {
        alert('Se necesitan al menos 2 jugadores válidos');
        return;
    }
    
    // Reiniciar estado del juego
    gameData.currentPlayerIndex = 0;
    gameData.turnCount = 0;
    gameData.doubleCount = 0;
    gameData.gameLog = [];
    
    // Ir a la pantalla de juego
    if (window.goToScreen) {
        window.goToScreen('game-screen');
    }
    
    // Inicializar juego
    setTimeout(() => {
        updatePlayersPanel();
        if (typeof updatePlayerMarkers === 'function') {
            updatePlayerMarkers();
        }
        updateGameInfo();
        
        const currentTurnPlayer = document.getElementById('current-turn-player');
        if (currentTurnPlayer) {
            currentTurnPlayer.textContent = gameData.players[0].name;
        }
        
        addToLog(`¡El juego ha comenzado! Modo: ${gameData.mode === 'quick' ? 'Rápido' : 'Normal'}`);
        addToLog(`Jugadores: ${gameData.players.map(p => p.name).join(', ')}`);
        addToLog(`Es el turno de ${gameData.players[0].name}`);
        
        // Habilitar botón de dados
        const rollDiceBtn = document.getElementById('roll-center-dice');
        if (rollDiceBtn) rollDiceBtn.disabled = false;
        
        console.log("Juego iniciado con", gameData.players.length, "jugadores");
    }, 500);
}

// Lanzar dados
function rollDice() {
    const dice1Value = Math.floor(Math.random() * 6) + 1;
    const dice2Value = Math.floor(Math.random() * 6) + 1;
    const total = dice1Value + dice2Value;
    const isDouble = dice1Value === dice2Value;
    
    const centerDice1 = document.getElementById('center-dice1');
    const centerDice2 = document.getElementById('center-dice2');
    const rollDiceBtn = document.getElementById('roll-center-dice');
    
    if (rollDiceBtn) rollDiceBtn.disabled = true;
    
    // Animación
    if (centerDice1) {
        centerDice1.classList.add('rolling');
        centerDice1.textContent = '?';
    }
    if (centerDice2) {
        centerDice2.classList.add('rolling');
        centerDice2.textContent = '?';
    }
    
    setTimeout(() => {
        if (centerDice1) {
            centerDice1.classList.remove('rolling');
            centerDice1.textContent = dice1Value;
        }
        if (centerDice2) {
            centerDice2.classList.remove('rolling');
            centerDice2.textContent = dice2Value;
        }
        
        const currentPlayer = gameData.players[gameData.currentPlayerIndex];
        addToLog(`${currentPlayer.name} lanzó: ${dice1Value} + ${dice2Value} = ${total} ${isDouble ? '¡DOBLES!' : ''}`);
        
        // Mover jugador
        movePlayer(currentPlayer, total, isDouble);
    }, 1000);
}

// Mover jugador
function movePlayer(player, steps, isDouble) {
    let currentStep = 0;
    const startPosition = player.position;
    
    function moveStep() {
        if (currentStep < steps) {
            currentStep++;
            const newPosition = (startPosition + currentStep) % 40;
            
            // Verificar si pasó por SALIDA
            if (newPosition < startPosition && currentStep === steps) {
                player.money += 200;
                player.laps++;
                addToLog(`${player.name} pasó por SALIDA y recibe $200. Vuelta ${player.laps}`);
                updatePlayersPanel();
            }
            
            player.position = newPosition;
            if (typeof updatePlayerMarkers === 'function') {
                updatePlayerMarkers();
            }
            
            setTimeout(moveStep, 200);
        } else {
            // Llegó a la posición final
            addToLog(`${player.name} llegó a la casilla ${player.position}`);
            
            // Verificar si es propiedad
            const property = gameData.properties.find(p => p.position === player.position);
            if (property) {
                showPropertyModal(property, isDouble);
            } else {
                // Pasar turno
                if (isDouble) {
                    addToLog(`${player.name} sacó dobles y tira de nuevo`);
                    const rollDiceBtn = document.getElementById('roll-center-dice');
                    if (rollDiceBtn) rollDiceBtn.disabled = false;
                } else {
                    nextTurn();
                }
            }
        }
    }
    
    moveStep();
}

// Mostrar modal de propiedad
function showPropertyModal(property, isDouble) {
    const propertyModal = document.getElementById('property-modal');
    const propertyTitle = document.getElementById('property-title');
    const propertyInfo = document.getElementById('property-info');
    const mathQuestion = document.getElementById('math-question');
    
    if (!propertyModal || !propertyTitle || !propertyInfo) return;
    
    propertyTitle.textContent = 'Oportunidad de Compra';
    
    // Generar pregunta matemática simple
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 + num2;
    const wrongAnswers = [answer + 1, answer - 1, answer + 2].sort(() => Math.random() - 0.5);
    
    propertyInfo.innerHTML = `
        <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 10px; margin: 15px 0;">
            <h3 style="color: ${property.color}; margin-bottom: 10px;">${property.name}</h3>
            <p style="font-size: 1.2rem; color: #28a745; font-weight: bold;">Precio: $${property.price}</p>
            <p>Alquiler: $${property.rent}</p>
        </div>
    `;
    
    mathQuestion.innerHTML = `
        <div class="question">Resuelve: ${num1} + ${num2} = ?</div>
        <div class="options">
            <div class="option" data-value="${answer}">${answer}</div>
            <div class="option" data-value="${wrongAnswers[0]}">${wrongAnswers[0]}</div>
            <div class="option" data-value="${wrongAnswers[1]}">${wrongAnswers[1]}</div>
            <div class="option" data-value="${wrongAnswers[2]}">${wrongAnswers[2]}</div>
        </div>
    `;
    
    // Configurar selección de opciones
    const options = mathQuestion.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            options.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            propertyModal.dataset.correctAnswer = answer;
            propertyModal.dataset.selectedAnswer = this.dataset.value;
        });
    });
    
    propertyModal.dataset.propertyId = property.id;
    propertyModal.dataset.isDouble = isDouble;
    propertyModal.classList.add('active');
}

// Comprar propiedad
function purchaseProperty() {
    const propertyModal = document.getElementById('property-modal');
    if (!propertyModal) return;
    
    const propertyId = parseInt(propertyModal.dataset.propertyId);
    const isDouble = propertyModal.dataset.isDouble === 'true';
    const selectedAnswer = propertyModal.dataset.selectedAnswer;
    const correctAnswer = propertyModal.dataset.correctAnswer;
    
    if (!selectedAnswer) {
        alert('Por favor, selecciona una respuesta');
        return;
    }
    
    const currentPlayer = gameData.players[gameData.currentPlayerIndex];
    const property = gameData.properties.find(p => p.id === propertyId);
    
    if (!property) return;
    
    // Verificar respuesta
    if (parseInt(selectedAnswer) === parseInt(correctAnswer)) {
        // Respuesta correcta
        if (currentPlayer.money >= property.price) {
            currentPlayer.money -= property.price;
            currentPlayer.properties.push(property);
            addToLog(`¡${currentPlayer.name} respondió correctamente y compró ${property.name} por $${property.price}!`);
        } else {
            addToLog(`¡${currentPlayer.name} respondió correctamente pero no tiene suficiente dinero!`);
        }
    } else {
        // Respuesta incorrecta
        currentPlayer.money -= 10;
        addToLog(`${currentPlayer.name} respondió incorrectamente. Multa de $10.`);
        addToLog(`${currentPlayer.name} no puede comprar ${property.name}`);
    }
    
    propertyModal.classList.remove('active');
    updatePlayersPanel();
    if (typeof updatePlayerMarkers === 'function') {
        updatePlayerMarkers();
    }
    
    // Continuar turno
    if (isDouble) {
        setTimeout(() => {
            addToLog(`${currentPlayer.name} sacó dobles y tira de nuevo`);
            const rollDiceBtn = document.getElementById('roll-center-dice');
            if (rollDiceBtn) rollDiceBtn.disabled = false;
        }, 1000);
    } else {
        setTimeout(nextTurn, 1000);
    }
}

// Declinar compra
function declinePurchase() {
    const propertyModal = document.getElementById('property-modal');
    if (!propertyModal) return;
    
    const propertyId = parseInt(propertyModal.dataset.propertyId);
    const isDouble = propertyModal.dataset.isDouble === 'true';
    const currentPlayer = gameData.players[gameData.currentPlayerIndex];
    const property = gameData.properties.find(p => p.id === propertyId);
    
    // Multa por no intentar
    currentPlayer.money -= 50;
    addToLog(`${currentPlayer.name} decidió no realizar el ejercicio. Multa de $50.`);
    
    if (property) {
        addToLog(`${currentPlayer.name} no compró ${property.name}`);
    }
    
    propertyModal.classList.remove('active');
    updatePlayersPanel();
    
    // Continuar turno
    if (isDouble) {
        setTimeout(() => {
            addToLog(`${currentPlayer.name} sacó dobles y tira de nuevo`);
            const rollDiceBtn = document.getElementById('roll-center-dice');
            if (rollDiceBtn) rollDiceBtn.disabled = false;
        }, 1000);
    } else {
        setTimeout(nextTurn, 1000);
    }
}

// Siguiente turno
function nextTurn() {
    // Verificar si el juego terminó
    if (gameData.mode === 'quick') {
        const playersWithEnoughLaps = gameData.players.filter(p => p.laps >= gameData.maxTurns);
        if (playersWithEnoughLaps.length > 0) {
            endGame();
            return;
        }
    }
    
    // Encontrar siguiente jugador no en bancarrota
    let nextIndex = (gameData.currentPlayerIndex + 1) % gameData.players.length;
    while (gameData.players[nextIndex].isBankrupt) {
        nextIndex = (nextIndex + 1) % gameData.players.length;
    }
    
    gameData.currentPlayerIndex = nextIndex;
    gameData.doubleCount = 0;
    
    updatePlayersPanel();
    updateGameInfo();
    
    const currentTurnPlayer = document.getElementById('current-turn-player');
    if (currentTurnPlayer) {
        currentTurnPlayer.textContent = gameData.players[nextIndex].name;
    }
    
    const rollDiceBtn = document.getElementById('roll-center-dice');
    if (rollDiceBtn) rollDiceBtn.disabled = false;
    
    const nextPlayer = gameData.players[nextIndex];
    addToLog(`Es el turno de ${nextPlayer.name} ${nextPlayer.isBot ? '🤖' : ''}`);
    
    // Si es bot, jugar automáticamente después de un tiempo
    if (nextPlayer.isBot) {
        setTimeout(() => {
            addToLog(`🤖 ${nextPlayer.name} está jugando...`);
            setTimeout(() => {
                const rollBtn = document.getElementById('roll-center-dice');
                if (rollBtn && !rollBtn.disabled) {
                    rollBtn.click();
                }
            }, 1000);
        }, 1500);
    }
}

// Mostrar modal de venta
function showSellModal() {
    const sellModal = document.getElementById('sell-modal');
    const sellInfo = document.getElementById('sell-property-info');
    
    if (!sellModal || !sellInfo) return;
    
    const currentPlayer = gameData.players[gameData.currentPlayerIndex];
    
    if (currentPlayer.properties.length === 0) {
        sellInfo.innerHTML = `
            <div class="no-properties">
                <h3>No tienes propiedades</h3>
                <p>No puedes vender propiedades porque no tienes ninguna.</p>
            </div>
        `;
    } else {
        let propertiesHTML = '<div class="property-list">';
        
        currentPlayer.properties.forEach((property, index) => {
            const sellPrice = Math.floor(property.price * 0.75);
            propertiesHTML += `
                <div class="property-item" data-index="${index}">
                    <div class="property-item-info">
                        <div class="property-item-name" style="color: ${property.color}">${property.name}</div>
                        <div class="property-item-details">
                            <span>Comprado: $${property.price}</span>
                            <span>Vender: $${sellPrice}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        propertiesHTML += '</div>';
        propertiesHTML += `
            <div class="sell-warning">
                <i class="fas fa-exclamation-triangle"></i>
                Venderás la propiedad al 75% de su valor original
            </div>
        `;
        
        sellInfo.innerHTML = propertiesHTML;
        
        // Configurar selección
        const propertyItems = sellInfo.querySelectorAll('.property-item');
        propertyItems.forEach(item => {
            item.addEventListener('click', function() {
                propertyItems.forEach(i => i.classList.remove('selected'));
                this.classList.add('selected');
                sellModal.dataset.selectedIndex = this.dataset.index;
            });
        });
    }
    
    // Configurar botones del modal
    const confirmSell = document.getElementById('confirm-sell');
    const cancelSell = document.getElementById('cancel-sell');
    
    if (confirmSell) {
        confirmSell.onclick = function() {
            const selectedIndex = sellModal.dataset.selectedIndex;
            if (selectedIndex === undefined) {
                alert('Selecciona una propiedad para vender');
                return;
            }
            
            const property = currentPlayer.properties[selectedIndex];
            const sellPrice = Math.floor(property.price * 0.75);
            
            // Vender propiedad
            currentPlayer.money += sellPrice;
            currentPlayer.properties.splice(selectedIndex, 1);
            
            addToLog(`${currentPlayer.name} vendió ${property.name} por $${sellPrice}`);
            
            updatePlayersPanel();
            if (typeof updatePlayerMarkers === 'function') {
                updatePlayerMarkers();
            }
            
            sellModal.classList.remove('active');
            alert(`¡Has vendido ${property.name} por $${sellPrice}!`);
        };
    }
    
    if (cancelSell) {
        cancelSell.onclick = function() {
            sellModal.classList.remove('active');
        };
    }
    
    sellModal.classList.add('active');
}

// Funciones auxiliares
function updatePlayersPanel() {
    const playersPanel = document.getElementById('players-panel');
    if (!playersPanel) return;
    
    playersPanel.innerHTML = '<h3>Jugadores</h3>';
    
    gameData.players.forEach((player, index) => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        
        if (index === gameData.currentPlayerIndex) {
            playerCard.classList.add('active-player');
        }
        
        if (player.isBot) {
            playerCard.classList.add('bot-player');
        }
        
        playerCard.innerHTML = `
            <div class="player-header">
                <div class="player-token-small" style="background-color: ${player.tokenColor}">
                    ${player.tokenSymbol}
                </div>
                <div class="player-name">${player.name}</div>
                ${player.isBot ? '<div class="bot-badge">BOT</div>' : ''}
            </div>
            <div class="player-money">$${player.money}</div>
            <div class="player-properties">
                <strong>Propiedades:</strong> ${player.properties.length}
                ${player.railroads.length > 0 ? `<br>Ferrocarriles: ${player.railroads.length}` : ''}
                ${player.utilities.length > 0 ? `<br>Servicios: ${player.utilities.length}` : ''}
            </div>
            ${gameData.mode === 'quick' ? `<div>Vueltas: ${player.laps}</div>` : ''}
        `;
        
        playersPanel.appendChild(playerCard);
    });
}

function updateGameInfo() {
    const currentPlayer = gameData.players[gameData.currentPlayerIndex];
    const currentPlayerInfo = document.getElementById('current-player-info');
    const gameModeInfo = document.getElementById('game-mode-info');
    
    if (currentPlayerInfo) {
        currentPlayerInfo.textContent = `Turno de: ${currentPlayer.name}`;
    }
    
    if (gameModeInfo) {
        gameModeInfo.textContent = `Modo: ${gameData.mode === 'quick' ? 'Rápido' : 'Normal'}`;
    }
}

function addToLog(message) {
    const logContent = document.getElementById('log-content');
    if (!logContent) return;
    
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `<strong>[${timestamp}]</strong> ${message}`;
    logContent.appendChild(logEntry);
    logContent.scrollTop = logContent.scrollHeight;
    
    gameData.gameLog.push(`[${timestamp}] ${message}`);
}

function clearGameLog() {
    const logContent = document.getElementById('log-content');
    if (logContent) {
        logContent.innerHTML = '';
        addToLog('=== REGISTRO LIMPIADO ===');
    }
}

function processCardAction() {
    const cardModal = document.getElementById('card-modal');
    if (cardModal) {
        cardModal.classList.remove('active');
        setTimeout(nextTurn, 500);
    }
}

function endGame() {
    // Ordenar jugadores por dinero
    const sortedPlayers = [...gameData.players].sort((a, b) => b.money - a.money);
    
    // Ir a pantalla de resultados
    if (window.goToScreen) {
        window.goToScreen('results-screen');
    }
    
    // Mostrar podio
    const podium = document.getElementById('podium');
    if (podium) {
        podium.innerHTML = '';
        
        sortedPlayers.slice(0, 3).forEach((player, index) => {
            const place = document.createElement('div');
            place.className = `podium-place podium-${index + 1}`;
            place.innerHTML = `
                <div class="place-number">${index + 1}</div>
                <div class="winner-name">${player.name}</div>
                <div class="winner-money">$${player.money}</div>
            `;
            podium.appendChild(place);
        });
    }
    
    addToLog('=== JUEGO TERMINADO ===');
    addToLog(`¡${sortedPlayers[0].name} es el ganador con $${sortedPlayers[0].money}!`);
}

// Inicializar cuando se carga
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}