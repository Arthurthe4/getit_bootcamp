var model = {
    recipes: [
        { 
            id: 1001, 
            name: 'Mangosorbet',
            difficulty: "Enkel", 
            ingredient: [
                "450g mangopuré", 
                "saft av 0,5 stk lime", 
                "2ss vann", 
                "2ss sukker", 
                "0.25 ts salt",
            ],
        },
        {
            id: 1002,
            name: 'Carnitas',
            difficulty: "Middels", 
            ingredient: [
                "1kg nakkekoteletter av svin",
                "2ts salt",
                "1ts pepper",
                "0.5 ts meksikansk tørket oregano",
                "0.5 ss malt spisskummen",
                "2ts chilipulver",
                "4 båter hvitløk",
                "2dl cola",
                "saft av 1 stk appelsin",
                "saft av 1 stk lime",
                "2 stk laurbærblad",
                "300g smult",
            ],
        },
        { 
            id: 1003, 
            name: 'Kvikklunsjkake',
            difficulty: "Enkel", 
            ingredient: [
                "3 stk egg", 
                "150g sukker", 
                "90g hvetemel", 
                "2ss kakaopulver", 
                "1ts vaniljesukker",
                "1.5 ts bakepulver",
                "75g smør",
                "50g mørk kokesjokolade",
                "300g lys kokesjokolade",
                "200g smør",
                "200g melis",
                "5stk Kvikk Lunsj",
            ],
        },
    ]
}
// View
updateView();
function updateView() {
    var recipesHtml = createRecipesHtml();
    document.getElementById('app').innerHTML = `
        <h2>Recipes</h2>
        ${recipesHtml}
        
    `;  
}

function createRecipesHtml() {
    var html = '';
    for(var names of model.recipes) {
        html += `<li onclick="ingridienser('${names.name}')">${names.name}</li>`
    }
    return html
}

// Controller
function ingridienser() {
    var ingredientsHtml = '';
    for(var ingredients of model.recipes) {
        ingredientsHtml += `<li>${ingredients.ingredient}</li>`
    }
    //return ingredientsHtml
    // ${ingredients}
    updateView();
}
