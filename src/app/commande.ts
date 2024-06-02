export class Commande {
    id?: string;
    nom?:string;
    descriptipon?:string;
    materielId?: string;
    quantite?: number;
    date?: Date;
    statut?: string; // "En attente", "Approuvée", "Livrée"
    demandeurId?: string;
}
