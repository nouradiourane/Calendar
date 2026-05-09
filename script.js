const grid = document.getElementById('calendarGrid');
const monthDisplay = document.getElementById('monthDisplay');
const modal = document.getElementById('modalOverlay');
const input = document.getElementById('eventInput');

let date = new Date();
// Load events from storage or start empty
let events = JSON.parse(localStorage.getItem('kawaii_events')) || {};

function renderCalendar() {
    grid.innerHTML = '';
    const month = date.getMonth();
    const year = date.getFullYear();

    monthDisplay.innerText = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Padding for start of month
    for (let i = 0; i < firstDay; i++) {
        const div = document.createElement('div');
        grid.appendChild(div);
    }

    // Creating each day
    for (let i = 1; i <= daysInMonth; i++) {
        const dayBox = document.createElement('div');
        dayBox.classList.add('day');
        dayBox.innerText = i;

        const dateId = `${year}-${month}-${i}`;
        if (events[dateId]) {
            const dot = document.createElement('div');
            dot.classList.add('event-dot');
            dayBox.appendChild(dot);
        }

        dayBox.onclick = () => openModal(dateId);
        grid.appendChild(dayBox);
    }
}

let activeDateId = null;

function openModal(id) {
    activeDateId = id;
    input.value = events[id] || '';
    modal.classList.remove('hidden');
}

document.getElementById('saveBtn').onclick = () => {
    if (input.value) {
        events[activeDateId] = input.value;
    } else {
        delete events[activeDateId];
    }
    localStorage.setItem('kawaii_events', JSON.stringify(events));
    modal.classList.add('hidden');
    renderCalendar();
};

document.getElementById('closeBtn').onclick = () => modal.classList.add('hidden');

document.getElementById('prevBtn').onclick = () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
};

document.getElementById('nextBtn').onclick = () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
};

document.getElementById('themeBtn').onclick = () => {
    document.body.classList.toggle('dark');
};

// Start the app
renderCalendar();
