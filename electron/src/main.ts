import { app, BrowserWindow } from "electron";
import path from "path";
import { spawn } from "child_process";

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: true,
    },
    icon: path.join(__dirname, "../../frontend/dist/favicon.ico"),
  });

  win.loadFile(path.join(__dirname, "../../frontend/dist/index.html"));
}

function startBackend() {
  const backendPath = path.join(__dirname, "../../backend/dist/index.js");

  const userDataPath = app.getPath("userData");
  const dbPath = path.join(userDataPath, "leetnote.db");

  const backend = spawn("node", [backendPath], {
    env: {
      ...process.env,
      DATABASE_URL: `file:${dbPath}`,
    },
  });

  backend.stdout.on("data", (data) => {
    console.log(`[backend]: ${data}`);
  });

  backend.stderr.on("data", (data) => {
    console.error(`[backend error]: ${data}`);
  });
}

app.whenReady().then(() => {
  startBackend();
  createWindow();
});
