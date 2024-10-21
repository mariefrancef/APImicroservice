class Produit {
  constructor(id, nom, prix, volume) {
    this.id = id;
    this.nom = nom;
    this.prix = prix;
    this.volume = volume;
  }
}

let produits = [new Produit(0, "pomme", 1, 1), new Produit(1, "peche", 2, 1)];
