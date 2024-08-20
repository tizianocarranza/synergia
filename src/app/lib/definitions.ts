export const specialties = [
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express.js",
    "Next.js",
    "GraphQL",
    "Redux",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
    "Sass",
    "Webpack",
    "Babel",
    "Jest",
    "Cypress",
    "Mocha",
    "Chai",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Google Cloud Platform",
    "Firebase",
    "Git",
    "GitHub",
    "GitLab",
    "JIRA",
    "Agile Methodologies",
    "Scrum",
    "CI/CD",
    "RESTful APIs",
    "Microservices",
    "OAuth",
    "JWT",
    "Python",
    "Django",
    "Flask",
    "Java",
    "Spring Boot",
    "C#",
    ".NET Core",
    "Ruby on Rails",
    "PHP",
    "Laravel",
    "Go",
    "Rust",
    "GraphQL",
    "Apollo",
    "Elasticsearch",
    "Redis",
    "Kafka",
    "Other"
] as const;  // 'as const' convierte el array en un tuple de valores literales

export type Specialty = typeof specialties[number]; //crea un tipo que puede ser cualquiera de los valores en el array specialties.

export const specialtyColors: { [key in Specialty]: string } = {
    "React": "#61DAFB",
    "TypeScript": "#3178C6",
    "JavaScript": "#F7DF1E",
    "Node.js": "#68A063",
    "Express.js": "#6E6E6E",
    "Next.js": "#6E6E6E",
    "GraphQL": "#E10098",
    "Redux": "#A774DB",
    "Tailwind CSS": "#38B2AC",
    "HTML5": "#E34F26",
    "CSS3": "#1572B6",
    "Sass": "#CC6699",
    "Webpack": "#8DD6F9",
    "Babel": "#F9DC3E",
    "Jest": "#D9534F",
    "Cypress": "#4A525A",
    "Mocha": "#A7856F",
    "Chai": "#D9534F",
    "MongoDB": "#47A248",
    "PostgreSQL": "#336791",
    "MySQL": "#4479A1",
    "Docker": "#2496ED",
    "Kubernetes": "#326CE5",
    "AWS": "#FF9900",
    "Azure": "#0078D4",
    "Google Cloud Platform": "#4285F4",
    "Firebase": "#FFCA28",
    "Git": "#F05032",
    "GitHub": "#6E6E6E",
    "GitLab": "#FC6D26",
    "JIRA": "#0052CC",
    "Agile Methodologies": "#DD0031",
    "Scrum": "#0C5A8E",
    "CI/CD": "#2F74C0",
    "RESTful APIs": "#00A5C9",
    "Microservices": "#FF5733",
    "OAuth": "#6E6E6E",
    "JWT": "#6E6E6E",
    "Python": "#3776AB",
    "Django": "#3C5233",
    "Flask": "#6E6E6E",
    "Java": "#007396",
    "Spring Boot": "#6DB33F",
    "C#": "#239120",
    ".NET Core": "#7F4DB4",
    "Ruby on Rails": "#CC0000",
    "PHP": "#777BB4",
    "Laravel": "#FF2D20",
    "Go": "#00ADD8",
    "Rust": "#DEA584",
    "Apollo": "#554CA5",
    "Elasticsearch": "#005571",
    "Redis": "#DC382D",
    "Kafka": "#6E6E6E",
    "Other": "#CCCCCC"
};


export const areas = [
    'Technology',
    'Industries',
    'Consulting',
    'Finance',
    'Healthcare',
    'Education',
    'Retail',
    'Manufacturing',
    'Energy',
    'Other'
] as const;

export type Area = typeof areas[number];

export const areaColors: { [key in Area]: string } = {
    'Technology': '#4CAF50',
    'Industries': '#FFC107',
    'Consulting': '#03A9F4',
    'Finance': '#FF5722',
    'Healthcare': '#8BC34A',
    'Education': '#9C27B0',
    'Retail': '#FF9800',
    'Manufacturing': '#673AB7',
    'Energy': '#009688',
    'Other': '#9E9E9E'
}


export type user = {
    _id: string;
    name: string;
    email: string;
    password: string;
    description: string;
    image?: string;
}
export type professional = user & {
    experience: number,
    specialty: Specialty,
    employmentStatus: "employed" | "unemployed"
};
export type professionalWithColors = professional & {
    color: string,
    cardColor: string
}

export type organization = user & {
    area: Area,
    website?: string
}
export type organizationWithColors = organization & {
    color: string,
    cardColor: string 
}




