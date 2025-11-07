# 🧾 Gestionale Bilancio (Django + React)

Un’applicazione web per la gestione e visualizzazione del **Bilancio d’esercizio** (Stato Patrimoniale e Conto Economico) e registrazione contabile e anagrafiche (WIP).  
Il progetto è suddiviso in **backend** (Django REST Framework) e **frontend** (React + Vite + SWC).

---

## 🚀 Funzionalità attuali

### **Backend (Django)**

- API REST per la gestione delle voci di bilancio e delle anagrafiche (non ancora migrato):
  - Sezioni (Attivo / Passivo)
  - Categorie
  - Sottocategorie
  - Voci di bilancio con codice, nome, saldo e natura del conto (DARE/AVERE)
- Struttura dati multilivello (sezione → categoria → sottocategoria → voce)
- Serializzazione avanzata con campi derivati (`sottocategoria_codice`, `sottocategoria_nome`)
- Admin Django per la gestione manuale delle voci

### **Frontend (React + Vite)**

- Interfaccia tabellare con **Material UI** per visualizzazione e compilazione anagrafiche e scritture contabili
- Raggruppamento automatico multilivello (sezione → categoria → sottocategoria → voce)
- Esportazione delle tabelle
- Visualizzazione dinamica dei saldi e delle voci tramite chiamata API (`axios`)
- Componenti modulari (`Bilancio`, `BilancioTable`, ecc.)

---

## ⚙️ Installazione

### 🐍 Backend (Django + DRF)

#### 1️⃣ Creazione ambiente virtuale

```bash
uv init                    # OPZIONALE : SOLO SE SI VUOLE CREARE DA ZERO
uv venv
source .venv/bin/activate  # su Linux/Mac
# oppure
source .venv\Scripts\activate     # su Windows
uv sync                    # scarica le dipendenze necessarie dal file pyproject.toml
```

#### 2️⃣ Installazione pacchetti Python

```bash
uv add django djangorestframework corsheaders # Non richiesto se è stato lanciato uv sync
```

#### 3️⃣ Migrazioni iniziali

```bash
python manage.py makemigrations #opzionali se è stato cancellato il database
python manage.py migrate
```

#### 4️⃣ Avvio del server di sviluppo

```bash
python manage.py runserver
```

Il backend sarà disponibile su
👉 **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

### ⚛️ Frontend (React + Vite)

#### 1️⃣ Creazione progetto

```bash
npm create vite@latest frontend -- --template react-swc
cd frontend
```

#### 2️⃣ Installazione dipendenze

```bash
npm install
npm install @mui/material @emotion/react @emotion/styled axios
```

#### 3️⃣ Avvio del server di sviluppo

```bash
npm run dev
```

Il frontend sarà disponibile su
👉 **[http://127.0.0.1:5173](http://127.0.0.1:5173)**

---

## 🔗 Collegamento Frontend ↔ Backend

Nel file `Bilancio.jsx` del frontend, l’app chiama l’API Django:

```js
axios.get("http://127.0.0.1:8000/api/bilancio/voci/");
```

Assicurati di aver abilitato **CORS** nel backend (`settings.py`):

```python
INSTALLED_APPS = [
    ...
    "corsheaders",
    "rest_framework",
    "bilancio",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    ...
]

CORS_ALLOW_ALL_ORIGINS = True  # per sviluppo locale
```

---

## 🧠 Stato attuale

✅ Backend WIP con API multilivello per il bilancio e registrazione
✅ Frontend funzionante con tabelle dinamiche raggruppate per visualizzazione e registrazione
✅ Integrazione Django REST + React

🚧 In lavorazione:

- Filtri, totali e calcoli automatici per le sezioni
- Collegamento API bilancio e registrazione
- CRUD completo lato frontend
- Esportazione Excel e CSV direttamente da UI (90% completo) + Export PDF

---

## 📜 Licenza

Progetto personale

---

### 👤 Autore

- **Matteo Spoladore**
- 📧 Email: --
- 📦 Stack: Django REST + React + Vite + Material UI
