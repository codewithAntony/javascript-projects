const previewBox = document.getElementById('previewBox');
const cssOutput = document.getElementById('cssOutput');
const inputs = document.querySelectorAll('input[type="range"]');
const copyButton = document.getElementById('copyButton');

function updateBorderRadius() {
    const topLeft = document.getElementById('topLeft').value;
    const topMiddle = document.getElementById('topMiddle').value;
    const topRight = document.getElementById('topRight').value;
    const middleRight = document.getElementById('middleRight').value;
    const bottomLeft = document.getElementById('bottomLeft').value;
    const middleLeft = document.getElementById('middleLeft').value;
    const bottomRight = document.getElementById('bottomRight').value;
    const middleBottom = document.getElementById('middleBottom').value;

    const borderRadiusValue = `${topLeft}px ${topMiddle}px ${topRight}px ${middleRight}px / ${bottomRight}px ${middleBottom}px ${bottomLeft}px ${middleLeft}px`;
    previewBox.style.borderRadius = borderRadiusValue;

    cssOutput.textContent = `border-radius: ${borderRadiusValue};`;
}

function copyToClipboard() {
    const cssText = cssOutput.textContent;
    navigator.clipboard.writeText(cssText).then(() => {
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copied to Clipboard'
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    })
}

inputs.forEach(input => {
    input.addEventListener('input', updateBorderRadius);
});


copyButton.addEventListener('click', copyToClipboard);

updateBorderRadius();