import { Course } from "../types/course";

async function listCourse() {
  return [];
}

async function getCourse(id: string): Promise<Course> {
  return {
    id: id,
    name: "What is Sakuya doing?",
    description:
      "Sakuya Izayoi (十六夜 咲夜, Izayoi Sakuya) is the Chief Maid who serves Remilia Scarlet, the head of the Scarlet Devil Mansion. She is also apparently the only human living within the mansion grounds. She is implied to be a vampire hunter like her mistress, but it is unknown if she is a human or a vampire. She is known for her ability to manipulate time.",
    price: 100,
    cover:
      "https://rare-gallery.com/livewalls/imgpreview/96504-Sakuya-Izayoi.jpg",
    rating: 4.5,
    reviewerCount: 1222,
    intructor: {
      id: id,
      name: "Supaporn Panyayai",
      avatarUrl:
        "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101._RI_TTW_.jpg",
      jobTitle: "Software Engineer",
    },
  };
}

export { getCourse, listCourse };
