document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('#card');
    const ctx = card.getContext('2d');

    const card_w = parseInt(card.getAttribute('width'));
    const card_h = parseInt(card.getAttribute('height'));
    const card_dim = 5;
    const sq_size = 100;
    const sq_gap = 10;
    const title_w = 36;

    let background_color = 'white';
    let square_color = 'gray';
    let text_color = 'black';
    
    ctx.textAlign = 'center';

    let bingo_title = 'Bingo Card';
    let items = ['empty']
    let free_space = true;

    // Render card header
    function drawHeader(text) {
        ctx.font = '54px Verdana';
        ctx.textBaseline = 'top';
        ctx.fillStyle = text_color;
        ctx.fillText(text, card_w / 2, (title_w / 2) + 20);
    }

    function drawSquareLabel(text, x, y) {
        ctx.textBaseline = 'middle';
        let font_size = Math.min((sq_size / 3) / (text.length / 4.5), sq_size / 3);
        ctx.font = font_size + 'px Verdana';
        ctx.fillText(text, x + (sq_size / 2), y + (sq_size / 2));
    }

    // Render bingo squares
    function drawSquareGrid(size) {
        let grid_w = (sq_size * size) + (sq_gap * (size - 1));

        let x = x_start = (card_w / 2) - (grid_w / 2);
        let y = (card_h / 2) - (grid_w / 2) + title_w;

        let item_pool = items.slice();
        let randomItem;

        for (let i = 0; i < size; i++) {
            x = x_start;
            for (let j = 0; j < size; j++) {
                ctx.fillStyle = square_color;
                ctx.fillRect(x, y, sq_size, sq_size);
                ctx.fillStyle = text_color;
                if (i === (size - 1) / 2 && j === (size - 1) / 2 && free_space) {
                    drawSquareLabel('FREE', x, y);
                } else {
                    if (item_pool.length === 0) {
                        item_pool = items.slice();
                    }
                    randomItem = Math.floor(Math.random() * item_pool.length);
                    drawSquareLabel(item_pool[randomItem], x, y);
                    item_pool.splice(randomItem, 1);
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

        background_color = data.get('background-color');
        square_color = data.get('square-color');
        text_color = data.get('text-color');

        ctx.fillStyle = background_color;
        ctx.fillRect(0, 0, card_w, card_h);

        if (title)
        {
            bingo_title = title;
        }
        
        drawHeader(bingo_title);
        drawSquareGrid(card_dim);
    }); 

    // Download card
    const download = document.querySelector('#download');

    download.addEventListener('click', () => {
        const data = card.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = data;
        link.download = 'bingo-card.png'
        link.click();
    });

    // Render initial card
    drawHeader(bingo_title);
    drawSquareGrid(card_dim);
});