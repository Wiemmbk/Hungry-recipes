<template>
  <div>
    <NavBar />
    <div class="flex flex-col mb-2 justify-center ">
      <div v-for="recipe in recipes" :key="recipe._id" class="m-4">
        <CardRecettesFavorites :recipe="recipe" />
      </div>
    </div>
  </div>
</template>

<script>
    import axios from 'axios';
    import CardRecettesFavorites from "@/components/CardRecettesFavorites.vue";
import NavBar from "@/components/NavBar.vue";
export default {
    components: {
      CardRecettesFavorites,
        NavBar,
    },
    props:{
            id: String,
        recipe: {
            type: Object,
            // required: true
        },

    },

        data() {
            return {
                recipes: [],

            };
        },
        async created() {
            const token = localStorage.getItem("token");
            const id = localStorage.getItem("id");
            const response = await axios.get(
               `http://localhost:3000/api/user/${id}/favorites/`,
                {
                    headers: {
                        Authorization:`Bearer ${token}`,
                    },
                }
            );
            this.recipes = response.data;
            console.log(response)
        },

};
</script>


