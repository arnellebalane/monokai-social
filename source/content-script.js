const colors = {
    dark: '#272822',
    pink: '#f92672',
    cyan: '#66d9ef',
    green: '#a6e22e',
    purple: '#ae81ff',
    orange: '#fd971f'
};

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
        };
    }

    return {
        colorSelectors: {},
        backgroundSelectors: {}
    };
}

function insertRule(stylesheet, selectors, colorKey, property) {
    const color = colors[colorKey];
    const selector = selectors.join(', ');
    const rule = `
        ${selector} {
            ${property}: ${color} !important;
        }
    `;
    stylesheet.insertRule(rule, stylesheet.cssRules.length);
}

const {colorSelectors, backgroundSelectors} = getSelectors();

const style = document.createElement('style');
document.head.appendChild(style);

for (const [colorKey, selectors] of Object.entries(colorSelectors)) {
    insertRule(style.sheet, selectors, colorKey, 'color');
}

for (const [colorKey, selectors] of Object.entries(backgroundSelectors)) {
    insertRule(style.sheet, selectors, colorKey, 'background-color');
}
