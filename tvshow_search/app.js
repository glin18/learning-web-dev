const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
const section = document.querySelector('section');

searchForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    section.innerHTML = "";
    let search = searchInput.value;
    console.log(search);
    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${search}`);
    console.log(res.data);
    for (i = 0; i < res.data.length; i++) {
        const img = document.createElement('img')
        img.src = res.data[i].show.image.medium;
        section.appendChild(img);
        img.style.padding = "12px";
    }
    searchInput.value = "";
})

