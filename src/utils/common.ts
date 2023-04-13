const titleCase = (str: string) => {
  let separate: string[] = str.toLowerCase().split(" ");

  for (let i = 0; i < separate.length; i++) {
    separate[i] = separate[i].charAt(0).toUpperCase() + separate[i].slice(1);
  }

  return separate.join(" ");
};

const generateDateString = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}/${year.toString()}`;
};

export { titleCase, generateDateString };
