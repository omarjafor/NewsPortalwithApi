const loadCategories = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        const newsCategory = data.data.news_category;
        displayPostCategories(newsCategory);
    } catch (err) {
        console.log(err);
    }
}

const displayPostCategories = (categories) =>{
    const displayCategories = document.getElementById('display-categories');
    const displayViews = document.getElementById('display-views');
    categories.forEach(category => {
        const {category_id, category_name} = category;
        const categoryli = document.createElement('li');
        categoryli.classList.add('py-3', 'px-2', 'text-gray-500', 'hover:bg-sky-100', 'active:bg-sky-400', 'rounded-xl', 'hover:text-[#5d5fef]', 'hover:font-bold');
        categoryli.innerHTML = `
            <a href="#" onclick="loadCategoriesDetails('${category_id}')" class="" >${category_name}</a>
        `;
        displayCategories.appendChild(categoryli);
        displayViews.innerHTML = `
            <li onclick="loadMostDetails('${category_id}')" id="most-visits"><a class="text-gray-500" >Most Views</a></li>
            <li onclick="loadLowestDetails('${category_id}')" id="lowest-visited"><a class="text-gray-500">Lowest Views</a></l>
        `;
    });
}

const loadCategoriesDetails = async (category_id) => {
    try{
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
        const data = await res.json();
        const categoriesPost = data.data;
        displayCategoriesPosts(categoriesPost);
    }catch(err){
        console.log(err);
    }
}

const displayCategoriesPosts = posts => {
    const lowestVisit = document.getElementById('lowest-visit');
    const mostVisited = document.getElementById('most-visited');
    const displayContent = document.getElementById('display-content');
    const displayPostItemLength = document.getElementById('display-post-length');

    displayPostItemLength.innerHTML = `
        <h3 class="ml-8 font-semibold text-black">${posts.length ? posts.length : 'No'} News found for this category</h3>
    `;

    // loddingSpinner(true)
    lowestVisit.innerHTML = ``;
    mostVisited.innerHTML = ``;
    displayContent.innerHTML = ``;
    posts.forEach(post => {
        console.log(post);
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
    // loddingSpinner(false);
}



loadCategories();