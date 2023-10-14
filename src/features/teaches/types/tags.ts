type Tag = {
  tagID: string;
  name: string;
};

const mockAvailableTags: Tag[] = [
  {
    tagID: "1",
    name: "Web Development",
  },
  {
    tagID: "2",
    name: "Mobile Development",
  },
  {
    tagID: "3",
    name: "Data Science",
  },
  {
    tagID: "4",
    name: "Machine Learning",
  },
  {
    tagID: "5",
    name: "Artificial Intelligence",
  },
  {
    tagID: "6",
    name: "Cyber Security",
  },
  {
    tagID: "7",
    name: "Cloud Computing",
  },
  {
    tagID: "8",
    name: "DevOps",
  },
  {
    tagID: "9",
    name: "Game Development",
  },
  {
    tagID: "10",
    name: "Programming Languages",
  },
];

export type { Tag };
export { mockAvailableTags };
