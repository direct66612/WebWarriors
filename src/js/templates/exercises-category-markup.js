//разметка

export function createMarkup(array) {
    return array.map(({filter, name, imgURL}) => {
      return `<li class = "new-exercises-item" data-category='${name}')>  

         <div class = "exercises-filter-IMG" style="
         background: linear-gradient(
            0deg, 
            rgba(17, 17, 17, 0.50) 0%, 
            rgba(17, 17, 17, 0.50) 100%),
            url('${imgURL}'),
             lightgray -19.24px -11px / 112.354% 111.111% 
             no-repeat; 

             background-size: contain;
             background-size: cover; ">    
             
             
             
          <div class="container-for-h2-and-p-card">
            <h2 class="exercises-title-of-item">${name}</h2>
            <p class="exercises-text-of-item">${filter}</p>
          </div>              
        </div>            
        </li>`
    }).join('');
};

      //      <div class="exercises-filter-IMG" style="background-image: url('${imgURL}');"></div>
    

