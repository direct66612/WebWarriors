//получения ссылок
import axios from "axios";

export async function getExercisesMarkup(value) {
    const params = new URLSearchParams({
       filter: value,
       page: 1,
       limit: 9,
});

  return await axios.get(`/filters`, {params} )
   .then((resp) => {
    return resp.data.results;
});
}
 
//console.log(getExercisesMarkup("Body parts")); 
 