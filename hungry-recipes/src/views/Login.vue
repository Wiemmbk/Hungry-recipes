<template>
  <div>
    <NavBar />

    <h1 class="mt-32 text-brown font-bold">Login</h1>

    <form
      class="
        container
        border border-beige
        bg-brown3
        flex flex-col
        items-center
        justify-center
        rounded-lg
        shadow-lg
        w-[400px]
        mx-auto
        mt-10
      "
      @submit.prevent="login"
    >
      <input
        class="mt-5 rounded-md border border-beige py-2 px-11"
        type="text"
        placeholder="email"
        v-model="email"
      />
      <input
        class="mt-5 rounded-md border border-beige py-2 px-11"
        type="password"
        placeholder="Password"
        v-model="password"
      />
      <br />
      <a class="italic" href="/signup"> You don't have an account? Sign Up</a>
      <button
        class="
          text-white
          bg-beige
          hover:bg-beige2
          focus:ring-4 focus:outline-none focus:ring-beige
          font-medium
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
        Login
      </button>
      <br />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "Login",
  components: {
    NavBar,
  },
  data() {
    return {
      email: "",
      password: "",
      array: [],
    };
  },
  methods: {   

    async login() {
      let result = await axios.post("http://localhost:3000/api/user/login", {
        email: this.email,
        password: this.password,
      });
      console.log(result.data);
      localStorage.setItem("id", result.data.id);
      localStorage.setItem("username", result.data.username);
      localStorage.setItem("token", result.data.token);
      // localStorage.setObj('favorites', result.data.favorite_recipes)
      // stockage du tableau dans localStorage.
      var array = [];
      for (let i = 0; i <= result.data.favorite_recipes.length - 1; i++) {
        // var favorites = result.data.favorite_recipes[i].recipe_id;
        array.push(result.data.favorite_recipes[i].recipe_id);
      }
      localStorage.setItem("favorites", JSON.stringify(array));
      console.log(result.data.favorite_recipes);
      if (result.status == 200) {
        alert("You're log in !");
        this.$router.push("/");
      } else {
        alert("Sorry, an error has occurred...");
      }
    },
  },
  components: { NavBar },
};
</script>



<style>
</style>