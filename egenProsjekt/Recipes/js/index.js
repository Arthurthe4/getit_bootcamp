var model = {
    qurrentSelectedRes: '',
    selectedIngridens: ['hei'],
    recipes: [
        { 
            id: 1001, 
            names: 'Mangosorbet',
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
            names: 'Carnitas',
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
            names: 'Kvikklunsjkake',
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
        { 
            id: 1004, 
            names: 'RØSTI',
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
        { 
            id: 1004, 
            names: 'Sputnuk',
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
        { 
            id: 1004, 
            names: 'FISKEBOLLER I KARRISAUS',
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
        { 
            id: 1004, 
            names: 'GUACAMOLE MED ERTER',
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
        { 
            id: 1004, 
            names: 'PICO DE GALLO',
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
        { 
            id: 1004, 
            names: 'FROKOSTPANNEKAKER',
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
        <div class="grid-container">
            ${recipesHtml}
        </div>
        
    `;  
}

function createRecipesHtml() {
    var html = '';
    for(var names of model.recipes) {
        if(model.qurrentSelectedRes == names.names) {
            html += 
            `<div >
                <div class="grid-item" onclick="ingridienser
                    ('${names.ingredient}','${names.names}')
                    ">${names.names}
                </div> 
                <div class="grid-item">
                    ${model.selectedIngridens}
                </div>
            </div>`
        }
        else {
            html += 
            `<div class="grid-container">
                <div class="grid-item recipeCard" onclick="ingridienser
                    ('${names.ingredient}','${names.names}')
                    ">${names.names}
                </div>
            </div>`        
        }
    }
    return html
}

// Controller
function ingridienser(ingredient, Rname) {
    model.selectedIngridens = ingredient
    if(model.qurrentSelectedRes == ''){
        model.qurrentSelectedRes = Rname;
    } else {
        model.qurrentSelectedRes = '';
    }
    updateView();
}
