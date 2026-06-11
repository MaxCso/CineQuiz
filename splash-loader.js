// ═══════════════════════════════════════════════════════════════
// CinéQuiz — SPLASH LOADER (chargement à la demande)
//
// Remplace splash-effects.js (2,2 Mo) par ce loader (~30 Ko)
// + 200 chunks individuels dans splash/ (≈11 Ko chacun).
// Un seul chunk est chargé par session : celui du film affiché.
// La Cinémathèque (preview) charge chaque effet au clic.
//
// INSTALLATION :
//   1. Copier ce fichier + le dossier splash/ à la racine du site
//   2. Dans index.html, remplacer :
//        <script src="splash-effects.js"></script>
//      par :
//        <script src="splash-loader.js"></script>
//   3. splash-effects.js peut être supprimé du déploiement
// ═══════════════════════════════════════════════════════════════
(function(){
 var SPLASH_MANIFEST=[{"n":"Matrix","c":"0,200,50","r":"The Matrix — Wachowski, 1999","f":"matrix.js"},{"n":"2001","c":"80,120,255","r":"2001: A Space Odyssey — Kubrick, 1968","f":"2001.js"},{"n":"Blade Runner","c":"255,120,30","r":"Blade Runner — Ridley Scott, 1982","f":"blade-runner.js"},{"n":"Star Wars","c":"255,200,50","r":"Star Wars — George Lucas, 1977","f":"star-wars.js"},{"n":"Interstellar","c":"180,140,80","r":"Interstellar — Christopher Nolan, 2014","f":"interstellar.js"},{"n":"Tron","c":"0,200,255","r":"Tron — Steven Lisberger, 1982","f":"tron.js"},{"n":"Psycho","c":"60,60,60","r":"Psycho — Alfred Hitchcock, 1960","f":"psycho.js"},{"n":"Vertigo","c":"180,40,180","r":"Vertigo — Alfred Hitchcock, 1958","f":"vertigo.js"},{"n":"Apocalypse Now","c":"255,120,20","r":"Apocalypse Now — Coppola, 1979","f":"apocalypse-now.js"},{"n":"Le Grand Bleu","c":"20,100,220","r":"Le Grand Bleu — Luc Besson, 1988","f":"le-grand-bleu.js"},{"n":"Metropolis","c":"200,160,50","r":"Metropolis — Fritz Lang, 1927","f":"metropolis.js"},{"n":"Alien","c":"0,180,40","r":"Alien — Ridley Scott, 1979","f":"alien.js"},{"n":"Amélie","c":"220,60,30","r":"Le Fabuleux Destin d’Amélie Poulain — Jeunet, 2001","f":"amelie.js"},{"n":"American Beauty","c":"200,20,20","r":"American Beauty — Sam Mendes, 1999","f":"american-beauty.js"},{"n":"Tree of Life","c":"255,180,60","r":"The Tree of Life — Terrence Malick, 2011","f":"tree-of-life.js"},{"n":"Her","c":"255,120,60","r":"Her — Spike Jonze, 2013","f":"her.js"},{"n":"Drive","c":"200,20,60","r":"Drive — Nicolas Winding Refn, 2011","f":"drive.js"},{"n":"Taxi Driver","c":"80,20,120","r":"Taxi Driver — Martin Scorsese, 1976","f":"taxi-driver.js"},{"n":"Magnolia","c":"80,20,140","r":"Magnolia — Paul Thomas Anderson, 1999","f":"magnolia.js"},{"n":"Spider-Man","c":"200,20,20","r":"Spider-Man — Sam Raimi, 2002","f":"spider-man.js"},{"n":"Batman","c":"240,200,30","r":"Batman — Tim Burton, 1989","f":"batman.js"},{"n":"James Bond","c":"150,10,10","r":"James Bond — Eon Productions, 1962–","f":"james-bond.js"},{"n":"Mission Impossible","c":"200,30,30","r":"Mission: Impossible — Brian De Palma, 1996","f":"mission-impossible.js"},{"n":"Avatar","c":"0,200,180","r":"Avatar — James Cameron, 2009","f":"avatar.js"},{"n":"Le Parrain","c":"120,90,30","r":"Le Parrain — Francis Ford Coppola, 1972","f":"le-parrain.js"},{"n":"Le Seigneur des Anneaux","c":"180,140,60","r":"Le Seigneur des Anneaux — Peter Jackson, 2001","f":"le-seigneur-des-anneaux.js"},{"n":"Les Évadés","c":"60,100,160","r":"Les Évadés — Frank Darabont, 1994","f":"les-evades.js"},{"n":"Pulp Fiction","c":"200,160,30","r":"Pulp Fiction — Quentin Tarantino, 1994","f":"pulp-fiction.js"},{"n":"Forrest Gump","c":"100,180,230","r":"Forrest Gump — Robert Zemeckis, 1994","f":"forrest-gump.js"},{"n":"Fight Club","c":"180,40,20","r":"Fight Club — David Fincher, 1999","f":"fight-club.js"},{"n":"Inception","c":"60,100,200","r":"Inception — Christopher Nolan, 2010","f":"inception.js"},{"n":"Les Affranchis","c":"200,60,20","r":"Les Affranchis — Martin Scorsese, 1990","f":"les-affranchis.js"},{"n":"Terminator","c":"200,60,10","r":"Terminator — James Cameron, 1984","f":"terminator.js"},{"n":"Gladiator","c":"200,160,60","r":"Gladiator — Ridley Scott, 2000","f":"gladiator.js"},{"n":"WALL·E","c":"20,80,200","r":"WALL·E — Andrew Stanton, 2008","f":"wall-e.js"},{"n":"Heat","c":"30,80,180","r":"Heat — Michael Mann, 1995","f":"heat.js"},{"n":"Jurassic Park","c":"40,160,40","r":"Jurassic Park — Steven Spielberg, 1993","f":"jurassic-park.js"},{"n":"Nemo","c":"20,120,220","r":"Le Monde de Nemo — Andrew Stanton, 2003","f":"nemo.js"},{"n":"Les Dents de la Mer","c":"20,80,180","r":"Les Dents de la Mer — Steven Spielberg, 1975","f":"les-dents-de-la-mer.js"},{"n":"Stand by Me","c":"180,140,80","r":"Stand by Me — Rob Reiner, 1986","f":"stand-by-me.js"},{"n":"Avengers","c":"200,30,30","r":"Avengers: Endgame — Russo Brothers, 2019","f":"avengers.js"},{"n":"Harry Potter","c":"120,60,200","r":"Harry Potter — Chris Columbus, 2001","f":"harry-potter.js"},{"n":"Indiana Jones","c":"180,120,40","r":"Indiana Jones — Steven Spielberg, 1981","f":"indiana-jones.js"},{"n":"Retour vers le Futur","c":"255,140,20","r":"Retour vers le Futur — Robert Zemeckis, 1985","f":"retour-vers-le-futur.js"},{"n":"Rocky","c":"200,60,20","r":"Rocky — John G. Avildsen, 1976","f":"rocky.js"},{"n":"The Big Lebowski","c":"180,140,60","r":"The Big Lebowski — Coen Brothers, 1998","f":"the-big-lebowski.js"},{"n":"The Shining","c":"180,10,10","r":"The Shining — Stanley Kubrick, 1980","f":"the-shining.js"},{"n":"Get Out","c":"80,40,20","r":"Get Out — Jordan Peele, 2017","f":"get-out.js"},{"n":"No Country for Old Men","c":"180,140,60","r":"No Country for Old Men — Coen Brothers, 2007","f":"no-country-for-old-men.js"},{"n":"Memento","c":"100,80,60","r":"Memento — Christopher Nolan, 2000","f":"memento.js"},{"n":"Mad Max: Fury Road","c":"255,100,10","r":"Mad Max: Fury Road — George Miller, 2015","f":"mad-max-fury-road.js"},{"n":"Parasite","c":"20,80,20","r":"Parasite — Bong Joon-ho, 2019","f":"parasite.js"},{"n":"La La Land","c":"200,100,200","r":"La La Land — Damien Chazelle, 2016","f":"la-la-land.js"},{"n":"Schindler's List","c":"200,30,30","r":"Schindler's List — Steven Spielberg, 1993","f":"schindler-s-list.js"},{"n":"Titanic","c":"20,80,180","r":"Titanic — James Cameron, 1997","f":"titanic.js"},{"n":"Coco","c":"255,100,20","r":"Coco — Lee Unkrich, 2017","f":"coco.js"},{"n":"Le Roi Lion","c":"255,140,20","r":"Le Roi Lion — Roger Allers, 1994","f":"le-roi-lion.js"},{"n":"Spirited Away","c":"20,100,200","r":"Spirited Away — Hayao Miyazaki, 2001","f":"spirited-away.js"},{"n":"Ex Machina","c":"20,180,200","r":"Ex Machina — Alex Garland, 2015","f":"ex-machina.js"},{"n":"Old Boy","c":"80,20,80","r":"Old Boy — Park Chan-wook, 2003","f":"old-boy.js"},{"n":"Il était une fois en Amérique","c":"120,80,20","r":"Il était une fois en Amérique — Sergio Leone, 1984","f":"il-etait-une-fois-en-amerique.js"},{"n":"Top Gun","c":"60,140,200","r":"Top Gun — Tony Scott, 1986","f":"top-gun.js"},{"n":"The Place Beyond the Pines","c":"80,140,180","r":"The Place Beyond the Pines — Derek Cianfrance, 2012","f":"the-place-beyond-the-pines.js"},{"n":"Dans la peau de John Malkovich","c":"80,40,120","r":"Dans la peau de John Malkovich — Spike Jonze, 1999","f":"dans-la-peau-de-john-malkovich.js"},{"n":"Gran Torino","c":"120,100,60","r":"Gran Torino — Clint Eastwood, 2008","f":"gran-torino.js"},{"n":"Dune","c":"200,160,60","r":"Dune — Denis Villeneuve, 2021","f":"dune.js"},{"n":"Ghostbusters","c":"20,200,40","r":"Ghostbusters — Ivan Reitman, 1984","f":"ghostbusters.js"},{"n":"Shrek","c":"60,160,40","r":"Shrek — Andrew Adamson & Vicky Jenson, 2001","f":"shrek.js"},{"n":"Transformers","c":"80,140,200","r":"Transformers — Michael Bay, 2007","f":"transformers.js"},{"n":"Pirates des Caraïbes","c":"40,100,160","r":"Pirates des Caraïbes — Gore Verbinski, 2003","f":"pirates-des-caraibes.js"},{"n":"Men in Black","c":"40,40,180","r":"Men in Black — Barry Sonnenfeld, 1997","f":"men-in-black.js"},{"n":"E.T.","c":"80,40,120","r":"E.T. l’extra-terrestre — Steven Spielberg, 1982","f":"e-t.js"},{"n":"Seven","c":"60,90,70","r":"Seven — David Fincher, 1995","f":"seven.js"},{"n":"Les Goonies","c":"40,120,200","r":"Les Goonies — Richard Donner, 1985","f":"les-goonies.js"},{"n":"Eternal Sunshine","c":"80,140,200","r":"Eternal Sunshine of the Spotless Mind — Michel Gondry, 2004","f":"eternal-sunshine.js"},{"n":"Truman Show","c":"80,160,220","r":"The Truman Show — Peter Weir, 1998","f":"truman-show.js"},{"n":"Into the Wild","c":"60,160,60","r":"Into the Wild — Sean Penn, 2007","f":"into-the-wild.js"},{"n":"Kill Bill","c":"240,200,10","r":"Kill Bill — Quentin Tarantino, 2003","f":"kill-bill.js"},{"n":"Django","c":"200,40,20","r":"Django Unchained — Quentin Tarantino, 2012","f":"django.js"},{"n":"La Ligne Verte","c":"40,160,80","r":"La Ligne Verte — Frank Darabont, 1999","f":"la-ligne-verte.js"},{"n":"Requiem for a Dream","c":"120,20,120","r":"Requiem for a Dream — Darren Aronofsky, 2000","f":"requiem-for-a-dream.js"},{"n":"Le Bon, la Brute et le Truand","c":"200,140,40","r":"Le Bon, la Brute et le Truand — Sergio Leone, 1966","f":"le-bon-la-brute-et-le-truand.js"},{"n":"Les Gremlins","c":"40,160,40","r":"Gremlins — Joe Dante, 1984","f":"les-gremlins.js"},{"n":"Alice au Pays des Merveilles","c":"180,60,180","r":"Alice au Pays des Merveilles — Tim Burton, 2010","f":"alice-au-pays-des-merveilles.js"},{"n":"Risky Business","c":"80,40,120","r":"Risky Business — Paul Brickman, 1983","f":"risky-business.js"},{"n":"Le Loup de Wall Street","c":"240,160,20","r":"Le Loup de Wall Street — Martin Scorsese, 2013","f":"le-loup-de-wall-street.js"},{"n":"Usual Suspects","c":"80,60,40","r":"Usual Suspects — Bryan Singer, 1995","f":"usual-suspects.js"},{"n":"Scream","c":"200,10,10","r":"Scream — Wes Craven, 1996","f":"scream.js"},{"n":"Raging Bull","c":"80,20,20","r":"Raging Bull — Martin Scorsese, 1980","f":"raging-bull.js"},{"n":"Die Hard","c":"220,60,20","r":"Die Hard — John McTiernan, 1988","f":"die-hard.js"},{"n":"Scarface","c":"20,160,220","r":"Scarface — Brian De Palma, 1983","f":"scarface.js"},{"n":"Rencontre du Troisième Type","c":"200,180,60","r":"Rencontres du Troisième Type — Steven Spielberg, 1977","f":"rencontre-du-troisieme-type.js"},{"n":"Voyage au bout de l'enfer","c":"220,80,20","r":"Voyage au bout de l’enfer — Michael Cimino, 1978","f":"voyage-au-bout-de-l-enfer.js"},{"n":"Toy Story","c":"100,160,230","r":"Toy Story — John Lasseter, 1995","f":"toy-story.js"},{"n":"Monstres & Cie","c":"60,80,200","r":"Monstres & Cie — Pete Docter, 2001","f":"monstres-cie.js"},{"n":"Ratatouille","c":"200,60,30","r":"Ratatouille — Brad Bird, 2007","f":"ratatouille.js"},{"n":"Là-Haut","c":"200,120,40","r":"Là-Haut — Pete Docter, 2009","f":"la-haut.js"},{"n":"The Revenant","c":"120,160,200","r":"The Revenant — Alejandro G. Iñárritu, 2015","f":"the-revenant.js"},{"n":"Uncut Gems","c":"60,200,180","r":"Uncut Gems — Benny & Josh Safdie, 2019","f":"uncut-gems.js"},{"n":"Donnie Darko","c":"40,60,160","r":"Donnie Darko — Richard Kelly, 2001","f":"donnie-darko.js"},{"n":"Vol au-dessus d’un nid de coucou","c":"80,120,80","r":"Vol au-dessus d’un nid de coucou — Milos Forman, 1975","f":"vol-au-dessus-d-un-nid-de-coucou.js"},{"n":"Il faut sauver le soldat Ryan","c":"80,100,60","r":"Il faut sauver le soldat Ryan — Steven Spielberg, 1998","f":"il-faut-sauver-le-soldat-ryan.js"},{"n":"Le Tombeau des lucioles","c":"255,160,20","r":"Le Tombeau des lucioles — Isao Takahata, 1988","f":"le-tombeau-des-lucioles.js"},{"n":"Whiplash","c":"180,40,20","r":"Whiplash — Damien Chazelle, 2014","f":"whiplash.js"},{"n":"Léon","c":"40,120,60","r":"Léon — Luc Besson, 1994","f":"leon.js"},{"n":"La Haine","c":"60,60,60","r":"La Haine — Mathieu Kassovitz, 1995","f":"la-haine.js"},{"n":"Platoon","c":"255,100,20","r":"Platoon — Oliver Stone, 1986","f":"platoon.js"},{"n":"Le Géant de fer","c":"40,120,200","r":"Le Géant de fer — Brad Bird, 1999","f":"le-geant-de-fer.js"},{"n":"Intouchables","c":"40,180,200","r":"Intouchables — Nakache & Toledano, 2011","f":"intouchables.js"},{"n":"Mystic River","c":"40,80,120","r":"Mystic River — Clint Eastwood, 2003","f":"mystic-river.js"},{"n":"There Will Be Blood","c":"200,70,10","r":"There Will Be Blood — Paul Thomas Anderson, 2007","f":"there-will-be-blood.js"},{"n":"Le Cinquième Élément","c":"200,80,200","r":"Le Cinquième Élément — Luc Besson, 1997","f":"le-cinquieme-element.js"},{"n":"Jarhead","c":"220,80,20","r":"Jarhead — Sam Mendes, 2005","f":"jarhead.js"},{"n":"The Player","c":"60,120,180","r":"The Player — Robert Altman, 1992","f":"the-player.js"},{"n":"Thelma et Louise","c":"220,140,40","r":"Thelma et Louise — Ridley Scott, 1991","f":"thelma-et-louise.js"},{"n":"Skyfall","c":"40,80,160","r":"Skyfall — Sam Mendes, 2012","f":"skyfall.js"},{"n":"Casino Royale","c":"40,80,160","r":"Casino Royale — Martin Campbell, 2006","f":"casino-royale.js"},{"n":"Nope","c":"60,40,120","r":"Nope — Jordan Peele, 2022","f":"nope.js"},{"n":"The Social Network","c":"40,80,160","r":"The Social Network — David Fincher, 2010","f":"the-social-network.js"},{"n":"Sound of Metal","c":"80,60,40","r":"Sound of Metal — Darius Marder, 2019","f":"sound-of-metal.js"},{"n":"Eyes Wide Shut","c":"180,140,60","r":"Eyes Wide Shut — Stanley Kubrick, 1999","f":"eyes-wide-shut.js"},{"n":"Vanilla Sky","c":"80,120,200","r":"Vanilla Sky — Cameron Crowe, 2001","f":"vanilla-sky.js"},{"n":"Juste la fin du Monde","c":"180,80,80","r":"Juste la fin du Monde — Xavier Dolan, 2016","f":"juste-la-fin-du-monde.js"},{"n":"Lord of War","c":"180,140,40","r":"Lord of War — Andrew Niccol, 2005","f":"lord-of-war.js"},{"n":"Narnia","c":"120,180,220","r":"Narnia — Andrew Adamson, 2005","f":"narnia.js"},{"n":"Joker","c":"180,60,20","r":"Joker — Todd Phillips, 2019","f":"joker.js"},{"n":"Dirty Dancing","c":"200,80,120","r":"Dirty Dancing — Emile Ardolino, 1987","f":"dirty-dancing.js"},{"n":"Oppenheimer","c":"255,120,20","r":"Oppenheimer — Christopher Nolan, 2023","f":"oppenheimer.js"},{"n":"L'Âge de Glace","c":"120,180,220","r":"L'Âge de Glace — Chris Wedge, 2002","f":"l-age-de-glace.js"},{"n":"Aftersun","c":"60,160,200","r":"Aftersun — Charlotte Wells, 2022","f":"aftersun.js"},{"n":"Training Day","c":"120,100,40","r":"Training Day — Antoine Fuqua, 2001","f":"training-day.js"},{"n":"Fast and Furious","c":"200,60,20","r":"The Fast and the Furious — Rob Cohen, 2001","f":"fast-and-furious.js"},{"n":"Rambo","c":"80,60,20","r":"First Blood — Ted Kotcheff, 1982","f":"rambo.js"},{"n":"Projet Hail Mary","c":"40,120,200","r":"Project Hail Mary — Andy Weir, 2021","f":"projet-hail-mary.js"},{"n":"Superman","c":"40,80,200","r":"Superman — Richard Donner, 1978","f":"superman.js"},{"n":"Charlie et la Chocolaterie","c":"180,80,160","r":"Charlie and the Chocolate Factory — Tim Burton, 2005","f":"charlie-et-la-chocolaterie.js"},{"n":"Reservoir Dogs","c":"180,20,20","r":"Reservoir Dogs — Quentin Tarantino, 1992","f":"reservoir-dogs.js"},{"n":"Full Metal Jacket","c":"60,100,60","r":"Full Metal Jacket — Stanley Kubrick, 1987","f":"full-metal-jacket.js"},{"n":"Snatch","c":"80,60,40","r":"Snatch — Guy Ritchie, 2000","f":"snatch.js"},{"n":"Rain Man","c":"100,140,180","r":"Rain Man — Barry Levinson, 1988","f":"rain-man.js"},{"n":"Will Hunting","c":"60,100,160","r":"Good Will Hunting — Gus Van Sant, 1997","f":"will-hunting.js"},{"n":"The Dark Knight","c":"40,100,200","r":"The Dark Knight — Christopher Nolan, 2008","f":"the-dark-knight.js"},{"n":"Grease","c":"200,100,180","r":"Grease — Randal Kleiser, 1978","f":"grease.js"},{"n":"Orange Mécanique","c":"180,40,40","r":"A Clockwork Orange — Stanley Kubrick, 1971","f":"orange-mecanique.js"},{"n":"Lost in Translation","c":"60,120,200","r":"Lost in Translation — Sofia Coppola, 2003","f":"lost-in-translation.js"},{"n":"Le Silence des agneaux","c":"40,80,40","r":"The Silence of the Lambs — Jonathan Demme, 1991","f":"le-silence-des-agneaux.js"},{"n":"Inglourious Basterds","c":"200,140,40","r":"Inglourious Basterds — Quentin Tarantino, 2009","f":"inglourious-basterds.js"},{"n":"Birdman","c":"60,100,160","r":"Birdman — Alejandro G. Iñárritu, 2014","f":"birdman.js"},{"n":"The Breakfast Club","c":"200,60,40","r":"The Breakfast Club — John Hughes, 1985","f":"the-breakfast-club.js"},{"n":"Le Prestige","c":"30,30,30","r":"The Prestige — Christopher Nolan, 2006","f":"le-prestige.js"},{"n":"Mulholland Drive","c":"160,40,120","r":"Mulholland Drive — David Lynch, 2001","f":"mulholland-drive.js"},{"n":"Moonlight","c":"40,80,180","r":"Moonlight — Barry Jenkins, 2016","f":"moonlight.js"},{"n":"Ghost in the Shell","c":"0,200,120","r":"Ghost in the Shell — Mamoru Oshii, 1995","f":"ghost-in-the-shell.js"},{"n":"Virgin Suicides","c":"200,160,120","r":"The Virgin Suicides — Sofia Coppola, 1999","f":"virgin-suicides.js"},{"n":"Edward aux mains d'argent","c":"120,160,200","r":"Edward Scissorhands — Tim Burton, 1990","f":"edward-aux-mains-d-argent.js"},{"n":"Blow","c":"40,160,80","r":"Blow — Ted Demme, 2001","f":"blow.js"},{"n":"Arrête moi si tu peux","c":null,"r":"Catch Me If You Can — Steven Spielberg, 2002","f":"arrete-moi-si-tu-peux.js"},{"n":"Les infiltrés","c":null,"r":"The Departed — Martin Scorsese, 2006","f":"les-infiltres.js"},{"n":"La plage","c":"40,200,220","r":"The Beach — Danny Boyle, 2000","f":"la-plage.js"},{"n":"Baby Driver","c":"200,40,40","r":"Baby Driver — Edgar Wright, 2017","f":"baby-driver.js"},{"n":"Garden State","c":"80,120,80","r":"Garden State — Zach Braff, 2004","f":"garden-state.js"},{"n":"Little Miss Sunshine","c":"220,160,40","r":"Little Miss Sunshine — Dayton & Faris, 2006","f":"little-miss-sunshine.js"},{"n":"Point Break","c":"40,120,200","r":"Point Break — Kathryn Bigelow, 1991","f":"point-break.js"},{"n":"Jumanji","c":"60,140,60","r":"Jumanji — Joe Johnston, 1995","f":"jumanji.js"},{"n":"La nuit au musée","c":"200,160,60","r":"Night at the Museum — Shawn Levy, 2006","f":"la-nuit-au-musee.js"},{"n":"Maman j'ai raté l'avion","c":"200,80,40","r":"Home Alone — Chris Columbus, 1990","f":"maman-j-ai-rate-l-avion.js"},{"n":"Le dernier samouraï","c":"60,80,40","r":"The Last Samurai — Edward Zwick, 2003","f":"le-dernier-samourai.js"},{"n":"Sixième Sens","c":"60,20,80","r":"The Sixth Sense — M. Night Shyamalan, 1999","f":"sixieme-sens.js"},{"n":"Incassable","c":"60,20,80","r":"Unbreakable — M. Night Shyamalan, 2000","f":"incassable.js"},{"n":"Prisoners","c":"60,80,40","r":"Prisoners — Denis Villeneuve, 2013","f":"prisoners.js"},{"n":"Boyz n the Hood","c":"200,60,20","r":"Boyz n the Hood — John Singleton, 1991","f":"boyz-n-the-hood.js"},{"n":"Ocean's Eleven","c":"40,120,180","r":"Ocean's Eleven — Steven Soderbergh, 2001","f":"ocean-s-eleven.js"},{"n":"La Mémoire dans la peau","c":"80,120,160","r":"The Bourne Identity — Doug Liman, 2002","f":"la-memoire-dans-la-peau.js"},{"n":"Un jour sans fin","c":"120,160,200","r":"Groundhog Day — Harold Ramis, 1993","f":"un-jour-sans-fin.js"},{"n":"The Mask","c":"40,180,40","r":"The Mask — Chuck Russell, 1994","f":"the-mask.js"},{"n":"Casino","c":"200,40,40","r":"Casino — Martin Scorsese, 1995","f":"casino.js"},{"n":"Fury","c":"60,80,40","r":"Fury — David Ayer, 2014","f":"fury.js"},{"n":"Collatéral","c":"40,80,160","r":"Collateral — Michael Mann, 2004","f":"collateral.js"},{"n":"Big","c":"40,120,200","r":"Big — Penny Marshall, 1988","f":"big.js"},{"n":"Hook","c":"60,120,200","r":"Hook — Steven Spielberg, 1991","f":"hook.js"},{"n":"L'effet papillon","c":"60,40,120","r":"The Butterfly Effect — Eric Bress, 2004","f":"l-effet-papillon.js"},{"n":"La Cité de Dieu","c":"200,120,40","r":"City of God — Fernando Meirelles, 2002","f":"la-cite-de-dieu.js"},{"n":"Bienvenue à Gattaca","c":"40,80,160","r":"Gattaca — Andrew Niccol, 1997","f":"bienvenue-a-gattaca.js"},{"n":"Le Lauréat","c":"80,120,60","r":"The Graduate — Mike Nichols, 1967","f":"le-laureat.js"},{"n":"Winter Break","c":"120,180,220","r":"The Holdovers — Alexander Payne, 2023","f":"winter-break.js"},{"n":"Sinners","c":"180,20,20","r":"Sinners — Ryan Coogler, 2025","f":"sinners.js"},{"n":"American Psycho","c":"60,60,60","r":"American Psycho — Mary Harron, 2000","f":"american-psycho.js"},{"n":"Marty Supreme","c":"40,120,200","r":"Marty Supreme — Jonah Hill, 2025","f":"marty-supreme.js"},{"n":"After Hours","c":"60,40,100","r":"After Hours — Martin Scorsese, 1985","f":"after-hours.js"},{"n":"Challengers","c":"200,100,40","r":"Challengers — Luca Guadagnino, 2024","f":"challengers.js"},{"n":"Call Me by Your Name","c":"220,140,60","r":"Call Me by Your Name — Luca Guadagnino, 2017","f":"call-me-by-your-name.js"},{"n":"N'oublie jamais","c":"80,120,180","r":"The Notebook — Nick Cassavetes, 2004","f":"n-oublie-jamais.js"},{"n":"Iron Man","c":"30,180,220","r":"Iron Man — Jon Favreau, 2008","f":"iron-man.js"},{"n":"Les Gardiens de la Galaxie","c":"60,20,140","r":"Guardians of the Galaxy — James Gunn, 2014","f":"les-gardiens-de-la-galaxie.js"},{"n":"Zodiac","c":"60,80,120","r":"Zodiac — David Fincher, 2007","f":"zodiac.js"},{"n":"Night Call","c":"60,40,120","r":"Nightcrawler — Dan Gilroy, 2014","f":"night-call.js"},{"n":"John Wick","c":"40,80,160","r":"John Wick — Chad Stahelski, 2014","f":"john-wick.js"},{"n":"Very Bad Trip","c":"200,140,40","r":"The Hangover — Todd Phillips, 2009","f":"very-bad-trip.js"},{"n":"28 jours plus tard","c":"40,160,40","r":"28 Days Later — Danny Boyle, 2002","f":"28-jours-plus-tard.js"},{"n":"À tombeau ouvert","c":"180,20,20","r":"Bringing Out the Dead — Martin Scorsese, 1999","f":"a-tombeau-ouvert.js"}];

 /* ── Chargement dynamique d'un chunk ── */
 var _loading = {};
 window._splashRegistry = window._splashRegistry || {};

 function loadSplashChunk(name){
   if (window._splashRegistry[name]) return Promise.resolve(window._splashRegistry[name]);
   if (_loading[name]) return _loading[name];
   var entry = SPLASH_MANIFEST.find(function(m){ return m.n === name; });
   if (!entry) return Promise.reject(new Error('Splash inconnu: ' + name));
   _loading[name] = new Promise(function(resolve, reject){
     var s = document.createElement('script');
     s.src = 'splash/' + entry.f;
     s.onload = function(){
       delete _loading[name];
       if (window._splashRegistry[name]) resolve(window._splashRegistry[name]);
       else reject(new Error('Chunk chargé mais effet absent: ' + name));
     };
     s.onerror = function(){ delete _loading[name]; reject(new Error('Échec chargement: ' + entry.f)); };
     document.head.appendChild(s);
   });
   return _loading[name];
 }
 window._loadSplashChunk = loadSplashChunk;

 /* ── window.EFFECTS : stubs lazy compatibles avec la Cinémathèque ── */
 var EFFECTS = SPLASH_MANIFEST.map(function(m){
   return {
     name: m.n,
     color: m.c,
     ref: m.r,
     run: function(cv, ctx, W, H, stop){
       loadSplashChunk(m.n).then(function(fx){
         if (stop && stop.v) return;
         fx.run(cv, ctx, W, H, stop);
       }).catch(function(e){ console.warn('[splash]', e.message); });
     }
   };
 });
 window.EFFECTS = EFFECTS;

 /* ── Présélection + préchargement immédiat ──
    Le chunk du film choisi se télécharge pendant que le reste
    de la page parse → zéro latence au lancement du splash. */
 var _preIdx;
 try{
   var _last = parseInt(sessionStorage.getItem('_splashFx')||'-1');
   do{ _preIdx = Math.random()*EFFECTS.length|0; } while(_preIdx===_last && EFFECTS.length>1);
   sessionStorage.setItem('_splashFx', _preIdx);
 }catch(e){ _preIdx = Math.random()*EFFECTS.length|0; }
 window._splashPreselectedIdx = _preIdx;
 loadSplashChunk(EFFECTS[_preIdx].name).catch(function(){});


  /* ══ EASTER EGG — 10 taps silencieux sur "Réalisé par Max" ══ */
  (function(){
    var tapCount=0, tapTimer=null;
    window.splashCreditTap=function(){
      tapCount++;
      clearTimeout(tapTimer);
      if(tapCount>=10){
        tapCount=0;
        setTimeout(function(){
          if(window._stopSplashEffect) window._stopSplashEffect();
          // Ne pas ajouter la classe 'out' — ça déclencherait le MutationObserver
          // et afficherait la navbar avant la preview. Laisser openSplashPreview gérer.
          if(typeof openSplashPreview==='function') openSplashPreview();
        },120);
      } else {
        tapTimer=setTimeout(function(){ tapCount=0; }, 3000);
      }
    };
  })();


  /* ── Règle globale : masque les orbes (#splash-bg) à l'ouverture du rideau ──
     Transition douce via CSS — la classe curtain-open déclenche le fade. */
  (function(){
    let _orbStyle=document.getElementById('_orb_hide_global');
    if(!_orbStyle){
      _orbStyle=document.createElement('style');
      _orbStyle.id='_orb_hide_global';
      _orbStyle.textContent=(
        '#splash-bg,#splash-bg-anim{'
        +'transition:opacity 1.2s ease!important;}'
        +'#splash.curtain-open #splash-bg,'
        +'#splash.curtain-open #splash-bg-anim{'
        +'opacity:0!important;pointer-events:none!important;}'
      );
      document.head.appendChild(_orbStyle);
    }
  })();

  window._runSplashEffect = function(){
    /* Masquer les orbes uniquement à l'ouverture du rideau (curtain-open) */
    (function(){
      var _splashEl=document.getElementById('splash');
      function _hideOrbs(){
        var _bgEl=document.getElementById('splash-bg');
        var _bgAnimEl=document.getElementById('splash-bg-anim');
        if(_bgEl){_bgEl.style.pointerEvents='none';}
        if(_bgAnimEl){_bgAnimEl.style.pointerEvents='none';}
      }
      if(_splashEl){
        if(_splashEl.classList.contains('curtain-open')){
          _hideOrbs();
        } else {
          var _orbObs=new MutationObserver(function(){
            if(_splashEl.classList.contains('curtain-open')){
              _orbObs.disconnect();
              _hideOrbs();
            }
          });
          _orbObs.observe(_splashEl,{attributes:true,attributeFilter:['class']});
        }
      }
    })();

    const cv=document.getElementById('splash-canvas');
    const refEl=document.getElementById('splash-film-ref');
    if(!cv)return;
    cv.width=cv.offsetWidth||390;
    cv.height=cv.offsetHeight||844;
    const ctx=cv.getContext('2d');
    const stop={v:false};
    const RUNNABLE=window.EFFECTS;
    let idx=window._splashPreselectedIdx;
    if(typeof idx!=='number'){try{const last=parseInt(sessionStorage.getItem('_splashFx')||'-1');do{idx=Math.random()*RUNNABLE.length|0;}while(idx===last&&RUNNABLE.length>1);sessionStorage.setItem('_splashFx',idx);}catch(e){idx=Math.random()*RUNNABLE.length|0;}}
    const fx=RUNNABLE[idx];
    if(refEl){refEl.textContent=fx.ref;}
    window._splashEffectName=fx.name;
    try{var _cSeen=JSON.parse(localStorage.getItem('cq_cinema_seen')||'[]');if(!_cSeen.includes(fx.name)){_cSeen.push(fx.name);localStorage.setItem('cq_cinema_seen',JSON.stringify(_cSeen));}}catch(e){}
    if(typeof window._preloadFilmLogo==='function') window._preloadFilmLogo(fx.name);

    if(window._onSplashEffectReady){window._onSplashEffectReady();window._onSplashEffectReady=null;}
    fx.run(cv,ctx,cv.width,cv.height,stop);

    window._stopSplashEffect=()=>{
      stop.v=true;
      ctx.clearRect(0,0,cv.width,cv.height);
      /* Restaurer les orbes du splash principal */
      var _bgEl=document.getElementById('splash-bg');
      var _bgAnimEl=document.getElementById('splash-bg-anim');
      if(_bgEl){_bgEl.style.transition='';_bgEl.style.pointerEvents='';}
      if(_bgAnimEl){_bgAnimEl.style.transition='';_bgAnimEl.style.pointerEvents='';}
      /* Purge immédiate de tous les styles injectés par les splashs */
      ['_28_s','_5e_splash_style','_af_splash_pos','_ah_s','_al_s','_an_s','_ap_s','_as_splash_style','_atbo_s','_av_pos','_bd_s','_big_pos','_big_s','_bl_s','_bm_aud','_bm_fig','_bm_fig_s','_bm_s','_bm_spot','_bm_spot_s','_bm_vig','_bnh_s','_bo_s','_bp_s','_br_bg_override','_bttf_pos_s','_cc_s','_cdd_s','_chal_s','_cm_s','_cmbyn_fig','_cmbyn_s','_cmbyn_vig','_col_s','_cr_splash_style','_cs_s','_cuckoo_s','_dd_s','_dd_splash_style','_dep_s','_dh_s','_dh_splash_style','_dj_s','_dm_s','_dn_s','_dv_pos_s','_ed_fig','_ed_fig_s','_ed_s','_ed_vig','_em_pos_s','_ep_s','_es_s','_et_s','_ews_pos_s','_ews_splash_style','_fc_pos_s','_ff_s','_fg_splash_style','_fmj_s','_fnf_s','_fy_s','_gat_s','_gbu_splash_style','_gd_s','_gits_s','_gl_pos_s','_go_s','_gotg_s','_gr_s','_grem_pos_s','_gs_s','_gt_s','_ha_s','_her_s','_hook_s','_hp_s','_ht_s','_ia2_s','_ia3_s','_ib_s','_ic_s','_ig_splash_style','_ij_s','_im_s','_inc_s','_inter_pos','_intou_s','_itw_splash_style','_jb_pos','_jf_pos','_jf_s','_jh_pos_s','_jh_splash_style','_jm_s','_joker_s','_jp_pos_s','_jum_s','_jw_s','_kb_splash_style','_laur_s','_le_splash_style','_lh_splash_style','_lit_s','_ll_pos_s','_ll_splash_pos','_lms_s','_ln_pos','_ln_splash_style','_low_pos_s','_lp_s','_ls_s','_lw_pos_s','_lw_splash_style','_mag_splash_style','_mc_s','_md_s','_me_s','_mib_fig','_mib_fig_s','_mib_pos_s','_ml_s','_mm_pos_s','_mr_splash_style','_ms_s','_msk_hat','_msk_hat_s','_msk_s','_msk_vig','_narnia_splash_style','_nb_s','_nc_s','_nc_splash_pos','_nm_s','_nope_splash_style','_ob_s','_oc_s','_om_s','_opp_splash_pos','_opp_splash_style','_par_pos_s','_pb_s','_pg2_s','_phm_s','_pir_s','_plat_pos_s','_plat_s','_pr_s','_ptbk_s','_rata_s','_rb_s','_rbl_s','_rd_s','_rdt_s','_rfd_s','_rk_s','_rm_s','_rmb_s','_rv_s','_ry_splash_style','_sa_splash_pos','_sbm_s','_sc_pos_s','_sc_splash_style','_schl_s','_seven_glow','_sf_s','_sf_splash_style','_sh_pos_s','_sil_s','_sin_s','_sk_s','_sm_splash_style','_sn_s','_sn_splash_style','_sp_splash_style','_ss_s','_sup_s','_sv_splash_style','_tbc_s','_td_s','_td_splash_style','_tdk_s','_tf_s','_tg_s','_tit_s','_tl_pos','_tl_splash_style','_tp_splash_style','_tron_pos','_ts_splash_style','_tshow_pos_s','_tshow_splash_style','_twb_s','_ug_s','_up_s','_us_s','_vbt_s','_vs_s','_vs_splash_style','_vs_vig','_wb_s','_we_s','_wh_fig','_wh_fig_s','_wh_s','_wh_vig','_wp_splash_style','_zod_s'].forEach(function(id){var el=document.getElementById(id);if(el)el.textContent='';});
      /* Réinitialisation immédiate des couleurs du logo et tagline principal */
      var _logoEls=document.querySelectorAll('#splash-logo-wrap .splash-logo, #splash-logo-wrap .splash-tagline, .splash-tagline');
      _logoEls.forEach(function(el){el.style.removeProperty('color');el.style.removeProperty('-webkit-text-fill-color');el.style.removeProperty('background');el.style.removeProperty('-webkit-background-clip');el.style.removeProperty('background-clip');el.style.removeProperty('filter');el.style.removeProperty('opacity');el.style.removeProperty('animation');});
      /* Réinitialisation de la couleur de "Réalisé par Max" */
      var _creditEls=document.querySelectorAll('#splash-credit, .splash-credit');
      _creditEls.forEach(function(el){el.style.removeProperty('color');el.style.removeProperty('-webkit-text-fill-color');el.style.removeProperty('text-shadow');});;
    };
  };
  /* window.EFFECTS défini plus haut (stubs lazy) */
})();
