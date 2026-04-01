/**
 * Script de seed pour Blog SportActu
 * Peuple la base de données avec des données initiales réalistes.
 *
 * Usage : npm run seed (depuis le dossier backend)
 */

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { join } from 'path';

// Charger les variables d'environnement
dotenv.config({ path: join(__dirname, '../../.env') });

// Entités
import { User, UserRole } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Article } from '../articles/entities/article.entity';
import { Interview } from '../interviews/entities/interview.entity';
import { Comment } from '../comments/entities/comment.entity';

// ============================================================
// Connexion TypeORM
// ============================================================
const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'blog123',
  entities: [User, Category, Article, Interview, Comment],
  synchronize: true,
  logging: false,
});

// ============================================================
// Données de seed
// ============================================================

const CATEGORIES = [
  {
    name: 'Football',
    slug: 'football',
    description: "Toute l'actualité du football mondial : Ligue 1, Liga, Premier League, Champions League et équipe de France.",
  },
  {
    name: 'Basketball',
    slug: 'basketball',
    description: "NBA, Euroleague, Pro A et équipe de France de basketball.",
  },
  {
    name: 'Tennis',
    slug: 'tennis',
    description: "Roland-Garros, Wimbledon, US Open, Australian Open, ATP et WTA.",
  },
  {
    name: 'Rugby',
    slug: 'rugby',
    description: "Top 14, Champions Cup, Pro D2 et équipe de France de rugby.",
  },
  {
    name: 'F1',
    slug: 'f1',
    description: "Formule 1 — courses, classements, teams et coulisses du paddock.",
  },
  {
    name: 'MMA',
    slug: 'mma',
    description: "UFC, Bellator, ONE Championship et arts martiaux mixtes.",
  },
];

const USERS = [
  {
    email: 'admin@sportactu.fr',
    password: 'Admin1234!',
    role: UserRole.ADMIN,
    firstName: 'Admin',
    lastName: 'SportActu',
  },
  {
    email: 'jean.dupont@sportactu.fr',
    password: 'Auteur1234!',
    role: UserRole.USER,
    firstName: 'Jean',
    lastName: 'Dupont',
  },
  {
    email: 'marie.martin@sportactu.fr',
    password: 'Auteur1234!',
    role: UserRole.USER,
    firstName: 'Marie',
    lastName: 'Martin',
  },
];

// ============================================================
// Contenu des articles (par catégorie)
// ============================================================

function getArticles(categories: Record<string, Category>, users: User[]): Partial<Article>[] {
  const admin = users[0];
  const jean = users[1];
  const marie = users[2];

  return [
    // ---- FOOTBALL ----
    {
      title: "PSG : Mbappé absent, le club cherche son nouveau leader",
      excerpt: "Depuis le départ de Kylian Mbappé au Real Madrid, le Paris Saint-Germain peine à trouver son joueur-clé. Analyse d'une crise de leadership.",
      content: `<p>Le départ de Kylian Mbappé au Real Madrid durant l'été a laissé un vide immense au Paris Saint-Germain. Si le club de la capitale a su recruter des joueurs de talent, aucun n'a encore réussi à endosser le costume de leader technique et charismatique que portait le natif de Bondy.</p>

<h2>Un collectif en quête d'identité</h2>
<p>La saison en cours illustre parfaitement ce flottement. L'équipe parisienne enchaîne les prestations en demi-teinte en Ligue 1, peinent à convaincre malgré des individualités de qualité. Le coach Luis Enrique tente d'imposer un jeu collectif ambitieux, mais l'absence d'un finisseur de classe mondiale se fait cruellement sentir.</p>

<h2>Les prétendants au leadership</h2>
<p>Plusieurs joueurs tentent de combler ce vide. Ousmane Dembélé, très en forme en début de saison, a connu un coup d'arrêt avec une blessure musculaire. Gianluigi Donnarumma assume pleinement son rôle de capitaine entre les perches, mais un leader offensif manque à l'appel. Les regards se tournent désormais vers les jeunes pousses de la formation parisienne.</p>

<p>La direction sportive du PSG semble consciente du problème. Des discussions seraient en cours pour renforcer l'attaque lors du prochain mercato hivernal. Les noms de Victor Gyökeres et Jonathan David circulent avec insistance dans les couloirs du Parc des Princes.</p>`,
      published: true,
      category: categories['football'],
      author: jean,
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    },
    {
      title: "Ligue des Champions : le tirage au sort des huitièmes de finale",
      excerpt: "Les équipes françaises connaissent désormais leur adversaire pour les huitièmes de finale de la Champions League. Tour d'horizon des affiches.",
      content: `<p>Le tirage au sort des huitièmes de finale de la Ligue des Champions a livré son verdict ce lundi à Nyon. Les clubs français engagés dans la compétition découvrent leurs adversaires pour la suite de l'aventure européenne.</p>

<h2>Des affiches alléchantes</h2>
<p>Le PSG hérite d'un adversaire redoutable qui mettra à l'épreuve les ambitions parisiennes sur la scène continentale. De son côté, l'Olympique de Marseille, qualifié au terme d'un parcours haletant dans la phase de groupes, devra hausser son niveau de jeu face à une écurie plus expérimentée.</p>

<h2>Calendrier des rencontres</h2>
<p>Les matchs allers se joueront en février, les retours en mars. Les équipes françaises auront le temps de peaufiner leur préparation tactique. Les entraîneurs des clubs français ont exprimé leur confiance tout en restant prudents face à la qualité des adversaires tirés au sort.</p>

<p>Une chose est certaine : le football européen promet de belles soirées aux fans des Bleus en club durant ces prochaines semaines.</p>`,
      published: true,
      category: categories['football'],
      author: marie,
      imageUrl: 'https://images.unsplash.com/photo-1551854838-212c9a5f8e79?w=800',
    },
    {
      title: "Équipe de France : Deschamps et l'ère post-Mbappé",
      excerpt: "Sans Kylian Mbappé disponible pour certaines échéances, Didier Deschamps expérimente de nouvelles combinaisons tactiques pour les Bleus.",
      content: `<p>L'équipe de France entre dans une nouvelle ère. Avec Kylian Mbappé désormais concentré sur ses obligations madrilènes et parfois indisponible, le sélectionneur Didier Deschamps doit repenser ses schémas offensifs.</p>

<h2>Le chantier offensif des Bleus</h2>
<p>Les récents rassemblements ont permis d'observer une sélection française en plein renouveau. De jeunes profils comme Warren Zaïre-Emery ou Michael Olise apportent leur fraîcheur et leur créativité. Marcus Thuram, en grande forme à l'Inter Milan, s'impose comme le pivot de l'attaque tricolore.</p>

<h2>Cap sur la prochaine compétition</h2>
<p>L'objectif est clair : aborder la prochaine compétition internationale avec une équipe soudée et polyvalente. Deschamps mise sur la profondeur de son effectif et la capacité de ses joueurs à s'adapter à différents systèmes de jeu.</p>`,
      published: true,
      category: categories['football'],
      author: admin,
      imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
    },

    // ---- BASKETBALL ----
    {
      title: "NBA : LeBron James écrit l'histoire avec un nouveau record",
      excerpt: "À 39 ans, LeBron James continue de repousser les limites du possible en NBA. Il vient de franchir un nouveau cap historique.",
      content: `<p>LeBron James n'en finit pas d'écrire l'histoire de la NBA. Le joueur des Los Angeles Lakers a franchi un nouveau cap historique lors d'un match qui restera dans les annales de la grande ligue américaine.</p>

<h2>Un record qui fait date</h2>
<p>À 39 ans, "King James" démontre une longévité exceptionnelle au plus haut niveau. Sa forme physique irréprochable, fruit d'une préparation méticuleuse et d'investissements colossaux dans sa récupération, force l'admiration de tous les observateurs de la NBA.</p>

<h2>Vers une nouvelle saison de playoffs ?</h2>
<p>Les Lakers semblent bien partis pour retrouver les playoffs cette saison. Avec LeBron et Anthony Davis en grande forme, l'équipe de Los Angeles retrouve sa superbe. Le management a su construire un roster compétitif autour de ses deux stars, et les résultats commencent à se voir.</p>

<p>Pour LeBron, l'objectif est clair : décrocher un cinquième titre de champion NBA avant de raccrocher les sneakers. Un objectif ambitieux mais pas irréaliste vu le niveau affiché.</p>`,
      published: true,
      category: categories['basketball'],
      author: jean,
      imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
    },
    {
      title: "Équipe de France basket : les Bleus visent l'or olympique",
      excerpt: "Après l'argent à Paris 2024, l'équipe de France masculine de basketball nourrit de grandes ambitions pour les prochains Jeux Olympiques.",
      content: `<p>La médaille d'argent aux Jeux Olympiques de Paris 2024 a laissé une saveur douce-amère aux joueurs et supporters français. Battus en finale, les Bleus reviennent plus déterminés que jamais avec un objectif : l'or.</p>

<h2>Un groupe soudé et motivé</h2>
<p>Rudy Gobert, Victor Wembanyama et leurs coéquipiers ont renoué avec l'entraîneur national pour débuter la préparation du prochain cycle olympique. La dynamique de groupe est excellente, portée par l'élan de la finale parisienne qui a enthousiasmé tout un pays.</p>

<h2>Wembanyama, la nouvelle star</h2>
<p>Victor Wembanyama, révélation absolue de la NBA cette saison avec les San Antonio Spurs, monte en puissance en sélection. Son gabarit unique (2m24, agilité de meneur) en fait un joueur impossible à défendre pour n'importe quelle équipe mondiale. À 20 ans, il est déjà considéré comme l'un des meilleurs joueurs de la planète.</p>`,
      published: true,
      category: categories['basketball'],
      author: marie,
      imageUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800',
    },

    // ---- TENNIS ----
    {
      title: "Roland-Garros : Swiatek favorite sur sa surface de prédilection",
      excerpt: "La Polonaise Iga Swiatek aborde Roland-Garros en grande favorite. Retour sur sa domination écrasante sur terre battue.",
      content: `<p>Roland-Garros approche et avec lui, la question rituelle : qui peut battre Iga Swiatek sur la terre battue parisienne ? La numéro mondiale polonaise aborde le tournoi du Grand Chelem avec une sérénité déconcertante.</p>

<h2>Une domination sans précédent</h2>
<p>Les statistiques de Swiatek à Paris sont vertigineuses. Sa puissance de frappe, sa solidité mentale et son jeu de jambes impeccable font d'elle une joueuse quasi-imbattable sur cette surface. Les autres prétendantes au titre devront élever leur niveau de jeu à des hauteurs inédites pour l'inquiéter.</p>

<h2>Les challengers potentielles</h2>
<p>Aryna Sabalenka, Coco Gauff et Elena Rybakina ont les armes pour poser des problèmes à la tenante du titre. Mais la régularité de Swiatek sur l'ensemble d'un tournoi de deux semaines reste son atout majeur. À moins d'une surprise de taille, la Polonaise devrait à nouveau soulever la Coupe Suzanne-Lenglen.</p>`,
      published: true,
      category: categories['tennis'],
      author: admin,
      imageUrl: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800',
    },
    {
      title: "Carlos Alcaraz : le successeur de Nadal sur terre battue ?",
      excerpt: "L'Espagnol Carlos Alcaraz s'impose progressivement comme le maître incontesté de la terre battue mondiale. Analyse d'un prodige.",
      content: `<p>Quand Rafael Nadal a pris sa retraite, beaucoup s'interrogeaient sur l'avenir du tennis espagnol sur terre battue. Carlos Alcaraz, 21 ans, est en train de répondre à cette question de la plus belle des manières.</p>

<h2>Un jeu complet pour un joueur précoce</h2>
<p>Alcaraz possède un arsenal technique rarissime pour son âge. Sa capacité à accélérer sur n'importe quel coup, sa défense accrochée et sa créativité tactique le rendent particulièrement redoutable sur terre battue. Son mentor Juan Carlos Ferrero a su développer chez lui des qualités mentales solides comme le roc.</p>

<h2>Un palmarès qui s'étoffe</h2>
<p>Avec plusieurs titres du Grand Chelem déjà à son palmarès à seulement 21 ans, Alcaraz s'affirme comme le successeur naturel de la génération dorée du tennis espagnol. Sa rivalité naissante avec Jannik Sinner promet de belles batailles pour les années à venir.</p>`,
      published: true,
      category: categories['tennis'],
      author: jean,
      imageUrl: 'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=800',
    },

    // ---- RUGBY ----
    {
      title: "Top 14 : Toulouse conserve son rang de favori",
      excerpt: "Le Stade Toulousain confirme sa domination sur le championnat de France de rugby. Analyse d'un effectif de classe mondiale.",
      content: `<p>Le Stade Toulousain confirme semaine après semaine son statut de favori en Top 14. La machine rouge et noire tourne à plein régime avec un effectif d'une qualité rare dans l'histoire du club.</p>

<h2>Un effectif cinq étoiles</h2>
<p>La force de Toulouse réside dans sa profondeur d'effectif. Des joueurs comme Antoine Dupont, Romain Ntamack ou Thomas Ramos seraient titulaires dans n'importe quel club d'Europe. Mais au Stadium, ils constituent un groupe homogène porté par une culture de la gagne unique.</p>

<h2>Antoine Dupont, meilleur joueur du monde</h2>
<p>Le demi de mêlée Antoine Dupont reste la pièce maîtresse du système toulousain. Sa vitesse d'exécution, sa vista et son sens du collectif en font un joueur unique au monde. Après ses exploits en Coupe du Monde et aux Jeux Olympiques avec le XV/VII de France, il revient en Top 14 avec la même faim de vaincre.</p>`,
      published: true,
      category: categories['rugby'],
      author: marie,
      imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800',
    },
    {
      title: "XV de France : les Bleus préparent le prochain tournoi des VI Nations",
      excerpt: "Fabien Galthié et son staff peaufinent leur stratégie pour aborder le Tournoi des VI Nations avec les meilleures chances possibles.",
      content: `<p>Alors que la saison de Top 14 bat son plein, le sélectionneur Fabien Galthié prépare déjà le prochain Tournoi des VI Nations. La France, dauphine du monde, aborde cette compétition avec la ferme intention de ramener le Grand Chelem.</p>

<h2>Un groupe talentueux et expérimenté</h2>
<p>La génération dorée du rugby français est au sommet de sa maturité. Des joueurs comme Dupont, Ntamack, Penaud ou Taofifenua ont accumulé une expérience internationale précieuse. Galthié peut s'appuyer sur un groupe soudé qui a vécu ensemble les grandes campagnes des dernières années.</p>

<h2>Les points d'attention</h2>
<p>Quelques postes restent en concurrence, notamment en deuxième ligne et sur l'aile. Le staff tricolore observe avec attention les performances des candidats potentiels lors des matches de Top 14 avant d'arrêter ses choix définitifs. Le turnover dans le groupe sera maîtrisé pour ne pas casser une dynamique positive.</p>`,
      published: true,
      category: categories['rugby'],
      author: admin,
      imageUrl: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=800',
    },

    // ---- F1 ----
    {
      title: "Max Verstappen : la domination continue en Formule 1",
      excerpt: "Le quadruple champion du monde néerlandais Max Verstappen continue d'écraser la concurrence. Quel pilote peut l'arrêter ?",
      content: `<p>Max Verstappen. Deux mots qui résument à eux seuls la saison de Formule 1. Le Néerlandais de Red Bull Racing enchaîne les victoires avec une régularité qui laisse pantois l'ensemble du paddock.</p>

<h2>Une machine de guerre</h2>
<p>La RB20 est la voiture la plus rapide du plateau, mais la domination de Verstappen dépasse largement les seules performances techniques de son bolide. Sa capacité à gérer les pneus, son intelligence de course et ses réflexes hors normes en font un pilote d'une autre dimension.</p>

<h2>Qui peut le défier ?</h2>
<p>Lando Norris chez McLaren et Charles Leclerc chez Ferrari semblent être les challengers les plus sérieux. L'équipe de Woking a réalisé des progrès spectaculaires avec la MCL38, et le Britannique a montré qu'il pouvait suivre Verstappen lors de certains Grands Prix. Mais la constance du Néerlandais reste sa force première.</p>

<p>Lewis Hamilton, désormais chez Ferrari, tente lui aussi de revenir dans le coup. Son arrivée dans l'équipe italienne a créé une effervescence sans précédent à Maranello. Mais les résultats tardent encore à venir.</p>`,
      published: true,
      category: categories['f1'],
      author: jean,
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    },
    {
      title: "Lewis Hamilton chez Ferrari : une première saison en rouge",
      excerpt: "Lewis Hamilton a rejoint la Scuderia Ferrari. Comment s'est passée son intégration dans la Scuderia ? Premier bilan.",
      content: `<p>L'annonce avait provoqué un séisme dans le monde de la Formule 1 : Lewis Hamilton quittait Mercedes pour rejoindre Ferrari. Quelques mois après ce transfert historique, quel bilan peut-on dresser de cette union tant attendue ?</p>

<h2>Une adaptation progressive</h2>
<p>Rejoindre Ferrari n'est pas une mince affaire, même pour un septuple champion du monde. Hamilton a dû s'adapter à une voiture aux caractéristiques différentes, à une culture d'équipe différente et à un environnement médiatique d'une intensité inégalée. Les premières courses ont montré un pilote en phase d'apprentissage.</p>

<h2>Les premiers signaux positifs</h2>
<p>Progressivement, Hamilton semble trouver ses marques. Ses qualifications récentes montrent qu'il commence à extraire le meilleur de la SF-25. La relation avec son ingénieur de course se consolide, et l'équipe apprend à travailler selon ses méthodes de développement de la voiture.</p>

<p>Le vrai test viendra lors de la deuxième moitié de saison, quand Ferrari sera attendu dans les batailles pour la victoire. Hamilton et Maranello méritent du temps pour construire quelque chose de grand.</p>`,
      published: true,
      category: categories['f1'],
      author: marie,
      imageUrl: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?w=800',
    },

    // ---- MMA ----
    {
      title: "UFC : Jon Jones défend son titre des poids lourds",
      excerpt: "Jon Jones, considéré comme le meilleur combattant MMA de l'histoire, défend une nouvelle fois sa couronne des poids lourds à l'UFC.",
      content: `<p>Jon Jones. Un nom qui divise, mais qui s'impose comme une évidence dans le débat du GOAT (Greatest Of All Time) du MMA. Le champion des poids lourds de l'UFC défend une nouvelle fois son titre avec la même aura d'invincibilité qui le caractérise depuis plus de quinze ans.</p>

<h2>Un palmarès sans équivalent</h2>
<p>Son palmarès parle pour lui. Ancien champion des mi-lourds invaincu pendant des années, Jones a gravi les échelons jusqu'aux poids lourds pour y régner avec la même aisance. Sa polyvalence technique — frappe, lutte, jiu-jitsu, coups de coude — en fait un combattant impossible à préparer.</p>

<h2>L'adversaire du soir</h2>
<p>Pour cette défense de titre, Jones affrontera un challenger redoutable qui a remporté plusieurs combats consécutifs pour mériter cette opportunité. La préparation du champion a été intense, et son team annonce Jon dans la meilleure forme de sa carrière. Le public de l'UFC est en attente de ce choc au sommet.</p>`,
      published: true,
      category: categories['mma'],
      author: admin,
      imageUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
    },
    {
      title: "Islam Makhachev : l'héritier de Khabib sur le trône de l'UFC",
      excerpt: "Le champion des poids légers Islam Makhachev perpétue la tradition de Daghestan à l'UFC. Portrait d'un combattant à part.",
      content: `<p>Quand Khabib Nurmagomedov a pris sa retraite invaincu en 2020, la question était sur toutes les lèvres : qui allait perpétuer la tradition du Daghestan à l'UFC ? Islam Makhachev a apporté la réponse la plus convaincante qui soit.</p>

<h2>Un style unique</h2>
<p>Comme son mentor Khabib, Makhachev excelle dans le grappling et la lutte au sol. Son contrôle de la distance, sa capacité à amener ses adversaires au sol et sa technique de soumission en font un combattant cauchemardesque pour n'importe quel adversaire. Mais contrairement à son aîné, il a également développé un jeu debout dangereux.</p>

<h2>La domination se confirme</h2>
<p>Depuis qu'il a décroché le titre des poids légers, Makhachev l'a défendu à plusieurs reprises face aux meilleurs combattants de la division. Alexander Volkanovski, Charles Oliveira, Dustin Poirier : les prétendants se succèdent mais ne parviennent pas à détrôner le champion daghestanais.</p>

<p>À 32 ans, Makhachev entre dans la plénitude de ses moyens. L'ère Makhachev semble encore loin d'être terminée.</p>`,
      published: true,
      category: categories['mma'],
      author: jean,
      imageUrl: 'https://images.unsplash.com/photo-1555585529-a3a1bede1e4a?w=800',
    },
  ];
}

// ============================================================
// Interviews
// ============================================================

function getInterviews(users: User[]): Partial<Interview>[] {
  const admin = users[0];
  const marie = users[2];

  return [
    {
      sportifName: 'Antoine Dupont',
      sport: 'Rugby',
      questions: [
        "Vous venez de remporter l'or olympique en rugby à VII. Quel souvenir gardez-vous de cette expérience ?",
        'Comment gérez-vous la pression d\'être considéré comme le meilleur joueur du monde ?',
        'Quels sont vos objectifs avec le Stade Toulousain cette saison ?',
        'Un message pour les jeunes qui rêvent de devenir rugbyman professionnel ?',
      ],
      answers: [
        "C'est clairement le moment le plus fort de ma carrière. Jouer devant notre public à Paris, avec cette ambiance extraordinaire, et décrocher l'or... C'est un souvenir que je garderai toute ma vie. On a vécu quelque chose d'unique avec ce groupe.",
        'La pression fait partie du jeu. Je me concentre sur mon travail quotidien, sur les entraînements, sur les détails. Le reste suit naturellement. J\'ai une équipe formidable autour de moi à Toulouse et en sélection, et ça m\'aide beaucoup à gérer les attentes extérieures.',
        "On veut évidemment conserver notre titre en Top 14 et aller le plus loin possible en Champions Cup. Toulouse a les moyens de ses ambitions cette saison. Le groupe est concentré et motivé. On sait qu'il faudra tout donner chaque semaine.",
        "Travaillez dur, soyez patients et ne lâchez jamais. Le talent seul ne suffit pas. Les meilleurs joueurs que je connaisse sont aussi les plus travailleurs. Écoutez vos entraîneurs, soyez humbles et gardez le plaisir du jeu. C'est ça le plus important.",
      ],
      imageUrl: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=600',
      published: true,
      author: marie,
    },
    {
      sportifName: 'Victor Wembanyama',
      sport: 'Basketball',
      questions: [
        "Votre première saison en NBA a été exceptionnelle. Qu'est-ce qui vous a le plus surpris dans la grande ligue ?",
        'Comment vivez-vous votre statut de phénomène à seulement 20 ans ?',
        "Quelles sont vos ambitions avec l'équipe de France de basketball ?",
        'Quel conseil donneriez-vous à un jeune basketteur français qui rêve de NBA ?',
      ],
      answers: [
        "Le niveau athlétique m'a frappé dès le premier entraînement. Chaque joueur en NBA est exceptionnel dans son domaine. Ce qui m'a aussi surpris, c'est le rythme : 82 matchs, les voyages, la récupération... Il faut apprendre à gérer son corps différemment.",
        'J\'essaie de rester focus sur le basketball. Je suis venu en NBA pour progresser et gagner, pas pour être une star. Bien sûr, c\'est flatteur d\'entendre des choses positives, mais ça ne change rien à ma façon de travailler. Je me couche chaque soir en pensant à comment je peux m\'améliorer.',
        "Je veux ramener une médaille d'or olympique avec les Bleus. On est très proches de l'avoir fait à Paris. Ce groupe a quelque chose de spécial. Avec les joueurs NBA qui nous rejoignent, on a les armes pour aller chercher ce titre.",
        "Continuez à travailler votre jeu complet. En NBA, on vous demandera d'être polyvalent. Perfectionnez vos fondamentaux, travaillez votre mental et ne perdez jamais confiance en vous. La route est longue, mais le rêve est accessible si vous y croyez vraiment.",
      ],
      imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600',
      published: true,
      author: admin,
    },
    {
      sportifName: 'Iga Swiatek',
      sport: 'Tennis',
      questions: [
        "Roland-Garros semble être votre terrain de jeu favori. Qu'est-ce qui rend ce tournoi si spécial pour vous ?",
        "Comment expliquez-vous votre domination sur la terre battue ?",
        "Quels sont vos objectifs pour la suite de votre carrière ?",
      ],
      answers: [
        "Roland-Garros a quelque chose de magique. L'atmosphère, le public, la terre battue rouge... C'est là où j'ai remporté mon premier Grand Chelem et depuis, j'ai une relation très particulière avec ce tournoi. Chaque victoire à Paris me touche profondément.",
        "Je pense que c'est un ensemble de facteurs. Ma solidité mentale d'abord — je gère bien la pression des grands matchs. Techniquement, ma frappe lifée est très efficace sur cette surface. Et puis j'aime vraiment jouer sur terre battue, ça se ressent dans mon jeu.",
        "Je veux continuer à progresser et gagner d'autres Grand Chelems. Sur toutes les surfaces. Je travaille dur pour être plus dangereuse sur gazon et dur. Et un jour, j'aimerais remporter le Grand Chelem calendaire. C'est l'objectif ultime.",
      ],
      imageUrl: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600',
      published: true,
      author: marie,
    },
  ];
}

// ============================================================
// Script principal
// ============================================================

async function seed() {
  console.log('🌱 Démarrage du seed de la base de données...\n');

  await AppDataSource.initialize();
  console.log('✅ Connexion à la base de données établie\n');

  // Repositories
  const userRepo = AppDataSource.getRepository(User);
  const categoryRepo = AppDataSource.getRepository(Category);
  const articleRepo = AppDataSource.getRepository(Article);
  const interviewRepo = AppDataSource.getRepository(Interview);
  const commentRepo = AppDataSource.getRepository(Comment);

  // ---- 1. Nettoyage (optionnel — commenter si vous ne voulez pas réinitialiser) ----
console.log('🧹 Nettoyage des données existantes...');
await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
await commentRepo.clear();
await articleRepo.clear();
await interviewRepo.clear();
await categoryRepo.clear();
await userRepo.clear();
await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
console.log('   Tables vidées\n');

  // ---- 2. Catégories ----
  console.log('📂 Création des catégories...');
  const savedCategories: Record<string, Category> = {};
  for (const cat of CATEGORIES) {
    const category = categoryRepo.create(cat);
    const saved = await categoryRepo.save(category);
    savedCategories[cat.slug] = saved;
    console.log(`   ✓ ${cat.name}`);
  }
  console.log('');

  // ---- 3. Utilisateurs ----
  console.log('👤 Création des utilisateurs...');
  const savedUsers: User[] = [];
  for (const userData of USERS) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = userRepo.create({
      email: userData.email,
      password: hashedPassword,
      role: userData.role,
      firstName: userData.firstName,
      lastName: userData.lastName,
    });
    const saved = await userRepo.save(user);
    savedUsers.push(saved);
    console.log(`   ✓ ${userData.email} (${userData.role}) — mot de passe: ${userData.password}`);
  }
  console.log('');

  // ---- 4. Articles ----
  console.log('📰 Création des articles...');
  const articlesData = getArticles(savedCategories, savedUsers);
  const savedArticles: Article[] = [];
  for (const articleData of articlesData) {
    const article = articleRepo.create(articleData);
    const saved = await articleRepo.save(article);
    savedArticles.push(saved);
    console.log(`   ✓ [${articleData.category?.name}] ${articleData.title?.substring(0, 50)}...`);
  }
  console.log('');

  // ---- 5. Interviews ----
  console.log('🎤 Création des interviews...');
  const interviewsData = getInterviews(savedUsers);
  for (const interviewData of interviewsData) {
    const interview = interviewRepo.create(interviewData);
    await interviewRepo.save(interview);
    console.log(`   ✓ Interview de ${interviewData.sportifName} (${interviewData.sport})`);
  }
  console.log('');

  // ---- 6. Commentaires ----
  console.log('💬 Création des commentaires...');
  const sampleComments = [
    { content: "Super article, merci pour ces analyses détaillées !", articleIndex: 0, authorIndex: 1 },
    { content: "Très bon résumé de la situation au PSG. On attend de voir si le mercato va changer les choses.", articleIndex: 0, authorIndex: 2 },
    { content: "LeBron est vraiment hors catégorie ! Un phénomène absolu.", articleIndex: 3, authorIndex: 0 },
    { content: "Wembanyama va être le meilleur joueur de l'histoire je le sens !", articleIndex: 4, authorIndex: 1 },
    { content: "Swiatek est inarrêtable sur terre battue. Hâte de voir Roland-Garros !", articleIndex: 5, authorIndex: 2 },
    { content: "Alcaraz ou Sinner pour le prochain Roland-Garros chez les hommes ? Difficile à dire...", articleIndex: 6, authorIndex: 0 },
    { content: "Dupont est un extraterrestre du rugby. Chapeau bas.", articleIndex: 7, authorIndex: 1 },
    { content: "Verstappen écrase tout le monde, ça commence à manquer de suspense en F1...", articleIndex: 10, authorIndex: 2 },
    { content: "Hamilton chez Ferrari c'est le transfert du siècle, j'espère qu'ils vont gagner ensemble !", articleIndex: 11, authorIndex: 0 },
    { content: "Jon Jones est le GOAT du MMA, point final.", articleIndex: 12, authorIndex: 1 },
  ];

  for (const commentData of sampleComments) {
    if (savedArticles[commentData.articleIndex] && savedUsers[commentData.authorIndex]) {
      const comment = commentRepo.create({
        content: commentData.content,
        article: savedArticles[commentData.articleIndex],
        author: savedUsers[commentData.authorIndex],
      });
      await commentRepo.save(comment);
      console.log(`   ✓ Commentaire sur: "${savedArticles[commentData.articleIndex].title?.substring(0, 40)}..."`);
    }
  }
  console.log('');

  // ---- Résumé ----
  const stats = {
    users: await userRepo.count(),
    categories: await categoryRepo.count(),
    articles: await articleRepo.count(),
    interviews: await interviewRepo.count(),
    comments: await commentRepo.count(),
  };

  console.log('═══════════════════════════════════════');
  console.log('✅ SEED TERMINÉ AVEC SUCCÈS !');
  console.log('═══════════════════════════════════════');
  console.log(`   👤 Utilisateurs  : ${stats.users}`);
  console.log(`   📂 Catégories    : ${stats.categories}`);
  console.log(`   📰 Articles      : ${stats.articles}`);
  console.log(`   🎤 Interviews    : ${stats.interviews}`);
  console.log(`   💬 Commentaires  : ${stats.comments}`);
  console.log('═══════════════════════════════════════');
  console.log('\n🔑 Identifiants de connexion :');
  console.log('   Admin  : admin@sportactu.fr    / Admin1234!');
  console.log('   Auteur : jean.dupont@sportactu.fr / Auteur1234!');
  console.log('   Auteur : marie.martin@sportactu.fr / Auteur1234!\n');

  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Erreur lors du seed :', err);
  process.exit(1);
});
