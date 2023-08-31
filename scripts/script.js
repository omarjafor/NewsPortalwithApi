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
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
    const data = await res.json();
    console.log(data.data);
}



loadCategories();