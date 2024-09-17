document.addEventListener('DOMContentLoaded', () => {
    const calendar = new Calendar();
    calendar.init();
});

class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.events = JSON.parse(localStorage.getItem('calendarEvents')) || [];
        this.isDarkMode = false;
    }

    init() {
        this.renderCalendar();
        this.addEventListeners();
    }

    renderCalendar() {
        const calendarContainer = document.getElementById('calendar');
        calendarContainer.innerHTML = '';

        const header = this.createHeader();
        const daysContainer = this.createDaysContainer();

        calendarContainer.appendChild(header);
        calendarContainer.appendChild(daysContainer);

        this.renderEvents();
    }

    createHeader() {
        const header = document.createElement('div');
        header.className = 'calendar-header';
        
        const title = document.createElement('h1');
        title.textContent = 'Calendar';
        
        const themeToggle = document.createElement('button');
        themeToggle.textContent = this.isDarkMode ? '☀️' : '🌙';
        themeToggle.onclick = () => this.toggleTheme();

        header.appendChild(title);
        header.appendChild(themeToggle);

        return header;
    }

    createDaysContainer() {
        const daysContainer = document.createElement('div');
        daysContainer.className = 'calendar-days';

        const daysInMonth = this.getDaysInMonth(this.currentDate);
        daysInMonth.forEach(date => {
        const dayElement = this.createDayElement(date);
        daysContainer.appendChild(dayElement);
        });

        return daysContainer;
    }

    createDayElement(date) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.dataset.date = date.toISOString();

        const dateNumber = document.createElement('span');
        dateNumber.textContent = date.getDate();
        dayElement.appendChild(dateNumber);

        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.onclick = () => this.showEventModal(date);
        dayElement.appendChild(addButton);

        return dayElement;
    }

    renderEvents() {
        this.events.forEach(event => {
        const eventDate = new Date(event.date);
        const dayElement = document.querySelector(`.calendar-day[data-date="${eventDate.toISOString()}"]`);
        if (dayElement) {
            const eventElement = this.createEventElement(event);
            dayElement.appendChild(eventElement);
        }
        });
    }

    createEventElement(event) {
        const eventElement = document.createElement('div');
        eventElement.className = 'calendar-event';
        eventElement.textContent = event.title;
        eventElement.draggable = true;

        eventElement.ondragstart = (e) => {
        e.dataTransfer.setData('text/plain', event.id);
        };

        const editButton = document.createElement('button');
        editButton.textContent = '✏️';
        editButton.onclick = (e) => {
        e.stopPropagation();
        this.showEventModal(new Date(event.date), event);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.onclick = (e) => {
        e.stopPropagation();
        this.deleteEvent(event.id);
        };

        eventElement.appendChild(editButton);
        eventElement.appendChild(deleteButton);

        return eventElement;
    }

    addEventListeners() {
        document.addEventListener('dragover', (e) => {
        e.preventDefault();
        });

        document.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedEventId = e.dataTransfer.getData('text');
        const targetDay = e.target.closest('.calendar-day');
        if (targetDay) {
            this.moveEvent(draggedEventId, new Date(targetDay.dataset.date));
        }
        });
    }

    showEventModal(date, event = null) {
        const modal = document.createElement('div');
        modal.className = 'event-modal';

        const form = document.createElement('form');
        form.innerHTML = `
        <input type="text" name="title" value="${event ? event.title : ''}" placeholder="Event Title" required>
        <label>
            <input type="checkbox" name="reminder" ${event && event.reminder ? 'checked' : ''}>
            Set Reminder
        </label>
        <button type="submit">${event ? 'Update' : 'Add'} Event</button>
        `;

        form.onsubmit = (e) => {
        e.preventDefault();
        const title = form.title.value;
        const reminder = form.reminder.checked;
        if (event) {
            this.updateEvent(event.id, title, reminder);
        } else {
            this.addEvent(date, title, reminder);
        }
        document.body.removeChild(modal);
        };

        modal.appendChild(form);
        document.body.appendChild(modal);
    }

    addEvent(date, title, reminder) {
        const newEvent = { id: Date.now(), date: date.toISOString(), title, reminder };
        this.events.push(newEvent);
        this.saveEvents();
        this.renderCalendar();
    }

    updateEvent(id, title, reminder) {
        this.events = this.events.map(event => 
        event.id === id ? { ...event, title, reminder } : event
        );
        this.saveEvents();
        this.renderCalendar();
    }

    deleteEvent(id) {
        this.events = this.events.filter(event => event.id !== id);
        this.saveEvents();
        this.renderCalendar();
    }

    moveEvent(eventId, newDate) {
        this.events = this.events.map(event => 
        event.id === parseInt(eventId) ? { ...event, date: newDate.toISOString() } : event
        );
        this.saveEvents();
        this.renderCalendar();
    }

    saveEvents() {
        localStorage.setItem('calendarEvents', JSON.stringify(this.events));
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle('dark-mode');
        this.renderCalendar();
    }

    getDaysInMonth(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
    }
}