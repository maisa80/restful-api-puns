window.onload = function() {
    fetchAllPuns();
}

async function fetchAllPuns() {
    try {
        const response = await fetch('https://puns-app.herokuapp.com/puns')
        const puns = await response.json();
        console.log(puns);

        let html = ''
        for (let pun of puns) {
            html += `
                <li class="list-group-item">
                    <p>${pun.content} <br> <span class="date">- ${pun.date}</span> </p>
                    
                    <div>
                        <a href="update-pun.html?id=${pun._id}">Update</a> |
                        <a href="#" class="delete-pun-link" data-pun-id="${pun._id}">Delete</a> 
                    </div>
                </li>
            `
        }

        document.getElementById('pun-list').innerHTML = html;
    } catch(error) {
        console.log(error)
    }

    // function deletePun

    const deletePunLinks = document.getElementsByClassName('delete-pun-link');
    console.log(deletePunLinks);

    for (let link of deletePunLinks) {
        link.addEventListener('click', async function(e) {
            e.preventDefault();

            const punId = e.target.dataset.punId

            try {
                await fetch(`https://puns-app.herokuapp.com/puns/${punId}`,{
                    method: 'DELETE', // GET/POST/PATCH/DELETE
                })
                // window.location.reload(); // may either reload OR...
                e.target.parentNode.parentNode.remove(); // remove from the DOM, without reloading the page
            } catch (error) {
                console.log(error)
            }
        })
    }

     /**
     * Add here an eventlistener to all delete-links, 
     * that makes a request to delete the chosen pun from DB, 
     * And also deletes the pun from the DOM
     * 
     * 1. Begin with selecting all delete-links with an appropiate element selector
     * 2. Loop through all delete-links and add an eventlistener for each delete-link,
     * 3. The eventlisteners should be triggered on the 'click'-event
     * 4. Make sure to use preventDefault(), to prevent the link from reloading the page
     * 5. When triggered, the eventlistener should make a "DELETE" request to the URL: https://puns-app.herokuapp.com/puns/<punID>, and the <punId> should be retrieved from delete-link data-attribute => 'e.target.dataset.id'
     * 6. Make sure to remove() the whole pun from DOM.
     */
}
















    