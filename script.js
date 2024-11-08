let commandes = [];
let totalNourriture = 0;
let totalLivraison = 0;
let currentIndex = null;

function ajouterCommande() {
    const nom = document.getElementById("nom-client").value;
    const tel = document.getElementById("tel-client").value;

    const commande = { nom, tel, livree: false, paiementNourriture: "", paiementLivraison: "" };
    commandes.push(commande);

    afficherCommandes();
    mettreAJourBilan();
}

function afficherCommandes() {
    const listeCommandes = document.getElementById("liste-commandes");
    listeCommandes.innerHTML = "";

    commandes.forEach((commande, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${commande.nom}</td>
            <td>${commande.tel}</td>
            <td>${commande.paiementNourriture || "-"}</td>
            <td>${commande.paiementLivraison || "-"}</td>
            <td>
                ${!commande.livree 
                    ? `<button onclick="ouvrirModal(${index})">Marquer comme Livrée</button>` 
                    : `<button onclick="supprimerCommande(${index})">Supprimer</button>`}
            </td>
        `;
        listeCommandes.appendChild(row);
    });
}

function ouvrirModal(index) {
    currentIndex = index;
    document.getElementById("payment-modal").style.display = "block";
}

function confirmerPaiement() {
    const paiementNourriture = document.getElementById("modal-paiement-nourriture").value;
    const paiementLivraison = document.getElementById("modal-paiement-livraison").value;

    commandes[currentIndex].livree = true;
    commandes[currentIndex].paiementNourriture = paiementNourriture;
    commandes[currentIndex].paiementLivraison = paiementLivraison;

    totalNourriture += 2000;  // Exemple de prix pour la nourriture
    totalLivraison += 1000;  // Exemple de prix pour la livraison

    document.getElementById("payment-modal").style.display = "none";
    afficherCommandes();
    mettreAJourBilan();
}

function supprimerCommande(index) {
    commandes.splice(index, 1);
    afficherCommandes();
    mettreAJourBilan();
}

function mettreAJourBilan() {
    document.getElementById("nb-livraisons").textContent = commandes.filter(c => c.livree).length;
    document.getElementById("total-nourriture").textContent = totalNourriture;
    document.getElementById("total-livraison").textContent = totalLivraison;
}

// Pour fermer la modal lorsqu'on clique en dehors
window.onclick = function(event) {
    const modal = document.getElementById("payment-modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
