import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../theme/colors';

type Dish = {
  name: string;
  description: string;
  price: string;
  image: string;
  tags?: string[];
};

const categoryData: { [key: string]: { title: string; subtitle: string; dishes: Dish[] } } = {
  'New In': {
    title: 'New In',
    subtitle: 'Entdecke unsere neuesten Kreationen – innovative Asian Fusion trifft saisonale Zutaten.',
    dishes: [
      {
        name: 'Clubsandwich Beef',
        description: 'japanisches Clubsandwich mit franz. Entrecot, Trüffelcreme und frisch geriebenem Trüffel',
        price: '12,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e6468c60b7433914f4ed13_DSC02799.png'
      },
      {
        name: 'Clubsandwich Shrimp & Chicken',
        description: 'japanisches Clubsandwich mit würzigem shrimp & chicken hack',
        price: '10,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e6442ba70265169d3a0798_DSC02779.png'
      },
      {
        name: 'Clubsandwich Veggie',
        description: 'japanisches Clubsandwich mit gebackener Aubergine, Trüffelcreme und frisch geriebenem Trüffel',
        price: '9,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e645636c82b9a6343247b6_DSC02784.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Crunchy Baby Squid',
        description: 'knusprig frittierter Baby Oktopus',
        price: '8,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e643d56c82b9a6343150a2_DSC02759.png'
      },
      {
        name: 'Edamame Special',
        description: 'Edamame mit Parmesan und frisch geriebenem Trüffel',
        price: '8,9',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e643979c15bb7bf051f8c1_DSC02745.png'
      },
      {
        name: 'Fried Crab',
        description: 'frittiertes Krebsfleisch',
        price: '6,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e6435e9c15bb7bf051e999_DSC02735.png'
      },
      {
        name: 'Kim chi',
        description: 'fermentierter Chinakohl',
        price: '5,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e6441e5531d7363d441c98_DSC02776.png'
      },
      {
        name: 'Sake Inari',
        description: 'Tofutasche gefüllt mit Reis und Lachstatar',
        price: '9,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e643f17f4cc34ea89ddf30_DSC02765.png'
      },
      {
        name: 'Saketeri',
        description: 'Lachsfilet auf Gemüse an Teriyaki Soße',
        price: '7,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e6467dae5f0d3eeea35087_DSC02789.png'
      },
      {
        name: 'Slider Pork',
        description: 'mini Burger mit Pork-Pattie, Käse und Avocadocreme',
        price: '10,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e646caae5f0d3eeea38c37_DSC02812.png'
      },
      {
        name: 'Slider Shrimp',
        description: 'mini Burger mit Shrimp-Pattie, Käse und Avocadocreme',
        price: '10,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e646caae5f0d3eeea38c37_DSC02812.png'
      },
      {
        name: 'Springroll Shrimp',
        description: 'Hausgemachte Frühlingsrollen mit Garnelenfüllung',
        price: '9,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e643e3c622ad33cdacfec5_DSC02762.png'
      },
      {
        name: 'Springroll Viet',
        description: 'hausgemachte Frühlingsrollen',
        price: '8,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e64389cbc8f8ddc69998c5_DSC02740.png'
      },
      {
        name: 'Summerroll Chicken',
        description: 'Sommerrollen mit knusprigen Hühnchen (wahlweise auch mit Tofu möglich)',
        price: '5,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e646a941e4ef04255644ab_DSC02808.png'
      },
      {
        name: 'Summerroll Shrimp',
        description: 'Sommerrollen mit Garnelen',
        price: '6,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e643c7a70265169d39d21c_DSC02752.png'
      },
      {
        name: 'Tomato Tofu Trüffle',
        description: 'frittierter Tofu in Tomatensoße mit frisch geriebenem Trüffel',
        price: '9,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e643193f9838b96f2c6908_DSC02734.png'
      },
      {
        name: 'Tteok-Bokki Garnele',
        description: 'koreanische Reiskuchen in scharfer Soße mit Garnelen',
        price: '8,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e643a97f4cc34ea89db2a6_DSC02748.png'
      },
      {
        name: 'Tuna Inari',
        description: 'Tofutasche gefüllt mit Reis und Tunatatar',
        price: '10,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e6440224d6eb0847ab651e_DSC02768.png'
      },
      {
        name: 'Wakame Inari',
        description: 'Tofutasche gefüllt mit Reis und Seetangsalat',
        price: '8,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e644103f9838b96f2cc309_DSC02774.png'
      }
    ]
  },
  'Tapas Fleisch': {
    title: 'Tapas Fleisch',
    subtitle: 'Saftige Fleisch-Tapas von Duck Buns bis Rind mit Trüffel – kleine Teller mit großen Aromen. Sharing is Caring bei MOGGI Asian Kitchen & Bar Nürnberg.',
    dishes: [
      {
        name: 'Akari',
        description: 'knusprige Hühnerbrust in Sesamsoße',
        price: '7,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Asia Pancakes',
        description: 'hauchdünne Pancakes mit knusprigem Entenfleisch, Porree, Hoi-Sin Soße',
        price: '7,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e3765975d36470eb1a01c3_Asia%20Pancakes.png'
      },
      {
        name: 'Bangkok Baby',
        description: 'knuspriger Entensalat, Paprika, rote Zwiebel, Koriander',
        price: '9,7',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e377ac752a400737514967_Bangkok%20Baby.png',
        tags: ['Pikant']
      },
      {
        name: 'Beef Tataki',
        description: 'Rinderfiletstreifen in Tatakisoße',
        price: '9,9',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e377e4878de12a8d91cf39_Beef%20Tataki.png'
      },
      {
        name: 'Gyoza Chicken',
        description: 'gebratene / gedämpfte japanische Teigtaschen mit Hähnchen-/Gemüsefüllung',
        price: '6,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37a1e3fb26ffb0cc3d977_Gyoza%20Chicken.png'
      },
      {
        name: 'Karaage',
        description: 'japanische Hühnchen Nuggets',
        price: '6,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37a701f2e353c63dbfaa3_Karaage.png'
      },
      {
        name: 'Korean fried Chicken',
        description: 'knusprige Chicken Wings in scharfer Soße',
        price: '7,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37aaf667daf673973fa0c_Korean%20Fried%20Chicken.png',
        tags: ['Scharf']
      },
      {
        name: 'Moggi Special',
        description: 'in Knoblauchbutter geschwenkte Udonnudeln, Rinderstreifen, Frühlingszwiebeln',
        price: '11,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37b6a752a400737538bf5_Moggi%20Special.png'
      },
      {
        name: 'Purple Pork',
        description: 'langsam geschmortes Schweinefleisch',
        price: '6,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37c3cb61b875b04836035_Purple%20Pork.png'
      },
      {
        name: 'Sinmae',
        description: 'gedämpfte Teigtaschen mit Schweinefleischfüllung und Garnele',
        price: '6,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37d32667daf67397525da_Sinmae.png'
      },
      {
        name: 'Wantans',
        description: 'gebackene Teigtaschen mit Hühnchenfüllung',
        price: '5,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37e6842dc9f970376dc57_Wantans.png'
      }
    ]
  },
  'Tapas Fisch': {
    title: 'Tapas Fisch',
    subtitle: 'Feinste Meeresfrüchte als kleine Teller – Lachs-Tartar, Thunfisch und mehr. Perfekt zum Teilen in gemütlichem Ambiente mit Bar-Flair in Nürnberg.',
    dishes: [
      {
        name: 'Crabbombs',
        description: 'knusprig frittierte Krabbenbällchen',
        price: '6,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e3782fdbb3b714e3872e00_Crabbombs.png',
        tags: ['Pikant']
      },
      {
        name: 'Crispy Pockets',
        description: 'Garnelen im knusprigen Kartoffel-Netz-Mantel',
        price: '6,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37898abc75cda2d00b3bb_Crispy%20Pockets.png'
      },
      {
        name: 'Ebininiku',
        description: 'Garnelen in Soja-Knoblauchsoße',
        price: '7,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Fish Fingers',
        description: 'knusprige Norirolle gefüllt mit Lachstatar',
        price: '6,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e379fc3e9ddd9337e91568_Fish%20Fingers.png',
        tags: ['Pikant']
      },
      {
        name: 'Keiko',
        description: 'gedämpfte Teigtaschen in Garnelen-Bambus-Füllung',
        price: '6,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37a863e9ddd9337e964b8_Keiko.png'
      },
      {
        name: 'Moneybags',
        description: 'knusprig frittierte Teigtaschen mit Garnelenfüllung',
        price: '6,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37b9275d36470eb1c66b6_Moneybags.png'
      },
      {
        name: 'Sake Carpaccio',
        description: 'Lachs Carpaccio',
        price: '7,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37c5f878de12a8d95717c_Sake%20Carpaccio.png'
      },
      {
        name: 'Sake-Tatar',
        description: 'Lachstatar auf Avocadobett',
        price: '9,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37c97b68f6d067e3563da_Sake-Tatar.png',
        tags: ['Pikant']
      },
      {
        name: 'Squid Sour',
        description: 'knuspriger Tintenfisch an hausgemachter Paprika-Fisch-Soße',
        price: '7,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37d9b75d36470eb1dabc8_Squid%20Sour.png'
      },
      {
        name: 'Tempura Tower',
        description: 'Riesengarnelen Tempura auf Rucculabett an Spicy Mayo',
        price: '12,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37ddc3e9ddd9337ea799f_Tempura%20Tower.png'
      },
      {
        name: 'Tuna Carpaccio',
        description: 'Thunfisch Carpaccio',
        price: '8,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37e03b68f6d067e35bf93_Tuna%20Carpaccio.png'
      },
      {
        name: 'Tuna Tataki',
        description: 'Thunfischfilet in Sesamkruste gebraten',
        price: '11,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37e2ac5976965b8e6a5ae_Tuna%20Tataki.png'
      },
      {
        name: 'Tuna-Tatar',
        description: 'Thunfischtatar auf Avocadobett',
        price: '10,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37e3f75d36470eb1e7308_Tuna-Tatar.png',
        tags: ['Pikant']
      },
      {
        name: 'Yume',
        description: 'würzige Thunfischnuggets mit Fischsoße',
        price: '8,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37e850c1d0b75525b2d25_Yume.png',
        tags: ['Pikant']
      }
    ]
  },
  'Tapas vegetarisch': {
    title: 'Tapas vegetarisch',
    subtitle: 'Pflanzliche Asian Tapas zum Teilen – von Baos bis Gyoza. Fast alle Gerichte auch vegan verfügbar. Mittwoch Special: 3 für 4 auf alle Tapas bei MOGGI Nürnberg.',
    dishes: [
      {
        name: 'Spicy Cucumber Salad',
        description: 'pikanter Gurkensalat',
        price: '4,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37d60b68f6d067e35a0fd_Spicy%20Cucumber%20Salat.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Taro Fries',
        description: 'knusprige Tarofritten',
        price: '5,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37dd23e9ddd9337ea781c_Taro%20Fries.png',
        tags: ['Vegetarisch']
      }
    ]
  },
  'Sticks': {
    title: 'Sticks',
    subtitle: 'Perfekt gegrillte Yakitori-Spieße mit authentischen Marinaden – ideal zu Drinks an unserer Bar. Late Night Food bis 3 Uhr am Wochenende.',
    dishes: [
      {
        name: 'Asupara Sticks',
        description: 'Spargeltempuraspieße an Teriyakisoße',
        price: '7,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37704b8e3dea86bdbd1e8_Asupara%20Sticks.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Beef Sticks',
        description: 'Rindfleischspieße',
        price: '7,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e377daabc75cda2d003099_Beef%20Sticks.png'
      },
      {
        name: 'Ebi Sticks',
        description: 'Garnelenspieße',
        price: '7,9',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e378fc3fb26ffb0cc35728_Ebi%20Sticks.png'
      },
      {
        name: 'Sate Sticks',
        description: 'marinierte Hühnchenspieße an Erdnusssoße',
        price: '7,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37d19dbb3b714e388d77e_Sate%20Sticks.png'
      },
      {
        name: 'Tori Sticks',
        description: 'würzige Hühnchenspieße',
        price: '7,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37de8b8e3dea86bdeed3e_Tori%20Sticks.png'
      }
    ]
  },
  'Crisps': {
    title: 'Crisps',
    subtitle: 'Knusprige Tempura und asiatische Snacks – die perfekte Vorspeise oder Begleitung zu deinen Drinks. Happy Hour Donnerstag & Freitag 20-22 Uhr.',
    dishes: [
      {
        name: 'Crisps Guacamole (3 Stück)',
        description: 'knusprige Reiswürfel mit Guacamole',
        price: '8,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e3783fa9f1c4aefba47c91_Crisps%20Guacamole.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Crisps Mix (6 Stück)',
        description: 'knusprige Reiswürfel mit Guacamole, Lachstatar, Thunfischtatar',
        price: '14,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e3784b2ddc49b30a959784_Crisps%20Mix.png',
        tags: ['Pikant']
      },
      {
        name: 'Crisps Sake (3 Stück)',
        description: 'knusprige Reiswürfel mit Lachstatar',
        price: '9,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e378553fb26ffb0cc2dab4_Crisps%20Sake.png',
        tags: ['Pikant']
      },
      {
        name: 'Crisps Tuna (3 Stück)',
        description: 'knusprige Reiswürfel mit Thunfischtatar',
        price: '9,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37860de1f79fe6d77f6d8_Crisps%20Tuna.png',
        tags: ['Pikant']
      }
    ]
  },
  'Baos': {
    title: 'Baos',
    subtitle: 'Fluffige gedämpfte Brötchen nach chinesischer Tradition – hausgemacht mit kreativen Füllungen. Asian Tapas zum Teilen, inspiriert von Guangdong.',
    dishes: [
      {
        name: 'Bao Beef',
        description: 'gedämpfte Lotusblattbrötchen mit Rindfleischfüllung',
        price: '5,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e377b6b61b875b047e95db_Bao%20Beef.png'
      },
      {
        name: 'Bao Chicken',
        description: 'gedämpfte Lotusblattbrötchen mit knuspriger Hühnchenfüllung',
        price: '5,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e373c3de1f79fe6d74868c_Bao%20Chicken.png'
      },
      {
        name: 'Bao Pilz',
        description: 'gedämpfte Lotusblattbrötchen mit würzigen Pilzen',
        price: '5,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e377c0752a4007375154e5_Bao%20Pilz.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Bao Pork',
        description: 'gedämpfte Lotusblattbrötchen mit langsam geschmortem Schweinefleisch',
        price: '5,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e377d0b61b875b047ea886_Bao%20Pork.png'
      }
    ]
  },
  'Nori Tacos': {
    title: 'Nori Tacos',
    subtitle: 'Knusprige Algenblätter treffen auf kreative Füllungen – unsere innovativste Fusion-Kreation. Asian Street Food neu interpretiert zum Teilen.',
    dishes: [
      {
        name: 'Sake Taco',
        description: 'Lachstatar, Avocado, Gurke',
        price: '8,9',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37c8c03a0f0ca50c7f4e7_Sake%20Taco.png',
        tags: ['Pikant']
      },
      {
        name: 'Tuna Taco',
        description: 'Thunfischtatar, Avocado, Gurke',
        price: '9,9',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37e1f75d36470eb1e4fbf_Tuna%20Taco.png',
        tags: ['Pikant']
      }
    ]
  },
  'Sashimi': {
    title: 'Sushi sashimi',
    subtitle: 'Feinste Fisch-Filets kunstvoll geschnitten – pure Qualität ohne Reis. Frische trifft auf meisterhafte Schnitttechnik nach traditioneller Edomae-Art.',
    dishes: [
      {
        name: 'Maguro to Sake',
        description: 'Sashimi vom Thunfisch und Lachs',
        price: '15,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37b0f3e9ddd9337e99e61_Maguro%20to%20Sake.png'
      },
      {
        name: 'Sashimi Sake',
        description: 'Sashimi vom Lachs',
        price: '7,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37cdc75d36470eb1d5447_Sashimi%20Sake.png'
      },
      {
        name: 'Sashimi Tuna',
        description: 'Sashimi vom Thunfisch',
        price: '8,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37cf7c0f364d88fa1a034_Sashimi%20Tuna.png'
      }
    ]
  },
  'Nigiri': {
    title: 'Sushi nigiri',
    subtitle: 'Premium-Fisch auf perfekt gewürztem Reis – die Königsdisziplin des Sushi-Handwerks. Jedes Stück mit Präzision und Respekt für das Produkt komponiert.',
    dishes: [
      {
        name: 'Asupara',
        description: 'Spargel',
        price: '5,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e376bac0f364d88f9ecec9_Asupara.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Ebi',
        description: 'Garnele',
        price: '6,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e378f2de1f79fe6d7853e1_Ebi.png'
      },
      {
        name: 'Ikura',
        description: 'Lachsrogen',
        price: '8,9',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37a4c752a40073752ee8a_Ikura.png'
      },
      {
        name: 'Maguro',
        description: 'Thunfisch',
        price: '6,7',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37b04437e925cddf5d7ac_Maguro.png'
      },
      {
        name: 'Sake',
        description: 'Lachs',
        price: '5,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37c4890174fa0f9a7add7_Sake.png'
      },
      {
        name: 'Spicy Sake',
        description: 'Lachstatar',
        price: '7,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37d722ddc49b30a97cd48_Spicy%20Sake.png',
        tags: ['Pikant']
      },
      {
        name: 'Spicy Tuna',
        description: 'Thunfischtatar',
        price: '8,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37d87c0f364d88fa22989_Spicy%20Tuna.png',
        tags: ['Pikant']
      }
    ]
  },
  'Hosomaki': {
    title: 'Sushi hosomaki',
    subtitle: 'Klassische japanische Maki-Rollen – puristisch, elegant, authentisch. Handgerollt von unserem Sushi-Meister nach Edomae-Tradition.',
    dishes: [
      {
        name: 'Asupara Hoso',
        description: 'Spargel',
        price: '5,9',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e3768fb68f6d067e302c60_Asupara%20Hoso.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Avo Hoso',
        description: 'Avocado',
        price: '5,9',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37718667daf6739721a1c_Avo%20Hoso.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'AvoSake Hoso',
        description: 'Lachs, Avocado',
        price: '7,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e3774ede1f79fe6d77142b_Avosake%20Hoso.png'
      },
      {
        name: 'Kappa',
        description: 'Gurke',
        price: '5,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37a66667daf673973ce6a_Kappa.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Mango Hoso',
        description: 'Mango',
        price: '5,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Sake Hoso',
        description: 'Lachs',
        price: '6,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37c6e878de12a8d9580f2_Sake%20Hoso.png'
      },
      {
        name: 'Tuna Hoso',
        description: 'Thunfisch',
        price: '7,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37e0b1f2e353c63dee29f_Tuna%20Hoso.png'
      },
      {
        name: 'Unagi Hoso',
        description: 'geräucherter Aal',
        price: '6,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37e497df47ac400261c20_Unagi%20Hoso.png'
      }
    ]
  },
  'Uramaki': {
    title: 'Sushi uramaki',
    subtitle: 'Inside-Out Rolls mit mehr Füllung, weniger Reis. Authentisch zubereitet nach japanischer Tradition mit frischesten Premium-Zutaten aus Nürnberg.',
    dishes: [
      {
        name: 'Alasuka Roll',
        description: 'Lachs, Gurke, Sesam',
        price: '5,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37644902977171d5faf52_Alasuka%20Roll.png'
      },
      {
        name: 'Behi Roll',
        description: 'Avocado, Gurke, Frischkäse',
        price: '5,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Cali Roll',
        description: 'Garnele, Kaviar, Avocado, Gurke',
        price: '6,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Kenko Roll',
        description: 'Spargel, Ruccula, Frischkäse, schwarzer Sesam',
        price: '6,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37a9dc0f364d88fa02b8f_Kenko%20Roll.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Philly Roll',
        description: 'Garnele, Ruccula, Frischkäse',
        price: '6,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37c2503a0f0ca50c7c0ac_Philly%20Roll.png'
      },
      {
        name: 'Sake Avo',
        description: 'Lachs, Avocado',
        price: '5,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37c551f2e353c63dd7d8e_Sake%20Avo.png'
      },
      {
        name: 'Sake Skin',
        description: 'knusprige Lachshaut, Gurke, Frischkäse, Sesam',
        price: '6,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37c83667daf673974ea4c_Sake%20Skin.png'
      },
      {
        name: 'Spicy Sake Roll',
        description: 'Lachstatar',
        price: '6,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37d7d878de12a8d96753a_Spicy%20Sake%20Roll.png',
        tags: ['Pikant']
      },
      {
        name: 'Spicy Tuna Roll',
        description: 'Thunfischtatar',
        price: '7,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37d91dbb3b714e38923f9_Spicy%20Tuna%20Roll.png',
        tags: ['Pikant']
      },
      {
        name: 'Tuna Avo',
        description: 'Thunfisch, Avocado',
        price: '6,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37df91f2e353c63decb53_Tuna%20Avo.png'
      },
      {
        name: 'Tuna Ruccula',
        description: 'Thunfisch, Ruccula',
        price: '6,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37e15b61b875b04850577_Tuna%20Ruccula.png'
      }
    ]
  },
  'Special Roll': {
    title: 'Sushi Special Roll',
    subtitle: 'Unsere Premium-Kreationen mit Trüffel, Surf\'n\'Turf und exklusiven Zutaten. Handgefertigt von Sushi-Meister Ryohey mit über 15 Jahren Erfahrung.',
    dishes: [
      {
        name: 'Chihiro Roll',
        description: 'Garnele, Spargel, Avocado, Lachs on top, Kaviar',
        price: '9,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37805b68f6d067e319a13_Chihiro%20Roll.png'
      },
      {
        name: 'Enton Roll',
        description: 'knusprige Ente, Avocado, Frischkäse, Sesam, Chilli, Schnittlauch',
        price: '8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e379f2abc75cda2d019efb_Enton%20Roll.png'
      },
      {
        name: 'Hashi Roll',
        description: 'Spargel, Avocado, Ruccula, Frischkäse, Thunfisch on top',
        price: '8,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37a301f2e353c63dbc709_Hashi%20Roll.png'
      },
      {
        name: 'Kenji Roll',
        description: 'Spargeltempura, Avocado, Frischkäse',
        price: '7,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Kyoto Roll',
        description: 'Auberginentempura, Schnittlauch, Bonitoflocken',
        price: '7,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37abe437e925cddf587a3_Kyotor%20Roll.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Momo Roll',
        description: 'spicy Sake, Mango, Gurke, Lachs on top, Kaviar',
        price: '8,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37b85878de12a8d948629_Momo%20Roll.png',
        tags: ['Pikant']
      },
      {
        name: 'Mononoke Roll',
        description: 'spicy Tuna, Spargel, Avocado, Tuna on top, Wasabikaviar',
        price: '9,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37ba4878de12a8d94a305_Mononoke%20Roll.png',
        tags: ['Pikant']
      },
      {
        name: 'Nisu Roll',
        description: 'Riesengarnelentempura, Ruccula, Frischkäse, Sesam',
        price: '8,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Sate Roll',
        description: 'mariniertes Hühnerfleisch, Avocado, Satesoße, Erdnusscrunch',
        price: '7,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37d02b68f6d067e357e18_Sate%20Roll.png'
      },
      {
        name: 'Sazuke Roll',
        description: 'Riesengarnelentempura, Avocado, Gurke, Lachs on top, Kaviar',
        price: '8,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37d23b68f6d067e35879e_Sazuke%20Roll.png'
      },
      {
        name: 'Shinset Roll',
        description: 'mariniertes Hühnerfleisch, Mango, Gurke, Sesam',
        price: '7,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Trüffel Surf & Turf',
        description: 'Riesengarnelentempura, Trüffelkartoffelpüree, Spargel, flambiertes Rinderfilet on top, Trüffelmayo, Parmesanchip',
        price: '11,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Yukiko Roll',
        description: 'geräucherter Aal, knusprige Lachshaut, Gurke, Frischkäse, Lachs on top, Lachsrogen',
        price: '9,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37e7d878de12a8d9735a5_Yukiko%20Roll.png'
      }
    ]
  },
  'Crispy Rolls': {
    title: 'Sushi crispy Rolls',
    subtitle: 'Knusprig frittierte Inside-Out Rolls – außen crunchy, innen cremig. Perfekt für alle, die es knusprig mögen.',
    dishes: [
      {
        name: 'Crispy Bini',
        description: 'Spargel, Mango, Gurke, Frischkäse',
        price: '8,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e391c8bb933e1d4e0e1d8b_Crispy%20Bini.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Crispy Cayo',
        description: 'Garnele, Avocado, Gurke, Frischkäse, Kaviar',
        price: '8,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37881de1f79fe6d7823dc_Crispy%20Cayo.png'
      },
      {
        name: 'Crispy Moggi',
        description: 'Lachstatar, Mango, Avocado, Frischkäse',
        price: '8,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e3788c752a4007375201bc_Crispy%20Moggi.png',
        tags: ['Pikant']
      },
      {
        name: 'Crispy Shin',
        description: 'mariniertes Hähnchen, Avocado, Frischkäse',
        price: '9,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e378a23f8f78bca81a4658_Crispy%20Shin.png'
      },
      {
        name: 'Crispy Yucca',
        description: 'Avocado, Mango, Frischkäse',
        price: '8,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e378ad90174fa0f9a50e40_Crispy%20Yucca.png',
        tags: ['Vegetarisch']
      }
    ]
  },
  'Sides': {
    title: 'Sides',
    subtitle: 'Perfekte Ergänzungen zu deinem Hauptgericht – hausgemachte Udon-Nudeln, Reis und mehr. Authentische Beilagen für dein komplettes Asian Feast.',
    dishes: [
      {
        name: 'Chilisoße',
        description: '',
        price: '2,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Curry Soße',
        description: '',
        price: '3,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Ingwer',
        description: '',
        price: '2,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Krabbenchips',
        description: '',
        price: '2,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Sate Soße',
        description: '',
        price: '2,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Spicy Mayo',
        description: '',
        price: '2,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Sushi Rice',
        description: '',
        price: '3,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Teriyaki Soße',
        description: '',
        price: '2,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Unagi Soße',
        description: '',
        price: '2,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Wasabi',
        description: '',
        price: '3,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'frische Chillis',
        description: '',
        price: '2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'plain Rice',
        description: '',
        price: '3,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      }
    ]
  },
  'Dessert': {
    title: 'Dessert',
    subtitle: 'Süße Verführungen mit fernöstlichem Flair – von Mochi bis Matcha. Der perfekte Abschluss deines kulinarischen Erlebnisses bei MOGGI Asian Kitchen & Bar.',
    dishes: [
      {
        name: 'Banana Rama',
        description: 'knusprige Bananenbällchen mit Honig, Vanilleeis und Obst',
        price: '8,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e377723fb26ffb0cc1ef9c_Banana%20Rama.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Black Sticky Rice',
        description: 'schwarzer Klebereis mit süßer Kokosmilch und frischer Mango',
        price: '6,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Fluffy Banana',
        description: 'cremiger Bananenpudding mit Biscuits',
        price: '7,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e6469b2a08fb3dc6622f37_DSC02803.png'
      },
      {
        name: 'Iceball',
        description: 'Gebackenes Eis',
        price: '7,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37a40667daf673973b610_Ice%20Ball.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Matcha Tiramisu',
        description: 'Tiramisu auf Matchabasis',
        price: '6,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37b241f2e353c63dc72ff_Matcha%20Tiramisu.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Milcheis Matcha',
        description: 'Grüner Tee',
        price: '3,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Milcheis Sesam',
        description: 'Sesam',
        price: '3,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37b34de1f79fe6d7970de_Milcheis%20Sesam.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Milcheis Vanille',
        description: 'Vanille',
        price: '3,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37b3f752a4007375363f9_Milcheis%20Vanille.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Milcheis Yuzu',
        description: 'Zitrone',
        price: '3,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Mochi Trio',
        description: 'Dreierlei Mochis',
        price: '7,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37b58752a400737537906_Mochi%20Trio.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Sorbet auf Crémant',
        description: 'Leckeres Sorbet Eis auf prickelndem Crémant',
        price: '10,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e0c015bac9120c0c38ddae_Sorbet%20Matcha.png',
        tags: ['Vegan']
      },
      {
        name: 'Sorbet Himbeere',
        description: 'Himbeersorbet',
        price: '4,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Sorbet Lychee',
        description: 'Lycheesorbet',
        price: '4,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Sorbet Yuzu',
        description: 'Zitronensorbet',
        price: '4,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37d433e9ddd9337ea4b44_Sorbet%20Yuzu.png',
        tags: ['Vegetarisch']
      }
    ]
  },
  'Business Lunch': {
    title: 'Business Lunch',
    subtitle: 'Hochwertige Lunch-Bowls und Menüs für deine Mittagspause. Dienstag bis Samstag 11:30-14:30 Uhr. Schnell, frisch und perfekt für Geschäftsessen in Nürnberg.',
    dishes: [
      {
        name: 'Curry-Me Ente',
        description: 'Thailändisches rotes Curry mit Ente und Gemüse',
        price: '16,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e378bc1f2e353c63da7608_Curry%20me%20Ente.png'
      },
      {
        name: 'Curry-Me Garnelen',
        description: 'Thailändisches rotes Curry mit Garnelen und Gemüse',
        price: '16,2',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e378cab61b875b047fc092_Curry-Me%20Garnelen.png'
      },
      {
        name: 'Curry-Me Hühnchen',
        description: 'Thailändisches rotes Curry mit Hühnchen und Gemüse',
        price: '13,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e391db4cfc7dcf5e72de06_Curry%20me%20Chicken.png'
      },
      {
        name: 'Curry-Me Tofu',
        description: 'Thailändisches rotes Curry mit Tofu und Gemüse',
        price: '12,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e378d7b61b875b047fc86a_Curry%20me%20Tofu.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Lunch Bento Box Fisch',
        description: 'Reis, Salat, Uramaki, Lachs',
        price: '13,9',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e391eea750278df0d297e4_Lunch%20Bento%20Box%20Fisch.png'
      },
      {
        name: 'Lunch Bento Box Fleisch',
        description: 'Reis, Salat, Uramaki, Ente',
        price: '13,9',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37af975d36470eb1c1322_Lunch%20Bento%20Box%20Ente.png'
      },
      {
        name: 'Lunch Bento Box Vegan',
        description: 'Reis, Salat, Uramaki, Tofu',
        price: '13,9',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37aef90174fa0f9a69bf0_Lunch%20Bento%20Box%20Vegan.png',
        tags: ['Vegan']
      },
      {
        name: 'Moggi Sushi Mix',
        description: '1 Uramaki, 1 Hosomaki, 2 Nigiris',
        price: '12,9',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37b7b90174fa0f9a70b6e_MOGGI%20Sushi%20Mix.png'
      },
      {
        name: 'Sake-Teri',
        description: 'gebratener Lachs, Brokkoli, Teriyaki Espuma',
        price: '12,9',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37ca2b61b875b0483e033_Sake-Teri.png'
      },
      {
        name: 'Salat Fisch',
        description: 'Salat, Dressing, Sashimimix',
        price: '12,9',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Salat Fleisch',
        description: 'Salat, Dressing, Hühnchen',
        price: '12,9',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
      },
      {
        name: 'Salat Vegan',
        description: 'Salat, Dressing, Avocado',
        price: '12,9',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Superbowl Fisch',
        description: 'Reis, Salat, Dressing, Algensalat, Sashimimix',
        price: '13,9',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37da52725c38c98de0056_Superbowl%20Fisch.png'
      },
      {
        name: 'Superbowl Fleisch',
        description: 'Reis, Salat, Dressing, Algensalat, knusprige Ente',
        price: '13,9',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37daf181117c81c851bb2_Superbowl%20Fleisch.png'
      },
      {
        name: 'Superbowl Vegan',
        description: 'Reis, Salat, Dressing, Algensalat, Tofu',
        price: '13,9',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png',
        tags: ['Vegan']
      }
    ]
  },
  'Salat': {
    title: 'Salat',
    subtitle: 'Frische asiatische Salate mit Edamame, Wakame und hausgemachten Dressings. Leicht, gesund und voller fernöstlicher Geschmacksnuancen.',
    dishes: [
      {
        name: 'Asupara Salat',
        description: 'Spargelsalat an Hausdressing',
        price: '7,3',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e376cfb8e3dea86bdbb75f_Asupara%20Salat.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Avocado Salad',
        description: 'Avocadosalat mit Hausdressing',
        price: '10,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e391b7ea20c58b003f8ef2_Avocado%20Salad%20Kopie.png',
        tags: ['Vegetarisch']
      },
      {
        name: 'Gomae Garnelen',
        description: 'Babyspinat, Sesamdressing, gebratene Riesengarnelen, Parmesan',
        price: '14,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37a06dbb3b714e38806e7_Gomae%20Garnelen.png'
      },
      {
        name: 'Gomae Rind',
        description: 'Babyspinat, Sesamdressing, gebratene Rinderstreifen, Parmesan',
        price: '12,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37a13b68f6d067e33dc58_Gomae%20Rind.png'
      },
      {
        name: 'Otaru Chicken Salad',
        description: 'Haussalat mit würzig mariniertem Hühnchenfleisch',
        price: '11,6',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37c1a75d36470eb1cf2a8_Otaru%20Chicken%20Salad%20Kopie.png'
      },
      {
        name: 'Sakura Salad',
        description: 'Thunfisch, Avocado Sashimi auf Rucculabett mit Hausdressing',
        price: '11,8',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37cae878de12a8d95d268_Sakura%20Salad.png'
      },
      {
        name: 'Sashimi Salad',
        description: 'Lachs, Thunfisch Sashimi auf Salat mit Hausdressing',
        price: '11,4',
        image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37cee878de12a8d960dc3_Sashimi%20Salad.png'
      }
    ]
  }
};

export default function CategoryDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryName } = route.params as { categoryName: string };

  const categoryInfo = categoryData[categoryName] || {
    title: categoryName,
    subtitle: '',
    dishes: []
  };

  const handleDishPress = (dish: Dish) => {
    (navigation.navigate as any)('DishDetail', { dish, categoryName });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryInfo.title}</Text>
        {categoryInfo.subtitle && (
          <Text style={styles.headerSubtitle}>{categoryInfo.subtitle}</Text>
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {categoryInfo.dishes.map((dish, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dishCard}
              activeOpacity={0.7}
              onPress={() => handleDishPress(dish)}
            >
              {dish.image && !dish.image.includes('Akari.png') && (
                <Image
                  source={{ uri: dish.image }}
                  style={styles.dishImage}
                  resizeMode="cover"
                />
              )}
              <View style={[styles.dishInfo, (!dish.image || dish.image.includes('Akari.png')) && styles.dishInfoNoImage]}>
                <View style={styles.dishHeader}>
                  <Text style={styles.dishName}>{dish.name}</Text>
                  <Text style={styles.dishPrice}>{dish.price}</Text>
                </View>
                {dish.description && (
                  <Text style={styles.dishDescription}>{dish.description}</Text>
                )}
                {dish.tags && dish.tags.length > 0 && (
                  <View style={styles.tagsContainer}>
                    {dish.tags.map((tag, tagIndex) => (
                      <View key={tagIndex} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGray,
  },
  header: {
    backgroundColor: colors.black,
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 65,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.lightGray,
    marginTop: 8,
    lineHeight: 20,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  content: {
    padding: 16,
  },
  dishCard: {
    backgroundColor: colors.black,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  dishImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.black,
  },
  dishInfo: {
    padding: 16,
  },
  dishInfoNoImage: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  dishHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  dishName: {
    fontSize: 18,
    fontWeight: '300',
    color: colors.white,
    flex: 1,
    marginRight: 12,
    fontFamily: 'Georgia',
  },
  dishPrice: {
    fontSize: 18,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
  },
  dishDescription: {
    fontSize: 14,
    color: colors.lightGray,
    lineHeight: 20,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: 'rgba(255, 107, 0, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
});

