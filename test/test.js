const fs = require('fs');
var static = require('node-static');
const http = require('http');

const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const puppeteer = require('puppeteer');
process.env.CHROME_BIN = require('puppeteer').executablePath();

const file = new(static.Server)('./dist');
const server = http.createServer(function (req, res) {
    file.serve(req, res);
  }).listen(8080);


function imageMatch(expectedFile, actualFile) {
    const expected = PNG.sync.read(fs.readFileSync(expectedFile));
    const actual = PNG.sync.read(fs.readFileSync(actualFile));
    const {width, height} = expected;
    const diff = new PNG({width, height});
    const pixelDiff = pixelmatch(expected.data, actual.data, diff.data, width, height, {threshold: 0.1});
    
    if (pixelDiff > 100) {
        console.error(`Image ${expectedFile} did not match acutal ${actualFile}, ${pixelDiff} different!`);
        const diffImage = PNG.sync.write(diff);
        console.log('Diff image: ', 'data:image/png;base64,' + diffImage.toString('base64'));
        fs.writeFileSync('diff-'+actualFile, diffImage)
        process.exit(1);
    }
}

return (async () => {
    try {
        const browser = await puppeteer.launch({
            dumpio: true,
            args: [
              '--window-size=800,600',
            ],
          });
        const page = await browser.newPage();
        await page.goto('http://localhost:8080/')
        
        await page.waitForSelector('#excalibur-play', {visible: true});
        await page.waitForTimeout(1000); // give it a second
        await page.screenshot({path: 'loaded.png'});
        
        const start = await page.$('#excalibur-play');
        await start.click();
        await page.screenshot({path: 'play.png'});

        await browser.close();

        imageMatch('./test/images/expected-loaded.png', 'loaded.png');
        imageMatch('./test/images/expected-play.png', 'play.png');
        console.log('Test Success!');

    } finally {
        server.close();
    }
})();
