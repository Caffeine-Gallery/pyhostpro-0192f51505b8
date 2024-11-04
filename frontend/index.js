import { backend } from 'declarations/backend';

let pyodide;

async function loadPyodide() {
    pyodide = await loadPyodide();
}

loadPyodide();

const uploadForm = document.getElementById('uploadForm');
const scriptsList = document.getElementById('scriptsList');
const scriptView = document.getElementById('scriptView');
const scriptContent = document.getElementById('scriptContent');
const runScriptBtn = document.getElementById('runScript');
const scriptOutput = document.getElementById('scriptOutput');

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('scriptName').value;
    const code = document.getElementById('scriptCode').value;
    
    try {
        await backend.uploadScript(name, code);
        alert('Script uploaded successfully!');
        uploadForm.reset();
        loadScriptsList();
    } catch (error) {
        console.error('Error uploading script:', error);
        alert('Failed to upload script. Please try again.');
    }
});

async function loadScriptsList() {
    try {
        const scripts = await backend.listScripts();
        scriptsList.innerHTML = '';
        scripts.forEach(script => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = script;
            li.addEventListener('click', () => loadScript(script));
            scriptsList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading scripts list:', error);
    }
}

async function loadScript(name) {
    try {
        const script = await backend.getScript(name);
        if (script) {
            scriptContent.textContent = script;
            scriptView.style.display = 'block';
            runScriptBtn.onclick = () => runScript(script);
        } else {
            alert('Script not found');
        }
    } catch (error) {
        console.error('Error loading script:', error);
    }
}

async function runScript(code) {
    try {
        scriptOutput.innerHTML = '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>';
        const result = await pyodide.runPythonAsync(code);
        scriptOutput.innerHTML = `<pre class="bg-light p-3 rounded">${result}</pre>`;
    } catch (error) {
        scriptOutput.innerHTML = `<pre class="bg-danger text-white p-3 rounded">Error: ${error.message}</pre>`;
    }
}

loadScriptsList();
