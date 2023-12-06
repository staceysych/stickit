export const colorPalette = {
  red: { main: "#D94169", light: "rgba(217, 65, 105, 0.15)" },
  blue: { main: "#3EC7D0", light: "rgba(62, 199, 208, 0.15)" },
  yellow: { main: "#FFC453", light: "rgba(255, 196, 83, 0.15)" },
  orange: { main: "#F29F80", light: "rgba(242, 159, 128, 0.15)" },
  pink: { main: "#F26363", light: "rgba(242, 99, 99, 0.15)" },
};

export const generateRandomColor = () => {
  const colors = Object.keys(colorPalette);
  return colors[Math.floor(Math.random() * colors.length)];
};