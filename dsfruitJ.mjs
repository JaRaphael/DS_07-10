const gistUrl = 'https://gist.githubusercontent.com/dupontdenis/b2e5e1b7460c239b39deb76f8d458908/raw/817a898940170ae4ea6d5b16ef462f959c4d38d1/gistfile1.txt';
/*Fonction pour récupérer les données*/
async function fetchData() {
    try {
        const response = await fetch(gistUrl);
        const text = await response.text();
        
        const data = eval(text); // Attention à l'utilisation de eval()
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
}

/*Fonction pour afficher le tableau*/
async function afficherTableau() {
    const contenuTableau = document.getElementById('table-body');
    const filter = document.getElementById('filter');
    const stockCheck = document.getElementById('stockCheck');

    /*tableau = contenu du lien*/
    const tableau = await fetchData();

    /*Fonction qui filtre et affiche le tableau*/
    function filtreTableau() {
        contenuTableau.innerHTML = ''; /*reset le tableau*/

        /*On filtre les items selon le filtre et la case*/
        const filterValue = filter.value.toLowerCase();
        const excludeOutOfStock = stockCheck.checked;
        tableau.forEach(item => {
            if (item.name.toLowerCase().startsWith(filterValue) && (!excludeOutOfStock || item.stocked)) {
                
                const row = document.createElement('tr');

                const noms = document.createElement('td');
                noms.textContent = item.name;
                if (!item.stocked) {
                    noms.classList.add('rupture');
                }

                const prices = document.createElement('td');
                prices.textContent = item.price;

                /*Ajoute les infos à la ligne*/
                row.appendChild(noms);
                row.appendChild(prices);

                /*Ajoute la ligne au tableau*/
                contenuTableau.appendChild(row);
            }
        });
    }

    /*Appelle la fonction pour afficher le tableau filtrer*/
    filtreTableau();

    filter.addEventListener('input', filtreTableau);
    stockCheck.addEventListener('change', filtreTableau);
}

/*Appelle la fonction pour afficher le tableau au début*/
afficherTableau();
