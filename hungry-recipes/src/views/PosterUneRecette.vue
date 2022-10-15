<template>
  <div>
    <div>
      <NavBar />
    </div>
    <div class="text-center mt-24 ml-5 text-brown font-bold z-0">
      <h1>Poster une recette</h1>
    </div>
    <form
      class="
        mt-5
        flex flex-col
        items-center
        justify-center
        border border-beige
        bg-brown3
        rounded-lg
        shadow-lg
        w-1/2
        mx-auto
      "
    >
      <div class="container flex flex-col items-center">
        <div>
          <input
            type="text"
            id="first_name"
            v-model="title"
            class="
              bg-brown3
              border border-green
              text-gray-900 text-sm
              rounded-lg
              w-[625px]
              p-2.5
              mt-10
              flex
            "
            placeholder="Titre de la recette"
          />
        </div>

        <select
          id="categorie"
          @blur="setCategory"
          v-model="category"
          class="
            bg-brown3
            border border-green
            text-gray-400 text-sm
            rounded-lg
            block
            w-[625px]
            p-2.5
            mt-2
          "
        >
          <option selected>Catégorie</option>
          <option value="ENTREE">Entrée</option>
          <option value="PLAT">Plat</option>
          <option value="DESSERT">Dessert</option>
        </select>

        <div>
          <select
            id="dificulty"
            v-model="number"
            class="
              bg-brown3
              border border-green
              text-gray-400 text-sm
              rounded-lg
              block
              w-[625px]
              p-2.5
              mt-2
            "
          >
            <option selected>Nombre de personne</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>

        <select
          id="dificulty"
          @blur="setDifficulty"
          v-model="difficulty"
          class="
            bg-brown3
            border border-green
            text-gray-400 text-sm
            rounded-lg
            block
            w-[625px]
            p-2.5
            mt-2
          "
        >
          <option selected>Difficulté</option>
          <option value="FACILE">Facile</option>
          <option value="MOYEN">Moyen</option>
          <option value="DIFFICILE">Difficile</option>
        </select>

        <div
          class="
            card
            px-5
            py-2
            bg-brown3
            border
            rounded-lg
            border-green
            text-brown text-sm
            w-[625px]
            mt-2
          "
          v-for="(ingredient, index) in ingredients"
          :key="index"
        >
          <div class="card-body">
            <span
              class="float-right"
              style="cursor: pointer"
              @click="deleteIngredientForm(index)"
            >
              X
            </span>
            <h4 class="card-title flex">Ingredient {{ index + 1 }}</h4>
            <div class="ingredient-form flex flex-column space-x-10">
              <input
                type="text"
                class="form-control mt-5 border w-[250px] h-8"
                placeholder=" Quantité + Unité"
                v-model="ingredient.quantity"
              />
              <input
                type="text"
                class="form-control mt-5 border w-[250px] h-8"
                placeholder=" Ingrédient"
                v-model="ingredient.name"
              />
            </div>
          </div>
          <a
            class="
              text-white
              bg-beige
              hover:bg-beige2
              focus:ring-4 focus:outline-none focus:ring-beige
              font-medium
              rounded-lg
              text-sm
              px-2
              py-2.5
              text-center
              flex
              mt-5
              w-[110px]
            "
            @click="addNewIngredientForm"
          >
            Add ingredient
          </a>
        </div>
      </div>

      <div
        class="
          card
          px-5
          py-2
          bg-brown3
          border
          rounded-lg
          border-green
          text-gray-400 text-sm
          w-[625px]
          mt-2
        "
        v-for="(instruction, index) in instructions"
        :key="index"
      >
        <div class="card-body">
          <span
            class="float-right text-brown"
            style="cursor: pointer"
            @click="deleteInstructionForm(index)"
          >
            X
          </span>
          <h4 class="card-title flex ml-0 text-brown">Step {{ index + 1 }}</h4>
          <div class="instruction-form flex flex-column space-x-4 w-fit">
            <textarea
              type="text"
              class="form-control mt-5 border w-[550px] h-16"
              placeholder="Description"
              v-model="instruction.description"
            >
            </textarea>
          </div>
        </div>
        <a
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
            flex
            w-[96px]
            mt-5
          "
          @click="addNewInstructionForm"
        >
          Add step
        </a>
      </div>

      <button
        type="button"
        @click="onSubmit"
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
        "
      >
        Poster ma recette
      </button>
    </form>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import axios from "axios";

export default {
  name: "PosterUneRecette",
  components: {
    NavBar,
  },

  data() {
    return {
      user_id: "",
      title: "",
      category: "",
      ingredients: [
        {
          quantity: "",
          name: "",
        },
      ],
      number: "",
      difficulty: "",
      instructions: [{ description: "" }],
    };
  },

  methods: {
    addNewIngredientForm() {
      this.ingredients.push({
        quantity: "",
        name: "",
      });
    },

    deleteIngredientForm(index) {
      this.ingredients.splice(index, 1);
    },

    addNewInstructionForm() {
      this.instructions.push({
        description: "",
      });
    },

    deleteInstructionForm(index) {
      this.instructions.splice(index, 1);
    },
    // post form to the database
    onSubmit() {
      const id = localStorage.getItem("id");

      const data = {
        title: this.title,
        category: this.category,
        ingredients: this.ingredients,
        number: this.number,
        difficulty: this.difficulty,
        instructions: this.instructions,
        user_id: id,
      };

      axios
        .post("http://localhost:3000/api/recipe", data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>