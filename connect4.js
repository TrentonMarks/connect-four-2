class Connect4 {
    constructor(selector) {
        this.rows = 6;
        this.cols = 7;
        this.selector = selector;
        this.player = 'red';
        this.createGrid();
        this.setupEventListeners();
    }

    createGrid() {
        const $board = $(this.selector);
        for (let row = 0; row < this.rows; row++) {
            const $row = $('<div>')
                .addClass('row');
            for (let col = 0; col < this.cols; col++) {
                const $col = $('<div>')
                    .addClass('col empty')
                    .attr('data-col', col)
                    .attr('data-row', row);
                $row.append($col);
            }
            $board.append($row);
        }
    }

    setupEventListeners() {
        const $board = $(this.selector);
        const that = this;
        function findLastEmptyCell(col) {
            const cells = $(`.col[data-col='${col}']`);
            for (let i = cells.length; i >= 0; i--) {
                const $cell = $(cells[i]);
                if ($cell.hasClass('empty')) {
                    return $cell;
                }
            }
        }

        $board.on('mouseenter', '.col.empty', function() {
            const col = $(this).data('col');
            const $lastEmptyCell = findLastEmptyCell(col);
            $lastEmptyCell.addClass(`next-${that.player}`);
        });

        $board.on('mouseleave', '.col', function() {
            $('.col').removeClass(`next-${that.player}`);
        });

        $board.on('click', '.col.empty', function() {
            const col = $(this).data('col');
            const $lastEmptyCell = findLastEmptyCell(col);
            $lastEmptyCell.removeClass(`empty next-${that.player}`)
            console.log($lastEmptyCell);
            $lastEmptyCell.addClass(that.player);
            that.player = (that.player === 'red') ? 'black' : 'red';
            $(this).trigger('mouseenter');
        });
    }
}
