import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import  Login from '../views/Login.vue'
import  MonProfil from '../views/MonProfil.vue'
import  SignUp from '../views/SignUp.vue'
import  Favorites from '../views/MesRecettesFavorites.vue'
import  MesRecettes from '../views/MesRecettesPostees.vue'
import Poster from '../views/PosterUneRecette.vue'
import Recette from '../views/Recette.vue'
import Admin from '../views/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    props: true 
  },
  {
    path: '/mon-profil',
    name: 'profil',
    component: MonProfil,
    props: true 
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    props: true 
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
    props: true 
  },
  {
    path: '/favorites/',
    name: 'favorites',
    component: Favorites,
    props: true 
  },
  {
    path: '/mes-recettes/',
    name: 'mes-recettes',
    component: MesRecettes,
    props: true 
  },
  {
    path: '/poster-recette',
    name: 'Poster',
    component: Poster,
    props: true 
  },
  { 
    path: '/Recette/:id',
    name: 'Recette',
    component: Recette,
    props: true
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    props: true
  },
  


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
