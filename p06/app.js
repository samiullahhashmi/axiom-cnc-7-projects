const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const apply = document.getElementById('apply');
const close = document.getElementById('close');
const modal = document.getElementById('modal');


        nav.style.right = "-250px";
        menuBtn.onclick = function() {
            if (nav.style.right == "-250px") { 
                nav.style.right = "0";
            } 

            else { 
                nav.style.right = "-250px"; 
            }
        }


    // 2. Show the Modal
apply.addEventListener('click', () =>
modal.classList.add('show-modal')
);

// 3. Close the Modal
close.addEventListener('click', () => 
modal.classList.remove('show-modal')
);

// 4. Close the Modal on Click Outside Modal
window.addEventListener('click', e => 
e.target === modal ? modal.classList.remove('show-modal') : false
);