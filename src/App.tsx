import './App.css';

import React, { useState } from 'react';

import { ipcRenderer } from 'electron';
import fs from 'fs';
import { createRoot } from 'react-dom/client';

const App = () => {
  const [files] = useState(() =>
    fs.readdirSync(process.cwd())
  );

  return (
    <div>
      <h1>
        Hello Electron!
      </h1>
      <div>Click the button to show a MessageBox: </div>
      <button onClick={async () => {
        await ipcRenderer.invoke('showMessageBox', {
          title: 'Hi'
        })
      }}>Show System Dialog</button>
      <p>Here are your files in this App read from a React hook</p>
      <ul>
        {
          files.map(file => <li key={file}>{file}</li>)
        }
      </ul>
    </div>
  );
};

const el = document.createElement("div");
document.body.appendChild(el)
createRoot(el).render(<App />);