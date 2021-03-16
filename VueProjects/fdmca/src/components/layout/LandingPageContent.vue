<template>
    <div class="grid-container" id="app">
        <h1 class="grid-item">YOU Decide What Music <br> YOU Want To Strem</h1>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>        
        <img class="grid-item" src="../../images/gamer.webp" />
    </div>
</template>

<script>
export default {
    Name: "LandingPageContent",
    
}
</script>

<style scoped>
    .grid-container {
        display: grid;
        grid-template-columns: auto  auto;
    }
    .grid-item {
        vertical-align: center;
    }
    h1 {
        color: #fff;
        font-size: 55px;
    }
</style>