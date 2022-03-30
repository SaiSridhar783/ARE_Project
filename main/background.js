import { app, Menu } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
	serve({ directory: "app" });
} else {
	app.setPath("userData", `${app.getPath("userData")} (development)`);
}

const template = [
	{
		label: "Edit",
		submenu: [
			{
				role: "undo",
			},
			{
				role: "redo",
			},
			{
				type: "separator",
			},
			{
				role: "cut",
			},
			{
				role: "copy",
			},
			{
				role: "paste",
			},
		],
	},

	{
		label: "View",
		submenu: [
			{
				role: "reload",
			},
			{
				role: "forcereload",
			},
			{
				type: "separator",
			},
			{
				role: "resetzoom",
			},
			{
				role: "zoomin",
			},
			{
				role: "zoomout",
			},
			{
				type: "separator",
			},
			{
				role: "togglefullscreen",
			},
		],
	},

	{
		role: "window",
		submenu: [
			{
				role: "minimize",
			},
			{
				role: "close",
			},
		],
	},

	{
		role: "help",
		submenu: [
			{
				label: "Learn More",
			},
			{
				label: "toggleDevTools",
			}
		],
	},
];

const menu = Menu.buildFromTemplate(template);
(async () => {
	await app.whenReady();

	const mainWindow = createWindow("main", {
		width: 1300,
		height: 1000,
	});

	Menu.setApplicationMenu(menu);

	if (isProd) {
		await mainWindow.loadURL("app://./home.html");
	} else {
		const port = process.argv[2];
		await mainWindow.loadURL(`http://localhost:${port}/home`);
		mainWindow.webContents.openDevTools();
	}
})();

app.on("window-all-closed", () => {
	app.quit();
});
