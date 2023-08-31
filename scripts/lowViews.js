const loadLowestDetails = async category_id => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
        const data = await res.json();
        displayLowestPosts(data.data);
    } catch (err) {
        console.log(err);
    }
}

const displayLowestPosts = posts => {
    const lowestVisit = document.getElementById('lowest-visit');
    const mostVisited = document.getElementById('most-visited');
    const displayContent = document.getElementById('display-content');
    const displayPostItemLength = document.getElementById('display-post-length');

    displayPostItemLength.innerHTML = `
        <h3 class="ml-8 font-semibold text-black">${posts.length ? posts.length : 'No'} News found for this category</h3>
    `;

    loaddingSpinner(true);
    lowestVisit.innerHTML = ``;
    mostVisited.innerHTML = ``;
    displayContent.innerHTML = ``;

    const showMost = posts.sort((a, b) => {
        return a.total_view - b.total_view;
    });

    showMost.forEach(post => {
        // console.log(post);
        const { _id, total_view, title, author, thumbnail_url, details, rating } = post;
        const { name, published_date, img } = author;

        const postDiv = document.createElement('div');
        postDiv.innerHTML = `
        <div class="card-side bg-white shadow-xl mb-5 md:flex">
            <figure class="p-2"><img src="${thumbnail_url}" alt="Movie"></figure>
            <div class="card-body w-64">
              <h2 class="card-title text-black font-bold">${title}</h2>
              <p>${details.slice(0, 500,) + "..."}</p>
              <div class="card-actions justify-between items-center text-black">
                <div class="flex items-center">
                  <div id="profile-icon">
                    <img class="w-10 rounded-full" src="${img}" alt="">
                  </div>
                  <div class="ml-2">
                    <p>${name ? name : 'No author'}</p>
                    <p>${published_date}</p>
                  </div>
                </div>
                <div class="flex items-center justify-evenly">
                  <img src="../images/carbon_view.png" alt="">
                  <p class="ml-2">${total_view ? total_view : "No view"}</p>
                </div>
                <div class="flex items-center justify-evenly">
                  <p class="ml-2">${rating.badge ? rating.badge : "No Badge"}</p>
                  <p class="ml-2">${rating.number ? rating.number : "No Rating"}</p>
                </div>
                <!-- The button to open modal -->
                <label onclick="loadPostsModal('${_id}')" for="read-more-modal" class="btn btn-primary">Read
                  More</label>
              </div>
            </div>
          </div>
        `;
        mostVisited.appendChild(postDiv);
    });
    loaddingSpinner(false);
}