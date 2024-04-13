import React, { useEffect, useRef, useState } from "react";
import tv_onair_logo from "./assets/tv_onair_logo.png";
import rocket_icon from "./assets/rocket_icon.png";
import jam from "./assets/jam.png";
import speaker from "./assets/speaker.png";
import insta_logo from "./assets/insta_logo.png";
import gmail_logo from "./assets/gmail_logo.png";
import tiktok_logo from "./assets/tiktok_logo.png";
import homeBG from "./assets/homeBG.png";
import abunawas from "./assets/Abunawas.jpeg";
import buynana from "./assets/Buynana.jpg";
import kinomaru from "./assets/Kinomaru.jpeg";
import multisouvenir from "./assets/Multisouvenir.jpeg";
import pandaboo from "./assets/Pandaboo.jpeg";
import shermic from "./assets/Shermiclogo.webp";
import tendarental from "./assets/Tendarental.jpeg";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, Element } from "react-scroll";
import HashLoader from "react-spinners/HashLoader";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
// import { useLayoutEffect } from "react";

function App() {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const tabsBoxRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleIcons = () => {
    const tabsBox = tabsBoxRef.current;
    if (!tabsBox) return;

    const arrowIcons = tabsBox.parentElement.querySelectorAll(".icon");
    if (!arrowIcons || arrowIcons.length !== 2) return;

    const maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    setShowLeftArrow(tabsBox.scrollLeft > 0);
    setShowRightArrow(maxScrollableWidth - tabsBox.scrollLeft > 1);
  };

  const [nav, setNav] = useState(false);
  const [animated, setAnimated] = useState(false);

  const closeNav = () => {
    setNav(false);
    setTimeout(() => {
      setAnimated(false);
    }, 500);
  };

  const toggleNav = () => {
    setNav(!nav);
    setAnimated(true);
  };

  const home = useRef(null);
  const about = useRef(null);
  const divisions = useRef(null);
  const padiSadi = useRef(null);

  // divisions
  const showTeamMembers = (category) => {
    // Update the section with member images
    const teamMembersContainer = document.getElementById("teamMembers");
    const selectedCategory = teamData[category] || {
      coordinators: [],
      members: [],
    };

    teamMembersContainer.innerHTML = "";

    // Show coordinators at the top
    for (const [
      index,
      coordinator,
    ] of selectedCategory.coordinators.entries()) {
      if (coordinator.name) {
        // Use random image link for coordinator
        const coordinatorImageLink = getRandomImageLink();
        let coordinatorElement = `
          <div class="p-4 md:w-1/3 w-full flex flex-col text-center items-center">
            <div class="h-full flex flex-col items-center text-center">
              <img alt="team" class="flex-shrink-0 rounded-lg w-201 h-201 object-cover object-center mb-4 ${
                selectedCategory.coordinators.length === 2 ? "md:-mx-2" : ""
              }" src="${coordinatorImageLink}">
              <div class="w-full">
                <h2 class="title-font font-medium text-lg text-gray-900">${
                  coordinator.name
                }</h2>
                <h3 class="text-gray-500 mb-3">${coordinator.title}</h3>
              </div>
            </div>
          </div>
        `;
        if (selectedCategory.coordinators.length === 1) {
          // Saat hanya ada 1 koordinator, gunakan lebar penuh
          coordinatorElement = coordinatorElement.replace(
            "md:w-1/3",
            "md:w-full"
          );
        } else if (selectedCategory.coordinators.length === 2) {
          // Saat ada 2 koordinator, ubah menjadi 4 kolom
          if (index === 0 || index === 1) {
            coordinatorElement = coordinatorElement.replace(
              "md:w-1/3",
              "md:w-1/2"
            );
          }
          // Letakkan gambar pada kolom ke-2 dan ke-3 (indeks 1 dan 2)
          if (index === 1) {
            coordinatorElement = coordinatorElement.replace(
              "md:w-1/2",
              "md:w-1/4"
            );
            coordinatorElement = coordinatorElement.replace(
              "items-center",
              "items-center md:ml-auto md:mr-auto"
            );
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
    const listAnggotaContainer = document.getElementById(
      "listAnggotaTableBody"
    );
    listAnggotaContainer.innerHTML = "";

    for (const member of selectedCategory.members) {
      const memberElement = `<tr><td class="px-4 py-3 text-center">${member.name}</td></tr>`;
      listAnggotaContainer.innerHTML += memberElement;
    }
  };

  const teamData = {
    Visual: {
      coordinators: [
        { name: "ganjar mahmud ", title: "Coordinator" },
        { name: "ynag bener aja  ", title: "Coordinator" },
        { name: "rugi dongggg  ", title: "Coordinator" },
      ],
      members: [
        { name: "Tranter Jaskulski", title: "Founder & Specialist" },
        { name: "Abigail", title: "Founder & Specialist" },
        { name: "Jaskulski", title: "Founder & Specialist" },
      ],
    },
    Sponsor: {
      coordinators: [
        { name: "jokowi prabowo", title: "Coordinator" },
        { name: "si paling sponsor", title: "Coordinator" },
      ],
      members: [
        { name: "Anna Jagna", title: "Tired & M. Specialist" },
        { name: "Audrey Jagna", title: "Tired & M. Specialist" },
        { name: "Ava Jagna", title: "Tired & M. Specialist" },
      ],
    },
    Media_Relation: {
      coordinators: [{ name: "lan cai tek guh", title: "Coordinator" }],
      members: [
        { name: "Kenji Milton", title: "Team Member" },
        { name: "Kenji Milton", title: "Team Member" },
        { name: "Kenji Milton", title: "Team Member" },
      ],
    },
    // Add other categories and team members as needed
  };

  const getRandomImageLink = () => {
    // Example of a placeholder image link. Replace it with your actual image links.
    const imageLinks = [
      "https://picsum.photos/id/201/201/201",
      "https://picsum.photos/seed/picsum/201/201",
      "https://picsum.photos/201/201?grayscale",
      // Add more image links as needed
    ];

    // Return a random image link
    return imageLinks[Math.floor(Math.random() * imageLinks.length)];
  };

  
  useEffect(() => {
    AOS.init({ duration: 2000 });
    const tabsBox = tabsBoxRef.current;
    if (!tabsBox) return;

    tabsBox.addEventListener("scroll", handleScroll);

    return () => {
      tabsBox.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const tabsBox = tabsBoxRef.current;
    if (!tabsBox) return;

    const maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    setShowLeftArrow(tabsBox.scrollLeft > 0); // Tombol kiri muncul jika ada yang bisa discroll ke kiri
    setShowRightArrow(maxScrollableWidth - tabsBox.scrollLeft > 1); // Tombol kanan muncul jika ada yang bisa discroll ke kanan
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleArrowClick = (direction) => {
    const tabsBox = tabsBoxRef.current;
    if (!tabsBox) return;

    const scrollAmount = 340; // Jumlah scroll setiap kali tombol panah diklik
    tabsBox.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
  };

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)

    }, 0)
  }, [])

  return (
    <div className="App">
      {/* Font Awesome CDN Link for Icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
      />
      {/* MDI Icons */}
      <link
        rel="stylesheet"
        href="https://cdn.materialdesignicons.com/6.5.95/css/materialdesignicons.min.css"
      />
      {loading ? (
        <HashLoader
          color={"#fff57a"}
          loading={loading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          {/* Navbar */}
          <div className="font-forNavbar flex justify-between items-center w-full h-20 px-4 bg-gradient-to-r from-customBlue to-customDarkBlue shadow-2xl fixed z-10">
            <ul className="hidden md:flex px-8 items-center">
              <li className="mx-2 px-4 cursor-pointer uppercase font-medium text-white group hover:text-customYellow">
                <Link
                  to="home"
                  smooth={true}
                  offset={0}
                  duration={1000}
                  className="duration-200 relative overflow-hidden"
                >
                  home
                  <span className="absolute h-1 bg-white w-full rounded left-0 bottom-[-10px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out"></span>
                </Link>
              </li>
              <li className="mx-2 px-4 cursor-pointer uppercase font-medium text-white group hover:text-customYellow">
                <Link
                  to="about"
                  smooth={true}
                  offset={-50}
                  duration={1000}
                  className="duration-200 relative overflow-hidden"
                >
                  about us
                  <span className="absolute h-1 bg-white w-full rounded left-0 bottom-[-10px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out"></span>
                </Link>
              </li>
              <li className="mx-2 px-4 cursor-pointer uppercase font-medium text-white group hover:text-customYellow">
                <Link
                  to="padiSadi"
                  smooth={true}
                  offset={-78}
                  duration={1000}
                  className="duration-200 relative overflow-hidden"
                >
                  PaDi & SaDi
                  <span className="absolute h-1 bg-white w-full rounded left-0 bottom-[-10px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out"></span>
                </Link>
              </li>
              <li className="mx-2 px-4 cursor-pointer uppercase font-medium text-white group hover:text-customYellow">
                <Link
                  to="divisions"
                  smooth={true}
                  offset={-85}
                  duration={1000}
                  className="duration-200 relative overflow-hidden"
                >
                  divisions
                  <span className="absolute h-1 bg-white w-full rounded left-0 bottom-[-10px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out"></span>
                </Link>
              </li>
            </ul>
            <ul className="flex items-center">
              <li className="mx-2">
                <a
                  href="https://forms.gle/3W527C2BR2hYHGQg6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <button class="button flex items-center">
                    Register Now{" "}
                    <img
                      src={speaker}
                      alt="speaker"
                      className="w-8 h-8 mb-2 drop-shadow"
                    />
                  </button>
                </a>
              </li>
            </ul>

            {/* IconBar */}
            <div
              onClick={toggleNav}
              className="cursor-pointer pr-4 z-10 text-white md:hidden ml-auto transition-transform duration-200 ease-in-out transform hover:scale-110"
            >
              {nav ? <FaTimes size={35} /> : <FaBars size={35} />}
            </div>

            {/* Navbar Mobile/Responsive */}
            {nav && (
              <div className="navbar-mobile">
                <ul
                  className={`flex flex-col justify-center items-center absolute top-0 right-0 w-full h-screen bg-gradient-to-b from-customBlue to-customDarkBlue text-white text-xl transition-transform duration-500`}
                >
                  <li className="px-4 cursor-pointer uppercase py-6">
                    <Link
                      to="home"
                      smooth={true}
                      offset={0}
                      duration={1000}
                      className="hover:text-gray-500 duration-200 scale-110"
                      onClick={closeNav}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="px-4 cursor-pointer uppercase py-6">
                    <Link
                      to="about"
                      smooth={true}
                      offset={-30}
                      duration={1000}
                      className="hover:text-gray-500 duration-200 scale-110"
                      onClick={closeNav}
                    >
                      about us
                    </Link>
                  </li>
                  <li className="px-4 cursor-pointer uppercase py-6">
                    <Link
                      to="padiSadi"
                      smooth={true}
                      offset={-90}
                      duration={1000}
                      className="hover:text-gray-500 duration-200 scale-110"
                      onClick={closeNav}
                    >
                      Padi & Sadi
                    </Link>
                  </li>
                  <li className="px-4 cursor-pointer uppercase py-6">
                    <Link
                      to="divisions"
                      smooth={true}
                      offset={-80}
                      duration={1000}
                      className="hover:text-gray-500 duration-200 scale-110"
                      onClick={closeNav}
                    >
                      divisions
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Home */}
          <Element name="home">
            <div
              ref={home}
              className="h-screen w-full relative bg-image"
              style={{
                backgroundImage: `url(${homeBG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="max-w-screen-lg mx-auto flex items-center justify-center h-full relative">
                <img
                  src={tv_onair_logo}
                  alt="TVONAIR"
                  className="w-64 md:w-72 lg:w-1/3 animate-bounce"
                  data-aos="zoom-in"
                />
              </div>
            </div>
          </Element>

          {/* About  */}
          <Element name="about">
            {/* WAVE */}
            <div class="custom-shape-divider-bottom-1709652981">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                  opacity=".25"
                  class="shape-fill"
                ></path>
                <path
                  d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                  opacity=".5"
                  class="shape-fill"
                ></path>
                <path
                  d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                  class="shape-fill"
                ></path>
              </svg>
            </div>
            <div ref={about} className="h-screen w-full bg-gray-900 text-white">
              <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-2">
                <div
                  className="text-xl px-2 sm:text-2xl sm:px-4 md:text-3xl lg:text-4xl text-justify text-transparent bg-clip-text bg-gradient-to-r from-[#80EAE9] to-[#FFF57A] text-shadow-lg"
                  data-aos="fade-up"
                >
                  <h2 className="text-center text-4xl sm:text-8xl font-bold mb-4 gradient-text">
                    We are TVONAIR
                  </h2>
                  <p className="font-forContent sm:ml-4 sm:mr-4 sm:mt-10">
                    {" "}
                    UMN TV adalah media televisi yang berada di bawah naungan
                    kampus Universitas Multimedia Nusantara, UMN TV membuat dan
                    menyajikan beragam macam konten berkualitas melalui program
                    redaksinya. UMN TV juga menghadirkan TVONAIR 9.0 sebagai
                    jembatan untuk meperkenalkan UMN TV kepada internal maupun
                    eksternal kampus, juga menambah wawasan terkait media kepada
                    masyarakat.{" "}
                  </p>
                </div>
              </div>
            </div>
          </Element>

          {/* Padi & Sadi  */}
          <Element name="padiSadi">
            <div
              ref={padiSadi}
              className="min-h-screen w-full bg-gray-900 text-white flex items-center justify-center pb-14"
            >
              <div className="mx-auto h-full px-2 sm:px-4">
                <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-14 gradient-text bg-clip-text bg-gradient-to-r from-[#80EAE9] to-[#FFF57A] text-transparent z-10">
                  Panel Discussion & Sharing Discussion
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-10 sm:px-0 -z-10">
                  <div
                    className="text-4xl sm:text-2xl md:text-3xl sm:ml-4 mt-4 text-justify bg-clip-text bg-gradient-to-r from-[#80EAE9] to-[#FFF57A] text-transparent"
                    data-aos="zoom-in-up"
                  >
                    <p className="font-forContent">
                      Panel Discussion adalah acara talkshow TVONAIR yang
                      melibatkan praktisi media dan influencer dengan tema "The
                      Future World of Digital Marketing and Visual Technology",
                      yang menyoroti perkembangan media sosial dan potensinya di
                      masa depan serta mengajak anak muda dan masyarakat untuk
                      berperan dalam meningkatkan brand awareness melalui visual
                      storytelling dan digital marketing.
                    </p>
                  </div>
                  <div
                    className="text-4xl sm:text-2xl md:text-3xl sm:mr-4 mt-4 text-justify bg-clip-text bg-gradient-to-r from-[#80EAE9] to-[#FFF57A] text-transparent"
                    data-aos="zoom-in-up"
                  >
                    <p className="font-forContent">
                      Sharing and Discussion (SnD) adalah forum diskusi puluhan
                      media kampus televisi yang mengangkat isu-isu terkini dan
                      kendala mereka. Dengan konsep konferensi meja bundar, SnD
                      tahun ini mengusung tema Collaborative Digital Media:
                      Exploring Ethical Challenges, Social Responsibility, and
                      Media Creativity. Fokusnya pada kolaborasi antar media
                      untuk menciptakan inovasi, nilai yang berbeda, dan
                      pemahaman etika serta tanggung jawab sosial dalam ruang
                      lingkup media.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Element>

          {/* Divisions */}
          <Element name="divisions">
          <div
            ref={divisions}
            className="menu flex items-center justify-center py-auto px-auto bg-customYellow relative"
          >
            <div class="custom-shape-divider-top-1710334599">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  class="shape-fill"
                ></path>
              </svg>
            </div>
            <div className="wrapper p-8 relative overflow-x-hidden max-w-screen-md mx-auto rounded-lg bg-transparent">
              <div
                className="icon absolute top-0 left-0 h-full w-12 flex items-center ml-4 bg-transparent"
                onClick={() => handleArrowClick("left")}
                style={{ display: showLeftArrow ? "flex" : "none" }}
              >
                <i className="fa-solid fa-angle-left w-12 h-12 cursor-pointer text-xl text-center bg-customYellow transition-transform duration-200 ease-in-out transform hover:scale-110"></i>
              </div>
              <ul
                className="tabs-box dragging:select-none dragging:pointer-events-none flex overflow-x-hidden"
                id="categoryTabs"
                ref={tabsBoxRef}
                onMouseDown={handleDragStart}
                onMouseUp={handleDragEnd}
              >
                <li className="tab" onClick={() => showTeamMembers("BPH")}>
                  BPH
                </li>
                <li className="tab " onClick={() => showTeamMembers("Visual")}>
                  Visual
                </li>
                <li className="tab " onClick={() => showTeamMembers("Sponsor")}>
                  Sponsor
                </li>
                <li className="tab " onClick={() => showTeamMembers("Acara")}>
                  Acara
                </li>
                <li className="tab" onClick={() => showTeamMembers("Media_Relation")}>
                  Media Relation
                </li>
                <li className="tab" onClick={() => showTeamMembers("Logistic")}>
                  Logistic
                </li>
                <li className="tab" onClick={() => showTeamMembers("IT")}>
                  IT
                </li>
                <li className="tab" onClick={() => showTeamMembers("Publikasi")}>
                  Publikasi
                </li>
                <li className="tab" onClick={() => showTeamMembers("Fresh_Money")}>
                  Fresh Money
                </li>
                <li className="tab" onClick={() => showTeamMembers("Security")}>
                  Security Admin
                </li>
                <li className="tab" onClick={() => showTeamMembers("dokum")}>
                  Documentation
                </li>
              </ul>
              <div
                className="icon absolute top-0 right-0 h-full w-32 flex items-center mr-4 justify-end"
                onClick={() => handleArrowClick("right")}
                style={{ display: showRightArrow ? "flex" : "none" }}
              >
                <i className="fa-solid fa-angle-right w-12 h-12 cursor-pointer text-xl text-center bg-customYellow transition-transform duration-200 ease-in-out transform hover:scale-110"></i>
              </div>
            </div>
          </div>

          {/*anggota divisi */}
          <section className="text-gray-600 body-font relative bg-image">
            <div className="container px-5 py-24 mx-auto" data-aos="fade-down">
              <div className="text-center mb-20">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
                  OUR DIVISION
                </h1>
                <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s"></p>
                <div className="flex mt-6 justify-center">
                  <div className="w-16 h-1 rounded-full bg-customDarkBlue inline-flex"></div>
                </div>
              </div>
              <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                <table className="table-auto w-full text-left whitespace-no-wrap">
                  <tbody id="teamMembers"></tbody>
                </table>
              </div>
              <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                  <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                    List Anggota
                  </h1>
                  <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                    Banh mi cornhole echo park skateboard authentic crucifix neutra
                    tilde lyft biodiesel artisan direct trade mumblecore 3 wolf moon
                    twee
                  </p>
                </div>
                <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                  <table className="table-auto w-full text-left whitespace-no-wrap">
                    <tbody id="listAnggotaTableBody"></tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
      </Element>

          {/* Sponsor */}
          <div className="w-full py-12 bg-white dark:bg-gray-900">
            <div className="container mx-auto flex flex-col items-center px-4 text-center md:px-6" data-aos="fade-down">
              <div className="mb-8 space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Sponsorship
                </h1>
                <p className="mx-auto max-w-xl text-gray-500 text-lg leading-relaxed dark:text-gray-400">
                  Terima kasih kepada pihak sponsor yang telah membantu acara kami.
                </p>
              </div>
              <div className="grid gap-8 mb-8">

                {/* Larger logos with responsive image sizes */}
                <div className="flex justify-center">
                  <img
                    src={shermic}
                    className="w-64 h-64 md:w-128 md:h-128 xl:w-512 xl:h-512"
                    alt="Shermic"
                  />
                </div>
                <div className="flex justify-center">
                  <img
                    src={buynana}
                    className="w-64 h-64 md:w-128 md:h-128 xl:w-512 xl:h-512"
                    alt="Buynana Chips"
                  />
                </div>

                {/* Medium logos with responsive image sizes */}
                <div className="flex justify-center gap-6">
                  <img
                    src={abunawas}
                    className="w-32 h-32 md:w-64 md:h-64 lg:w-344 lg:h-344"
                    alt="Abunawas"
                  />
                  <img
                    src={pandaboo}
                    className="w-32 h-32 md:w-64 md:h-64 lg:w-344 lg:h-344"
                    alt="Pandaboo"
                  />
                </div>

                {/* Smaller logos with responsive image sizes */}
                <div className="flex justify-center gap-4">
                  <img
                    src={tendarental}
                    className="w-24 h-24 md:w-48 md:h-48 lg:w-256 lg:h-256"
                    alt="Tendarental"
                  />
                  <img
                    src={multisouvenir}
                    className="w-24 h-24 md:w-48 md:h-48 lg:w-256 lg:h-256"
                    alt="Multisouvenir"
                  />
                  <img
                    src={kinomaru}
                    className="w-24 h-24 md:w-48 md:h-48 lg:w-256 lg:h-256"
                    alt="Kinomaru"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <Element name="footer">
            <footer className="bg-[#3c647c] h-48 w-full px-3 pb-2 text-center text-white position:relative">
              <div className="flex h-full flex-col md:flex-row items-center justify-around text-sm">
                {/* Left side: University information */}
                <div className="md:w-1/2 mb-4 md:mb-0">
                  <p className="font-forFooter text-center md:text-left text-base mb-4 mt-4">
                    Universitas Multimedia Nusantara <br />
                    Jl. Scientia Boulevard, Gading Serpong, <br />
                    Tangerang, Banten, 15811, Indonesia.
                  </p>
                  <p className="font-forFooter text-center md:text-left mb-2">
                    © 2024 TVONAIR.
                  </p>
                </div>

                {/* Right side: Social media links */}
                <div className="flex gap-4 items-center">
                  <a
                    href="https://www.instagram.com/tv.onair/"
                    className="font-forFooter inline-flex items-center text-base font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:text-blue-500"
                  >
                    Instagram
                    <img
                      className="ml-2 inline-block h-12 w-12 transition-transform duration-300 ease-in-out"
                      src={insta_logo}
                      alt="Instagram logo"
                      /* biar muter-muter */
                      style={{
                        transition: "transform 0.3s",
                        transform: "rotate(0deg)",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "rotate(360deg)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "rotate(0deg)")
                      }
                    />
                  </a>
                  <a
                    href="mailto:tv.onair9@gmail.com"
                    className="font-forFooter inline-flex items-center text-base font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:text-red-500"
                  >
                    E-mail
                    <img
                      className="ml-2 inline-block h-12 w-12 transition-transform duration-300 ease-in-out"
                      src={gmail_logo}
                      alt="Gmail logo"
                      /* biar muter-muter */
                      style={{
                        transition: "transform 0.3s",
                        transform: "rotate(0deg)",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "rotate(360deg)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "rotate(0deg)")
                      }
                    />
                  </a>
                  <a
                    href="https://www.tiktok.com/@tv.onair9.0"
                    className="font-forFooter inline-flex items-center text-base font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:text-customTurqoise"
                  >
                    Tiktok
                    <img
                      className="ml-2 inline-block h-16 w-16 transition-transform duration-300 ease-in-out"
                      src={tiktok_logo}
                      alt="Tiktok logo"
                      /* biar muter-muter */
                      style={{
                        transition: "transform 0.3s",
                        transform: "rotate(0deg)",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "rotate(360deg)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "rotate(0deg)")
                      }
                    />
                  </a>
                </div>
              </div>
            </footer>
          </Element>
        </>
      )}
    </div>
  );
}

export default App;
