<template>
  <div>
    <div>
      <NavBar />
    </div>

    <div class="bg-white">
      <nav
        class="
          bg-white
          border-gray-200
          px-2
          sm:px-4
          py-2.5
          mx-0
          fixed
          top-16
          w-full
        "
      >
        <div
          class="
            container
            flex flex-wrap
            justify-between
            items-center
            ml-[430px]
            mt-2
            background-color:
            #f5f5f5;
          "
        >
          <div>
            <form @submit.prevent="getData">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only"
                >Search</label
              >
              <div class="relative">
                <div
                  class="
                    flex
                    absolute
                    inset-y-0
                    left-0
                    items-center
                    pl-3
                    pointer-events-none
                  "
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <input
                    type="text"
                    v-model="title"
                    @keyup.enter="getData"
                    class="
                      block
                      p-4
                      pl-10
                      w-[400px]
                      text-sm text-gray-900
                      bg-gray-50
                      rounded-lg
                      border border-gray-300
                      focus:ring-beige focus:border-beige
                    "
                    placeholder="Quelle recette vous ferait plaisir?"
                  />

                  <button
                    type="submit"
                    @click="getData"
                    class="
                      fixed
                      text-white
                      ml-[113px]
                      mt-[-45px]
                      bg-beige
                      hover:bg-beige2
                      focus:ring-4 focus:outline-none focus:ring-beige
                      font-medium
                      rounded-lg
                      text-sm
                      px-4
                      py-2
                    "
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </div>

    <div class="mes-recettes-favorites mt-44">
      <CardRecette
        v-for="recipe in recipes"
        :key="recipe.recipe_id"
        :recipe="recipe"
      />
      <div v-if="recipes.length === 0">
        Aucune recette correpondante trouvée
      </div>
    </div>
  </div>
</template>
  
  <script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import NavBar from "@/components/NavBar.vue";
import CardRecette from "@/components/CardRecette.vue";
import axios from "axios";

export default {
  components: {
    HelloWorld,
    NavBar,
    CardRecette,
  },

  data() {
    return {
      recipes: [{}],
      title: "",
    };
  },

  methods: {
    async getData() {
      await axios
        .get(
          "http://localhost:3000/api/recipes/rating/title?search=" + this.title
        )
        .then((response) => {
          this.recipes = response.data.titleAverage;
          console.log(this.recipes);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getRecipes() {
      await axios
        .get("http://localhost:3000/api/recipes/rating")
        .then((response) => {
          this.recipes = response.data.titleAverage;
          console.log(this.recipes);
          // console.log(this.recipes[3].ratings.length)
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  async mounted() {
    this.getRecipes();
  },
};
</script>
  
  <style>
.mes-recettes-favorites {
  width: 100%;
  max-width: 1200px;
  padding-left: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: center; */
}
</style>