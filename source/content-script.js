const colors = {
    dark: '#272822',
    pink: '#f92672',
    cyan: '#66d9ef',
    green: '#a6e22e',
    purple: '#ae81ff',
    orange: '#fd971f'
};

const {colorSelectors, backgroundSelectors} = getSelectors() || {};

const style = document.createElement('style');
document.head.appendChild(style);

const stylesheet = style.sheet;

for (const [colorKey, selectors] of Object.entries(colorSelectors || {})) {
    insertRule(selectors, colorKey, 'color');
}

for (const [colorKey, selectors] of Object.entries(backgroundSelectors || {})) {
    insertRule(selectors, colorKey, 'background-color');
}

function getSelectors() {
    const hostname = location.hostname;

    if (hostname.includes('twitter')) {
        return {
            colorSelectors: {
                pink: ['.tweet .fullname'],
                cyan: ['.tweet .tweet-text'],
                green: ['.tweet .username'],
                purple: ['.tweet .tweet-timestamp']
            },
            backgroundSelectors: {}
        }
    }
    return null;
}

function insertRule(selectors, colorKey, property) {
    const color = colors[colorKey];
    const selector = selectors.join(', ');
    const rule = `
        ${selector} {
            ${property}: ${color} !important;
        }
    `;
    stylesheet.insertRule(rule, stylesheet.cssRules.length);
}
