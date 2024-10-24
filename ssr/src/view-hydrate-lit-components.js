import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { render } from "@lit-labs/ssr";
import { collectResult } from "@lit-labs/ssr/lib/render-result.js";
import '../ssr-available-components.js';

export default async (req, res) => {
    const markup = getMarkupFromRequest(req);
    const content = await collectResult(render(unsafeHTML(markup)));
    res.send(content);
}

function getMarkupFromRequest(req) {
    if (req.is('text/plain') || req.is('text/html')) {
        return req.body;
    } else {
        console.log('Unsupported content type');
        return '';
    }
}