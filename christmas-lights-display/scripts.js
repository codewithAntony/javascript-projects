class ChristmasLightsDisplay {
    constructor(numRows, circleRadius, circleColors, intensity, intervalMs) {
        this.numRows = numRows;
        this.circleRadius = circleRadius;
        this.circleColors = circleColors;
        this.intensity = intensity;
        this.intervalMs = intervalMs;
        this.circles = [];
        this.intervalId = null;
        this.isRunning = false;
    }

    init() {
        this.createCircles();
        this.startDisplay();
    }

    createCircles() {
        const container = document.getElementById('christmas-lights-display');

        for (let row = 0; row < this.numRows; row++) {
            const rowCircles = [];
            for (let i = 0; i < 7; i++) {
                const circle = this.createCircle(i, row);
                container.appendChild(circle);
                rowCircles.push(circle);
            }
            this.circles.push(rowCircles);
        }
    }

    createCircle(index, row) {
        const circle = document.createElement('div');
        circle.classList.add('christmas-light');
        circle.style.width = `${this.circleRadius}px`;
        circle.style.height = `${this.circleRadius}px`;
        circle.style.backgroundColor = this.circleColors[index];
        circle.style.top = `${row * (this.circleRadius + 10)}px`;
        circle.style.left = `${index * (this.circleRadius + 10)}px`;
        circle.style.opacity = 0.3;
        return circle;
    }

    startDisplay() {
        this.intervalId = setInterval(() => {
            this.updateCircleIntensity();
            }, this.intervalMs);
            this.isRunning = true;
        }

    stopDisplay() {
        clearInterval(this.intervalId);
        this.isRunning = false;
    }

    updateCircleIntensity() {
        this.circles.forEach((row, rowIndex) => {
            row.forEach((circle, circleIndex) => {
            if (circleIndex === 0) {
                circle.style.opacity = this.intensity;
            } else {
                row[circleIndex - 1].style.opacity = 0.3;
                circle.style.opacity = this.intensity;
                }
            });
        });
    }
    
}

const display = new ChristmasLightsDisplay(
      3, // Number of rows
      40, // Circle radius
      ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'], // Circle colors
      0.8, // Intensity
      500 // Interval in milliseconds
    );
    display.init();

    // Add start/stop button functionality
    const startStopButton = document.getElementById('start-stop-button');
    startStopButton.addEventListener('click', () => {
        if (display.isRunning) {
            display.stopDisplay();
            startStopButton.textContent = 'Start';
        } else {
            display.startDisplay();
            startStopButton.textContent = 'Stop';
        }
    });