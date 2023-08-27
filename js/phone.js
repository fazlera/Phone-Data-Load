const loadPhoneData =async (getSearchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${getSearchText}`);

    const data = await res.json();
    const phoneData = data.data;
    // console.log(phoneData);
    getPhoneData(phoneData)
}

const getPhoneData = phoneData =>{
    // console.log(phoneData);
    // step 1 get the container
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ``; //or use textContent = ``;
    //show-all-btn use for more search result
    // get show all btn id
    const showAllButton = document.getElementById('show-all-btn');

    if(phoneData.length > 12 ){
        showAllButton.classList.remove('hidden')
    }else{showAllButton.classList.add('hidden')}

    // get first 10 result
    phoneData = phoneData.slice(0,12)
    phoneData.forEach(Phone => {
        // console.log(Phone);

        // 2 create phone card div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-slate-300 shadow-xl `;
        // step 3 set the innerHtml
        phoneCard.innerHTML = `
        <figure><img src="${Phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h1>Brand:${Phone.brand}</h1>
            <h2 class="card-title">${Phone.phone_name
            }</h2>
            <p>${Phone.slug
            }</p>
            <div class="card-actions justify-center">
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        
        `;
        // step 4 append child the div on container
        phoneContainer.appendChild(phoneCard);


    });
};


// get search handel button

const handelButton = () => {
    const searchInput = document.getElementById('search-input')
    const getSearchText = searchInput.value
    // console.log(getSearchText);
    loadPhoneData(getSearchText)
}


