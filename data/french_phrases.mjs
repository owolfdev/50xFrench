import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export const PHRASES = [
  {
    phrase:
      "Il m'a dit que si j'avais besoin d'aide, je n'avais qu'à demander.",
    translation: "He told me that if I needed help, I just had to ask.",
  },
  {
    phrase: "Il faudrait que tu essaies cette nouvelle cuisine.",
    translation: "You should try this new cuisine.",
  },
  {
    phrase: "Si j'avais su, je serais venu plus tôt.",
    translation: "If I had known, I would have come earlier.",
  },
  {
    phrase: "En revanche, je n'aime pas du tout ce genre de musique.",
    translation: "On the other hand, I don't like that type of music at all.",
  },
  {
    phrase: "Bien que je l'aime, je ne suis pas toujours d'accord avec lui.",
    translation: "Although I love him, I don't always agree with him.",
  },
  {
    phrase: "Si tu veux, nous pourrions sortir demain.",
    translation: "If you want, we could go out tomorrow.",
  },
  {
    phrase: "J'ai du mal à comprendre ce concept.",
    translation: "I'm having trouble understanding this concept.",
  },
  {
    phrase: "Quand je voyage, j'aime bien m'immerger dans la culture locale.",
    translation:
      "When I travel, I like to immerse myself in the local culture.",
  },
  {
    phrase: "Tu as vu le film dont tout le monde parle?",
    translation: "Have you seen the movie everyone is talking about?",
  },

  {
    phrase: "J'ai du mal à comprendre ce concept.",
    translation: "I'm having trouble understanding this concept.",
  },
  {
    phrase: "Depuis que je suis petit, j'adore la musique.",
    translation: "I've loved music since I was little.",
  },
  {
    phrase: "Si j'avais su, je serais venu plus tôt.",
    translation: "If I had known, I would have come earlier.",
  },
  {
    phrase:
      "Elle prétend qu'elle ne l'a pas fait, mais je n'en suis pas si sûr.",
    translation: "She claims she didn't do it, but I'm not so sure.",
  },
  {
    phrase: "Je me demande si c'est la bonne décision.",
    translation: "I wonder if this is the right decision.",
  },

  {
    phrase: "Même si c'est difficile, il faut persévérer.",
    translation: "Even if it's hard, you must persevere.",
  },
  {
    phrase: "Je t'assure que ce n'est pas vrai.",
    translation: "I assure you that it's not true.",
  },
  {
    phrase: "Je suis fatigué, néanmoins je vais continuer.",
    translation: "I'm tired, but I'll keep going.",
  },
  {
    phrase: "Pendant mon séjour en France, j'ai beaucoup appris.",
    translation: "During my stay in France, I learned a lot.",
  },
  {
    phrase: "Bien que je l'aime, je ne suis pas toujours d'accord avec lui.",
    translation: "Although I love him, I don't always agree with him.",
  },
  {
    phrase: "En général, je préfère les films d'action.",
    translation: "Generally, I prefer action movies.",
  },

  {
    phrase: "Elle est belle malgré son âge.",
    translation: "She is beautiful despite her age.",
  },
  {
    phrase: "D'après lui, le concert était fantastique.",
    translation: "According to him, the concert was fantastic.",
  },
  {
    phrase: "J'aurais aimé être là pour voir ça.",
    translation: "I would have liked to be there to see that.",
  },
  {
    phrase: "C'est la première fois que je vois une telle chose.",
    translation: "It's the first time I've seen such a thing.",
  },
  {
    phrase: "Jusqu'à présent, tout va bien.",
    translation: "So far, so good.",
  },

  {
    phrase: "Tant que tu fais de ton mieux, c'est tout ce qui compte.",
    translation: "As long as you do your best, that's all that matters.",
  },
  {
    phrase: "Je ne peux pas croire qu'il ait dit cela.",
    translation: "I can't believe he said that.",
  },
  {
    phrase: "Elle a décidé d'étudier à l'étranger pour améliorer son français.",
    translation: "She decided to study abroad to improve her French.",
  },
  {
    phrase: "Je n'arrive pas à me décider entre ces deux options.",
    translation: "I can't decide between these two options.",
  },
  {
    phrase: "Bien qu'il pleuve, le mariage était magnifique.",
    translation: "Even though it rained, the wedding was beautiful.",
  },
  {
    phrase: "J'espère que tu pourras venir à la fête la semaine prochaine.",
    translation: "I hope you can come to the party next week.",
  },
  {
    phrase: "Je n'ai pas l'habitude de me lever tôt.",
    translation: "I'm not used to waking up early.",
  },
  {
    phrase: "Il semble que tout le monde aime cette chanson.",
    translation: "It seems that everyone likes this song.",
  },
  {
    phrase: "Chaque fois que je le vois, il porte le même t-shirt.",
    translation: "Every time I see him, he's wearing the same t-shirt.",
  },
  {
    phrase: "Je suis surpris qu'elle ne soit pas encore arrivée.",
    translation: "I'm surprised she hasn't arrived yet.",
  },
  {
    phrase: "Il est essentiel que tu étudies tous les jours.",
    translation: "It's essential that you study every day.",
  },
  {
    phrase: "Lorsque j'étais enfant, je voulais être astronaute.",
    translation: "When I was a child, I wanted to be an astronaut.",
  },
  {
    phrase:
      "Elle est toujours souriante quoiqu'elle vive des moments difficiles.",
    translation:
      "She's always smiling even though she's going through tough times.",
  },
  {
    phrase: "Je vais visiter Paris pour la troisième fois l'année prochaine.",
    translation: "I'm going to visit Paris for the third time next year.",
  },
  {
    phrase: "Il est important que tu nous dises la vérité.",
    translation: "It's important that you tell us the truth.",
  },
  {
    phrase: "Tout le monde sait qu'il est amoureux d'elle.",
    translation: "Everyone knows he's in love with her.",
  },
  {
    phrase: "Elle chante comme si personne ne l'écoutait.",
    translation: "She sings as if nobody was listening.",
  },
  {
    phrase:
      "D'habitude, je ne mange pas de dessert, mais aujourd'hui je vais faire une exception.",
    translation:
      "Usually, I don't eat dessert, but today I'll make an exception.",
  },
  {
    phrase: "Quoi que tu décides, je te soutiendrai.",
    translation: "Whatever you decide, I'll support you.",
  },
  {
    phrase: "Il m'a raconté une histoire incroyable de son enfance.",
    translation: "He told me an amazing story from his childhood.",
  },
  {
    phrase:
      "A chaque fois que je visite ma grand-mère, elle me prépare mon plat préféré.",
    translation:
      "Every time I visit my grandmother, she makes me my favorite dish.",
  },
  {
    phrase: "Je pense qu'il est temps que tu prennes tes responsabilités.",
    translation: "I think it's time you take responsibility.",
  },
  {
    phrase: "J'ai rencontré une personne qui parle cinq langues couramment.",
    translation: "I met someone who speaks five languages fluently.",
  },
  {
    phrase: "Je regrette de ne pas avoir étudié le français plus tôt.",
    translation: "I regret not studying French earlier.",
  },
  {
    phrase: "Il vaut mieux prévenir que guérir.",
    translation: "It's better to prevent than to cure.",
  },
  {
    phrase: "Chaque matin, il se lève à six heures pour faire du sport.",
    translation: "Every morning, he gets up at six to exercise.",
  },
  {
    phrase: "Si j'étais à ta place, je prendrais cette opportunité.",
    translation: "If I were in your shoes, I'd take this opportunity.",
  },
  {
    phrase: "Il est impératif que nous trouvions une solution avant demain.",
    translation: "It's imperative that we find a solution before tomorrow.",
  },
  {
    phrase: "En dépit des nombreux obstacles, ils ont réussi.",
    translation: "Despite the numerous obstacles, they succeeded.",
  },
  {
    phrase: "Les résultats, bien que préliminaires, sont très prometteurs.",
    translation: "The results, although preliminary, are very promising.",
  },
  {
    phrase: "Si j'avais su la vérité, j'aurais agi différemment.",
    translation: "Had I known the truth, I would have acted differently.",
  },
  {
    phrase: "Je crains qu'il ne soit trop tard pour s'excuser.",
    translation: "I fear it might be too late to apologize.",
  },
  {
    phrase: "Il n'est pas exclu que je vienne te rejoindre en Espagne cet été.",
    translation:
      "It's not out of the question that I might join you in Spain this summer.",
  },
  {
    phrase: "Nul ne sait ce que l'avenir nous réserve.",
    translation: "No one knows what the future holds for us.",
  },
  {
    phrase: "Je doute qu'il puisse terminer le projet à temps.",
    translation: "I doubt he can finish the project on time.",
  },
  {
    phrase: "Elle parle comme si elle savait tout sur le sujet.",
    translation: "She speaks as if she knows everything about the subject.",
  },
  {
    phrase: "Quoi qu'il arrive, je serai toujours à tes côtés.",
    translation: "Whatever happens, I'll always be by your side.",
  },
  {
    phrase: "Les opinions divergent quant à la meilleure approche à adopter.",
    translation: "Opinions vary on the best approach to take.",
  },
  {
    phrase: "La beauté est dans l'œil de celui qui regarde.",
    translation: "Beauty is in the eye of the beholder.",
  },
  {
    phrase: "Le plus difficile n'est pas de commencer, mais de persévérer.",
    translation: "The hardest part isn't starting but persevering.",
  },
  {
    phrase: "À force de persévérance, il a finalement réussi.",
    translation: "Through perseverance, he finally succeeded.",
  },
  {
    phrase: "Ce n'est qu'en perdant tout qu'on est libre de tout entreprendre.",
    translation:
      "It's only after we've lost everything that we're free to do anything.",
  },
  {
    phrase: "Chaque échec est une marche vers le succès.",
    translation: "Every failure is a step towards success.",
  },
  {
    phrase: "On ne peut pas juger un livre à sa couverture.",
    translation: "You can't judge a book by its cover.",
  },
  {
    phrase: "Il faut battre le fer pendant qu'il est chaud.",
    translation: "Strike while the iron is hot.",
  },
  {
    phrase: "Le cœur a ses raisons que la raison ne connaît point.",
    translation: "The heart has its reasons which reason knows not.",
  },
  {
    phrase: "La fin justifie les moyens.",
    translation: "The ends justify the means.",
  },
  {
    phrase: "Ce qui ne nous tue pas nous rend plus fort.",
    translation: "What doesn't kill us makes us stronger.",
  },
  {
    phrase: "Le monde appartient à ceux qui se lèvent tôt.",
    translation: "The world belongs to those who get up early.",
  },
  {
    phrase: "Mieux vaut tard que jamais.",
    translation: "Better late than never.",
  },
  {
    phrase: "On ne peut pas avoir le beurre et l'argent du beurre.",
    translation: "You can't have your cake and eat it too.",
  },
  {
    phrase:
      "Il faut tourner sept fois sa langue dans sa bouche avant de parler.",
    translation: "Think before you speak.",
  },
  {
    phrase: "L'habit ne fait pas le moine.",
    translation: "Clothes don't make the man.",
  },
  {
    phrase: "L'exception confirme la règle.",
    translation: "The exception proves the rule.",
  },
  {
    phrase: "Il n'y a pas de fumée sans feu.",
    translation: "Where there's smoke, there's fire.",
  },
  {
    phrase: "On ne fait pas d'omelette sans casser des œufs.",
    translation: "You can't make an omelette without breaking eggs.",
  },
  {
    phrase: "Tout est bien qui finit bien.",
    translation: "All's well that ends well.",
  },
  {
    phrase: "Qui veut la fin veut les moyens.",
    translation: "He who wills the end wills the means.",
  },
  {
    phrase: "Rome ne s'est pas faite en un jour.",
    translation: "Rome wasn't built in a day.",
  },
  {
    phrase: "Qui se ressemble s'assemble.",
    translation: "Birds of a feather flock together.",
  },
  {
    phrase: "Chassez le naturel, il revient au galop.",
    translation: "What's bred in the bone will come out in the flesh.",
  },
  {
    phrase:
      "Il est difficile d'enseigner de vieux singes à faire de nouvelles acrobaties.",
    translation: "It's hard to teach an old dog new tricks.",
  },
  {
    phrase: "Les grands esprits se rencontrent.",
    translation: "Great minds think alike.",
  },
  {
    phrase: "La nuit, tous les chats sont gris.",
    translation: "In the dark, all cats are grey.",
  },
  {
    phrase: "Loin des yeux, loin du cœur.",
    translation: "Out of sight, out of mind.",
  },
  {
    phrase: "Il vaut mieux prévenir que guérir.",
    translation: "An ounce of prevention is worth a pound of cure.",
  },
  {
    phrase: "Qui vivra verra.",
    translation: "Time will tell.",
  },
  {
    phrase: "La vérité éclate toujours au grand jour.",
    translation: "The truth always comes out.",
  },
  {
    phrase: "Le temps est le meilleur juge.",
    translation: "Time is the best judge.",
  },
  {
    phrase: "La fortune sourit aux audacieux.",
    translation: "Fortune favours the bold.",
  },
  {
    phrase: "L'appétit vient en mangeant.",
    translation: "The more you have, the more you want.",
  },
  {
    phrase: "C'est en forgeant qu'on devient forgeron.",
    translation: "Practice makes perfect.",
  },
  {
    phrase: "Il faut prendre la vie du bon côté.",
    translation: "You have to look on the bright side of life.",
  },
  {
    phrase: "Tous les chemins mènent à Rome.",
    translation: "All roads lead to Rome.",
  },
  {
    phrase: "On ne peut pas plaire à tout le monde.",
    translation: "You can't please everyone.",
  },
  {
    phrase: "La meilleure défense, c'est l'attaque.",
    translation: "The best defense is a good offense.",
  },
  {
    phrase: "Les actes parlent plus fort que les mots.",
    translation: "Actions speak louder than words.",
  },
  {
    phrase:
      "Bien que je sois fatigué, je vais terminer ce travail avant de me coucher.",
    translation:
      "Even though I am tired, I will finish this work before going to bed.",
  },
  {
    phrase:
      "Même si elle n'aime pas le chocolat, elle a acheté la boîte pour sa mère.",
    translation:
      "Even if she doesn't like chocolate, she bought the box for her mother.",
  },
  {
    phrase:
      "Avant que le soleil ne se couche, nous devrions atteindre le sommet.",
    translation: "Before the sun sets, we should reach the peak.",
  },
  {
    phrase: "Pourvu que le temps reste clair, nous irons à la plage demain.",
    translation:
      "As long as the weather stays clear, we'll go to the beach tomorrow.",
  },
  {
    phrase: "Bien qu'il soit riche, il mène une vie simple et sans prétention.",
    translation:
      "Even though he is rich, he leads a simple and unpretentious life.",
  },
  {
    phrase: "À moins que tu ne m'appelles, je partirai à 8 heures.",
    translation: "Unless you call me, I will leave at 8 o'clock.",
  },
  {
    phrase:
      "Même si c'est difficile, j'essaierai de comprendre son point de vue.",
    translation: "Even if it's hard, I'll try to understand his point of view.",
  },
  {
    phrase:
      "Bien que nous ayons étudié toute la nuit, l'examen était toujours difficile.",
    translation:
      "Even though we studied all night, the exam was still challenging.",
  },
  {
    phrase:
      "À condition que tu fasses tes devoirs, tu pourras regarder la télévision.",
    translation:
      "Provided that you do your homework, you can watch television.",
  },
  {
    phrase:
      "Bien que la ville soit bruyante, on y trouve une certaine énergie.",
    translation:
      "Even though the city is noisy, there's a certain energy to it.",
  },
  {
    phrase: "Si j'avais son adresse, je lui enverrais une invitation.",
    translation: "If I had his address, I would send him an invitation.",
  },
  {
    phrase: "Je crains qu'elle ne soit déjà partie à l'aéroport.",
    translation: "I'm afraid she might have already left for the airport.",
  },
  {
    phrase: "Dès que j'aurai fini ce livre, je te le prêterai.",
    translation: "As soon as I finish this book, I'll lend it to you.",
  },
  {
    phrase: "Elle ira à Paris, où elle espère trouver un emploi.",
    translation: "She will go to Paris, where she hopes to find a job.",
  },
  {
    phrase: "Il a travaillé dur, espérant obtenir une promotion.",
    translation: "He worked hard, hoping to get a promotion.",
  },
  {
    phrase: "Chaque fois qu'elle entend cette chanson, elle pense à lui.",
    translation: "Every time she hears that song, she thinks of him.",
  },
  {
    phrase: "L'année prochaine, nous envisageons de déménager en Espagne.",
    translation: "Next year, we're considering moving to Spain.",
  },
  {
    phrase: "Après avoir mangé, nous sommes allés nous promener.",
    translation: "After eating, we went for a walk.",
  },
  {
    phrase:
      "Le professeur, sachant que je ne me sentais pas bien, m'a laissé partir tôt.",
    translation:
      "The teacher, knowing I wasn't feeling well, let me leave early.",
  },
  {
    phrase: "Il faut que tu lui parles avant qu'il ne prenne une décision.",
    translation: "You need to talk to him before he makes a decision.",
  },
  {
    phrase: "Quand j'étais enfant, j'aimais grimper aux arbres.",
    translation: "When I was a child, I liked to climb trees.",
  },
  {
    phrase: "Elle a rangé sa chambre avant que ses amis n'arrivent.",
    translation: "She tidied her room before her friends arrived.",
  },
  {
    phrase: "Si tu vois Marie, dis-lui que je cherche mes lunettes.",
    translation: "If you see Marie, tell her I'm looking for my glasses.",
  },
  {
    phrase:
      "Je pense que tu devrais lui dire la vérité, malgré les conséquences.",
    translation:
      "I think you should tell him the truth, despite the consequences.",
  },
  {
    phrase: "Après que le concert fut fini, ils sont allés dîner.",
    translation: "After the concert was over, they went to dine.",
  },
  {
    phrase: "Chaque matin, il court 5 km pour rester en forme.",
    translation: "Every morning, he runs 5 km to stay fit.",
  },
  {
    phrase: "Le chat, voyant l'oiseau, a sauté par la fenêtre.",
    translation: "The cat, seeing the bird, jumped out the window.",
  },
  {
    phrase: "Avant de critiquer, il faudrait que tu comprennes la situation.",
    translation: "Before criticizing, you should understand the situation.",
  },
  {
    phrase: "La lettre, bien qu'écrite à la hâte, était très touchante.",
    translation: "The letter, though written in haste, was very touching.",
  },
  {
    phrase: "Il est parti tôt pour éviter les embouteillages.",
    translation: "He left early to avoid traffic jams.",
  },
  {
    phrase: "Dès qu'il pleut, le parc devient silencieux.",
    translation: "As soon as it rains, the park becomes silent.",
  },
  {
    phrase: "Elle a pris un café, puis a commencé à travailler.",
    translation: "She had a coffee and then started working.",
  },
  {
    phrase: "Tout le monde était là, sauf Paul qui était malade.",
    translation: "Everyone was there, except Paul who was sick.",
  },
  {
    phrase: "Il a étudié pendant des heures, espérant réussir l'examen.",
    translation: "He studied for hours, hoping to pass the exam.",
  },
  {
    phrase: "Quand elle a vu le cadeau, ses yeux se sont illuminés.",
    translation: "When she saw the gift, her eyes lit up.",
  },
  {
    phrase: "Après avoir lu les instructions, tout est devenu clair.",
    translation: "After reading the instructions, everything became clear.",
  },
  {
    phrase: "Elle a mis son manteau et est sortie dans le froid.",
    translation: "She put on her coat and went out into the cold.",
  },
  {
    phrase: "Chaque soir, ils regardent un film ensemble.",
    translation: "Every evening, they watch a movie together.",
  },
  {
    phrase: "La voiture, bien qu'ancienne, roule parfaitement.",
    translation: "The car, although old, runs perfectly.",
  },
  {
    phrase: "Il attend son ami à la gare depuis une heure.",
    translation: "He's been waiting for his friend at the station for an hour.",
  },
  {
    phrase: "Après le travail, elle aime se détendre avec un bon livre.",
    translation: "After work, she likes to relax with a good book.",
  },
  {
    phrase: "L'enfant, intrigué par l'insecte, l'observait attentivement.",
    translation: "The child, intrigued by the insect, observed it closely.",
  },
  {
    phrase: "Elle a offert des fleurs à sa mère pour son anniversaire.",
    translation: "She gave her mother flowers for her birthday.",
  },
  {
    phrase: "Lors de la réunion, il a posé des questions pertinentes.",
    translation: "During the meeting, he asked relevant questions.",
  },
  {
    phrase: "Les vacances d'été sont les moments les plus attendus de l'année.",
    translation:
      "The summer holidays are the most anticipated times of the year.",
  },
  {
    phrase: "Mon frère travaille à Londres, mais il vit à Brighton.",
    translation: "My brother works in London, but he lives in Brighton.",
  },
  {
    phrase: "En hiver, il adore skier dans les montagnes.",
    translation: "In winter, he loves skiing in the mountains.",
  },
  {
    phrase: "La vieille dame traverse toujours la rue avec son chien.",
    translation: "The old lady always crosses the street with her dog.",
  },
  {
    phrase: "Lorsque le soleil se couche, la ville s'illumine.",
    translation: "When the sun sets, the city lights up.",
  },
  {
    phrase: "Pendant les weekends, elle enseigne la poterie aux enfants.",
    translation: "On weekends, she teaches pottery to kids.",
  },
  {
    phrase:
      "Mon père, étant un bon cuisinier, prépare souvent des repas délicieux.",
    translation:
      "My father, being a good cook, often prepares delicious meals.",
  },
  {
    phrase: "Il faut que je renouvelle mon passeport avant mon voyage.",
    translation: "I need to renew my passport before my trip.",
  },
  {
    phrase: "La plage était déserte, excepté un couple marchant au loin.",
    translation:
      "The beach was deserted, except for a couple walking in the distance.",
  },
  {
    phrase: "Le magasin offre des réductions aux étudiants tous les mardis.",
    translation: "The store offers discounts to students every Tuesday.",
  },
  {
    phrase: "Le musée, fermé pour rénovation, rouvrira en décembre.",
    translation: "The museum, closed for renovation, will reopen in December.",
  },
  {
    phrase:
      "La ville est connue pour son architecture historique et ses parcs.",
    translation: "The city is known for its historic architecture and parks.",
  },
  {
    phrase:
      "En automne, les feuilles des arbres prennent des couleurs magnifiques.",
    translation:
      "In the fall, the leaves of the trees take on magnificent colors.",
  },
  {
    phrase:
      "Il travaille comme journaliste, couvrant des événements internationaux.",
    translation: "He works as a journalist, covering international events.",
  },
  {
    phrase: "Pendant la guerre, il a servi comme médecin dans l'armée.",
    translation: "During the war, he served as a doctor in the army.",
  },
  {
    phrase:
      "La bibliothèque municipale organise souvent des ateliers pour les enfants.",
    translation:
      "The municipal library often organizes workshops for children.",
  },
  {
    phrase: "Tous les matins, il prend le train pour se rendre au bureau.",
    translation: "Every morning, he takes the train to go to the office.",
  },
  {
    phrase: "Le parc est populaire auprès des familles pendant les weekends.",
    translation: "The park is popular with families on weekends.",
  },
  {
    phrase:
      "Mon ami est allergique aux arachides, donc il faut faire attention.",
    translation: "My friend is allergic to peanuts, so we have to be careful.",
  },
  {
    phrase: "La pièce de théâtre, bien reçue, sera prolongée d'une semaine.",
    translation: "The play, well-received, will be extended by a week.",
  },
  {
    phrase: "En été, la ville organise des concerts en plein air.",
    translation: "In the summer, the city organizes outdoor concerts.",
  },
  {
    phrase:
      "Chaque année, ils voyagent dans un nouveau pays pour leurs vacances.",
    translation: "Every year, they travel to a new country for their vacation.",
  },
  {
    phrase:
      "Lorsque j'étais étudiant, j'ai étudié en France pendant un semestre.",
    translation: "When I was a student, I studied in France for a semester.",
  },
  {
    phrase: "La boulangerie, ouverte tôt, attire de nombreux clients le matin.",
    translation:
      "The bakery, opening early, attracts many customers in the morning.",
  },
  {
    phrase: "Le zoo a récemment accueilli deux nouveaux lionceaux.",
    translation: "The zoo recently welcomed two new lion cubs.",
  },
  {
    phrase: "Il faut que je répare ma montre; elle retarde de dix minutes.",
    translation: "I need to fix my watch; it's ten minutes slow.",
  },
  {
    phrase:
      "Le film, basé sur une histoire vraie, a ému de nombreux spectateurs.",
    translation: "The film, based on a true story, moved many viewers.",
  },
  {
    phrase:
      "Le marché local offre une variété de produits frais chaque samedi.",
    translation:
      "The local market offers a variety of fresh produce every Saturday.",
  },
  {
    phrase:
      "Mon oncle, étant un passionné d'histoire, visite souvent des musées.",
    translation:
      "My uncle, being passionate about history, often visits museums.",
  },
  {
    phrase: "Pendant les vacances, nous avons campé près d'un lac tranquille.",
    translation: "During the holidays, we camped near a serene lake.",
  },
  {
    phrase:
      "La conférence, bien organisée, a attiré de nombreux professionnels.",
    translation:
      "The conference, well organized, attracted many professionals.",
  },
  {
    phrase: "La ville, entourée de montagnes, est un havre de paix.",
    translation: "The city, surrounded by mountains, is a haven of peace.",
  },
  {
    phrase: "Ma sœur, fascinée par l'astronomie, observe souvent les étoiles.",
    translation:
      "My sister, fascinated by astronomy, often observes the stars.",
  },
  {
    phrase:
      "L'orchestre, sous la direction du célèbre chef, a donné une performance exceptionnelle.",
    translation:
      "The orchestra, under the direction of the famous conductor, gave an outstanding performance.",
  },
  {
    phrase: "Il faut que je me dépêche; mon train part dans vingt minutes.",
    translation: "I need to hurry; my train leaves in twenty minutes.",
  },
  {
    phrase:
      "L'hôtel, bien qu'un peu cher, offre une vue magnifique sur la mer.",
    translation:
      "The hotel, although a bit expensive, offers a magnificent view of the sea.",
  },
].map((item) => ({
  id: uuidv4(),
  ...item,
}));

fs.writeFile("phrases.json", JSON.stringify(PHRASES, null, 2), (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("File was written successfully!");
  }
});
