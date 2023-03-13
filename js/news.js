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
        <a class="nav-link px-3" aria-current="page" href="#">${category.category_name}</a>
        `;
        menuBar.appendChild(li);
        console.log(category)
    })
};

const categoryData = (news_id) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/news_id`)
}
categoryLoad()