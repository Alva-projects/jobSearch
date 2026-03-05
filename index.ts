// A function that searches for jobs
// A function that runs our app
// the command to start everything


interface Job {
  publication_date: string;
  headline: string;
  employer: { name: string };
  workplace_address: { municipality: string };
  number_of_vacancies?: number;
  application_contacts?: ApplicationContact[];
}

export interface ApplicationContact {
  name: any | null;
  description: string | null;
  email: string | null;
  telephone: any | null;
  contact_type: any | null;
}

const searchJobs = async (keyword1: string, keyword2: string) => {
  try {
    const result = `https://jobsearch.api.jobtechdev.se/search?q=${keyword1} ${keyword2}&offset=0&limit=10`;
    const response = await fetch(result);
    if (!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data.hits)){
      throw new Error(`Could not find data.`)
    }
    console.log(`\nFound ${data.hits.length} jobs`);
    console.log("-".repeat(50));
    console.log(data);

    data.hits.forEach((job: Job, index: number) => {
      const pubDate = new Date(job.publication_date);
      //console.log("pubDate: ", pubDate);

      console.log(`${index + 1}. ${job.headline}`);
      console.log(`Company: ${job.employer.name}`);
      console.log(`Location: ${job.workplace_address.municipality}`);
      console.log(`Number of positions open: ${job.number_of_vacancies}`);
      console.dir(job.application_contacts?.[0]?.description);

      console.log(`Publication: ${pubDate.toISOString().split("T")[0]}`);
      console.log("=".repeat(40));
    });
  } catch (error) {
    console.error(`Could not fetch jobs. Please try again later. ${error}`); 
  }
};

const runApp = () => {
  try {
    console.log("Welcome to the Job Search App!");
    console.log("This app searches for jobs using JobTeach API");
    const keyword1 = "Uppsala";
    const keyword2 = "Däckmontör"
    searchJobs(keyword1, keyword2);
  } catch (error) {
    console.error(error);
  }
};

runApp();
