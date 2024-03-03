import React, { useEffect, useRef, useState } from 'react';
import './App.css'; //  custom CSS file


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
  const [activeTab, setActiveTab] = useState('Visual'); // Define activeTab state
  const tabsBoxRef = useRef(null); // Ref for tabs box
  const [isDragging, setIsDragging] = useState(false); // Define isDragging state
  const [dragStartX, setDragStartX] = useState(0); // X-coordinate where drag started
  const [scrollStartX, setScrollStartX] = useState(0); // Initial scroll position

  const handleIcons = () => {
    const tabsBox = tabsBoxRef.current;
    if (!tabsBox) return;

    const arrowIcons = tabsBox.parentElement.querySelectorAll('.icon');
    if (!arrowIcons || arrowIcons.length !== 2) return;

    const maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    arrowIcons[0].style.display = tabsBox.scrollLeft <= 0 ? 'none' : 'flex';
    arrowIcons[1].style.display = maxScrollableWidth - tabsBox.scrollLeft <= 1 ? 'none' : 'flex';
  };

  useEffect(() => {
    const tabsBox = tabsBoxRef.current;
    if (!tabsBox) return;

    tabsBox.addEventListener('scroll', handleIcons);

    return () => {
      tabsBox.removeEventListener('scroll', handleIcons);
    };
  }, []);

  const handleDragStart = (event) => {
    setIsDragging(true);
    setDragStartX(event.clientX);
    setScrollStartX(tabsBoxRef.current.scrollLeft);
  };

  const handleDragMove = (event) => {
    if (!isDragging) return;

    const delta = event.clientX - dragStartX;
    tabsBoxRef.current.scrollLeft = scrollStartX - delta;
    handleIcons(); // Update arrow visibility
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleArrowClick = (direction) => {
    const tabsBox = tabsBoxRef.current;
    if (!tabsBox) return;

    tabsBox.scrollLeft += direction === 'left' ? -340 : 340;
    handleIcons(); // Update arrow visibility
  };

  const showTeamMembers = (category) => {
    setActiveTab(category); // Update activeTab state
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
    const listAnggotaContainer = document.getElementById('listAnggotaTableBody');
    listAnggotaContainer.innerHTML = '';

    for (const member of selectedCategory.members) {
      const memberElement = `<tr><td class="px-4 py-3 text-center">${member.name}</td></tr>`;
      listAnggotaContainer.innerHTML += memberElement;
    }
  };
    
  return (
    <div>
       <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Our Division</title>
  <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
  {/* Font Awesome CDN Link for Icons */}
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
  {/* Include the Google Fonts link directly in the HTML head */}
  <style dangerouslySetInnerHTML={{__html: "\nimport url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');\n\n" }} />
  {/* MDI Icons */}
  <link rel="stylesheet" href="https://cdn.materialdesignicons.com/6.5.95/css/materialdesignicons.min.css" />



  <div className="menu flex items-center justify-center py-auto px-auto"
        onMouseMove={handleDragMove}
        onMouseLeave={handleDragEnd}
        onMouseUp={handleDragEnd}>
        <div className="wrapper p-8 relative overflow-x-hidden max-w-screen-md mx-auto bg-white rounded-lg"
          onMouseDown={handleDragStart}>
          <div className="icon absolute top-0 left-0 h-full w-32 flex items-center ml-4" onClick={() => handleArrowClick('left')}>
            <i className="fa-solid fa-angle-left w-12 h-12 cursor-pointer text-xl text-center hover:bg-gray-200"></i>
          </div>
          <ul className="tabs-box dragging:select-none dragging:pointer-events-none flex overflow-x-hidden" id="categoryTabs" ref={tabsBoxRef}>
            <li className={`tab ${activeTab === 'Visual' ? 'active' : ''}`} onClick={() => showTeamMembers('Visual')}>Visual</li>
            <li className={`tab ${activeTab === 'Sponsor' ? 'active' : ''}`} onClick={() => showTeamMembers('Sponsor')}>Sponsor</li>
            <li className={`tab ${activeTab === 'Media_Relation' ? 'active' : ''}`} onClick={() => showTeamMembers('Media_Relation')}>Media Relation</li>
            <li className={`tab ${activeTab === 'Logistic' ? 'active' : ''}`} onClick={() => showTeamMembers('Logistic')}>Logistic</li>
            <li className={`tab ${activeTab === 'IT' ? 'active' : ''}`} onClick={() => showTeamMembers('IT')}>IT</li>
            <li className={`tab ${activeTab === 'Publikasi' ? 'active' : ''}`} onClick={() => showTeamMembers('Publikasi')}>Publikasi</li>
            <li className={`tab ${activeTab === 'Fresh_Money' ? 'active' : ''}`} onClick={() => showTeamMembers('Fresh_Money')}>Fresh Money</li>
            <li className={`tab ${activeTab === 'Event' ? 'active' : ''}`} onClick={() => showTeamMembers('Event')}>Event</li>
            <li className={`tab ${activeTab === 'BPH' ? 'active' : ''}`} onClick={() => showTeamMembers('BPH')}>BPH</li>
            <li className={`tab ${activeTab === 'Documentation' ? 'active' : ''}`} onClick={() => showTeamMembers('Documentation')}>Documentation</li>
            <li className={`tab ${activeTab === 'Secmin_1' ? 'active' : ''}`} onClick={() => showTeamMembers('Secmin_1')}>Secmin 1</li>
            <li className={`tab ${activeTab === 'Secmin_2' ? 'active' : ''}`} onClick={() => showTeamMembers('Secmin_2')}>Secmin 2</li>
            
            {/* Add other tabs */}
          </ul>
          <div className="icon absolute top-0 right-0 h-full w-32 flex items-center mr-4 justify-end" onClick={() => handleArrowClick('right')}>
            <i className="fa-solid fa-angle-right w-12 h-12 cursor-pointer text-xl text-center hover:bg-gray-200 "></i>
          </div>
        </div>
      </div>

      {/*anggota divisi */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
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