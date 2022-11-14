interface Job {
  "id": string;
  "name": string;
  "email": string;
  "phone": number;
  "title": string;
  "salary": string;
  "address": string;
  "benefits": string[];
  "location": {
    "lat": number;
    "long": number;
  },
  "pictures": string[];
  "createdAt": string;
  "updatedAt": string;
  "description": string;
  "employment_type": string[];
}

interface Description {
  about: string;
  paragraphs: { title: string, body: string }[],
}
