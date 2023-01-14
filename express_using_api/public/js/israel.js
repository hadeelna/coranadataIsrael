const cityForm = document.getElementById("Israel_city_form");
const cityInput = document.getElementById("Israel_city_input");
const israelTitle = document.getElementById("Israel_title");
const israelDataBlock = document.getElementById("Israel_data_block");

cityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchDatatwo();
})

async function fetchDatatwo()
{
try{
        if (!cityInput.value)
        {  
            let res = await fetch('http://localhost:3000/Israel?city=general'+cityInput.value);
            if(!res.ok)
            {
       
                israelDataBlock.innerHTML = "אין תוצאות";
                throw new Error("No result from URL");
            } else {
               
                let data = await res.text();
                israelDataBlock.innerHTML = data;
            } 
        } else {
            let res = await fetch('http://localhost:3000/Israel?city='+cityInput.value);
            if(!res.ok)
            {
       
                israelDataBlock.innerHTML = "שגיאת התחברות לשרת";
                throw new Error("No result from URL");
            } else {
               
                let data = await res.text();
                israelDataBlock.innerHTML = data;
            }
        }
    } catch (err)
    {
        israelDataBlock.innerHTML = "...משהו לא תקין";

        console.log(err);
    }
}

