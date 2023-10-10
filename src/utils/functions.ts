export const capitalizeFirstLetter = (query: string): string => {
  return query.charAt(0).toUpperCase() + query.substring(1);
};

export function getCustomFileTypeFromFile(file: File) {
  if (file.type.startsWith("image/")) {
    return "image";
  } else if (file.type.startsWith("video/")) {
    return "video";
  } else if (file.name.endsWith("md")) {
    return "doc";
  } else {
    return "file";
  }
}

export function getFileNameFromSrc(src: string) {
  const startIndex = src.indexOf("%00") + 3;
  const endIndex = src.indexOf("%00", startIndex);
  if (startIndex === -1 || endIndex === -1) {
    console.error(
      new Error("src does not contain two delimiting null characters")
    );
    return "";
  }
  return src.substring(startIndex, endIndex);
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
