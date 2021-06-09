const Gameboy = require('serverboy');
const express = require('express');
const fs = require('fs');

const file_path = './PokemonRed.gb';
const rom = fs.readFileSync(file_path);

const gameboy = new Gameboy();
gameboy.loadRom(rom);

const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.listen(port, () => {
    console.log('listening at port ' + port);
});

app.get('/test', (req, res) => {
    const screen = gameboy.getScreen();
    res.send({ screen: screen });
    gameboy.doFrame();
});

// setInterval(() => {
//     console.dir(gameboy.getScreen());
//     gameboy.doFrame();
// }, 100);
