export const extractFirstParagraph = (htmlString: string) => {
  const match = htmlString.match(/<p>(.*?)<\/p>/);
  return match ? match[1] : null;
};

export const fortmatDate = (date: string) => {
  return new Date(date).toLocaleDateString(["en-US"], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
