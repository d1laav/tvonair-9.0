import React, { useEffect } from 'react';
import './App.css'; // Assuming this is your custom CSS file



const showTeamMembers = (category) => {
  // Update the section with member images
  const teamMembersContainer = document.getElementById('teamMembers');
  const selectedCategory = teamData[category] || { coordinators: [], members: [] };

  teamMembersContainer.innerHTML = '';

  // Show coordinators at the top
  for (const [index, coordinator] of selectedCategory.coordinators.entries()) {
    if (coordinator.name) {
      // Use random image link for coordinator
      const coordinatorImageLink = getRandomImageLink();
      let coordinatorElement = `
        <div class="p-4 md:w-1/3 w-full flex flex-col text-center items-center">
          <div class="h-full flex flex-col items-center text-center">
            <img alt="team" class="flex-shrink-0 rounded-lg w-201 h-201 object-cover object-center mb-4 ${selectedCategory.coordinators.length === 2 ? 'md:-mx-2' : ''}" src="${coordinatorImageLink}">
            <div class="w-full">
              <h2 class="title-font font-medium text-lg text-gray-900">${coordinator.name}</h2>
              <h3 class="text-gray-500 mb-3">${coordinator.title}</h3>
            </div>
          </div>
        </div>
      `;
      if (selectedCategory.coordinators.length === 1) {
        // Saat hanya ada 1 koordinator, gunakan lebar penuh
        coordinatorElement = coordinatorElement.replace('md:w-1/3', 'md:w-full');
      } else if (selectedCategory.coordinators.length === 2) {
        // Saat ada 2 koordinator, ubah menjadi 4 kolom
        if (index === 0 || index === 1) {
          coordinatorElement = coordinatorElement.replace('md:w-1/3', 'md:w-1/2');
        }
        // Letakkan gambar pada kolom ke-2 dan ke-3 (indeks 1 dan 2)
        if (index === 1) {
          coordinatorElement = coordinatorElement.replace('md:w-1/2', 'md:w-1/4');
          coordinatorElement = coordinatorElement.replace('items-center', 'items-center md:ml-auto md:mr-auto');
        }
      }
      teamMembersContainer.innerHTML += coordinatorElement;
    }
  }

  // Show members
  for (const member of selectedCategory.members) {
    const memberElement = `
      <div class="p-4 md:w-1/3 w-full flex flex-col text-center items-center">
      </div>
    `;
    teamMembersContainer.innerHTML += memberElement;
  }

  // Update the section with the list of members
  const listAnggotaContainer = document.getElementById('listAnggotaTableBody');
  listAnggotaContainer.innerHTML = '';

  for (const member of selectedCategory.members) {
    const memberElement = `<tr><td class="px-4 py-3 text-center">${member.name}</td></tr>`;
    listAnggotaContainer.innerHTML += memberElement;
  }
};
const teamData = {
  Visual: {
    coordinators: [
      { name: 'ganjar mahmud ', title: 'Coordinator' },
      { name: 'ynag bener aja  ', title: 'Coordinator' },
      { name: 'rugi dongggg  ', title: 'Coordinator' },
    ],
    members: [
      { name: 'Tranter Jaskulski', title: 'Founder & Specialist' },
      { name: 'Abigail', title: 'Founder & Specialist' },
      { name: 'Jaskulski', title: 'Founder & Specialist' },
    ],
  },
  Sponsor: {
    coordinators: [
      { name: 'jokowi prabowo', title: 'Coordinator' },
      { name: 'si paling sponsor', title: 'Coordinator' },
    ],
    members: [
      { name: 'Anna Jagna', title: 'Tired & M. Specialist' },
      { name: 'Audrey Jagna', title: 'Tired & M. Specialist' },
      { name: 'Ava Jagna', title: 'Tired & M. Specialist' },
    ],
  },
  Media_Relation: {
    coordinators: [
      { name: 'lan cai tek guh', title: 'Coordinator' },
    ],
    members: [
      { name: 'Kenji Milton', title: 'Team Member' },
      { name: 'Kenji Milton', title: 'Team Member' },
      { name: 'Kenji Milton', title: 'Team Member' },
    ],
  },
  // Add other categories and team members as needed
};



const getRandomImageLink = () => {
  // Example of a placeholder image link. Replace it with your actual image links.
  const imageLinks = [
    'https://picsum.photos/id/201/201/201',
    'https://picsum.photos/seed/picsum/201/201',
    'https://picsum.photos/201/201?grayscale'
    // Add more image links as needed
  ];

  // Return a random image link
  return imageLinks[Math.floor(Math.random() * imageLinks.length)];
};

const App = () => {
  useEffect(() => {
   
    // Initially load the default category ('Visual')
    showTeamMembers('Visual');
  }, []);

  return (
    <div>
      <div className="menu flex items-center justify-center py-auto px-auto">
        <div className="wrapper p-8 relative overflow-x-hidden max-w-screen-md mx-auto bg-white rounded-lg">
          <div className="icon absolute top-0 left-0 h-full w-32 flex items-center ml-4 hidden "><i id="left" className="fa-solid fa-angle-left w-12 h-12 cursor-pointer text-xl text-center hover:bg-gray-200"></i></div>
          <ul className="tabs-box dragging:select-none dragging:pointer-events-none flex overflow-x-hidden" id="categoryTabs">
            <li className="tab " onClick={() => showTeamMembers('Visual')}>Visual</li>
            <li className="tab active " onClick={() => showTeamMembers('Sponsor')}>Sponsor</li>
            <li className="tab" onClick={() => showTeamMembers('Media_Relation')}>Media Relation</li>
            <li className="tab" onClick={() => showTeamMembers('Logistic')}>Logistic</li>
            <li className="tab" onClick={() => showTeamMembers('IT')}>IT</li>
            <li className="tab" onClick={() => showTeamMembers('Publikasi')}>Publikasi</li>
            <li className="tab" onClick={() => showTeamMembers('Fresh_Money')}>Fresh Money</li>
            <li className="tab" onClick={() => showTeamMembers('Event')}>Event</li>
            <li className="tab" onClick={() => showTeamMembers('BPH')}>BPH</li>
            <li className="tab" onClick={() => showTeamMembers('Documentation')}>Documentation</li>
            {/* Add other categories here */}
          </ul>
          <div className="icon absolute top-0 right-0 h-full w-32 flex items-center mr-4 justify-end"><i id="right" className="fa-solid fa-angle-right w-12 h-12 cursor-pointer text-xl text-center hover:bg-gray-200 "></i></div>
        </div>
      </div>

      {/*anggota divisi */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">OUR DIVISION</h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem harum aperiam possimus totam esse illo quisquam, error quis. Possimus eveniet sequi placeat delectus at optio eos. Quaerat odio quia quidem!</p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-green-500 inline-flex"></div>
            </div>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6" id="teamMembers">
            {/* Team members will be dynamically added here based on the selected category */}
          </div>

          {/* List Anggota */}
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">List Anggota</h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Banh mi cornhole echo park skateboard authentic crucifix neutra tilde lyft biodiesel artisan direct trade mumblecore 3 wolf moon twee</p>
            </div>

            {/* List of members */}
            <div className="lg:w-2/3 w-full mx-auto overflow-auto">
              <table className="table-auto w-full text-left whitespace-no-wrap">
                <tbody id="listAnggotaTableBody">
                  {/* Team members will be dynamically added here based on the selected category */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
