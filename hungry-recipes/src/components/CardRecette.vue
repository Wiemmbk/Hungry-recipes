<template>
    <div class="card-recette">
     <router-link :to =" '/Recette/'+recipe.recipe_id">
    
        <div class="max-w-sm rounded-lg overflow-hidden shadow-lg">
            <img class="w-full" src="../assets/card-default.jpg" alt="recipe">
            <div class="px-4 py-3">
                <div class="font-bold text-sm text-left pl-1 mb-2 h-14">{{ recipe.title }}</div>
                <div class="flex items-center">
    <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    <p v-if="recipe.average !== 0" class="ml-2 text-sm font-bold text-gray-900 "> {{ recipe.average}} / 5 </p> 
    <p v-else class="ml-2 text-sm font-bold text-gray-900 ">  Non notée </p>
    <!-- <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span> -->
    <!-- <div href="#" class="text-sm font-medium text-gray-900 underline hover:no-underline ">73 reviews</div> -->
</div>
            </div>
        </div>
    </router-link>
    </div>

</template>

<script>
export default {
    name: 'CardRecette',
    props: {
            id: String,
        recipe: {
            type: Object,
            required: true
        },
    }
}
</script>

<style>

.card-recette {
    
    /* border: solid   1px black; */
    width: 250px;
    padding: 1rem;
    height: 358px;
    
    
    
}

</style>