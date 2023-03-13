const categoryLoad = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => categoryDisplay(data.data.news_category))
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
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    newses.forEach(news => {

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card">
                <img class="img-fluid" src="${news ? news.thumbnail_url : 'No news found'}" class="card-img-top" alt="news-thumbnail">
                <div class="card-body">
                    <h5 class="card-title">${news ? news.title : 'No Title Found'}</h5>
                    <p class="card-text text-truncate">${news ? news.details : 'No Description Found'}</p>
                </div>

            <div class="d-flex justify-content-around align-items-center">
                <div class="d-flex align-items-center">
                    <img class="img-fluid author-img rounded-circle p-2" src="${news.author ? news.author.img : 'No Image Found'}" alt="">
                    <span>
                    <h6>${news.author.name ? news.author.name : 'No Author Name found'}</h6>
                    <p class="m-0">${news.author ? news.author.published_date : 'Published Date not found'}</p>
                    </span>
                </div>
                    <span class="d-flex align-items-center">
                        <i class="fa-solid fa-eye"></i>
                        <p class="ps-2 m-0">${news.total_view}</p>
                    </span>
                    <span>
                        <i class="fa-solid fa-arrow-right fs-5"></i>
                    </span>
                </div>
            </div>
        `;
        newsContainer.appendChild(div)
        console.log(news)
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
}
categoryData('08')
categoryLoad()