const host = process.env.REACT_APP_API_BASE_URL;

async function createPatient(patientData) {
    try {
        const response = await fetch(`${host}/api/createPatient`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patientData),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error creating patient:', error);
        throw error;
    }
}

async function updateStatus(patientData) {
    try {
        const response = await fetch(`${host}/api/updateStatus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patientData),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error updating patient status:', error);
        throw error;
    }
}

async function updateColor(patientData) {
    try {
        const response = await fetch(`${host}/api/updateColor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patientData),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error updating clinic color:', error);
        throw error;
    }
}

async function changeClinic(patientData) {
    try {
        const response = await fetch(`${host}/api/changeClinic`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patientData),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error changing clinic for patient:', error);
        throw error;
    }
}

async function getClinicsForPatient(patientId) {
    try {
        const response = await fetch(`${host}/api/getClinicsForPatient`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: patientId }),
        });

        const result = await response.json();
        return result.clinics;
    } catch (error) {
        console.error('Error getting clinics for patient:', error);
        throw error;
    }
}

async function viewClinicPatients(clinicId) {
    try {
        const response = await fetch(`${host}/api/viewClinicPatients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: clinicId }),
        });

        const result = await response.json();
        return result.patients;
    } catch (error) {
        console.error('Error viewing clinic patients:', error);
        throw error;
    }
}

async function getPatients() {
    try {
        const response = await fetch(`${host}/api/getPatients`);
        const result = await response.json();
        return result.patientsInfo;
    } catch (error) {
        console.error('Error getting patients:', error);
        throw error;
    }
}

async function getPatient(name) {
    try {
        const response = await fetch(`${host}/api/getPatient/${name}`);
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error(`Error getting patient ${name}:`, error);
        throw error;
    }
}

export default {
    createPatient,
    updateStatus,
    updateColor,
    changeClinic,
    getClinicsForPatient,
    viewClinicPatients,
    getPatients,
    getPatient,
};
