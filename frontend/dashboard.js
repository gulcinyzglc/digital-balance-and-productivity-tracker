const API_URL = 'http://localhost:3000/api/usage';

const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    window.location.href = 'index.html';
}

const usageForm = document.getElementById('usageForm');
const usageList = document.getElementById('usageList');
const totalTime = document.getElementById('totalTime');
const totalRecords = document.getElementById('totalRecords');
const mostUsedApp = document.getElementById('mostUsedApp');
const productivityScore = document.getElementById('productivityScore');
const logoutBtn = document.getElementById('logoutBtn');

let editId = null;

async function fetchUsageRecords() {
    const response = await fetch(API_URL);
    const records = await response.json();

    usageList.innerHTML = '';

    let total = 0;
    let appTotals = {};
    let productiveTime = 0;

    records.forEach(record => {
        total += record.duration;

        appTotals[record.app_name] = (appTotals[record.app_name] || 0) + record.duration;

        const category = record.category.toLowerCase();

        if (
            category.includes('productivity') ||
            category.includes('study') ||
            category.includes('education') ||
            category.includes('coding')
        ) {
            productiveTime += record.duration;
        }

        const div = document.createElement('div');
        div.className = 'usage-item';

        div.innerHTML = `
            <div>
                <strong>${record.app_name}</strong><br>
                <span>${record.category} • ${record.duration} min • ${record.usage_date}</span>
            </div>

            <div>
                <button class="edit-btn" onclick="editRecord(${record.id}, '${record.app_name}', '${record.category}', ${record.duration}, '${record.usage_date}')">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteRecord(${record.id})">
                    Delete
                </button>
            </div>
        `;

        usageList.appendChild(div);
    });

    let topApp = '-';
    let maxTime = 0;

    for (let app in appTotals) {
        if (appTotals[app] > maxTime) {
            maxTime = appTotals[app];
            topApp = app;
        }
    }

    const score = total > 0 ? Math.round((productiveTime / total) * 100) : 0;

    totalTime.textContent = `${total} min`;
    totalRecords.textContent = records.length;
    mostUsedApp.textContent = topApp;
    productivityScore.textContent = `${score}%`;
}

usageForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const app_name = document.getElementById('app_name').value;
    const category = document.getElementById('category').value;
    const duration = Number(document.getElementById('duration').value);
    const usage_date = document.getElementById('usage_date').value;

    const recordData = {
        app_name,
        category,
        duration,
        usage_date
    };

    if (editId) {
        await fetch(`${API_URL}/${editId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recordData)
        });

        editId = null;
        usageForm.querySelector('button').textContent = 'Add Record';

    } else {
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recordData)
        });
    }

    usageForm.reset();
    fetchUsageRecords();
});

function editRecord(id, app_name, category, duration, usage_date) {
    editId = id;

    document.getElementById('app_name').value = app_name;
    document.getElementById('category').value = category;
    document.getElementById('duration').value = duration;
    document.getElementById('usage_date').value = usage_date;

    usageForm.querySelector('button').textContent = 'Update Record';
}

async function deleteRecord(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    fetchUsageRecords();
}

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});

fetchUsageRecords();