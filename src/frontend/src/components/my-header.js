import {css, html, LitElement} from "lit";

export class MyHeader extends LitElement {
    static get properties() {
        return {
            title: { type: String },
            subtitle: { type: String },
        }
    }

    constructor() {
        super();
        this.title = '';
        this.subtitle = '';
    }

    render() {
        return html`
            <header>
                <h1>${this.title}</h1>
                <h2>${this.subtitle}</h2>
            </header>
        `;
    }

    static get styles() {
        return css`
            header {
                background-color: #333;
                color: white;
                padding: 1rem;
            }
            h1 {
                font-size: 2rem;
            }
            h2 {
                font-size: 1.5rem;
            }
        `;
    };
}

window.customElements.define('my-header', MyHeader);