/** @format */
let allVideos = [];

// category section
const categories = document.getElementById("categories");
const videos = document.getElementById("videos");
const noContent = document.getElementById("nocontent");
// const sortByViews = document.getElementById("sort_by_views").addEventListener(onclick, handleSort)

// load category
const fetchCategory = async () => {
  videos.innerHTML = "";
  noContent.innerHTML = "";
  noContent.innerHTML = `<div class="w-full flex justify-center items-center py-28">
  <span class="loading loading-spinner loading-lg"></span>
</div>`;
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    if (!response.ok) throw new Error(response);
    const data = await response.json();
    const allCategories = data?.data;
    allCategories?.map((element) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <button onclick="loadVideos(${element?.category_id})" class="btn btn-error btn-sm text-sm text-white bg-[#FF1F3D] rounded-md">
        ${element?.category}
          </button>
            `;
      categories.appendChild(div);
    });
  } catch (error) {
    console.error(error);
  }
};
fetchCategory();

// display videos
const displayVideos = (allVideos) => {
  videos.innerHTML = "";
  noContent.innerHTML = "";
  if (allVideos.length > 0)
    allVideos?.map((element) => {
      const posted_time = parseInt(element?.others?.posted_date);
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="card card-compact bg-base-100 shadow-xl rounded-lg">
        <figure class="max-h-44 relative">
          <img class="w-full h-full" src=${element?.thumbnail} alt="Shoes" />
          ${
            posted_time
              ? `<div class="bg-black absolute bottom-3 right-3 text-white px-3 rounded-sm">
          <span> ${parseInt(posted_time / 3600)} hours </span>
          <span> ${parseInt((posted_time % 3600) / 60)} minutes ago </span>
        </div>`
              : ""
          }
        </figure>
        <div class="card-body">
          <div class="flex justify-start items-start gap-4">
            <img
              class="h-10 w-10 rounded-full"
              src=${element?.authors[0]?.profile_picture}
              alt="author image"
            />
            <div class="flex flex-col items-start justify-center">
              <h2 class="card-title">
                ${element?.title}
              </h2>
              <div class="flex items-center justify-center gap-2">
                <h5>${element?.authors[0]?.profile_name}</h5>
                ${
                  element?.authors[0]?.verified
                    ? '<i class="fa-solid fa-circle-check text-blue-600 text-lg"></i>'
                    : ""
                }
                
              </div>
              <div class="flex items-center justify-center gap-2">
                <p>${element?.others?.views}</p>
                <p>views</p>
              </div>
            </div>
          </div>
        </div>
      </div>
              `;
      videos.appendChild(div);
    });
  else
    noContent.innerHTML = `<div class="flex flex-col justify-center items-center gap-4 h-full">
    <img class="max-h-full" src="./icons/not_found.png" alt="" />
    <h1 class="text-4xl font-bold text-center">
      Oops!! Sorry, There is no content here
    </h1>
  </div>`;
};

// load videos
const loadVideos = async (id) => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${id}`
    );
    const data = await response.json();
    allVideos = data?.data;
    displayVideos(allVideos);
  } catch (error) {
    console.error(error);
  }
};

loadVideos(1000);

// sort by views
const handleSort = () => {
  allVideos.sort((ele1, ele2) => {
    const x = parseInt(ele1.others.views);
    const y = parseInt(ele2.others.views);
    return y - x;
  });
  displayVideos(allVideos);
};
