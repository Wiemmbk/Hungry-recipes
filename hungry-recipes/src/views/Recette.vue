<template>
  <div>
    
      <NavBar />
    

    <div
      class="
        Recette-container
        shadow-md
        bg-bg
        border border-beige
        mt-[100px]
        rounded-xl
        mx-auto
      "
    >
      <div class="text-2xl mb-3 mt-12 text-brown font-bold">
        <h1>{{ recipeId.title }}</h1>
      </div>
      <div class="flex items-center justify-center">
        <img
          class="w-[900px] h-[500px] rounded-xl shadow-md mt-12"
          src="../assets/card-default.jpg"
          alt="recipe"
        />
      </div>
      <div class="difficulty-fav">
        <div class="ml-[60px] text-center sm:text-left">
          <p>Difficulté : {{ recipeId.difficulty }}</p>
        </div>
        <div class="ml-[700px]">
          <button
            class="like-btn"
            @click="
              toggle()
              // heartRed = !heartRed;
            "
          >
            <svg
              v-bind:class="{
                'like-btnn path': heartRed,
                'like-btn path': !heartRed,
              }"
              width="44"
              height="39"
              viewBox="0 0 44 39"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 2C6.925 2 2 6.925 2 13C2 24 15 34 22 36.326C29 34 42 24 42 13C42 6.925 37.075 2 31 2C27.28 2 23.99 3.847 22 6.674C20.9857 
      5.22921 19.6382 4.05009 18.0715 3.23649C16.5049 2.42289 14.7653 1.99875 13 2Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="text-center mt-14">
        <p>Ingredients pour {{ recipeId.number }} personnes:</p>
      </div>

      <div
        class="
          container-ingredient
          mt-5
        rounded-lg
          flex
          items-center
          justify-center
          mx-auto
          bg-white
        "
      >
        <div
          class="listing-ingredient min-w-max border border-beige bg-white"
          v-for="ingredient in recipeId.ingredients"
          :key="ingredient.id"
        >
          {{ ingredient.quantity }} de {{ ingredient.name }}
        </div>
      </div>

      <div class="text-center mt-14">
        <p>Préparation:</p>
      </div>
      <div
        class="
          container-preparation
          flex
          items-center
          justify-center
          rounded-lg
          bg-white
          m-24
          mt-5
        "
      >
        <div class="container-listing-preparation ">
          <div
            class="listing-step max-w-[700px] mt-5"
            v-for="instruction in recipeId.instructions"
            :key="instruction.id"
          >
           <b> Etape {{ instruction.step }} :</b> {{ instruction.description }}
          </div>
        </div>
      </div>

      <div v-if="token" class="container-post-comment text-center">
        <p>Laisser un commentaire</p>
        <br />
        <div
          class="
            container-preparation
            flex
            items-center
            justify-center
            m-28
            mt-1
            mb-5
            bg-white
            rounded-lg
          "
        >
          <form class="flex display-flex flex-col">
            <div class="flex space-x-2">
              <p class="text-left mt-5 w-44">Laisser une note sur 5</p>
              <select
                id="uRate"
                v-model="uRate"
                class="
                  bg-white
                  border border-beige
                  text-gray-400 text-sm
                  rounded-lg
                  w-[50px]
                  p-2
                  flex
                  ml-36
                  mb-5
                  mt-4
                "
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <textarea
              class="
                flex
                items-center
                justify-center
                bg-white
                border border-beige
                text-gray-400 text-sm
                rounded-lg
                w-[700px]
                p-2.5
              "
              v-model="commentContent"
              placeholder="J'ecris mon commentaire..."
            ></textarea>
            <button
              type="submit"
              @click="postComment"
              class="
                top-24
                text-white
                ml-[615px]
                mt-[10px]
                bg-beige
                hover:bg-beige2
                focus:ring-4 focus:outline-none focus:ring-beige
                font-medium
                rounded-lg
                text-sm
                px-4
                py-2
                mb-2
              "
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>

      <div v-if="!token">
        <a href="/login" class="comment-not-logged"
          >connectez-vous pour laisser un commentaire en <b>cliquant ici</b></a
        >
      </div>

      <div
        class="
          container-comments
          flex
          items-center
          justify-center
          border
          list-inside
          flex-wrap
          m-28
          mt-1
          bg-white
          rounded-lg
        "
      >
        <div>
          <p>Commentaires ({{ lengthComment }})</p>
        </div>
        <div
          class="
            listing-comments
            border-b border-beige
            bg-white
            list-inside
            mt-5;
          "
          v-for="comment in recipeId.comments"
          :key="comment.id"
        >
          <div class="flex items-center">
            <span class="mr-1">{{ comment.username }} </span
            ><svg
              aria-hidden="true"
              class="mr-1 w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Rating star</title>
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              ></path>
            </svg>
            <div>{{ comment.rating }} / 5</div>
          </div>
          <span>{{ comment.date }}</span
          ><br />
          <span>{{ comment.comment }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import axios from "axios";
import { onBeforeMount, ref } from "vue";
import NavBar from "@/components/NavBar.vue";
// import { thisExpression } from "@babel/types";

export default {
  name: "Recette",
  components: {
    NavBar,
  },

  data() {
    return {
      addFav: false,
      heartRed: false,
      title: "",
      Uid: null,
      username: "",
      recipeId: {},
      lengthComment: null,
      commentContent: "",
      uRate: "",
      token: localStorage.getItem("token"),
      localRecipeIds: localStorage.getItem("favorites"),
      resultOne : null,
      resultTwo : null,
    };
  },

  methods: {
  compareLocalStorage() {
    console.log(this.localRecipeIds);
    console.log(this.recipeId._id);

    if(this.localRecipeIds == []) {
      this.heartRed = false;
    } else if (this.localRecipeIds.includes(this.recipeId._id)) {
      this.heartRed = true;
    } else {
      this.heartRed = false;
    }
    },
   

//  if (this.localRecipeIds.includes(this.recipeId._id, 0)) {
//         this.heartRed = true;
//     }
//   else if(!this.localRecipeIds) {
//       this.heartRed = false;
//     }
//   else {
//       this.heartRed = false;
//     }



    async postComment() {
      console.log(this.recipeId._id);
      const name = localStorage.getItem("username");
      const Uid = localStorage.getItem("id");

      const dataComment = {
        comment: this.commentContent,
        user_id: Uid,
        username: name,
        rating: this.uRate,
      };
      console.log(this.Urate);

      await axios
        .post(
          "http://localhost:3000/api/recipe/" + this.recipeId._id + "/comment",
          dataComment
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      window.location.reload();
    },

    async toggle() {
      if (!localStorage.getItem("token")) {
        alert("vous devez être connecté pour ajouter une recette aux favoris");
      }else if (this.heartRed === false) {
        //add a recipe to the favorite list
        const Uid = localStorage.getItem("id");
        const recette = {
          recipe_id: this.recipeId._id,
          title: this.recipeId.title,
        };

        await axios
          .put(`http://localhost:3000/api/user/${Uid}/favorites/`, recette)
          .then((response) => {
            console.log(response);
            console.log(Uid);
            console.log(this.recipeId._id);
          });
      
        await axios
          .get(`http://localhost:3000/api/user/${Uid}/favorites/`)
          .then((response) => {
            this.resultOne = response.data;
            console.log(this.resultOne);
          });

          console.log(this.resultOne);
          // this.heartRed = true;
        localStorage.removeItem("favorites");
        var array = [];
             for (let i = 0; i <= this.resultOne.length - 1; i++) {
        // var favorites = result.data.favorite_recipes[i].recipe_id;
        array.push(this.resultOne[i].recipe_id);
      }
      localStorage.setItem("favorites", JSON.stringify(array));
        alert("recette ajoutée aux favoris");

      } else{
        //delete a recipe to the favorite list
        const Uid = localStorage.getItem("id");
        //delete a recipe to the favorite list
       await axios
          .delete(
            `http://localhost:3000/api/user/${Uid}/favorites/`,

            {
              data: {
                recipe_id: this.recipeId._id,
                title: this.recipeId.title,
              },
            }
          )
          .then((response) => {
            console.log(response);
            console.log(Uid);
            console.log(this.recipeId._id);
          });

          await axios
          .get(`http://localhost:3000/api/user/${Uid}/favorites`)
          .then((response) => {
            this.resultTwo = response.data;
            console.log(this.resultTwo);
          });

          console.log(this.resultTwo);
        //   this.heartRed = true;
        // this.heartRed = false;
        localStorage.removeItem("favorites");
        var array = [];
             for (let i = 0; i <= this.resultTwo.length - 1; i++) {
              array.push(this.resultTwo[i].recipe_id);
      }
      localStorage.setItem("favorites", JSON.stringify(array));
        alert("recette supprimée de vos favoris");
        // localStorage.setItem("favorites", this.localRecipeIds);
        // const Uid = localStorage.getItem("id");
        // const recette = {
        //   recipe_id: this.recipeId._id,
        //   title: this.recipeId.title,
        // };
        // axios
        //   .delete(
        //     `http://localhost:3000/api/user/${Uid}/favorites/`, recette
        //   )
        //   .then((response) => {
        //     console.log(response);
        //     console.log(Uid);
        //     console.log(this.recipeId._id);
        //   });

        // this.addFav = false;
      }
      window.location.reload();
    },
  },

  async mounted() {
    this.compareLocalStorage();
  },

  setup() {
    const route = useRoute();
    const recipeId = ref();
    const lengthComment = ref({});
    onBeforeMount(async () => {
      const response = await axios.get(
        `http://localhost:3000/api/recipe/${route.params.id}`
      );
      recipeId.value = response.data;
      lengthComment.value = response.data.comments.length;
      console.log(recipeId);
    });

    return {
      recipeId,
      lengthComment,
    };
  },
};
</script>

<style>
.Recette-container {
  margin-left: 10%;
  margin-right: 10%;
  display: flex;
  justify-items: center;
  flex-direction: column;
}

.like-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.like-btn:active {
  transform: scale(0.9, 0.9);
}
.like-btn.active {
  animation: pop 0.6s 1;
}
.like-btn path {
  fill: #9b9c9c;
}
.like-btnn path {
  fill: #ec3e3e;
}

.clone {
  position: absolute;
  animation: moveOutwards 0.9s 1;
  opacity: 0;
}

.difficulty-fav {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

@keyframes moveOutwards {
  from {
    opacity: 1;
    transform: translate(0, 0);
  }
}
.listing-ingredient {
  /* margin-left: 20px; */
  padding: 10px;
  margin-bottom: 10px;
  /* margin-left: 450px; */
  border-radius: 10px;
  /* background-color: #f5f5f5; */
  width: fit-content;
  margin-left: 20px;
  margin-top: 10px;
}

.container-ingredient {
  display: flex;
  flex-wrap: wrap;
  width: 600px;
}

.container-comments {
  margin-top: 20px;
  margin-bottom: 20px;
}

.listing-comments {
  margin-bottom: 10px;
  padding: 10px;
  width: 750px;
  min-height: fit-content;
}
</style>