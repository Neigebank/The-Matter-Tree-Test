// ************ Themes ************
const themes = {
	1: "aqua"
};
const theme_names = {
	aqua: "Aqua"
};
function changeTheme() {
	let aqua = player.theme == "aqua";
	colors_theme = colors[player.theme || "default"];
	document.body.style.setProperty('--background', aqua ? "#001f3f" : "#0c0c0c");
	document.body.style.setProperty('--background_tooltip', aqua ? "rgba(0, 15, 31, 0.75)" : "rgba(0, 0, 0, 0.75)");
	document.body.style.setProperty('--color', aqua ? "#bfdfff" : "#dfdfdf");
	document.body.style.setProperty('--points', aqua ? "#dfefff" : "#ffffff");
	document.body.style.setProperty("--locked", aqua ? "#c4a7b3" : "#bf8f8f");
}
function getThemeName() {
	return player.theme ? theme_names[player.theme] : "Default";
}
function switchTheme() {
	if (player.theme === null)
		player.theme = themes[1];
	else {
		player.theme = themes[Object.keys(themes)[player.theme] + 1];
		if (!player.theme)
			player.theme = null;
	}
	changeTheme();
	resizeCanvas();
}