const loadPhoneData =async (getSearchText=13, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${getSearchText}`);

    const data = await res.json();
    const phoneData = data.data;
    // console.log(phoneData);
    getPhoneData(phoneData, isShowAll)
}

const getPhoneData = (phoneData, isShowAll) =>{
    // console.log(phoneData);
    // step 1 get the container
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ``; //or use textContent = ``;
    //show-all-btn use for more search result
    // get show all btn id
    const showAllButton = document.getElementById('show-all-btn');

    if(phoneData.length > 12 && !isShowAll){
        showAllButton.classList.remove('hidden')
    }else{showAllButton.classList.add('hidden')}

    // get first 12 result if not show all
    if(!isShowAll){
        phoneData = phoneData.slice(0,12)
    }
    phoneData.forEach(phone => {
        // console.log(phone);

        // 2 create phone card div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-slate-300 shadow-xl `;
        // step 3 set the innerHtml
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h1>Brand:${phone.brand}</h1>
            <h2 class="card-title">${phone.phone_name
            }</h2>
            <div class="card-actions justify-center">
            <button onclick="handelShowDetails('${phone.slug}')" class="btn btn-primary">show details</button>
            </div>
        </div>
        
        `;
        // step 4 append child the div on container
        phoneContainer.appendChild(phoneCard); 


    });

    switchLoadingSpinner(false);
};


// get search handel button

const handelButton = (isShowAll) => {
    switchLoadingSpinner(true);
    const searchInput = document.getElementById('search-input')
    const getSearchText = searchInput.value
    // console.log(getSearchText);
    loadPhoneData(getSearchText, isShowAll)
}

// loading spinner function

const switchLoadingSpinner = (isLoading) => {
    const loadSpinner = document.getElementById('loading-spinner')
    if(isLoading){
        loadSpinner.classList.remove('hidden')
    }else{
        loadSpinner.classList.add('hidden')
    }

};

// display show all button
const  showAllButtonOnDisplay = () => {
    handelButton(true);
}

//show details
const handelShowDetails = async (id) =>{
    console.log('click show details' , id);
    const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data
    showDetailsModal(phone)
};

// show details on the modal
const showDetailsModal = (phone) => {
    console.log(phone);
    const showPhoneName = document.getElementById('show-phone-name');
    showPhoneName.innerText= phone.name
    const showDetailsContainer = document.getElementById('show-details-container')
    showDetailsContainer.innerHTML = `
          <img src="${phone.image}" alt="">
            
            <h1>brand : ${phone.brand } </h1>
            <h2>mainFeatures : ${phone.mainFeatures.storage}</h2> 
            <h2>chipSet : ${phone.mainFeatures.chipSet}</h2> 
            <h2>displaySize : ${phone.mainFeatures.displaySize}</h2> 
            <h2>memory : ${phone.mainFeatures.memory}</h2> 
            <h4>releaseDate : ${phone.releaseDate}</h4> 
            
    `
    
    show_details_modal.showModal();

}

// loadPhoneData()