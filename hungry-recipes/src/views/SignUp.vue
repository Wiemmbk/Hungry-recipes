<template>
  <div>
    <NavBar />

    <h1 class="mt-32 text-brown font-bold">This is the Sign Up page !</h1>
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
        mt-16
      "
    >
      <input
        class="mt-5 rounded-md border border-beige py-2 px-11"
        type="text"
        v-model="username"
        placeholder="Username"
        id="usernameRegister"
      />
      <input
        class="mt-5 rounded-md border border-beige py-2 px-11"
        type="text"
        v-model="email"
        placeholder="Email"
        id="emailRegister"
      />
      <input
        class="mt-5 rounded-md border border-beige py-2 px-11"
        type="password"
        v-model="password"
        placeholder="Password"
        id="passwordRegister"
      />
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
        v-on:click="register()"
      >
        SignUp
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "../components/NavBar.vue";
export default {
  name: "SignUp",
    components: {
        NavBar,
    },
  data() {
    return {
      username: "",
      password: "",
      email: "",
    };
  },
  methods: {
    async register() {
      let result = await axios.post("http://localhost:3000/api/user/signup", {
        username: this.username,
        email: this.email,
        password: this.password,
      });
      if (result.status == 200) {
        alert("sign-up done");
        this.$router.push("/login");
      } else {
        alert("sign-up fail");
      }
    },
  },
};
</script>

<style>
</style>