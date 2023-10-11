export const capitalizeFirstLetter = (query: string): string => {
  return query.charAt(0).toUpperCase() + query.substring(1);
};

export function getFileTypeFromSrc(src: string) {
  const ext = src.split(".").pop();
  if (["jpg", "jpeg", "png", "gif"].includes(ext)) {
    return "image";
  } else if (["mp4", "webm"].includes(ext)) {
    return "video";
  } else if (ext === "md") {
    return "doc";
  } else {
    return "file";
  }
}

export function toDateTimeStringOmitDateOnSameDay(dateTime: Date) {
  const now = new Date();
  let format: Intl.DateTimeFormatOptions;
  if (
    dateTime.getDate() === now.getDate() &&
    dateTime.getMonth() === now.getMonth() &&
    dateTime.getFullYear() === now.getFullYear()
  ) {
    format = {
      hour: "2-digit",
      minute: "2-digit",
    };
  } else {
    format = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
  }
  return dateTime.toLocaleString("th-TH", format);
}
