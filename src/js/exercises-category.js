//основная логика (слухачі подій)

import { getExercisesMarkup } from "./api-service/exercises-category-api";
import { createMarkup } from "./templates/exercises-category-markup";
import { returnPaginationRange } from './utils/utils';
import { renderPagination } from './templates/pagination-markup';
 
window.addEventListener('load', () => {
    bodyPartsItem.style.color = 'black';
})



const refs = {
    list: document.querySelector(".filter-list"),
    newList: document.querySelector(".list-for-new-exercises"),
    bodyPartsItem: document.querySelector(".filter-of-body-parts"),
    musclesItem: document.querySelector(".filter-of-muscles"),
    equipmentItem: document.querySelector(".filter-of-equipment"),
    pagination: document.querySelector(".pagination-nav"),
}

let page = 1;

const filters = {
    bodyParts: "Body parts",
    muscles: "Muscles",
    equipment: "Equipment",
}

const bodyPartsItem = refs.bodyPartsItem;
const musclesItem = refs.musclesItem;
const equipmentItem = refs.equipmentItem;


function removeActiveClass() {
    if(bodyPartsItem.classList.contains('active')) {
        bodyPartsItem.classList.remove('active');
        bodyPartsItem.style.color = '#24242499';
    }
    if (musclesItem.classList.contains('active')) {
        musclesItem.classList.remove('active');
        musclesItem.style.color = '#24242499';
    }
    if (equipmentItem.classList.contains('active')) {
        equipmentItem.classList.remove('active');
        equipmentItem.style.color = '#24242499';
    }    
}

bodyPartsItem.addEventListener('click', () => {
    removeActiveClass();
    bodyPartsItem.classList.add('active');
    bodyPartsItem.style.color = 'black';
    bodyPartsItem.disabled = true;
    musclesItem.disabled = false;
    equipmentItem.disabled = false;
});
musclesItem.addEventListener('click', () => {
    removeActiveClass();
    musclesItem.classList.add('active'); 
    musclesItem.style.color = 'black';
    bodyPartsItem.style.color = '#24242499';
    bodyPartsItem.disabled = false;
    musclesItem.disabled = true;
    equipmentItem.disabled = false;
});

equipmentItem.addEventListener('click', () => { 
    removeActiveClass();
    equipmentItem.classList.add('active');
    equipmentItem.style.color = 'black';
    bodyPartsItem.style.color = '#24242499';
    bodyPartsItem.disabled = false;
    musclesItem.disabled = false;
    equipmentItem.disabled = true;
});



const objBodyParts =  refs.bodyPartsItem.addEventListener('click', () => {
   getExercisesMarkup(filters.bodyParts).then((data) => {
    (addMarkup(data.results))
     let array = returnPaginationRange(data.totalPages, page);
    refs.pagination.innerHTML = renderPagination(page, array);
}).catch((err) => {console.log("Error: ", err)})
}
        );
const objMuscles = refs.musclesItem.addEventListener('click', () => {
    getExercisesMarkup(filters.muscles).then((data) => {
        (addMarkup(data.results))
         let array = returnPaginationRange(data.totalPages, page);
    refs.pagination.innerHTML = renderPagination(page, array);
    }).catch((err) => {console.log("Error: ", err)})
}
        );
      
const objEquipment = refs.equipmentItem.addEventListener('click', () => {
    getExercisesMarkup(filters.equipment).then((data) => {
        (addMarkup(data.results))
         let array = returnPaginationRange(data.totalPages, page);
    refs.pagination.innerHTML = renderPagination(page, array);
    }).catch((err) => {console.log("Error: ", err)})
}
        );

//console.log(objBodyParts); //ПРОВЕРКА



function addMarkup(data) {
        if (Array.isArray(data)) {
            refs.newList.innerHTML = createMarkup(data);
        } else {
            console.error("Data is not an array:", data);
        }
    }
    

// getExercisesMarkup();
// addMarkup();
getExercisesMarkup(filters.bodyParts).then((data) => {(addMarkup(data.results))})

refs.newList.addEventListener('click', handleToExercises());