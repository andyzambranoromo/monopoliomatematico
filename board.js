// board.js - Generación del tablero

// Generar el tablero de juego
function generateBoard() {
    console.log("Generando tablero...");
    const gameBoard = document.getElementById('game-board');
    if (!gameBoard) {
        console.error("No se encontró el elemento #game-board");
        return;
    }
    
    gameBoard.innerHTML = '';
   
    const boardLayout = [
        { type: 'corner', text: 'SALIDA', position: 0, emoji: "💰" },
        { type: 'property', propertyId: 1, position: 1 },
        { type: 'community', text: 'COMUNIDAD', position: 2, emoji: "🏛️" },
        { type: 'property', propertyId: 2, position: 3 },
        { type: 'tax', text: 'IMPUESTO $200', position: 4, emoji: "💸" },
        { type: 'railroad', railroadId: 1, position: 5 },
        { type: 'property', propertyId: 3, position: 6 },
        { type: 'chance', text: 'SUERTE', position: 7, emoji: "🎲" },
        { type: 'property', propertyId: 4, position: 8 },
        { type: 'property', propertyId: 5, position: 9 },
        { type: 'corner', text: 'CÁRCEL', position: 10, emoji: "🚓" },
       
        { type: 'property', propertyId: 6, position: 11 },
        { type: 'utility', utilityId: 1, position: 12 },
        { type: 'property', propertyId: 7, position: 13 },
        { type: 'property', propertyId: 8, position: 14 },
        { type: 'railroad', railroadId: 2, position: 15 },
        { type: 'property', propertyId: 9, position: 16 },
        { type: 'community', text: 'COMUNIDAD', position: 17, emoji: "🏛️" },
        { type: 'property', propertyId: 10, position: 18 },
        { type: 'property', propertyId: 11, position: 19 },
        { type: 'corner', text: 'PARADA', position: 20, emoji: "🅿️" },
       
        { type: 'property', propertyId: 12, position: 21 },
        { type: 'chance', text: 'SUERTE', position: 22, emoji: "🎲" },
        { type: 'property', propertyId: 13, position: 23 },
        { type: 'property', propertyId: 14, position: 24 },
        { type: 'railroad', railroadId: 3, position: 25 },
        { type: 'property', propertyId: 15, position: 26 },
        { type: 'property', propertyId: 16, position: 27 },
        { type: 'utility', utilityId: 2, position: 28 },
        { type: 'property', propertyId: 17, position: 29 },
        { type: 'corner', text: 'VE A LA CÁRCEL', position: 30, emoji: "🔒" },
       
        { type: 'property', propertyId: 18, position: 31 },
        { type: 'property', propertyId: 19, position: 32 },
        { type: 'community', text: 'COMUNIDAD', position: 33, emoji: "🏛️" },
        { type: 'property', propertyId: 20, position: 34 },
        { type: 'railroad', railroadId: 4, position: 35 },
        { type: 'chance', text: 'SUERTE', position: 36, emoji: "🎲" },
        { type: 'property', propertyId: 21, position: 37 },
        { type: 'tax', text: 'LUJO $100', position: 38, emoji: "💎" },
        { type: 'property', propertyId: 22, position: 39 }
    ];
   
    // Crear celdas
    boardLayout.forEach(cellInfo => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `cell-${cellInfo.position}`;
        cell.dataset.position = cellInfo.position;
       
        switch(cellInfo.type) {
            case 'corner':
                cell.className += ' corner';
                cell.innerHTML = `<div class="cell-icon">${cellInfo.emoji}</div><div>${cellInfo.text}</div>`;
                break;
            case 'property':
                const property = window.gameData.properties.find(p => p.id === cellInfo.propertyId);
                cell.className += ' property';
                cell.innerHTML = `
                    <div class="color-bar" style="background-color: ${property.color}"></div>
                    <div class="property-name">${property.name}</div>
                    <div class="property-price">$${property.price}</div>
                `;
                break;
            case 'chance':
                cell.className += ' chance';
                cell.innerHTML = `<div class="cell-icon">${cellInfo.emoji}</div><div>${cellInfo.text}</div>`;
                break;
            case 'community':
                cell.className += ' community';
                cell.innerHTML = `<div class="cell-icon">${cellInfo.emoji}</div><div>${cellInfo.text}</div>`;
                break;
            case 'tax':
                cell.className += ' tax';
                cell.innerHTML = `<div class="cell-icon">${cellInfo.emoji}</div><div>${cellInfo.text}</div>`;
                break;
            case 'utility':
                const utility = window.gameData.utilities.find(u => u.id === cellInfo.utilityId);
                cell.className += ' utility';
                cell.innerHTML = `
                    <div class="cell-icon">${utility.emoji}</div>
                    <div>${utility.name}</div>
                    <div class="property-price">$${utility.price}</div>
                `;
                break;
            case 'railroad':
                const railroad = window.gameData.railroads.find(r => r.id === cellInfo.railroadId);
                cell.className += ' railroad';
                cell.innerHTML = `
                    <div class="cell-icon">${railroad.emoji}</div>
                    <div>${railroad.name}</div>
                    <div class="property-price">$${railroad.price}</div>
                `;
                break;
        }
       
        gameBoard.appendChild(cell);
    });
   
    // Posicionar celdas
    positionBoardCells();
    console.log("Tablero generado correctamente");
}

// Posicionar celdas en el layout de Monopoly
function positionBoardCells() {
    const cells = document.querySelectorAll('.cell');
   
    cells.forEach(cell => {
        const position = parseInt(cell.dataset.position);
       
        // Reiniciar posicionamiento
        cell.style.gridColumn = 'auto';
        cell.style.gridRow = 'auto';
       
        // Fila inferior (0-10)
        if (position <= 10) {
            cell.style.gridRow = '11';
            cell.style.gridColumn = (11 - position) + '';
        }
        // Columna izquierda (11-19)
        else if (position <= 19) {
            cell.style.gridColumn = '1';
            cell.style.gridRow = (21 - position) + '';
        }
        // Fila superior (20-30)
        else if (position <= 30) {
            cell.style.gridRow = '1';
            cell.style.gridColumn = (position - 19) + '';
        }
        // Columna derecha (31-39)
        else {
            cell.style.gridColumn = '11';
            cell.style.gridRow = (position - 29) + '';
        }
    });
}

// Actualizar marcadores de jugadores
function updatePlayerMarkers() {
    if (!window.gameData || !window.gameData.players) return;
    
    // Limpiar marcadores existentes
    document.querySelectorAll('.player-marker').forEach(marker => marker.remove());
    document.querySelectorAll('.ownership-indicator').forEach(indicator => indicator.remove());
   
    // Agregar marcadores de jugadores
    window.gameData.players.forEach((player, index) => {
        if (!player.isBankrupt) {
            const cell = document.getElementById(`cell-${player.position}`);
            if (!cell) return;
            
            const marker = document.createElement('div');
            marker.className = 'player-marker';
            marker.style.backgroundColor = player.tokenColor;
            marker.title = player.name;
            marker.innerHTML = player.tokenSymbol;
           
            // Posicionar marcadores
            const offset = index * 8;
            if (player.position <= 10) {
                marker.style.bottom = `${5 + offset}px`;
                marker.style.left = '50%';
                marker.style.transform = 'translateX(-50%)';
            } else if (player.position <= 19) {
                marker.style.left = `${5 + offset}px`;
                marker.style.top = '50%';
                marker.style.transform = 'translateY(-50%)';
            } else if (player.position <= 30) {
                marker.style.top = `${5 + offset}px`;
                marker.style.left = '50%';
                marker.style.transform = 'translateX(-50%)';
            } else {
                marker.style.right = `${5 + offset}px`;
                marker.style.top = '50%';
                marker.style.transform = 'translateY(-50%)';
            }
           
            cell.appendChild(marker);
        }
    });
   
    // Agregar indicadores de propiedad
    window.gameData.players.forEach(player => {
        player.properties.forEach(property => {
            const cell = document.getElementById(`cell-${property.position}`);
            if (!cell) return;
            
            const indicator = document.createElement('div');
            indicator.className = 'ownership-indicator';
            indicator.style.backgroundColor = player.tokenColor;
            indicator.title = `Propiedad de ${player.name}`;
            indicator.innerHTML = player.tokenSymbol;
            cell.appendChild(indicator);
        });
    });
}

// Ejecutar cuando se carga
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateBoard);
} else {
    generateBoard();
}