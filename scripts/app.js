const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data.news_category);
    }
    catch(error){
        console.log(error);
    }
};

const displayCategories = (categories) => {
    const displayCategory = document.getElementById('display-categories');
    const displayViews = document.getElementById('display-views');

    categories.forEach(category => {
        
        const { category_id, category_name } = category;
        console.log(category_name);
        const categoryli = document.createElement('li');
        categoryli.classList.add('py-3', 'px-2', 'text-gray-500', 'hover:bg-sky-100', 'active:bg-sky-400', 'rounded-xl');
        categoryli.innerHTML = `
            <a href="#" onclick="loadCategoriesDetails('${category_id}')" class="" >${category_name}</a>
        `;
        displayCategory.appendChild(categoryli);
        displayViews.innerHTML = `
            <li onclick="loadMostDetails('${category_id}')" id="most-visits"><a class="text-gray-500" >Most Views</a></li>
            <li onclick="loadLowestDetails('${category_id}')" id="lowest-visited"><a class="text-gray-500">Low Views</a></l>
    `
    })
}

const loadCategoriesDetails = async category_id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    // console.log(url)
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategoriesPosts(data.data);
    }
    catch (err) {
        console.log(err);
    }
};

const displayCategoriesPosts = (posts) => {
    const lowestVisit = document.getElementById('lowest-visit');
    const mostVisited = document.getElementById('most-visited');
    const displayContent = document.getElementById('display-content');
    
    // console.log(posts.length);
    const displayPostItemLength = document.getElementById('display-post-length');
    displayPostItemLength.innerHTML = `
    <h3 class="ml-8 font-semibold">${posts.length ? posts.length : 'No post'} items found for category</h3>
    `
    loddingSpinner(true)
    lowestVisit.innerHTML = ``
    mostVisited.innerHTML = ``
    displayContent.innerHTML = ``
    posts.forEach(post => {
        const { _id, total_view, title, author, thumbnail_url, details, rating} = post;
        
        // console.log(total_view);
        const mostVisited = document.getElementById('most-visited');
        
        const { number, badge } = rating;
        const { name, published_date, img } = author;
        
        const postDiv = document.createElement('div')
        postDiv.innerHTML = `
        <div class="card-side bg-base-100 shadow-xl mb-5 md:flex">
            <figure class="p-2"><img src="${thumbnail_url}" alt="Movie"></figure>
            <div class="card-body w-64">
              <h2 class="card-title">${title}</h2>
              <p>${details.slice(0, 500,) + "..."}</p>
              <div class="card-actions justify-between items-center">
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
                <!-- The button to open modal -->
                <label onclick="loadPostsModal('${_id}')" for="read-more-modal" class="btn modal-button">Read
                  More</label>
              </div>
            </div>
          </div>
        `
        mostVisited.appendChild(postDiv)
        
    })
    loddingSpinner(false);
}


const loadPostsModal = async news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPostsModal(data.data);
}

// document.getElementById('most-visits').addEventListener('click', function(){
//     const mostVisited = document.getElementById('most-visited')
//     loadCategoriesDetails()
// })

const displayPostsModal = newses => {
    const displayModal = document.getElementById('display-modal');
    newses.forEach(news => {
        // console.log(news);
        const { _id, total_view, title, author, image_url, details, rating} = news;
        const { number, badge } = rating;
        const { name, published_date, img } = author;
        displayModal.innerHTML = `
        <div class="modal-box">
        <img src="${image_url}" alt="">
        <h2 class="card-title">${title}</h2>
        <p class="py-4">${details}</p>
        <div class="card-actions justify-between items-center">
            <div class="flex items-center">
                <div id="profile-icon" class="w-10 rounded-full">
                <img src="${img}" alt="">
                </div>
                <div class="ml-2">
                <p>${name ? name : 'No author'}</p>
   
                </div>
            </div>
            <div class="flex items-center justify-evenly">
                <img src="../images/carbon_view.png" alt="">
                <p class="ml-2">${total_view ? total_view : "No view"}</p>
            </div>
        <div class="modal-action">
          <label for="read-more-modal" class="btn">Close</label>
        </div>
      </div>
        `
    })
}

const loddingSpinner = isLodding => {
    const loddingButton = document.getElementById('lodding-button');
    if (isLodding) {
        loddingButton.classList.remove('hidden')
        console.log('lodding hidden remove');
    }
    else {
        loddingButton.classList.add('hidden')
        console.log('lodding hidden add');

    }
}


loadCategories()