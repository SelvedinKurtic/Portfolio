export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "FasTrak Visor Holder",
    description: "Designed and 3D-prototyped a custom automotive mounting system using Fusion 360 and AutoCAD.",
    image: "/fastrak/visor-render.PNG",
    tags: ["Fusion 360", "AutoCAD", "3D Prototyping"],
    liveUrl: "/projects/fastrak",
    githubUrl: "",
  },
    {
    id: 2,
    title: "Lab Automation & Material Research",
    description: "Programmed UR Robots to automate mechanical testing and data analysis on novel polymer composites at CSUMB.",
    image: "/PistResearch/researchposter.png",
    tags: ["UR Robots", "Polymer Composites", "Materials Testing"],
    liveUrl: "/projects/PistResearch",
    githubUrl: "",
  }
];
