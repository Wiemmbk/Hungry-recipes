<template>
    <div class="mt-24 py-2">
     <router-link :to =" '/Recette/'+recipe._id">
    
        <div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-brown3">
            <div class="px-4 py-3">
                <div class="font-bold text-sm text-left pl-1 mb-2 h-14">{{ recipe.title }}</div>

    <!-- <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span> -->
    <!-- <div href="#" class="text-sm font-medium text-gray-900 underline hover:no-underline ">73 reviews</div> -->
            </div>
        </div>
    </router-link>
    </div>

</template>

<script>
export default {
    name: 'CardMesRecettes',
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