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
                <img src="${news ? news.thumbnail_url : 'No news found'}" class="card-img-top" alt="news-thumbnail">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                        to additional content. This content is a little bit longer.</p>
                </div>
            </div>
        `;
        newsContainer.appendChild(div)
        console.log(news)
    })
};
categoryLoad()