import logo from './logo.svg';
import './App.css';
import

function App() {


  
  return (
    <div>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Our Division</title>
  <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
  {/* Font Awesome CDN Link for Icons */}
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
  {/* Include the Google Fonts link directly in the HTML head */}
  <style dangerouslySetInnerHTML={{__html: "\n           @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');\n           \n" }} />
  {/* MDI Icons */}
  <link rel="stylesheet" href="https://cdn.materialdesignicons.com/6.5.95/css/materialdesignicons.min.css" />
  <div className="menu flex items-center justify-center py-auto px-auto">
    <div className="wrapper p-8 relative overflow-x-hidden max-w-screen-md mx-auto bg-white rounded-lg">
      <div className="icon absolute top-0 left-0 h-full w-32 flex items-center ml-4 hidden "><i id="left" className="fa-solid fa-angle-left w-12 h-12 cursor-pointer text-xl text-center hover:bg-gray-200" /></div>
      <ul className="tabs-box dragging:select-none dragging:pointer-events-none flex overflow-x-hidden" id="categoryTabs">
        <li className="tab " onclick="showTeamMembers('Visual')">Visual</li>
        <li className="tab active " onclick="showTeamMembers('Sponsor')">Sponsor</li>
        <li className="tab" onclick="showTeamMembers('Media_Relation')">Media Relation</li>
        <li className="tab" onclick="showTeamMembers('Logistic')">Logistic</li>
        <li className="tab" onclick="showTeamMembers('IT')">IT</li>
        <li className="tab" onclick="showTeamMembers('Publikasi')">Publikasi</li>
        <li className="tab" onclick="showTeamMembers('Fresh_Money')">Fresh Money</li>
        <li className="tab" onclick="showTeamMembers('Event')">Event</li>
        <li className="tab" onclick="showTeamMembers('BPH')">BPH</li>
        <li className="tab" onclick="showTeamMembers('Documentation')">Documentation</li>
        {/* Add other categories here */}
      </ul>
      <div className="icon absolute top-0 right-0 h-full w-32 flex items-center mr-4 justify-end"><i id="right" className="fa-solid fa-angle-right w-12 h-12 cursor-pointer text-xl text-center hover:bg-gray-200 " /></div>
    </div>
  </div>
  {/*anggota divisi */}
  <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
      <div className="text-center mb-20">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">OUR DIVISION</h1>
        <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem harum aperiam possimus totam esse illo quisquam, error quis. Possimus eveniet sequi placeat delectus at optio eos. Quaerat odio quia quidem!</p>
        <div className="flex mt-6 justify-center">
          <div className="w-16 h-1 rounded-full bg-green-500 inline-flex" />
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
}

export default App;
