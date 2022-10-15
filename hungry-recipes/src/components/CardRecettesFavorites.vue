<template>
    <div class="mt-24 py-2  ">
     <router-link :to =" '/Recette/'+recipe.recipe_id">
    
        <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-brown3">
            <div class="px-4 py-3">
                <div class="font-bold text-sm pl-1 mb-2 h-14 text-center">{{ recipe.title }}</div>

    <!-- <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span> -->
    <!-- <div href="#" class="text-sm font-medium text-gray-900 underline hover:no-underline ">73 reviews</div> -->
            </div>
        </div>
    </router-link>
    </div>

</template>

<script>
export default {
    name: 'CardRecettesFavorites',
    props: {
            id: String,
        recipe: {
            type: Object,
            required: true
        },
    }
}
</script>

