const previewBox = document.getElementById('previewBox');
        const cssOutput = document.getElementById('cssOutput');
        const inputs = document.querySelectorAll('input[type="range"]');

        function updateBorderRadius() {
            const topLeft = document.getElementById('topLeft').value;
            const topRight = document.getElementById('topRight').value;
            const bottomLeft = document.getElementById('bottomLeft').value;
            const bottomRight = document.getElementById('bottomRight').value;

            const borderRadiusValue = `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
            previewBox.style.borderRadius = borderRadiusValue;

            cssOutput.textContent = `border-radius: ${borderRadiusValue};`;
        }

        inputs.forEach(input => {
            input.addEventListener('input', updateBorderRadius);
        });

        updateBorderRadius();