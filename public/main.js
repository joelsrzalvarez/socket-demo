document.addEventListener('DOMContentLoaded', () => {
    const socket = io("http://localhost:3000");

    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    const playerTitle = document.getElementById('playerTitle');

    function movePlayer(player, dx, dy) {
        const playerData = {
            id: player.id,
            dx: dx,
            dy: dy
        };
        socket.emit('move player', playerData);
    }

    socket.on('player number', (number) => {
        playerTitle.textContent = `Player ${number}`;
    });

    socket.on('player moved', (data) => {
        const player = document.getElementById(data.id);
        const computedStyle = window.getComputedStyle(player);
        const x = parseInt(computedStyle.left, 10) || 0;
        const y = parseInt(computedStyle.top, 10) || 0;
        player.style.left = `${x + data.dx}px`;
        player.style.top = `${y + data.dy}px`;
    });

    document.addEventListener('keydown', (event) => {
        let dx = 0;
        let dy = 0;

        switch (event.key) {
            case 'w': dy = -5; break;
            case 's': dy = 5; break;
            case 'a': dx = -5; break;
            case 'd': dx = 5; break;
            case 'ArrowUp': dy = -5; break;
            case 'ArrowDown': dy = 5; break;
            case 'ArrowLeft': dx = -5; break;
            case 'ArrowRight': dx = 5; break;
            default: return;
        }

        const player = event.key === 'w' || event.key === 's' || event.key === 'a' || event.key === 'd' ? player1 : player2;
        movePlayer(player, dx, dy);
    });
});
