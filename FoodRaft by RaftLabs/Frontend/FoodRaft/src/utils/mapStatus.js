export const mapStatus = (status) =>
  status ? status.toLowerCase().replaceAll("_", " ") : "";
