//основная логика (слухачі подій)

import { getExercisesMarkup } from "./api-service/exercises-category-api";
import { createMarkup } from "./templates/exercises-category-markup";
 


const refs = {
    list: document.querySelector(".filter-list"),
    newList: document.querySelector(".list-for-new-exercises"),
    bodyPartsItem: document.querySelector(".filter-of-body-parts"),
    musclesItem: document.querySelector(".filter-of-muscles"),
    equipmentItem: document.querySelector(".filter-of-equipment"),
}

const filters = {
    bodyParts: "Body parts",
    muscles: "Muscles",
    equipment: "Equipment",
}

const objBodyParts =  refs.bodyPartsItem.addEventListener('click', () => {
   getExercisesMarkup(filters.bodyParts).then((data) => {(addMarkup(data))})
}
        );
const objMuscles = refs.musclesItem.addEventListener('click', () => {
    getExercisesMarkup(filters.muscles).then((data) => {(addMarkup(data))})
}
        );
      
const objEquipment = refs.equipmentItem.addEventListener('click', () => {
    getExercisesMarkup(filters.equipment).then((data) => {(addMarkup(data))})
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
getExercisesMarkup(filters.bodyParts).then((data) => {(addMarkup(data))})