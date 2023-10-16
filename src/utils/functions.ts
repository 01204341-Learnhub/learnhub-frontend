export const capitalizeFirstLetter = (query: string): string => {
  return query.charAt(0).toUpperCase() + query.substring(1);
};

export function getCustomFileTypeFromFile(file: File) {
  if (file.type.startsWith("image/")) {
    return "image";
  } else if (file.type.startsWith("video/")) {
    return "video";
  } else {
    return "file";
  }
}

export function getFileNameFromSrc(src: string) {
  // If src is not hosted on our firebase storage, return src as is.
  if (!src.includes("firebasestorage.googleapis.com")) {
    return src;
  }
  // If src doesn't contain %00, marking the start of file name, return src as is.
  if (!src.includes("%00")) {
    return src;
  }
  const startIndex = src.indexOf("%00") + 3;
  if (!src.includes("?")) {
    return src.substring(startIndex);
  }
  const endIndex = src.indexOf("?", startIndex);
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
