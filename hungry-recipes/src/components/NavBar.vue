<template>
  <nav
    class="
      bg-brown3
      border-gray-200
      px-2
      sm:px-4
      py-2.5
      rounded
      mx-0
      fixed
      top-0
      w-full
      z-10
    "
  >
    <div class="container flex flex-wrap justify-between items-center">
      <a href="/" class="flex items-center">
        <img src="../assets/logo.png" class="mr-3 h-38 w-36" alt="Logo" />
      </a>
      <div class="flex space-x-4 md:order-2">
        <a
          type="button"
          v-show="token"
          href="/poster-recette"
          class="
            text-white
            bg-beige
            hover:bg-beige2
            focus:ring-4 focus:outline-none focus:ring-beige
            font-medium
            rounded-lg
            text-sm
            px-5
            py-3.5
            text-center
            mr-3
            md:mr-0
          "
        >
          Poster une recette
        </a>
        <a
          type="button"
          v-show="token"
          href="/favorites"
          class="
            text-white
            bg-beige
            hover:bg-beige2
            focus:ring-4 focus:outline-none focus:ring-beige
            font-medium
            rounded-lg
            text-sm
            px-5
            py-3.5
            text-center
            mr-3
            md:mr-0
          "
        >
          Mes favorites
        </a>
        <a
          type="button"
          v-show="!token"
          href="/login"
          class="
            text-white
            bg-beige
            hover:bg-beige2
            focus:ring-4 focus:outline-none focus:ring-beige
            font-medium
            rounded-lg
            text-sm
            px-5
            py-3.5
            text-center
            mr-3
            md:mr-0
          "
        >
          Login
        </a>
        <button
        v-show="token"
          id="dropdownUserAvatarButton"
          data-dropdown-toggle="dropdownAvatar"
          type="button"
        >
          <span class="sr-only">Open user menu</span>
          <img
            class="w-12 h-12 rounded-full"
            src="../assets/avatar.png"
            alt="user photo"
          />
        </button>

        <!-- Dropdown menu -->
        <div
          id="dropdownAvatar"
          class="
            hidden
            z-10
            w-44
            bg-white
            rounded
            divide-y divide-gray-100
            shadow
          "
          style="
            position: absolute;
            inset: 0px auto auto 0px;
            margin: 0px;
            transform: translate3d(0px, 651.333px, 0px);
          "
          data-popper-reference-hidden=""
          data-popper-escaped=""
          data-popper-placement="bottom"
        >
          <ul
            class="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownUserAvatarButton"
          >
            <li>
              <a
                href="/mon-profil"
                class="block py-2 px-4 hover:bg-gray-100"
                >Mon profil</a
              >
            </li>
          </ul>
          <div class="py-1">
            <a
              href="#"
              class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
              v-on:click="logout()"
              >Sign out</a
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  name: "NavBar",

  data() {
    return {
      token: localStorage.getItem("token"),
      query: null,
      recipes: "",
      title: "",
    };
  },

  methods: {
    async logout() {
      await axios;
      let result = await axios.get("http://localhost:3000/api/logout", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("id"),
        },
      });
      console.log(result);
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("favorites");

      if (result.status == 200) {
        alert("You're log out !");
        this.$router.push("/");
      } else {
        alert("Sorry, an error has occurred...");
      };
      window.location.reload();
    },

  
  },
};
</script>

<style>
</style>