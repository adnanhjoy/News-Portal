const categoryLoad = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => categoryDisplay(data.data.news_category))
        .catch(error => console.log(error))
};

const categoryDisplay = categories => {
    const menuBar = document.getElementById('menu-bar');
    categories.forEach(category => {
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML = `
        <a onclick="categoryData('${category.category_id ? category.category_id : 'No News Found'}')" class="nav-link px-3">${category.category_name}</a>
        `;
        menuBar.appendChild(li);
        // console.log(category)
    })

};

const categoryData = news_id => {
    newsLoader(true);
    fetch(`https://openapi.programming-hero.com/api/news/category/${news_id}`)
        .then(res => res.json())
        .then(data => categoryDataDisplay(data.data))
};

const categoryDataDisplay = newses => {
    const sortData = newses.sort((a,b) => b.total_view - a.total_view)
    let page = newses.length;
    const categoryFound = document.getElementById('category-found');
    categoryFound.innerHTML = `
    <p class="px-3 py-3">${page} items found for category</p>
    `
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    const newsFound = document.getElementById('news-found');
    if (newses.length === 0) {
        newsFound.classList.remove('d-none');
    } else {
        newsFound.classList.add('d-none');
    }
    newses.forEach(news => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card">
                <img class="img-fluid" src="${news.thumbnail_url ? news.thumbnail_url : 'No news found'}" class="card-img-top" alt="news-thumbnail">
                <div class="card-body">
                    <h5 class="card-title">${news.title ? news.title : 'No Title Found'}</h5>
                    <p class="card-text text-truncate">${news.details ? news.details : 'No Description Found'}</p>
                </div>

            <div class="d-flex justify-content-around align-items-center">
                <div class="d-flex align-items-center">
                    <img class="img-fluid author-img rounded-circle p-2" src="${news.author ? news.author.img : 'No Image Found'}" alt="">
                    <span>
                    <h6>${news.author.name ? news.author.name : 'Author not Name found'}</h6>
                    <p class="m-0">${news.author.published_date ? news.author.published_date : 'Published Date not found'}</p>
                    </span>
                </div>
                    <span class="d-flex align-items-center">
                        <i class="fa-solid fa-eye"></i>
                        <p class="ps-2 m-0">${news.total_view ? news.total_view : 'No views'}</p>
                    </span>
                    <button onclick="newsDetails('${news._id}')" class="border-0 px-3 py-1 rounded-pill" data-bs-toggle="modal" data-bs-target="#newsModalDetail">
                        <i class="fa-solid fa-arrow-right fs-5"></i>
                    </button>
                </div>
            </div>
        `;
        newsContainer.appendChild(div)
        // console.log(newsView)
    })
    newsLoader(false);
};

const newsLoader = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
};


const newsDetails = news_id => {
    fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
        .then(res => res.json())
        .then(data => newsDetailsDisplay(data.data[0]))

};

const newsDetailsDisplay = details => {
    const newsModalDetailLabel = document.getElementById('newsModalDetailLabel');
    newsModalDetailLabel.innerText = details.title;
    const newsModal = document.getElementById('news-modal');
    newsModal.innerHTML = `
        <img class="img-fluid w-100"
            src="${details.thumbnail_url ? details.thumbnail_url : 'No Thumbnail found'}" alt="thumbnail">
            <p class="mt-3">${details.details ? details.details : 'No details found'}</p>
            <div class="d-flex justify-content-between align-items-center bg-body-secondary rounded-3 px-3
            ">
                <div class="d-flex align-items-center">
                    <img class="img-fluid author-img rounded-circle p-2"src="${details.author ? details.author.img : 'No Image Found'}" alt="">
                    <span>
                        <h6>${details.author.name ? details.author.name : 'Author Name not found'}</h6>
                        <p class="m-0">${details.author.published_date ? details.author.published_date : 'Published Date not found'}</p>
                    </span>
                </div>
                <span class="d-flex align-items-center">
                        <i class="fa-solid fa-eye"></i>
                        <p class="ps-2 m-0">${details.total_view ? details.total_view : 'No views'}</p>
                </span>
            </div>
    `
    // console.log(details)
}

categoryData('01')
categoryLoad()