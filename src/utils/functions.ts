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
  const startIndex = src.indexOf("%00") + 3;
  const endIndex = src.indexOf("?", startIndex);
  if (startIndex === -1) {
    console.error(
      new Error("Invalid src, cannot find %00 marking start of file name")
    );
    return src;
  }
  if (endIndex === -1) {
    return src.substring(startIndex);
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
