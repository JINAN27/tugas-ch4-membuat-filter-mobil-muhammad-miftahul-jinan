const http = require('http');
const { PORT = 8000 } = process.env;

const fs = require('fs');
const path = require('path');
const PUBLIC_DIRECTORY = path.join(__dirname, '../public');

//fungsi memanggil name
function getHTML(htmlFileName) 
    {
        const htmlFilePath = path.join(PUBLIC_DIRECTORY, htmlFileName);
        return fs.readFileSync(htmlFilePath, 'utf-8');
    }
function getCSS(cssFileName) 
    {
        const cssFilePath = path.join(PUBLIC_DIRECTORY, cssFileName);
        return fs.readFileSync(cssFilePath, 'utf-8');
    }
function getJS(jsFileName) 
    {
        const jsFilePath = path.join(PUBLIC_DIRECTORY, jsFileName);
        return fs.readFileSync(jsFilePath, 'utf-8');
    }
function getImage(imageFileName) 
    {
        const imageFilePath = path.join(PUBLIC_DIRECTORY, imageFileName);
        return fs.readFileSync(imageFilePath);
    }
function getJPG(imageFileName) 
    {
        const imageFilePath = path.join(PUBLIC_DIRECTORY, imageFileName);
        return fs.readFileSync(imageFilePath);
    }

function onRequest(req, res) 
{
    //Menampilkan file css, js dan image
    let CSS = '', JS = '', IMG = '';

    //memanggil css,js,png
    if (req.url.match('.css$')) 
        {
            CSS = req.url;
        } 
    else if (req.url.match('.js$')) 
        {
            JS = req.url;
        } 
    else if (req.url.match('.png$') || req.url.match('.jpg$')) 
        {
            IMG = req.url;
        }

    
    switch (req.url) 
    {
        //Mereturn search car.html
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(getHTML('search car.html'));
            return;
        //mereturn search car.html
        case '/cars':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(getHTML('search car.html'));
            return;
        //Memanggil file CSS
        case CSS:
            res.writeHead(200, { 'Content-Type': 'text/css' });                
            res.end(getCSS(CSS));
            return;
        //Memanggil JS
        case JS:
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(getJS(JS));
            return;
        //Memanggil IMG
        case IMG:
            res.writeHead(200, { 'Content-Type': 'image' });
            res.end(getImage(IMG));
            return;
        //Fungsi 404
        default:
            res.writeHead(404);
            res.end(getHTML('404.html'));
            break;
    }
}

const server = http.createServer(onRequest);

server.listen(PORT, '0.0.0.0', () => {
    console.log('The server is already running, please open it http://localhost:%d', PORT);
});
