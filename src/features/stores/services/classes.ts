import { ClassProgram } from "../types/class";

async function listClass() {
  return [];
}

async function getClass(id: string): Promise<ClassProgram> {
  return {
    id: id,
    name: "What is Eren doing?",
    description:
      "Eren Yeager (エレン・イェーガー Eren Yēgā?) was a former member of the Survey Corps. He was the main protagonist of Attack on Titan. He lived in Shiganshina District with his parents until the fall of Wall Maria, where he impotently witnessed his mother being eaten by a Titan.[33] This event would lead to Eren's intense hatred towards the Titans as he swore to wipe all of them off the face of the Earth.[34] ",
    price: 100,
    cover:
      "https://w.wallhaven.cc/full/rd/wallhaven-rdvxzj.jpg",
    intructor: {
      id: id,
      name: "Eren Yeager",
      avatarUrl:
        "https://i.pinimg.com/1200x/99/71/76/997176fee7a0a8f2c3ff56cc211d7190.jpg",
      jobTitle: "The Scout Regiment",
    },
  };
}

export { getClass, listClass };