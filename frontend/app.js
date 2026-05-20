const API_USAGE = 'http://localhost:5000/api/usage';
const API_AUTH = 'http://localhost:5000/api/auth';
const API_STATS = 'http://localhost:5000/api/stats';
const API_GOALS = 'http://localhost:5000/api/goals';

const loginPage = document.getElementById('loginPage');
const registerPage = document.getElementById('registerPage');
const dashboardPage = document.getElementById('dashboardPage');

const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const usageForm = document.getElementById('usageForm');

const usageList = document.getElementById('usageList');

const totalTime = document.getElementById('totalTime');
const productiveTime = document.getElementById('productiveTime');
const unproductiveTime = document.getElementById('unproductiveTime');

const totalRecords = document.getElementById('totalRecords');
const mostUsedApp = document.getElementById('mostUsedApp');

const productivityScore = document.getElementById('productivityScore');
const sidebarScore = document.getElementById('sidebarScore');

const donutTotal = document.getElementById('donutTotal');
const topAppsList = document.getElementById('topAppsList');

const logoutBtn = document.getElementById('logoutBtn');
const goalForm = document.getElementById('goalForm');
const goalsList = document.getElementById('goalsList');

let editId = null;

function getAuthHeaders() {
    const token = localStorage.getItem('token');

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

function getAppIcon(appName) {
    const icons = {
        "Instagram": '<i class="fa-brands fa-instagram"></i>',
        "YouTube": '<i class="fa-brands fa-youtube"></i>',
        "TikTok": '<i class="fa-brands fa-tiktok"></i>',
        "WhatsApp": '<i class="fa-brands fa-whatsapp"></i>',
        "Netflix": '<i class="fa-solid fa-film"></i>',
        "Spotify": '<i class="fa-brands fa-spotify"></i>',
        "Discord": '<i class="fa-brands fa-discord"></i>',
        "Google Chrome": '<i class="fa-brands fa-chrome"></i>',
        "VS Code": '<i class="fa-solid fa-code"></i>',
        "ChatGPT": '<i class="fa-solid fa-robot"></i>',
        "Other": '<i class="fa-solid fa-mobile-screen"></i>'
    };

    return icons[appName] || '<i class="fa-solid fa-mobile-screen"></i>';
}

function getAppClass(appName) {
    const classes = {
        "Instagram": "instagram-icon",
        "YouTube": "youtube-icon",
        "TikTok": "tiktok-icon",
        "WhatsApp": "whatsapp-icon",
        "Netflix": "netflix-icon",
        "Spotify": "spotify-icon",
        "Discord": "discord-icon",
        "Google Chrome": "chrome-icon",
        "VS Code": "vscode-icon",
        "ChatGPT": "chatgpt-icon",
        "Other": "default-icon"
    };

    return classes[appName] || "default-icon";
}

function showPage(page) {
    loginPage.classList.add('hidden');
    registerPage.classList.add('hidden');
    dashboardPage.classList.add('hidden');

    page.classList.remove('hidden');
}

showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    showPage(registerPage);
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    showPage(loginPage);
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const response = await fetch(`${API_AUTH}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (response.ok) {
        alert('Registration successful');

        registerForm.reset();
        showPage(loginPage);

    } else {
        alert(data.error);
    }
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch(`${API_AUTH}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {

        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);

        loginForm.reset();

        showPage(dashboardPage);

        fetchUsageRecords();
        fetchStats();
        fetchGoals();

    } else {
        alert(data.error);
    }
});

async function fetchStats() {

    const response = await fetch(API_STATS, {
        headers: getAuthHeaders()
    });

    const data = await response.json();

    totalTime.textContent =
        `${data.totalTime || 0} min`;

    donutTotal.textContent =
        `${data.totalTime || 0} min`;

    productiveTime.textContent =
        `${data.productiveTime || 0} min`;

    unproductiveTime.textContent =
        `${data.unproductiveTime || 0} min`;

    productivityScore.textContent =
        `${data.productivityScore || 0}%`;

    sidebarScore.textContent =
        `${data.productivityScore || 0}%`;

    mostUsedApp.innerHTML = data.mostUsedApp
        ? `${getAppIcon(data.mostUsedApp)} ${data.mostUsedApp}`
        : '-';

    renderTopApps(data.topApps || []);


    const goal = 180;

    const productive = data.productiveTime || 0;

    const percentage = Math.min(
        (productive / goal) * 100,
        100
    );

    document.getElementById('goalProgressText').textContent =
        `${productive} / ${goal} min`;

    document.getElementById('goalProgressBar').style.width =
        `${percentage}%`;
}

function renderTopApps(apps) {
    topAppsList.innerHTML = '';

    if (!apps || apps.length === 0) {
        topAppsList.innerHTML =
            `<p class="empty-state">No application data yet.</p>`;
        return;
    }

    apps.forEach(app => {
        const appName = app.app || app.app_name || app.name;
        const duration = app.duration || app.total_duration || 0;

        const item = document.createElement('div');
        item.className = 'top-app-item';

        item.innerHTML = `
            <div class="top-app-left">
                <div class="app-icon ${getAppClass(appName)}">
                    ${getAppIcon(appName)}
                </div>

                <span>${appName}</span>
            </div>

            <strong>${duration} min</strong>
        `;

        topAppsList.appendChild(item);
    });
}

async function fetchUsageRecords() {

    const response = await fetch(API_USAGE, {
        headers: getAuthHeaders()
    });

    const records = await response.json();

    usageList.innerHTML = '';

    totalRecords.textContent = records.length;

    records.forEach(record => {

        const div = document.createElement('div');

        div.className = 'usage-item';

        div.innerHTML = `
            <div class="usage-title">

                <div class="app-icon ${getAppClass(record.app_name)}">
                    ${getAppIcon(record.app_name)}
                </div>

                <div>
                    <strong>${record.app_name}</strong>
                </div>

            </div>

            <span class="category-badge">
                ${record.category}
            </span>

            <span>${record.duration} min</span>

            <span>${record.usage_date}</span>

            <div>

                <button class="edit-btn"
                    onclick="editRecord(
                        ${record.id},
                        '${record.app_name}',
                        '${record.category}',
                        ${record.duration},
                        '${record.usage_date}'
                    )">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="delete-btn"
                    onclick="deleteRecord(${record.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>
        `;

        usageList.appendChild(div);
    });
}

usageForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const app_name =
        document.getElementById('app_name').value;

    const category =
        document.getElementById('category').value;

    const duration =
        Number(document.getElementById('duration').value);

    const usage_date =
        document.getElementById('usage_date').value;

    const recordData = {
        app_name,
        category,
        duration,
        usage_date
    };

    if (editId) {

        await fetch(`${API_USAGE}/${editId}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(recordData)
        });

        editId = null;

        usageForm.querySelector('button').innerHTML =
            '<i class="fa-solid fa-plus"></i> Add Record';

    } else {

        await fetch(API_USAGE, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(recordData)
        });
    }

    usageForm.reset();

    fetchUsageRecords();
    fetchStats();
});

function editRecord(
    id,
    app_name,
    category,
    duration,
    usage_date
) {

    editId = id;

    document.getElementById('app_name').value =
        app_name;

    document.getElementById('category').value =
        category;

    document.getElementById('duration').value =
        duration;

    document.getElementById('usage_date').value =
        usage_date;

    usageForm.querySelector('button').innerHTML =
        '<i class="fa-solid fa-pen"></i> Update Record';
}

async function deleteRecord(id) {

    await fetch(`${API_USAGE}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });

    fetchUsageRecords();
    fetchStats();
}

logoutBtn.addEventListener('click', () => {

    localStorage.removeItem('user');
    localStorage.removeItem('token');

    showPage(loginPage);
});

const savedUser = localStorage.getItem('user');
const savedToken = localStorage.getItem('token');

if (savedUser && savedToken) {

    showPage(dashboardPage);

    fetchUsageRecords();
    fetchStats();
    fetchGoals();

} else {

    showPage(loginPage);
}
async function fetchGoals() {

    const response = await fetch(API_GOALS, {
        headers: getAuthHeaders()
    });

    const goals = await response.json();

    renderGoals(goals);
}

function renderGoals(goals) {

    goalsList.innerHTML = '';

    if (goals.length === 0) {

        goalsList.innerHTML =
            `<p class="empty-state">No goals added yet.</p>`;

        return;
    }

    fetch(API_USAGE, {
        headers: getAuthHeaders()
    })
    .then(res => res.json())
    .then(records => {

        goals.forEach(goal => {

            let currentUsage = 0;

            records.forEach(record => {

                if (
                    record.app_name.toLowerCase() ===
                    goal.title.toLowerCase()
                ) {
                    currentUsage += record.duration;
                }
            });

            const percentage = Math.min(
                (currentUsage / goal.target_minutes) * 100,
                100
            );

            const isExceeded =
                currentUsage > goal.target_minutes;

            const div = document.createElement('div');

            div.className = 'goal-item';

            div.innerHTML = `
                <div class="goal-top">
                    <h4>${goal.title}</h4>

                    <span>
                        ${currentUsage} / ${goal.target_minutes} min
                    </span>
                </div>

                <div class="goal-progress">
                    <div
                        class="goal-progress-fill"
                        style="width:${percentage}%">
                    </div>
                </div>

                <div class="goal-top">

                    <p class="goal-status
                        ${isExceeded ? 'goal-bad' : 'goal-good'}">

                        ${
                            isExceeded
                            ? 'Limit exceeded'
                            : 'Within limit'
                        }

                    </p>

                    <button class="delete-btn"
                        onclick="deleteGoal(${goal.id})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>
            `;

            goalsList.appendChild(div);
        });
    });
}

goalForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const title =
        document.getElementById('goalTitle').value;

    const target_minutes =
        Number(document.getElementById('goalTarget').value);

    await fetch(API_GOALS, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
            title,
            target_minutes
        })
    });

    goalForm.reset();

    fetchGoals();
});

async function deleteGoal(id) {

    await fetch(`${API_GOALS}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });

    fetchGoals();
}