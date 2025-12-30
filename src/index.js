document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('#card');
    const ctx = card.getContext('2d');

    const card_w = parseInt(card.getAttribute('width'));
    const card_h = parseInt(card.getAttribute('height'));
    const card_dim = 5;
    const sq_size = 60;
    const sq_gap = 10;
    const title_w = 20;

    let background_color = 'white';
    let square_color = 'gray';
    let text_color = 'black';

    card.style.backgroundColor = background_color;
    
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let bingo_title = 'Bingo Card';
    let items = ['empty']
    let free_space = true;

    // Render card header
    function drawHeader(text) {
        ctx.font = '30px Verdana';
        ctx.fillStyle = 'black';
        ctx.fillText(text, card_w / 2, (title_w / 2) + 20);
    }

    function drawSquareLabel(text, x, y) {
        ctx.fillText(text, x + (sq_size / 2), y + (sq_size / 2));
    }

    // Render bingo squares
    function drawSquareGrid(size) {
        ctx.font = '20px Verdana';
        let grid_w = (sq_size * size) + (sq_gap * (size - 1));

        let x = x_start = (card_w / 2) - (grid_w / 2);
        let y = (card_h / 2) - (grid_w / 2) + title_w;

        for (let i = 0; i < size; i++) {
            x = x_start;
            for (let j = 0; j < size; j++) {
                ctx.fillStyle = square_color;
                ctx.fillRect(x, y, sq_size, sq_size);
                ctx.fillStyle = text_color;
                if (i === (size - 1) / 2 && j === (size - 1) / 2 && free_space) {
                    drawSquareLabel('FREE', x, y);
                } else {
                    drawSquareLabel('text', x, y);
                }
                x += sq_size + sq_gap;
            }
            y += sq_size + sq_gap;
        }
    }

    // Get form data
    const form = document.querySelector('#options');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let data = new FormData(form);
        console.log(data);

        let title = data.get('title');
        items = data.get('items').split('\n');
        free_space = data.get('free-space') === 'on';

        ctx.clearRect(0, 0, card_w, card_h);

        if (title)
        {
            bingo_title = title;
        }

        drawHeader(bingo_title);
        drawSquareGrid(card_dim);
    }); 

    // Render initial card
    drawHeader(bingo_title);
    drawSquareGrid(card_dim);
});