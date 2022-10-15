<template>
  <div>
    <NavBar />
    <h1 class="mt-32 text-brown font-bold">This is a profil page</h1>

    <div class="flex flex-col">
      <a
      href="/mes-recettes"
        class="
          text-white
          bg-beige
          hover:bg-beige2
          focus:ring-4 focus:outline-none focus:ring-beige
          font-bold
          rounded-lg
          text-sm
          px-5
          py-2.5
          text-center
          mt-5
          mb-5
        "
        type="submit"
      >
        Mes Recettes Postées
      </a>

      <a
        href="/favorites"
        class="
          text-white
          bg-beige
          hover:bg-beige2
          focus:ring-4 focus:outline-none focus:ring-beige
          font-bold
          rounded-lg
          text-sm
          px-5
          py-2.5
          text-center
          mt-5
          mb-5
        "
        type="submit"
      >
        Mes Recettes Favorites
      </a>

      <button
        class="
          text-white
          bg-beige
          hover:bg-beige2
          focus:ring-4 focus:outline-none focus:ring-beige
          rounded-lg
          text-sm
          px-5
          py-2.5
          text-center
          mt-5
          mb-5
          font-bold
        "
        type="submit"
      >
        Mes Informations Personnelles
      </button>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "MonProfil",
  components: {
    NavBar,
  },
};
</script>