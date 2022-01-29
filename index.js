import fetch from 'node-fetch';
import Fastify from 'fastify';
import cors from 'fastify-cors';

const app = Fastify({
    logger: true
});
app.register(cors, {
    origin: true
});

app.get('/', async (req, res) => {
    try {
        const url = req.query.url;
        if(!url) {
            return res.send({
                error: 'URL is required'
            });
        }

        const body = await (await fetch(url)).text();
        return res.send(body);
    } catch (err) {
        return res.send({
            error: 'We couldn\'t fetch the url'
        });
    }
});

app.listen(3000);