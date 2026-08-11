const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

//FLOODZONES

export async function getFloodZones() {
    const res = await fetch(`${API_BASE_URL}/flood-zones`);
    if (!res.ok) {
        throw new Error('Gagal mengambil data flood zones');
    }
    return res.json();
}

export async function getFloodZonesById(id: string) {
    const res = await fetch(`${API_BASE_URL}/flood-zones/${id}`);
    if (!res.ok) {
        throw new Error('Floodzone tidak ditemukan');
    }
    return res.json();
}

export async function createFloodZone(data: Record<string, unknown>) {
    const res = await fetch(`${API_BASE_URL}/flood-zones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Gagal membuat flood zone');
    return res.json();
}

//REPORTS

export async function getReports() {
    const res = await fetch(`${API_BASE_URL}/reports`);
    if (!res.ok) {
        throw new Error('Gagal memuat data reports')
    }
    return res.json();
}

export async function getReportsById(id: string) {
    const res = await fetch(`${API_BASE_URL}/reports/${id}`);
    if (!res.ok) {
        throw new Error('Data reports tidak ada');
    }
    return res.json();
}

export async function createReport(data: Record<string, unknown>) {
    const res = await fetch(`${API_BASE_URL}/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Gagal membuat laporan');
    return res.json();
}
export async function updateReport(id: string, data: Record<string, unknown>) {
    const res = await fetch(`${API_BASE_URL}/reports/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Gagal update laporan');
    return res.json();
}

// INFRASTRUCTURE
export async function getInfrastructure() {
    const res = await fetch(`${API_BASE_URL}/infrastructure`);
    if (!res.ok) {
        throw new Error('Gagal mengambil data infrastruktur');
    }
    return res.json();
}

// ALERTS
export async function getAlerts() {
    const res = await fetch(`${API_BASE_URL}/alerts`);
    if (!res.ok) {
        throw new Error('Gagal mengambil data alerts');
    }
    return res.json();
}

// ===== AUTHENTICATION =====
export async function loginUser(data: Record<string, unknown>) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Gagal login! Periksa email dan password.');
    }
    return res.json();
}

